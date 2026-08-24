import { useEffect, useRef, useCallback } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { createGeoJSONCircle } from "@/lib/msar-geo";
import type { CycloneObservation } from "@/lib/michaung-data";
import { formatCycloneCategory } from "@/lib/michaung-data";
import type { SearchZone } from "@/engines/probability";
import type { RiskResult } from "@/engines/risk";
import type { VesselSimulationResult } from "@/lib/msar-multi-vessel";

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

export interface MapAsset {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  speedKnots: number;
  enduranceHours: number;
  medicalCapability: boolean;
  available: boolean;
}

export interface LastKnownPosition {
  latitude: number;
  longitude: number;
  name?: string;
}

interface LiveMapProps {
  lastKnownPosition?: LastKnownPosition;
  predictedLatitude: number;
  predictedLongitude: number;
  currentObservation: CycloneObservation;
  track: CycloneObservation[];
  riskResult: RiskResult;
  searchZones: SearchZone[];
  vesselResults?: VesselSimulationResult[];
  rescueAssets: MapAsset[];
  candidates?: any[];
  selectedAssetId?: string | null;
  failedAssetId?: string | null;
  routePath?: [number, number][];
  onSelectAsset?: (assetId: string) => void;
  onAssetMove?: (assetId: string, latitude: number, longitude: number) => void;
  runTrigger?: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Warm probability color scale: dark blue → amber → red */
function probabilityColor(p: number, maxP: number): string {
  const t = maxP > 0 ? p / maxP : 0;
  if (t < 0.35) return "#1a3a5c";
  if (t < 0.55) return "#b45309";
  if (t < 0.75) return "#d97706";
  if (t < 0.9) return "#ea580c";
  return "#dc2626";
}

function probabilityOpacity(p: number, maxP: number): number {
  const t = maxP > 0 ? p / maxP : 0;
  return 0.12 + t * 0.55;
}

const SECONDARY_VESSEL_OUTLINES = ["#67e8f9", "#a78bfa", "#34d399"];

function isValidCoordinate(latitude: number, longitude: number): boolean {
  return Number.isFinite(latitude) && Number.isFinite(longitude) && Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180;
}

function buildGridFeatures(vesselResults: VesselSimulationResult[] = []): any[] {
  return vesselResults.flatMap((result, vesselIndex) => {
    const zones = result.searchZones.filter((zone) => isValidCoordinate(zone.latitude, zone.longitude));
    if (zones.length === 0) return [];

    const maxProb = Math.max(...zones.map((zone) => zone.probability), 0.001);
    const allLats = [...new Set(zones.map((zone) => zone.latitude))].sort((a, b) => a - b);
    const allLons = [...new Set(zones.map((zone) => zone.longitude))].sort((a, b) => a - b);
    const halfLat = (allLats.length >= 2 ? allLats[1]! - allLats[0]! : 0.02) / 2;
    const halfLon = (allLons.length >= 2 ? allLons[1]! - allLons[0]! : 0.02) / 2;
    const isPrimary = vesselIndex === 0;
    const vesselOutline = isPrimary ? "#94a3b8" : SECONDARY_VESSEL_OUTLINES[(vesselIndex - 1) % SECONDARY_VESSEL_OUTLINES.length]!;

    return zones.map((zone) => {
      const feature = cellPolygon(zone.longitude, zone.latitude, halfLon, halfLat);
      const isPeak = zone.priority === 1;
      feature.properties = {
        id: zone.id,
        vesselId: result.vessel.id,
        vesselName: result.vessel.name,
        probability: zone.probability,
        priority: zone.priority,
        color: probabilityColor(zone.probability, maxProb),
        opacity: probabilityOpacity(zone.probability, maxProb) * (isPrimary ? 1 : 0.42),
        outlineColor: isPeak ? (isPrimary ? "#fbbf24" : vesselOutline) : vesselOutline,
        lineWidth: isPeak ? (isPrimary ? 2.5 : 1.8) : 0.65,
      };
      return feature;
    });
  });
}

/** Build a GeoJSON square cell polygon centered on (lon, lat) with given half-size in degrees. */
function cellPolygon(
  lon: number,
  lat: number,
  halfLon: number,
  halfLat: number
): any {
  return {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [lon - halfLon, lat - halfLat],
          [lon + halfLon, lat - halfLat],
          [lon + halfLon, lat + halfLat],
          [lon - halfLon, lat + halfLat],
          [lon - halfLon, lat - halfLat],
        ],
      ],
    },
    properties: {},
  };
}

/** Build popup HTML in the dark MSAR style */
function popupHTML(title: string, rows: string[]): string {
  return `<div class="msar-popup"><strong style="color:var(--color-cyan);font-size:0.7rem;">${title}</strong>${rows.map((r) => `<span>${r}</span>`).join("")}</div>`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LiveMap({
  lastKnownPosition,
  predictedLatitude,
  predictedLongitude,
  currentObservation,
  track,
  riskResult,
  searchZones,
  vesselResults,
  rescueAssets,
  selectedAssetId,
  failedAssetId,
  routePath,
  onSelectAsset,
  onAssetMove,
}: LiveMapProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const routeDotRef = useRef<maplibregl.Marker | null>(null);
  const animFrameRef = useRef<number>(0);

  // -----------------------------------------------------------------------
  // Fit bounds: include ALL scenario elements
  // -----------------------------------------------------------------------
  const fitBounds = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    const points: [number, number][] = [
      [predictedLongitude, predictedLatitude],
      [currentObservation.longitude, currentObservation.latitude],
    ];

    if (lastKnownPosition) {
      points.push([lastKnownPosition.longitude, lastKnownPosition.latitude]);
    }

    // Every vessel keeps an independent search grid; include every valid grid
    // coordinate so multi-vessel scenarios remain visible after auto-fit.
    (vesselResults || []).forEach((result) => {
      if (isValidCoordinate(result.prediction.predictedLatitude, result.prediction.predictedLongitude)) {
        points.push([result.prediction.predictedLongitude, result.prediction.predictedLatitude]);
      }
      result.searchZones.forEach((zone) => {
        if (isValidCoordinate(zone.latitude, zone.longitude)) points.push([zone.longitude, zone.latitude]);
      });
    });

    // Include rescue assets
    rescueAssets.forEach((a) => points.push([a.longitude, a.latitude]));

    // Include route path
    if (routePath) {
      routePath.forEach((p) => points.push(p));
    }

    // Include risk zone edge approximation (north/south/east/west extents)
    const riskRadiusKm = Math.min(300, Math.max(40, 200 * (riskResult?.uncertaintyMultiplier || 1)));
    const riskRadiusDeg = riskRadiusKm / 111.32;
    points.push([currentObservation.longitude, currentObservation.latitude + riskRadiusDeg]);
    points.push([currentObservation.longitude, currentObservation.latitude - riskRadiusDeg]);
    points.push([currentObservation.longitude + riskRadiusDeg, currentObservation.latitude]);
    points.push([currentObservation.longitude - riskRadiusDeg, currentObservation.latitude]);

    let minLng = 180,
      minLat = 90,
      maxLng = -180,
      maxLat = -90;
    for (const [lng, lat] of points) {
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }

    try {
      map.fitBounds(
        [
          [minLng - 0.05, minLat - 0.05],
          [maxLng + 0.05, maxLat + 0.05],
        ],
        { padding: 60, maxZoom: 11, animate: true, duration: 800 }
      );
    } catch (_) {
      /* bounds error */
    }
  }, [predictedLatitude, predictedLongitude, currentObservation, lastKnownPosition, rescueAssets, vesselResults, routePath, riskResult]);

  // -----------------------------------------------------------------------
  // Map initialisation (runs once)
  // -----------------------------------------------------------------------
  useEffect(() => {
    if (!ref.current) return;

    let map: maplibregl.Map;
    try {
      map = new maplibregl.Map({
        container: ref.current,
        style: {
          version: 8,
          sources: {
            basemap: {
              type: "raster",
              tiles: [
                "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
                "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
              ],
              tileSize: 256,
              attribution: "© CARTO © OpenStreetMap",
            },
          },
          layers: [{ id: "basemap", type: "raster", source: "basemap" }],
        },
        center: [predictedLongitude, predictedLatitude],
        zoom: 9,
        attributionControl: false,
      });
    } catch (err) {
      console.warn("[LiveMap] MapLibre failed to initialize:", err);
      return;
    }

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");

    map.on("load", () => {
      // =====================================================================
      // LAYER ORDER (bottom → top) enforces visual hierarchy:
      //   1. Historical cyclone track  (lowest, most subtle)
      //   2. Environmental risk zone fill
      //   3. Search probability grid fills
      //   4. Risk zone border
      //   5. Search probability grid borders
      //   6. Route glow (wide, translucent)
      //   7. Route line (main)
      //   8. Drift connector line (last known → predicted)
      // Markers are added via Marker API above all layers.
      // =====================================================================

      // --- 1. Historical Cyclone Track ---
      const trackCoords = track.map((t) => [t.longitude, t.latitude]);
      map.addSource("michaung-track-src", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: trackCoords },
        },
      });
      map.addLayer({
        id: "michaung-track-line",
        type: "line",
        source: "michaung-track-src",
        paint: {
          "line-color": "#f97316",
          "line-width": 1.5,
          "line-dasharray": [2, 3],
          "line-opacity": 0.35,
        },
      });

      // --- 2. Environmental Risk Zone Fill ---
      const riskRadiusKm = Math.min(300, Math.max(40, 200 * (riskResult?.uncertaintyMultiplier || 1)));
      map.addSource("risk-zone-src", {
        type: "geojson",
        data: createGeoJSONCircle([currentObservation.longitude, currentObservation.latitude], riskRadiusKm),
      });
      map.addLayer({
        id: "risk-zone-fill",
        type: "fill",
        source: "risk-zone-src",
        paint: {
          "fill-color": "#a855f7",
          "fill-opacity": 0.08,
        },
      });

      // --- 3. Search Probability Grid (Cell Fills) ---
      const gridFeatures = buildGridFeatures(vesselResults);

      // Determine cell spacing in degrees from the grid
      // The probability engine creates a 5×5 grid. We compute spacing
      // from the difference between adjacent zones (sorted by original grid position).
      // searchZones are sorted by probability DESC, so we recover the grid from coordinates.
      /*
      const allLats = [...new Set(searchZones.map((z) => z.latitude))].sort((a, b) => a - b);
      const allLons = [...new Set(searchZones.map((z) => z.longitude))].sort((a, b) => a - b);
      const latStep = allLats.length >= 2 ? (allLats[1]! - allLats[0]!) : 0.02;
      const lonStep = allLons.length >= 2 ? (allLons[1]! - allLons[0]!) : 0.02;
      const halfLat = latStep / 2;
      const halfLon = lonStep / 2;

      const legacyGridFeatures: GeoJSON.Feature<GeoJSON.Polygon>[] = searchZones.map((zone) => {
        const feat = cellPolygon(zone.longitude, zone.latitude, halfLon, halfLat);
        feat.properties = {
          id: zone.id,
          probability: zone.probability,
          priority: zone.priority,
          color: probabilityColor(zone.probability, maxProb),
          opacity: probabilityOpacity(zone.probability, maxProb),
          isPeak: zone.priority === 1 ? 1 : 0,
        };
        return feat;
      }); */

      map.addSource("grid-src", {
        type: "geojson",
        data: { type: "FeatureCollection", features: gridFeatures },
      });

      map.addLayer({
        id: "grid-fill",
        type: "fill",
        source: "grid-src",
        paint: {
          "fill-color": ["get", "color"],
          "fill-opacity": ["get", "opacity"],
        },
      });

      // --- 4. Risk Zone Border ---
      map.addLayer({
        id: "risk-zone-line",
        type: "line",
        source: "risk-zone-src",
        paint: {
          "line-color": "#c084fc",
          "line-width": 1.5,
          "line-dasharray": [4, 3],
          "line-opacity": 0.6,
        },
      });

      // --- 5. Search Grid Borders ---
      map.addLayer({
        id: "grid-line",
        type: "line",
        source: "grid-src",
        paint: {
          "line-color": ["get", "outlineColor"],
          "line-width": ["get", "lineWidth"],
          "line-opacity": 0.7,
        },
      });

      // --- 6. Route Glow (wide translucent underlay) ---
      map.addSource("route-src", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: routePath || [],
          },
        },
      });

      map.addLayer({
        id: "route-glow",
        type: "line",
        source: "route-src",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#22d3ee",
          "line-width": 10,
          "line-opacity": 0.15,
        },
      });

      // --- 7. Route Line (main) ---
      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route-src",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#22d3ee",
          "line-width": 3.5,
          "line-opacity": 0.9,
        },
      });

      // --- 8. Drift Connector Line (last known → predicted) ---
      const driftCoords: [number, number][] = lastKnownPosition
        ? [
            [lastKnownPosition.longitude, lastKnownPosition.latitude],
            [predictedLongitude, predictedLatitude],
          ]
        : [];

      map.addSource("drift-line-src", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: driftCoords },
        },
      });

      map.addLayer({
        id: "drift-line",
        type: "line",
        source: "drift-line-src",
        paint: {
          "line-color": "#67e8f9",
          "line-width": 2,
          "line-dasharray": [6, 4],
          "line-opacity": 0.8,
        },
      });

      // ---- Grid hover popup ----
      const gridPopup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.on("mouseenter", "grid-fill", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "grid-fill", () => {
        map.getCanvas().style.cursor = "";
        gridPopup.remove();
      });
      map.on("mousemove", "grid-fill", (e: any) => {
        if (e.features && e.features.length > 0) {
          const f = e.features[0];
          const prob = f.properties.probability;
          const zoneId = f.properties.id;
          const pct = (prob * 100).toFixed(1);
          gridPopup
            .setLngLat(e.lngLat)
            .setHTML(
              popupHTML(`${f.properties.vesselId} â€” ${zoneId}`, [
                `Vessel: ${f.properties.vesselName}`,
                `Probability: <strong style="color:#fbbf24">${pct}%</strong>`,
                `Priority: ${f.properties.priority}`,
              ])
            )
            .addTo(map);
        }
      });

      // Fit to scenario after initial load
      fitBounds();
    });

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      if (routeDotRef.current) routeDotRef.current.remove();
      try {
        map.remove();
      } catch (_) {}
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // -----------------------------------------------------------------------
  // Update markers & dynamic sources on prop changes
  // -----------------------------------------------------------------------
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    if (routeDotRef.current) {
      routeDotRef.current.remove();
      routeDotRef.current = null;
    }
    cancelAnimationFrame(animFrameRef.current);

    // ---- Update dynamic sources ----

    // Drift line
    const driftSrc = map.getSource("drift-line-src") as maplibregl.GeoJSONSource | undefined;
    if (driftSrc && lastKnownPosition) {
      driftSrc.setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            [lastKnownPosition.longitude, lastKnownPosition.latitude],
            [predictedLongitude, predictedLatitude],
          ],
        },
      });
    }

    // Route
    const routeSrc = map.getSource("route-src") as maplibregl.GeoJSONSource | undefined;
    if (routeSrc) {
      routeSrc.setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: routePath || [],
        },
      });
    }

    // Search grid
    const gridSrc = map.getSource("grid-src") as maplibregl.GeoJSONSource | undefined;
    if (gridSrc) {
      gridSrc.setData({ type: "FeatureCollection", features: buildGridFeatures(vesselResults) });
    }

    // Risk zone
    const riskSrc = map.getSource("risk-zone-src") as maplibregl.GeoJSONSource | undefined;
    if (riskSrc) {
      const riskRadiusKm = Math.min(300, Math.max(40, 200 * (riskResult?.uncertaintyMultiplier || 1)));
      riskSrc.setData(createGeoJSONCircle([currentObservation.longitude, currentObservation.latitude], riskRadiusKm) as any);
    }

    // Track
    const trackSrc = map.getSource("michaung-track-src") as maplibregl.GeoJSONSource | undefined;
    if (trackSrc) {
      trackSrc.setData({
        type: "Feature",
        properties: {},
        geometry: { type: "LineString", coordinates: track.map((t) => [t.longitude, t.latitude]) },
      });
    }

    // =======================================================================
    // MARKERS (top of map, in visual hierarchy order)
    // =======================================================================

    // ---- 1. Rescue Asset Markers (lowest marker priority) ----
    rescueAssets.forEach((asset) => {
      const isSelected = asset.id === selectedAssetId;
      const isFailed = asset.id === failedAssetId || !asset.available;
      const isHeli = asset.type.toLowerCase().includes("heli");

      const el = document.createElement("div");
      el.className = "msar-marker";
      if (isFailed) el.style.opacity = "0.55";

      if (isFailed) {
        // Failed asset: red pulsing X marker
        const failRing = document.createElement("div");
        failRing.className = "msar-failed-asset-pulse";
        failRing.style.cssText =
          "position:absolute;width:28px;height:28px;border-radius:50%;" +
          "background:rgba(239,68,68,0.15);border:1.5px solid rgba(239,68,68,0.6);" +
          "top:50%;left:50%;transform:translate(-50%,-50%)";
        el.appendChild(failRing);

        const glyph = document.createElement("div");
        glyph.className = "msar-glyph";
        glyph.innerText = "✕";
        glyph.style.cssText =
          "font-size:16px;font-weight:bold;color:#ef4444;" +
          "text-shadow:0 0 8px rgba(239,68,68,0.8)";
        el.appendChild(glyph);

        const tag = document.createElement("div");
        tag.className = "msar-tag msar-tag-emergency";
        tag.innerText = `${asset.id} — OFFLINE`;
        el.appendChild(tag);
      } else {
        const glyph = document.createElement("div");
        glyph.className = `msar-glyph ${isHeli ? "msar-glyph-heli" : "msar-glyph-boat"}${isSelected ? " msar-asset-selected" : ""}`;
        glyph.innerText = isHeli ? "🚁" : "⛵";
        glyph.style.fontSize = "14px";
        el.appendChild(glyph);

        const tag = document.createElement("div");
        tag.className = "msar-tag";
        tag.innerText = asset.id;
        el.appendChild(tag);
      }

      el.onclick = () => {
        if (onSelectAsset && !isFailed) onSelectAsset(asset.id);
      };

      const m = new maplibregl.Marker({ element: el, anchor: "center", draggable: !isFailed })
        .setLngLat([asset.longitude, asset.latitude])
        .setPopup(
          new maplibregl.Popup({ offset: 18, closeButton: false }).setHTML(
            popupHTML(`${asset.name} (${asset.id})`, [
              `Type: ${asset.type}`,
              `Speed: ${asset.speedKnots} kts`,
              `Endurance: ${asset.enduranceHours} hrs`,
              `Status: ${isFailed ? "⚠ OFFLINE — FAILED" : asset.available ? "AVAILABLE" : "UNAVAILABLE"}`,
              asset.medicalCapability ? "✚ Medical Capability" : "",
              "💡 Drag to reposition asset on chart",
            ].filter(Boolean))
          )
        )
        .addTo(map);

      if (!isFailed) {
        m.on("dragend", () => {
          const lngLat = m.getLngLat();
          if (onAssetMove) {
            onAssetMove(asset.id, lngLat.lat, lngLat.lng);
          }
        });
      }
      markersRef.current.push(m);
    });

    // ---- 2. Cyclone Marker ----
    {
      const el = document.createElement("div");
      el.className = "msar-marker";

      // Rotating pulsing ring
      const ring = document.createElement("div");
      ring.className = "msar-cyclone-ring";
      el.appendChild(ring);

      const glyph = document.createElement("div");
      glyph.className = "msar-glyph msar-glyph-cyclone";
      glyph.innerText = "🌀";
      glyph.style.fontSize = "16px";
      el.appendChild(glyph);

      // Label varies by scenario
      const isSim = currentObservation.timestamp?.startsWith("SIMULATED");
      const cycloneLabel = isSim
        ? currentObservation.wind_kt === 0
          ? "NORMAL CONDITIONS"
          : "SEVERE STORM — SIMULATED"
        : "MICHAUNG — HISTORICAL";

      const tag = document.createElement("div");
      tag.className = `msar-tag ${isSim && currentObservation.wind_kt > 0 ? "msar-tag-emergency" : "msar-tag-warning"}`;
      tag.innerText = cycloneLabel;
      el.appendChild(tag);

      // Only add cyclone marker if wind > 0 or not normal conditions
      if (currentObservation.wind_kt > 0) {
        const m = new maplibregl.Marker({ element: el, anchor: "center" })
          .setLngLat([currentObservation.longitude, currentObservation.latitude])
          .setPopup(
            new maplibregl.Popup({ offset: 22, closeButton: false }).setHTML(
              popupHTML(isSim ? "SEVERE STORM SIMULATION" : "CYCLONE MICHAUNG — HISTORICAL", [
                `Category: ${formatCycloneCategory(currentObservation.category)}`,
                `Wind: ${currentObservation.wind_kt} kts`,
                `Pressure: ${currentObservation.pressure_hpa} hPa`,
                `Timestamp: ${currentObservation.timestamp}`,
                isSim ? "⚠ SYNTHETIC DATA — NOT REAL" : "📋 IMD Best-Track Dataset",
              ])
            )
          )
          .addTo(map);
        markersRef.current.push(m);
      }
    }

    // ---- 3. Last Known Position Marker ----
    if (lastKnownPosition) {
      const el = document.createElement("div");
      el.className = "msar-marker";

      // Pulsing ring
      const pulse = document.createElement("div");
      pulse.className = "msar-pulse";
      el.appendChild(pulse);

      const glyph = document.createElement("div");
      glyph.className = "msar-glyph msar-glyph-lastknown";
      glyph.innerText = "▲";
      glyph.style.fontSize = "11px";
      el.appendChild(glyph);

      const tag = document.createElement("div");
      tag.className = "msar-tag msar-tag-emergency";
      tag.innerText = "LAST KNOWN";
      el.appendChild(tag);

      const m = new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat([lastKnownPosition.longitude, lastKnownPosition.latitude])
        .setPopup(
          new maplibregl.Popup({ offset: 18, closeButton: false }).setHTML(
            popupHTML(`LAST KNOWN FIX (${lastKnownPosition.name || "VESSEL"})`, [
              `${lastKnownPosition.latitude.toFixed(4)}°N, ${lastKnownPosition.longitude.toFixed(4)}°E`,
            ])
          )
        )
        .addTo(map);
      markersRef.current.push(m);
    }

    // ---- 4. Predicted Position Marker (highest visual priority) ----
    {
      const el = document.createElement("div");
      el.className = "msar-marker";

      // Pulsing cyan ring
      const pulse = document.createElement("div");
      pulse.className = "msar-pulse-cyan";
      el.appendChild(pulse);

      const glyph = document.createElement("div");
      glyph.className = "msar-glyph msar-glyph-predicted";
      glyph.innerText = "◆";
      glyph.style.fontSize = "14px";
      glyph.style.width = "2rem";
      glyph.style.height = "2rem";
      el.appendChild(glyph);

      const tag = document.createElement("div");
      tag.className = "msar-tag msar-tag-cyan";
      tag.style.fontWeight = "700";
      tag.innerText = "PREDICTED FIX";
      el.appendChild(tag);

      const m = new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat([predictedLongitude, predictedLatitude])
        .setPopup(
          new maplibregl.Popup({ offset: 22, closeButton: false }).setHTML(
            popupHTML("PREDICTED VESSEL FIX", [
              `${predictedLatitude.toFixed(4)}°N, ${predictedLongitude.toFixed(4)}°E`,
              `Source: Drift Prediction Engine`,
            ])
          )
        )
        .addTo(map);
      markersRef.current.push(m);
    }

    // ---- 4b. Additional vessel predictions and their independent grid labels ----
    (vesselResults || []).slice(1).forEach((result, index) => {
      const { vessel, prediction, searchZones: vesselZones } = result;
      if (!isValidCoordinate(prediction.predictedLatitude, prediction.predictedLongitude)) return;

      const accent = SECONDARY_VESSEL_OUTLINES[index % SECONDARY_VESSEL_OUTLINES.length]!;
      const el = document.createElement("div");
      el.className = "msar-marker";

      const glyph = document.createElement("div");
      glyph.className = "msar-glyph";
      glyph.innerText = "◇";
      glyph.style.cssText = `font-size:13px;color:${accent};text-shadow:0 0 8px ${accent};`;
      el.appendChild(glyph);

      const tag = document.createElement("div");
      tag.className = "msar-tag";
      tag.style.cssText = `color:${accent};border-color:${accent}99;font-weight:700;`;
      tag.innerText = `${vessel.id} PREDICTED`;
      el.appendChild(tag);

      const marker = new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat([prediction.predictedLongitude, prediction.predictedLatitude])
        .setPopup(
          new maplibregl.Popup({ offset: 18, closeButton: false }).setHTML(
            popupHTML(`${vessel.name} (${vessel.id})`, [
              `${prediction.predictedLatitude.toFixed(4)}°N, ${prediction.predictedLongitude.toFixed(4)}°E`,
              "Source: Independent Drift Prediction Engine",
            ]),
          ),
        )
        .addTo(map);
      markersRef.current.push(marker);

      const topZone = vesselZones[0];
      if (topZone && isValidCoordinate(topZone.latitude, topZone.longitude)) {
        const label = document.createElement("div");
        label.style.cssText = `font-family:var(--font-mono);font-size:7px;font-weight:700;letter-spacing:0.08em;color:${accent};background:rgba(10,15,30,0.8);padding:2px 4px;border-radius:3px;border:1px solid ${accent}88;white-space:nowrap;pointer-events:none;`;
        label.innerText = `${vessel.id} · ${topZone.id}`;
        const zoneMarker = new maplibregl.Marker({ element: label, anchor: "bottom" })
          .setLngLat([topZone.longitude, topZone.latitude])
          .addTo(map);
        markersRef.current.push(zoneMarker);
      }
    });

    // ---- 5. Route animated travelling dot ----
    if (routePath && routePath.length >= 2) {
      const dotEl = document.createElement("div");
      dotEl.className = "msar-route-dot";
      const dot = new maplibregl.Marker({ element: dotEl, anchor: "center" })
        .setLngLat(routePath[0]!)
        .addTo(map);
      routeDotRef.current = dot;

      // Animate the dot along the route
      let progress = 0;
      const totalSegments = routePath.length - 1;
      const speed = 0.003; // progress per frame

      function animateRouteDot() {
        progress += speed;
        if (progress > totalSegments) progress = 0;

        const segIdx = Math.floor(progress);
        const segT = progress - segIdx;
        const idx0 = Math.min(segIdx, totalSegments - 1);
        const idx1 = Math.min(segIdx + 1, totalSegments);
        const p0 = routePath![idx0]!;
        const p1 = routePath![idx1]!;
        const lng = p0[0] + (p1[0] - p0[0]) * segT;
        const lat = p0[1] + (p1[1] - p0[1]) * segT;

        if (routeDotRef.current) {
          routeDotRef.current.setLngLat([lng, lat]);
        }
        animFrameRef.current = requestAnimationFrame(animateRouteDot);
      }
      animFrameRef.current = requestAnimationFrame(animateRouteDot);

      // Route label marker at midpoint
      const midIdx = Math.floor(routePath.length / 2);
      const routeLabelEl = document.createElement("div");
      routeLabelEl.style.cssText =
        "font-family:var(--font-mono);font-size:8px;font-weight:700;letter-spacing:0.12em;color:#22d3ee;background:rgba(10,15,30,0.85);padding:2px 6px;border-radius:3px;border:1px solid rgba(34,211,238,0.35);white-space:nowrap;pointer-events:none;";
      routeLabelEl.innerText = "RECOMMENDED ROUTE";
      const routeLabelMarker = new maplibregl.Marker({ element: routeLabelEl, anchor: "bottom" })
        .setLngLat(routePath[midIdx]!)
        .addTo(map);
      markersRef.current.push(routeLabelMarker);
    }

    // ---- Risk Zone label marker ----
    {
      const riskLabelEl = document.createElement("div");
      riskLabelEl.style.cssText =
        "font-family:var(--font-mono);font-size:7px;font-weight:600;letter-spacing:0.1em;color:#c084fc;background:rgba(10,15,30,0.75);padding:2px 5px;border-radius:3px;border:1px solid rgba(168,85,247,0.3);white-space:nowrap;pointer-events:none;text-transform:uppercase;";
      riskLabelEl.innerText = "SIMULATED ENVIRONMENTAL RISK ZONE";
      const riskRadiusKm = Math.min(300, Math.max(40, 200 * (riskResult?.uncertaintyMultiplier || 1)));
      const offsetDeg = riskRadiusKm / 111.32;
      const riskLabelMarker = new maplibregl.Marker({ element: riskLabelEl, anchor: "center" })
        .setLngLat([currentObservation.longitude, currentObservation.latitude - offsetDeg * 0.85])
        .addTo(map);
      markersRef.current.push(riskLabelMarker);
    }
  }, [
    lastKnownPosition,
    predictedLatitude,
    predictedLongitude,
    currentObservation,
    track,
    riskResult,
    searchZones,
    vesselResults,
    rescueAssets,
    selectedAssetId,
    failedAssetId,
    routePath,
    onSelectAsset,
  ]);

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  return (
    <div className="relative size-full overflow-hidden rounded-lg bg-abyss">
      <div ref={ref} className="size-full" />

      {/* ---- Compact Legend ---- */}
      <div className="msar-legend">
        <div className="msar-legend-title">LEGEND</div>
        <div className="msar-legend-row">
          <span className="msar-legend-swatch" style={{ background: "#ef4444" }} />
          <span>Last Known</span>
        </div>
        <div className="msar-legend-row">
          <span className="msar-legend-swatch" style={{ background: "#22d3ee" }} />
          <span>Predicted Fix</span>
        </div>
        <div className="msar-legend-row">
          <span className="msar-legend-swatch" style={{ background: "linear-gradient(90deg, #1a3a5c, #d97706, #dc2626)" }} />
          <span>Search Probability</span>
        </div>
        <div className="msar-legend-row">
          <span className="msar-legend-swatch" style={{ background: "#a855f7", opacity: 0.6 }} />
          <span>Env. Risk Zone</span>
        </div>
        <div className="msar-legend-row">
          <span className="msar-legend-swatch" style={{ background: "#22d3ee", opacity: 0.8 }} />
          <span>Recommended Route</span>
        </div>
        <div className="msar-legend-row">
          <span style={{ fontSize: "10px" }}>⛵ 🚁</span>
          <span>Rescue Assets</span>
        </div>
      </div>

      {/* Simulated Route Disclaimer Banner */}
      <div className="absolute bottom-2 left-2 z-10 rounded border border-cyan/30 bg-abyss/85 px-2.5 py-1 font-mono text-[9px] font-bold text-cyan shadow backdrop-blur">
        ⚠️ SIMULATED DECISION-SUPPORT ROUTE — NOT FOR REAL NAVIGATION
      </div>

      {/* Auto fit map button */}
      <button
        onClick={fitBounds}
        className="absolute top-3 right-3 z-10 rounded border border-border bg-abyss/80 px-2 py-1 font-mono text-[10px] font-semibold text-cyan shadow backdrop-blur transition hover:bg-abyss hover:text-white"
      >
        FIT VIEWPORT
      </button>
    </div>
  );
}
