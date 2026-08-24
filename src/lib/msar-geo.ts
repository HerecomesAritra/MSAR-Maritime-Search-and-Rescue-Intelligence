// ============================================================================
// SIMULATED DEMO DATA
// All coordinates and unit details below are synthetic and for demonstration
// purposes only. They do not represent actual historical rescue assets.
// ============================================================================

export type MapAssetKind = "VESSEL" | "BOAT" | "HELI";

export interface MapUnit {
  id: string;
  label: string;
  kind: MapAssetKind;
  /** [lon, lat] */
  coords: [number, number];
  detail: string;
}

/** Chennai / Bay of Bengal maritime operating area. */
export const MAP_CONFIG = {
  /** [lon, lat] */
  center: [80.50, 13.05] as [number, number],
  zoom: 10.5,
  minZoom: 4,
  maxZoom: 15,
  bearing: 0,
  pitch: 0,
  /** CARTO dark raster basemap — no API key required. */
  rasterTiles: [
    "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
    "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
    "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
  ],
  attribution: "© OpenStreetMap contributors © CARTO",
} as const;

export const DISTRESS_UNIT: MapUnit = {
  id: "MV-204",
  label: "MV-204",
  kind: "VESSEL",
  coords: [80.52, 13.04],
  detail: "LOSS OF CONTACT · Fishing Vessel · 3 POB",
};

export const RESPONSE_UNITS: MapUnit[] = [
  {
    id: "BOAT-01",
    label: "BOAT-01",
    kind: "BOAT",
    coords: [80.42, 12.96],
    detail: "Fast rescue boat · READY · 25 kts · 5 h endurance · No medical capability",
  },
  {
    id: "BOAT-02",
    label: "BOAT-02",
    kind: "BOAT",
    coords: [80.60, 13.12],
    detail: "Fast rescue boat · ENROUTE · 22 kts · 8 h endurance · Medical capability",
  },
  {
    id: "HELI-01",
    label: "HELI-01",
    kind: "HELI",
    coords: [80.48, 13.10],
    detail: "Rotary SAR · READY · 120 kts · 2 h endurance · Medical capability",
  },
];

export const MAP_UNITS: MapUnit[] = [DISTRESS_UNIT, ...RESPONSE_UNITS];

export interface PositionPredictionResult {
  predictedLatitude: number;
  predictedLongitude: number;
  distanceTravelledKm: number;
}

/**
 * Deterministic vessel position prediction engine.
 * Calculates predicted latitude and longitude based on dead reckoning.
 *
 * @param latitude - Starting latitude in decimal degrees
 * @param longitude - Starting longitude in decimal degrees
 * @param speedKnots - Vessel speed in knots (nautical miles per hour)
 * @param headingDegrees - Vessel true heading in degrees (0° = North, 90° = East, 180° = South, 270° = West)
 * @param minutes - Duration of travel in minutes
 * @returns Object containing predicted latitude, predicted longitude, and distance travelled in kilometers
 */
export function predictPosition(
  latitude: number,
  longitude: number,
  speedKnots: number,
  headingDegrees: number,
  minutes: number
): PositionPredictionResult {
  // Step 1: Convert speed from knots (nautical miles per hour) to km/h.
  // 1 knot is defined as exactly 1.852 kilometers per hour.
  const speedKmH = speedKnots * 1.852;

  // Step 2: Convert duration from minutes to hours, then calculate distance using: distance = speed × time.
  const timeHours = minutes / 60;
  const distanceTravelledKm = speedKmH * timeHours;

  // Step 3: Calculate North/South and East/West distance components using vessel heading.
  // Maritime heading is measured in degrees clockwise from True North (0° = North, 90° = East).
  // Convert heading from degrees to radians: radians = degrees × (π / 180).
  const headingRad = (headingDegrees * Math.PI) / 180;

  // North/South movement (latitude axis): d_North = distance × cos(heading)
  const distanceNorthKm = distanceTravelledKm * Math.cos(headingRad);

  // East/West movement (longitude axis): d_East = distance × sin(heading)
  const distanceEastKm = distanceTravelledKm * Math.sin(headingRad);

  // Step 4: Convert linear movements in kilometers into angular changes in latitude and longitude degrees.
  // Mean Earth radius in kilometers (WGS-84 spherical approximation).
  const EARTH_RADIUS_KM = 6371;

  // Change in latitude (Δlat in degrees):
  // Δlat_rad = d_North / EARTH_RADIUS_KM
  // Convert Δlat to degrees: Δlat_deg = Δlat_rad × (180 / π)
  const deltaLat = (distanceNorthKm / EARTH_RADIUS_KM) * (180 / Math.PI);

  // Change in longitude (Δlon in degrees):
  // Longitude lines converge toward the poles, scaled by cos(latitude).
  // Convert starting latitude to radians for scaling.
  const latRad = (latitude * Math.PI) / 180;
  // Δlon_rad = d_East / (EARTH_RADIUS_KM × cos(latitude_rad))
  // Convert Δlon to degrees: Δlon_deg = Δlon_rad × (180 / π)
  const deltaLon = (distanceEastKm / (EARTH_RADIUS_KM * Math.cos(latRad))) * (180 / Math.PI);

  // Compute final predicted coordinates
  const predictedLatitude = latitude + deltaLat;
  const predictedLongitude = longitude + deltaLon;

  return {
    predictedLatitude,
    predictedLongitude,
    distanceTravelledKm,
  };
}

export type HazardLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export interface EnvironmentalRiskResult {
  distanceToCycloneKm: number;
  environmentalRisk: number;
  uncertaintyMultiplier: number;
  hazardLevel: HazardLevel;
}

/**
 * Environmental risk engine for maritime search and rescue decision support.
 * Calculates environmental risk based on vessel proximity to a cyclone center and cyclone wind speed.
 *
 * @param vesselLat - Latitude of the vessel in decimal degrees
 * @param vesselLon - Longitude of the vessel in decimal degrees
 * @param cycloneLat - Latitude of the cyclone eye/center in decimal degrees
 * @param cycloneLon - Longitude of the cyclone eye/center in decimal degrees
 * @param cycloneWindSpeed - Cyclone maximum sustained wind speed in knots
 * @returns Object containing distanceToCycloneKm, environmentalRisk (0-1), uncertaintyMultiplier, and hazardLevel
 */
export function calculateEnvironmentalRisk(
  vesselLat: number,
  vesselLon: number,
  cycloneLat: number,
  cycloneLon: number,
  cycloneWindSpeed: number
): EnvironmentalRiskResult {
  // Step 1: Calculate the great-circle distance between vessel and cyclone center using the Haversine formula.
  const EARTH_RADIUS_KM = 6371;

  // Convert coordinate differences from degrees to radians
  const dLatRad = ((cycloneLat - vesselLat) * Math.PI) / 180;
  const dLonRad = ((cycloneLon - vesselLon) * Math.PI) / 180;

  // Convert latitudes to radians
  const lat1Rad = (vesselLat * Math.PI) / 180;
  const lat2Rad = (cycloneLat * Math.PI) / 180;

  // Haversine intermediate calculation
  const a =
    Math.sin(dLatRad / 2) * Math.sin(dLatRad / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLonRad / 2) * Math.sin(dLonRad / 2);

  // Angular distance in radians
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in kilometers
  const distanceToCycloneKm = EARTH_RADIUS_KM * c;

  // Step 2: Calculate proximity factor (0 to 1).
  // Assume a maximum cyclone storm influence zone of 500 km.
  // Proximity factor is 1 at the cyclone center (0 km) and scales down linearly to 0 at 500 km or beyond.
  const MAX_INFLUENCE_RADIUS_KM = 500;
  const proximityFactor = Math.max(0, 1 - distanceToCycloneKm / MAX_INFLUENCE_RADIUS_KM);

  // Step 3: Calculate wind intensity factor (0 to 1).
  // Standard scale: 34 kts (tropical depression threshold) up to 150 kts (Category 5 super cyclone max baseline).
  // Normalized wind factor = windSpeed / 150 (clamped between 0 and 1).
  const MAX_WIND_BASELINE_KTS = 150;
  const windFactor = Math.min(1, Math.max(0, cycloneWindSpeed / MAX_WIND_BASELINE_KTS));

  // Step 4: Calculate environmental risk score (0 to 1).
  // Risk score combines proximity factor and wind intensity factor.
  // Higher wind speed and closer distance yield higher risk.
  // Formula: risk = proximityFactor × (0.4 + 0.6 × windFactor)
  // This ensures high proximity generates baseline risk, amplified by severe wind speed.
  const rawRisk = proximityFactor * (0.4 + 0.6 * windFactor);
  const environmentalRisk = Math.min(1, Math.max(0, Number(rawRisk.toFixed(4))));

  // Step 5: Calculate uncertainty multiplier.
  // Meteorological uncertainty increases with distance from the tracked cyclone eye.
  // Multiplier ranges deterministically from 1.0 (at eye) up to 1.5 (at perimeter).
  const uncertaintyMultiplier = Number(
    (1 + 0.5 * (Math.min(distanceToCycloneKm, MAX_INFLUENCE_RADIUS_KM) / MAX_INFLUENCE_RADIUS_KM)).toFixed(2)
  );

  // Step 6: Determine categorical hazard level based on environmental risk score.
  let hazardLevel: HazardLevel = "LOW";
  if (environmentalRisk >= 0.75) {
    hazardLevel = "CRITICAL";
  } else if (environmentalRisk >= 0.5) {
    hazardLevel = "HIGH";
  } else if (environmentalRisk >= 0.25) {
    hazardLevel = "MODERATE";
  }

  return {
    distanceToCycloneKm: Number(distanceToCycloneKm.toFixed(2)),
    environmentalRisk,
    uncertaintyMultiplier,
    hazardLevel,
  };
}

import type { Zone } from "./msar-data";

/**
 * Creates a GeoJSON Polygon feature representing a circle around a center coordinate.
 * Used to render the Simulated Environmental Risk Zone on MapLibre.
 */
export function createGeoJSONCircle(center: [number, number], radiusKm: number, points = 64) {
  const [lon, lat] = center;
  const coordinates: [number, number][] = [];

  for (let i = 0; i < points; i++) {
    const angle = (i * 360) / points;
    const rad = (angle * Math.PI) / 180;
    // 1 degree latitude ~ 111.32 km
    const dLat = (radiusKm * Math.cos(rad)) / 111.32;
    // 1 degree longitude ~ 111.32 * cos(lat) km
    const dLon = (radiusKm * Math.sin(rad)) / (111.32 * Math.cos((lat * Math.PI) / 180));
    coordinates.push([lon + dLon, lat + dLat]);
  }
  if (coordinates.length > 0 && coordinates[0]) {
    coordinates.push(coordinates[0]); // close polygon loop
  }

  return {
    type: "Feature" as const,
    geometry: {
      type: "Polygon" as const,
      coordinates: [coordinates],
    },
    properties: {
      label: "Simulated Environmental Risk Zone",
      radiusKm,
    },
  };
}

/**
 * Scales probability search zones dynamic radii and probability distribution
 * based on environmental uncertainty multiplier.
 *
 * When uncertainty increases:
 * - Search zone radii expand proportional to uncertainty multiplier.
 * - Probability mass disperses slightly outward to lower priority zones.
 * - Probabilities are strictly re-normalized so their total sum equals 1.0 (100%).
 */
export function scaleZonesWithUncertainty(baseZones: Zone[], uncertaintyMultiplier: number): Zone[] {
  // Scale factor relative to baseline (1.0)
  const scaleFactor = Math.max(1, uncertaintyMultiplier);

  // Calculate shift of probability from primary Zone A to outer zones based on uncertainty scale
  const dispersionShift = (scaleFactor - 1) * 0.15;

  const rawZones = baseZones.map((z) => {
    // Scale spatial extent
    const rx = Math.round(z.rx * scaleFactor);
    const ry = Math.round(z.ry * scaleFactor);

    // Adjust probability mass based on zone priority
    let prob = z.probability;
    if (z.id === "A") {
      prob = Math.max(0.3, z.probability - dispersionShift);
    } else {
      prob = z.probability + dispersionShift / (baseZones.length - 1);
    }

    return {
      ...z,
      rx,
      ry,
      probability: prob,
    };
  });

  // Calculate sum for strict normalization
  const totalProb = rawZones.reduce((sum, z) => sum + z.probability, 0);

  // Normalize so total probability equals exactly 1.0 (100%)
  return rawZones.map((z) => ({
    ...z,
    probability: Number((z.probability / totalProb).toFixed(4)),
  }));
}

export interface SearchGridZone {
  id: string;
  latitude: number;
  longitude: number;
  probability: number;
  priority: number;
}

/**
 * Deterministic search probability engine.
 * Generates a 5x5 grid (25 cells) centered around the predicted position,
 * weighting cell probability based on distance and environmental uncertainty spread.
 *
 * @param predictedLatitude - Predicted center latitude in decimal degrees
 * @param predictedLongitude - Predicted center longitude in decimal degrees
 * @param uncertaintyRadius - Spatial uncertainty spread radius in kilometers
 * @returns Array of 2 SearchGridZone objects with id, latitude, longitude, probability (sums to 1), and priority
 */
export function generateSearchProbabilityEngine(
  predictedLatitude: number,
  predictedLongitude: number,
  uncertaintyRadius: number
): SearchGridZone[] {
  const GRID_SIZE = 5; // 5x5 grid
  const halfSize = Math.floor(GRID_SIZE / 2); // 2 (offsets: -2, -1, 0, 1, 2)

  // Step 1: Determine grid cell spacing in kilometers.
  // Cell spacing scales proportional to uncertaintyRadius so the grid covers the uncertainty spread.
  const safeUncertainty = Math.max(1, uncertaintyRadius);
  const cellSpacingKm = Math.max(2, safeUncertainty / 2);

  // Convert km spacing to latitude and longitude degree offsets
  // 1 degree latitude is approx 111.32 km
  const latStepDeg = cellSpacingKm / 111.32;
  // 1 degree longitude is scaled by cos(latitude)
  const lonStepDeg = cellSpacingKm / (111.32 * Math.cos((predictedLatitude * Math.PI) / 180));

  // Step 2: Generate 5x5 grid cells and calculate raw distance-based probability weights.
  // We use a 2D Gaussian distribution model: weight = exp(-distance^2 / (2 * sigma^2))
  // Variance (sigma^2) expands with uncertaintyRadius:
  // - Higher uncertainty -> larger sigma -> flatter probability distribution (more spread across outer cells).
  // - Lower uncertainty -> smaller sigma -> sharper probability peak at center.
  const sigma = safeUncertainty;
  const twoSigmaSq = 2 * sigma * sigma;

  interface RawCell {
    id: string;
    latitude: number;
    longitude: number;
    distanceKm: number;
    rawWeight: number;
  }

  const rawCells: RawCell[] = [];
  let totalWeight = 0;

  for (let row = -halfSize; row <= halfSize; row++) {
    for (let col = -halfSize; col <= halfSize; col++) {
      // Calculate cell latitude and longitude
      const cellLat = Number((predictedLatitude + row * latStepDeg).toFixed(6));
      const cellLon = Number((predictedLongitude + col * lonStepDeg).toFixed(6));

      // Calculate distance from center in kilometers
      const dNorthKm = row * cellSpacingKm;
      const dEastKm = col * cellSpacingKm;
      const distanceKm = Math.sqrt(dNorthKm * dNorthKm + dEastKm * dEastKm);

      // Gaussian probability decay weight
      const rawWeight = Math.exp(-(distanceKm * distanceKm) / twoSigmaSq);
      totalWeight += rawWeight;

      // Label ID: row letter A-E, col number 1-5
      const rowLabel = String.fromCharCode(65 + (row + halfSize)); // 'A'..'E'
      const colLabel = (col + halfSize + 1).toString(); // '1'..'5'
      const id = `GRID-${rowLabel}${colLabel}`;

      rawCells.push({
        id,
        latitude: cellLat,
        longitude: cellLon,
        distanceKm,
        rawWeight,
      });
    }
  }

  // Step 3: Normalize probabilities so that the sum across all 25 cells equals 1.0 (100%).
  // Assign priorities (1 = highest probability cell, scaling down to 5 = lowest probability tier).
  const sortedByWeight = [...rawCells].sort((a, b) => b.rawWeight - a.rawWeight);

  const zones: SearchGridZone[] = rawCells.map((cell) => {
    // Normalized probability
    const probability = Number((cell.rawWeight / totalWeight).toFixed(6));

    // Priority rank: 1 for top 1 cell (center), 2 for next 4 cells, 3 for next 8 cells, etc.
    const rank = sortedByWeight.findIndex((sc) => sc.id === cell.id);
    let priority = 5;
    if (rank === 0) priority = 1;
    else if (rank <= 4) priority = 2;
    else if (rank <= 12) priority = 3;
    else if (rank <= 20) priority = 4;

    return {
      id: cell.id,
      latitude: cell.latitude,
      longitude: cell.longitude,
      probability,
      priority,
    };
  });

  // Verify exact sum normalization (adjust last cell residual if needed so total sum === 1.0)
  const currentSum = zones.reduce((sum, z) => sum + z.probability, 0);
  const diff = 1.0 - currentSum;
  if (Math.abs(diff) > 0 && zones.length > 0 && zones[0]) {
    zones[0].probability = Number((zones[0].probability + diff).toFixed(6));
  }

  return zones;
}




