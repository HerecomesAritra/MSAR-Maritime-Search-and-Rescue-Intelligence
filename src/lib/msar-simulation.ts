import { useCallback, useMemo, useState } from "react";
import assetsData from "@/data/assets.json";
import vesselsData from "@/data/vessels.json";
import type { RescueAsset } from "@/engines/scoring";
import type { Vessel } from "@/types/msar";

export type SimulationEnvironmentScenario =
  "NORMAL_CONDITIONS" | "CYCLONE_MICHAUNG" | "SEVERE_STORM" | "CUSTOM";

export interface SimulationEnvironment {
  windSpeedKnots: number;
  currentSpeedKnots: number;
  currentDirectionDegrees: number;
  seaState: number;
  selectedScenario: SimulationEnvironmentScenario;
}

export interface SimulationState {
  activeVessels: Vessel[];
  activeAssets: RescueAsset[];
  environment: SimulationEnvironment;
  elapsedMinutes: number;
  step: number;
}

const cloneInitialVessels = () => vesselsData.map((vessel) => ({ ...vessel })) as Vessel[];
const cloneInitialAssets = () => assetsData.map((asset) => ({ ...asset })) as RescueAsset[];

const duplicateVessel = (source: Vessel, index: number): Vessel => ({
  ...source,
  id: `${source.id}-${index + 1}`,
  name: `${source.name} ${index + 1}`,
  latitude: source.latitude + index * 0.015,
  longitude: source.longitude + index * 0.015,
});

export function useMsarSimulation(initialWindSpeedKnots: number) {
  const [simulation, setSimulation] = useState<SimulationState>(() => ({
    activeVessels: cloneInitialVessels(),
    activeAssets: cloneInitialAssets(),
    environment: {
      windSpeedKnots: initialWindSpeedKnots,
      currentSpeedKnots: 0,
      currentDirectionDegrees: 0,
      seaState: 1,
      selectedScenario: "CYCLONE_MICHAUNG",
    },
    elapsedMinutes: 0,
    step: 0,
  }));

  const updateVessel = useCallback((vesselId: string, changes: Partial<Vessel>) => {
    setSimulation((state) => ({
      ...state,
      activeVessels: state.activeVessels.map((vessel) =>
        vessel.id === vesselId ? { ...vessel, ...changes } : vessel,
      ),
      step: state.step + 1,
    }));
  }, []);

  const setVesselCount = useCallback((count: number) => {
    setSimulation((state) => {
      const nextCount = Math.max(1, Math.floor(count));
      const baseline = cloneInitialVessels();
      const source = state.activeVessels[0] ?? baseline[0]!;
      const activeVessels = Array.from({ length: nextCount }, (_, index) => {
        if (index < state.activeVessels.length) return state.activeVessels[index]!;
        return duplicateVessel(source, index);
      });
      return { ...state, activeVessels, step: state.step + 1 };
    });
  }, []);

  const randomizeVesselPositions = useCallback(() => {
    setSimulation((state) => ({
      ...state,
      activeVessels: state.activeVessels.map((vessel) => ({
        ...vessel,
        latitude: Number((vessel.latitude + (Math.random() - 0.5) * 0.24).toFixed(4)),
        longitude: Number((vessel.longitude + (Math.random() - 0.5) * 0.24).toFixed(4)),
      })),
      step: state.step + 1,
    }));
  }, []);

  const setAssetAvailability = useCallback((assetId: string, available: boolean) => {
    setSimulation((state) => ({
      ...state,
      activeAssets: state.activeAssets.map((asset) =>
        asset.id === assetId ? { ...asset, available } : asset,
      ),
      step: state.step + 1,
    }));
  }, []);

  const setActiveAssets = useCallback((activeAssets: RescueAsset[]) => {
    setSimulation((state) => ({ ...state, activeAssets, step: state.step + 1 }));
  }, []);

  const restoreAssets = useCallback(() => {
    setSimulation((state) => ({
      ...state,
      activeAssets: cloneInitialAssets(),
      step: state.step + 1,
    }));
  }, []);

  const updateEnvironment = useCallback((changes: Partial<SimulationEnvironment>) => {
    setSimulation((state) => ({
      ...state,
      environment: { ...state.environment, ...changes },
      step: state.step + 1,
    }));
  }, []);

  const advanceTime = useCallback((minutes: number) => {
    setSimulation((state) => ({
      ...state,
      elapsedMinutes: state.elapsedMinutes + minutes,
      step: state.step + 1,
    }));
  }, []);

  const applyScenario = useCallback(() => {
    setSimulation((state) => ({ ...state, step: state.step + 1 }));
  }, []);

  const reset = useCallback(() => {
    setSimulation({
      activeVessels: cloneInitialVessels(),
      activeAssets: cloneInitialAssets(),
      environment: {
        windSpeedKnots: initialWindSpeedKnots,
        currentSpeedKnots: 0,
        currentDirectionDegrees: 0,
        seaState: 1,
        selectedScenario: "CYCLONE_MICHAUNG",
      },
      elapsedMinutes: 0,
      step: 0,
    });
  }, [initialWindSpeedKnots]);

  const updateAssetPosition = useCallback((assetId: string, latitude: number, longitude: number) => {
    setSimulation((state) => ({
      ...state,
      activeAssets: state.activeAssets.map((asset) =>
        asset.id === assetId
          ? { ...asset, latitude: Number(latitude.toFixed(4)), longitude: Number(longitude.toFixed(4)) }
          : asset,
      ),
      step: state.step + 1,
    }));
  }, []);

  const updateAsset = useCallback((assetId: string, changes: Partial<RescueAsset>) => {
    setSimulation((state) => ({
      ...state,
      activeAssets: state.activeAssets.map((asset) =>
        asset.id === assetId ? { ...asset, ...changes } : asset,
      ),
      step: state.step + 1,
    }));
  }, []);

  const actions = useMemo(
    () => ({
      setVesselCount,
      randomizeVesselPositions,
      updateVessel,
      setAssetAvailability,
      setActiveAssets,
      updateAssetPosition,
      updateAsset,
      restoreAssets,
      updateEnvironment,
      advanceTime,
      applyScenario,
      reset,
    }),
    [
      advanceTime,
      applyScenario,
      randomizeVesselPositions,
      reset,
      restoreAssets,
      setActiveAssets,
      setAssetAvailability,
      setVesselCount,
      updateAsset,
      updateAssetPosition,
      updateEnvironment,
      updateVessel,
    ],
  );

  return { ...simulation, actions };
}
