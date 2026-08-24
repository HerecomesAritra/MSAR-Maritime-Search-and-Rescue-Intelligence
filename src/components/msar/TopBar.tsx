import { Cpu, Radio, Satellite, ShieldAlert, Waves } from "lucide-react";
import type { AIProvider } from "@/agents/triage";

export function TopBar({
  clock,
  online,
  provider,
  onOpenSettings,
}: {
  clock: string;
  online: boolean;
  provider: AIProvider;
  onOpenSettings: () => void;
}) {
  return (
    <header className="glass sticky top-0 z-30 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-none border-x-0 border-t-0 px-4 py-2.5 md:px-6">
      <div className="flex items-center gap-3">
        <div className="relative grid size-9 place-items-center rounded-md border border-border bg-accent/50">
          <Waves className="size-5 text-cyan" />
          <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-emergency blink" />
        </div>
        <div className="leading-none">
          <div className="font-display text-2xl font-bold tracking-[0.22em] text-foreground">
            MSAR
          </div>
          <div className="data-key mt-1 hidden sm:block">
            Maritime Search &amp; Rescue Intelligence
          </div>
        </div>
      </div>

      <div className="hidden items-center gap-2 border-l border-border pl-6 lg:flex">
        <Satellite className="size-3.5 text-cyan-dim" />
        <span className="data-key">DATA MODE:</span>
        <span className="data-value text-cyan font-bold">HISTORICAL + SIMULATED</span>
      </div>

      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        {/* AI Provider Badge & Settings Toggle */}
        <button
          onClick={onOpenSettings}
          className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-mono font-semibold transition-all ${
            provider === "OLLAMA"
              ? "border-purple-400/50 bg-purple-500/15 text-purple-400 hover:bg-purple-500/25"
              : provider === "OPENROUTER"
                ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25"
                : provider === "GROQ"
                  ? "border-success/50 bg-success/15 text-success hover:bg-success/25"
                  : provider === "MISTRAL"
                    ? "border-warning/50 bg-warning/15 text-warning hover:bg-warning/25"
                    : "border-cyan/50 bg-cyan/15 text-cyan hover:bg-cyan/25"
          }`}
          title="Click to configure AI Model Provider & API Keys"
        >
          <Cpu className="size-3.5" />
          <span>AI: {provider}</span>
        </button>

        <div className="hidden text-right sm:block">
          <div className="data-key">UTC</div>
          <div className="data-value">{clock}</div>
        </div>

        <div
          className={`flex items-center gap-2 rounded-md border px-3 py-1.5 ${
            online
              ? "border-success/40 bg-success/10"
              : "border-warning/40 bg-warning/10"
          }`}
        >
          <ShieldAlert
            className={`size-4 ${online ? "text-success" : "text-warning"}`}
          />
          <span
            className={`font-mono text-xs font-semibold tracking-widest ${
              online ? "text-success" : "text-warning"
            }`}
          >
            {online ? "SYSTEM NOMINAL" : "DEGRADED MODE"}
          </span>
        </div>
      </div>
    </header>
  );
}
