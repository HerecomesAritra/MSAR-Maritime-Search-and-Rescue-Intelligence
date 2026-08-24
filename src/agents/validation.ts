import type { Candidate, RescueAsset } from "@/engines/scoring";
import type { SearchZone } from "@/engines/probability";
import type { RouteResult } from "@/engines/routing";
import type { DecisionOutput } from "@/agents/decision";

export type ValidationConstraint =
  | "ASSET_UNAVAILABLE"
  | "INSUFFICIENT_ENDURANCE"
  | "MISSING_CAPABILITY"
  | "INVALID_ZONE"
  | "NO_ROUTE"
  | "EXCEEDED_RESPONSE_TIME";

export interface DecisionValidationInput {
  decision: DecisionOutput;
  assets: RescueAsset[];
  searchZones: SearchZone[];
  candidates: Candidate[];
  route?: RouteResult;
  maxResponseTimeMinutes?: number;
  requiresMedical?: boolean;
}

export interface DecisionValidationResult {
  valid: boolean;
  selectedAsset: string;
  selectedZone: string;
  failedConstraint?: ValidationConstraint;
  failureReason?: string;
  wasOverridden: boolean;
  originalDecision: DecisionOutput;
  validatedCandidate?: Candidate;
}

/**
 * MSAR Deterministic Decision Validation Layer
 *
 * Verifies AI-recommended asset tasking against strict operational constraints:
 * 1. Asset is actually available (available === true).
 * 2. Asset has enough endurance (enduranceFeasible === true).
 * 3. Asset has required capabilities (medicalCapability if required).
 * 4. Selected search zone exists in probability zones.
 * 5. Route exists (hasRoute === true).
 * 6. Response time is within scenario limits.
 *
 * If validation fails:
 * - Rejects recommendation.
 * - Identifies specific failed constraint.
 * - Deterministically selects next valid alternative candidate.
 *
 * This layer is strictly deterministic and NOT controlled by the LLM.
 */
export function validateDecision(input: DecisionValidationInput): DecisionValidationResult {
  const {
    decision,
    assets,
    searchZones,
    candidates,
    route,
    maxResponseTimeMinutes = 180,
    requiresMedical = false,
  } = input;

  const originalAssetId = decision.selectedAsset;
  const originalZoneId = decision.selectedZone;

  // 1. Verify Asset Availability
  const asset = assets.find((a) => a.id === originalAssetId);
  if (!asset || !asset.available) {
    return handleValidationFailure(
      "ASSET_UNAVAILABLE",
      `Recommended asset ${originalAssetId} is currently unavailable or offline.`,
      input,
    );
  }

  // 2. Verify Zone Existence
  const zone = searchZones.find((z) => z.id === originalZoneId);
  if (!zone) {
    return handleValidationFailure(
      "INVALID_ZONE",
      `Recommended search zone ${originalZoneId} does not exist in active grid.`,
      input,
    );
  }

  // 3. Verify Endurance Feasibility
  const candidate = candidates.find(
    (c) => c.assetId === originalAssetId && c.zoneId === originalZoneId,
  );

  if (!candidate || !candidate.enduranceFeasible) {
    return handleValidationFailure(
      "INSUFFICIENT_ENDURANCE",
      `Asset ${originalAssetId} lacks sufficient fuel/endurance for mission to zone ${originalZoneId}.`,
      input,
    );
  }

  // 4. Verify Required Capabilities
  if (requiresMedical && !asset.medicalCapability) {
    return handleValidationFailure(
      "MISSING_CAPABILITY",
      `Asset ${originalAssetId} lacks required medical extraction capability for this incident.`,
      input,
    );
  }

  // 5. Verify Route Existence
  if (route && (!route.hasRoute || !route.path || route.path.length <= 1)) {
    return handleValidationFailure(
      "NO_ROUTE",
      `No navigable transit route found connecting asset ${originalAssetId} to zone ${originalZoneId}.`,
      input,
    );
  }

  // 6. Verify Response Time Limit
  if (candidate.responseTimeMinutes > maxResponseTimeMinutes) {
    return handleValidationFailure(
      "EXCEEDED_RESPONSE_TIME",
      `Response time of ${candidate.responseTimeMinutes.toFixed(0)} min exceeds scenario limit of ${maxResponseTimeMinutes} min.`,
      input,
    );
  }

  // All 6 constraints validated successfully
  return {
    valid: true,
    selectedAsset: originalAssetId,
    selectedZone: originalZoneId,
    wasOverridden: false,
    originalDecision: decision,
    validatedCandidate: candidate,
  };
}

/**
 * Rejects invalid recommendation and deterministically selects the next best valid candidate.
 */
function handleValidationFailure(
  failedConstraint: ValidationConstraint,
  failureReason: string,
  input: DecisionValidationInput,
): DecisionValidationResult {
  const { decision, assets, searchZones, candidates, maxResponseTimeMinutes = 180, requiresMedical = false } = input;

  // Sort candidates by total cost ascending to pick next best feasible candidate
  const sortedCandidates = [...candidates].sort((a, b) => a.totalCost - b.totalCost);

  const fallbackCandidate = sortedCandidates.find((c) => {
    const assetObj = assets.find((a) => a.id === c.assetId);
    const zoneObj = searchZones.find((z) => z.id === c.zoneId);

    if (!assetObj || !assetObj.available) return false;
    if (!zoneObj) return false;
    if (!c.enduranceFeasible) return false;
    if (requiresMedical && !assetObj.medicalCapability) return false;
    if (c.responseTimeMinutes > maxResponseTimeMinutes) return false;

    return true;
  });

  const chosenCandidate = fallbackCandidate || candidates[0];

  return {
    valid: false,
    selectedAsset: chosenCandidate?.assetId ?? decision.selectedAsset,
    selectedZone: chosenCandidate?.zoneId ?? decision.selectedZone,
    failedConstraint,
    failureReason,
    wasOverridden: true,
    originalDecision: decision,
    ...(chosenCandidate ? { validatedCandidate: chosenCandidate } : {}),
  };
}
