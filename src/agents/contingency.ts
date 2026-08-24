import { generateCandidates, type Candidate, type RescueAsset } from "@/engines/scoring";

export interface ContingencyInput {
  failedAssetId: string;
  assets: RescueAsset[];
  candidates?: Candidate[];
  zones?: { id: string; latitude: number; longitude: number; priority: number }[];
  hazardPenalty?: number;
}

export interface ContingencyResult {
  failedAssetId: string;
  updatedAssets: RescueAsset[];
  remainingCandidates: Candidate[];
  feasibleCandidates: Candidate[];
}

/**
 * MSAR Contingency Module — Deterministic Asset Failure & Tasking Re-evaluation
 *
 * Handles a rescue asset failure during search & rescue operations.
 *
 * Deterministic Steps:
 * 1. Marks the failed asset unavailable (available = false).
 * 2. Removes candidate tasks involving that asset.
 * 3. Returns the remaining feasible candidates.
 * 4. Reuses the existing candidate-generation engine if recalculation parameters (zones, hazardPenalty) are provided.
 *
 * Does NOT use an LLM or introduce new optimization algorithms.
 */
export function handleAssetFailure(input: ContingencyInput): ContingencyResult {
  const { failedAssetId, assets, candidates, zones, hazardPenalty = 0 } = input;

  // Step 1: Mark the failed asset unavailable
  const updatedAssets = assets.map((asset) => {
    if (asset.id === failedAssetId) {
      return { ...asset, available: false };
    }
    return { ...asset };
  });

  // Step 2 & 4: Either recalculate candidates using the existing scoring engine or filter current candidates
  let remainingCandidates: Candidate[] = [];

  if (zones && zones.length > 0) {
    // Reuse existing candidate-generation engine with updated asset availability
    remainingCandidates = generateCandidates(updatedAssets, zones, hazardPenalty);
  } else if (candidates && candidates.length > 0) {
    // Filter out candidates associated with the failed asset
    remainingCandidates = candidates.filter((c) => c.assetId !== failedAssetId);
  }

  // Step 3: Filter for endurance-feasible candidates
  const feasibleCandidates = remainingCandidates.filter((c) => c.enduranceFeasible);

  return {
    failedAssetId,
    updatedAssets,
    remainingCandidates,
    feasibleCandidates,
  };
}
