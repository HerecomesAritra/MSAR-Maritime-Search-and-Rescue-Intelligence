import type { RescueAsset, Candidate } from "@/engines/scoring";
import { generateCandidates } from "@/engines/scoring";
import type { PredictionResult } from "@/engines/prediction";
import { predictPosition } from "@/engines/prediction";
import type { RiskResult } from "@/engines/risk";
import { calculateEnvironmentalRisk } from "@/engines/risk";
import type { SearchZone } from "@/engines/probability";
import { generateSearchZones } from "@/engines/probability";
import type { Vessel } from "@/types/msar";
import type { CycloneObservation } from "@/lib/michaung-data";

export interface VesselSimulationResult {
  vessel: Vessel;
  prediction: PredictionResult;
  environmentalRisk: RiskResult;
  searchZones: SearchZone[];
  candidates: Candidate[];
}

/**
 * Runs the existing single-vessel deterministic engines once per vessel.
 * No probabilities are merged: each returned search grid remains tied to its
 * own vessel ID and is rendered independently by the tactical map.
 */
export function runMultiVesselSimulation({
  vessels,
  assets,
  observation,
  elapsedMinutes,
}: {
  vessels: Vessel[];
  assets: RescueAsset[];
  observation: CycloneObservation;
  elapsedMinutes: number;
}): VesselSimulationResult[] {
  return vessels.flatMap((vessel) => {
    if (!Number.isFinite(vessel.latitude) || !Number.isFinite(vessel.longitude)) return [];

    const prediction = predictPosition({
      latitude: vessel.latitude,
      longitude: vessel.longitude,
      speedKnots: vessel.speedKnots,
      headingDegrees: vessel.headingDegrees,
      elapsedMinutes: vessel.minutesSinceContact + Math.floor(elapsedMinutes),
    });

    if (!Number.isFinite(prediction.predictedLatitude) || !Number.isFinite(prediction.predictedLongitude)) {
      return [];
    }

    const environmentalRisk = calculateEnvironmentalRisk({
      vesselLatitude: prediction.predictedLatitude,
      vesselLongitude: prediction.predictedLongitude,
      cycloneLatitude: observation.latitude,
      cycloneLongitude: observation.longitude,
      cycloneWindKnots: observation.wind_kt,
    });

    const searchZones = generateSearchZones({
      centerLatitude: prediction.predictedLatitude,
      centerLongitude: prediction.predictedLongitude,
      uncertaintyKm: environmentalRisk.uncertaintyMultiplier * 10,
    });

    return [{
      vessel,
      prediction,
      environmentalRisk,
      searchZones,
      candidates: generateCandidates(assets, searchZones.slice(0, 5), environmentalRisk.environmentalRisk * 50),
    }];
  });
}
