import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI, Type } from "@google/genai";
import { z } from "zod";
import type { Candidate } from "@/engines/scoring";
import type { SearchZone } from "@/engines/probability";

export type AIProvider = "GEMINI" | "MISTRAL" | "GROQ" | "OPENROUTER" | "OLLAMA";

export interface CopilotInput {
  incident?: {
    incidentType?: string | undefined;
    urgency?: number | undefined;
    crewAtRisk?: number | undefined;
    summary?: string | undefined;
  } | undefined;
  predictedPosition?: {
    latitude: number;
    longitude: number;
    distanceTravelledKm?: number | undefined;
  } | undefined;
  environmentalRisk?: {
    environmentalRisk: number;
    hazardLevel: string;
    uncertaintyMultiplier: number;
    distanceToCycloneKm?: number | undefined;
  } | number | undefined;
  searchZones: SearchZone[];
  candidates: Candidate[];
  selectedAsset: string;
  selectedZone: string;
  route?: any;
  failedAssetId?: string | undefined;
  question?: string | undefined;
  provider?: AIProvider | undefined;
  geminiApiKey?: string | undefined;
  mistralApiKey?: string | undefined;
  groqApiKey?: string | undefined;
  openrouterApiKey?: string | undefined;
  openRouterApiKey?: string | undefined;
  ollamaModel?: string | undefined;
}

export const CopilotExplanationSchema = z.object({
  headline: z.string(),
  assetSelectionRationale: z.string(),
  zonePriorityRationale: z.string(),
  rejectedAssetsRationale: z.string(),
  environmentalImpactRationale: z.string(),
  contingencyRationale: z.string().optional(),
  fullBriefing: z.string(),
});

export type CopilotExplanation = z.infer<typeof CopilotExplanationSchema>;

export const runCopilotOnServer = createServerFn({ method: "POST" })
  .validator(
    z.object({
      incident: z.any().optional(),
      predictedPosition: z.any().optional(),
      environmentalRisk: z.any().optional(),
      searchZones: z.array(z.any()),
      candidates: z.array(z.any()),
      selectedAsset: z.string(),
      selectedZone: z.string(),
      route: z.any().optional(),
      failedAssetId: z.string().optional(),
      question: z.string().optional(),
      provider: z.enum(["GEMINI", "MISTRAL", "GROQ", "OPENROUTER", "OLLAMA"]).optional(),
      geminiApiKey: z.string().optional(),
      mistralApiKey: z.string().optional(),
      groqApiKey: z.string().optional(),
      openrouterApiKey: z.string().optional(),
      openRouterApiKey: z.string().optional(),
      ollamaModel: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const provider = data.provider ?? "GEMINI";

    if (provider === "OLLAMA") {
      return runOllamaCopilot(data as CopilotInput);
    } else if (provider === "OPENROUTER") {
      return runOpenRouterCopilot(data as CopilotInput);
    } else if (provider === "GROQ") {
      return runGroqCopilot(data as CopilotInput);
    } else if (provider === "MISTRAL") {
      return runMistralCopilot(data as CopilotInput);
    } else {
      return runGeminiCopilot(data as CopilotInput);
    }
  });

async function runGeminiCopilot(input: CopilotInput): Promise<CopilotExplanation> {
  const apiKey =
    input.geminiApiKey?.trim() ||
    process.env["GEMINI_API_KEY"] ||
    process.env["VITE_GEMINI_API_KEY"] ||
    "";

  if (!apiKey) {
    return parseCopilotFallback(input);
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `You are the MSAR SAR Copilot for Maritime Search & Rescue.
Your sole job is to EXPLAIN an ALREADY-CALCULATED MSAR decision to a human search director.

STRICT CONSTRAINTS:
1. Only use facts provided in the input JSON below.
2. NEVER calculate a new route, ETA, distance, or probability.
3. NEVER invent numbers, coordinates, or assets.
4. NEVER change or override the selected asset or zone decision.
5. Provide clear operational answers to:
   - Why was this asset (${input.selectedAsset}) selected?
   - Why is search zone ${input.selectedZone} highest priority?
   - Why were other assets not selected?
   - How did environmental risk affect the decision?
   - What changed after asset failure (if failedAssetId is present)?

Context JSON:
${JSON.stringify(input, null, 2)}
${input.question ? `User Question: "${input.question}"` : ""}
`;

  const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];

  for (const modelName of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              headline: { type: Type.STRING },
              assetSelectionRationale: { type: Type.STRING },
              zonePriorityRationale: { type: Type.STRING },
              rejectedAssetsRationale: { type: Type.STRING },
              environmentalImpactRationale: { type: Type.STRING },
              contingencyRationale: { type: Type.STRING },
              fullBriefing: { type: Type.STRING },
            },
            required: [
              "headline",
              "assetSelectionRationale",
              "zonePriorityRationale",
              "rejectedAssetsRationale",
              "environmentalImpactRationale",
              "fullBriefing",
            ],
          },
        },
      });

      const responseText = response.text ?? "";
      const parsedData = coerceExplanationFieldsToStrings(cleanJsonResponse(responseText));
      console.info(`[MSAR Copilot Server] Successfully invoked Gemini (${modelName})`);
      return CopilotExplanationSchema.parse(parsedData);
    } catch (err) {
      console.warn(`[MSAR Copilot Server] Gemini model ${modelName} failed:`, err);
    }
  }

  return parseCopilotFallback(input);
}

// Safety net: some providers (esp. Mistral/Groq under plain json_object mode,
// without a hard schema like Gemini's responseSchema) occasionally nest an
// object/array where a plain string was asked for, e.g.
// { "headline": { "text": "...", "reasoning": [...] } } instead of a string.
// Rather than failing Zod validation and silently dropping to the fallback,
// flatten any non-string field into a readable string before validating.
const EXPLANATION_STRING_FIELDS = [
  "headline",
  "assetSelectionRationale",
  "zonePriorityRationale",
  "rejectedAssetsRationale",
  "environmentalImpactRationale",
  "contingencyRationale",
  "fullBriefing",
] as const;

function stringifyField(value: unknown): string {
  if (typeof value === "string") return value;
  if (value == null) return "";
  if (Array.isArray(value)) return value.map(stringifyField).join("\n");
  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>)
      .map(stringifyField)
      .filter(Boolean)
      .join("\n");
  }
  return String(value);
}

function coerceExplanationFieldsToStrings(parsed: any): any {
  if (!parsed || typeof parsed !== "object") return parsed;
  const out = { ...parsed };
  for (const field of EXPLANATION_STRING_FIELDS) {
    if (field in out && typeof out[field] !== "string") {
      out[field] = stringifyField(out[field]);
    }
  }
  return out;
}

function cleanJsonResponse(text: string): any {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  }
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end >= start) {
    cleaned = cleaned.slice(start, end + 1);
  }
  return JSON.parse(cleaned);
}

async function runMistralCopilot(input: CopilotInput): Promise<CopilotExplanation> {
  const apiKey =
    input.mistralApiKey?.trim() ||
    process.env["MISTRAL_API_KEY"] ||
    process.env["VITE_MISTRAL_API_KEY"] ||
    "";

  if (!apiKey) {
    return parseCopilotFallback(input);
  }

  const mistralModels = ["mistral-small-latest", "mistral-small-2503"];

  for (const modelName of mistralModels) {
    try {
      const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: modelName,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: `You are the MSAR SAR Copilot. Explain the already-calculated decision to the operator.
Do NOT recalculate values or override decisions. Return a JSON object with EXACTLY these 7 keys:
headline, assetSelectionRationale, zonePriorityRationale, rejectedAssetsRationale, environmentalImpactRationale, contingencyRationale, fullBriefing.
STRICT FORMAT RULE: every one of those 7 values MUST be a single plain string (use \\n for line breaks within it).
Do NOT nest an object, an array, or sub-fields (like {"text": ..., "reasoning": ...}) inside any value — write the reasoning directly into the string itself.
Example of a correctly-shaped value: "headline": "MRV-1 tasked to Zone-B due to fastest ETA and low sea state."`,
            },
            {
              role: "user",
              content: JSON.stringify(input),
            },
          ],
        }),
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => "");
        throw new Error(`Mistral HTTP error ${response.status} (${modelName}): ${errText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content ?? "";
      const parsedData = coerceExplanationFieldsToStrings(cleanJsonResponse(content));
      console.info(`[MSAR Copilot Server] Successfully invoked Mistral AI (${modelName})`);
      return CopilotExplanationSchema.parse(parsedData);
    } catch (err) {
      console.warn(`[MSAR Copilot Server] Mistral model ${modelName} failed:`, err);
    }
  }

  console.error("[MSAR Copilot Server] ALL Mistral models failed. Using fallback.");
  return parseCopilotFallback(input);
}

async function runGroqCopilot(input: CopilotInput): Promise<CopilotExplanation> {
  const apiKey =
    input.groqApiKey?.trim() ||
    process.env["GROQ_API_KEY"] ||
    process.env["VITE_GROQ_API_KEY"] ||
    "";

  if (!apiKey) {
    console.info("[MSAR Copilot Server] Groq API key not found. Using fallback.");
    return parseCopilotFallback(input);
  }

  const groqModels = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"];

  for (const modelName of groqModels) {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: modelName,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: `You are the MSAR SAR Copilot. Explain the already-calculated decision to the operator.
Do NOT recalculate values or override decisions. Return a JSON object with EXACTLY these 7 keys:
headline, assetSelectionRationale, zonePriorityRationale, rejectedAssetsRationale, environmentalImpactRationale, contingencyRationale, fullBriefing.
STRICT FORMAT RULE: every one of those 7 values MUST be a single plain string (use \\n for line breaks within it).
Do NOT nest an object, an array, or sub-fields (like {"text": ..., "reasoning": ...}) inside any value — write the reasoning directly into the string itself.
Example of a correctly-shaped value: "headline": "MRV-1 tasked to Zone-B due to fastest ETA and low sea state."`,
            },
            {
              role: "user",
              content: JSON.stringify(input),
            },
          ],
        }),
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => "");
        throw new Error(`Groq HTTP error ${response.status} (${modelName}): ${errText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content ?? "";
      const parsedData = coerceExplanationFieldsToStrings(cleanJsonResponse(content));
      console.info(`[MSAR Copilot Server] Successfully invoked Groq Cloud (${modelName})`);
      return CopilotExplanationSchema.parse(parsedData);
    } catch (err) {
      console.warn(`[MSAR Copilot Server] Groq model ${modelName} failed:`, err);
    }
  }

  console.error("[MSAR Copilot Server] ALL Groq models failed. Using fallback.");
  return parseCopilotFallback(input);
}

async function runOpenRouterCopilot(input: CopilotInput): Promise<CopilotExplanation> {
  const apiKey =
    input.openRouterApiKey?.trim() ||
    input.openrouterApiKey?.trim() ||
    process.env["OPENROUTER_API_KEY"] ||
    process.env["VITE_OPENROUTER_API_KEY"] ||
    "";

  if (!apiKey) {
    console.info("[MSAR Copilot Server] OpenRouter API key not found. Using fallback.");
    return parseCopilotFallback(input);
  }

  const modelsToTry = [
    "openai/gpt-4o-mini",
    "meta-llama/llama-3.3-70b-instruct",
    "google/gemini-2.0-flash-001",
    "mistralai/mistral-small-24b-instruct-2501",
  ];

  for (const modelName of modelsToTry) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "http://localhost:8080",
          "X-Title": "MSAR Command Center",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: modelName,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: `You are the MSAR SAR Copilot. Explain the already-calculated decision to the operator.
Do NOT recalculate values or override decisions. Return a JSON object with EXACTLY these 7 keys:
headline, assetSelectionRationale, zonePriorityRationale, rejectedAssetsRationale, environmentalImpactRationale, contingencyRationale, fullBriefing.
STRICT FORMAT RULE: every one of those 7 values MUST be a single plain string (use \\n for line breaks within it).
Do NOT nest an object, an array, or sub-fields (like {"text": ..., "reasoning": ...}) inside any value — write the reasoning directly into the string itself.
Example of a correctly-shaped value: "headline": "MRV-1 tasked to Zone-B due to fastest ETA and low sea state."`,
            },
            {
              role: "user",
              content: JSON.stringify(input),
            },
          ],
        }),
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => "");
        throw new Error(`OpenRouter HTTP error ${response.status} (${modelName}): ${errText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content ?? "";
      const parsedData = coerceExplanationFieldsToStrings(cleanJsonResponse(content));
      console.info(`[MSAR Copilot Server] Successfully invoked OpenRouter (${modelName})`);
      return CopilotExplanationSchema.parse(parsedData);
    } catch (err: any) {
      console.warn(`[MSAR Copilot Server] OpenRouter model ${modelName} failed:`, err?.message ?? err);
    }
  }

  return parseCopilotFallback(input);
}

// ============================================================================
// OLLAMA — local AI server implementation (zero API keys, 100% offline)
// ============================================================================
async function runOllamaCopilot(input: CopilotInput): Promise<CopilotExplanation> {
  const model = input.ollamaModel?.trim() || "gemma4:latest";

  try {
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        format: "json",
        stream: false,
        keep_alive: "60m",
        options: {
          num_predict: 450,
          temperature: 0.2,
        },
        messages: [
          {
            role: "system",
            content: `You are the MSAR SAR Copilot. Explain the already-calculated decision to the operator.
Do NOT recalculate values or override decisions. Return a JSON object with EXACTLY these 7 keys:
headline, assetSelectionRationale, zonePriorityRationale, rejectedAssetsRationale, environmentalImpactRationale, contingencyRationale, fullBriefing.
STRICT FORMAT RULE: every one of those 7 values MUST be a single plain string (use \\n for line breaks within it).
Do NOT nest an object, an array, or sub-fields (like {"text": ..., "reasoning": ...}) inside any value — write the reasoning directly into the string itself.
Example of a correctly-shaped value: "headline": "MRV-1 tasked to Zone-B due to fastest ETA and low sea state."`,
          },
          {
            role: "user",
            content: JSON.stringify(input),
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      throw new Error(`Ollama HTTP error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const content = data.message?.content ?? "";
    const parsedData = coerceExplanationFieldsToStrings(cleanJsonResponse(content));
    console.info(`[MSAR Copilot Server] Successfully invoked Ollama (${model})`);
    return CopilotExplanationSchema.parse(parsedData);
  } catch (err) {
    console.warn(`[MSAR Copilot Server] Ollama model ${model} failed:`, err);
    return parseCopilotFallback(input);
  }
}

// Deterministic copilot explanation builder using ONLY exact input facts.
// Never invents data. If a value is unavailable, says so explicitly.
export function parseCopilotFallback(input: CopilotInput): CopilotExplanation {
  const {
    selectedAsset,
    selectedZone,
    searchZones = [],
    candidates = [],
    environmentalRisk,
    failedAssetId,
    predictedPosition,
  } = input;

  const bestCandidate = candidates.find(
    (c) => c.assetId === selectedAsset && c.zoneId === selectedZone,
  ) || candidates[0];

  const targetZone = searchZones.find((z) => z.id === selectedZone) || searchZones[0];
  const probText = targetZone ? `${(targetZone.probability * 100).toFixed(1)}%` : "unavailable";

  // --- 1. Asset Selection Rationale ---
  let assetSelectionRationale: string;
  if (bestCandidate) {
    assetSelectionRationale =
      `${selectedAsset} was selected for ${selectedZone} because the scoring engine ranked it as the lowest-cost candidate.\n` +
      `• Response time: ${bestCandidate.responseTimeMinutes.toFixed(0)} min\n` +
      `• Distance: ${bestCandidate.distanceKm.toFixed(1)} km\n` +
      `• Total cost: ${bestCandidate.totalCost.toFixed(1)} (response time + hazard penalty ${bestCandidate.hazardPenalty.toFixed(1)} + capability penalty ${bestCandidate.capabilityPenalty.toFixed(1)})\n` +
      `• Endurance feasible: ${bestCandidate.enduranceFeasible ? "YES" : "NO"}`;
  } else {
    assetSelectionRationale = `${selectedAsset} was selected to cover ${selectedZone}. Detailed scoring data is not available.`;
  }

  // --- 2. Zone Priority Rationale ---
  let zonePriorityRationale: string;
  if (targetZone) {
    const secondZone = searchZones.find((z) => z.priority === 2);
    zonePriorityRationale =
      `${targetZone.id} is the highest-priority search zone (priority ${targetZone.priority}) with ${probText} probability.\n` +
      `It is centered at ${targetZone.latitude.toFixed(4)}°N, ${targetZone.longitude.toFixed(4)}°E — the cell closest to the predicted vessel fix.\n` +
      `The probability engine uses a Gaussian decay model: cells nearer the predicted position receive exponentially higher weight, then all 25 cells are normalized so probabilities sum to 100%.` +
      (secondZone ? `\nNext highest: ${secondZone.id} at ${(secondZone.probability * 100).toFixed(1)}% (priority ${secondZone.priority}).` : "");
  } else {
    zonePriorityRationale = `Zone priority data is not available in the current system state.`;
  }

  // --- 3. Rejected Assets Rationale ---
  // Group candidates by asset, pick the best pairing for each non-selected asset
  const assetBestMap = new Map<string, typeof candidates[0]>();
  for (const c of candidates) {
    if (c.assetId === selectedAsset) continue;
    const existing = assetBestMap.get(c.assetId);
    if (!existing || c.totalCost < existing.totalCost) {
      assetBestMap.set(c.assetId, c);
    }
  }

  let rejectedAssetsRationale: string;
  if (assetBestMap.size > 0) {
    const lines = Array.from(assetBestMap.entries()).map(([assetId, c]) => {
      const reasons: string[] = [];
      if (c.responseTimeMinutes > (bestCandidate?.responseTimeMinutes ?? 0)) {
        reasons.push(`slower response (${c.responseTimeMinutes.toFixed(0)} min vs ${bestCandidate?.responseTimeMinutes.toFixed(0) ?? "?"} min)`);
      }
      if (c.totalCost > (bestCandidate?.totalCost ?? 0)) {
        reasons.push(`higher total cost (${c.totalCost.toFixed(1)} vs ${bestCandidate?.totalCost.toFixed(1) ?? "?"})`);
      }
      if (!c.enduranceFeasible) {
        reasons.push("insufficient endurance for mission radius");
      }
      if (c.capabilityPenalty > 0) {
        reasons.push("no medical capability (penalty applied)");
      }
      const reasonStr = reasons.length > 0 ? reasons.join(", ") : "higher overall cost";
      return `• ${assetId}: Not selected — ${reasonStr}.`;
    });
    rejectedAssetsRationale = `Other available assets were evaluated but ranked lower:\n${lines.join("\n")}`;
  } else {
    rejectedAssetsRationale = "No alternative asset candidates available for comparison.";
  }

  // --- 4. Environmental Impact Rationale ---
  let riskVal = 0;
  let hazardLvl = "UNAVAILABLE";
  let uncertMult = 1.0;
  let distKm = "unavailable";

  if (typeof environmentalRisk === "number") {
    riskVal = environmentalRisk;
    hazardLvl = riskVal >= 0.66 ? "HIGH" : riskVal >= 0.33 ? "MEDIUM" : "LOW";
  } else if (environmentalRisk && typeof environmentalRisk === "object") {
    riskVal = environmentalRisk.environmentalRisk ?? 0;
    hazardLvl = environmentalRisk.hazardLevel ?? "UNAVAILABLE";
    uncertMult = environmentalRisk.uncertaintyMultiplier ?? 1.0;
    distKm = environmentalRisk.distanceToCycloneKm != null
      ? `${environmentalRisk.distanceToCycloneKm.toFixed(0)} km`
      : "unavailable";
  }

  const environmentalImpactRationale =
    `Environmental risk: ${(riskVal * 100).toFixed(0)}% — Hazard level: ${hazardLvl}.\n` +
    `Cyclone distance from predicted vessel fix: ${distKm}.\n` +
    `Uncertainty multiplier: ${uncertMult.toFixed(2)}x — this expanded the search grid radius and added a hazard penalty of ${(riskVal * 50).toFixed(1)} to every candidate's cost function.\n` +
    (uncertMult > 1.3
      ? `The elevated uncertainty means the vessel could have drifted further than baseline estimates. Search zones are wider to compensate.`
      : `Uncertainty is within normal bounds. Search zones remain tightly centered on the predicted fix.`);

  // --- 5. Contingency Rationale ---
  let contingencyRationale: string;
  if (failedAssetId) {
    const nextBest = candidates.find((c) => c.assetId !== failedAssetId);
    contingencyRationale =
      `Asset ${failedAssetId} has been marked as FAILED and removed from tasking.\n` +
      (nextBest
        ? `Next-best candidate: ${nextBest.assetId} → ${nextBest.zoneId} (response time: ${nextBest.responseTimeMinutes.toFixed(0)} min, cost: ${nextBest.totalCost.toFixed(1)}).`
        : `No alternative candidates are available. Manual intervention required.`);
  } else {
    const nextBest = candidates.find((c) => c.assetId !== selectedAsset);
    contingencyRationale =
      `If ${selectedAsset} becomes unavailable:\n` +
      (nextBest
        ? `• Fallback: ${nextBest.assetId} → ${nextBest.zoneId}\n` +
          `• Response time: ${nextBest.responseTimeMinutes.toFixed(0)} min (${(nextBest.responseTimeMinutes - (bestCandidate?.responseTimeMinutes ?? 0)).toFixed(0)} min slower)\n` +
          `• Total cost: ${nextBest.totalCost.toFixed(1)}\n` +
          `• Endurance feasible: ${nextBest.enduranceFeasible ? "YES" : "NO"}`
        : `No alternative candidates available. All assets should be preserved.`);
  }

  // --- 6. Full Operational Briefing ---
  const posText = predictedPosition
    ? `${predictedPosition.latitude.toFixed(4)}°N, ${predictedPosition.longitude.toFixed(4)}°E (drift: ${predictedPosition.distanceTravelledKm?.toFixed(2) ?? "?"} km)`
    : "unavailable";

  const fullBriefing =
    `OPERATIONAL BRIEFING\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `Predicted Vessel Position: ${posText}\n\n` +
    `TASKING: ${selectedAsset} → ${selectedZone}\n` +
    `${bestCandidate ? `Response: ${bestCandidate.responseTimeMinutes.toFixed(0)} min | Distance: ${bestCandidate.distanceKm.toFixed(1)} km | Cost: ${bestCandidate.totalCost.toFixed(1)}` : ""}\n\n` +
    `SEARCH ZONE: ${targetZone?.id ?? selectedZone} — ${probText} probability (priority ${targetZone?.priority ?? "?"})\n\n` +
    `ENVIRONMENT: ${hazardLvl} risk (${(riskVal * 100).toFixed(0)}%) | Cyclone at ${distKm} | Uncertainty ${uncertMult.toFixed(2)}x\n\n` +
    `ALTERNATIVES:\n${rejectedAssetsRationale}\n\n` +
    `CONTINGENCY:\n${contingencyRationale}` +
    (failedAssetId ? `\n\n⚠ ASSET FAILURE ACTIVE: ${failedAssetId}` : "");

  return {
    headline: `Task ${selectedAsset} → ${selectedZone} | ${hazardLvl} Risk`,
    assetSelectionRationale,
    zonePriorityRationale,
    rejectedAssetsRationale,
    environmentalImpactRationale,
    contingencyRationale,
    fullBriefing,
  };
}
