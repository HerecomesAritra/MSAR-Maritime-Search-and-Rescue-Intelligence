import type { LucideIcon } from "lucide-react";
import { History, PlayCircle, RefreshCw, RotateCcw, ZapOff } from "lucide-react";

export type ActionKey = "run" | "recalc" | "fail" | "replay" | "reset";

const ACTIONS: Array<{
  key: ActionKey;
  label: string;
  icon: LucideIcon;
  tone: "primary" | "cyan" | "emergency" | "warning" | "muted";
}> = [
  { key: "run", label: "Run Prediction", icon: PlayCircle, tone: "primary" },
  { key: "recalc", label: "Recalculate", icon: RefreshCw, tone: "cyan" },
  { key: "fail", label: "Simulate Asset Failure", icon: ZapOff, tone: "emergency" },
  { key: "replay", label: "Historical Replay", icon: History, tone: "warning" },
  { key: "reset", label: "Reset", icon: RotateCcw, tone: "muted" },
];

const TONES = {
  primary:
    "border-cyan bg-cyan/20 text-cyan hover:bg-cyan/30 shadow-[var(--glow-cyan)]",
  cyan: "border-cyan/40 bg-accent/40 text-cyan hover:border-cyan hover:bg-cyan/15",
  emergency:
    "border-emergency/50 bg-emergency/10 text-emergency hover:bg-emergency/20",
  warning: "border-warning/50 bg-warning/10 text-warning hover:bg-warning/20",
  muted:
    "border-border bg-accent/30 text-muted-foreground hover:border-foreground/30 hover:text-foreground",
};

export function ActionBar({
  onAction,
  busy,
}: {
  onAction: (k: ActionKey) => void;
  busy: ActionKey | null;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {ACTIONS.map((a) => (
        <button
          key={a.key}
          onClick={() => onAction(a.key)}
          disabled={busy !== null}
          className={`flex items-center gap-2 rounded-md border px-3.5 py-2 font-display text-xs font-semibold uppercase tracking-[0.16em] transition-all disabled:opacity-45 ${TONES[a.tone]}`}
        >
          <a.icon className={`size-3.5 ${busy === a.key ? "animate-spin" : ""}`} />
          {a.label}
        </button>
      ))}
    </div>
  );
}
