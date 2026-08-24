import type { LucideIcon } from "lucide-react";
import { Activity, Clock, Crosshair, Layers, Ship } from "lucide-react";

export interface Metrics {
  probability: number;
  priorityZone: string;
  responseMin: number;
  availableAssets: number;
  totalAssets: number;
  confidence: number;
}

function Card({
  icon: Icon,
  label,
  value,
  sub,
  tone,
  bar,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
  tone: "cyan" | "emergency" | "warning" | "success";
  bar?: number;
}) {
  const tones = {
    cyan: { t: "text-cyan", b: "bg-cyan", br: "border-cyan/30" },
    emergency: { t: "text-emergency", b: "bg-emergency", br: "border-emergency/30" },
    warning: { t: "text-warning", b: "bg-warning", br: "border-warning/30" },
    success: { t: "text-success", b: "bg-success", br: "border-success/30" },
  }[tone];

  return (
    <div className={`glass rounded-lg border ${tones.br} px-3 py-2.5`}>
      <div className="flex items-center gap-1.5">
        <Icon className={`size-3.5 ${tones.t}`} />
        <span className="data-key">{label}</span>
      </div>
      <div className={`mt-1.5 font-display text-2xl font-bold tabular-nums ${tones.t}`}>
        {value}
      </div>
      <div className="data-key mt-0.5 normal-case tracking-normal">{sub}</div>
      {bar !== undefined && (
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-accent">
          <div
            className={`h-full rounded-full ${tones.b} transition-all duration-700`}
            style={{ width: `${Math.round(bar * 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}

export function MetricsBar({ m }: { m: Metrics }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
      <Card
        icon={Crosshair}
        label="Predicted Probability"
        value={`${(m.probability * 100).toFixed(0)}%`}
        sub="Survivor detection in priority zone"
        tone="cyan"
        bar={m.probability}
      />
      <Card
        icon={Layers}
        label="Search Priority"
        value={m.priorityZone}
        sub="Highest weighted drift cell"
        tone="emergency"
      />
      <Card
        icon={Clock}
        label="Response Time"
        value={`${m.responseMin}m`}
        sub="First asset on scene (ETA)"
        tone="warning"
      />
      <Card
        icon={Ship}
        label="Available Assets"
        value={`${m.availableAssets}/${m.totalAssets}`}
        sub="Taskable units within range"
        tone="success"
      />
      <Card
        icon={Activity}
        label="Confidence"
        value={`${(m.confidence * 100).toFixed(0)}%`}
        sub="Model certainty on current plan"
        tone={m.confidence > 0.7 ? "cyan" : "warning"}
        bar={m.confidence}
      />
    </div>
  );
}
