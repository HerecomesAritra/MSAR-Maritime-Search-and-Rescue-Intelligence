import michaungDataset from "../data/michaung_best_track.json";

export interface CycloneObservation {
  timestamp: string;
  latitude: number;
  longitude: number;
  current_intensity: number | null;
  pressure_hpa: number;
  wind_kt: number;
  pressure_drop_hpa: number;
  category: string;
}

export interface CycloneDataset {
  dataset_name: string;
  event: string;
  period: string;
  source: string;
  source_document: string;
  notes: string[];
  track: CycloneObservation[];
}

export const MICHAUNG_DATASET: CycloneDataset = michaungDataset as CycloneDataset;
export const MICHAUNG_TRACK: CycloneObservation[] = MICHAUNG_DATASET.track;

/**
 * Gets a cyclone observation by track index safely.
 */
export function getObservationByIndex(index: number): CycloneObservation {
  const safeIndex = Math.max(0, Math.min(index, MICHAUNG_TRACK.length - 1));
  return MICHAUNG_TRACK[safeIndex] as CycloneObservation;
}

/**
 * Formats a cyclone intensity category code into human-readable text.
 */
export function formatCycloneCategory(category: string): string {
  switch (category) {
    case "D":
      return "Depression (D)";
    case "DD":
      return "Deep Depression (DD)";
    case "CS":
      return "Cyclonic Storm (CS)";
    case "SCS":
      return "Severe Cyclonic Storm (SCS)";
    case "VSCS":
      return "Very Severe Cyclonic Storm (VSCS)";
    case "ESCS":
      return "Extremely Severe Cyclonic Storm (ESCS)";
    case "SuCS":
      return "Super Cyclonic Storm (SuCS)";
    default:
      return category;
  }
}
