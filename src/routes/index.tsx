import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { TopBar } from "@/components/msar/TopBar";
import { IncidentPanel } from "@/components/msar/IncidentPanel";
import { CopilotPanel } from "@/components/msar/CopilotPanel";
import { MetricsBar, type Metrics } from "@/components/msar/MetricsBar";
import { ActionBar, type ActionKey } from "@/components/msar/ActionBar";
import { CycloneStatusCard } from "@/components/msar/CycloneStatusCard";
import { PredictionResultsPanel } from "@/components/msar/PredictionResultsPanel";
import { AISettingsModal } from "@/components/msar/AISettingsModal";
import { FailureComparisonPanel } from "@/components/msar/FailureComparisonPanel";
import {
  EnvironmentScenarioSelector,
  type EnvironmentScenario,
} from "@/components/msar/EnvironmentScenarioSelector";
const LiveMap = lazy(() => import("@/components/msar/LiveMap"));

// Step 1: Import data files
import michaungData from "@/data/michaung_best_track.json";

// Import deterministic engine functions
import type { Candidate } from "@/engines/scoring";
import { calculateRoute } from "@/engines/routing";

// Import MSAR Agents
import { runTriageAgent, type AIProvider } from "@/agents/triage";
import { explainDecision } from "@/agents/copilot";
import { runDecisionAgent } from "@/agents/decision";
import { handleAssetFailure } from "@/agents/contingency";

import { COPILOT_QUESTIONS, INCIDENT, type CopilotMessage } from "@/lib/msar-data";
import { getObservationByIndex, MICHAUNG_TRACK, type CycloneObservation } from "@/lib/michaung-data";
import { useMsarSimulation } from "@/lib/msar-simulation";
import { SimulationControls } from "@/components/msar/SimulationControls";
import { runMultiVesselSimulation } from "@/lib/msar-multi-vessel";

// runMission orchestrates the full 8-step pipeline including the AI Decision Agent.
// We import it here so that clicking RUN PREDICTION calls the real thing.
import { runMission, type MissionState } from "@/core/runMission";
import type { DecisionOutput } from "@/agents/decision";
import { AIDecisionCard } from "@/components/msar/AIDecisionCard";

// Synthetic scenario parameters
const SEVERE_STORM_OBSERVATION: CycloneObservation = {
  timestamp: "SIMULATED — Severe Storm",
  latitude: 13.22,    // ~80 km from vessel datum
  longitude: 80.69,
  current_intensity: null,
  pressure_hpa: 940,
  wind_kt: 120,       // Extreme wind speed for worst-case scenario
  pressure_drop_hpa: 60,
  category: "SuCS",
};

const NORMAL_OBSERVATION: CycloneObservation = {
  timestamp: "SIMULATED — Normal Conditions",
  latitude: 8.0,      // Far south — no cyclone influence
  longitude: 76.0,
  current_intensity: null,
  pressure_hpa: 1010,
  wind_kt: 0,
  pressure_drop_hpa: 0,
  category: "None",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MSAR Command Center | Maritime Search & Rescue Intelligence" },
      {
        name: "description",
        content:
          "AI-assisted maritime search and rescue decision support: drift prediction, zone prioritisation, asset tasking and explainable copilot reasoning.",
      },
      { property: "og:title", content: "MSAR — Maritime Search & Rescue Intelligence" },
      {
        property: "og:description",
        content:
          "Dark maritime command center for AI-assisted SAR: drift zones, asset tasking, and an explainable AI copilot.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommandCenter,
});

const BASE_METRICS: Metrics = {
  probability: 0.78,
  priorityZone: "ZONE-1",
  responseMin: 12,
  availableAssets: 4,
  totalAssets: 4,
  confidence: 0.86,
};

const stamp = () => new Date().toISOString().slice(11, 19) + "Z";

let seq = 0;
const msg = (role: CopilotMessage["role"], text: string): CopilotMessage => ({
  id: `m${++seq}`,
  role,
  text,
  ts: stamp(),
});

function CommandCenter() {
  const [clock, setClock] = useState("--:--:--");
  const [busy, setBusy] = useState<ActionKey | null>(null);
  const [thinking, setThinking] = useState(false);
  const [predicted, setPredicted] = useState(true);
  const [failedAssetId, setFailedAssetId] = useState<string | null>(null);
  const [replay, setReplay] = useState<number | null>(null);

  // AI Settings State (Gemini vs Mistral vs Groq vs OpenRouter + API Keys)
  const [aiProvider, setAiProvider] = useState<AIProvider>("GEMINI");
  const [geminiKey, setGeminiKey] = useState<string>("");
  const [mistralKey, setMistralKey] = useState<string>("");
  const [groqKey, setGroqKey] = useState<string>("");
  const [openrouterKey, setOpenrouterKey] = useState<string>("");
  const [ollamaModel, setOllamaModel] = useState<string>("gemma4:latest");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const p = localStorage.getItem("MSAR_AI_PROVIDER") as AIProvider;
      if (p) setAiProvider(p);
      const g = localStorage.getItem("MSAR_GEMINI_KEY");
      if (g) setGeminiKey(g);
      const m = localStorage.getItem("MSAR_MISTRAL_KEY");
      if (m) setMistralKey(m);
      const gr = localStorage.getItem("MSAR_GROQ_KEY");
      if (gr) setGroqKey(gr);
      const or = localStorage.getItem("MSAR_OPENROUTER_KEY");
      if (or) setOpenrouterKey(or);
      const om = localStorage.getItem("MSAR_OLLAMA_MODEL");
      if (om) setOllamaModel(om);
    }
  }, []);

  const handleProviderChange = (p: AIProvider) => {
    setAiProvider(p);
    if (typeof window !== "undefined") {
      localStorage.setItem("MSAR_AI_PROVIDER", p);
    }
  };

  const handleGeminiKeyChange = (k: string) => {
    setGeminiKey(k);
    if (typeof window !== "undefined") {
      localStorage.setItem("MSAR_GEMINI_KEY", k);
    }
  };

  const handleMistralKeyChange = (k: string) => {
    setMistralKey(k);
    if (typeof window !== "undefined") {
      localStorage.setItem("MSAR_MISTRAL_KEY", k);
    }
  };

  const handleGroqKeyChange = (k: string) => {
    setGroqKey(k);
    if (typeof window !== "undefined") {
      localStorage.setItem("MSAR_GROQ_KEY", k);
    }
  };

  const handleOpenrouterKeyChange = (k: string) => {
    setOpenrouterKey(k);
    if (typeof window !== "undefined") {
      localStorage.setItem("MSAR_OPENROUTER_KEY", k);
    }
  };

  const handleOllamaModelChange = (m: string) => {
    setOllamaModel(m);
    if (typeof window !== "undefined") {
      localStorage.setItem("MSAR_OLLAMA_MODEL", m);
    }
  };

  // Selected asset ID and prediction run trigger count
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [runCount, setRunCount] = useState(0);

  // Historical Cyclone Observation Index State (default to Dec 4 03:00 UTC near Chennai)
  const [cycloneIndex, setCycloneIndex] = useState(20);

  // Replay state: null = not replaying.  When replay is active it holds the
  // track index that is currently displayed (an integer 0 → TRACK_LENGTH-1).
  // The useEffect below ticks it forward every REPLAY_STEP_MS milliseconds.
  const REPLAY_TRACK_LENGTH = MICHAUNG_TRACK.length;   // 37 observations
  const REPLAY_STEP_MS = 600;                          // 600 ms per observation step
  const simulation = useMsarSimulation(getObservationByIndex(20).wind_kt);
  const activeAssets = simulation.activeAssets;
  const simulatedVessel = simulation.activeVessels[0]!;
  const envScenario = simulation.environment.selectedScenario as EnvironmentScenario;

  // Active asset pool — mirrors assetsData but allows marking assets unavailable

  // Before/After failure comparison snapshot
  const [failureComparison, setFailureComparison] = useState<{
    failedAssetId: string;
    before: { selectedAsset: string; selectedZone: string; topCandidate: Candidate | null };
    after: { selectedAsset: string; selectedZone: string; topCandidate: Candidate | null; candidateCount: number };
  } | null>(null);

  // ── AI Mission State ────────────────────────────────────────────────────────
  // Stores the result of the most recent runMission() call.
  // null = no run yet.  After RUN PREDICTION, this will contain triage output,
  // the Decision Agent's selectedAsset/zone/reason/confidence, etc.
  const [missionState, setMissionState] = useState<MissionState | null>(null);

  // True while runMission() is awaiting the AI agents (triage + decision).
  // Used to show a spinner inside AIDecisionCard and to disable the RUN button.
  const [isDecisionRunning, setIsDecisionRunning] = useState(false);

  // ============================================================================
  // DETERMINISTIC 7-STEP EXECUTION PIPELINE
  // ============================================================================

  // Step 2: Resolve cyclone observation based on active environmental scenario
  const currentObservation = useMemo<CycloneObservation>(() => {
    let observation: CycloneObservation;
    if (envScenario === "NORMAL_CONDITIONS") {
      observation = NORMAL_OBSERVATION;
    } else if (envScenario === "SEVERE_STORM") {
      observation = SEVERE_STORM_OBSERVATION;
    } else if (envScenario === "CUSTOM") {
      observation = {
        timestamp: "OPERATOR — Dynamic Custom Simulation",
        latitude: 13.04,
        longitude: 80.52 + simulation.environment.currentSpeedKnots * 0.01,
        current_intensity: null,
        pressure_hpa: Math.max(900, 1013 - Math.round(simulation.environment.windSpeedKnots * 0.8)),
        wind_kt: simulation.environment.windSpeedKnots,
        pressure_drop_hpa: Math.round(simulation.environment.windSpeedKnots * 0.5),
        category:
          simulation.environment.windSpeedKnots > 64
            ? "VSCS"
            : simulation.environment.windSpeedKnots > 34
              ? "CS"
              : "Depression",
      };
    } else {
      observation = getObservationByIndex(cycloneIndex);
    }
    return { ...observation, wind_kt: simulation.environment.windSpeedKnots };
  }, [envScenario, cycloneIndex, simulation.environment.windSpeedKnots, simulation.environment.currentSpeedKnots]);

  // The existing engines remain single-vessel. This orchestration layer runs
  // the same deterministic sequence independently for each active vessel.
  const vesselResults = useMemo(
    () => runMultiVesselSimulation({
      vessels: simulation.activeVessels,
      assets: activeAssets,
      observation: currentObservation,
      elapsedMinutes: simulation.elapsedMinutes,
    }),
    [simulation.activeVessels, activeAssets, currentObservation, simulation.elapsedMinutes],
  );

  // The first vessel remains the primary/detail vessel, keeping the existing
  // single-vessel panels and route behaviour unchanged.
  const primaryResult = vesselResults.find((result) => result.vessel.id === simulatedVessel.id) ?? vesselResults[0]!;
  const predictionResult = primaryResult.prediction;
  const riskResult = primaryResult.environmentalRisk;
  const searchZones = primaryResult.searchZones;
  const candidates = primaryResult.candidates;

  // Calculate A* Risk-Aware Decision-Support Route
  const routeResult = useMemo(() => {
    const selAsset = activeAssets.find((a) => a.id === selectedAssetId && a.available) || activeAssets.find((a) => a.available) || activeAssets[0]!;
    const selZone = searchZones[0] || { latitude: predictionResult.predictedLatitude, longitude: predictionResult.predictedLongitude };

    return calculateRoute({
      startLat: selAsset.latitude,
      startLon: selAsset.longitude,
      targetLat: selZone.latitude,
      targetLon: selZone.longitude,
      cycloneLat: currentObservation.latitude,
      cycloneLon: currentObservation.longitude,
      cycloneWindSpeed: currentObservation.wind_kt,
    });
  }, [selectedAssetId, activeAssets, searchZones, predictionResult, currentObservation]);

  // Copilot messages log
  const [messages, setMessages] = useState<CopilotMessage[]>([
    msg(
      "copilot",
      "4-Engine Execution Pipeline active. Active AI Provider: " +
        aiProvider +
        ". Vessel fix predicted at " +
        predictionResult.predictedLatitude.toFixed(4) +
        "°N " +
        predictionResult.predictedLongitude.toFixed(4) +
        "°E. Environmental Risk: " +
        (riskResult.environmentalRisk * 100).toFixed(0) +
        "% (" +
        riskResult.hazardLevel +
        ").",
    ),
  ]);

  const push = useCallback((m: CopilotMessage) => setMessages((prev) => [...prev, m]), []);

  const reason = useCallback(
    (text: string) => {
      setThinking(true);
      push(msg("copilot", text));
      setThinking(false);
    },
    [push],
  );

  useEffect(() => {
    const t = setInterval(() => {
      setClock(new Date().toISOString().slice(11, 19));
      simulation.actions.advanceTime(1 / 60);
    }, 1000);
    return () => clearInterval(t);
  }, [simulation.actions]);

  // ───────────────────────────────────────────────────────────────────────
  // HISTORICAL REPLAY tick: when replay is active, step cycloneIndex forward
  // by 1 every REPLAY_STEP_MS ms.  cycloneIndex drives currentObservation which
  // drives riskResult, searchZones, candidates, route, map, and CycloneStatusCard
  // — so every panel updates automatically with no extra code needed.
  // ───────────────────────────────────────────────────────────────────────
  useEffect(() => {
    // replay === null → idle, nothing to do
    if (replay === null) return;

    // We’ve stepped past the last track observation → stop
    if (replay >= REPLAY_TRACK_LENGTH - 1) {
      // Brief pause at the final frame, then stop
      const done = setTimeout(() => {
        setReplay(null);
        setBusy(null);
        push(msg("copilot",
          `Historical replay complete. Showed ${REPLAY_TRACK_LENGTH} Michaung track observations ` +
          `(${MICHAUNG_TRACK[0]?.timestamp} → ${MICHAUNG_TRACK[REPLAY_TRACK_LENGTH - 1]?.timestamp}). ` +
          `Final position: ${MICHAUNG_TRACK[REPLAY_TRACK_LENGTH - 1]?.latitude.toFixed(2)}°N, ` +
          `${MICHAUNG_TRACK[REPLAY_TRACK_LENGTH - 1]?.longitude.toFixed(2)}°E. ` +
          `Max intensity: ${MICHAUNG_TRACK[REPLAY_TRACK_LENGTH - 1]?.wind_kt} kt.`
        ));
      }, REPLAY_STEP_MS * 2);
      return () => clearTimeout(done);
    }

    // Advance one step: update cycloneIndex so the map/cards react immediately,
    // then schedule the next tick
    setCycloneIndex(replay);
    simulation.actions.updateEnvironment({
      windSpeedKnots: MICHAUNG_TRACK[replay]?.wind_kt ?? 0,
    });
    const t = setTimeout(() => setReplay((r) => (r === null ? null : r + 1)), REPLAY_STEP_MS);
    return () => clearTimeout(t);
  }, [replay, REPLAY_TRACK_LENGTH, push, simulation.actions]);

  const metrics = useMemo<Metrics>(() => {
    if (!predicted) {
      return { ...BASE_METRICS, probability: 0, confidence: 0, responseMin: 0, priorityZone: "—" };
    }

    const topCandidate = candidates[0];
    const topZone = searchZones[0];
    const availableCount = activeAssets.filter((a) => a.available).length;

    const baseConf = Math.max(0.3, 1 - (topCandidate?.totalCost ?? 100) / 200);
    const adjustedConfidence = Number(
      (baseConf / riskResult.uncertaintyMultiplier).toFixed(2)
    );

    return {
      probability: topZone?.probability ?? BASE_METRICS.probability,
      priorityZone: topZone?.id ?? BASE_METRICS.priorityZone,
      responseMin: Math.round(topCandidate?.responseTimeMinutes ?? BASE_METRICS.responseMin),
      availableAssets: availableCount,
      totalAssets: activeAssets.length,
      confidence: Math.min(0.98, adjustedConfidence),
    };
  }, [predicted, candidates, searchZones, activeAssets, riskResult]);

  const recommendation = useMemo(() => {
    if (!predicted)
      return {
        headline: "Awaiting prediction run",
        detail:
          "No active drift solution. Run prediction to generate probability zones and an asset tasking plan.",
        tone: "warning" as const,
      };
    if (failedAssetId)
      return {
        headline: `Re-task ${candidates[0]?.assetId ?? "HELI-01"} to ${candidates[0]?.zoneId ?? "ZONE-1"} (Asset ${failedAssetId} OFFLINE)`,
        detail:
          `Primary asset ${failedAssetId} is offline. Recalculated optimal replacement asset: ${candidates[0]?.assetId ?? "NONE"} in ${candidates[0]?.zoneId ?? "ZONE-1"} (Response time: ${candidates[0]?.responseTimeMinutes ? Math.round(candidates[0].responseTimeMinutes) : 0} min).`,
        tone: "emergency" as const,
      };
    if (riskResult.hazardLevel === "HIGH")
      return {
        headline: `HIGH ENVIRONMENTAL RISK (${aiProvider} AI Active)`,
        detail:
          `Cyclone Michaung is ${riskResult.distanceToCycloneKm.toFixed(0)} km from predicted vessel fix with ${currentObservation.wind_kt} kt winds. Top candidate ${candidates[0]?.assetId ?? "HELI-01"} assigned to ${candidates[0]?.zoneId ?? "ZONE-1"} (Response time: ${candidates[0]?.responseTimeMinutes ? Math.round(candidates[0].responseTimeMinutes) : 12} min).`,
        tone: "emergency" as const,
      };
    return {
      headline: `Task ${candidates[0]?.assetId ?? "HELI-01"} to ${candidates[0]?.zoneId ?? "ZONE-1"} immediately`,
      detail:
        `Top search zone probability: ${((searchZones[0]?.probability ?? 0.61) * 100).toFixed(1)}%. Distance to vessel: ${predictionResult.distanceTravelledKm.toFixed(2)} km. Environmental hazard level: ${riskResult.hazardLevel}.`,
      tone: "cyan" as const,
    };
  }, [predicted, failedAssetId, riskResult, currentObservation, candidates, searchZones, predictionResult, aiProvider]);



  const handleStop = useCallback(() => {
    setThinking(false);
    setIsDecisionRunning(false);
    setBusy(null);
    setMessages((prev) => [
      ...prev,
      {
        id: `m${Date.now()}`,
        role: "copilot",
        text: "🛑 AI reasoning process stopped by operator.",
        ts: new Date().toISOString().slice(11, 19) + "Z",
      },
    ]);
  }, []);

  // Handle asking copilot questions (preset or custom operator query) with active AI Provider
  const onAsk = useCallback(
    async (q: string) => {
      push(msg("operator", q));
      setThinking(true);

      try {
        const reportContext = `${q} (Vessel: ${INCIDENT.vesselName} ${INCIDENT.vesselType}, Status: ${INCIDENT.status}, Crew at risk: ${INCIDENT.crewAtRisk})`;
        const triageResult = await runTriageAgent({
          rawText: reportContext,
          provider: aiProvider,
          geminiApiKey: geminiKey,
          mistralApiKey: mistralKey,
          groqApiKey: groqKey,
          openrouterApiKey: openrouterKey,
          openRouterApiKey: openrouterKey,
          ollamaModel,
        });

        const selectedAsset = missionState?.decision?.selectedAsset ?? selectedAssetId ?? candidates[0]?.assetId ?? "HELI-01";
        const selectedZone = missionState?.decision?.selectedZone ?? candidates[0]?.zoneId ?? "ZONE-1";

        const explanation = await explainDecision({
          question: q,
          incident: {
            incidentType: triageResult.incidentType,
            urgency: triageResult.urgency,
            crewAtRisk: triageResult.crewAtRisk,
            summary: triageResult.summary,
          },
          predictedPosition: {
            latitude: predictionResult.predictedLatitude,
            longitude: predictionResult.predictedLongitude,
            distanceTravelledKm: predictionResult.distanceTravelledKm,
          },
          environmentalRisk: riskResult,
          searchZones,
          candidates,
          selectedAsset,
          selectedZone,
          ...(failedAssetId ? { failedAssetId } : {}),
          provider: aiProvider,
          geminiApiKey: geminiKey,
          mistralApiKey: mistralKey,
          groqApiKey: groqKey,
          openrouterApiKey: openrouterKey,
          openRouterApiKey: openrouterKey,
          ollamaModel,
        });

        let responseText = `[SAR Copilot | ${triageResult.incidentType} | Urgency ${triageResult.urgency}/5]\n`;

        // Route to the most relevant explanation based on the operator's question
        const qLower = q.toLowerCase();

        if (
          qLower.includes("why was this asset") ||
          qLower.includes("asset selected") ||
          qLower.includes("why this asset")
        ) {
          // Q: Why was this asset selected?
          responseText += `${explanation.assetSelectionRationale}`;
        } else if (
          qLower.includes("why not") ||
          qLower.includes("another asset") ||
          qLower.includes("other asset") ||
          qLower.includes("wasn't") ||
          qLower.includes("rejected")
        ) {
          // Q: Why wasn't another asset selected?
          responseText += `${explanation.rejectedAssetsRationale}`;
        } else if (
          qLower.includes("zone") ||
          qLower.includes("priority") ||
          qLower.includes("search area") ||
          qLower.includes("probability")
        ) {
          // Q: Why is this search zone highest priority?
          responseText += `${explanation.zonePriorityRationale}`;
        } else if (
          qLower.includes("environment") ||
          qLower.includes("risk") ||
          qLower.includes("cyclone") ||
          qLower.includes("weather") ||
          qLower.includes("hazard")
        ) {
          // Q: How did environmental risk affect the decision?
          responseText += `${explanation.environmentalImpactRationale}`;
        } else if (
          qLower.includes("fail") ||
          qLower.includes("break") ||
          qLower.includes("contingency") ||
          qLower.includes("what happens if") ||
          qLower.includes("backup") ||
          qLower.includes("fallback")
        ) {
          // Q: What happens if the selected asset fails?
          responseText += `${explanation.contingencyRationale || explanation.rejectedAssetsRationale}`;
        } else {
          // Default: provide the full operational briefing
          responseText += explanation.fullBriefing;
        }

        setThinking(false);
        push(msg("copilot", responseText));
      } catch (err) {
        console.error("Copilot onAsk error:", err);
        setThinking(false);
        push(msg("copilot", `Analysis complete. Active provider: ${aiProvider}.`));
      }
    },
    [push, aiProvider, predictionResult, riskResult, searchZones, candidates, failedAssetId, missionState, selectedAssetId],
  );

  // ============================================================================
  // SIMULATE ASSET FAILURE — Full 10-step contingency pipeline
  // ============================================================================
  const onSimulateFailure = useCallback(async () => {
    // Step 1: Identify the currently selected (top-ranked) rescue asset
    const topBefore = candidates[0];
    if (!topBefore) {
      push(msg("copilot", "No active candidates to fail. Run prediction first."));
      return;
    }
    const targetAssetId = topBefore.assetId;

    setBusy("fail");
    push(msg("operator", `SIMULATE ASSET FAILURE — ${targetAssetId}`));
    setThinking(true);

    // Snapshot BEFORE state
    const beforeSnapshot = {
      selectedAsset: topBefore.assetId,
      selectedZone: topBefore.zoneId,
      topCandidate: topBefore,
    };

    // Step 2 & 3: Mark asset unavailable, remove from candidate pool
    const contingencyResult = handleAssetFailure({
      failedAssetId: targetAssetId,
      assets: activeAssets,
      zones: searchZones.slice(0, 5),
      hazardPenalty: riskResult.environmentalRisk * 50,
    });

    // Step 2 applied: update active asset pool (triggers re-render of map + metrics)
    simulation.actions.setActiveAssets(contingencyResult.updatedAssets);
    setFailedAssetId(targetAssetId);

    // Step 4 & 5: Recalculate candidates + ask Decision Agent for new recommendation
    const newCandidates = contingencyResult.remainingCandidates;
    let newDecision: { selectedAsset: string; selectedZone: string } = {
      selectedAsset: contingencyResult.remainingCandidates[0]?.assetId ?? "NONE",
      selectedZone: contingencyResult.remainingCandidates[0]?.zoneId ?? "NONE",
    };

    try {
      const decisionOutput = await runDecisionAgent({
        searchZones,
        candidates: newCandidates,
        environmentalRisk: riskResult.environmentalRisk,
        incident: {
          incidentType: INCIDENT.status,
          urgency: INCIDENT.urgency,
          crewAtRisk: INCIDENT.crewAtRisk,
          summary: `${INCIDENT.vesselName} — ${INCIDENT.status}. Asset ${targetAssetId} failed.`,
        },
        provider: aiProvider,
        geminiApiKey: geminiKey,
        mistralApiKey: mistralKey,
        groqApiKey: groqKey,
        openrouterApiKey: openrouterKey,
        openRouterApiKey: openrouterKey,
        ollamaModel,
      });
      newDecision = {
        selectedAsset: decisionOutput.selectedAsset,
        selectedZone: decisionOutput.selectedZone,
      };
      // Update missionState so AIDecisionCard reflects the new contingency decision
      setMissionState((prev) =>
        prev
          ? {
              ...prev,
              decision: decisionOutput,
              candidates: newCandidates,
            }
          : null
      );
    } catch (err) {
      console.warn("[Failure Sim] Decision agent failed, using contingency fallback:", err);
    }

    // Step 6: Recalculate route with new selected asset
    const newAssetData = contingencyResult.updatedAssets.find(
      (a) => a.id === newDecision.selectedAsset
    );
    const newZoneData = searchZones.find((z) => z.id === newDecision.selectedZone) ?? searchZones[0];
    if (newAssetData) {
      setSelectedAssetId(newAssetData.id);
    }
    // Steps 7 & 8: Map + metrics update reactively via state changes above

    // Step 9: Set Before/After comparison snapshot
    const afterTopCandidate = newCandidates.find(
      (c) => c.assetId === newDecision.selectedAsset
    ) ?? newCandidates[0] ?? null;

    setFailureComparison({
      failedAssetId: targetAssetId,
      before: beforeSnapshot,
      after: {
        selectedAsset: newDecision.selectedAsset,
        selectedZone: newDecision.selectedZone,
        topCandidate: afterTopCandidate,
        candidateCount: newCandidates.filter((c) => c.enduranceFeasible).length,
      },
    });

    // Step 10: Ask copilot to explain why the new allocation changed
    try {
      const explanation = await explainDecision({
        question: "What changed after the asset failure?",
        incident: {
          incidentType: INCIDENT.status,
          urgency: INCIDENT.urgency,
          crewAtRisk: INCIDENT.crewAtRisk,
          summary: INCIDENT.status,
        },
        predictedPosition: {
          latitude: predictionResult.predictedLatitude,
          longitude: predictionResult.predictedLongitude,
          distanceTravelledKm: predictionResult.distanceTravelledKm,
        },
        environmentalRisk: riskResult,
        searchZones,
        candidates: newCandidates,
        selectedAsset: newDecision.selectedAsset,
        selectedZone: newDecision.selectedZone,
        failedAssetId: targetAssetId,
        provider: aiProvider,
        geminiApiKey: geminiKey,
        mistralApiKey: mistralKey,
        groqApiKey: groqKey,
        openrouterApiKey: openrouterKey,
        openRouterApiKey: openrouterKey,
      });

      setThinking(false);
      setBusy(null);
      push(msg("copilot",
        `[ASSET FAILURE — ${targetAssetId} REMOVED]\n` +
        `${explanation.contingencyRationale}\n\n` +
        `NEW TASKING:\n${explanation.assetSelectionRationale}`
      ));
    } catch (err) {
      setThinking(false);
      setBusy(null);
      push(msg("copilot",
        `${targetAssetId} marked FAILED. Contingency re-tasking: ${newDecision.selectedAsset} → ${newDecision.selectedZone}.`
      ));
    }
  }, [candidates, activeAssets, searchZones, riskResult, predictionResult, aiProvider, push, geminiKey, mistralKey, groqKey, openrouterKey]);

  // Connect RUN PREDICTION button to the 7-step pipeline
  const onAction = useCallback(
    (k: ActionKey) => {
      if (k === "fail") {
        onSimulateFailure();
        return;
      }

      setBusy(k);
      // For most actions the busy indicator clears after 1.2s.
      // For "replay" and "recalc" we manage setBusy(null) ourselves
      // (replay: the useEffect clears it; recalc: the .then()/.catch() clears it).
      if (k !== "replay" && k !== "recalc") {
        setTimeout(() => setBusy(null), 1200);
      }

      if (k === "run") {
        // ───────────────────────────────────────────────────────────────────────
        // STEP A: run the deterministic engines (already done by useMemo above).
        // STEP B: call runMission() which re-runs the same math AND calls the
        //         AI Triage Agent + AI Decision Agent in sequence.
        //
        // Why call the engines twice?
        //   The useMemos always keep the map/metrics live.
        //   runMission() adds the AI reasoning layer on top, whose output we
        //   store separately in missionState so we can display it in the UI.
        // ───────────────────────────────────────────────────────────────────────
        setPredicted(true);
        setRunCount((c) => c + 1);
        setIsDecisionRunning(true);
        push(msg("operator", "RUN PREDICTION + AI DECISION AGENT"));

        // Log the deterministic pipeline results immediately
        reason(
          `4-Engine Pipeline Executed (Active Provider: ${aiProvider}):\n` +
            `1. Loaded vessel MV-204 from vessels.json.\n` +
            `2. Scenario: ${envScenario} — Observation: ${currentObservation.timestamp}.\n` +
            `3. predictPosition(): Fix at ${predictionResult.predictedLatitude.toFixed(4)}°N, ${predictionResult.predictedLongitude.toFixed(4)}°E (dist: ${predictionResult.distanceTravelledKm.toFixed(2)} km).\n` +
            `4. calculateEnvironmentalRisk(): Risk ${(riskResult.environmentalRisk * 100).toFixed(0)}% (Hazard: ${riskResult.hazardLevel}, Uncertainty: ${riskResult.uncertaintyMultiplier.toFixed(2)}x).\n` +
            `5. generateSearchZones(): Created 25 search zones (Top 1: ${searchZones[0]?.id} with ${((searchZones[0]?.probability ?? 0) * 100).toFixed(1)}% prob).\n` +
            `6. generateCandidates(): Evaluated ${candidates.length} asset-zone pairings (Top: ${candidates[0]?.assetId} -> ${candidates[0]?.zoneId}, cost: ${candidates[0]?.totalCost.toFixed(1)}).\n` +
            `7. Calling AI Decision Agent (${aiProvider})...`,
        );

        // Kick off runMission() in the background (async).
        // The useMemo results are passed in so runMission uses the same data.
        const vessel = simulatedVessel;
        const dynamicDistressText = `${vessel.name} (${vessel.type}) in distress at ${vessel.latitude.toFixed(4)}°N, ${vessel.longitude.toFixed(4)}°E. Status: ${vessel.status}. Crew at risk: ${vessel.crewAtRisk} persons. Urgency level: ${vessel.urgency}/5. Environment: ${envScenario} with ${currentObservation.wind_kt} kt wind and sea state ${simulation.environment.seaState}.${simulation.activeVessels.length > 1 ? ` Total ${simulation.activeVessels.length} vessels in distress area.` : ""}`;

        runMission({
          rawDistressText: dynamicDistressText,
          simulatedVessel: vessel,
          michaungObservation: currentObservation,
          assets: activeAssets,
          provider: aiProvider,
          geminiApiKey: geminiKey,
          mistralApiKey: mistralKey,
          groqApiKey: groqKey,
          openrouterApiKey: openrouterKey,
          openRouterApiKey: openrouterKey,
          ollamaModel,
        })
          .then((state) => {
            // Store the full AI mission state
            setMissionState(state);
            setIsDecisionRunning(false);

            // Use the Decision Agent’s selected asset to drive the route
            if (state.decision.selectedAsset && state.decision.selectedAsset !== "NONE") {
              setSelectedAssetId(state.decision.selectedAsset);
            }

            // Tell the copilot what the AI decided
            push(msg(
              "copilot",
              `[AI DECISION AGENT] Triage: ${state.triage.incidentType} (Urgency ${state.triage.urgency}/5, ${state.triage.crewAtRisk} crew at risk).\n` +
              `Decision: ${state.decision.selectedAsset} → ${state.decision.selectedZone} (Confidence: ${state.decision.confidence.toFixed(0)}%).\n` +
              `Rationale: ${state.decision.reason}`,
            ));
          })
          .catch((err) => {
            console.warn("[RUN PREDICTION] runMission failed, deterministic results still active:", err);
            setIsDecisionRunning(false);
            push(msg("copilot", "AI Decision Agent unavailable. Deterministic engine results are still shown below."));
          });

      } else if (k === "recalc") {
        // ───────────────────────────────────────────────────────────────────────
        // RECALCULATE re-runs the full AI pipeline with current scenario state.
        // This means: same observation, but any failed asset stays failed.
        // The AIDecisionCard will update with fresh output, not just a log line.
        // ───────────────────────────────────────────────────────────────────────
        push(msg("operator", `RECALCULATE — Scenario: ${envScenario}${failedAssetId ? ` | Asset ${failedAssetId} FAILED` : ""}`));
        setIsDecisionRunning(true);

        const dynamicDistressText = `${simulatedVessel.name} (${simulatedVessel.type}) in distress at ${simulatedVessel.latitude.toFixed(4)}°N, ${simulatedVessel.longitude.toFixed(4)}°E. Status: ${simulatedVessel.status}. Crew at risk: ${simulatedVessel.crewAtRisk} persons. Urgency level: ${simulatedVessel.urgency}/5. Environment: ${envScenario} with ${currentObservation.wind_kt} kt wind and sea state ${simulation.environment.seaState}.${simulation.activeVessels.length > 1 ? ` Total ${simulation.activeVessels.length} vessels in distress area.` : ""}`;

        runMission({
          rawDistressText: dynamicDistressText,
          simulatedVessel,
          michaungObservation: currentObservation,
          // Pass in the current asset pool, which already has failed assets marked unavailable
          assets: activeAssets,
          provider: aiProvider,
          // Tell runMission which asset failed so it excludes it
          failedAssetId: failedAssetId ?? undefined,
          geminiApiKey: geminiKey,
          mistralApiKey: mistralKey,
          groqApiKey: groqKey,
          openrouterApiKey: openrouterKey,
          openRouterApiKey: openrouterKey,
          ollamaModel,
        })
          .then((state) => {
            setMissionState(state);
            setIsDecisionRunning(false);
            setBusy(null);
            if (state.decision.selectedAsset && state.decision.selectedAsset !== "NONE") {
              setSelectedAssetId(state.decision.selectedAsset);
            }
            push(msg(
              "copilot",
              `[RECALCULATE] Scenario ${envScenario}, obs: ${currentObservation.timestamp}.\n` +
              `Risk: ${(state.environmentalRisk.environmentalRisk * 100).toFixed(0)}% (${state.environmentalRisk.hazardLevel})\n` +
              `AI Decision: ${state.decision.selectedAsset} → ${state.decision.selectedZone} ` +
              `(Confidence: ${state.decision.confidence.toFixed(0)}%).\n` +
              `${state.decision.reason}`,
            ));
          })
          .catch((err) => {
            console.warn("[RECALCULATE] runMission failed:", err);
            setIsDecisionRunning(false);
            setBusy(null);
            push(msg("copilot", "Recalculate failed. Deterministic engine results remain active."));
          });

      } else if (k === "replay") {
        // ───────────────────────────────────────────────────────────────────────
        // HISTORICAL REPLAY steps through all 34 Michaung track observations.
        // The replay useEffect ticks cycloneIndex 0→33 every 600 ms, which
        // drives currentObservation → riskResult → searchZones → candidates →
        // route → map + CycloneStatusCard — every panel updates automatically.
        //
        // We ensure scenario is CYCLONE_MICHAUNG so the track data is used.
        // busy stays set to "replay" for the whole animation duration;
        // the useEffect clears it when it calls setBusy(null) at the end.
        // ───────────────────────────────────────────────────────────────────────
        // Switch to Michaung scenario so the track drives the map
        simulation.actions.updateEnvironment({
          selectedScenario: "CYCLONE_MICHAUNG",
          windSpeedKnots: MICHAUNG_TRACK[0]?.wind_kt ?? 0,
        });
        // Start from the first observation (index 0)
        setReplay(0);
        // Do NOT call setBusy(null) after 1200ms — the useEffect will clear busy
        // when the replay finishes (~34 × 600ms = ~20s total)
        push(msg("operator",
          `HISTORICAL REPLAY — stepping through ${REPLAY_TRACK_LENGTH} Michaung track observations ` +
          `at 600 ms/step (~${Math.round(REPLAY_TRACK_LENGTH * 0.6)}s). Watch the map and Cyclone Status Card.`
        ));
      } else {
        // RESET: restore all assets and clear failure state + AI mission state
        setFailedAssetId(null);
        setFailureComparison(null);
        simulation.actions.reset();
        setMissionState(null);      // ← clear AI decision panel back to placeholder
        setIsDecisionRunning(false);
        setPredicted(true);
        setReplay(null);
        setSelectedAssetId(null);
        setMessages([
          msg(
            "copilot",
            `Scenario reset to baseline. All assets restored. Scenario: ${envScenario}. Active AI Provider: ${aiProvider}.`,
          ),
        ]);
      }
    },
    [push, reason, riskResult, currentObservation, predictionResult, searchZones, candidates, aiProvider, envScenario, onSimulateFailure, activeAssets, failedAssetId, simulatedVessel, simulation],
  );

  return (
    <main className="dark flex min-h-screen flex-col bg-abyss text-foreground">
      <TopBar
        clock={clock}
        online={!failedAssetId}
        provider={aiProvider}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <div className="grid flex-1 gap-3 p-3 lg:grid-cols-[340px_minmax(0,1fr)_360px] lg:p-4 min-h-0 overflow-hidden mx-auto w-full max-w-[1920px]">
        {/* Left Column: Incident Panel + Historical Cyclone Status Card */}
        <div className="flex flex-col gap-3 overflow-y-auto lg:h-[calc(100vh-8.5rem)] pr-1">
          <IncidentPanel
            incident={{
              ...INCIDENT,
              // After a mission run, override these three fields with what the
              // AI Triage Agent actually classified from the raw distress text.
              // Before the first run, the static INCIDENT constants are shown.
              ...(missionState?.triage
                ? {
                    urgency: missionState.triage.urgency as (1 | 2 | 3 | 4 | 5),
                    crewAtRisk: missionState.triage.crewAtRisk,
                    status: missionState.triage.incidentType,
                  }
                : {}),
              position: { lat: simulatedVessel.latitude, lon: simulatedVessel.longitude },
            }}
            elapsedExtra={Math.floor(simulation.elapsedMinutes)}
            liveSpeedKts={simulatedVessel.speedKnots}
            liveHeadingDeg={simulatedVessel.headingDegrees}
            liveMinutesSinceContact={simulatedVessel.minutesSinceContact}
            liveWindKts={simulation.environment.windSpeedKnots}
            liveCurrentKts={simulation.environment.currentSpeedKnots}
            liveSeaState={simulation.environment.seaState}
          />
          <CycloneStatusCard
            currentObservation={currentObservation}
            currentIndex={cycloneIndex}
            onIndexChange={(index) => {
              setCycloneIndex(index);
              simulation.actions.updateEnvironment({
                windSpeedKnots: getObservationByIndex(index).wind_kt,
              });
            }}
            riskResult={{
              distanceToCycloneKm: riskResult.distanceToCycloneKm,
              environmentalRisk: riskResult.environmentalRisk,
              uncertaintyMultiplier: riskResult.uncertaintyMultiplier,
              hazardLevel: riskResult.hazardLevel === "HIGH" ? "CRITICAL" : riskResult.hazardLevel === "MEDIUM" ? "HIGH" : "LOW",
            }}
          />
          {/* Environmental Scenario Selector */}
          <EnvironmentScenarioSelector
            value={envScenario}
            onChange={(s) => {
              let baselineWind = 5;
              let baselineCurrent = 0.5;
              let baselineSeaState = 1;

              if (s === "NORMAL_CONDITIONS") {
                baselineWind = 5;
                baselineCurrent = 0.5;
                baselineSeaState = 1;
              } else if (s === "CYCLONE_MICHAUNG") {
                const obs = getObservationByIndex(cycloneIndex);
                baselineWind = obs.wind_kt;
                baselineCurrent = Math.round(obs.wind_kt * 0.05 * 10) / 10;
                baselineSeaState = Math.min(6, Math.max(1, Math.ceil(obs.wind_kt / 18)));
              } else if (s === "SEVERE_STORM") {
                baselineWind = 120;
                baselineCurrent = 4.5;
                baselineSeaState = 6;
              } else if (s === "CUSTOM") {
                baselineWind = simulation.environment.windSpeedKnots || 45;
                baselineCurrent = simulation.environment.currentSpeedKnots || 2.0;
                baselineSeaState = simulation.environment.seaState || 3;
              }

              simulation.actions.updateEnvironment({
                selectedScenario: s,
                windSpeedKnots: baselineWind,
                currentSpeedKnots: baselineCurrent,
                seaState: baselineSeaState,
              });
              // Restore all assets when switching scenarios
              setFailedAssetId(null);
              setFailureComparison(null);
              simulation.actions.restoreAssets();
            }}
            disabled={busy !== null}
          />
          <SimulationControls
            vessels={simulation.activeVessels}
            assets={activeAssets}
            environment={simulation.environment}
            onVesselCountChange={simulation.actions.setVesselCount}
            onRandomizePositions={simulation.actions.randomizeVesselPositions}
            onVesselChange={simulation.actions.updateVessel}
            onEnvironmentChange={simulation.actions.updateEnvironment}
            onAssetAvailabilityChange={simulation.actions.setAssetAvailability}
            onAssetChange={simulation.actions.updateAsset}
            onApplyScenario={() => {
              simulation.actions.applyScenario();
              setPredicted(true);
            }}
            onResetScenario={() => onAction("reset")}
          />
        </div>

        {/* Center Column: Map & Engine Results Display */}
        <div className="flex flex-col gap-3 lg:h-[calc(100vh-8.5rem)] overflow-y-auto pr-1">
          <section className="glass relative min-h-[400px] h-[480px] shrink-0 overflow-hidden rounded-lg">
            <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between border-b border-border bg-abyss/60 px-4 py-2 backdrop-blur">
              <div className="flex items-center gap-2">
                <h2 className="panel-label">Tactical Chart — Bay of Bengal</h2>
                <span className="rounded bg-cyan/20 border border-cyan/40 px-1.5 py-0.5 font-mono text-[9px] font-bold text-cyan">
                  4 ENGINES CONNECTED
                </span>
                {replay !== null && (
                  <span className="flex items-center gap-1 rounded bg-warning/20 border border-warning/50 px-2 py-0.5 font-mono text-[9px] font-bold text-warning animate-pulse">
                    <span>🌀 REPLAYING TRACK: {replay + 1}/{REPLAY_TRACK_LENGTH}</span>
                    <span className="text-[8px] opacity-80">({currentObservation.timestamp})</span>
                  </span>
                )}
              </div>
              <div className="hidden items-center gap-3 sm:flex">
                {[
                  { c: "text-emergency", g: "▲", l: "VESSEL (PREDICTED)" },
                  {
                    c: "text-warning",
                    g: "🌀",
                    l: envScenario === "CYCLONE_MICHAUNG"
                      ? "CYCLONE (HISTORICAL)"
                      : envScenario === "SEVERE_STORM"
                      ? "STORM (SIMULATED)"
                      : "WEATHER (NORMAL)",
                  },
                  { c: "text-cyan", g: "◆", l: "RESCUE ASSETS" },
                  ...(failedAssetId ? [{ c: "text-emergency", g: "✕", l: "FAILED ASSET" }] : []),
                ].map((i) => (
                  <span key={i.l} className="flex items-center gap-1.5">
                    <span className={`font-mono text-[10px] ${i.c}`}>{i.g}</span>
                    <span className="data-key">{i.l}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 pt-9">
              <ClientOnly fallback={<div className="grid-backdrop size-full" />}>
                <Suspense fallback={<div className="grid-backdrop size-full" />}>
                  <LiveMap
                    lastKnownPosition={{
                      latitude: simulatedVessel.latitude,
                      longitude: simulatedVessel.longitude,
                      name: simulatedVessel.name ?? "MV-204",
                    }}
                    currentObservation={currentObservation}
                    track={michaungData.track}
                    riskResult={riskResult}
                    predictedLatitude={predictionResult.predictedLatitude}
                    predictedLongitude={predictionResult.predictedLongitude}
                    searchZones={searchZones}
                    vesselResults={vesselResults}
                    rescueAssets={activeAssets}
                    selectedAssetId={selectedAssetId}
                    failedAssetId={failedAssetId}
                    routePath={routeResult.path}
                    onSelectAsset={(assetId) => setSelectedAssetId(assetId)}
                    onAssetMove={(assetId, lat, lon) => {
                      simulation.actions.updateAssetPosition(assetId, lat, lon);
                      push(
                        msg(
                          "copilot",
                          `📍 Rescue Asset ${assetId} dragged to ${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E. Candidate scores, ETAs and routes recalculated.`
                        )
                      );
                    }}
                  />
                </Suspense>
              </ClientOnly>
            </div>
          </section>

          {/* Failure Comparison Panel — animated, shown when failure is simulated */}
          {failureComparison && (
            <FailureComparisonPanel
              failedAssetId={failureComparison.failedAssetId}
              before={failureComparison.before}
              after={failureComparison.after}
              onDismiss={() => setFailureComparison(null)}
            />
          )}

          {/* AI Decision Agent Card — shown above the deterministic results panel.
               Before first run: displays a "not yet run" placeholder.
               While running: shows a spinner.
               After running: shows selectedAsset, zone, confidence, rationale. */}
          <AIDecisionCard
            decision={missionState?.decision ?? null}
            isRunning={isDecisionRunning}
          />

          {/* Deterministic Engine Results Panel — always shows the raw engine math,
               unchanged regardless of what the AI agent decided. */}
          <PredictionResultsPanel
            prediction={predictionResult}
            risk={riskResult}
            searchZones={searchZones}
            candidates={candidates}
          />
        </div>

        {/* Right Column: AI Copilot Panel */}
        <div className="lg:h-[calc(100vh-8.5rem)]">
          <CopilotPanel
            messages={messages}
            thinking={thinking}
            recommendation={recommendation}
            onAsk={onAsk}
            onStop={handleStop}
          />
        </div>
      </div>

      <footer className="space-y-3 border-t border-border bg-abyss/50 p-3 backdrop-blur lg:p-4 shrink-0 mx-auto w-full max-w-[1920px]">
        <MetricsBar m={metrics} />
        <ActionBar onAction={onAction} busy={busy} />
      </footer>

      {/* AI Provider & Key Settings Modal */}
      <AISettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        provider={aiProvider}
        onProviderChange={handleProviderChange}
        geminiKey={geminiKey}
        onGeminiKeyChange={handleGeminiKeyChange}
        mistralKey={mistralKey}
        onMistralKeyChange={handleMistralKeyChange}
        groqKey={groqKey}
        onGroqKeyChange={handleGroqKeyChange}
        openrouterKey={openrouterKey}
        openRouterKey={openrouterKey}
        onOpenrouterKeyChange={handleOpenrouterKeyChange}
        onOpenRouterKeyChange={handleOpenrouterKeyChange}
        ollamaModel={ollamaModel}
        onOllamaModelChange={handleOllamaModelChange}
      />
    </main>
  );
}
