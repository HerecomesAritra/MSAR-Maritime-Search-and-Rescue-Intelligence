import {
  findRiskAwareRouteAStar,
  type AStarRouteInput,
  type AStarRouteResult,
} from "@/lib/msar-astar-routing";

export interface RouteInput {
  startLat: number;
  startLon: number;
  targetLat: number;
  targetLon: number;
  cycloneLat: number;
  cycloneLon: number;
  cycloneWindSpeed: number;
}

export type RouteResult = AStarRouteResult;

/**
 * Deterministic Routing Engine Wrapper
 * Calls A* risk-aware pathfinding algorithm around hazard zones.
 */
export function calculateRoute(input: RouteInput): RouteResult {
  return findRiskAwareRouteAStar({
    startLat: input.startLat,
    startLon: input.startLon,
    targetLat: input.targetLat,
    targetLon: input.targetLon,
    cycloneLat: input.cycloneLat,
    cycloneLon: input.cycloneLon,
    cycloneWindSpeed: input.cycloneWindSpeed,
  });
}
