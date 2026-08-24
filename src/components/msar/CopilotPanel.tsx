import { useState, useEffect, useRef } from "react";
import { Bot, ChevronRight, Sparkles, Send, MessageSquare, Square } from "lucide-react";
import type { CopilotMessage } from "@/lib/msar-data";
import { COPILOT_QUESTIONS } from "@/lib/msar-data";

export function CopilotPanel({
  messages,
  thinking,
  recommendation,
  onAsk,
  onStop,
}: {
  messages: CopilotMessage[];
  thinking: boolean;
  recommendation: { headline: string; detail: string; tone: "cyan" | "warning" | "emergency" };
  onAsk: (q: string) => void;
  onStop?: () => void;
}) {
  const [customInput, setCustomInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, thinking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customInput.trim();
    if (!trimmed || thinking) return;
    onAsk(trimmed);
    setCustomInput("");
  };

  const toneBorder =
    recommendation.tone === "emergency"
      ? "border-emergency/50 bg-emergency/10"
      : recommendation.tone === "warning"
        ? "border-warning/50 bg-warning/10"
        : "border-cyan/50 bg-cyan/8";

  return (
    <section className="glass flex h-full flex-col rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3 shrink-0">
        <Bot className="size-4 text-cyan" />
        <h2 className="panel-label">AI SAR Copilot</h2>
        <span className="ml-auto flex items-center gap-1.5">
          <span className={`size-1.5 rounded-full ${thinking ? "bg-emergency blink" : "bg-success"}`} />
          <span className="data-key">{thinking ? "REASONING" : "IDLE"}</span>
          {thinking && onStop && (
            <button
              type="button"
              onClick={onStop}
              className="ml-1 flex items-center gap-1 rounded border border-emergency/60 bg-emergency/20 px-2 py-0.5 font-mono text-[9px] font-bold text-emergency hover:bg-emergency/35 transition-all animate-pulse"
              title="Stop AI generation immediately"
            >
              <Square className="size-2.5 fill-emergency" />
              <span>STOP AI</span>
            </button>
          )}
        </span>
      </div>

      {/* Current Recommendation Banner */}
      <div className={`m-3 shrink-0 rounded-md border px-3 py-2.5 ${toneBorder}`}>
        <div className="data-key mb-1 flex items-center gap-1.5">
          <Sparkles className="size-3 text-cyan" /> Current Recommendation
        </div>
        <div className="font-display text-sm font-semibold tracking-wide text-foreground">
          {recommendation.headline}
        </div>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {recommendation.detail}
        </p>
      </div>

      {/* Decision Explanation Log */}
      <div className="flex-1 space-y-3 overflow-y-auto px-3 pb-2 min-h-0">
        <div className="data-key px-1 flex items-center gap-1">
          <MessageSquare className="size-3 text-cyan-dim" /> Decision Explanation Log
        </div>
        {messages.map((m) => (
          <div
            key={m.id}
            className={`rounded-md border px-3 py-2 text-xs leading-relaxed ${
              m.role === "operator"
                ? "ml-6 border-cyan/40 bg-cyan/10 text-foreground"
                : "border-cyan/25 bg-abyss/60 text-muted-foreground"
            }`}
          >
            <div className="data-key mb-1 flex justify-between items-center text-[9px]">
              <span className={m.role === "operator" ? "text-cyan font-bold" : "text-muted-foreground"}>
                {m.role === "operator" ? "OPERATOR" : "COPILOT"}
              </span>
              <span>{m.ts}</span>
            </div>
            <div className="whitespace-pre-line text-xs">{m.text}</div>
          </div>
        ))}
        {thinking && (
          <div className="rounded-md border border-cyan/25 bg-abyss/50 px-3 py-2 flex items-center justify-between">
            <div>
              <span className="data-key">COPILOT ANALYSING PIPELINE</span>
              <div className="mt-1 flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-1.5 rounded-full bg-cyan blink"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
            {onStop && (
              <button
                type="button"
                onClick={onStop}
                className="flex items-center gap-1 rounded border border-emergency/60 bg-emergency/25 px-2.5 py-1 text-xs font-mono font-bold text-emergency hover:bg-emergency/40 transition-colors"
              >
                <Square className="size-3 fill-emergency" />
                <span>Stop AI</span>
              </button>
            )}
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Preset Questions & Custom Text Query Input */}
      <div className="border-t border-border p-3 space-y-2.5 bg-abyss/40 shrink-0">
        {/* Preset Questions */}
        <div>
          <div className="data-key mb-1.5 text-[9px]">Quick Operator Queries</div>
          <div className="space-y-1">
            {COPILOT_QUESTIONS.map((item) => (
              <button
                key={item.q}
                onClick={() => onAsk(item.q)}
                disabled={thinking}
                className="group flex w-full items-center justify-between gap-2 rounded border border-border/80 bg-accent/20 px-2.5 py-1.5 text-left text-[11px] text-foreground transition-colors hover:border-cyan/60 hover:bg-cyan/10 disabled:opacity-50"
              >
                <span className="truncate">{item.q}</span>
                <ChevronRight className="size-3 shrink-0 text-cyan transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        </div>

        {/* Free-Text Input Box */}
        <form onSubmit={handleSubmit} className="flex items-center gap-1.5 pt-1">
          <input
            type="text"
            placeholder="Ask copilot any question..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            disabled={thinking}
            className="flex-1 rounded border border-border bg-accent/40 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-cyan focus:outline-none disabled:opacity-50 font-sans"
          />
          {thinking && onStop ? (
            <button
              type="button"
              onClick={onStop}
              className="flex items-center gap-1 rounded bg-emergency/25 border border-emergency/60 px-3 py-2 text-xs font-semibold text-emergency hover:bg-emergency/40 transition-colors shrink-0 font-mono font-bold"
            >
              <Square className="size-3.5 fill-emergency" />
              <span>Stop</span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={thinking || !customInput.trim()}
              className="flex items-center gap-1 rounded bg-cyan/20 border border-cyan/50 px-3 py-2 text-xs font-semibold text-cyan hover:bg-cyan/30 disabled:opacity-40 transition-colors shrink-0"
            >
              <Send className="size-3.5" />
              <span>Ask</span>
            </button>
          )}
        </form>
      </div>
    </section>
  );
}
