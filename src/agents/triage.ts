import { runTriageOnServer, parseTriageFallback } from "./triage.server";

export type AIProvider = "GEMINI" | "MISTRAL" | "GROQ" | "OPENROUTER" | "OLLAMA";

export interface TriageInput {
  rawText: string;
  provider?: AIProvider | undefined;
  geminiApiKey?: string | undefined;
  mistralApiKey?: string | undefined;
  groqApiKey?: string | undefined;
  openrouterApiKey?: string | undefined;
  openRouterApiKey?: string | undefined;
  ollamaModel?: string | undefined;
}

// Re-export types and schema from the server module
export { TriageOutputSchema, type TriageOutput } from "./triage.server";

/**
 * MSAR Triage Agent — Client entry point.
 * Calls the server function which runs server-side (no CORS, secure keys).
 * Falls back to deterministic rule-based classifier if the server call fails.
 */
export async function runTriageAgent(
  input: TriageInput,
): Promise<import("./triage.server").TriageOutput> {
  try {
    const result = await runTriageOnServer({
      data: {
        rawText: input.rawText,
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
    console.warn("[MSAR Triage] Server function call failed, using fallback:", err);
    return parseTriageFallback(input.rawText);
  }
}
