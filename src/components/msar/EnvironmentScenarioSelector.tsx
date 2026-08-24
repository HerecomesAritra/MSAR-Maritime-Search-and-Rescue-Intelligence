import { Cloud, Wind, AlertTriangle, Check, SlidersHorizontal } from "lucide-react";

export type EnvironmentScenario =
  | "NORMAL_CONDITIONS"
  | "CYCLONE_MICHAUNG"
  | "SEVERE_STORM"
  | "CUSTOM";

interface ScenarioDef {
  key: EnvironmentScenario;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  tone: "success" | "warning" | "emergency" | "cyan";
  tag?: string;
}

const SCENARIOS: ScenarioDef[] = [
  {
    key: "NORMAL_CONDITIONS",
    label: "Normal Conditions",
    sublabel: "Calm seas, 5 kt wind, 0.5 kt current",
    icon: <Cloud className="size-3.5" />,
    tone: "success",
    tag: "SIMULATED",
  },
  {
    key: "CYCLONE_MICHAUNG",
    label: "Cyclone Michaung",
    sublabel: "Historical IMD best-track data (Dec 2023)",
    icon: <Wind className="size-3.5" />,
    tone: "warning",
    tag: "HISTORICAL",
  },
  {
    key: "SEVERE_STORM",
    label: "Severe Storm Simulation",
    sublabel: "Synthetic 120 kt storm at 80 km from vessel",
    icon: <AlertTriangle className="size-3.5" />,
    tone: "emergency",
    tag: "SIMULATED",
  },
  {
    key: "CUSTOM",
    label: "Custom Environment",
    sublabel: "Operator sliders: dynamic wind, current & sea state",
    icon: <SlidersHorizontal className="size-3.5" />,
    tone: "cyan",
    tag: "CUSTOM",
  },
];

const TONE_STYLES = {
  success: {
    selected: "border-success/60 bg-success/15 text-success",
    idle: "border-border bg-accent/20 text-muted-foreground hover:border-success/40 hover:text-success",
    tag: "bg-success/20 text-success border-success/40",
    icon: "text-success",
  },
  warning: {
    selected: "border-warning/60 bg-warning/15 text-warning",
    idle: "border-border bg-accent/20 text-muted-foreground hover:border-warning/40 hover:text-warning",
    tag: "bg-warning/20 text-warning border-warning/40",
    icon: "text-warning",
  },
  emergency: {
    selected: "border-emergency/60 bg-emergency/15 text-emergency",
    idle: "border-border bg-accent/20 text-muted-foreground hover:border-emergency/40 hover:text-emergency",
    tag: "bg-emergency/20 text-emergency border-emergency/40",
    icon: "text-emergency",
  },
  cyan: {
    selected: "border-cyan/60 bg-cyan/15 text-cyan",
    idle: "border-border bg-accent/20 text-muted-foreground hover:border-cyan/40 hover:text-cyan",
    tag: "bg-cyan/20 text-cyan border-cyan/40",
    icon: "text-cyan",
  },
};

interface EnvironmentScenarioSelectorProps {
  value: EnvironmentScenario;
  onChange: (v: EnvironmentScenario) => void;
  disabled?: boolean;
}

export function EnvironmentScenarioSelector({
  value,
  onChange,
  disabled = false,
}: EnvironmentScenarioSelectorProps) {
  return (
    <div className="glass rounded-lg border border-border p-3 space-y-2 shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="data-key flex items-center gap-1.5 text-[10px]">
          <Wind className="size-3 text-cyan" />
          Environmental Scenario
        </span>
        {value === "CUSTOM" ? (
          <span className="flex items-center gap-1 rounded border border-cyan/40 bg-cyan/20 px-1.5 py-0.5 font-mono text-[8px] text-cyan font-bold animate-pulse">
            <span className="size-1 rounded-full bg-cyan blink" />
            LIVE SIMULATION
          </span>
        ) : (
          <span className="rounded border border-cyan/30 bg-cyan/10 px-1.5 py-0.5 font-mono text-[8px] text-cyan font-bold">
            SCENARIO
          </span>
        )}
      </div>

      {/* Scenario Buttons */}
      <div className="space-y-1.5">
        {SCENARIOS.map((s) => {
          const isSelected = value === s.key;
          const styles = TONE_STYLES[s.tone];
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => !disabled && onChange(s.key)}
              disabled={disabled}
              className={`w-full flex items-center justify-between gap-2 rounded border px-2.5 py-2 text-left transition-all duration-200 disabled:opacity-40 ${
                isSelected ? styles.selected : styles.idle
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className={isSelected ? styles.icon : "text-muted-foreground"}>
                  {s.icon}
                </span>
                <div className="min-w-0">
                  <div className="font-display text-[11px] font-semibold tracking-wide truncate">
                    {s.label}
                  </div>
                  <div className="font-mono text-[9px] text-muted-foreground truncate">
                    {s.sublabel}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {s.tag && (
                  <span
                    className={`rounded border px-1.5 py-0.5 font-mono text-[8px] font-bold ${styles.tag}`}
                  >
                    {s.tag}
                  </span>
                )}
                {isSelected && <Check className={`size-3.5 ${styles.icon}`} />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active scenario note */}
      {value === "CUSTOM" && (
        <div className="rounded border border-cyan/40 bg-cyan/10 px-2 py-1.5 font-mono text-[9px] text-cyan leading-relaxed flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-cyan blink" />
          <span>⚡ LIVE SIMULATION ACTIVE — Operator sliders dynamically driving environmental risk pipeline and search probability grid.</span>
        </div>
      )}
      {value === "CYCLONE_MICHAUNG" && (
        <div className="rounded border border-warning/30 bg-warning/5 px-2 py-1.5 font-mono text-[9px] text-warning/80 leading-relaxed">
          🌀 Using IMD Best-Track Dataset — Closest observation to scenario timestamp loaded. All values are historical. Rescue scenario data is SIMULATED.
        </div>
      )}
      {value === "SEVERE_STORM" && (
        <div className="rounded border border-emergency/30 bg-emergency/5 px-2 py-1.5 font-mono text-[9px] text-emergency/80 leading-relaxed">
          ⚠ Synthetic storm parameters injected at 80 km from vessel datum. No real meteorological data used. Routing hazard penalties maximised.
        </div>
      )}
      {value === "NORMAL_CONDITIONS" && (
        <div className="rounded border border-success/30 bg-success/5 px-2 py-1.5 font-mono text-[9px] text-success/80 leading-relaxed">
          ✓ Baseline environmental conditions. Cyclone influence nullified. Uncertainty multiplier at minimum (1.0x).
        </div>
      )}
    </div>
  );
}
