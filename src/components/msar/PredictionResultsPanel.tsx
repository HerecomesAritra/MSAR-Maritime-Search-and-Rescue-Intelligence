import type { PredictionResult } from "@/engines/prediction";
import type { RiskResult } from "@/engines/risk";
import type { SearchZone } from "@/engines/probability";
import type { Candidate } from "@/engines/scoring";
import { Compass, AlertTriangle, Navigation, ShieldCheck, Layers, Ship } from "lucide-react";

interface PredictionResultsPanelProps {
  prediction: PredictionResult;
  risk: RiskResult;
  searchZones: SearchZone[];
  candidates: Candidate[];
}

export function PredictionResultsPanel({
  prediction,
  risk,
  searchZones,
  candidates,
}: PredictionResultsPanelProps) {
  const top5Zones = searchZones.slice(0, 5);
  const topCandidates = candidates.slice(0, 5);

  const hazardTone =
    risk.hazardLevel === "HIGH"
      ? "text-emergency border-emergency/40 bg-emergency/15"
      : risk.hazardLevel === "MEDIUM"
        ? "text-warning border-warning/40 bg-warning/15"
        : "text-success border-success/40 bg-success/15";

  return (
    <div className="glass scan-sheen flex flex-col rounded-lg p-3.5 space-y-3 text-xs">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-border/80 pb-2">
        <div className="flex items-center gap-2">
          <div className="grid size-7 place-items-center rounded bg-cyan/20 border border-cyan/40">
            <Compass className="size-4 text-cyan" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold tracking-wider text-foreground">
              DETERMINISTIC ENGINE RESULTS
            </h3>
            <div className="data-key text-[9px]">4-Engine Execution Pipeline</div>
          </div>
        </div>
        <span className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold border ${hazardTone}`}>
          HAZARD: {risk.hazardLevel}
        </span>
      </div>

      {/* Row 1: Prediction & Risk Outputs */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded border border-border/60 bg-abyss/50 p-2 space-y-1">
          <div className="flex items-center gap-1 text-cyan">
            <Navigation className="size-3" />
            <span className="data-key text-[9px]">Predicted Fix</span>
          </div>
          <div className="data-value text-xs font-bold text-foreground">
            {prediction.predictedLatitude.toFixed(4)}°N
          </div>
          <div className="data-value text-xs font-bold text-foreground">
            {prediction.predictedLongitude.toFixed(4)}°E
          </div>
          <div className="text-[9px] text-muted-foreground pt-0.5">
            Drift: {prediction.distanceTravelledKm.toFixed(2)} km
          </div>
        </div>

        <div className="rounded border border-border/60 bg-abyss/50 p-2 space-y-1">
          <div className="flex items-center gap-1 text-warning">
            <AlertTriangle className="size-3" />
            <span className="data-key text-[9px]">Risk Engine</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-[9px] text-muted-foreground">Env Risk:</span>
            <span className="data-value text-xs font-bold text-warning">
              {(risk.environmentalRisk * 100).toFixed(0)}%
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-[9px] text-muted-foreground">Uncertainty:</span>
            <span className="data-value text-xs font-bold text-cyan">
              {risk.uncertaintyMultiplier.toFixed(2)}x
            </span>
          </div>
          <div className="flex justify-between items-baseline text-[9px] text-muted-foreground pt-0.5">
            <span>Cyclone Dist:</span>
            <span>{risk.distanceToCycloneKm.toFixed(0)} km</span>
          </div>
        </div>
      </div>

      {/* Row 2: Top 5 Search Zones */}
      <div className="space-y-1.5 border-t border-border/60 pt-2">
        <div className="flex items-center justify-between">
          <span className="data-key flex items-center gap-1 text-[10px]">
            <Layers className="size-3 text-cyan" /> Top 5 Search Zones
          </span>
          <span className="text-[9px] text-muted-foreground font-mono">Normalized Probability</span>
        </div>
        <div className="space-y-1">
          {top5Zones.map((z) => (
            <div
              key={z.id}
              className="flex items-center justify-between rounded border border-border/40 bg-accent/20 px-2 py-1 text-[10px] font-mono"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-cyan">{z.id}</span>
                <span className="text-muted-foreground">
                  ({z.latitude.toFixed(3)}°, {z.longitude.toFixed(3)}°)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-foreground font-bold">
                  {(z.probability * 100).toFixed(1)}%
                </span>
                <span className="rounded bg-accent px-1 text-[8px] text-muted-foreground">
                  P{z.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: Top Rescue Candidate Actions */}
      <div className="space-y-1.5 border-t border-border/60 pt-2">
        <div className="flex items-center justify-between">
          <span className="data-key flex items-center gap-1 text-[10px]">
            <Ship className="size-3 text-cyan" /> Top Rescue Candidates
          </span>
          <span className="text-[9px] text-muted-foreground font-mono">Lowest Cost First</span>
        </div>
        <div className="space-y-1">
          {topCandidates.map((c, i) => (
            <div
              key={`${c.assetId}-${c.zoneId}`}
              className="flex items-center justify-between rounded border border-border/40 bg-abyss/40 px-2 py-1 text-[10px] font-mono"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-foreground">
                  #{i + 1} {c.assetId}
                </span>
                <span className="text-cyan">→ {c.zoneId}</span>
              </div>
              <div className="flex items-center gap-2 text-[9px]">
                <span className="text-muted-foreground">
                  {c.responseTimeMinutes.toFixed(0)}m ({c.distanceKm.toFixed(1)}km)
                </span>
                <span className="font-bold text-warning">Cost: {c.totalCost.toFixed(0)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
