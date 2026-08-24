import { useState, useEffect } from "react";
import { Settings, Key, Cpu, Check, X, ShieldCheck } from "lucide-react";
import type { AIProvider } from "@/agents/triage";

interface AISettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: AIProvider;
  onProviderChange: (p: AIProvider) => void;
  geminiKey: string;
  onGeminiKeyChange: (key: string) => void;
  mistralKey: string;
  onMistralKeyChange: (key: string) => void;
  groqKey: string;
  onGroqKeyChange: (key: string) => void;
  openrouterKey?: string;
  openRouterKey?: string;
  onOpenrouterKeyChange?: (key: string) => void;
  onOpenRouterKeyChange?: (key: string) => void;
  ollamaModel?: string;
  onOllamaModelChange?: (m: string) => void;
}

export function AISettingsModal({
  isOpen,
  onClose,
  provider,
  onProviderChange,
  geminiKey,
  onGeminiKeyChange,
  mistralKey,
  onMistralKeyChange,
  groqKey,
  onGroqKeyChange,
  openrouterKey,
  openRouterKey,
  onOpenrouterKeyChange,
  onOpenRouterKeyChange,
  ollamaModel = "gemma4:latest",
  onOllamaModelChange,
}: AISettingsModalProps) {
  const initialOpenRouterKey = openRouterKey ?? openrouterKey ?? "";
  const handleOpenRouterKeySave = onOpenRouterKeyChange ?? onOpenrouterKeyChange;

  const [tempProvider, setTempProvider] = useState<AIProvider>(provider);
  const [tempGeminiKey, setTempGeminiKey] = useState(geminiKey);
  const [tempMistralKey, setTempMistralKey] = useState(mistralKey);
  const [tempGroqKey, setTempGroqKey] = useState(groqKey);
  const [tempOpenRouterKey, setTempOpenRouterKey] = useState(initialOpenRouterKey);
  const [tempOllamaModel, setTempOllamaModel] = useState(ollamaModel);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setTempProvider(provider);
    setTempGeminiKey(geminiKey);
    setTempMistralKey(mistralKey);
    setTempGroqKey(groqKey);
    setTempOpenRouterKey(initialOpenRouterKey);
    setTempOllamaModel(ollamaModel || "gemma4:latest");
  }, [provider, geminiKey, mistralKey, groqKey, initialOpenRouterKey, ollamaModel, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onProviderChange(tempProvider);
    onGeminiKeyChange(tempGeminiKey.trim());
    onMistralKeyChange(tempMistralKey.trim());
    onGroqKeyChange(tempGroqKey.trim());
    if (handleOpenRouterKeySave) {
      handleOpenRouterKeySave(tempOpenRouterKey.trim());
    }
    if (onOllamaModelChange) {
      onOllamaModelChange(tempOllamaModel.trim() || "gemma4:latest");
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-abyss/80 backdrop-blur-sm p-4">
      <div className="glass flex w-full max-w-md flex-col rounded-xl border border-cyan/40 p-5 shadow-2xl space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded bg-cyan/20 border border-cyan/50 text-cyan">
              <Settings className="size-4" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold tracking-wider text-foreground">
                AI PROVIDER CONFIGURATION
              </h3>
              <div className="data-key text-[9px]">Select Model &amp; Manage API Keys</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Provider Selection */}
        <div className="space-y-2">
          <label className="data-key flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <Cpu className="size-3.5 text-cyan" /> Active AI Model Provider
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setTempProvider("OLLAMA")}
              className={`flex flex-col items-center justify-center rounded-lg border p-2 text-center transition-all ${
                tempProvider === "OLLAMA"
                  ? "border-purple-400 bg-purple-500/15 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.2)]"
                  : "border-border bg-accent/30 text-muted-foreground hover:border-foreground/40"
              }`}
            >
              <span className="font-display text-[11px] font-bold">Ollama (Local)</span>
              <span className="text-[8px] opacity-80">gemma4:latest</span>
            </button>

            <button
              type="button"
              onClick={() => setTempProvider("OPENROUTER")}
              className={`flex flex-col items-center justify-center rounded-lg border p-2 text-center transition-all ${
                tempProvider === "OPENROUTER"
                  ? "border-emerald-400 bg-emerald-500/15 text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.2)]"
                  : "border-border bg-accent/30 text-muted-foreground hover:border-foreground/40"
              }`}
            >
              <span className="font-display text-[11px] font-bold">OpenRouter</span>
              <span className="text-[8px] opacity-80">gpt-oss-120b</span>
            </button>

            <button
              type="button"
              onClick={() => setTempProvider("GEMINI")}
              className={`flex flex-col items-center justify-center rounded-lg border p-2 text-center transition-all ${
                tempProvider === "GEMINI"
                  ? "border-cyan bg-cyan/15 text-cyan shadow-[var(--glow-cyan)]"
                  : "border-border bg-accent/30 text-muted-foreground hover:border-foreground/40"
              }`}
            >
              <span className="font-display text-[11px] font-bold">Google Gemini</span>
              <span className="text-[8px] opacity-80">gemini-2.5-flash</span>
            </button>

            <button
              type="button"
              onClick={() => setTempProvider("MISTRAL")}
              className={`flex flex-col items-center justify-center rounded-lg border p-2 text-center transition-all ${
                tempProvider === "MISTRAL"
                  ? "border-warning bg-warning/15 text-warning shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                  : "border-border bg-accent/30 text-muted-foreground hover:border-foreground/40"
              }`}
            >
              <span className="font-display text-[11px] font-bold">Mistral AI</span>
              <span className="text-[8px] opacity-80">mistral-small</span>
            </button>

            <button
              type="button"
              onClick={() => setTempProvider("GROQ")}
              className={`flex flex-col items-center justify-center rounded-lg border p-2 text-center transition-all ${
                tempProvider === "GROQ"
                  ? "border-success bg-success/15 text-success shadow-[0_0_12px_rgba(34,197,94,0.2)]"
                  : "border-border bg-accent/30 text-muted-foreground hover:border-foreground/40"
              }`}
            >
              <span className="font-display text-[11px] font-bold">Groq Cloud</span>
              <span className="text-[8px] opacity-80">gpt-oss-120b</span>
            </button>
          </div>
        </div>

        {/* API Key & Local Model Inputs */}
        <div className="space-y-2.5 border-t border-border pt-3">
          {/* Ollama Local Model Input */}
          <div className="space-y-1">
            <label className="data-key flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 text-purple-400 font-bold">
                <Cpu className="size-3" /> Ollama Local Model Name
              </span>
              <span className="text-[9px] text-success font-semibold">http://localhost:11434 (Active)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. gemma4:latest, gemma2, llama3.2..."
              value={tempOllamaModel}
              onChange={(e) => setTempOllamaModel(e.target.value)}
              className="w-full rounded border border-border bg-abyss/80 px-3 py-1 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-purple-400 focus:outline-none"
            />
          </div>

          {/* OpenRouter Key Input */}
          <div className="space-y-1">
            <label className="data-key flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <Key className="size-3" /> OpenRouter API Key
              </span>
              <span className="text-[9px] text-muted-foreground">openrouter.ai/keys</span>
            </label>
            <input
              type="password"
              placeholder="Paste OPENROUTER_API_KEY (sk-or-v1-...)"
              value={tempOpenRouterKey}
              onChange={(e) => setTempOpenRouterKey(e.target.value)}
              className="w-full rounded border border-border bg-abyss/80 px-3 py-1 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-emerald-400 focus:outline-none"
            />
          </div>

          {/* Gemini Key Input */}
          <div className="space-y-1">
            <label className="data-key flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 text-cyan">
                <Key className="size-3" /> Google Gemini API Key
              </span>
              <span className="text-[9px] text-muted-foreground">aistudio.google.com</span>
            </label>
            <input
              type="password"
              placeholder="Paste GEMINI_API_KEY..."
              value={tempGeminiKey}
              onChange={(e) => setTempGeminiKey(e.target.value)}
              className="w-full rounded border border-border bg-abyss/80 px-3 py-1 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-cyan focus:outline-none"
            />
          </div>

          {/* Mistral Key Input */}
          <div className="space-y-1">
            <label className="data-key flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 text-warning">
                <Key className="size-3" /> Mistral AI API Key
              </span>
              <span className="text-[9px] text-muted-foreground">console.mistral.ai</span>
            </label>
            <input
              type="password"
              placeholder="Paste MISTRAL_API_KEY..."
              value={tempMistralKey}
              onChange={(e) => setTempMistralKey(e.target.value)}
              className="w-full rounded border border-border bg-abyss/80 px-3 py-1 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-warning focus:outline-none"
            />
          </div>

          {/* Groq Key Input */}
          <div className="space-y-1">
            <label className="data-key flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 text-success">
                <Key className="size-3" /> Groq API Key
              </span>
              <span className="text-[9px] text-muted-foreground">console.groq.com</span>
            </label>
            <input
              type="password"
              placeholder="Paste GROQ_API_KEY (gsk_...)"
              value={tempGroqKey}
              onChange={(e) => setTempGroqKey(e.target.value)}
              className="w-full rounded border border-border bg-abyss/80 px-3 py-1 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-success focus:outline-none"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <ShieldCheck className="size-3 text-success" />
            <span>Keys stored locally</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded border border-border bg-accent/40 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 rounded bg-cyan/20 border border-cyan/50 px-4 py-1.5 font-display text-xs font-semibold text-cyan hover:bg-cyan/30"
            >
              {savedSuccess ? <Check className="size-3.5 text-success" /> : null}
              <span>{savedSuccess ? "Saved!" : "Save Settings"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
