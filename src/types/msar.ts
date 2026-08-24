export interface Vessel {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  speedKnots: number;
  headingDegrees: number;
  crewAtRisk: number;
  minutesSinceContact: number;
  urgency: number;
  status: string;
  dataType: string;
}