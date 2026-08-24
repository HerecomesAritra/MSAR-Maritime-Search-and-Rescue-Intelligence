import { calculateEnvironmentalRisk } from "./msar-geo";
import { calculateRoutingHazardPenalty } from "./msar-routing";

export interface RescueAssetInput {
  id: string;
  name: string;
  type: "HELO" | "BOAT";
  speedKts: number;
  enduranceHours: number;
  medicalCapability: boolean;
  latitude: number;
  longitude: number;
  readiness?: number;
}

export interface SearchZoneInput {
  id: string;
  latitude: number;
  longitude: number;
  priority?: number;
  requiresMedical?: boolean;
}

export interface CycloneHazardInput {
  cycloneLat: number;
  cycloneLon: number;
  cycloneWindSpeed: number;
}

export interface RescueCandidateAction {
  assetId: string;
  zoneId: string;
  distanceKm: number;
  responseTimeMinutes: number;
  hazardPenalty: number;
  capabilityPenalty: number;
  enduranceFeasible: boolean;
  totalCost: number;
}

/**
 * Deterministic rescue candidate generation engine.
 * Computes candidate response pairings for every available asset against each search zone,
 * evaluating distance, response time, hazard penalty, capability compatibility, and endurance feasibility.
 *
 * @param assets - Array of available rescue assets
 * @param zones - Array of candidate search zones
 * @param hazard - Current cyclone hazard location and wind speed
 * @returns Array of RescueCandidateAction objects
 */
export function generateRescueCandidateActions(
  assets: RescueAssetInput[],
  zones: SearchZoneInput[],
  hazard: CycloneHazardInput
): RescueCandidateAction[] {
  const candidates: RescueCandidateAction[] = [];
  const EARTH_RADIUS_KM = 6371;

  for (const asset of assets) {
    for (const zone of zones) {
      // Step 1: Calculate Haversine distance between asset and zone center in km
      const dLatRad = ((zone.latitude - asset.latitude) * Math.PI) / 180;
      const dLonRad = ((zone.longitude - asset.longitude) * Math.PI) / 180;
      const lat1Rad = (asset.latitude * Math.PI) / 180;
      const lat2Rad = (zone.latitude * Math.PI) / 180;

      const a =
        Math.sin(dLatRad / 2) * Math.sin(dLatRad / 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLonRad / 2) * Math.sin(dLonRad / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distanceKm = Number((EARTH_RADIUS_KM * c).toFixed(2));

      // Step 2: Calculate estimated response time in minutes
      // 1 knot = 1.852 km/h
      const speedKmH = asset.speedKts * 1.852;
      const transitHours = distanceKm / speedKmH;
      const responseTimeMinutes = Number((transitHours * 60).toFixed(1));

      // Step 3: Calculate environmental hazard penalty at zone location
      const routingResult = calculateRoutingHazardPenalty({
        pointLat: zone.latitude,
        pointLon: zone.longitude,
        cycloneLat: hazard.cycloneLat,
        cycloneLon: hazard.cycloneLon,
        cycloneWindSpeed: hazard.cycloneWindSpeed,
      });
      const hazardPenalty = routingResult.hazardPenalty;

      // Step 4: Calculate capability compatibility penalty
      // Penalty applies if zone requires medical capability and asset lacks medical equipment
      let capabilityPenalty = 0;
      if (zone.requiresMedical && !asset.medicalCapability) {
        capabilityPenalty += 30;
      }

      // Add readiness penalty if asset readiness is below 100%
      if (asset.readiness !== undefined && asset.readiness < 1.0) {
        capabilityPenalty += Math.round((1.0 - asset.readiness) * 20);
      }

      // Step 5: Calculate endurance feasibility
      // Round trip transit duration must not exceed asset total endurance hours
      const roundTripHours = transitHours * 2;
      const enduranceFeasible = roundTripHours <= asset.enduranceHours;

      // Step 6: Compute total cost score (objective cost function)
      // Lower score represents a better, safer, and faster rescue assignment.
      // Infeasible endurance incurs a severe cost penalty (+1000).
      const enduranceInfeasiblePenalty = enduranceFeasible ? 0 : 1000;
      const totalCost = Number(
        (
          responseTimeMinutes +
          hazardPenalty * 1.5 +
          capabilityPenalty +
          enduranceInfeasiblePenalty
        ).toFixed(2)
      );

      candidates.push({
        assetId: asset.id,
        zoneId: zone.id,
        distanceKm,
        responseTimeMinutes,
        hazardPenalty,
        capabilityPenalty,
        enduranceFeasible,
        totalCost,
      });
    }
  }

  // Sort candidates by total cost ascending (best actions first)
  return candidates.sort((a, b) => a.totalCost - b.totalCost);
}
