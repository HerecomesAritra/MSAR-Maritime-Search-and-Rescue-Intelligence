import { AlertTriangle, Compass, Gauge, Users } from "lucide-react";
import type { Incident } from "@/lib/msar-data";

function headingLabel(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8] ?? "N";
}

function Row({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "emergency" | "warning" | "cyan";
}) {
  const toneClass =
    tone === "emergency"
      ? "text-emergency"
      : tone === "warning"
        ? "text-warning"
        : tone === "cyan"
          ? "text-cyan"
          : "text-foreground";
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-border/60 py-2 last:border-0">
      <span className="data-key">{label}</span>
      <span className={`data-value text-right ${toneClass}`}>{value}</span>
    </div>
  );
}

export function IncidentPanel({
  incident,
  elapsedExtra,
  liveSpeedKts,
  liveHeadingDeg,
  liveMinutesSinceContact,
  liveWindKts,
  liveCurrentKts,
  liveSeaState,
}: {
  incident: Incident;
  elapsedExtra: number;
  liveSpeedKts?: number;
  liveHeadingDeg?: number;
  liveMinutesSinceContact?: number;
  liveWindKts?: number;
  liveCurrentKts?: number;
  liveSeaState?: number;
}) {
  const speedKts = liveSpeedKts ?? incident.speedKts;
  const headingDeg = liveHeadingDeg ?? incident.headingDeg;
  const baseMins = liveMinutesSinceContact ?? incident.minutesSinceContact;
  const mins = baseMins + elapsedExtra;
  const windKts = liveWindKts ?? incident.windKts;
  const currentKts = liveCurrentKts ?? incident.currentKts;
  const seaState = liveSeaState != null ? `${liveSeaState}` : incident.seaState;

  return (
    <section className="glass scan-sheen flex shrink-0 flex-col rounded-lg">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <AlertTriangle className="size-4 text-emergency blink" />
        <h2 className="panel-label text-emergency">Distress Incident</h2>
      </div>

      <div className="border-b border-border bg-emergency/8 px-4 py-3">
        <div className="font-display text-xl font-bold tracking-wide text-foreground">
          {incident.vesselName}
        </div>
        <div className="data-key mt-1">{incident.status}</div>
      </div>

      {incident.summary && (
        <div className="mx-4 mt-3 rounded-md border border-cyan/40 bg-cyan/10 p-3 shrink-0">
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-cyan">
            <span className="flex items-center gap-1">🤖 AI TRIAGE AGENT CLASSIFICATION</span>
            <span className="rounded bg-cyan/20 px-1 py-0.5 text-[9px]">LIVE</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-xs font-semibold text-foreground">
            <span>TYPE: <strong className="text-emergency">{incident.status}</strong></span>
            <span>URGENCY: <strong className="text-warning">{incident.urgency}/5</strong></span>
            <span>CREW: <strong className="text-cyan">{incident.crewAtRisk} POB</strong></span>
          </div>
          <p className="mt-2 text-[11px] leading-snug text-muted-foreground italic border-t border-cyan/20 pt-1.5">
            "{incident.summary}"
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-2">
        <Row label="Vessel ID" value={incident.vesselId} />
        <Row label="Vessel Type" value={incident.vesselType} />
        <Row
          label="Last Known Position"
          value={`${incident.position.lat.toFixed(4)}°N ${incident.position.lon.toFixed(4)}°E`}
          tone="cyan"
        />
        <Row label="Speed" value={`${speedKts.toFixed(1)} kts`} />
        <Row
          label="Heading"
          value={`${Math.round(headingDeg)}° (${headingLabel(headingDeg)})`}
        />
        <Row
          label="Crew at Risk"
          value={`${incident.crewAtRisk} persons`}
          tone="emergency"
        />
        <Row
          label="Time Since Contact"
          value={`${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, "0")}m`}
          tone="warning"
        />
        <Row label="Urgency" value={`Level ${incident.urgency} / 5`} tone="emergency" />
        <Row label="Incident Status" value="ACTIVE — SAR LAUNCHED" tone="warning" />

        <div className="mt-4">
          <div className="panel-label mb-2">Environment</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Gauge, k: "Sea State", v: seaState },
              { icon: Compass, k: "Wind", v: `${windKts} kts` },
              { icon: Compass, k: "Current", v: `${currentKts} kts` },
              { icon: Users, k: "Water Temp", v: `${incident.waterTempC} °C` },
            ].map((item) => (
              <div
                key={item.k}
                className="rounded-md border border-border bg-accent/30 p-2"
              >
                <div className="flex items-center gap-1.5">
                  <item.icon className="size-3 text-cyan-dim" />
                  <span className="data-key">{item.k}</span>
                </div>
                <div className="data-value mt-1">{item.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


