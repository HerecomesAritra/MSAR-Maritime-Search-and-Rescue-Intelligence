export interface RescueAsset {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  speedKnots: number;
  enduranceHours: number;
  medicalCapability: boolean;
  available: boolean;
}

export interface Candidate {
  assetId: string;
  zoneId: string;

  distanceKm: number;
  responseTimeMinutes: number;

  hazardPenalty: number;
  capabilityPenalty: number;

  enduranceFeasible: boolean;

  totalCost: number;
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const earthRadiusKm = 6371;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c =
    2 * Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return earthRadiusKm * c;
}

export function generateCandidates(
  assets: RescueAsset[],
  zones: {
    id: string;
    latitude: number;
    longitude: number;
    priority: number;
  }[],
  hazardPenalty: number
): Candidate[] {
  const candidates: Candidate[] = [];

  for (const asset of assets) {
    if (!asset.available) {
      continue;
    }

    for (const zone of zones) {
      const distanceKm =
        haversineDistance(
          asset.latitude,
          asset.longitude,
          zone.latitude,
          zone.longitude
        );

      const speedKmh =
        asset.speedKnots * 1.852;

      const responseTimeMinutes =
        (distanceKm / speedKmh) * 60;

      // Simplified assumption:
      // required mission duration is proportional
      // to response time.
      const requiredHours =
        responseTimeMinutes / 60 + 1;

      const enduranceFeasible =
        asset.enduranceHours >=
        requiredHours;

      const capabilityPenalty =
        asset.medicalCapability
          ? 0
          : 5;

      const priorityBonus =
        zone.priority * 0.5;

      const totalCost =
        responseTimeMinutes +
        hazardPenalty +
        capabilityPenalty +
        priorityBonus;

      candidates.push({
        assetId: asset.id,
        zoneId: zone.id,
        distanceKm,
        responseTimeMinutes,
        hazardPenalty,
        capabilityPenalty,
        enduranceFeasible,
        totalCost
      });
    }
  }

  return candidates;
}