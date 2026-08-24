export interface RiskInput {
  vesselLatitude: number;
  vesselLongitude: number;
  cycloneLatitude: number;
  cycloneLongitude: number;
  cycloneWindKnots: number;
}

export interface RiskResult {
  distanceToCycloneKm: number;
  environmentalRisk: number;
  uncertaintyMultiplier: number;
  hazardLevel: "LOW" | "MEDIUM" | "HIGH";
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

export function calculateEnvironmentalRisk(
  input: RiskInput
): RiskResult {
  const distanceToCycloneKm =
    haversineDistance(
      input.vesselLatitude,
      input.vesselLongitude,
      input.cycloneLatitude,
      input.cycloneLongitude
    );

  // Closer cyclone = greater risk
  const proximityRisk =
    Math.max(
      0,
      1 - distanceToCycloneKm / 500
    );

  // Stronger cyclone = greater risk
  const intensityRisk =
    Math.min(
      1,
      input.cycloneWindKnots / 70
    );

  // Combine proximity and intensity
  const environmentalRisk =
    Math.min(
      1,
      0.6 * proximityRisk +
      0.4 * intensityRisk
    );

  const uncertaintyMultiplier =
    1 + environmentalRisk;

  let hazardLevel: "LOW" | "MEDIUM" | "HIGH";

  if (environmentalRisk < 0.33) {
    hazardLevel = "LOW";
  } else if (environmentalRisk < 0.66) {
    hazardLevel = "MEDIUM";
  } else {
    hazardLevel = "HIGH";
  }

  return {
    distanceToCycloneKm,
    environmentalRisk,
    uncertaintyMultiplier,
    hazardLevel
  };
}