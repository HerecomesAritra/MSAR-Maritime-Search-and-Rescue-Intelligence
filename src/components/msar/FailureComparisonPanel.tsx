import { AlertTriangle, ArrowRight, TrendingDown, Clock, Shield, Zap } from "lucide-react";
import type { Candidate } from "@/engines/scoring";

interface FailureComparisonPanelProps {
  failedAssetId: string;
  before: {
    selectedAsset: string;
    selectedZone: string;
    topCandidate: Candidate | null;
  };
  after: {
    selectedAsset: string;
    selectedZone: string;
    topCandidate: Candidate | null;
    candidateCount: number;
  };
  onDismiss: () => void;
}

export function FailureComparisonPanel({
  failedAssetId,
  before,
  after,
  onDismiss,
}: FailureComparisonPanelProps) {
  const deltaTime =
    (after.topCandidate?.responseTimeMinutes ?? 0) -
    (before.topCandidate?.responseTimeMinutes ?? 0);

  const deltaCost =
    (after.topCandidate?.totalCost ?? 0) -
    (before.topCandidate?.totalCost ?? 0);

  const assetChanged = before.selectedAsset !== after.selectedAsset;
  const zoneChanged = before.selectedZone !== after.selectedZone;

  return (
    <div className="glass scan-sheen rounded-lg border border-emergency/40 bg-emergency/5 p-3.5 space-y-3 animate-[fadeInSlide_0.35s_ease-out]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-emergency/30 pb-2">
        <div className="flex items-center gap-2">
          <div className="grid size-6 place-items-center rounded bg-emergency/20 border border-emergency/40">
            <AlertTriangle className="size-3.5 text-emergency" />
          </div>
          <div>
            <div className="font-display text-sm font-bold tracking-wider text-emergency">
              ASSET FAILURE SIMULATION
            </div>
            <div className="data-key text-[9px]">Contingency Re-Tasking Active</div>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="rounded border border-border bg-accent/40 px-2 py-0.5 font-mono text-[9px] text-muted-foreground hover:border-emergency/40 hover:text-emergency transition-colors"
        >
          DISMISS
        </button>
      </div>

      {/* Failed Asset Badge */}
      <div className="flex items-center gap-2 rounded border border-emergency/50 bg-emergency/10 px-3 py-2">
        <Zap className="size-3.5 text-emergency shrink-0" />
        <span className="font-mono text-xs font-bold text-emergency">
          {failedAssetId}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          — marked UNAVAILABLE, removed from candidate pool
        </span>
      </div>

      {/* Before / After Comparison */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
        {/* BEFORE */}
        <div className="space-y-1.5 rounded border border-border/60 bg-abyss/60 p-2.5">
          <div className="data-key text-[9px] text-cyan mb-1">BEFORE</div>
          <div className="font-mono text-xs font-bold text-foreground">
            {before.selectedAsset}
          </div>
          <div className="font-mono text-[10px] text-cyan">→ {before.selectedZone}</div>
          {before.topCandidate && (
            <div className="space-y-0.5 mt-1 text-[9px] text-muted-foreground font-mono">
              <div>ETA: {before.topCandidate.responseTimeMinutes.toFixed(0)} min</div>
              <div>Cost: {before.topCandidate.totalCost.toFixed(1)}</div>
              <div>Dist: {before.topCandidate.distanceKm.toFixed(1)} km</div>
            </div>
          )}
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center gap-1">
          <ArrowRight className="size-4 text-emergency" />
          <span className="font-mono text-[8px] text-emergency font-bold">FAIL</span>
        </div>

        {/* AFTER */}
        <div className="space-y-1.5 rounded border border-success/40 bg-success/5 p-2.5">
          <div className="data-key text-[9px] text-success mb-1">AFTER</div>
          {after.selectedAsset !== "NONE" ? (
            <>
              <div className={`font-mono text-xs font-bold ${assetChanged ? "text-warning" : "text-foreground"}`}>
                {after.selectedAsset}
                {assetChanged && <span className="ml-1 text-[9px] text-warning">↺ CHANGED</span>}
              </div>
              <div className={`font-mono text-[10px] ${zoneChanged ? "text-warning" : "text-cyan"}`}>
                → {after.selectedZone}
                {zoneChanged && <span className="ml-1 text-[9px]">↺</span>}
              </div>
              {after.topCandidate && (
                <div className="space-y-0.5 mt-1 text-[9px] font-mono">
                  <div className={deltaTime > 0 ? "text-warning" : "text-muted-foreground"}>
                    ETA: {after.topCandidate.responseTimeMinutes.toFixed(0)} min
                    {deltaTime > 0 && <span className="ml-1 text-warning">+{deltaTime.toFixed(0)}</span>}
                  </div>
                  <div className={deltaCost > 0 ? "text-warning" : "text-muted-foreground"}>
                    Cost: {after.topCandidate.totalCost.toFixed(1)}
                    {deltaCost > 0 && <span className="ml-1 text-warning">+{deltaCost.toFixed(1)}</span>}
                  </div>
                  <div className="text-muted-foreground">
                    Dist: {after.topCandidate.distanceKm.toFixed(1)} km
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="font-mono text-xs text-emergency font-bold">
              NO FEASIBLE ASSET
            </div>
          )}
        </div>
      </div>

      {/* Delta Summary Row */}
      <div className="flex flex-wrap gap-2 border-t border-border/60 pt-2">
        {deltaTime > 0 && (
          <div className="flex items-center gap-1.5 rounded border border-warning/40 bg-warning/10 px-2 py-1">
            <Clock className="size-3 text-warning" />
            <span className="font-mono text-[9px] text-warning font-bold">
              +{deltaTime.toFixed(0)} min response delay
            </span>
          </div>
        )}
        {deltaCost > 0 && (
          <div className="flex items-center gap-1.5 rounded border border-warning/40 bg-warning/10 px-2 py-1">
            <TrendingDown className="size-3 text-warning" />
            <span className="font-mono text-[9px] text-warning font-bold">
              Cost +{deltaCost.toFixed(1)} (scoring engine)
            </span>
          </div>
        )}
        <div className="flex items-center gap-1.5 rounded border border-border bg-accent/30 px-2 py-1">
          <Shield className="size-3 text-muted-foreground" />
          <span className="font-mono text-[9px] text-muted-foreground">
            {after.candidateCount} candidate{after.candidateCount !== 1 ? "s" : ""} remaining
          </span>
        </div>
      </div>
    </div>
  );
}
