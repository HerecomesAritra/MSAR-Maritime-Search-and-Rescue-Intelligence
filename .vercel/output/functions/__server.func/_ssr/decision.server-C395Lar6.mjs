import { i as createServerFn } from "./server-DeRl2QfM.mjs";
import { t as createServerRpc } from "./createServerRpc-TRw5yJ-a.mjs";
import { n as Type, t as GoogleGenAI } from "../_libs/@google/genai.mjs";
import { a as objectType, i as numberType, n as arrayType, o as stringType, r as enumType, t as anyType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/decision.server-C395Lar6.js
var DecisionOutputSchema = objectType({
	selectedAsset: stringType(),
	selectedZone: stringType(),
	reason: stringType(),
	alternative: stringType(),
	confidence: numberType().min(0).max(100)
});
var runDecisionOnServer_createServerFn_handler = createServerRpc({
	id: "b7b3423cb3549104def5b29b2a3d3bf83b968a99f7732f9da9e57dc964de5809",
	name: "runDecisionOnServer",
	filename: "src/agents/decision.server.ts"
}, (opts) => runDecisionOnServer.__executeServer(opts));
var runDecisionOnServer = createServerFn({ method: "POST" }).validator(objectType({
	incident: anyType().optional(),
	searchZones: arrayType(anyType()),
	candidates: arrayType(anyType()),
	environmentalRisk: numberType(),
	provider: enumType([
		"GEMINI",
		"MISTRAL",
		"GROQ",
		"OPENROUTER",
		"OLLAMA"
	]).optional(),
	geminiApiKey: stringType().optional(),
	mistralApiKey: stringType().optional(),
	groqApiKey: stringType().optional(),
	openrouterApiKey: stringType().optional(),
	openRouterApiKey: stringType().optional(),
	ollamaModel: stringType().optional()
})).handler(runDecisionOnServer_createServerFn_handler, async ({ data }) => {
	const provider = data.provider ?? "GEMINI";
	if (provider === "OLLAMA") return runOllamaDecision(data);
	else if (provider === "OPENROUTER") return runOpenRouterDecision(data);
	else if (provider === "GROQ") return runGroqDecision(data);
	else if (provider === "MISTRAL") return runMistralDecision(data);
	else return runGeminiDecision(data);
});
async function runGeminiDecision(input) {
	const apiKey = input.geminiApiKey?.trim() || process.env["GEMINI_API_KEY"] || process.env["VITE_GEMINI_API_KEY"] || "";
	if (!apiKey) return parseDecisionFallback(input);
	const ai = new GoogleGenAI({ apiKey });
	const feasible = input.candidates.filter((c) => c.enduranceFeasible);
	const prompt = `You are the MSAR Decision Agent for Maritime Search & Rescue.
Your job is to select the single best rescue asset and search zone pairing from precalculated candidates.

CRITICAL CONSTRAINTS:
1. Do NOT recalculate distance, ETA, probability, route cost, hazard score, or endurance feasibility.
2. IGNORE all candidates where enduranceFeasible is false.
3. Evaluate feasible candidates considering:
   - Search-zone priority (priority 1 is highest priority)
   - Response time (responseTimeMinutes)
   - Hazard penalty (hazardPenalty)
   - Capability requirements (capabilityPenalty)
4. Choose ONE best feasible candidate (selectedAsset, selectedZone).
5. Provide a concise operational rationale (reason).
6. Provide ONE alternative feasible candidate if available (alternative), or "None available" if no alternative exists.
7. Return confidence score as a number between 0 and 100.
8. DO NOT invent assets or modify candidate values.

Incident Summary:
${JSON.stringify(input.incident || { summary: "Maritime SAR Operation" }, null, 2)}

Environmental Risk: ${input.environmentalRisk}

Precomputed Feasible Candidates:
${JSON.stringify(feasible, null, 2)}

Search Zones:
${JSON.stringify(input.searchZones.slice(0, 5), null, 2)}
`;
	for (const modelName of [
		"gemini-2.5-flash",
		"gemini-2.0-flash",
		"gemini-1.5-flash"
	]) try {
		const parsedData = cleanJsonResponse((await ai.models.generateContent({
			model: modelName,
			contents: prompt,
			config: {
				responseMimeType: "application/json",
				responseSchema: {
					type: Type.OBJECT,
					properties: {
						selectedAsset: { type: Type.STRING },
						selectedZone: { type: Type.STRING },
						reason: { type: Type.STRING },
						alternative: { type: Type.STRING },
						confidence: {
							type: Type.NUMBER,
							description: "Confidence score between 0 and 100"
						}
					},
					required: [
						"selectedAsset",
						"selectedZone",
						"reason",
						"alternative",
						"confidence"
					]
				}
			}
		})).text ?? "");
		console.info(`[MSAR Decision Server] Successfully invoked Gemini (${modelName})`);
		return DecisionOutputSchema.parse(parsedData);
	} catch (err) {
		console.warn(`[MSAR Decision Server] Gemini model ${modelName} failed:`, err);
	}
	return parseDecisionFallback(input);
}
function cleanJsonResponse(text) {
	let cleaned = text.trim();
	if (cleaned.startsWith("```")) cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
	const start = cleaned.indexOf("{");
	const end = cleaned.lastIndexOf("}");
	if (start !== -1 && end !== -1 && end >= start) cleaned = cleaned.slice(start, end + 1);
	return JSON.parse(cleaned);
}
async function runMistralDecision(input) {
	const apiKey = input.mistralApiKey?.trim() || process.env["MISTRAL_API_KEY"] || process.env["VITE_MISTRAL_API_KEY"] || "";
	if (!apiKey) return parseDecisionFallback(input);
	const feasible = input.candidates.filter((c) => c.enduranceFeasible);
	for (const modelName of ["mistral-small-latest", "mistral-small-2503"]) try {
		const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				model: modelName,
				response_format: { type: "json_object" },
				messages: [{
					role: "system",
					content: `You are the MSAR Decision Agent. Select the best rescue candidate from precalculated input.
Rules:
- Ignore candidates with enduranceFeasible = false.
- Choose best feasible candidate based on priority, response time, hazard penalty, and capabilities.
- Return JSON object with:
  selectedAsset (string)
  selectedZone (string)
  reason (string concise rationale)
  alternative (string alternative candidate or "None available")
  confidence (number 0 to 100)
- Do NOT invent numbers or recalculate values.`
				}, {
					role: "user",
					content: JSON.stringify({
						incident: input.incident,
						environmentalRisk: input.environmentalRisk,
						feasibleCandidates: feasible
					})
				}]
			})
		});
		if (!response.ok) {
			const errText = await response.text().catch(() => "");
			throw new Error(`Mistral HTTP error ${response.status} (${modelName}): ${errText}`);
		}
		const parsedData = cleanJsonResponse((await response.json()).choices?.[0]?.message?.content ?? "");
		console.info(`[MSAR Decision Server] Successfully invoked Mistral AI (${modelName})`);
		return DecisionOutputSchema.parse(parsedData);
	} catch (err) {
		console.warn(`[MSAR Decision Server] Mistral model ${modelName} failed:`, err);
	}
	console.error("[MSAR Decision Server] ALL Mistral models failed. Using fallback.");
	return parseDecisionFallback(input);
}
async function runGroqDecision(input) {
	const apiKey = input.groqApiKey?.trim() || process.env["GROQ_API_KEY"] || process.env["VITE_GROQ_API_KEY"] || "";
	if (!apiKey) {
		console.info("[MSAR Decision Server] Groq API key not found. Using fallback.");
		return parseDecisionFallback(input);
	}
	const feasible = input.candidates.filter((c) => c.enduranceFeasible);
	for (const modelName of ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"]) try {
		const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				model: modelName,
				response_format: { type: "json_object" },
				messages: [{
					role: "system",
					content: `You are the MSAR Decision Agent. Select the best rescue candidate from precalculated input.
Rules:
- Ignore candidates with enduranceFeasible = false.
- Choose best feasible candidate based on priority, response time, hazard penalty, and capabilities.
- Return JSON object with:
  selectedAsset (string)
  selectedZone (string)
  reason (string concise rationale)
  alternative (string alternative candidate or "None available")
  confidence (number 0 to 100)
- Do NOT invent numbers or recalculate values.`
				}, {
					role: "user",
					content: JSON.stringify({
						incident: input.incident,
						environmentalRisk: input.environmentalRisk,
						feasibleCandidates: feasible
					})
				}]
			})
		});
		if (!response.ok) {
			const errText = await response.text().catch(() => "");
			throw new Error(`Groq HTTP error ${response.status} (${modelName}): ${errText}`);
		}
		const parsedData = cleanJsonResponse((await response.json()).choices?.[0]?.message?.content ?? "");
		console.info(`[MSAR Decision Server] Successfully invoked Groq Cloud (${modelName})`);
		return DecisionOutputSchema.parse(parsedData);
	} catch (err) {
		console.warn(`[MSAR Decision Server] Groq model ${modelName} failed:`, err);
	}
	console.error("[MSAR Decision Server] ALL Groq models failed. Using fallback.");
	return parseDecisionFallback(input);
}
async function runOpenRouterDecision(input) {
	const apiKey = input.openRouterApiKey?.trim() || input.openrouterApiKey?.trim() || process.env["OPENROUTER_API_KEY"] || process.env["VITE_OPENROUTER_API_KEY"] || "";
	if (!apiKey) {
		console.info("[MSAR Decision Server] OpenRouter API key not found. Using fallback.");
		return parseDecisionFallback(input);
	}
	const feasible = input.candidates.filter((c) => c.enduranceFeasible);
	for (const modelName of [
		"openai/gpt-4o-mini",
		"meta-llama/llama-3.3-70b-instruct",
		"google/gemini-2.0-flash-001",
		"mistralai/mistral-small-24b-instruct-2501"
	]) try {
		const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"HTTP-Referer": "http://localhost:8080",
				"X-Title": "MSAR Command Center",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				model: modelName,
				response_format: { type: "json_object" },
				messages: [{
					role: "system",
					content: `You are the MSAR Decision Agent. Select the best rescue candidate from precalculated input.
Rules:
- Ignore candidates with enduranceFeasible = false.
- Choose best feasible candidate based on priority, response time, hazard penalty, and capabilities.
- Return JSON object with:
  selectedAsset (string)
  selectedZone (string)
  reason (string concise rationale)
  alternative (string alternative candidate or "None available")
  confidence (number 0 to 100)
- Do NOT invent numbers or recalculate values.`
				}, {
					role: "user",
					content: JSON.stringify({
						incident: input.incident,
						environmentalRisk: input.environmentalRisk,
						feasibleCandidates: feasible
					})
				}]
			})
		});
		if (!response.ok) {
			const errText = await response.text().catch(() => "");
			throw new Error(`OpenRouter HTTP error ${response.status} (${modelName}): ${errText}`);
		}
		const parsedData = cleanJsonResponse((await response.json()).choices?.[0]?.message?.content ?? "");
		console.info(`[MSAR Decision Server] Successfully invoked OpenRouter (${modelName})`);
		return DecisionOutputSchema.parse(parsedData);
	} catch (err) {
		console.warn(`[MSAR Decision Server] OpenRouter model ${modelName} failed:`, err?.message ?? err);
	}
	return parseDecisionFallback(input);
}
function normalizeDecisionOutput(data, feasibleCandidates) {
	if (!data || typeof data !== "object") return data;
	let asset = String(data.selectedAsset || "").trim();
	let zone = String(data.selectedZone || "").trim();
	const assetMatch = feasibleCandidates.find((c) => c.assetId.toLowerCase() === asset.toLowerCase() || asset.toLowerCase().includes(c.assetId.toLowerCase()));
	if (assetMatch) {
		asset = assetMatch.assetId;
		zone = assetMatch.zoneId;
	} else if (feasibleCandidates[0]) {
		asset = feasibleCandidates[0].assetId;
		zone = feasibleCandidates[0].zoneId;
	}
	let confidence = Number(data.confidence);
	if (isNaN(confidence)) confidence = 85;
	if (confidence > 100) confidence = 100;
	if (confidence < 0) confidence = 50;
	return {
		selectedAsset: asset,
		selectedZone: zone,
		reason: String(data.reason || "Selected based on response time, hazard score, and vessel capability."),
		alternative: String(data.alternative || "None available"),
		confidence
	};
}
async function runOllamaDecision(input) {
	const model = input.ollamaModel?.trim() || "gemma4:latest";
	const feasible = input.candidates.filter((c) => c.enduranceFeasible);
	try {
		const response = await fetch("http://localhost:11434/api/chat", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				model,
				format: "json",
				stream: false,
				keep_alive: "60m",
				options: {
					num_predict: 350,
					temperature: .2
				},
				messages: [{
					role: "system",
					content: `You are the MSAR Decision Agent. Select the best rescue candidate from precalculated input.
Rules:
- Ignore candidates with enduranceFeasible = false.
- Choose best feasible candidate based on priority, response time, hazard penalty, and capabilities.
- Return JSON object with:
  selectedAsset (string)
  selectedZone (string)
  reason (string concise rationale)
  alternative (string alternative candidate or "None available")
  confidence (number 0 to 100)
- Do NOT invent numbers or recalculate values.`
				}, {
					role: "user",
					content: JSON.stringify({
						incident: input.incident,
						environmentalRisk: input.environmentalRisk,
						feasibleCandidates: feasible
					})
				}]
			})
		});
		if (!response.ok) {
			const errText = await response.text().catch(() => "");
			throw new Error(`Ollama HTTP error ${response.status}: ${errText}`);
		}
		const parsedData = normalizeDecisionOutput(cleanJsonResponse((await response.json()).message?.content ?? ""), feasible);
		console.info(`[MSAR Decision Server] Successfully invoked Ollama (${model})`);
		return DecisionOutputSchema.parse(parsedData);
	} catch (err) {
		console.warn(`[MSAR Decision Server] Ollama model ${model} failed:`, err);
		return parseDecisionFallback(input);
	}
}
function parseDecisionFallback(input) {
	const feasible = input.candidates.filter((c) => c.enduranceFeasible);
	if (feasible.length === 0) return {
		selectedAsset: "NONE",
		selectedZone: "NONE",
		reason: "No available rescue assets have sufficient endurance for this operation.",
		alternative: "None available",
		confidence: 0
	};
	const sorted = [...feasible].sort((a, b) => a.totalCost - b.totalCost);
	const best = sorted[0];
	const altCandidate = sorted.find((c) => c.assetId !== best.assetId) || sorted[1];
	const zoneMatch = input.searchZones.find((z) => z.id === best.zoneId);
	const probPct = zoneMatch ? (zoneMatch.probability * 100).toFixed(1) : "high";
	const reason = `Assigned ${best.assetId} to ${best.zoneId} (${probPct}% probability). Rapid response time of ${best.responseTimeMinutes.toFixed(0)} min with minimal capability/hazard penalties.`;
	const alternative = altCandidate ? `${altCandidate.assetId} assigned to ${altCandidate.zoneId} (Response time: ${altCandidate.responseTimeMinutes.toFixed(0)} min, cost: ${altCandidate.totalCost.toFixed(1)})` : "None available";
	let confidence = 90;
	if (input.environmentalRisk > .6) confidence -= 15;
	if (best.hazardPenalty > 10) confidence -= 10;
	if (best.capabilityPenalty > 0) confidence -= 5;
	confidence = Math.max(30, Math.min(98, confidence));
	return {
		selectedAsset: best.assetId,
		selectedZone: best.zoneId,
		reason,
		alternative,
		confidence
	};
}
//#endregion
export { runDecisionOnServer_createServerFn_handler };
