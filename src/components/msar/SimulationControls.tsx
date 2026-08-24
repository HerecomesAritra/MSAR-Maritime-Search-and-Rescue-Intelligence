import { Dice5, RotateCcw, Ship, SlidersHorizontal, Wind } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import type { RescueAsset } from "@/engines/scoring";
import type { SimulationEnvironment } from "@/lib/msar-simulation";
import type { Vessel } from "@/types/msar";

interface SimulationControlsProps {
  vessels: Vessel[];
  assets: RescueAsset[];
  environment: SimulationEnvironment;
  onVesselCountChange: (count: number) => void;
  onRandomizePositions: () => void;
  onVesselChange?: (vesselId: string, changes: Partial<Vessel>) => void;
  onEnvironmentChange: (changes: Partial<SimulationEnvironment>) => void;
  onAssetAvailabilityChange: (assetId: string, available: boolean) => void;
  onAssetChange?: (assetId: string, changes: Partial<RescueAsset>) => void;
  onApplyScenario: () => void;
  onResetScenario: () => void;
}

function RangeControl({
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="data-key">{label}</label>
        <span className="font-mono text-[10px] text-cyan">
          {value}
          {unit}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={1}
        onValueChange={([next]) => onChange(next ?? value)}
      />
    </div>
  );
}

export function SimulationControls({
  vessels,
  assets,
  environment,
  onVesselCountChange,
  onRandomizePositions,
  onVesselChange,
  onEnvironmentChange,
  onAssetAvailabilityChange,
  onAssetChange,
  onApplyScenario,
  onResetScenario,
}: SimulationControlsProps) {
  const availableAssets = assets.filter((asset) => asset.available).length;
  const primaryVessel = vessels[0];

  return (
    <section className="glass rounded-lg border border-cyan/25 p-3 space-y-3 shrink-0">
      <div className="flex items-center justify-between">
        <span className="data-key flex items-center gap-1.5 text-[10px]">
          <SlidersHorizontal className="size-3 text-cyan" />
          Simulation Controls
        </span>
        <span className="rounded border border-cyan/30 bg-cyan/10 px-1.5 py-0.5 font-mono text-[8px] font-bold text-cyan">
          LIVE STATE
        </span>
      </div>

      <div className="space-y-2 border-t border-border pt-2.5">
        <div className="flex items-center justify-between">
          <span className="data-key flex items-center gap-1.5">
            <Ship className="size-3 text-cyan" /> Vessels
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            {vessels.length} ACTIVE
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {[1, 2, 3, 4].map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => onVesselCountChange(count)}
              className={`rounded border py-1 font-mono text-[10px] font-bold transition-colors ${
                vessels.length === count
                  ? "border-cyan bg-cyan/15 text-cyan"
                  : "border-border bg-accent/20 text-muted-foreground hover:border-cyan/40"
              }`}
            >
              {count}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onRandomizePositions}
          className="flex w-full items-center justify-center gap-1.5 rounded border border-border bg-accent/20 py-1.5 font-mono text-[9px] font-bold text-muted-foreground transition-colors hover:border-cyan/40 hover:text-cyan"
        >
          <Dice5 className="size-3" /> Randomize Positions
        </button>

        {primaryVessel && onVesselChange && (
          <div className="space-y-2 pt-1 border-t border-border/50">
            <div className="font-mono text-[9px] text-cyan font-bold">
              Primary Vessel ({primaryVessel.id}) Dynamics
            </div>
            <RangeControl
              label="Vessel speed"
              value={primaryVessel.speedKnots}
              min={0}
              max={30}
              unit=" kt"
              onChange={(speedKnots) => onVesselChange(primaryVessel.id, { speedKnots })}
            />
            <RangeControl
              label="Vessel heading"
              value={primaryVessel.headingDegrees}
              min={0}
              max={359}
              unit="°"
              onChange={(headingDegrees) => onVesselChange(primaryVessel.id, { headingDegrees })}
            />
            <RangeControl
              label="Time since contact"
              value={primaryVessel.minutesSinceContact}
              min={0}
              max={180}
              unit=" min"
              onChange={(minutesSinceContact) => onVesselChange(primaryVessel.id, { minutesSinceContact })}
            />
          </div>
        )}
      </div>

      <div className="space-y-2.5 border-t border-border pt-2.5">
        <span className="data-key flex items-center gap-1.5">
          <Wind className="size-3 text-warning" /> Weather
          {environment.selectedScenario === "CUSTOM" && (
            <span className="ml-auto flex items-center gap-1 font-mono text-[8px] font-bold text-cyan animate-pulse">
              <span className="size-1 rounded-full bg-cyan blink" />
              LIVE SIMULATION
            </span>
          )}
        </span>
        <RangeControl
          label="Wind speed"
          value={environment.windSpeedKnots}
          min={0}
          max={140}
          unit=" kt"
          onChange={(windSpeedKnots) => onEnvironmentChange({ windSpeedKnots, selectedScenario: "CUSTOM" })}
        />
        <RangeControl
          label="Current speed"
          value={environment.currentSpeedKnots}
          min={0}
          max={10}
          unit=" kt"
          onChange={(currentSpeedKnots) => onEnvironmentChange({ currentSpeedKnots, selectedScenario: "CUSTOM" })}
        />
        <RangeControl
          label="Current direction"
          value={environment.currentDirectionDegrees}
          min={0}
          max={359}
          unit="°"
          onChange={(currentDirectionDegrees) => onEnvironmentChange({ currentDirectionDegrees, selectedScenario: "CUSTOM" })}
        />
        <div className="flex items-center justify-between gap-2">
          <label className="data-key">Sea state</label>
          <select
            value={environment.seaState}
            onChange={(event) => onEnvironmentChange({ seaState: Number(event.target.value), selectedScenario: "CUSTOM" })}
            className="rounded border border-border bg-accent/30 px-2 py-1 font-mono text-[10px] text-foreground outline-none focus:border-cyan"
          >
            {[1, 2, 3, 4, 5, 6].map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2 border-t border-border pt-2.5">
        <div className="flex items-center justify-between">
          <span className="data-key">Rescue assets</span>
          <span className="font-mono text-[10px] text-success">
            {availableAssets}/{assets.length} READY
          </span>
        </div>
        <div className="space-y-1.5">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="space-y-1.5 rounded border border-border/70 bg-accent/15 p-2"
            >
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <div className="truncate font-mono text-[10px] font-bold text-foreground">
                    {asset.id} — {asset.name}
                  </div>
                  <div className="truncate font-mono text-[8px] text-muted-foreground">
                    {asset.type} • {asset.speedKnots} kts
                  </div>
                </div>
                <Switch
                  checked={asset.available}
                  onCheckedChange={(available) => onAssetAvailabilityChange(asset.id, available)}
                  aria-label={`Set ${asset.id} availability`}
                />
              </div>
              {onAssetChange && asset.available && (
                <RangeControl
                  label="Speed"
                  value={asset.speedKnots}
                  min={10}
                  max={200}
                  unit=" kt"
                  onChange={(speedKnots) => onAssetChange(asset.id, { speedKnots })}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-border pt-2.5">
        <button
          type="button"
          onClick={onApplyScenario}
          className="rounded border border-cyan/50 bg-cyan/10 px-2 py-1.5 font-mono text-[9px] font-bold text-cyan hover:bg-cyan/20"
        >
          Apply Scenario
        </button>
        <button
          type="button"
          onClick={onResetScenario}
          className="flex items-center justify-center gap-1 rounded border border-border bg-accent/20 px-2 py-1.5 font-mono text-[9px] font-bold text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="size-3" /> Reset Scenario
        </button>
      </div>
    </section>
  );
}
