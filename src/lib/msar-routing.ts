import { calculateEnvironmentalRisk } from "./msar-geo";

export interface HazardPenaltyInput {
  /** Target waypoint latitude */
  pointLat: number;
  /** Target waypoint longitude */
  pointLon: number;
  /** Cyclone center latitude */
  cycloneLat: number;
  /** Cyclone center longitude */
  cycloneLon: number;
  /** Cyclone wind speed in knots */
  cycloneWindSpeed: number;
}

export interface HazardPenaltyResult {
  /** Hazard penalty weight (0 = zero hazard penalty, 100 = maximum danger) */
  hazardPenalty: number;
  /** Multiplier for A* edge traversal cost */
  costMultiplier: number;
  /** Whether this waypoint is safe for navigation */
  isNavigable: boolean;
  /** Environmental risk score (0-1) */
  environmentalRisk: number;
}

/**
 * Calculates a hazard penalty weight for any geographic waypoint relative to the cyclone hazard center.
 * Exposed interface for future A* routing algorithms to prefer safer transit corridors.
 *
 * @param input - Waypoint coordinates, cyclone center coordinates, and cyclone wind speed
 * @returns Hazard penalty result containing penalty score, cost multiplier, and navigability status
 */
export function calculateRoutingHazardPenalty(input: HazardPenaltyInput): HazardPenaltyResult {
  const riskResult = calculateEnvironmentalRisk(
    input.pointLat,
    input.pointLon,
    input.cycloneLat,
    input.cycloneLon,
    input.cycloneWindSpeed
  );

  const risk = riskResult.environmentalRisk;

  // Scale penalty from 0 to 100 based on environmental risk score
  const hazardPenalty = Math.round(risk * 100);

  // Cost multiplier for A* pathing (e.g. 1.0x at 0 risk up to 10.0x cost at max risk)
  const costMultiplier = Number((1 + risk * 9).toFixed(2));

  // Waypoints within CRITICAL hazard level (> 0.85 risk) are marked non-navigable
  const isNavigable = risk < 0.85;

  return {
    hazardPenalty,
    costMultiplier,
    isNavigable,
    environmentalRisk: risk,
  };
}
