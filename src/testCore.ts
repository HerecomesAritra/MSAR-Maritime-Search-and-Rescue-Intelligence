import vessels from "./data/vessels.json";
import assets from "./data/assets.json";

import {
  predictPosition
} from "./engines/prediction";

import {
  calculateEnvironmentalRisk
} from "./engines/risk";

import {
  generateSearchZones
} from "./engines/probability";

import {
  generateCandidates
} from "./engines/scoring";

const vessel = vessels[0] ?? {
  latitude: 13.05,
  longitude: 80.32,
  speedKnots: 7,
  headingDegrees: 140,
  minutesSinceContact: 20,
};

const prediction =
  predictPosition({
    latitude: vessel.latitude,
    longitude: vessel.longitude,
    speedKnots: vessel.speedKnots,
    headingDegrees: vessel.headingDegrees,
    elapsedMinutes: vessel.minutesSinceContact
  });

console.log("PREDICTION:");
console.log(prediction);

const risk =
  calculateEnvironmentalRisk({
    vesselLatitude:
      vessel.latitude,

    vesselLongitude:
      vessel.longitude,

    cycloneLatitude:
      13.5,

    cycloneLongitude:
      80.8,

    cycloneWindKnots:
      50
  });

console.log("RISK:");
console.log(risk);

const zones =
  generateSearchZones({
    centerLatitude:
      prediction.predictedLatitude,

    centerLongitude:
      prediction.predictedLongitude,

    uncertaintyKm:
      5 * risk.uncertaintyMultiplier
  });

console.log("SEARCH ZONES:");
console.log(zones);

const candidates =
  generateCandidates(
    assets,
    zones,
    risk.environmentalRisk * 10
  );

console.log("CANDIDATES:");
console.table(candidates);