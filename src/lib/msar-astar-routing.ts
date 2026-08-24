import { calculateRoutingHazardPenalty } from "./msar-routing";

export interface AStarRouteInput {
  startLat: number;
  startLon: number;
  targetLat: number;
  targetLon: number;
  cycloneLat: number;
  cycloneLon: number;
  cycloneWindSpeed: number;
}

export interface AStarRouteResult {
  /** Ordered list of coordinates [lon, lat] from start to target */
  path: [number, number][];
  totalDistanceKm: number;
  totalPathCost: number;
  hasRoute: boolean;
  disclaimer: string;
}

interface GridNode {
  row: number;
  col: number;
  lat: number;
  lon: number;
  hazardMultiplier: number;
  isPassable: boolean;
}

/**
 * Deterministic A* Risk-Aware Grid Pathfinder.
 * Finds the lowest-cost risk-aware navigational path around simulated environmental hazard zones.
 */
export function findRiskAwareRouteAStar(input: AStarRouteInput): AStarRouteResult {
  const DISCLAIMER = "SIMULATED DECISION-SUPPORT ROUTE — NOT FOR REAL NAVIGATION";

  // Step 1: Define bounding box covering the maritime operating area
  const minLat = Math.min(input.startLat, input.targetLat, input.cycloneLat) - 1.5;
  const maxLat = Math.max(input.startLat, input.targetLat, input.cycloneLat) + 1.5;
  const minLon = Math.min(input.startLon, input.targetLon, input.cycloneLon) - 1.5;
  const maxLon = Math.max(input.startLon, input.targetLon, input.cycloneLon) + 1.5;

  const ROWS = 25;
  const COLS = 25;

  const latStep = (maxLat - minLat) / (ROWS - 1);
  const lonStep = (maxLon - minLon) / (COLS - 1);

  // Step 2: Build 25x25 spatial grid with risk-aware hazard multipliers
  const grid: GridNode[][] = [];
  for (let r = 0; r < ROWS; r++) {
    const rowNodes: GridNode[] = [];
    for (let c = 0; c < COLS; c++) {
      const lat = minLat + r * latStep;
      const lon = minLon + c * lonStep;

      // Calculate hazard multiplier for each grid cell
      const penalty = calculateRoutingHazardPenalty({
        pointLat: lat,
        pointLon: lon,
        cycloneLat: input.cycloneLat,
        cycloneLon: input.cycloneLon,
        cycloneWindSpeed: input.cycloneWindSpeed,
      });

      rowNodes.push({
        row: r,
        col: c,
        lat,
        lon,
        hazardMultiplier: penalty.costMultiplier,
        isPassable: penalty.isNavigable,
      });
    }
    grid.push(rowNodes);
  }

  // Helper: Haversine distance in km
  const haversineKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  // Find nearest grid node to a given coordinate
  const findNearestNode = (lat: number, lon: number): GridNode => {
    let bestNode: GridNode = grid[0]![0]!;
    let minD = Infinity;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const node = grid[r]![c]!;
        const d = haversineKm(lat, lon, node.lat, node.lon);
        if (d < minD) {
          minD = d;
          bestNode = node;
        }
      }
    }
    return bestNode;
  };

  const startNode = findNearestNode(input.startLat, input.startLon);
  const targetNode = findNearestNode(input.targetLat, input.targetLon);

  const nodeKey = (n: GridNode) => `${n.row},${n.col}`;

  // A* Priority Queue data structures
  const openSet: GridNode[] = [startNode];
  const cameFrom = new Map<string, GridNode>();

  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();

  gScore.set(nodeKey(startNode), 0);
  fScore.set(nodeKey(startNode), haversineKm(startNode.lat, startNode.lon, targetNode.lat, targetNode.lon));

  let foundNode: GridNode | null = null;

  while (openSet.length > 0) {
    // Get node with lowest fScore
    openSet.sort((a, b) => (fScore.get(nodeKey(a)) ?? Infinity) - (fScore.get(nodeKey(b)) ?? Infinity));
    const current = openSet.shift()!;

    if (current.row === targetNode.row && current.col === targetNode.col) {
      foundNode = current;
      break;
    }

    // 8-directional neighbor grid movements
    const neighbors: GridNode[] = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = current.row + dr;
        const nc = current.col + dc;
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
          const neighbor = grid[nr]![nc]!;
          if (neighbor.isPassable) {
            neighbors.push(neighbor);
          }
        }
      }
    }

    for (const neighbor of neighbors) {
      const stepDistance = haversineKm(current.lat, current.lon, neighbor.lat, neighbor.lon);
      
      // routeCost = movementDistance × hazardMultiplier
      const edgeCost = stepDistance * neighbor.hazardMultiplier;
      const tentativeG = (gScore.get(nodeKey(current)) ?? Infinity) + edgeCost;

      const neighborKey = nodeKey(neighbor);
      if (tentativeG < (gScore.get(neighborKey) ?? Infinity)) {
        cameFrom.set(neighborKey, current);
        gScore.set(neighborKey, tentativeG);
        const h = haversineKm(neighbor.lat, neighbor.lon, targetNode.lat, targetNode.lon);
        fScore.set(neighborKey, tentativeG + h);

        if (!openSet.some((n) => n.row === neighbor.row && n.col === neighbor.col)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  // Reconstruct path
  const pathCoords: [number, number][] = [];
  pathCoords.push([input.startLon, input.startLat]);

  if (foundNode) {
    const nodePath: GridNode[] = [];
    let curr: GridNode | undefined = foundNode;
    while (curr) {
      nodePath.unshift(curr);
      curr = cameFrom.get(nodeKey(curr));
    }

    for (const node of nodePath) {
      pathCoords.push([node.lon, node.lat]);
    }
  }
  pathCoords.push([input.targetLon, input.targetLat]);

  // Calculate total path distance and cost
  let totalDistanceKm = 0;
  for (let i = 0; i < pathCoords.length - 1; i++) {
    const p1 = pathCoords[i]!;
    const p2 = pathCoords[i + 1]!;
    totalDistanceKm += haversineKm(p1[1], p1[0], p2[1], p2[0]);
  }

  const totalPathCost = Number((gScore.get(nodeKey(targetNode)) ?? totalDistanceKm).toFixed(2));

  return {
    path: pathCoords,
    totalDistanceKm: Number(totalDistanceKm.toFixed(2)),
    totalPathCost,
    hasRoute: foundNode !== null,
    disclaimer: DISCLAIMER,
  };
}
