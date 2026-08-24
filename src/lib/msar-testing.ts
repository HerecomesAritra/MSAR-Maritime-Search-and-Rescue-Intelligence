import { calculateEnvironmentalRisk, scaleZonesWithUncertainty } from "./msar-geo";
import { ZONES } from "./msar-data";

export interface CycloneTestCase {
  name: string;
  vesselPos: { lat: number; lon: number };
  cyclonePos: { lat: number; lon: number };
  windSpeedKt: number;
  expectedMinRisk: number;
  expectedMaxRisk: number;
}

export interface TestResultSummary {
  passed: boolean;
  farScenario: {
    distanceKm: number;
    risk: number;
    uncertainty: number;
    hazardLevel: string;
  };
  nearScenario: {
    distanceKm: number;
    risk: number;
    uncertainty: number;
    hazardLevel: string;
  };
  probabilityNormalized: boolean;
  totalProbabilitySum: number;
  message: string;
}

/**
 * Deterministic test runner verifying environmental risk engine behavior:
 * 1. Far cyclone distance yields lower risk and narrower uncertainty multiplier.
 * 2. Near cyclone distance yields higher risk and wider uncertainty multiplier.
 * 3. Search zone probability masses normalize strictly to 1.0 (100%).
 */
export function runCycloneRiskTests(): TestResultSummary {
  const vessel = { lat: 13.04, lon: 80.52 }; // MV-204 position

  // Far scenario: Cyclone Michaung initial position on Dec 1 (9.1°N, 86.4°E) ~750 km away
  const farResult = calculateEnvironmentalRisk(vessel.lat, vessel.lon, 9.1, 86.4, 25);
  const farZones = scaleZonesWithUncertainty(ZONES, farResult.uncertaintyMultiplier);
  const farProbSum = farZones.reduce((sum, z) => sum + z.probability, 0);

  // Near scenario: Cyclone Michaung position on Dec 4 near Chennai (13.5°N, 80.8°E) ~50 km away
  const nearResult = calculateEnvironmentalRisk(vessel.lat, vessel.lon, 13.5, 80.8, 50);
  const nearZones = scaleZonesWithUncertainty(ZONES, nearResult.uncertaintyMultiplier);
  const nearProbSum = nearZones.reduce((sum, z) => sum + z.probability, 0);

  // Checks
  const isFarLowerRisk = farResult.environmentalRisk < nearResult.environmentalRisk;
  const isFarLowerUncertainty = farResult.uncertaintyMultiplier < nearResult.uncertaintyMultiplier;
  const isFarProbSumNormalized = Math.abs(farProbSum - 1.0) < 0.005;
  const isNearProbSumNormalized = Math.abs(nearProbSum - 1.0) < 0.005;

  const passed =
    isFarLowerRisk && isFarLowerUncertainty && isFarProbSumNormalized && isNearProbSumNormalized;

  return {
    passed,
    farScenario: {
      distanceKm: farResult.distanceToCycloneKm,
      risk: farResult.environmentalRisk,
      uncertainty: farResult.uncertaintyMultiplier,
      hazardLevel: farResult.hazardLevel,
    },
    nearScenario: {
      distanceKm: nearResult.distanceToCycloneKm,
      risk: nearResult.environmentalRisk,
      uncertainty: nearResult.uncertaintyMultiplier,
      hazardLevel: nearResult.hazardLevel,
    },
    probabilityNormalized: isFarProbSumNormalized && isNearProbSumNormalized,
    totalProbabilitySum: Number(nearProbSum.toFixed(4)),
    message: passed
      ? "All environmental risk & uncertainty tests passed successfully. Probabilities normalized to 1.0."
      : "Test failure: risk engine or probability normalization criteria not met.",
  };
}
