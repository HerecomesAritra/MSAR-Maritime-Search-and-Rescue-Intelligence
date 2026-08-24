/**
 * AIDecisionCard � Displays the output of the AI Decision Agent.
 *
 * Why a separate component?
 * The PredictionResultsPanel shows deterministic engine numbers (raw math).
 * This card shows the AI layer ON TOP of that math � what the agent decided
 * and why, clearly labelled so operators know it is an AI recommendation.
 *
 * Props:
 *   decision  � the DecisionOutput from runDecisionAgent, or null if not yet run.
 *   isRunning � true while the mission pipeline is executing (shows a spinner).
 */

import { Bot, CheckCircle2, AlertCircle, Loader2, ChevronRight } from "lucide-react";
import type { DecisionOutput } from "@/agents/decision";

interface AIDecisionCardProps {
  decision: DecisionOutput | null;
  isRunning?: boolean;
}

export function AIDecisionCard({ decision, isRunning = false }: AIDecisionCardProps) {
  const confPct = decision?.confidence ?? 0;
  const confColor =
    confPct >= 70
      ? "text-success"
      : confPct >= 45
        ? "text-warning"
        : "text-emergency";
  const confBarColor =
    confPct >= 70
      ? "bg-success"
      : confPct >= 45
        ? "bg-warning"
        : "bg-emergency";

  return (
    <div
      className="glass scan-sheen rounded-lg p-3.5 space-y-3 text-xs"
      style={{
        boxShadow: "0 0 0 1px rgba(34,211,238,0.18), 0 2px 12px rgba(34,211,238,0.07)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/80 pb-2">
        <div className="flex items-center gap-2">
          <div className="grid size-7 place-items-center rounded bg-cyan/20 border border-cyan/40">
            <Bot className="size-4 text-cyan" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold tracking-wider text-cyan">
              AI DECISION AGENT
            </h3>
            <div className="data-key text-[9px]">Reasoning over engine outputs</div>
          </div>
        </div>
        {isRunning ? (
          <span className="flex items-center gap-1 rounded border border-cyan/40 bg-cyan/10 px-2 py-0.5 font-mono text-[10px] text-cyan">
            <Loader2 className="size-3 animate-spin" />
            THINKING
          </span>
        ) : decision ? (
          <span className="flex items-center gap-1 rounded border border-success/40 bg-success/10 px-2 py-0.5 font-mono text-[10px] text-success">
            <CheckCircle2 className="size-3" />
            DECIDED
          </span>
        ) : (
          <span className="flex items-center gap-1 rounded border border-border bg-accent/20 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            <AlertCircle className="size-3" />
            NOT YET RUN
          </span>
        )}
      </div>

      {/* Not-yet-run placeholder */}
      {!decision && !isRunning && (
        <div className="flex flex-col items-center justify-center gap-2 rounded border border-dashed border-border/60 bg-abyss/40 py-6 text-center">
          <Bot className="size-8 text-muted-foreground/40" />
          <p className="text-muted-foreground text-[11px] leading-relaxed max-w-[200px]">
            Click <span className="font-mono text-cyan font-bold">RUN PREDICTION</span> to invoke
            the AI Decision Agent.
          </p>
        </div>
      )}

      {/* Running spinner */}
      {isRunning && (
        <div className="flex flex-col items-center justify-center gap-2 rounded border border-cyan/20 bg-cyan/5 py-6 text-center">
          <Loader2 className="size-8 text-cyan animate-spin" />
          <p className="text-cyan/70 text-[11px]">AI reasoning in progress...</p>
        </div>
      )}

      {/* Decision output */}
      {decision && !isRunning && (
        <>
          {/* Selected asset to zone */}
          <div className="flex items-center gap-2 rounded border border-cyan/30 bg-cyan/5 px-3 py-2">
            <div className="flex-1">
              <div className="data-key text-[9px] mb-0.5">Selected Asset</div>
              <div className="font-mono text-sm font-bold text-cyan">{decision.selectedAsset}</div>
            </div>
            <ChevronRight className="size-4 text-cyan/50 shrink-0" />
            <div className="flex-1">
              <div className="data-key text-[9px] mb-0.5">Assigned Zone</div>
              <div className="font-mono text-sm font-bold text-foreground">{decision.selectedZone}</div>
            </div>
          </div>

          {/* Confidence bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="data-key text-[9px]">Agent Confidence</span>
              <span className={"font-mono text-[11px] font-bold " + confColor}>
                {confPct.toFixed(0)}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/60">
              <div
                className={"h-full rounded-full transition-all duration-700 " + confBarColor}
                style={{ width: confPct + "%" }}
              />
            </div>
          </div>

          {/* AI rationale */}
          <div className="space-y-1">
            <div className="data-key text-[9px]">Decision Rationale</div>
            <p className="rounded border border-border/40 bg-abyss/50 px-2.5 py-2 text-[10px] leading-relaxed text-foreground/80">
              {decision.reason}
            </p>
          </div>

          {/* Alternative candidate */}
          {decision.alternative && decision.alternative !== "None available" && (
            <div className="space-y-1">
              <div className="data-key text-[9px]">Alternative Candidate</div>
              <p className="rounded border border-border/40 bg-accent/20 px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground">
                {decision.alternative}
              </p>
            </div>
          )}

          {/* AI advice disclaimer */}
          <p className="text-[9px] text-muted-foreground/60 border-t border-border/40 pt-2">
            AI recommendation only. Verify against operational rules before actioning.
          </p>
        </>
      )}
    </div>
  );
}
