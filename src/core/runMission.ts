import vesselsData from "@/data/vessels.json";
import assetsData from "@/data/assets.json";
import { MICHAUNG_TRACK, type CycloneObservation } from "@/lib/michaung-data";

import { runTriageAgent, type TriageOutput } from "@/agents/triage";
import { predictPosition, type PredictionResult } from "@/engines/prediction";
import { calculateEnvironmentalRisk, type RiskResult } from "@/engines/risk";
import { generateSearchZones, type SearchZone } from "@/engines/probability";
import { generateCandidates, type Candidate, type RescueAsset } from "@/engines/scoring";
import { runDecisionAgent, type DecisionOutput } from "@/agents/decision";
import { validateDecision } from "@/agents/validation";
import { calculateRoute, type RouteResult } from "@/engines/routing";
import { explainDecision, type CopilotExplanation, type AIProvider } from "@/agents/copilot";

export interface RescueVessel {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  speedKnots: number;
  headingDegrees: number;
  crewAtRisk: number;
  minutesSinceContact: number;
  urgency: number;
  status: string;
  dataType: string;
}

export interface MissionInput {
  rawDistressText: string;
  simulatedVessel?: RescueVessel | undefined;
  michaungObservation?: CycloneObservation | undefined;
  assets?: RescueAsset[] | undefined;
  provider?: AIProvider | undefined;
  failedAssetId?: string | undefined;
  geminiApiKey?: string | undefined;
  mistralApiKey?: string | undefined;
  groqApiKey?: string | undefined;
  openrouterApiKey?: string | undefined;
  openRouterApiKey?: string | undefined;
  ollamaModel?: string | undefined;
}

export interface MissionState {
  triage: TriageOutput;
  prediction: PredictionResult;
  environmentalRisk: RiskResult;
  searchZones: SearchZone[];
  candidates: Candidate[];
  decision: DecisionOutput;
  route: RouteResult;
  explanation: CopilotExplanation;
}

/**
 * MSAR Core Orchestrator — runMission
 *
 * Integrates mathematical engines and AI agents in strict sequential order:
 * 1. Receive raw distress text.
 * 2. Call Triage Agent.
 * 3. Read simulated vessel data.
 * 4. Run position prediction engine.
 * 5. Run environmental risk engine using selected Michaung observation.
 * 6. Generate search probability zones.
 * 7. Generate rescue candidates using scoring engine.
 * 8. Send incident, search zones, and candidates to Decision Agent.
 * 9. Validate selected decision.
 * 10. Calculate route using routing engine.
 * 11. Generate Copilot explanation.
 * 12. Return complete mission state.
 */
export async function runMission(input: MissionInput): Promise<MissionState> {
  const provider = input.provider ?? "GEMINI";
  const geminiApiKey = input.geminiApiKey;
  const mistralApiKey = input.mistralApiKey;
  const groqApiKey = input.groqApiKey;
  const openrouterApiKey = input.openrouterApiKey;
  const openRouterApiKey = input.openRouterApiKey;
  const ollamaModel = input.ollamaModel;

  // Step 1 & 2: Call Triage Agent on raw distress text
  const triage = await runTriageAgent({
    rawText: input.rawDistressText,
    provider,
    geminiApiKey,
    mistralApiKey,
    groqApiKey,
    openrouterApiKey,
    openRouterApiKey,
    ollamaModel,
  });

  // Step 3: Read simulated vessel data
  const vessel: RescueVessel = input.simulatedVessel ?? (vesselsData[0] as RescueVessel);

  // Step 4: Run position prediction engine
  const prediction = predictPosition({
    latitude: vessel.latitude,
    longitude: vessel.longitude,
    speedKnots: vessel.speedKnots,
    headingDegrees: vessel.headingDegrees,
    elapsedMinutes: vessel.minutesSinceContact,
  });

  // Step 5: Run environmental risk engine using selected Michaung observation
  const observation: CycloneObservation =
    input.michaungObservation ?? MICHAUNG_TRACK[1]! ?? MICHAUNG_TRACK[0]!;

  const environmentalRisk = calculateEnvironmentalRisk({
    vesselLatitude: prediction.predictedLatitude,
    vesselLongitude: prediction.predictedLongitude,
    cycloneLatitude: observation.latitude,
    cycloneLongitude: observation.longitude,
    cycloneWindKnots: observation.wind_kt,
  });

  // Step 6: Generate search probability zones
  const uncertaintyKm = Math.max(10, 25 * environmentalRisk.uncertaintyMultiplier);
  const searchZones = generateSearchZones({
    centerLatitude: prediction.predictedLatitude,
    centerLongitude: prediction.predictedLongitude,
    uncertaintyKm,
  });

  // Step 7: Generate rescue candidates using existing scoring engine
  const rawAssets: RescueAsset[] = input.assets ?? (assetsData as RescueAsset[]);
  const activeAssets = input.failedAssetId
    ? rawAssets.map((a) => (a.id === input.failedAssetId ? { ...a, available: false } : a))
    : rawAssets;

  const hazardPenalty = Math.round(environmentalRisk.environmentalRisk * 100);
  const candidates = generateCandidates(activeAssets, searchZones, hazardPenalty);

  // Step 8: Send incident, search zones, and candidates to Decision Agent
  const incident = {
    incidentType: triage.incidentType,
    urgency: triage.urgency,
    crewAtRisk: triage.crewAtRisk,
    summary: triage.summary,
  };

  let decision = await runDecisionAgent({
    incident,
    searchZones,
    candidates,
    environmentalRisk: environmentalRisk.environmentalRisk,
    provider,
    geminiApiKey,
    mistralApiKey,
    groqApiKey,
    openrouterApiKey,
    openRouterApiKey,
    ollamaModel,
  });

  // Step 9: Deterministic decision validation layer
  const validation = validateDecision({
    decision,
    assets: activeAssets,
    searchZones,
    candidates,
    requiresMedical: triage.incidentType === "MEDICAL_EMERGENCY",
  });

  if (!validation.valid || validation.wasOverridden) {
    decision = {
      ...decision,
      selectedAsset: validation.selectedAsset,
      selectedZone: validation.selectedZone,
      reason: `[VALIDATION OVERRIDE: ${validation.failedConstraint}] ${validation.failureReason} Re-tasked to alternative valid asset ${validation.selectedAsset} in zone ${validation.selectedZone}.`,
    };
  }

  // Step 10: Calculate route using existing routing engine
  const selectedAssetObj =
    activeAssets.find((a) => a.id === decision.selectedAsset) || activeAssets[0]!;
  const targetZoneObj =
    searchZones.find((z) => z.id === decision.selectedZone) || searchZones[0]!;

  const route = calculateRoute({
    startLat: selectedAssetObj.latitude,
    startLon: selectedAssetObj.longitude,
    targetLat: targetZoneObj.latitude,
    targetLon: targetZoneObj.longitude,
    cycloneLat: observation.latitude,
    cycloneLon: observation.longitude,
    cycloneWindSpeed: observation.wind_kt,
  });

  // Step 11: Generate Copilot explanation
  const explanation = await explainDecision({
    incident,
    predictedPosition: {
      latitude: prediction.predictedLatitude,
      longitude: prediction.predictedLongitude,
      distanceTravelledKm: prediction.distanceTravelledKm,
    },
    environmentalRisk,
    searchZones,
    candidates,
    selectedAsset: decision.selectedAsset,
    selectedZone: decision.selectedZone,
    route,
    ...(input.failedAssetId ? { failedAssetId: input.failedAssetId } : {}),
    provider,
    geminiApiKey,
    mistralApiKey,
    groqApiKey,
    openrouterApiKey,
    openRouterApiKey,
    ollamaModel,
  });

  // Step 12: Return complete mission state
  return {
    triage,
    prediction,
    environmentalRisk,
    searchZones,
    candidates,
    decision,
    route,
    explanation,
  };
}
