import { runDecisionOnServer, parseDecisionFallback } from "./decision.server";
import type { DecisionInput, DecisionOutput } from "./decision.server";

export type { DecisionInput, DecisionOutput } from "./decision.server";
export { DecisionOutputSchema } from "./decision.server";

/**
 * MSAR Decision Agent
 *
 * Reasons over precalculated candidate options evaluated by the deterministic scoring engine.
 * Does NOT perform raw calculations (distance, ETA, probability, route cost, hazard score, or endurance).
 *
 * 1. Ignores candidates where enduranceFeasible = false.
 * 2. Considers search-zone priority, response time, hazard penalty, and capabilities.
 * 3. Chooses the best feasible candidate (selectedAsset, selectedZone).
 * 4. Provides operational explanation (reason) and alternative candidate.
 * 5. Returns structured JSON output with confidence score (0 to 100).
 */
export async function runDecisionAgent(
  input: DecisionInput,
): Promise<DecisionOutput> {
  try {
    const result = await runDecisionOnServer({
      data: {
        incident: input.incident,
        searchZones: input.searchZones,
        candidates: input.candidates,
        environmentalRisk: input.environmentalRisk,
        provider: input.provider,
        geminiApiKey: input.geminiApiKey,
        mistralApiKey: input.mistralApiKey,
        groqApiKey: input.groqApiKey,
        openrouterApiKey: input.openrouterApiKey,
        openRouterApiKey: input.openRouterApiKey,
        ollamaModel: input.ollamaModel,
      },
    });
    return result;
  } catch (err) {
    console.warn("[MSAR Decision Agent] Server function call failed, using deterministic reasoning fallback:", err);
    return parseDecisionFallback(input);
  }
}
