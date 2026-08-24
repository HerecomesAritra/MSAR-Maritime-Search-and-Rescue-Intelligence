import { useState } from "react";
import { CloudLightning, Compass, Gauge, Play, Pause, SkipBack, SkipForward, Wind, ShieldAlert, CheckCircle2 } from "lucide-react";
import type { CycloneObservation } from "@/lib/michaung-data";
import { formatCycloneCategory, MICHAUNG_TRACK } from "@/lib/michaung-data";
import type { EnvironmentalRiskResult } from "@/lib/msar-geo";
import { runCycloneRiskTests, type TestResultSummary } from "@/lib/msar-testing";

interface CycloneStatusCardProps {
  currentObservation: CycloneObservation;
  currentIndex: number;
  onIndexChange: (index: number) => void;
  riskResult: EnvironmentalRiskResult;
}

export function CycloneStatusCard({
  currentObservation,
  currentIndex,
  onIndexChange,
  riskResult,
}: CycloneStatusCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [testResults, setTestResults] = useState<TestResultSummary | null>(null);

  const handlePrev = () => {
    onIndexChange(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    onIndexChange(Math.min(MICHAUNG_TRACK.length - 1, currentIndex + 1));
  };

  const hazardToneClass =
    riskResult.hazardLevel === "CRITICAL"
      ? "text-emergency border-emergency/40 bg-emergency/15"
      : riskResult.hazardLevel === "HIGH"
        ? "text-warning border-warning/40 bg-warning/15"
        : riskResult.hazardLevel === "MODERATE"
          ? "text-cyan border-cyan/40 bg-cyan/15"
          : "text-success border-success/40 bg-success/15";

  const runTests = () => {
    const res = runCycloneRiskTests();
    setTestResults(res);
  };

  return (
    <div className="glass scan-sheen flex shrink-0 flex-col rounded-lg p-3.5 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/80 pb-2">
        <div className="flex items-center gap-2">
          <div className="grid size-7 place-items-center rounded bg-warning/20 border border-warning/40">
            <CloudLightning className="size-4 text-warning" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold tracking-wider text-foreground">
              CYCLONE MICHAUNG
            </h3>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[9px] font-semibold text-warning tracking-widest uppercase">
                HISTORICAL SCENARIO
              </span>
              <span className="text-[9px] text-muted-foreground">· IMD Track Data</span>
            </div>
          </div>
        </div>
        <span className="rounded bg-accent/60 px-2 py-0.5 font-mono text-[10px] font-medium text-cyan border border-border">
          {formatCycloneCategory(currentObservation.category)}
        </span>
      </div>

      {/* Grid Data: Historical vs Simulated */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {/* Historical Position */}
        <div className="rounded border border-border/60 bg-abyss/40 p-2">
          <div className="data-key text-[9px]">Historical Position</div>
          <div className="data-value text-xs font-bold text-foreground mt-0.5">
            {currentObservation.latitude.toFixed(1)}°N, {currentObservation.longitude.toFixed(1)}°E
          </div>
          <div className="text-[9px] text-muted-foreground mt-0.5">Observed IMD Center</div>
        </div>

        {/* Timestamp */}
        <div className="rounded border border-border/60 bg-abyss/40 p-2">
          <div className="data-key text-[9px]">Observation Time</div>
          <div className="data-value text-xs font-semibold text-cyan mt-0.5">
            {currentObservation.timestamp.replace("T", " ").replace(":00Z", " UTC")}
          </div>
          <div className="text-[9px] text-muted-foreground mt-0.5">Dec 2023 Best Track</div>
        </div>

        {/* Wind Speed */}
        <div className="rounded border border-border/60 bg-abyss/40 p-2">
          <div className="flex items-center justify-between">
            <span className="data-key text-[9px]">Wind Speed</span>
            <Wind className="size-3 text-cyan-dim" />
          </div>
          <div className="data-value text-xs font-bold text-warning mt-0.5">
            {currentObservation.wind_kt} kts
          </div>
          <div className="text-[9px] text-muted-foreground mt-0.5">
            {(currentObservation.wind_kt * 1.852).toFixed(0)} km/h max sustained
          </div>
        </div>

        {/* Central Pressure */}
        <div className="rounded border border-border/60 bg-abyss/40 p-2">
          <div className="flex items-center justify-between">
            <span className="data-key text-[9px]">Central Pressure</span>
            <Gauge className="size-3 text-cyan-dim" />
          </div>
          <div className="data-value text-xs font-semibold text-foreground mt-0.5">
            {currentObservation.pressure_hpa} hPa
          </div>
          <div className="text-[9px] text-muted-foreground mt-0.5">
            -{currentObservation.pressure_drop_hpa} hPa drop
          </div>
        </div>
      </div>

      {/* Environmental Risk & Uncertainty Bar */}
      <div className="rounded-md border border-border/80 bg-accent/20 p-2.5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="data-key text-[10px]">Simulated Environmental Risk</span>
          <span className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold border ${hazardToneClass}`}>
            HAZARD: {riskResult.hazardLevel}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-border/40">
          <div>
            <div className="data-key text-[8px]">Risk Score</div>
            <div className="font-mono text-sm font-bold text-warning">
              {(riskResult.environmentalRisk * 100).toFixed(0)}%
            </div>
          </div>
          <div>
            <div className="data-key text-[8px]">Uncertainty</div>
            <div className="font-mono text-sm font-bold text-cyan">
              {riskResult.uncertaintyMultiplier.toFixed(2)}x
            </div>
          </div>
          <div>
            <div className="data-key text-[8px]">Cyclone Distance</div>
            <div className="font-mono text-sm font-bold text-foreground">
              {riskResult.distanceToCycloneKm.toFixed(0)} km
            </div>
          </div>
        </div>
      </div>

      {/* Time Control Slider (PART 3) */}
      <div className="space-y-1.5 border-t border-border/60 pt-2.5">
        <div className="flex items-center justify-between text-[10px]">
          <span className="data-key">Historical Time Control</span>
          <span className="font-mono text-muted-foreground">
            Track Pt {currentIndex + 1} / {MICHAUNG_TRACK.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="rounded border border-border bg-accent/40 p-1.5 text-foreground hover:bg-cyan/20 disabled:opacity-30"
            title="Previous Observation"
          >
            <SkipBack className="size-3.5" />
          </button>

          <input
            type="range"
            min={0}
            max={MICHAUNG_TRACK.length - 1}
            value={currentIndex}
            onChange={(e) => onIndexChange(Number(e.target.value))}
            className="h-1.5 flex-1 cursor-pointer accent-cyan bg-accent rounded"
          />

          <button
            onClick={handleNext}
            disabled={currentIndex === MICHAUNG_TRACK.length - 1}
            className="rounded border border-border bg-accent/40 p-1.5 text-foreground hover:bg-cyan/20 disabled:opacity-30"
            title="Next Observation"
          >
            <SkipForward className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Test Verification Runner (PART 10) */}
      <div className="border-t border-border/60 pt-2">
        <button
          onClick={runTests}
          className="flex w-full items-center justify-center gap-1.5 rounded border border-cyan/40 bg-cyan/10 px-2.5 py-1.5 font-mono text-[10px] font-semibold text-cyan hover:bg-cyan/20 transition-all"
        >
          <CheckCircle2 className="size-3" />
          RUN RISK ENGINE TEST VERIFICATION
        </button>

        {testResults && (
          <div className="mt-2 rounded border border-border bg-abyss/60 p-2 text-[10px] space-y-1 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Test Suite Status:</span>
              <span className={testResults.passed ? "text-success font-bold" : "text-emergency font-bold"}>
                {testResults.passed ? "PASSED (100%)" : "FAILED"}
              </span>
            </div>
            <div className="text-muted-foreground text-[9px] leading-tight">
              Far: {testResults.farScenario.distanceKm}km → Risk {(testResults.farScenario.risk * 100).toFixed(0)}% | Near: {testResults.nearScenario.distanceKm}km → Risk {(testResults.nearScenario.risk * 100).toFixed(0)}%
            </div>
            <div className="text-success text-[9px]">
              Probability Normalization: {testResults.totalProbabilitySum} (Sum = 1.0)
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
