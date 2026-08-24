import {
  runCopilotOnServer,
  parseCopilotFallback,
  type CopilotInput,
  type CopilotExplanation,
  type AIProvider,
} from "./copilot.server";

export type { CopilotInput, CopilotExplanation, AIProvider };

/**
 * MSAR SAR Copilot Module — Operational Explanation Layer
 *
 * Purpose:
 * Explains an already-calculated MSAR decision to a human search director.
 *
 * Answers operator questions:
 * - Why was this asset selected?
 * - Why is this search zone highest priority?
 * - Why was another asset not selected?
 * - How did environmental risk affect the decision?
 * - What changed after an asset failure?
 *
 * Rules strictly followed:
 * - Only uses information provided in the input.
 * - Never invents numerical values.
 * - Never changes or overrides a decision.
 * - Never calculates a new route or probability.
 * - Concise, structured operational explanations.
 */
export async function explainDecision(input: CopilotInput): Promise<CopilotExplanation> {
  try {
    const result = await runCopilotOnServer({ data: input });
    return result;
  } catch (err) {
    console.warn("[MSAR Copilot] Server function execution failed, returning deterministic explanation:", err);
    return parseCopilotFallback(input);
  }
}

/**
 * Synchronous deterministic fallback explanation.
 */
export function explainDecisionSync(input: CopilotInput): CopilotExplanation {
  return parseCopilotFallback(input);
}
