import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI, Type } from "@google/genai";
import { z } from "zod";

export type AIProvider = "GEMINI" | "MISTRAL" | "GROQ" | "OPENROUTER" | "OLLAMA";

export interface TriageInput {
  rawText: string;
  provider?: AIProvider;
}

/**
 * Zod validation schema for MSAR Triage Agent output.
 * Guarantees strict type safety and range bounds.
 */
export const TriageOutputSchema = z.object({
  incidentType: z.enum([
    "FLOODING",
    "ENGINE_FAILURE",
    "LOST_CONTACT",
    "MEDICAL_EMERGENCY",
    "NAVIGATION_HAZARD",
  ]),
  urgency: z.number().int().min(1).max(5),
  crewAtRisk: z.number().int().min(0),
  summary: z.string(),
});

export type TriageOutput = z.infer<typeof TriageOutputSchema>;

// ============================================================================
// SERVER FUNCTION — runs server-side, no CORS, secure API keys via process.env
// ============================================================================

export const runTriageOnServer = createServerFn({ method: "POST" })
  .validator(
    z.object({
      rawText: z.string(),
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
      return runOllamaTriage(data.rawText, data.ollamaModel);
    } else if (provider === "OPENROUTER") {
      return runOpenRouterTriage(data.rawText, data.openrouterApiKey || data.openRouterApiKey);
    } else if (provider === "GROQ") {
      return runGroqTriage(data.rawText, data.groqApiKey);
    } else if (provider === "MISTRAL") {
      return runMistralTriage(data.rawText, data.mistralApiKey);
    } else {
      return runGeminiTriage(data.rawText, data.geminiApiKey);
    }
  });

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

// ============================================================================
// GEMINI — server-side implementation
// ============================================================================
async function runGeminiTriage(rawText: string, customApiKey?: string): Promise<TriageOutput> {
  const apiKey =
    customApiKey?.trim() ||
    process.env["GEMINI_API_KEY"] ||
    process.env["VITE_GEMINI_API_KEY"] ||
    "";

  if (!apiKey) {
    console.info("[MSAR Triage Server] Gemini API key not found. Using fallback.");
    return parseTriageFallback(rawText);
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `You are the MSAR Triage Agent for Maritime Search & Rescue.
Analyze the following maritime report and extract structured incident information.

CRITICAL CONSTRAINTS:
1. Classify incidentType strictly into one of: "FLOODING", "ENGINE_FAILURE", "LOST_CONTACT", "MEDICAL_EMERGENCY", "NAVIGATION_HAZARD".
   - Select "ENGINE_FAILURE" for power failure, motor issues, loss of steerage, or dead in water.
   - Select "FLOODING" for leaks, taking water, sinking, or hull breaches.
   - Select "MEDICAL_EMERGENCY" for injuries, sick crew, or medical evac.
   - Select "NAVIGATION_HAZARD" for floating containers, debris, collision risks, or reefs.
   - Select "LOST_CONTACT" only when AIS or radio communication is lost without a specific cause reported.
2. urgency MUST be an integer from 1 (lowest priority) to 5 (extreme critical emergency).
3. crewAtRisk MUST be an integer count of people at risk.
4. summary MUST be a concise summary of the report.
5. DO NOT invent facts, coordinates, calculations, or assets not present in the input text.

Report:
"${rawText}"`;

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
              incidentType: {
                type: Type.STRING,
                enum: [
                  "FLOODING",
                  "ENGINE_FAILURE",
                  "LOST_CONTACT",
                  "MEDICAL_EMERGENCY",
                  "NAVIGATION_HAZARD",
                ],
              },
              urgency: {
                type: Type.INTEGER,
                description: "Integer urgency from 1 to 5",
              },
              crewAtRisk: {
                type: Type.INTEGER,
                description: "Number of persons at risk",
              },
              summary: {
                type: Type.STRING,
                description: "Concise summary of distress report",
              },
            },
            required: ["incidentType", "urgency", "crewAtRisk", "summary"],
          },
        },
      });

      const responseText = response.text ?? "";
      const parsedData = cleanJsonResponse(responseText);
      console.info(`[MSAR Triage Server] Successfully invoked Gemini (${modelName})`);
      return TriageOutputSchema.parse(parsedData);
    } catch (err) {
      console.warn(`[MSAR Triage Server] Gemini model ${modelName} failed:`, err);
    }
  }

  return parseTriageFallback(rawText);
}

// ============================================================================
// MISTRAL — server-side implementation (no CORS issues)
// ============================================================================
async function runMistralTriage(rawText: string, customApiKey?: string): Promise<TriageOutput> {
  const apiKey =
    customApiKey?.trim() ||
    process.env["MISTRAL_API_KEY"] ||
    process.env["VITE_MISTRAL_API_KEY"] ||
    "";

  if (!apiKey) {
    console.info("[MSAR Triage Server] Mistral API key not found. Using fallback.");
    return parseTriageFallback(rawText);
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
              content: `You are the MSAR Triage Agent for Maritime Search & Rescue. Analyze report and return JSON object with:
- incidentType: strictly one of ["FLOODING", "ENGINE_FAILURE", "LOST_CONTACT", "MEDICAL_EMERGENCY", "NAVIGATION_HAZARD"]
  (Use ENGINE_FAILURE for power/steerage issues; FLOODING for water/leaks; MEDICAL_EMERGENCY for injuries; NAVIGATION_HAZARD for obstacles; LOST_CONTACT for lost AIS/comms)
- urgency: integer 1 to 5
- crewAtRisk: integer count of people at risk
- summary: concise summary based ONLY on input text.
Return ONLY valid JSON matching this schema.`,
            },
            {
              role: "user",
              content: rawText,
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
      const parsedData = cleanJsonResponse(content);
      console.info(`[MSAR Triage Server] Successfully invoked Mistral AI (${modelName})`);
      return TriageOutputSchema.parse(parsedData);
    } catch (err) {
      console.warn(`[MSAR Triage Server] Mistral model ${modelName} failed:`, err);
    }
  }

  console.error("[MSAR Triage Server] ALL Mistral models failed. Using fallback.");
  return parseTriageFallback(rawText);
}

// ============================================================================
// GROQ — server-side implementation (ultra-fast Llama-3.3)
// ============================================================================
async function runGroqTriage(rawText: string, customApiKey?: string): Promise<TriageOutput> {
  const apiKey =
    customApiKey?.trim() ||
    process.env["GROQ_API_KEY"] ||
    process.env["VITE_GROQ_API_KEY"] ||
    "";

  if (!apiKey) {
    console.info("[MSAR Triage Server] Groq API key not found. Using fallback.");
    return parseTriageFallback(rawText);
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
              content: `You are the MSAR Triage Agent for Maritime Search & Rescue. Analyze report and return JSON object with:
- incidentType: strictly one of ["FLOODING", "ENGINE_FAILURE", "LOST_CONTACT", "MEDICAL_EMERGENCY", "NAVIGATION_HAZARD"]
  (Use ENGINE_FAILURE for power/steerage issues; FLOODING for water/leaks; MEDICAL_EMERGENCY for injuries; NAVIGATION_HAZARD for obstacles; LOST_CONTACT for lost AIS/comms)
- urgency: integer 1 to 5
- crewAtRisk: integer count of people at risk
- summary: concise summary based ONLY on input text.
Return ONLY valid JSON matching this schema.`,
            },
            {
              role: "user",
              content: rawText,
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
      const parsedData = cleanJsonResponse(content);
      console.info(`[MSAR Triage Server] Successfully invoked Groq Cloud (${modelName})`);
      return TriageOutputSchema.parse(parsedData);
    } catch (err) {
      console.warn(`[MSAR Triage Server] Groq model ${modelName} failed:`, err);
    }
  }

  console.error("[MSAR Triage Server] ALL Groq models failed. Using fallback.");
  return parseTriageFallback(rawText);
}

// ============================================================================
// OPENROUTER — server-side implementation
// ============================================================================
async function runOpenRouterTriage(rawText: string, customApiKey?: string): Promise<TriageOutput> {
  const apiKey =
    customApiKey?.trim() ||
    process.env["OPENROUTER_API_KEY"] ||
    process.env["VITE_OPENROUTER_API_KEY"] ||
    "";

  if (!apiKey) {
    console.info("[MSAR Triage Server] OpenRouter API key not found. Using fallback.");
    return parseTriageFallback(rawText);
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
              content: `You are the MSAR Triage Agent for Maritime Search & Rescue. Analyze report and return JSON object with:
- incidentType: strictly one of ["FLOODING", "ENGINE_FAILURE", "LOST_CONTACT", "MEDICAL_EMERGENCY", "NAVIGATION_HAZARD"]
  (Use ENGINE_FAILURE for power/steerage issues; FLOODING for water/leaks; MEDICAL_EMERGENCY for injuries; NAVIGATION_HAZARD for obstacles; LOST_CONTACT for lost AIS/comms)
- urgency: integer 1 to 5
- crewAtRisk: integer count of people at risk
- summary: concise summary based ONLY on input text.
Return ONLY valid JSON matching this schema.`,
            },
            {
              role: "user",
              content: rawText,
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
      const parsedData = cleanJsonResponse(content);
      console.info(`[MSAR Triage Server] Successfully invoked OpenRouter (${modelName})`);
      return TriageOutputSchema.parse(parsedData);
    } catch (err: any) {
      console.warn(`[MSAR Triage Server] OpenRouter model ${modelName} failed:`, err?.message ?? err);
    }
  }

  return parseTriageFallback(rawText);
}

// ============================================================================
// FALLBACK — deterministic rule-based classifier
// ============================================================================
export function parseTriageFallback(rawText: string): TriageOutput {
  const textUpper = rawText.toUpperCase();

  let incidentType: TriageOutput["incidentType"] = "LOST_CONTACT";

  if (
    textUpper.includes("SINK") ||
    textUpper.includes("WATER") ||
    textUpper.includes("FLOOD") ||
    textUpper.includes("LEAK") ||
    textUpper.includes("SUBMERGE") ||
    textUpper.includes("HULL BREACH")
  ) {
    incidentType = "FLOODING";
  } else if (
    textUpper.includes("ENGINE") ||
    textUpper.includes("POWER") ||
    textUpper.includes("MOTOR") ||
    textUpper.includes("PROPULSION") ||
    textUpper.includes("STEER") ||
    textUpper.includes("MECHANICAL") ||
    textUpper.includes("DEAD IN WATER") ||
    textUpper.includes("BLACKOUT")
  ) {
    incidentType = "ENGINE_FAILURE";
  } else if (
    textUpper.includes("MED") ||
    textUpper.includes("INJUR") ||
    textUpper.includes("PATIENT") ||
    textUpper.includes("HEART") ||
    textUpper.includes("EVAC") ||
    textUpper.includes("DOCTOR") ||
    textUpper.includes("CASUALTY")
  ) {
    incidentType = "MEDICAL_EMERGENCY";
  } else if (
    textUpper.includes("CONTAINER") ||
    textUpper.includes("REEF") ||
    textUpper.includes("HAZARD") ||
    textUpper.includes("COLLISION") ||
    textUpper.includes("DEBRIS") ||
    textUpper.includes("SHOAL")
  ) {
    incidentType = "NAVIGATION_HAZARD";
  } else if (
    textUpper.includes("LOST") ||
    textUpper.includes("AIS") ||
    textUpper.includes("MISSING") ||
    textUpper.includes("OVERDUE") ||
    textUpper.includes("SILENCE") ||
    textUpper.includes("CONTACT")
  ) {
    incidentType = "LOST_CONTACT";
  } else {
    incidentType = "ENGINE_FAILURE";
  }

  let crewAtRisk = 3;
  const matchCrew = rawText.match(
    /(\d+)\s*(pob|crew|person|persons|people|people aboard|members)/i,
  );
  if (matchCrew && matchCrew[1]) {
    crewAtRisk = parseInt(matchCrew[1], 10);
  }

  let urgency = 4;
  if (
    textUpper.includes("MAYDAY") ||
    textUpper.includes("SINKING") ||
    textUpper.includes("CRITICAL")
  ) {
    urgency = 5;
  } else if (textUpper.includes("URGENT") || textUpper.includes("DISTRESS")) {
    urgency = 4;
  } else if (textUpper.includes("LOW") || textUpper.includes("MINOR")) {
    urgency = 2;
  }

  return {
    incidentType,
    urgency,
    crewAtRisk,
    summary: rawText.length > 120 ? rawText.slice(0, 117) + "..." : rawText,
  };
}

function normalizeTriageOutput(data: any): any {
  if (!data || typeof data !== "object") return data;
  const typeStr = String(data.incidentType || "").toUpperCase();
  let incidentType: TriageOutput["incidentType"] = "ENGINE_FAILURE";

  if (typeStr.includes("FLOOD") || typeStr.includes("WATER") || typeStr.includes("SINK") || typeStr.includes("LEAK")) {
    incidentType = "FLOODING";
  } else if (typeStr.includes("ENGINE") || typeStr.includes("MOTOR") || typeStr.includes("POWER") || typeStr.includes("PROPULSION") || typeStr.includes("STEER") || typeStr.includes("BLACKOUT")) {
    incidentType = "ENGINE_FAILURE";
  } else if (typeStr.includes("MED") || typeStr.includes("INJUR") || typeStr.includes("HEALTH") || typeStr.includes("CASUALTY") || typeStr.includes("PATIENT")) {
    incidentType = "MEDICAL_EMERGENCY";
  } else if (typeStr.includes("NAVIGAT") || typeStr.includes("HAZARD") || typeStr.includes("COLLIS") || typeStr.includes("REEF") || typeStr.includes("DEBRIS") || typeStr.includes("SHOAL")) {
    incidentType = "NAVIGATION_HAZARD";
  } else if (typeStr.includes("LOST") || typeStr.includes("CONTACT") || typeStr.includes("AIS") || typeStr.includes("MISSING") || typeStr.includes("OVERDUE") || typeStr.includes("COMM")) {
    incidentType = "LOST_CONTACT";
  }

  let urgency = Number(data.urgency);
  if (isNaN(urgency) || urgency < 1 || urgency > 5) urgency = 4;

  let crewAtRisk = Number(data.crewAtRisk);
  if (isNaN(crewAtRisk) || crewAtRisk < 0) crewAtRisk = 3;

  return {
    incidentType,
    urgency,
    crewAtRisk,
    summary: String(data.summary || "Maritime search and rescue emergency reported."),
  };
}

// ============================================================================
// OLLAMA — local AI server implementation (zero API keys, 100% offline)
// ============================================================================
async function runOllamaTriage(rawText: string, customModel?: string): Promise<TriageOutput> {
  const model = customModel?.trim() || "gemma4:latest";
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
          num_predict: 300,
          temperature: 0.2,
        },
        messages: [
          {
            role: "system",
            content: `You are the MSAR Triage Agent for Maritime Search & Rescue. Analyze report and return JSON object with:
- incidentType: strictly one of ["FLOODING", "ENGINE_FAILURE", "LOST_CONTACT", "MEDICAL_EMERGENCY", "NAVIGATION_HAZARD"]
  (Use ENGINE_FAILURE for power/steerage issues; FLOODING for water/leaks; MEDICAL_EMERGENCY for injuries; NAVIGATION_HAZARD for obstacles; LOST_CONTACT for lost AIS/comms)
- urgency: integer 1 to 5
- crewAtRisk: integer count of people at risk
- summary: concise summary based ONLY on input text.
Return ONLY valid JSON matching this schema.`,
          },
          {
            role: "user",
            content: rawText,
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
    const parsedData = normalizeTriageOutput(cleanJsonResponse(content));
    console.info(`[MSAR Triage Server] Successfully invoked Ollama (${model})`);
    return TriageOutputSchema.parse(parsedData);
  } catch (err) {
    console.warn(`[MSAR Triage Server] Ollama model ${model} failed:`, err);
    return parseTriageFallback(rawText);
  }
}
