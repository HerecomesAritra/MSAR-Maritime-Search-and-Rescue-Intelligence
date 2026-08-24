export interface SearchZone {
  id: string;
  latitude: number;
  longitude: number;
  probability: number;
  priority: number;
}

export interface ProbabilityInput {
  centerLatitude: number;
  centerLongitude: number;
  uncertaintyKm: number;
}

export function generateSearchZones(
  input: ProbabilityInput
): SearchZone[] {
  const zones: SearchZone[] = [];

  const spacing =
    Math.max(0.01, input.uncertaintyKm / 111);

  let totalWeight = 0;

  // Create a 5 × 5 grid
  for (let row = -2; row <= 2; row++) {
    for (let col = -2; col <= 2; col++) {
      const latitude =
        input.centerLatitude +
        row * spacing;

      const longitude =
        input.centerLongitude +
        col * spacing;

      const distanceSquared =
        row * row + col * col;

      // Closer cells receive greater weight
      const weight =
        Math.exp(
          -distanceSquared / 2
        );

      zones.push({
        id: `ZONE-${zones.length + 1}`,
        latitude,
        longitude,
        probability: weight,
        priority: 0
      });

      totalWeight += weight;
    }
  }

  // Normalize probabilities
  for (const zone of zones) {
    zone.probability /=
      totalWeight;
  }

  // Highest probability = highest priority
  zones.sort(
    (a, b) =>
      b.probability -
      a.probability
  );

  zones.forEach(
    (zone, index) => {
      zone.priority = index + 1;
    }
  );

  return zones;
}