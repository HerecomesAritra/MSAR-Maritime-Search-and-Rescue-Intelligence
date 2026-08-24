export interface PredictionInput {
  latitude: number;
  longitude: number;
  speedKnots: number;
  headingDegrees: number;
  elapsedMinutes: number;
}

export interface PredictionResult {
  predictedLatitude: number;
  predictedLongitude: number;
  distanceTravelledKm: number;
}

export function predictPosition(
  input: PredictionInput
): PredictionResult {
  // 1 knot = 1.852 km/h
  const speedKmh = input.speedKnots * 1.852;

  // Convert elapsed time from minutes to hours
  const elapsedHours = input.elapsedMinutes / 60;

  // Distance = speed × time
  const distanceKm = speedKmh * elapsedHours;

  // Convert heading from degrees to radians
  const headingRadians =
    (input.headingDegrees * Math.PI) / 180;

  // Split movement into north/south and east/west components
  const northSouthKm =
    distanceKm * Math.cos(headingRadians);

  const eastWestKm =
    distanceKm * Math.sin(headingRadians);

  // Approximate conversion:
  // 1 degree latitude ≈ 111 km
  const latitudeChange =
    northSouthKm / 111;

  // Longitude degree length depends on latitude
  const longitudeChange =
    eastWestKm /
    (111 * Math.cos(
      (input.latitude * Math.PI) / 180
    ));

  return {
    predictedLatitude:
      input.latitude + latitudeChange,

    predictedLongitude:
      input.longitude + longitudeChange,

    distanceTravelledKm: distanceKm
  };
}