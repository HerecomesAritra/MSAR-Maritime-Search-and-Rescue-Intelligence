import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as ClientOnly } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as TSS_SERVER_FUNCTION, i as createServerFn, o as getServerFnById } from "./server-DeRl2QfM.mjs";
import { a as objectType, i as numberType, n as arrayType, o as stringType, r as enumType, t as anyType } from "../_libs/zod.mjs";
import { A as Dice5, B as ChevronRight, C as Navigation, D as Key, E as Layers, F as CloudLightning, H as Bot, I as Clock, L as CirclePlay, M as Cpu, N as Compass, O as History, P as Cloud, R as CircleCheck, S as RefreshCw, T as LoaderCircle, U as ArrowRight, V as Check, W as Activity, _ as ShieldAlert, a as Waves, b as Satellite, c as TrendingDown, d as SlidersHorizontal, f as SkipForward, g as ShieldCheck, h as Shield, i as Wind, j as Crosshair, k as Gauge, l as Square, m as Ship, n as ZapOff, o as Users, p as SkipBack, r as X, s as TriangleAlert, t as Zap, u as Sparkles, v as Settings, w as MessageSquare, x as RotateCcw, y as Send, z as CircleAlert } from "../_libs/lucide-react.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bw1yTr60.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TopBar({ clock, online, provider, onOpenSettings }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "glass sticky top-0 z-30 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-none border-x-0 border-t-0 px-4 py-2.5 md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative grid size-9 place-items-center rounded-md border border-border bg-accent/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, { className: "size-5 text-cyan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -right-0.5 -top-0.5 size-2 rounded-full bg-emergency blink" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "leading-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-2xl font-bold tracking-[0.22em] text-foreground",
						children: "MSAR"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "data-key mt-1 hidden sm:block",
						children: "Maritime Search & Rescue Intelligence"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden items-center gap-2 border-l border-border pl-6 lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Satellite, { className: "size-3.5 text-cyan-dim" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "data-key",
						children: "DATA MODE:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "data-value text-cyan font-bold",
						children: "HISTORICAL + SIMULATED"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ml-auto flex items-center gap-3 sm:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onOpenSettings,
						className: `flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-mono font-semibold transition-all ${provider === "OLLAMA" ? "border-purple-400/50 bg-purple-500/15 text-purple-400 hover:bg-purple-500/25" : provider === "OPENROUTER" ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25" : provider === "GROQ" ? "border-success/50 bg-success/15 text-success hover:bg-success/25" : provider === "MISTRAL" ? "border-warning/50 bg-warning/15 text-warning hover:bg-warning/25" : "border-cyan/50 bg-cyan/15 text-cyan hover:bg-cyan/25"}`,
						title: "Click to configure AI Model Provider & API Keys",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["AI: ", provider] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden text-right sm:block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "data-key",
							children: "UTC"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "data-value",
							children: clock
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex items-center gap-2 rounded-md border px-3 py-1.5 ${online ? "border-success/40 bg-success/10" : "border-warning/40 bg-warning/10"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: `size-4 ${online ? "text-success" : "text-warning"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `font-mono text-xs font-semibold tracking-widest ${online ? "text-success" : "text-warning"}`,
							children: online ? "SYSTEM NOMINAL" : "DEGRADED MODE"
						})]
					})
				]
			})
		]
	});
}
function headingLabel(deg) {
	return [
		"N",
		"NE",
		"E",
		"SE",
		"S",
		"SW",
		"W",
		"NW"
	][Math.round(deg / 45) % 8] ?? "N";
}
function Row({ label, value, tone = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-3 border-b border-border/60 py-2 last:border-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "data-key",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `data-value text-right ${tone === "emergency" ? "text-emergency" : tone === "warning" ? "text-warning" : tone === "cyan" ? "text-cyan" : "text-foreground"}`,
			children: value
		})]
	});
}
function IncidentPanel({ incident, elapsedExtra, liveSpeedKts, liveHeadingDeg, liveMinutesSinceContact, liveWindKts, liveCurrentKts, liveSeaState }) {
	const speedKts = liveSpeedKts ?? incident.speedKts;
	const headingDeg = liveHeadingDeg ?? incident.headingDeg;
	const mins = (liveMinutesSinceContact ?? incident.minutesSinceContact) + elapsedExtra;
	const windKts = liveWindKts ?? incident.windKts;
	const currentKts = liveCurrentKts ?? incident.currentKts;
	const seaState = liveSeaState != null ? `${liveSeaState}` : incident.seaState;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "glass scan-sheen flex shrink-0 flex-col rounded-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 text-emergency blink" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "panel-label text-emergency",
					children: "Distress Incident"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border bg-emergency/8 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-xl font-bold tracking-wide text-foreground",
					children: incident.vesselName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "data-key mt-1",
					children: incident.status
				})]
			}),
			incident.summary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-4 mt-3 rounded-md border border-cyan/40 bg-cyan/10 p-3 shrink-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-[10px] font-mono font-bold text-cyan",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex items-center gap-1",
							children: "🤖 AI TRIAGE AGENT CLASSIFICATION"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded bg-cyan/20 px-1 py-0.5 text-[9px]",
							children: "LIVE"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1.5 flex items-center justify-between text-xs font-semibold text-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["TYPE: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-emergency",
								children: incident.status
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["URGENCY: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "text-warning",
								children: [incident.urgency, "/5"]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["CREW: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "text-cyan",
								children: [incident.crewAtRisk, " POB"]
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-[11px] leading-snug text-muted-foreground italic border-t border-cyan/20 pt-1.5",
						children: [
							"\"",
							incident.summary,
							"\""
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto px-4 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Vessel ID",
						value: incident.vesselId
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Vessel Type",
						value: incident.vesselType
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Last Known Position",
						value: `${incident.position.lat.toFixed(4)}°N ${incident.position.lon.toFixed(4)}°E`,
						tone: "cyan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Speed",
						value: `${speedKts.toFixed(1)} kts`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Heading",
						value: `${Math.round(headingDeg)}° (${headingLabel(headingDeg)})`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Crew at Risk",
						value: `${incident.crewAtRisk} persons`,
						tone: "emergency"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Time Since Contact",
						value: `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, "0")}m`,
						tone: "warning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Urgency",
						value: `Level ${incident.urgency} / 5`,
						tone: "emergency"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Incident Status",
						value: "ACTIVE — SAR LAUNCHED",
						tone: "warning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "panel-label mb-2",
							children: "Environment"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [
								{
									icon: Gauge,
									k: "Sea State",
									v: seaState
								},
								{
									icon: Compass,
									k: "Wind",
									v: `${windKts} kts`
								},
								{
									icon: Compass,
									k: "Current",
									v: `${currentKts} kts`
								},
								{
									icon: Users,
									k: "Water Temp",
									v: `${incident.waterTempC} °C`
								}
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md border border-border bg-accent/30 p-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-3 text-cyan-dim" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "data-key",
										children: item.k
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "data-value mt-1",
									children: item.v
								})]
							}, item.k))
						})]
					})
				]
			})
		]
	});
}
var INCIDENT = {
	vesselId: "MV-204",
	vesselName: "MV-204",
	vesselType: "Fishing Vessel",
	position: {
		lat: 13.04,
		lon: 80.52
	},
	speedKts: 7,
	headingDeg: 140,
	crewAtRisk: 3,
	minutesSinceContact: 20,
	urgency: 4,
	status: "LOSS OF CONTACT",
	seaState: "3 — SLIGHT",
	windKts: 14,
	currentKts: 1.2,
	waterTempC: 28.6
};
var ZONES = [
	{
		id: "A",
		label: "ZONE A",
		probability: .61,
		priority: 1,
		cx: 46,
		cy: 44,
		rx: 15,
		ry: 11,
		rationale: "Leeway drift vector (SE 1.2 kt current + 14 kt wind) places the datum inside Zone A within 20 min of last contact. Highest containment of the probability mass."
	},
	{
		id: "B",
		label: "ZONE B",
		probability: .24,
		priority: 2,
		cx: 63,
		cy: 57,
		rx: 12,
		ry: 9,
		rationale: "Down-current expansion cell. Absorbs drift error if the vessel retained partial steerage before contact loss."
	},
	{
		id: "C",
		label: "ZONE C",
		probability: .11,
		priority: 3,
		cx: 33,
		cy: 62,
		rx: 10,
		ry: 8,
		rationale: "Counter-eddy scenario near the shelf break. Low weight but non-zero given historical eddy behaviour in this basin."
	},
	{
		id: "D",
		label: "ZONE D",
		probability: .04,
		priority: 4,
		cx: 58,
		cy: 28,
		rx: 9,
		ry: 7,
		rationale: "Up-wind residual. Retained only to cover contact timestamp uncertainty of ±3 min."
	}
];
var COPILOT_QUESTIONS = [
	{
		q: "Why was this asset selected?",
		a: "The scoring engine evaluated all available asset–zone pairings and ranked them by total cost (response time + hazard penalty + capability penalty + priority bonus). The top-ranked candidate has the lowest cost."
	},
	{
		q: "Why is this search zone highest priority?",
		a: "Search zones are generated by a Gaussian probability decay model centered on the predicted vessel position. The center cell receives exponentially higher weight. Priority 1 is the zone closest to the predicted fix with the highest probability mass."
	},
	{
		q: "Why wasn't another asset selected?",
		a: "Alternative assets were evaluated but ranked lower due to longer response times, higher total cost, endurance constraints, or capability penalties in the scoring engine."
	},
	{
		q: "How did environmental risk affect the decision?",
		a: "The environmental risk engine calculates cyclone proximity and wind intensity factors. Higher risk increases the uncertainty multiplier, which expands search zone radius and adds hazard penalty to each candidate's cost function."
	},
	{
		q: "What happens if the selected asset fails?",
		a: "The scoring engine maintains a ranked list of all feasible asset–zone pairings. If the primary asset fails, the next-best candidate will be tasked. Response time may increase and coverage confidence may decrease."
	}
];
function CopilotPanel({ messages, thinking, recommendation, onAsk, onStop }) {
	const [customInput, setCustomInput] = (0, import_react.useState)("");
	const endRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "end"
		});
	}, [messages.length, thinking]);
	const handleSubmit = (e) => {
		e.preventDefault();
		const trimmed = customInput.trim();
		if (!trimmed || thinking) return;
		onAsk(trimmed);
		setCustomInput("");
	};
	const toneBorder = recommendation.tone === "emergency" ? "border-emergency/50 bg-emergency/10" : recommendation.tone === "warning" ? "border-warning/50 bg-warning/10" : "border-cyan/50 bg-cyan/8";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "glass flex h-full flex-col rounded-lg overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 border-b border-border px-4 py-3 shrink-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-4 text-cyan" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "panel-label",
						children: "AI SAR Copilot"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-auto flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-1.5 rounded-full ${thinking ? "bg-emergency blink" : "bg-success"}` }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "data-key",
								children: thinking ? "REASONING" : "IDLE"
							}),
							thinking && onStop && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: onStop,
								className: "ml-1 flex items-center gap-1 rounded border border-emergency/60 bg-emergency/20 px-2 py-0.5 font-mono text-[9px] font-bold text-emergency hover:bg-emergency/35 transition-all animate-pulse",
								title: "Stop AI generation immediately",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-2.5 fill-emergency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "STOP AI" })]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `m-3 shrink-0 rounded-md border px-3 py-2.5 ${toneBorder}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "data-key mb-1 flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3 text-cyan" }), " Current Recommendation"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-sm font-semibold tracking-wide text-foreground",
						children: recommendation.headline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs leading-relaxed text-muted-foreground",
						children: recommendation.detail
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 space-y-3 overflow-y-auto px-3 pb-2 min-h-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "data-key px-1 flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-3 text-cyan-dim" }), " Decision Explanation Log"]
					}),
					messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-md border px-3 py-2 text-xs leading-relaxed ${m.role === "operator" ? "ml-6 border-cyan/40 bg-cyan/10 text-foreground" : "border-cyan/25 bg-abyss/60 text-muted-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "data-key mb-1 flex justify-between items-center text-[9px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: m.role === "operator" ? "text-cyan font-bold" : "text-muted-foreground",
								children: m.role === "operator" ? "OPERATOR" : "COPILOT"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.ts })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "whitespace-pre-line text-xs",
							children: m.text
						})]
					}, m.id)),
					thinking && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-cyan/25 bg-abyss/50 px-3 py-2 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "data-key",
							children: "COPILOT ANALYSING PIPELINE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 flex gap-1",
							children: [
								0,
								1,
								2
							].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-1.5 rounded-full bg-cyan blink",
								style: { animationDelay: `${i * .2}s` }
							}, i))
						})] }), onStop && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onStop,
							className: "flex items-center gap-1 rounded border border-emergency/60 bg-emergency/25 px-2.5 py-1 text-xs font-mono font-bold text-emergency hover:bg-emergency/40 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-3 fill-emergency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Stop AI" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border p-3 space-y-2.5 bg-abyss/40 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "data-key mb-1.5 text-[9px]",
					children: "Quick Operator Queries"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-1",
					children: COPILOT_QUESTIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => onAsk(item.q),
						disabled: thinking,
						className: "group flex w-full items-center justify-between gap-2 rounded border border-border/80 bg-accent/20 px-2.5 py-1.5 text-left text-[11px] text-foreground transition-colors hover:border-cyan/60 hover:bg-cyan/10 disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: item.q
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3 shrink-0 text-cyan transition-transform group-hover:translate-x-0.5" })]
					}, item.q))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "flex items-center gap-1.5 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Ask copilot any question...",
						value: customInput,
						onChange: (e) => setCustomInput(e.target.value),
						disabled: thinking,
						className: "flex-1 rounded border border-border bg-accent/40 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-cyan focus:outline-none disabled:opacity-50 font-sans"
					}), thinking && onStop ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onStop,
						className: "flex items-center gap-1 rounded bg-emergency/25 border border-emergency/60 px-3 py-2 text-xs font-semibold text-emergency hover:bg-emergency/40 transition-colors shrink-0 font-mono font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-3.5 fill-emergency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Stop" })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: thinking || !customInput.trim(),
						className: "flex items-center gap-1 rounded bg-cyan/20 border border-cyan/50 px-3 py-2 text-xs font-semibold text-cyan hover:bg-cyan/30 disabled:opacity-40 transition-colors shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ask" })]
					})]
				})]
			})
		]
	});
}
function Card({ icon: Icon, label, value, sub, tone, bar }) {
	const tones = {
		cyan: {
			t: "text-cyan",
			b: "bg-cyan",
			br: "border-cyan/30"
		},
		emergency: {
			t: "text-emergency",
			b: "bg-emergency",
			br: "border-emergency/30"
		},
		warning: {
			t: "text-warning",
			b: "bg-warning",
			br: "border-warning/30"
		},
		success: {
			t: "text-success",
			b: "bg-success",
			br: "border-success/30"
		}
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `glass rounded-lg border ${tones.br} px-3 py-2.5`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `size-3.5 ${tones.t}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "data-key",
					children: label
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `mt-1.5 font-display text-2xl font-bold tabular-nums ${tones.t}`,
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "data-key mt-0.5 normal-case tracking-normal",
				children: sub
			}),
			bar !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 h-1 overflow-hidden rounded-full bg-accent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `h-full rounded-full ${tones.b} transition-all duration-700`,
					style: { width: `${Math.round(bar * 100)}%` }
				})
			})
		]
	});
}
function MetricsBar({ m }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				icon: Crosshair,
				label: "Predicted Probability",
				value: `${(m.probability * 100).toFixed(0)}%`,
				sub: "Survivor detection in priority zone",
				tone: "cyan",
				bar: m.probability
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				icon: Layers,
				label: "Search Priority",
				value: m.priorityZone,
				sub: "Highest weighted drift cell",
				tone: "emergency"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				icon: Clock,
				label: "Response Time",
				value: `${m.responseMin}m`,
				sub: "First asset on scene (ETA)",
				tone: "warning"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				icon: Ship,
				label: "Available Assets",
				value: `${m.availableAssets}/${m.totalAssets}`,
				sub: "Taskable units within range",
				tone: "success"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				icon: Activity,
				label: "Confidence",
				value: `${(m.confidence * 100).toFixed(0)}%`,
				sub: "Model certainty on current plan",
				tone: m.confidence > .7 ? "cyan" : "warning",
				bar: m.confidence
			})
		]
	});
}
var ACTIONS = [
	{
		key: "run",
		label: "Run Prediction",
		icon: CirclePlay,
		tone: "primary"
	},
	{
		key: "recalc",
		label: "Recalculate",
		icon: RefreshCw,
		tone: "cyan"
	},
	{
		key: "fail",
		label: "Simulate Asset Failure",
		icon: ZapOff,
		tone: "emergency"
	},
	{
		key: "replay",
		label: "Historical Replay",
		icon: History,
		tone: "warning"
	},
	{
		key: "reset",
		label: "Reset",
		icon: RotateCcw,
		tone: "muted"
	}
];
var TONES = {
	primary: "border-cyan bg-cyan/20 text-cyan hover:bg-cyan/30 shadow-[var(--glow-cyan)]",
	cyan: "border-cyan/40 bg-accent/40 text-cyan hover:border-cyan hover:bg-cyan/15",
	emergency: "border-emergency/50 bg-emergency/10 text-emergency hover:bg-emergency/20",
	warning: "border-warning/50 bg-warning/10 text-warning hover:bg-warning/20",
	muted: "border-border bg-accent/30 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
};
function ActionBar({ onAction, busy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: ACTIONS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => onAction(a.key),
			disabled: busy !== null,
			className: `flex items-center gap-2 rounded-md border px-3.5 py-2 font-display text-xs font-semibold uppercase tracking-[0.16em] transition-all disabled:opacity-45 ${TONES[a.tone]}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(a.icon, { className: `size-3.5 ${busy === a.key ? "animate-spin" : ""}` }), a.label]
		}, a.key))
	});
}
var MICHAUNG_TRACK = {
	dataset_name: "Cyclone Michaung Best Track",
	event: "Severe Cyclonic Storm MICHAUNG",
	period: "2023-12-01 to 2023-12-06",
	source: "India Meteorological Department (IMD), RSMC New Delhi",
	source_document: "Severe Cyclonic Storm MICHAUNG over the Bay of Bengal (1st-6th December, 2023): A Report",
	notes: [
		"Coordinates and intensity values are from IMD Table 1 (Best track positions and other parameters).",
		"wind_kt is estimated maximum sustained surface wind in knots.",
		"The 2023-12-05 09:00 UTC row corresponds to the post-landfall best-track position near Bapatla.",
		"The IMD table records 2023-12-06 03:00 UTC as a well marked low pressure area without a numeric track position, so that row is omitted."
	],
	track: [
		{
			"timestamp": "2023-12-01T00:00:00Z",
			"latitude": 9.1,
			"longitude": 86.4,
			"current_intensity": 1.5,
			"pressure_hpa": 1002,
			"wind_kt": 20,
			"pressure_drop_hpa": 3,
			"category": "D"
		},
		{
			"timestamp": "2023-12-01T03:00:00Z",
			"latitude": 9.3,
			"longitude": 86.2,
			"current_intensity": 1.5,
			"pressure_hpa": 1002,
			"wind_kt": 20,
			"pressure_drop_hpa": 3,
			"category": "D"
		},
		{
			"timestamp": "2023-12-01T06:00:00Z",
			"latitude": 9.5,
			"longitude": 86,
			"current_intensity": 1.5,
			"pressure_hpa": 1002,
			"wind_kt": 25,
			"pressure_drop_hpa": 3,
			"category": "D"
		},
		{
			"timestamp": "2023-12-01T12:00:00Z",
			"latitude": 10,
			"longitude": 85.7,
			"current_intensity": 1.5,
			"pressure_hpa": 1001,
			"wind_kt": 25,
			"pressure_drop_hpa": 3,
			"category": "D"
		},
		{
			"timestamp": "2023-12-01T18:00:00Z",
			"latitude": 10.3,
			"longitude": 85.1,
			"current_intensity": 1.5,
			"pressure_hpa": 1e3,
			"wind_kt": 25,
			"pressure_drop_hpa": 4,
			"category": "D"
		},
		{
			"timestamp": "2023-12-02T00:00:00Z",
			"latitude": 10.5,
			"longitude": 84.1,
			"current_intensity": 2,
			"pressure_hpa": 998,
			"wind_kt": 30,
			"pressure_drop_hpa": 5,
			"category": "DD"
		},
		{
			"timestamp": "2023-12-02T03:00:00Z",
			"latitude": 10.6,
			"longitude": 83.6,
			"current_intensity": 2,
			"pressure_hpa": 997,
			"wind_kt": 30,
			"pressure_drop_hpa": 5,
			"category": "DD"
		},
		{
			"timestamp": "2023-12-02T06:00:00Z",
			"latitude": 10.7,
			"longitude": 83.2,
			"current_intensity": 2,
			"pressure_hpa": 997,
			"wind_kt": 30,
			"pressure_drop_hpa": 5,
			"category": "DD"
		},
		{
			"timestamp": "2023-12-02T12:00:00Z",
			"latitude": 10.9,
			"longitude": 83.1,
			"current_intensity": 2,
			"pressure_hpa": 997,
			"wind_kt": 30,
			"pressure_drop_hpa": 5,
			"category": "DD"
		},
		{
			"timestamp": "2023-12-02T18:00:00Z",
			"latitude": 11.1,
			"longitude": 82.7,
			"current_intensity": 2,
			"pressure_hpa": 996,
			"wind_kt": 30,
			"pressure_drop_hpa": 6,
			"category": "DD"
		},
		{
			"timestamp": "2023-12-03T00:00:00Z",
			"latitude": 11.4,
			"longitude": 82.5,
			"current_intensity": 2.5,
			"pressure_hpa": 995,
			"wind_kt": 35,
			"pressure_drop_hpa": 7,
			"category": "CS"
		},
		{
			"timestamp": "2023-12-03T03:00:00Z",
			"latitude": 11.5,
			"longitude": 82.4,
			"current_intensity": 2.5,
			"pressure_hpa": 995,
			"wind_kt": 35,
			"pressure_drop_hpa": 7,
			"category": "CS"
		},
		{
			"timestamp": "2023-12-03T06:00:00Z",
			"latitude": 11.8,
			"longitude": 82.2,
			"current_intensity": 2.5,
			"pressure_hpa": 995,
			"wind_kt": 35,
			"pressure_drop_hpa": 7,
			"category": "CS"
		},
		{
			"timestamp": "2023-12-03T09:00:00Z",
			"latitude": 12,
			"longitude": 82.1,
			"current_intensity": 2.5,
			"pressure_hpa": 995,
			"wind_kt": 35,
			"pressure_drop_hpa": 7,
			"category": "CS"
		},
		{
			"timestamp": "2023-12-03T12:00:00Z",
			"latitude": 12.2,
			"longitude": 82,
			"current_intensity": 2.5,
			"pressure_hpa": 995,
			"wind_kt": 35,
			"pressure_drop_hpa": 7,
			"category": "CS"
		},
		{
			"timestamp": "2023-12-03T15:00:00Z",
			"latitude": 12.4,
			"longitude": 81.9,
			"current_intensity": 2.5,
			"pressure_hpa": 994,
			"wind_kt": 40,
			"pressure_drop_hpa": 8,
			"category": "CS"
		},
		{
			"timestamp": "2023-12-03T18:00:00Z",
			"latitude": 12.8,
			"longitude": 81.6,
			"current_intensity": 3,
			"pressure_hpa": 992,
			"wind_kt": 45,
			"pressure_drop_hpa": 10,
			"category": "CS"
		},
		{
			"timestamp": "2023-12-03T21:00:00Z",
			"latitude": 13,
			"longitude": 81.4,
			"current_intensity": 3,
			"pressure_hpa": 992,
			"wind_kt": 45,
			"pressure_drop_hpa": 10,
			"category": "CS"
		},
		{
			"timestamp": "2023-12-04T00:00:00Z",
			"latitude": 13.1,
			"longitude": 81.2,
			"current_intensity": 3,
			"pressure_hpa": 992,
			"wind_kt": 45,
			"pressure_drop_hpa": 10,
			"category": "CS"
		},
		{
			"timestamp": "2023-12-04T03:00:00Z",
			"latitude": 13.3,
			"longitude": 81,
			"current_intensity": 3,
			"pressure_hpa": 988,
			"wind_kt": 50,
			"pressure_drop_hpa": 14,
			"category": "SCS"
		},
		{
			"timestamp": "2023-12-04T06:00:00Z",
			"latitude": 13.5,
			"longitude": 80.8,
			"current_intensity": 3,
			"pressure_hpa": 988,
			"wind_kt": 50,
			"pressure_drop_hpa": 14,
			"category": "SCS"
		},
		{
			"timestamp": "2023-12-04T09:00:00Z",
			"latitude": 13.7,
			"longitude": 80.7,
			"current_intensity": 3,
			"pressure_hpa": 988,
			"wind_kt": 50,
			"pressure_drop_hpa": 14,
			"category": "SCS"
		},
		{
			"timestamp": "2023-12-04T12:00:00Z",
			"latitude": 14,
			"longitude": 80.5,
			"current_intensity": 3.5,
			"pressure_hpa": 986,
			"wind_kt": 55,
			"pressure_drop_hpa": 16,
			"category": "SCS"
		},
		{
			"timestamp": "2023-12-04T15:00:00Z",
			"latitude": 14.3,
			"longitude": 80.4,
			"current_intensity": 3.5,
			"pressure_hpa": 986,
			"wind_kt": 55,
			"pressure_drop_hpa": 16,
			"category": "SCS"
		},
		{
			"timestamp": "2023-12-04T18:00:00Z",
			"latitude": 14.5,
			"longitude": 80.3,
			"current_intensity": 3.5,
			"pressure_hpa": 988,
			"wind_kt": 50,
			"pressure_drop_hpa": 14,
			"category": "SCS"
		},
		{
			"timestamp": "2023-12-04T21:00:00Z",
			"latitude": 14.7,
			"longitude": 80.2,
			"current_intensity": 3.5,
			"pressure_hpa": 988,
			"wind_kt": 50,
			"pressure_drop_hpa": 14,
			"category": "SCS"
		},
		{
			"timestamp": "2023-12-05T00:00:00Z",
			"latitude": 14.9,
			"longitude": 80.2,
			"current_intensity": 3.5,
			"pressure_hpa": 988,
			"wind_kt": 50,
			"pressure_drop_hpa": 14,
			"category": "SCS"
		},
		{
			"timestamp": "2023-12-05T03:00:00Z",
			"latitude": 15.2,
			"longitude": 80.2,
			"current_intensity": 3.5,
			"pressure_hpa": 988,
			"wind_kt": 50,
			"pressure_drop_hpa": 14,
			"category": "SCS"
		},
		{
			"timestamp": "2023-12-05T06:00:00Z",
			"latitude": 15.5,
			"longitude": 80.3,
			"current_intensity": 3,
			"pressure_hpa": 988,
			"wind_kt": 50,
			"pressure_drop_hpa": 14,
			"category": "SCS"
		},
		{
			"timestamp": "2023-12-05T09:00:00Z",
			"latitude": 15.8,
			"longitude": 80.3,
			"current_intensity": null,
			"pressure_hpa": 990,
			"wind_kt": 50,
			"pressure_drop_hpa": 12,
			"category": "SCS"
		},
		{
			"timestamp": "2023-12-05T12:00:00Z",
			"latitude": 16,
			"longitude": 80.3,
			"current_intensity": null,
			"pressure_hpa": 996,
			"wind_kt": 40,
			"pressure_drop_hpa": 8,
			"category": "CS"
		},
		{
			"timestamp": "2023-12-05T15:00:00Z",
			"latitude": 16.4,
			"longitude": 80.4,
			"current_intensity": null,
			"pressure_hpa": 998,
			"wind_kt": 35,
			"pressure_drop_hpa": 7,
			"category": "CS"
		},
		{
			"timestamp": "2023-12-05T18:00:00Z",
			"latitude": 16.8,
			"longitude": 80.4,
			"current_intensity": null,
			"pressure_hpa": 1e3,
			"wind_kt": 30,
			"pressure_drop_hpa": 6,
			"category": "DD"
		},
		{
			"timestamp": "2023-12-06T00:00:00Z",
			"latitude": 17.4,
			"longitude": 80.5,
			"current_intensity": null,
			"pressure_hpa": 1004,
			"wind_kt": 20,
			"pressure_drop_hpa": 3,
			"category": "D"
		}
	]
}.track;
/**
* Gets a cyclone observation by track index safely.
*/
function getObservationByIndex(index) {
	return MICHAUNG_TRACK[Math.max(0, Math.min(index, MICHAUNG_TRACK.length - 1))];
}
/**
* Formats a cyclone intensity category code into human-readable text.
*/
function formatCycloneCategory(category) {
	switch (category) {
		case "D": return "Depression (D)";
		case "DD": return "Deep Depression (DD)";
		case "CS": return "Cyclonic Storm (CS)";
		case "SCS": return "Severe Cyclonic Storm (SCS)";
		case "VSCS": return "Very Severe Cyclonic Storm (VSCS)";
		case "ESCS": return "Extremely Severe Cyclonic Storm (ESCS)";
		case "SuCS": return "Super Cyclonic Storm (SuCS)";
		default: return category;
	}
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
function calculateEnvironmentalRisk$1(vesselLat, vesselLon, cycloneLat, cycloneLon, cycloneWindSpeed) {
	const EARTH_RADIUS_KM = 6371;
	const dLatRad = (cycloneLat - vesselLat) * Math.PI / 180;
	const dLonRad = (cycloneLon - vesselLon) * Math.PI / 180;
	const lat1Rad = vesselLat * Math.PI / 180;
	const lat2Rad = cycloneLat * Math.PI / 180;
	const a = Math.sin(dLatRad / 2) * Math.sin(dLatRad / 2) + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLonRad / 2) * Math.sin(dLonRad / 2);
	const distanceToCycloneKm = EARTH_RADIUS_KM * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
	const MAX_INFLUENCE_RADIUS_KM = 500;
	const rawRisk = Math.max(0, 1 - distanceToCycloneKm / MAX_INFLUENCE_RADIUS_KM) * (.4 + .6 * Math.min(1, Math.max(0, cycloneWindSpeed / 150)));
	const environmentalRisk = Math.min(1, Math.max(0, Number(rawRisk.toFixed(4))));
	const uncertaintyMultiplier = Number((1 + .5 * (Math.min(distanceToCycloneKm, MAX_INFLUENCE_RADIUS_KM) / MAX_INFLUENCE_RADIUS_KM)).toFixed(2));
	let hazardLevel = "LOW";
	if (environmentalRisk >= .75) hazardLevel = "CRITICAL";
	else if (environmentalRisk >= .5) hazardLevel = "HIGH";
	else if (environmentalRisk >= .25) hazardLevel = "MODERATE";
	return {
		distanceToCycloneKm: Number(distanceToCycloneKm.toFixed(2)),
		environmentalRisk,
		uncertaintyMultiplier,
		hazardLevel
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
function scaleZonesWithUncertainty(baseZones, uncertaintyMultiplier) {
	const scaleFactor = Math.max(1, uncertaintyMultiplier);
	const dispersionShift = (scaleFactor - 1) * .15;
	const rawZones = baseZones.map((z) => {
		const rx = Math.round(z.rx * scaleFactor);
		const ry = Math.round(z.ry * scaleFactor);
		let prob = z.probability;
		if (z.id === "A") prob = Math.max(.3, z.probability - dispersionShift);
		else prob = z.probability + dispersionShift / (baseZones.length - 1);
		return {
			...z,
			rx,
			ry,
			probability: prob
		};
	});
	const totalProb = rawZones.reduce((sum, z) => sum + z.probability, 0);
	return rawZones.map((z) => ({
		...z,
		probability: Number((z.probability / totalProb).toFixed(4))
	}));
}
/**
* Deterministic test runner verifying environmental risk engine behavior:
* 1. Far cyclone distance yields lower risk and narrower uncertainty multiplier.
* 2. Near cyclone distance yields higher risk and wider uncertainty multiplier.
* 3. Search zone probability masses normalize strictly to 1.0 (100%).
*/
function runCycloneRiskTests() {
	const vessel = {
		lat: 13.04,
		lon: 80.52
	};
	const farResult = calculateEnvironmentalRisk$1(vessel.lat, vessel.lon, 9.1, 86.4, 25);
	const farProbSum = scaleZonesWithUncertainty(ZONES, farResult.uncertaintyMultiplier).reduce((sum, z) => sum + z.probability, 0);
	const nearResult = calculateEnvironmentalRisk$1(vessel.lat, vessel.lon, 13.5, 80.8, 50);
	const nearProbSum = scaleZonesWithUncertainty(ZONES, nearResult.uncertaintyMultiplier).reduce((sum, z) => sum + z.probability, 0);
	const isFarLowerRisk = farResult.environmentalRisk < nearResult.environmentalRisk;
	const isFarLowerUncertainty = farResult.uncertaintyMultiplier < nearResult.uncertaintyMultiplier;
	const isFarProbSumNormalized = Math.abs(farProbSum - 1) < .005;
	const isNearProbSumNormalized = Math.abs(nearProbSum - 1) < .005;
	const passed = isFarLowerRisk && isFarLowerUncertainty && isFarProbSumNormalized && isNearProbSumNormalized;
	return {
		passed,
		farScenario: {
			distanceKm: farResult.distanceToCycloneKm,
			risk: farResult.environmentalRisk,
			uncertainty: farResult.uncertaintyMultiplier,
			hazardLevel: farResult.hazardLevel
		},
		nearScenario: {
			distanceKm: nearResult.distanceToCycloneKm,
			risk: nearResult.environmentalRisk,
			uncertainty: nearResult.uncertaintyMultiplier,
			hazardLevel: nearResult.hazardLevel
		},
		probabilityNormalized: isFarProbSumNormalized && isNearProbSumNormalized,
		totalProbabilitySum: Number(nearProbSum.toFixed(4)),
		message: passed ? "All environmental risk & uncertainty tests passed successfully. Probabilities normalized to 1.0." : "Test failure: risk engine or probability normalization criteria not met."
	};
}
function CycloneStatusCard({ currentObservation, currentIndex, onIndexChange, riskResult }) {
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
	const [testResults, setTestResults] = (0, import_react.useState)(null);
	const handlePrev = () => {
		onIndexChange(Math.max(0, currentIndex - 1));
	};
	const handleNext = () => {
		onIndexChange(Math.min(MICHAUNG_TRACK.length - 1, currentIndex + 1));
	};
	const hazardToneClass = riskResult.hazardLevel === "CRITICAL" ? "text-emergency border-emergency/40 bg-emergency/15" : riskResult.hazardLevel === "HIGH" ? "text-warning border-warning/40 bg-warning/15" : riskResult.hazardLevel === "MODERATE" ? "text-cyan border-cyan/40 bg-cyan/15" : "text-success border-success/40 bg-success/15";
	const runTests = () => {
		const res = runCycloneRiskTests();
		setTestResults(res);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass scan-sheen flex shrink-0 flex-col rounded-lg p-3.5 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border/80 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-7 place-items-center rounded bg-warning/20 border border-warning/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudLightning, { className: "size-4 text-warning" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-sm font-bold tracking-wider text-foreground",
						children: "CYCLONE MICHAUNG"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[9px] font-semibold text-warning tracking-widest uppercase",
							children: "HISTORICAL SCENARIO"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[9px] text-muted-foreground",
							children: "· IMD Track Data"
						})]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded bg-accent/60 px-2 py-0.5 font-mono text-[10px] font-medium text-cyan border border-border",
					children: formatCycloneCategory(currentObservation.category)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded border border-border/60 bg-abyss/40 p-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "data-key text-[9px]",
								children: "Historical Position"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "data-value text-xs font-bold text-foreground mt-0.5",
								children: [
									currentObservation.latitude.toFixed(1),
									"°N, ",
									currentObservation.longitude.toFixed(1),
									"°E"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[9px] text-muted-foreground mt-0.5",
								children: "Observed IMD Center"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded border border-border/60 bg-abyss/40 p-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "data-key text-[9px]",
								children: "Observation Time"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "data-value text-xs font-semibold text-cyan mt-0.5",
								children: currentObservation.timestamp.replace("T", " ").replace(":00Z", " UTC")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[9px] text-muted-foreground mt-0.5",
								children: "Dec 2023 Best Track"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded border border-border/60 bg-abyss/40 p-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "data-key text-[9px]",
									children: "Wind Speed"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, { className: "size-3 text-cyan-dim" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "data-value text-xs font-bold text-warning mt-0.5",
								children: [currentObservation.wind_kt, " kts"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[9px] text-muted-foreground mt-0.5",
								children: [(currentObservation.wind_kt * 1.852).toFixed(0), " km/h max sustained"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded border border-border/60 bg-abyss/40 p-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "data-key text-[9px]",
									children: "Central Pressure"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "size-3 text-cyan-dim" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "data-value text-xs font-semibold text-foreground mt-0.5",
								children: [currentObservation.pressure_hpa, " hPa"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[9px] text-muted-foreground mt-0.5",
								children: [
									"-",
									currentObservation.pressure_drop_hpa,
									" hPa drop"
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border border-border/80 bg-accent/20 p-2.5 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "data-key text-[10px]",
						children: "Simulated Environmental Risk"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `rounded px-1.5 py-0.5 font-mono text-[10px] font-bold border ${hazardToneClass}`,
						children: ["HAZARD: ", riskResult.hazardLevel]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-2 text-center pt-1 border-t border-border/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "data-key text-[8px]",
							children: "Risk Score"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-mono text-sm font-bold text-warning",
							children: [(riskResult.environmentalRisk * 100).toFixed(0), "%"]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "data-key text-[8px]",
							children: "Uncertainty"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-mono text-sm font-bold text-cyan",
							children: [riskResult.uncertaintyMultiplier.toFixed(2), "x"]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "data-key text-[8px]",
							children: "Cyclone Distance"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-mono text-sm font-bold text-foreground",
							children: [riskResult.distanceToCycloneKm.toFixed(0), " km"]
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5 border-t border-border/60 pt-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-[10px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "data-key",
						children: "Historical Time Control"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-muted-foreground",
						children: [
							"Track Pt ",
							currentIndex + 1,
							" / ",
							MICHAUNG_TRACK.length
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handlePrev,
							disabled: currentIndex === 0,
							className: "rounded border border-border bg-accent/40 p-1.5 text-foreground hover:bg-cyan/20 disabled:opacity-30",
							title: "Previous Observation",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipBack, { className: "size-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: MICHAUNG_TRACK.length - 1,
							value: currentIndex,
							onChange: (e) => onIndexChange(Number(e.target.value)),
							className: "h-1.5 flex-1 cursor-pointer accent-cyan bg-accent rounded"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleNext,
							disabled: currentIndex === MICHAUNG_TRACK.length - 1,
							className: "rounded border border-border bg-accent/40 p-1.5 text-foreground hover:bg-cyan/20 disabled:opacity-30",
							title: "Next Observation",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { className: "size-3.5" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border/60 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: runTests,
					className: "flex w-full items-center justify-center gap-1.5 rounded border border-cyan/40 bg-cyan/10 px-2.5 py-1.5 font-mono text-[10px] font-semibold text-cyan hover:bg-cyan/20 transition-all",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), "RUN RISK ENGINE TEST VERIFICATION"]
				}), testResults && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 rounded border border-border bg-abyss/60 p-2 text-[10px] space-y-1 font-mono",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Test Suite Status:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: testResults.passed ? "text-success font-bold" : "text-emergency font-bold",
								children: testResults.passed ? "PASSED (100%)" : "FAILED"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-muted-foreground text-[9px] leading-tight",
							children: [
								"Far: ",
								testResults.farScenario.distanceKm,
								"km → Risk ",
								(testResults.farScenario.risk * 100).toFixed(0),
								"% | Near: ",
								testResults.nearScenario.distanceKm,
								"km → Risk ",
								(testResults.nearScenario.risk * 100).toFixed(0),
								"%"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-success text-[9px]",
							children: [
								"Probability Normalization: ",
								testResults.totalProbabilitySum,
								" (Sum = 1.0)"
							]
						})
					]
				})]
			})
		]
	});
}
function PredictionResultsPanel({ prediction, risk, searchZones, candidates }) {
	const top5Zones = searchZones.slice(0, 5);
	const topCandidates = candidates.slice(0, 5);
	const hazardTone = risk.hazardLevel === "HIGH" ? "text-emergency border-emergency/40 bg-emergency/15" : risk.hazardLevel === "MEDIUM" ? "text-warning border-warning/40 bg-warning/15" : "text-success border-success/40 bg-success/15";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass scan-sheen flex flex-col rounded-lg p-3.5 space-y-3 text-xs",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border/80 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-7 place-items-center rounded bg-cyan/20 border border-cyan/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-4 text-cyan" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-sm font-bold tracking-wider text-foreground",
						children: "DETERMINISTIC ENGINE RESULTS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "data-key text-[9px]",
						children: "4-Engine Execution Pipeline"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `rounded px-2 py-0.5 font-mono text-[10px] font-bold border ${hazardTone}`,
					children: ["HAZARD: ", risk.hazardLevel]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded border border-border/60 bg-abyss/50 p-2 space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 text-cyan",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "data-key text-[9px]",
								children: "Predicted Fix"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "data-value text-xs font-bold text-foreground",
							children: [prediction.predictedLatitude.toFixed(4), "°N"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "data-value text-xs font-bold text-foreground",
							children: [prediction.predictedLongitude.toFixed(4), "°E"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[9px] text-muted-foreground pt-0.5",
							children: [
								"Drift: ",
								prediction.distanceTravelledKm.toFixed(2),
								" km"
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded border border-border/60 bg-abyss/50 p-2 space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 text-warning",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "data-key text-[9px]",
								children: "Risk Engine"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-baseline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] text-muted-foreground",
								children: "Env Risk:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "data-value text-xs font-bold text-warning",
								children: [(risk.environmentalRisk * 100).toFixed(0), "%"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-baseline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] text-muted-foreground",
								children: "Uncertainty:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "data-value text-xs font-bold text-cyan",
								children: [risk.uncertaintyMultiplier.toFixed(2), "x"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-baseline text-[9px] text-muted-foreground pt-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cyclone Dist:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [risk.distanceToCycloneKm.toFixed(0), " km"] })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5 border-t border-border/60 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "data-key flex items-center gap-1 text-[10px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3 text-cyan" }), " Top 5 Search Zones"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[9px] text-muted-foreground font-mono",
						children: "Normalized Probability"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-1",
					children: top5Zones.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded border border-border/40 bg-accent/20 px-2 py-1 text-[10px] font-mono",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-cyan",
								children: z.id
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [
									"(",
									z.latitude.toFixed(3),
									"°, ",
									z.longitude.toFixed(3),
									"°)"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-foreground font-bold",
								children: [(z.probability * 100).toFixed(1), "%"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded bg-accent px-1 text-[8px] text-muted-foreground",
								children: ["P", z.priority]
							})]
						})]
					}, z.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5 border-t border-border/60 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "data-key flex items-center gap-1 text-[10px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ship, { className: "size-3 text-cyan" }), " Top Rescue Candidates"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[9px] text-muted-foreground font-mono",
						children: "Lowest Cost First"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-1",
					children: topCandidates.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded border border-border/40 bg-abyss/40 px-2 py-1 text-[10px] font-mono",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-foreground",
								children: [
									"#",
									i + 1,
									" ",
									c.assetId
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-cyan",
								children: ["→ ", c.zoneId]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-[9px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [
									c.responseTimeMinutes.toFixed(0),
									"m (",
									c.distanceKm.toFixed(1),
									"km)"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-warning",
								children: ["Cost: ", c.totalCost.toFixed(0)]
							})]
						})]
					}, `${c.assetId}-${c.zoneId}`))
				})]
			})
		]
	});
}
function AISettingsModal({ isOpen, onClose, provider, onProviderChange, geminiKey, onGeminiKeyChange, mistralKey, onMistralKeyChange, groqKey, onGroqKeyChange, openrouterKey, openRouterKey, onOpenrouterKeyChange, onOpenRouterKeyChange, ollamaModel = "gemma4:latest", onOllamaModelChange }) {
	const initialOpenRouterKey = openRouterKey ?? openrouterKey ?? "";
	const handleOpenRouterKeySave = onOpenRouterKeyChange ?? onOpenrouterKeyChange;
	const [tempProvider, setTempProvider] = (0, import_react.useState)(provider);
	const [tempGeminiKey, setTempGeminiKey] = (0, import_react.useState)(geminiKey);
	const [tempMistralKey, setTempMistralKey] = (0, import_react.useState)(mistralKey);
	const [tempGroqKey, setTempGroqKey] = (0, import_react.useState)(groqKey);
	const [tempOpenRouterKey, setTempOpenRouterKey] = (0, import_react.useState)(initialOpenRouterKey);
	const [tempOllamaModel, setTempOllamaModel] = (0, import_react.useState)(ollamaModel);
	const [savedSuccess, setSavedSuccess] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setTempProvider(provider);
		setTempGeminiKey(geminiKey);
		setTempMistralKey(mistralKey);
		setTempGroqKey(groqKey);
		setTempOpenRouterKey(initialOpenRouterKey);
		setTempOllamaModel(ollamaModel || "gemma4:latest");
	}, [
		provider,
		geminiKey,
		mistralKey,
		groqKey,
		initialOpenRouterKey,
		ollamaModel,
		isOpen
	]);
	if (!isOpen) return null;
	const handleSave = () => {
		onProviderChange(tempProvider);
		onGeminiKeyChange(tempGeminiKey.trim());
		onMistralKeyChange(tempMistralKey.trim());
		onGroqKeyChange(tempGroqKey.trim());
		if (handleOpenRouterKeySave) handleOpenRouterKeySave(tempOpenRouterKey.trim());
		if (onOllamaModelChange) onOllamaModelChange(tempOllamaModel.trim() || "gemma4:latest");
		setSavedSuccess(true);
		setTimeout(() => {
			setSavedSuccess(false);
			onClose();
		}, 800);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-abyss/80 backdrop-blur-sm p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass flex w-full max-w-md flex-col rounded-xl border border-cyan/40 p-5 shadow-2xl space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-8 place-items-center rounded bg-cyan/20 border border-cyan/50 text-cyan",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-sm font-bold tracking-wider text-foreground",
							children: "AI PROVIDER CONFIGURATION"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "data-key text-[9px]",
							children: "Select Model & Manage API Keys"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "data-key flex items-center gap-1.5 text-xs font-semibold text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-3.5 text-cyan" }), " Active AI Model Provider"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setTempProvider("OLLAMA"),
								className: `flex flex-col items-center justify-center rounded-lg border p-2 text-center transition-all ${tempProvider === "OLLAMA" ? "border-purple-400 bg-purple-500/15 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.2)]" : "border-border bg-accent/30 text-muted-foreground hover:border-foreground/40"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-[11px] font-bold",
									children: "Ollama (Local)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[8px] opacity-80",
									children: "gemma4:latest"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setTempProvider("OPENROUTER"),
								className: `flex flex-col items-center justify-center rounded-lg border p-2 text-center transition-all ${tempProvider === "OPENROUTER" ? "border-emerald-400 bg-emerald-500/15 text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.2)]" : "border-border bg-accent/30 text-muted-foreground hover:border-foreground/40"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-[11px] font-bold",
									children: "OpenRouter"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[8px] opacity-80",
									children: "gpt-oss-120b"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setTempProvider("GEMINI"),
								className: `flex flex-col items-center justify-center rounded-lg border p-2 text-center transition-all ${tempProvider === "GEMINI" ? "border-cyan bg-cyan/15 text-cyan shadow-[var(--glow-cyan)]" : "border-border bg-accent/30 text-muted-foreground hover:border-foreground/40"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-[11px] font-bold",
									children: "Google Gemini"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[8px] opacity-80",
									children: "gemini-2.5-flash"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setTempProvider("MISTRAL"),
								className: `flex flex-col items-center justify-center rounded-lg border p-2 text-center transition-all ${tempProvider === "MISTRAL" ? "border-warning bg-warning/15 text-warning shadow-[0_0_12px_rgba(245,158,11,0.2)]" : "border-border bg-accent/30 text-muted-foreground hover:border-foreground/40"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-[11px] font-bold",
									children: "Mistral AI"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[8px] opacity-80",
									children: "mistral-small"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setTempProvider("GROQ"),
								className: `flex flex-col items-center justify-center rounded-lg border p-2 text-center transition-all ${tempProvider === "GROQ" ? "border-success bg-success/15 text-success shadow-[0_0_12px_rgba(34,197,94,0.2)]" : "border-border bg-accent/30 text-muted-foreground hover:border-foreground/40"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-[11px] font-bold",
									children: "Groq Cloud"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[8px] opacity-80",
									children: "gpt-oss-120b"
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2.5 border-t border-border pt-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "data-key flex items-center justify-between text-[11px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 text-purple-400 font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-3" }), " Ollama Local Model Name"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] text-success font-semibold",
									children: "http://localhost:11434 (Active)"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "e.g. gemma4:latest, gemma2, llama3.2...",
								value: tempOllamaModel,
								onChange: (e) => setTempOllamaModel(e.target.value),
								className: "w-full rounded border border-border bg-abyss/80 px-3 py-1 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-purple-400 focus:outline-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "data-key flex items-center justify-between text-[11px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 text-emerald-400 font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "size-3" }), " OpenRouter API Key"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] text-muted-foreground",
									children: "openrouter.ai/keys"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								placeholder: "Paste OPENROUTER_API_KEY (sk-or-v1-...)",
								value: tempOpenRouterKey,
								onChange: (e) => setTempOpenRouterKey(e.target.value),
								className: "w-full rounded border border-border bg-abyss/80 px-3 py-1 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-emerald-400 focus:outline-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "data-key flex items-center justify-between text-[11px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 text-cyan",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "size-3" }), " Google Gemini API Key"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] text-muted-foreground",
									children: "aistudio.google.com"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								placeholder: "Paste GEMINI_API_KEY...",
								value: tempGeminiKey,
								onChange: (e) => setTempGeminiKey(e.target.value),
								className: "w-full rounded border border-border bg-abyss/80 px-3 py-1 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-cyan focus:outline-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "data-key flex items-center justify-between text-[11px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 text-warning",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "size-3" }), " Mistral AI API Key"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] text-muted-foreground",
									children: "console.mistral.ai"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								placeholder: "Paste MISTRAL_API_KEY...",
								value: tempMistralKey,
								onChange: (e) => setTempMistralKey(e.target.value),
								className: "w-full rounded border border-border bg-abyss/80 px-3 py-1 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-warning focus:outline-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "data-key flex items-center justify-between text-[11px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 text-success",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "size-3" }), " Groq API Key"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] text-muted-foreground",
									children: "console.groq.com"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								placeholder: "Paste GROQ_API_KEY (gsk_...)",
								value: tempGroqKey,
								onChange: (e) => setTempGroqKey(e.target.value),
								className: "w-full rounded border border-border bg-abyss/80 px-3 py-1 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-success focus:outline-none"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-t border-border pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 text-[10px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3 text-success" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Keys stored locally" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							className: "rounded border border-border bg-accent/40 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleSave,
							className: "flex items-center gap-1.5 rounded bg-cyan/20 border border-cyan/50 px-4 py-1.5 font-display text-xs font-semibold text-cyan hover:bg-cyan/30",
							children: [savedSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-success" }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: savedSuccess ? "Saved!" : "Save Settings" })]
						})]
					})]
				})
			]
		})
	});
}
function FailureComparisonPanel({ failedAssetId, before, after, onDismiss }) {
	const deltaTime = (after.topCandidate?.responseTimeMinutes ?? 0) - (before.topCandidate?.responseTimeMinutes ?? 0);
	const deltaCost = (after.topCandidate?.totalCost ?? 0) - (before.topCandidate?.totalCost ?? 0);
	const assetChanged = before.selectedAsset !== after.selectedAsset;
	const zoneChanged = before.selectedZone !== after.selectedZone;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass scan-sheen rounded-lg border border-emergency/40 bg-emergency/5 p-3.5 space-y-3 animate-[fadeInSlide_0.35s_ease-out]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-emergency/30 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-6 place-items-center rounded bg-emergency/20 border border-emergency/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5 text-emergency" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-sm font-bold tracking-wider text-emergency",
						children: "ASSET FAILURE SIMULATION"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "data-key text-[9px]",
						children: "Contingency Re-Tasking Active"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onDismiss,
					className: "rounded border border-border bg-accent/40 px-2 py-0.5 font-mono text-[9px] text-muted-foreground hover:border-emergency/40 hover:text-emergency transition-colors",
					children: "DISMISS"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 rounded border border-emergency/50 bg-emergency/10 px-3 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5 text-emergency shrink-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs font-bold text-emergency",
						children: failedAssetId
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-muted-foreground",
						children: "— marked UNAVAILABLE, removed from candidate pool"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[1fr_auto_1fr] gap-2 items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 rounded border border-border/60 bg-abyss/60 p-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "data-key text-[9px] text-cyan mb-1",
								children: "BEFORE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-xs font-bold text-foreground",
								children: before.selectedAsset
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-mono text-[10px] text-cyan",
								children: ["→ ", before.selectedZone]
							}),
							before.topCandidate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-0.5 mt-1 text-[9px] text-muted-foreground font-mono",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										"ETA: ",
										before.topCandidate.responseTimeMinutes.toFixed(0),
										" min"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Cost: ", before.topCandidate.totalCost.toFixed(1)] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										"Dist: ",
										before.topCandidate.distanceKm.toFixed(1),
										" km"
									] })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-emergency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[8px] text-emergency font-bold",
							children: "FAIL"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 rounded border border-success/40 bg-success/5 p-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "data-key text-[9px] text-success mb-1",
							children: "AFTER"
						}), after.selectedAsset !== "NONE" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `font-mono text-xs font-bold ${assetChanged ? "text-warning" : "text-foreground"}`,
								children: [after.selectedAsset, assetChanged && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 text-[9px] text-warning",
									children: "↺ CHANGED"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `font-mono text-[10px] ${zoneChanged ? "text-warning" : "text-cyan"}`,
								children: [
									"→ ",
									after.selectedZone,
									zoneChanged && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1 text-[9px]",
										children: "↺"
									})
								]
							}),
							after.topCandidate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-0.5 mt-1 text-[9px] font-mono",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: deltaTime > 0 ? "text-warning" : "text-muted-foreground",
										children: [
											"ETA: ",
											after.topCandidate.responseTimeMinutes.toFixed(0),
											" min",
											deltaTime > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "ml-1 text-warning",
												children: ["+", deltaTime.toFixed(0)]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: deltaCost > 0 ? "text-warning" : "text-muted-foreground",
										children: [
											"Cost: ",
											after.topCandidate.totalCost.toFixed(1),
											deltaCost > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "ml-1 text-warning",
												children: ["+", deltaCost.toFixed(1)]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-muted-foreground",
										children: [
											"Dist: ",
											after.topCandidate.distanceKm.toFixed(1),
											" km"
										]
									})
								]
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-xs text-emergency font-bold",
							children: "NO FEASIBLE ASSET"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2 border-t border-border/60 pt-2",
				children: [
					deltaTime > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 rounded border border-warning/40 bg-warning/10 px-2 py-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[9px] text-warning font-bold",
							children: [
								"+",
								deltaTime.toFixed(0),
								" min response delay"
							]
						})]
					}),
					deltaCost > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 rounded border border-warning/40 bg-warning/10 px-2 py-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "size-3 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[9px] text-warning font-bold",
							children: [
								"Cost +",
								deltaCost.toFixed(1),
								" (scoring engine)"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 rounded border border-border bg-accent/30 px-2 py-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[9px] text-muted-foreground",
							children: [
								after.candidateCount,
								" candidate",
								after.candidateCount !== 1 ? "s" : "",
								" remaining"
							]
						})]
					})
				]
			})
		]
	});
}
var SCENARIOS = [
	{
		key: "NORMAL_CONDITIONS",
		label: "Normal Conditions",
		sublabel: "Calm seas, 5 kt wind, 0.5 kt current",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud, { className: "size-3.5" }),
		tone: "success",
		tag: "SIMULATED"
	},
	{
		key: "CYCLONE_MICHAUNG",
		label: "Cyclone Michaung",
		sublabel: "Historical IMD best-track data (Dec 2023)",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, { className: "size-3.5" }),
		tone: "warning",
		tag: "HISTORICAL"
	},
	{
		key: "SEVERE_STORM",
		label: "Severe Storm Simulation",
		sublabel: "Synthetic 120 kt storm at 80 km from vessel",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5" }),
		tone: "emergency",
		tag: "SIMULATED"
	},
	{
		key: "CUSTOM",
		label: "Custom Environment",
		sublabel: "Operator sliders: dynamic wind, current & sea state",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-3.5" }),
		tone: "cyan",
		tag: "CUSTOM"
	}
];
var TONE_STYLES = {
	success: {
		selected: "border-success/60 bg-success/15 text-success",
		idle: "border-border bg-accent/20 text-muted-foreground hover:border-success/40 hover:text-success",
		tag: "bg-success/20 text-success border-success/40",
		icon: "text-success"
	},
	warning: {
		selected: "border-warning/60 bg-warning/15 text-warning",
		idle: "border-border bg-accent/20 text-muted-foreground hover:border-warning/40 hover:text-warning",
		tag: "bg-warning/20 text-warning border-warning/40",
		icon: "text-warning"
	},
	emergency: {
		selected: "border-emergency/60 bg-emergency/15 text-emergency",
		idle: "border-border bg-accent/20 text-muted-foreground hover:border-emergency/40 hover:text-emergency",
		tag: "bg-emergency/20 text-emergency border-emergency/40",
		icon: "text-emergency"
	},
	cyan: {
		selected: "border-cyan/60 bg-cyan/15 text-cyan",
		idle: "border-border bg-accent/20 text-muted-foreground hover:border-cyan/40 hover:text-cyan",
		tag: "bg-cyan/20 text-cyan border-cyan/40",
		icon: "text-cyan"
	}
};
function EnvironmentScenarioSelector({ value, onChange, disabled = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-lg border border-border p-3 space-y-2 shrink-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "data-key flex items-center gap-1.5 text-[10px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, { className: "size-3 text-cyan" }), "Environmental Scenario"]
				}), value === "CUSTOM" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1 rounded border border-cyan/40 bg-cyan/20 px-1.5 py-0.5 font-mono text-[8px] text-cyan font-bold animate-pulse",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1 rounded-full bg-cyan blink" }), "LIVE SIMULATION"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded border border-cyan/30 bg-cyan/10 px-1.5 py-0.5 font-mono text-[8px] text-cyan font-bold",
					children: "SCENARIO"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-1.5",
				children: SCENARIOS.map((s) => {
					const isSelected = value === s.key;
					const styles = TONE_STYLES[s.tone];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => !disabled && onChange(s.key),
						disabled,
						className: `w-full flex items-center justify-between gap-2 rounded border px-2.5 py-2 text-left transition-all duration-200 disabled:opacity-40 ${isSelected ? styles.selected : styles.idle}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: isSelected ? styles.icon : "text-muted-foreground",
								children: s.icon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-[11px] font-semibold tracking-wide truncate",
									children: s.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-[9px] text-muted-foreground truncate",
									children: s.sublabel
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 shrink-0",
							children: [s.tag && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded border px-1.5 py-0.5 font-mono text-[8px] font-bold ${styles.tag}`,
								children: s.tag
							}), isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: `size-3.5 ${styles.icon}` })]
						})]
					}, s.key);
				})
			}),
			value === "CUSTOM" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded border border-cyan/40 bg-cyan/10 px-2 py-1.5 font-mono text-[9px] text-cyan leading-relaxed flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-cyan blink" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⚡ LIVE SIMULATION ACTIVE — Operator sliders dynamically driving environmental risk pipeline and search probability grid." })]
			}),
			value === "CYCLONE_MICHAUNG" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded border border-warning/30 bg-warning/5 px-2 py-1.5 font-mono text-[9px] text-warning/80 leading-relaxed",
				children: "🌀 Using IMD Best-Track Dataset — Closest observation to scenario timestamp loaded. All values are historical. Rescue scenario data is SIMULATED."
			}),
			value === "SEVERE_STORM" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded border border-emergency/30 bg-emergency/5 px-2 py-1.5 font-mono text-[9px] text-emergency/80 leading-relaxed",
				children: "⚠ Synthetic storm parameters injected at 80 km from vessel datum. No real meteorological data used. Routing hazard penalties maximised."
			}),
			value === "NORMAL_CONDITIONS" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded border border-success/30 bg-success/5 px-2 py-1.5 font-mono text-[9px] text-success/80 leading-relaxed",
				children: "✓ Baseline environmental conditions. Cyclone influence nullified. Uncertainty multiplier at minimum (1.0x)."
			})
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
objectType({
	incidentType: enumType([
		"FLOODING",
		"ENGINE_FAILURE",
		"LOST_CONTACT",
		"MEDICAL_EMERGENCY",
		"NAVIGATION_HAZARD"
	]),
	urgency: numberType().int().min(1).max(5),
	crewAtRisk: numberType().int().min(0),
	summary: stringType()
});
var runTriageOnServer = createServerFn({ method: "POST" }).validator(objectType({
	rawText: stringType(),
	provider: enumType([
		"GEMINI",
		"MISTRAL",
		"GROQ",
		"OPENROUTER",
		"OLLAMA"
	]).optional(),
	geminiApiKey: stringType().optional(),
	mistralApiKey: stringType().optional(),
	groqApiKey: stringType().optional(),
	openrouterApiKey: stringType().optional(),
	openRouterApiKey: stringType().optional(),
	ollamaModel: stringType().optional()
})).handler(createSsrRpc("baa0676f1070d423137b3e9b4e13d8a8989b0386bef6a2bf6dc19c73e74084b6"));
function parseTriageFallback(rawText) {
	const textUpper = rawText.toUpperCase();
	let incidentType = "LOST_CONTACT";
	if (textUpper.includes("SINK") || textUpper.includes("WATER") || textUpper.includes("FLOOD") || textUpper.includes("LEAK") || textUpper.includes("SUBMERGE") || textUpper.includes("HULL BREACH")) incidentType = "FLOODING";
	else if (textUpper.includes("ENGINE") || textUpper.includes("POWER") || textUpper.includes("MOTOR") || textUpper.includes("PROPULSION") || textUpper.includes("STEER") || textUpper.includes("MECHANICAL") || textUpper.includes("DEAD IN WATER") || textUpper.includes("BLACKOUT")) incidentType = "ENGINE_FAILURE";
	else if (textUpper.includes("MED") || textUpper.includes("INJUR") || textUpper.includes("PATIENT") || textUpper.includes("HEART") || textUpper.includes("EVAC") || textUpper.includes("DOCTOR") || textUpper.includes("CASUALTY")) incidentType = "MEDICAL_EMERGENCY";
	else if (textUpper.includes("CONTAINER") || textUpper.includes("REEF") || textUpper.includes("HAZARD") || textUpper.includes("COLLISION") || textUpper.includes("DEBRIS") || textUpper.includes("SHOAL")) incidentType = "NAVIGATION_HAZARD";
	else if (textUpper.includes("LOST") || textUpper.includes("AIS") || textUpper.includes("MISSING") || textUpper.includes("OVERDUE") || textUpper.includes("SILENCE") || textUpper.includes("CONTACT")) incidentType = "LOST_CONTACT";
	else incidentType = "ENGINE_FAILURE";
	let crewAtRisk = 3;
	const matchCrew = rawText.match(/(\d+)\s*(pob|crew|person|persons|people|people aboard|members)/i);
	if (matchCrew && matchCrew[1]) crewAtRisk = parseInt(matchCrew[1], 10);
	let urgency = 4;
	if (textUpper.includes("MAYDAY") || textUpper.includes("SINKING") || textUpper.includes("CRITICAL")) urgency = 5;
	else if (textUpper.includes("URGENT") || textUpper.includes("DISTRESS")) urgency = 4;
	else if (textUpper.includes("LOW") || textUpper.includes("MINOR")) urgency = 2;
	return {
		incidentType,
		urgency,
		crewAtRisk,
		summary: rawText.length > 120 ? rawText.slice(0, 117) + "..." : rawText
	};
}
/**
* MSAR Triage Agent — Client entry point.
* Calls the server function which runs server-side (no CORS, secure keys).
* Falls back to deterministic rule-based classifier if the server call fails.
*/
async function runTriageAgent(input) {
	try {
		return await runTriageOnServer({ data: {
			rawText: input.rawText,
			provider: input.provider,
			geminiApiKey: input.geminiApiKey,
			mistralApiKey: input.mistralApiKey,
			groqApiKey: input.groqApiKey,
			openrouterApiKey: input.openrouterApiKey,
			openRouterApiKey: input.openRouterApiKey,
			ollamaModel: input.ollamaModel
		} });
	} catch (err) {
		console.warn("[MSAR Triage] Server function call failed, using fallback:", err);
		return parseTriageFallback(input.rawText);
	}
}
objectType({
	headline: stringType(),
	assetSelectionRationale: stringType(),
	zonePriorityRationale: stringType(),
	rejectedAssetsRationale: stringType(),
	environmentalImpactRationale: stringType(),
	contingencyRationale: stringType().optional(),
	fullBriefing: stringType()
});
var runCopilotOnServer = createServerFn({ method: "POST" }).validator(objectType({
	incident: anyType().optional(),
	predictedPosition: anyType().optional(),
	environmentalRisk: anyType().optional(),
	searchZones: arrayType(anyType()),
	candidates: arrayType(anyType()),
	selectedAsset: stringType(),
	selectedZone: stringType(),
	route: anyType().optional(),
	failedAssetId: stringType().optional(),
	question: stringType().optional(),
	provider: enumType([
		"GEMINI",
		"MISTRAL",
		"GROQ",
		"OPENROUTER",
		"OLLAMA"
	]).optional(),
	geminiApiKey: stringType().optional(),
	mistralApiKey: stringType().optional(),
	groqApiKey: stringType().optional(),
	openrouterApiKey: stringType().optional(),
	openRouterApiKey: stringType().optional(),
	ollamaModel: stringType().optional()
})).handler(createSsrRpc("a5c81c9f55c2de11d424e7905fd5c9cb48eb5e4128a9eabe2da482570eb31efb"));
function parseCopilotFallback(input) {
	const { selectedAsset, selectedZone, searchZones = [], candidates = [], environmentalRisk, failedAssetId, predictedPosition } = input;
	const bestCandidate = candidates.find((c) => c.assetId === selectedAsset && c.zoneId === selectedZone) || candidates[0];
	const targetZone = searchZones.find((z) => z.id === selectedZone) || searchZones[0];
	const probText = targetZone ? `${(targetZone.probability * 100).toFixed(1)}%` : "unavailable";
	let assetSelectionRationale;
	if (bestCandidate) assetSelectionRationale = `${selectedAsset} was selected for ${selectedZone} because the scoring engine ranked it as the lowest-cost candidate.\n• Response time: ${bestCandidate.responseTimeMinutes.toFixed(0)} min\n• Distance: ${bestCandidate.distanceKm.toFixed(1)} km\n• Total cost: ${bestCandidate.totalCost.toFixed(1)} (response time + hazard penalty ${bestCandidate.hazardPenalty.toFixed(1)} + capability penalty ${bestCandidate.capabilityPenalty.toFixed(1)})\n• Endurance feasible: ${bestCandidate.enduranceFeasible ? "YES" : "NO"}`;
	else assetSelectionRationale = `${selectedAsset} was selected to cover ${selectedZone}. Detailed scoring data is not available.`;
	let zonePriorityRationale;
	if (targetZone) {
		const secondZone = searchZones.find((z) => z.priority === 2);
		zonePriorityRationale = `${targetZone.id} is the highest-priority search zone (priority ${targetZone.priority}) with ${probText} probability.\nIt is centered at ${targetZone.latitude.toFixed(4)}°N, ${targetZone.longitude.toFixed(4)}°E — the cell closest to the predicted vessel fix.\nThe probability engine uses a Gaussian decay model: cells nearer the predicted position receive exponentially higher weight, then all 25 cells are normalized so probabilities sum to 100%.` + (secondZone ? `\nNext highest: ${secondZone.id} at ${(secondZone.probability * 100).toFixed(1)}% (priority ${secondZone.priority}).` : "");
	} else zonePriorityRationale = `Zone priority data is not available in the current system state.`;
	const assetBestMap = /* @__PURE__ */ new Map();
	for (const c of candidates) {
		if (c.assetId === selectedAsset) continue;
		const existing = assetBestMap.get(c.assetId);
		if (!existing || c.totalCost < existing.totalCost) assetBestMap.set(c.assetId, c);
	}
	let rejectedAssetsRationale;
	if (assetBestMap.size > 0) rejectedAssetsRationale = `Other available assets were evaluated but ranked lower:\n${Array.from(assetBestMap.entries()).map(([assetId, c]) => {
		const reasons = [];
		if (c.responseTimeMinutes > (bestCandidate?.responseTimeMinutes ?? 0)) reasons.push(`slower response (${c.responseTimeMinutes.toFixed(0)} min vs ${bestCandidate?.responseTimeMinutes.toFixed(0) ?? "?"} min)`);
		if (c.totalCost > (bestCandidate?.totalCost ?? 0)) reasons.push(`higher total cost (${c.totalCost.toFixed(1)} vs ${bestCandidate?.totalCost.toFixed(1) ?? "?"})`);
		if (!c.enduranceFeasible) reasons.push("insufficient endurance for mission radius");
		if (c.capabilityPenalty > 0) reasons.push("no medical capability (penalty applied)");
		return `• ${assetId}: Not selected — ${reasons.length > 0 ? reasons.join(", ") : "higher overall cost"}.`;
	}).join("\n")}`;
	else rejectedAssetsRationale = "No alternative asset candidates available for comparison.";
	let riskVal = 0;
	let hazardLvl = "UNAVAILABLE";
	let uncertMult = 1;
	let distKm = "unavailable";
	if (typeof environmentalRisk === "number") {
		riskVal = environmentalRisk;
		hazardLvl = riskVal >= .66 ? "HIGH" : riskVal >= .33 ? "MEDIUM" : "LOW";
	} else if (environmentalRisk && typeof environmentalRisk === "object") {
		riskVal = environmentalRisk.environmentalRisk ?? 0;
		hazardLvl = environmentalRisk.hazardLevel ?? "UNAVAILABLE";
		uncertMult = environmentalRisk.uncertaintyMultiplier ?? 1;
		distKm = environmentalRisk.distanceToCycloneKm != null ? `${environmentalRisk.distanceToCycloneKm.toFixed(0)} km` : "unavailable";
	}
	const environmentalImpactRationale = `Environmental risk: ${(riskVal * 100).toFixed(0)}% — Hazard level: ${hazardLvl}.\nCyclone distance from predicted vessel fix: ${distKm}.\nUncertainty multiplier: ${uncertMult.toFixed(2)}x — this expanded the search grid radius and added a hazard penalty of ${(riskVal * 50).toFixed(1)} to every candidate's cost function.\n` + (uncertMult > 1.3 ? `The elevated uncertainty means the vessel could have drifted further than baseline estimates. Search zones are wider to compensate.` : `Uncertainty is within normal bounds. Search zones remain tightly centered on the predicted fix.`);
	let contingencyRationale;
	if (failedAssetId) {
		const nextBest = candidates.find((c) => c.assetId !== failedAssetId);
		contingencyRationale = `Asset ${failedAssetId} has been marked as FAILED and removed from tasking.\n` + (nextBest ? `Next-best candidate: ${nextBest.assetId} → ${nextBest.zoneId} (response time: ${nextBest.responseTimeMinutes.toFixed(0)} min, cost: ${nextBest.totalCost.toFixed(1)}).` : `No alternative candidates are available. Manual intervention required.`);
	} else {
		const nextBest = candidates.find((c) => c.assetId !== selectedAsset);
		contingencyRationale = `If ${selectedAsset} becomes unavailable:\n` + (nextBest ? `• Fallback: ${nextBest.assetId} → ${nextBest.zoneId}\n• Response time: ${nextBest.responseTimeMinutes.toFixed(0)} min (${(nextBest.responseTimeMinutes - (bestCandidate?.responseTimeMinutes ?? 0)).toFixed(0)} min slower)\n• Total cost: ${nextBest.totalCost.toFixed(1)}\n• Endurance feasible: ${nextBest.enduranceFeasible ? "YES" : "NO"}` : `No alternative candidates available. All assets should be preserved.`);
	}
	const fullBriefing = `OPERATIONAL BRIEFING
━━━━━━━━━━━━━━━━━━━━
Predicted Vessel Position: ${predictedPosition ? `${predictedPosition.latitude.toFixed(4)}°N, ${predictedPosition.longitude.toFixed(4)}°E (drift: ${predictedPosition.distanceTravelledKm?.toFixed(2) ?? "?"} km)` : "unavailable"}\n\nTASKING: ${selectedAsset} → ${selectedZone}\n${bestCandidate ? `Response: ${bestCandidate.responseTimeMinutes.toFixed(0)} min | Distance: ${bestCandidate.distanceKm.toFixed(1)} km | Cost: ${bestCandidate.totalCost.toFixed(1)}` : ""}\n\nSEARCH ZONE: ${targetZone?.id ?? selectedZone} — ${probText} probability (priority ${targetZone?.priority ?? "?"})\n\nENVIRONMENT: ${hazardLvl} risk (${(riskVal * 100).toFixed(0)}%) | Cyclone at ${distKm} | Uncertainty ${uncertMult.toFixed(2)}x\n\nALTERNATIVES:\n${rejectedAssetsRationale}\n\nCONTINGENCY:\n${contingencyRationale}` + (failedAssetId ? `\n\n⚠ ASSET FAILURE ACTIVE: ${failedAssetId}` : "");
	return {
		headline: `Task ${selectedAsset} → ${selectedZone} | ${hazardLvl} Risk`,
		assetSelectionRationale,
		zonePriorityRationale,
		rejectedAssetsRationale,
		environmentalImpactRationale,
		contingencyRationale,
		fullBriefing
	};
}
/**
* MSAR SAR Copilot Module — Operational Explanation Layer
*
* Purpose:
* Explains an already-calculated MSAR decision to a human search director.
*
* Answers operator questions:
* - Why was this asset selected?
* - Why is this search zone highest priority?
* - Why was another asset not selected?
* - How did environmental risk affect the decision?
* - What changed after an asset failure?
*
* Rules strictly followed:
* - Only uses information provided in the input.
* - Never invents numerical values.
* - Never changes or overrides a decision.
* - Never calculates a new route or probability.
* - Concise, structured operational explanations.
*/
async function explainDecision(input) {
	try {
		return await runCopilotOnServer({ data: input });
	} catch (err) {
		console.warn("[MSAR Copilot] Server function execution failed, returning deterministic explanation:", err);
		return parseCopilotFallback(input);
	}
}
objectType({
	selectedAsset: stringType(),
	selectedZone: stringType(),
	reason: stringType(),
	alternative: stringType(),
	confidence: numberType().min(0).max(100)
});
var runDecisionOnServer = createServerFn({ method: "POST" }).validator(objectType({
	incident: anyType().optional(),
	searchZones: arrayType(anyType()),
	candidates: arrayType(anyType()),
	environmentalRisk: numberType(),
	provider: enumType([
		"GEMINI",
		"MISTRAL",
		"GROQ",
		"OPENROUTER",
		"OLLAMA"
	]).optional(),
	geminiApiKey: stringType().optional(),
	mistralApiKey: stringType().optional(),
	groqApiKey: stringType().optional(),
	openrouterApiKey: stringType().optional(),
	openRouterApiKey: stringType().optional(),
	ollamaModel: stringType().optional()
})).handler(createSsrRpc("b7b3423cb3549104def5b29b2a3d3bf83b968a99f7732f9da9e57dc964de5809"));
function parseDecisionFallback(input) {
	const feasible = input.candidates.filter((c) => c.enduranceFeasible);
	if (feasible.length === 0) return {
		selectedAsset: "NONE",
		selectedZone: "NONE",
		reason: "No available rescue assets have sufficient endurance for this operation.",
		alternative: "None available",
		confidence: 0
	};
	const sorted = [...feasible].sort((a, b) => a.totalCost - b.totalCost);
	const best = sorted[0];
	const altCandidate = sorted.find((c) => c.assetId !== best.assetId) || sorted[1];
	const zoneMatch = input.searchZones.find((z) => z.id === best.zoneId);
	const probPct = zoneMatch ? (zoneMatch.probability * 100).toFixed(1) : "high";
	const reason = `Assigned ${best.assetId} to ${best.zoneId} (${probPct}% probability). Rapid response time of ${best.responseTimeMinutes.toFixed(0)} min with minimal capability/hazard penalties.`;
	const alternative = altCandidate ? `${altCandidate.assetId} assigned to ${altCandidate.zoneId} (Response time: ${altCandidate.responseTimeMinutes.toFixed(0)} min, cost: ${altCandidate.totalCost.toFixed(1)})` : "None available";
	let confidence = 90;
	if (input.environmentalRisk > .6) confidence -= 15;
	if (best.hazardPenalty > 10) confidence -= 10;
	if (best.capabilityPenalty > 0) confidence -= 5;
	confidence = Math.max(30, Math.min(98, confidence));
	return {
		selectedAsset: best.assetId,
		selectedZone: best.zoneId,
		reason,
		alternative,
		confidence
	};
}
/**
* MSAR Decision Agent
*
* Reasons over precalculated candidate options evaluated by the deterministic scoring engine.
* Does NOT perform raw calculations (distance, ETA, probability, route cost, hazard score, or endurance).
*
* 1. Ignores candidates where enduranceFeasible = false.
* 2. Considers search-zone priority, response time, hazard penalty, and capabilities.
* 3. Chooses the best feasible candidate (selectedAsset, selectedZone).
* 4. Provides operational explanation (reason) and alternative candidate.
* 5. Returns structured JSON output with confidence score (0 to 100).
*/
async function runDecisionAgent(input) {
	try {
		return await runDecisionOnServer({ data: {
			incident: input.incident,
			searchZones: input.searchZones,
			candidates: input.candidates,
			environmentalRisk: input.environmentalRisk,
			provider: input.provider,
			geminiApiKey: input.geminiApiKey,
			mistralApiKey: input.mistralApiKey,
			groqApiKey: input.groqApiKey,
			openrouterApiKey: input.openrouterApiKey,
			openRouterApiKey: input.openRouterApiKey,
			ollamaModel: input.ollamaModel
		} });
	} catch (err) {
		console.warn("[MSAR Decision Agent] Server function call failed, using deterministic reasoning fallback:", err);
		return parseDecisionFallback(input);
	}
}
function toRadians$1(degrees) {
	return degrees * Math.PI / 180;
}
function haversineDistance$1(lat1, lon1, lat2, lon2) {
	const earthRadiusKm = 6371;
	const dLat = toRadians$1(lat2 - lat1);
	const dLon = toRadians$1(lon2 - lon1);
	const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians$1(lat1)) * Math.cos(toRadians$1(lat2)) * Math.sin(dLon / 2) ** 2;
	return earthRadiusKm * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}
function generateCandidates(assets, zones, hazardPenalty) {
	const candidates = [];
	for (const asset of assets) {
		if (!asset.available) continue;
		for (const zone of zones) {
			const distanceKm = haversineDistance$1(asset.latitude, asset.longitude, zone.latitude, zone.longitude);
			const responseTimeMinutes = distanceKm / (asset.speedKnots * 1.852) * 60;
			const requiredHours = responseTimeMinutes / 60 + 1;
			const enduranceFeasible = asset.enduranceHours >= requiredHours;
			const capabilityPenalty = asset.medicalCapability ? 0 : 5;
			const priorityBonus = zone.priority * .5;
			const totalCost = responseTimeMinutes + hazardPenalty + capabilityPenalty + priorityBonus;
			candidates.push({
				assetId: asset.id,
				zoneId: zone.id,
				distanceKm,
				responseTimeMinutes,
				hazardPenalty,
				capabilityPenalty,
				enduranceFeasible,
				totalCost
			});
		}
	}
	return candidates;
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
function handleAssetFailure(input) {
	const { failedAssetId, assets, candidates, zones, hazardPenalty = 0 } = input;
	const updatedAssets = assets.map((asset) => {
		if (asset.id === failedAssetId) return {
			...asset,
			available: false
		};
		return { ...asset };
	});
	let remainingCandidates = [];
	if (zones && zones.length > 0) remainingCandidates = generateCandidates(updatedAssets, zones, hazardPenalty);
	else if (candidates && candidates.length > 0) remainingCandidates = candidates.filter((c) => c.assetId !== failedAssetId);
	const feasibleCandidates = remainingCandidates.filter((c) => c.enduranceFeasible);
	return {
		failedAssetId,
		updatedAssets,
		remainingCandidates,
		feasibleCandidates
	};
}
var assets_default = [
	{
		"id": "BOAT-01",
		"name": "Rescue Boat 01",
		"type": "Rescue Boat",
		"latitude": 12.96,
		"longitude": 80.42,
		"speedKnots": 25,
		"enduranceHours": 5,
		"medicalCapability": false,
		"available": true
	},
	{
		"id": "BOAT-02",
		"name": "Rescue Boat 02",
		"type": "Rescue Boat",
		"latitude": 13.12,
		"longitude": 80.6,
		"speedKnots": 22,
		"enduranceHours": 8,
		"medicalCapability": true,
		"available": true
	},
	{
		"id": "HELI-01",
		"name": "Rescue Helicopter 01",
		"type": "Helicopter",
		"latitude": 13.1,
		"longitude": 80.48,
		"speedKnots": 120,
		"enduranceHours": 2,
		"medicalCapability": true,
		"available": true
	},
	{
		"id": "HELI-02",
		"name": "Rescue Helicopter 02",
		"type": "Helicopter",
		"latitude": 12.85,
		"longitude": 80.35,
		"speedKnots": 130,
		"enduranceHours": 3,
		"medicalCapability": true,
		"available": true
	}
];
var vessels_default = [{
	"id": "MV-204",
	"name": "Demo Fishing Vessel",
	"type": "Fishing Vessel",
	"latitude": 13.04,
	"longitude": 80.52,
	"speedKnots": 7,
	"headingDegrees": 140,
	"crewAtRisk": 3,
	"minutesSinceContact": 20,
	"urgency": 4,
	"status": "LOSS_OF_CONTACT",
	"dataType": "SIMULATED"
}];
var cloneInitialVessels = () => vessels_default.map((vessel) => ({ ...vessel }));
var cloneInitialAssets = () => assets_default.map((asset) => ({ ...asset }));
var duplicateVessel = (source, index) => ({
	...source,
	id: `${source.id}-${index + 1}`,
	name: `${source.name} ${index + 1}`,
	latitude: source.latitude + index * .015,
	longitude: source.longitude + index * .015
});
function useMsarSimulation(initialWindSpeedKnots) {
	const [simulation, setSimulation] = (0, import_react.useState)(() => ({
		activeVessels: cloneInitialVessels(),
		activeAssets: cloneInitialAssets(),
		environment: {
			windSpeedKnots: initialWindSpeedKnots,
			currentSpeedKnots: 0,
			currentDirectionDegrees: 0,
			seaState: 1,
			selectedScenario: "CYCLONE_MICHAUNG"
		},
		elapsedMinutes: 0,
		step: 0
	}));
	const updateVessel = (0, import_react.useCallback)((vesselId, changes) => {
		setSimulation((state) => ({
			...state,
			activeVessels: state.activeVessels.map((vessel) => vessel.id === vesselId ? {
				...vessel,
				...changes
			} : vessel),
			step: state.step + 1
		}));
	}, []);
	const setVesselCount = (0, import_react.useCallback)((count) => {
		setSimulation((state) => {
			const nextCount = Math.max(1, Math.floor(count));
			const baseline = cloneInitialVessels();
			const source = state.activeVessels[0] ?? baseline[0];
			const activeVessels = Array.from({ length: nextCount }, (_, index) => {
				if (index < state.activeVessels.length) return state.activeVessels[index];
				return duplicateVessel(source, index);
			});
			return {
				...state,
				activeVessels,
				step: state.step + 1
			};
		});
	}, []);
	const randomizeVesselPositions = (0, import_react.useCallback)(() => {
		setSimulation((state) => ({
			...state,
			activeVessels: state.activeVessels.map((vessel) => ({
				...vessel,
				latitude: Number((vessel.latitude + (Math.random() - .5) * .24).toFixed(4)),
				longitude: Number((vessel.longitude + (Math.random() - .5) * .24).toFixed(4))
			})),
			step: state.step + 1
		}));
	}, []);
	const setAssetAvailability = (0, import_react.useCallback)((assetId, available) => {
		setSimulation((state) => ({
			...state,
			activeAssets: state.activeAssets.map((asset) => asset.id === assetId ? {
				...asset,
				available
			} : asset),
			step: state.step + 1
		}));
	}, []);
	const setActiveAssets = (0, import_react.useCallback)((activeAssets) => {
		setSimulation((state) => ({
			...state,
			activeAssets,
			step: state.step + 1
		}));
	}, []);
	const restoreAssets = (0, import_react.useCallback)(() => {
		setSimulation((state) => ({
			...state,
			activeAssets: cloneInitialAssets(),
			step: state.step + 1
		}));
	}, []);
	const updateEnvironment = (0, import_react.useCallback)((changes) => {
		setSimulation((state) => ({
			...state,
			environment: {
				...state.environment,
				...changes
			},
			step: state.step + 1
		}));
	}, []);
	const advanceTime = (0, import_react.useCallback)((minutes) => {
		setSimulation((state) => ({
			...state,
			elapsedMinutes: state.elapsedMinutes + minutes,
			step: state.step + 1
		}));
	}, []);
	const applyScenario = (0, import_react.useCallback)(() => {
		setSimulation((state) => ({
			...state,
			step: state.step + 1
		}));
	}, []);
	const reset = (0, import_react.useCallback)(() => {
		setSimulation({
			activeVessels: cloneInitialVessels(),
			activeAssets: cloneInitialAssets(),
			environment: {
				windSpeedKnots: initialWindSpeedKnots,
				currentSpeedKnots: 0,
				currentDirectionDegrees: 0,
				seaState: 1,
				selectedScenario: "CYCLONE_MICHAUNG"
			},
			elapsedMinutes: 0,
			step: 0
		});
	}, [initialWindSpeedKnots]);
	const updateAssetPosition = (0, import_react.useCallback)((assetId, latitude, longitude) => {
		setSimulation((state) => ({
			...state,
			activeAssets: state.activeAssets.map((asset) => asset.id === assetId ? {
				...asset,
				latitude: Number(latitude.toFixed(4)),
				longitude: Number(longitude.toFixed(4))
			} : asset),
			step: state.step + 1
		}));
	}, []);
	const updateAsset = (0, import_react.useCallback)((assetId, changes) => {
		setSimulation((state) => ({
			...state,
			activeAssets: state.activeAssets.map((asset) => asset.id === assetId ? {
				...asset,
				...changes
			} : asset),
			step: state.step + 1
		}));
	}, []);
	const actions = (0, import_react.useMemo)(() => ({
		setVesselCount,
		randomizeVesselPositions,
		updateVessel,
		setAssetAvailability,
		setActiveAssets,
		updateAssetPosition,
		updateAsset,
		restoreAssets,
		updateEnvironment,
		advanceTime,
		applyScenario,
		reset
	}), [
		advanceTime,
		applyScenario,
		randomizeVesselPositions,
		reset,
		restoreAssets,
		setActiveAssets,
		setAssetAvailability,
		setVesselCount,
		updateAsset,
		updateAssetPosition,
		updateEnvironment,
		updateVessel
	]);
	return {
		...simulation,
		actions
	};
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
function RangeControl({ label, value, min, max, unit, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "data-key",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-mono text-[10px] text-cyan",
				children: [value, unit]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
			value: [value],
			min,
			max,
			step: 1,
			onValueChange: ([next]) => onChange(next ?? value)
		})]
	});
}
function SimulationControls({ vessels, assets, environment, onVesselCountChange, onRandomizePositions, onVesselChange, onEnvironmentChange, onAssetAvailabilityChange, onAssetChange, onApplyScenario, onResetScenario }) {
	const availableAssets = assets.filter((asset) => asset.available).length;
	const primaryVessel = vessels[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "glass rounded-lg border border-cyan/25 p-3 space-y-3 shrink-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "data-key flex items-center gap-1.5 text-[10px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-3 text-cyan" }), "Simulation Controls"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded border border-cyan/30 bg-cyan/10 px-1.5 py-0.5 font-mono text-[8px] font-bold text-cyan",
					children: "LIVE STATE"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 border-t border-border pt-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "data-key flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ship, { className: "size-3 text-cyan" }), " Vessels"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[10px] text-muted-foreground",
							children: [vessels.length, " ACTIVE"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-4 gap-1",
						children: [
							1,
							2,
							3,
							4
						].map((count) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onVesselCountChange(count),
							className: `rounded border py-1 font-mono text-[10px] font-bold transition-colors ${vessels.length === count ? "border-cyan bg-cyan/15 text-cyan" : "border-border bg-accent/20 text-muted-foreground hover:border-cyan/40"}`,
							children: count
						}, count))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onRandomizePositions,
						className: "flex w-full items-center justify-center gap-1.5 rounded border border-border bg-accent/20 py-1.5 font-mono text-[9px] font-bold text-muted-foreground transition-colors hover:border-cyan/40 hover:text-cyan",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dice5, { className: "size-3" }), " Randomize Positions"]
					}),
					primaryVessel && onVesselChange && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 pt-1 border-t border-border/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-mono text-[9px] text-cyan font-bold",
								children: [
									"Primary Vessel (",
									primaryVessel.id,
									") Dynamics"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeControl, {
								label: "Vessel speed",
								value: primaryVessel.speedKnots,
								min: 0,
								max: 30,
								unit: " kt",
								onChange: (speedKnots) => onVesselChange(primaryVessel.id, { speedKnots })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeControl, {
								label: "Vessel heading",
								value: primaryVessel.headingDegrees,
								min: 0,
								max: 359,
								unit: "°",
								onChange: (headingDegrees) => onVesselChange(primaryVessel.id, { headingDegrees })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeControl, {
								label: "Time since contact",
								value: primaryVessel.minutesSinceContact,
								min: 0,
								max: 180,
								unit: " min",
								onChange: (minutesSinceContact) => onVesselChange(primaryVessel.id, { minutesSinceContact })
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2.5 border-t border-border pt-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "data-key flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, { className: "size-3 text-warning" }),
							" Weather",
							environment.selectedScenario === "CUSTOM" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-auto flex items-center gap-1 font-mono text-[8px] font-bold text-cyan animate-pulse",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1 rounded-full bg-cyan blink" }), "LIVE SIMULATION"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeControl, {
						label: "Wind speed",
						value: environment.windSpeedKnots,
						min: 0,
						max: 140,
						unit: " kt",
						onChange: (windSpeedKnots) => onEnvironmentChange({
							windSpeedKnots,
							selectedScenario: "CUSTOM"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeControl, {
						label: "Current speed",
						value: environment.currentSpeedKnots,
						min: 0,
						max: 10,
						unit: " kt",
						onChange: (currentSpeedKnots) => onEnvironmentChange({
							currentSpeedKnots,
							selectedScenario: "CUSTOM"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeControl, {
						label: "Current direction",
						value: environment.currentDirectionDegrees,
						min: 0,
						max: 359,
						unit: "°",
						onChange: (currentDirectionDegrees) => onEnvironmentChange({
							currentDirectionDegrees,
							selectedScenario: "CUSTOM"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "data-key",
							children: "Sea state"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: environment.seaState,
							onChange: (event) => onEnvironmentChange({
								seaState: Number(event.target.value),
								selectedScenario: "CUSTOM"
							}),
							className: "rounded border border-border bg-accent/30 px-2 py-1 font-mono text-[10px] text-foreground outline-none focus:border-cyan",
							children: [
								1,
								2,
								3,
								4,
								5,
								6
							].map((state) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: state,
								children: state
							}, state))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 border-t border-border pt-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "data-key",
						children: "Rescue assets"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-[10px] text-success",
						children: [
							availableAssets,
							"/",
							assets.length,
							" READY"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-1.5",
					children: assets.map((asset) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 rounded border border-border/70 bg-accent/15 p-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "truncate font-mono text-[10px] font-bold text-foreground",
									children: [
										asset.id,
										" — ",
										asset.name
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "truncate font-mono text-[8px] text-muted-foreground",
									children: [
										asset.type,
										" • ",
										asset.speedKnots,
										" kts"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: asset.available,
								onCheckedChange: (available) => onAssetAvailabilityChange(asset.id, available),
								"aria-label": `Set ${asset.id} availability`
							})]
						}), onAssetChange && asset.available && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeControl, {
							label: "Speed",
							value: asset.speedKnots,
							min: 10,
							max: 200,
							unit: " kt",
							onChange: (speedKnots) => onAssetChange(asset.id, { speedKnots })
						})]
					}, asset.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2 border-t border-border pt-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onApplyScenario,
					className: "rounded border border-cyan/50 bg-cyan/10 px-2 py-1.5 font-mono text-[9px] font-bold text-cyan hover:bg-cyan/20",
					children: "Apply Scenario"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onResetScenario,
					className: "flex items-center justify-center gap-1 rounded border border-border bg-accent/20 px-2 py-1.5 font-mono text-[9px] font-bold text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3" }), " Reset Scenario"]
				})]
			})
		]
	});
}
function predictPosition(input) {
	const distanceKm = input.speedKnots * 1.852 * (input.elapsedMinutes / 60);
	const headingRadians = input.headingDegrees * Math.PI / 180;
	const northSouthKm = distanceKm * Math.cos(headingRadians);
	const eastWestKm = distanceKm * Math.sin(headingRadians);
	const latitudeChange = northSouthKm / 111;
	const longitudeChange = eastWestKm / (111 * Math.cos(input.latitude * Math.PI / 180));
	return {
		predictedLatitude: input.latitude + latitudeChange,
		predictedLongitude: input.longitude + longitudeChange,
		distanceTravelledKm: distanceKm
	};
}
function toRadians(degrees) {
	return degrees * Math.PI / 180;
}
function haversineDistance(lat1, lon1, lat2, lon2) {
	const earthRadiusKm = 6371;
	const dLat = toRadians(lat2 - lat1);
	const dLon = toRadians(lon2 - lon1);
	const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
	return earthRadiusKm * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}
function calculateEnvironmentalRisk(input) {
	const distanceToCycloneKm = haversineDistance(input.vesselLatitude, input.vesselLongitude, input.cycloneLatitude, input.cycloneLongitude);
	const proximityRisk = Math.max(0, 1 - distanceToCycloneKm / 500);
	const intensityRisk = Math.min(1, input.cycloneWindKnots / 70);
	const environmentalRisk = Math.min(1, .6 * proximityRisk + .4 * intensityRisk);
	const uncertaintyMultiplier = 1 + environmentalRisk;
	let hazardLevel;
	if (environmentalRisk < .33) hazardLevel = "LOW";
	else if (environmentalRisk < .66) hazardLevel = "MEDIUM";
	else hazardLevel = "HIGH";
	return {
		distanceToCycloneKm,
		environmentalRisk,
		uncertaintyMultiplier,
		hazardLevel
	};
}
function generateSearchZones(input) {
	const zones = [];
	const spacing = Math.max(.01, input.uncertaintyKm / 111);
	let totalWeight = 0;
	for (let row = -2; row <= 2; row++) for (let col = -2; col <= 2; col++) {
		const latitude = input.centerLatitude + row * spacing;
		const longitude = input.centerLongitude + col * spacing;
		const distanceSquared = row * row + col * col;
		const weight = Math.exp(-distanceSquared / 2);
		zones.push({
			id: `ZONE-${zones.length + 1}`,
			latitude,
			longitude,
			probability: weight,
			priority: 0
		});
		totalWeight += weight;
	}
	for (const zone of zones) zone.probability /= totalWeight;
	zones.sort((a, b) => b.probability - a.probability);
	zones.forEach((zone, index) => {
		zone.priority = index + 1;
	});
	return zones;
}
/**
* Runs the existing single-vessel deterministic engines once per vessel.
* No probabilities are merged: each returned search grid remains tied to its
* own vessel ID and is rendered independently by the tactical map.
*/
function runMultiVesselSimulation({ vessels, assets, observation, elapsedMinutes }) {
	return vessels.flatMap((vessel) => {
		if (!Number.isFinite(vessel.latitude) || !Number.isFinite(vessel.longitude)) return [];
		const prediction = predictPosition({
			latitude: vessel.latitude,
			longitude: vessel.longitude,
			speedKnots: vessel.speedKnots,
			headingDegrees: vessel.headingDegrees,
			elapsedMinutes: vessel.minutesSinceContact + Math.floor(elapsedMinutes)
		});
		if (!Number.isFinite(prediction.predictedLatitude) || !Number.isFinite(prediction.predictedLongitude)) return [];
		const environmentalRisk = calculateEnvironmentalRisk({
			vesselLatitude: prediction.predictedLatitude,
			vesselLongitude: prediction.predictedLongitude,
			cycloneLatitude: observation.latitude,
			cycloneLongitude: observation.longitude,
			cycloneWindKnots: observation.wind_kt
		});
		const searchZones = generateSearchZones({
			centerLatitude: prediction.predictedLatitude,
			centerLongitude: prediction.predictedLongitude,
			uncertaintyKm: environmentalRisk.uncertaintyMultiplier * 10
		});
		return [{
			vessel,
			prediction,
			environmentalRisk,
			searchZones,
			candidates: generateCandidates(assets, searchZones.slice(0, 5), environmentalRisk.environmentalRisk * 50)
		}];
	});
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
function validateDecision(input) {
	const { decision, assets, searchZones, candidates, route, maxResponseTimeMinutes = 180, requiresMedical = false } = input;
	const originalAssetId = decision.selectedAsset;
	const originalZoneId = decision.selectedZone;
	const asset = assets.find((a) => a.id === originalAssetId);
	if (!asset || !asset.available) return handleValidationFailure("ASSET_UNAVAILABLE", `Recommended asset ${originalAssetId} is currently unavailable or offline.`, input);
	if (!searchZones.find((z) => z.id === originalZoneId)) return handleValidationFailure("INVALID_ZONE", `Recommended search zone ${originalZoneId} does not exist in active grid.`, input);
	const candidate = candidates.find((c) => c.assetId === originalAssetId && c.zoneId === originalZoneId);
	if (!candidate || !candidate.enduranceFeasible) return handleValidationFailure("INSUFFICIENT_ENDURANCE", `Asset ${originalAssetId} lacks sufficient fuel/endurance for mission to zone ${originalZoneId}.`, input);
	if (requiresMedical && !asset.medicalCapability) return handleValidationFailure("MISSING_CAPABILITY", `Asset ${originalAssetId} lacks required medical extraction capability for this incident.`, input);
	if (route && (!route.hasRoute || !route.path || route.path.length <= 1)) return handleValidationFailure("NO_ROUTE", `No navigable transit route found connecting asset ${originalAssetId} to zone ${originalZoneId}.`, input);
	if (candidate.responseTimeMinutes > maxResponseTimeMinutes) return handleValidationFailure("EXCEEDED_RESPONSE_TIME", `Response time of ${candidate.responseTimeMinutes.toFixed(0)} min exceeds scenario limit of ${maxResponseTimeMinutes} min.`, input);
	return {
		valid: true,
		selectedAsset: originalAssetId,
		selectedZone: originalZoneId,
		wasOverridden: false,
		originalDecision: decision,
		validatedCandidate: candidate
	};
}
/**
* Rejects invalid recommendation and deterministically selects the next best valid candidate.
*/
function handleValidationFailure(failedConstraint, failureReason, input) {
	const { decision, assets, searchZones, candidates, maxResponseTimeMinutes = 180, requiresMedical = false } = input;
	const chosenCandidate = [...candidates].sort((a, b) => a.totalCost - b.totalCost).find((c) => {
		const assetObj = assets.find((a) => a.id === c.assetId);
		const zoneObj = searchZones.find((z) => z.id === c.zoneId);
		if (!assetObj || !assetObj.available) return false;
		if (!zoneObj) return false;
		if (!c.enduranceFeasible) return false;
		if (requiresMedical && !assetObj.medicalCapability) return false;
		if (c.responseTimeMinutes > maxResponseTimeMinutes) return false;
		return true;
	}) || candidates[0];
	return {
		valid: false,
		selectedAsset: chosenCandidate?.assetId ?? decision.selectedAsset,
		selectedZone: chosenCandidate?.zoneId ?? decision.selectedZone,
		failedConstraint,
		failureReason,
		wasOverridden: true,
		originalDecision: decision,
		...chosenCandidate ? { validatedCandidate: chosenCandidate } : {}
	};
}
/**
* Calculates a hazard penalty weight for any geographic waypoint relative to the cyclone hazard center.
* Exposed interface for future A* routing algorithms to prefer safer transit corridors.
*
* @param input - Waypoint coordinates, cyclone center coordinates, and cyclone wind speed
* @returns Hazard penalty result containing penalty score, cost multiplier, and navigability status
*/
function calculateRoutingHazardPenalty(input) {
	const risk = calculateEnvironmentalRisk$1(input.pointLat, input.pointLon, input.cycloneLat, input.cycloneLon, input.cycloneWindSpeed).environmentalRisk;
	return {
		hazardPenalty: Math.round(risk * 100),
		costMultiplier: Number((1 + risk * 9).toFixed(2)),
		isNavigable: risk < .85,
		environmentalRisk: risk
	};
}
/**
* Deterministic A* Risk-Aware Grid Pathfinder.
* Finds the lowest-cost risk-aware navigational path around simulated environmental hazard zones.
*/
function findRiskAwareRouteAStar(input) {
	const DISCLAIMER = "SIMULATED DECISION-SUPPORT ROUTE — NOT FOR REAL NAVIGATION";
	const minLat = Math.min(input.startLat, input.targetLat, input.cycloneLat) - 1.5;
	const maxLat = Math.max(input.startLat, input.targetLat, input.cycloneLat) + 1.5;
	const minLon = Math.min(input.startLon, input.targetLon, input.cycloneLon) - 1.5;
	const maxLon = Math.max(input.startLon, input.targetLon, input.cycloneLon) + 1.5;
	const ROWS = 25;
	const COLS = 25;
	const latStep = (maxLat - minLat) / 24;
	const lonStep = (maxLon - minLon) / 24;
	const grid = [];
	for (let r = 0; r < ROWS; r++) {
		const rowNodes = [];
		for (let c = 0; c < COLS; c++) {
			const lat = minLat + r * latStep;
			const lon = minLon + c * lonStep;
			const penalty = calculateRoutingHazardPenalty({
				pointLat: lat,
				pointLon: lon,
				cycloneLat: input.cycloneLat,
				cycloneLon: input.cycloneLon,
				cycloneWindSpeed: input.cycloneWindSpeed
			});
			rowNodes.push({
				row: r,
				col: c,
				lat,
				lon,
				hazardMultiplier: penalty.costMultiplier,
				isPassable: penalty.isNavigable
			});
		}
		grid.push(rowNodes);
	}
	const haversineKm = (lat1, lon1, lat2, lon2) => {
		const R = 6371;
		const dLat = (lat2 - lat1) * Math.PI / 180;
		const dLon = (lon2 - lon1) * Math.PI / 180;
		const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	};
	const findNearestNode = (lat, lon) => {
		let bestNode = grid[0][0];
		let minD = Infinity;
		for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
			const node = grid[r][c];
			const d = haversineKm(lat, lon, node.lat, node.lon);
			if (d < minD) {
				minD = d;
				bestNode = node;
			}
		}
		return bestNode;
	};
	const startNode = findNearestNode(input.startLat, input.startLon);
	const targetNode = findNearestNode(input.targetLat, input.targetLon);
	const nodeKey = (n) => `${n.row},${n.col}`;
	const openSet = [startNode];
	const cameFrom = /* @__PURE__ */ new Map();
	const gScore = /* @__PURE__ */ new Map();
	const fScore = /* @__PURE__ */ new Map();
	gScore.set(nodeKey(startNode), 0);
	fScore.set(nodeKey(startNode), haversineKm(startNode.lat, startNode.lon, targetNode.lat, targetNode.lon));
	let foundNode = null;
	while (openSet.length > 0) {
		openSet.sort((a, b) => (fScore.get(nodeKey(a)) ?? Infinity) - (fScore.get(nodeKey(b)) ?? Infinity));
		const current = openSet.shift();
		if (current.row === targetNode.row && current.col === targetNode.col) {
			foundNode = current;
			break;
		}
		const neighbors = [];
		for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
			if (dr === 0 && dc === 0) continue;
			const nr = current.row + dr;
			const nc = current.col + dc;
			if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
				const neighbor = grid[nr][nc];
				if (neighbor.isPassable) neighbors.push(neighbor);
			}
		}
		for (const neighbor of neighbors) {
			const edgeCost = haversineKm(current.lat, current.lon, neighbor.lat, neighbor.lon) * neighbor.hazardMultiplier;
			const tentativeG = (gScore.get(nodeKey(current)) ?? Infinity) + edgeCost;
			const neighborKey = nodeKey(neighbor);
			if (tentativeG < (gScore.get(neighborKey) ?? Infinity)) {
				cameFrom.set(neighborKey, current);
				gScore.set(neighborKey, tentativeG);
				const h = haversineKm(neighbor.lat, neighbor.lon, targetNode.lat, targetNode.lon);
				fScore.set(neighborKey, tentativeG + h);
				if (!openSet.some((n) => n.row === neighbor.row && n.col === neighbor.col)) openSet.push(neighbor);
			}
		}
	}
	const pathCoords = [];
	pathCoords.push([input.startLon, input.startLat]);
	if (foundNode) {
		const nodePath = [];
		let curr = foundNode;
		while (curr) {
			nodePath.unshift(curr);
			curr = cameFrom.get(nodeKey(curr));
		}
		for (const node of nodePath) pathCoords.push([node.lon, node.lat]);
	}
	pathCoords.push([input.targetLon, input.targetLat]);
	let totalDistanceKm = 0;
	for (let i = 0; i < pathCoords.length - 1; i++) {
		const p1 = pathCoords[i];
		const p2 = pathCoords[i + 1];
		totalDistanceKm += haversineKm(p1[1], p1[0], p2[1], p2[0]);
	}
	const totalPathCost = Number((gScore.get(nodeKey(targetNode)) ?? totalDistanceKm).toFixed(2));
	return {
		path: pathCoords,
		totalDistanceKm: Number(totalDistanceKm.toFixed(2)),
		totalPathCost,
		hasRoute: foundNode !== null,
		disclaimer: DISCLAIMER
	};
}
/**
* Deterministic Routing Engine Wrapper
* Calls A* risk-aware pathfinding algorithm around hazard zones.
*/
function calculateRoute(input) {
	return findRiskAwareRouteAStar({
		startLat: input.startLat,
		startLon: input.startLon,
		targetLat: input.targetLat,
		targetLon: input.targetLon,
		cycloneLat: input.cycloneLat,
		cycloneLon: input.cycloneLon,
		cycloneWindSpeed: input.cycloneWindSpeed
	});
}
/**
* MSAR Core Orchestrator — runMission
*
* Integrates mathematical engines and AI agents in strict sequential order:
* 1. Receive raw distress text.
* 2. Call Triage Agent.
* 3. Read simulated vessel data.
* 4. Run position prediction engine.
* 5. Run environmental risk engine using selected Michaung observation.
* 6. Generate search probability zones.
* 7. Generate rescue candidates using scoring engine.
* 8. Send incident, search zones, and candidates to Decision Agent.
* 9. Validate selected decision.
* 10. Calculate route using routing engine.
* 11. Generate Copilot explanation.
* 12. Return complete mission state.
*/
async function runMission(input) {
	const provider = input.provider ?? "GEMINI";
	const geminiApiKey = input.geminiApiKey;
	const mistralApiKey = input.mistralApiKey;
	const groqApiKey = input.groqApiKey;
	const openrouterApiKey = input.openrouterApiKey;
	const openRouterApiKey = input.openRouterApiKey;
	const ollamaModel = input.ollamaModel;
	const triage = await runTriageAgent({
		rawText: input.rawDistressText,
		provider,
		geminiApiKey,
		mistralApiKey,
		groqApiKey,
		openrouterApiKey,
		openRouterApiKey,
		ollamaModel
	});
	const vessel = input.simulatedVessel ?? vessels_default[0];
	const prediction = predictPosition({
		latitude: vessel.latitude,
		longitude: vessel.longitude,
		speedKnots: vessel.speedKnots,
		headingDegrees: vessel.headingDegrees,
		elapsedMinutes: vessel.minutesSinceContact
	});
	const observation = input.michaungObservation ?? MICHAUNG_TRACK[1] ?? MICHAUNG_TRACK[0];
	const environmentalRisk = calculateEnvironmentalRisk({
		vesselLatitude: prediction.predictedLatitude,
		vesselLongitude: prediction.predictedLongitude,
		cycloneLatitude: observation.latitude,
		cycloneLongitude: observation.longitude,
		cycloneWindKnots: observation.wind_kt
	});
	const uncertaintyKm = Math.max(10, 25 * environmentalRisk.uncertaintyMultiplier);
	const searchZones = generateSearchZones({
		centerLatitude: prediction.predictedLatitude,
		centerLongitude: prediction.predictedLongitude,
		uncertaintyKm
	});
	const rawAssets = input.assets ?? assets_default;
	const activeAssets = input.failedAssetId ? rawAssets.map((a) => a.id === input.failedAssetId ? {
		...a,
		available: false
	} : a) : rawAssets;
	const candidates = generateCandidates(activeAssets, searchZones, Math.round(environmentalRisk.environmentalRisk * 100));
	const incident = {
		incidentType: triage.incidentType,
		urgency: triage.urgency,
		crewAtRisk: triage.crewAtRisk,
		summary: triage.summary
	};
	let decision = await runDecisionAgent({
		incident,
		searchZones,
		candidates,
		environmentalRisk: environmentalRisk.environmentalRisk,
		provider,
		geminiApiKey,
		mistralApiKey,
		groqApiKey,
		openrouterApiKey,
		openRouterApiKey,
		ollamaModel
	});
	const validation = validateDecision({
		decision,
		assets: activeAssets,
		searchZones,
		candidates,
		requiresMedical: triage.incidentType === "MEDICAL_EMERGENCY"
	});
	if (!validation.valid || validation.wasOverridden) decision = {
		...decision,
		selectedAsset: validation.selectedAsset,
		selectedZone: validation.selectedZone,
		reason: `[VALIDATION OVERRIDE: ${validation.failedConstraint}] ${validation.failureReason} Re-tasked to alternative valid asset ${validation.selectedAsset} in zone ${validation.selectedZone}.`
	};
	const selectedAssetObj = activeAssets.find((a) => a.id === decision.selectedAsset) || activeAssets[0];
	const targetZoneObj = searchZones.find((z) => z.id === decision.selectedZone) || searchZones[0];
	const route = calculateRoute({
		startLat: selectedAssetObj.latitude,
		startLon: selectedAssetObj.longitude,
		targetLat: targetZoneObj.latitude,
		targetLon: targetZoneObj.longitude,
		cycloneLat: observation.latitude,
		cycloneLon: observation.longitude,
		cycloneWindSpeed: observation.wind_kt
	});
	const explanation = await explainDecision({
		incident,
		predictedPosition: {
			latitude: prediction.predictedLatitude,
			longitude: prediction.predictedLongitude,
			distanceTravelledKm: prediction.distanceTravelledKm
		},
		environmentalRisk,
		searchZones,
		candidates,
		selectedAsset: decision.selectedAsset,
		selectedZone: decision.selectedZone,
		route,
		...input.failedAssetId ? { failedAssetId: input.failedAssetId } : {},
		provider,
		geminiApiKey,
		mistralApiKey,
		groqApiKey,
		openrouterApiKey,
		openRouterApiKey,
		ollamaModel
	});
	return {
		triage,
		prediction,
		environmentalRisk,
		searchZones,
		candidates,
		decision,
		route,
		explanation
	};
}
/**
* AIDecisionCard � Displays the output of the AI Decision Agent.
*
* Why a separate component?
* The PredictionResultsPanel shows deterministic engine numbers (raw math).
* This card shows the AI layer ON TOP of that math � what the agent decided
* and why, clearly labelled so operators know it is an AI recommendation.
*
* Props:
*   decision  � the DecisionOutput from runDecisionAgent, or null if not yet run.
*   isRunning � true while the mission pipeline is executing (shows a spinner).
*/
function AIDecisionCard({ decision, isRunning = false }) {
	const confPct = decision?.confidence ?? 0;
	const confColor = confPct >= 70 ? "text-success" : confPct >= 45 ? "text-warning" : "text-emergency";
	const confBarColor = confPct >= 70 ? "bg-success" : confPct >= 45 ? "bg-warning" : "bg-emergency";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass scan-sheen rounded-lg p-3.5 space-y-3 text-xs",
		style: { boxShadow: "0 0 0 1px rgba(34,211,238,0.18), 0 2px 12px rgba(34,211,238,0.07)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border/80 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-7 place-items-center rounded bg-cyan/20 border border-cyan/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-4 text-cyan" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-sm font-bold tracking-wider text-cyan",
						children: "AI DECISION AGENT"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "data-key text-[9px]",
						children: "Reasoning over engine outputs"
					})] })]
				}), isRunning ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1 rounded border border-cyan/40 bg-cyan/10 px-2 py-0.5 font-mono text-[10px] text-cyan",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3 animate-spin" }), "THINKING"]
				}) : decision ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1 rounded border border-success/40 bg-success/10 px-2 py-0.5 font-mono text-[10px] text-success",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), "DECIDED"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1 rounded border border-border bg-accent/20 px-2 py-0.5 font-mono text-[10px] text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-3" }), "NOT YET RUN"]
				})]
			}),
			!decision && !isRunning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center gap-2 rounded border border-dashed border-border/60 bg-abyss/40 py-6 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-8 text-muted-foreground/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-foreground text-[11px] leading-relaxed max-w-[200px]",
					children: [
						"Click ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-cyan font-bold",
							children: "RUN PREDICTION"
						}),
						" to invoke the AI Decision Agent."
					]
				})]
			}),
			isRunning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center gap-2 rounded border border-cyan/20 bg-cyan/5 py-6 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-8 text-cyan animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-cyan/70 text-[11px]",
					children: "AI reasoning in progress..."
				})]
			}),
			decision && !isRunning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded border border-cyan/30 bg-cyan/5 px-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "data-key text-[9px] mb-0.5",
								children: "Selected Asset"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-sm font-bold text-cyan",
								children: decision.selectedAsset
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-cyan/50 shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "data-key text-[9px] mb-0.5",
								children: "Assigned Zone"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-sm font-bold text-foreground",
								children: decision.selectedZone
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "data-key text-[9px]",
							children: "Agent Confidence"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[11px] font-bold " + confColor,
							children: [confPct.toFixed(0), "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1.5 w-full overflow-hidden rounded-full bg-border/60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full transition-all duration-700 " + confBarColor,
							style: { width: confPct + "%" }
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "data-key text-[9px]",
						children: "Decision Rationale"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded border border-border/40 bg-abyss/50 px-2.5 py-2 text-[10px] leading-relaxed text-foreground/80",
						children: decision.reason
					})]
				}),
				decision.alternative && decision.alternative !== "None available" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "data-key text-[9px]",
						children: "Alternative Candidate"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded border border-border/40 bg-accent/20 px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground",
						children: decision.alternative
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[9px] text-muted-foreground/60 border-t border-border/40 pt-2",
					children: "AI recommendation only. Verify against operational rules before actioning."
				})
			] })
		]
	});
}
var SEVERE_STORM_OBSERVATION = {
	timestamp: "SIMULATED — Severe Storm",
	latitude: 13.22,
	longitude: 80.69,
	current_intensity: null,
	pressure_hpa: 940,
	wind_kt: 120,
	pressure_drop_hpa: 60,
	category: "SuCS"
};
var NORMAL_OBSERVATION = {
	timestamp: "SIMULATED — Normal Conditions",
	latitude: 8,
	longitude: 76,
	current_intensity: null,
	pressure_hpa: 1010,
	wind_kt: 0,
	pressure_drop_hpa: 0,
	category: "None"
};
var BASE_METRICS = {
	probability: .78,
	priorityZone: "ZONE-1",
	responseMin: 12,
	availableAssets: 4,
	totalAssets: 4,
	confidence: .86
};
var stamp = () => (/* @__PURE__ */ new Date()).toISOString().slice(11, 19) + "Z";
var seq = 0;
var msg = (role, text) => ({
	id: `m${++seq}`,
	role,
	text,
	ts: stamp()
});
function CommandCenter() {
	const [clock, setClock] = (0, import_react.useState)("--:--:--");
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [thinking, setThinking] = (0, import_react.useState)(false);
	const [predicted, setPredicted] = (0, import_react.useState)(true);
	const [failedAssetId, setFailedAssetId] = (0, import_react.useState)(null);
	const [replay, setReplay] = (0, import_react.useState)(null);
	const [aiProvider, setAiProvider] = (0, import_react.useState)("GEMINI");
	const [geminiKey, setGeminiKey] = (0, import_react.useState)("");
	const [mistralKey, setMistralKey] = (0, import_react.useState)("");
	const [groqKey, setGroqKey] = (0, import_react.useState)("");
	const [openrouterKey, setOpenrouterKey] = (0, import_react.useState)("");
	const [ollamaModel, setOllamaModel] = (0, import_react.useState)("gemma4:latest");
	const [isSettingsOpen, setIsSettingsOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") {
			const p = localStorage.getItem("MSAR_AI_PROVIDER");
			if (p) setAiProvider(p);
			const g = localStorage.getItem("MSAR_GEMINI_KEY");
			if (g) setGeminiKey(g);
			const m = localStorage.getItem("MSAR_MISTRAL_KEY");
			if (m) setMistralKey(m);
			const gr = localStorage.getItem("MSAR_GROQ_KEY");
			if (gr) setGroqKey(gr);
			const or = localStorage.getItem("MSAR_OPENROUTER_KEY");
			if (or) setOpenrouterKey(or);
			const om = localStorage.getItem("MSAR_OLLAMA_MODEL");
			if (om) setOllamaModel(om);
		}
	}, []);
	const handleProviderChange = (p) => {
		setAiProvider(p);
		if (typeof window !== "undefined") localStorage.setItem("MSAR_AI_PROVIDER", p);
	};
	const handleGeminiKeyChange = (k) => {
		setGeminiKey(k);
		if (typeof window !== "undefined") localStorage.setItem("MSAR_GEMINI_KEY", k);
	};
	const handleMistralKeyChange = (k) => {
		setMistralKey(k);
		if (typeof window !== "undefined") localStorage.setItem("MSAR_MISTRAL_KEY", k);
	};
	const handleGroqKeyChange = (k) => {
		setGroqKey(k);
		if (typeof window !== "undefined") localStorage.setItem("MSAR_GROQ_KEY", k);
	};
	const handleOpenrouterKeyChange = (k) => {
		setOpenrouterKey(k);
		if (typeof window !== "undefined") localStorage.setItem("MSAR_OPENROUTER_KEY", k);
	};
	const handleOllamaModelChange = (m) => {
		setOllamaModel(m);
		if (typeof window !== "undefined") localStorage.setItem("MSAR_OLLAMA_MODEL", m);
	};
	const [selectedAssetId, setSelectedAssetId] = (0, import_react.useState)(null);
	const [runCount, setRunCount] = (0, import_react.useState)(0);
	const [cycloneIndex, setCycloneIndex] = (0, import_react.useState)(20);
	const REPLAY_TRACK_LENGTH = MICHAUNG_TRACK.length;
	const REPLAY_STEP_MS = 600;
	const simulation = useMsarSimulation(getObservationByIndex(20).wind_kt);
	const activeAssets = simulation.activeAssets;
	const simulatedVessel = simulation.activeVessels[0];
	const envScenario = simulation.environment.selectedScenario;
	const [failureComparison, setFailureComparison] = (0, import_react.useState)(null);
	const [missionState, setMissionState] = (0, import_react.useState)(null);
	const [isDecisionRunning, setIsDecisionRunning] = (0, import_react.useState)(false);
	const currentObservation = (0, import_react.useMemo)(() => {
		let observation;
		if (envScenario === "NORMAL_CONDITIONS") observation = NORMAL_OBSERVATION;
		else if (envScenario === "SEVERE_STORM") observation = SEVERE_STORM_OBSERVATION;
		else if (envScenario === "CUSTOM") observation = {
			timestamp: "OPERATOR — Dynamic Custom Simulation",
			latitude: 13.04,
			longitude: 80.52 + simulation.environment.currentSpeedKnots * .01,
			current_intensity: null,
			pressure_hpa: Math.max(900, 1013 - Math.round(simulation.environment.windSpeedKnots * .8)),
			wind_kt: simulation.environment.windSpeedKnots,
			pressure_drop_hpa: Math.round(simulation.environment.windSpeedKnots * .5),
			category: simulation.environment.windSpeedKnots > 64 ? "VSCS" : simulation.environment.windSpeedKnots > 34 ? "CS" : "Depression"
		};
		else observation = getObservationByIndex(cycloneIndex);
		return {
			...observation,
			wind_kt: simulation.environment.windSpeedKnots
		};
	}, [
		envScenario,
		cycloneIndex,
		simulation.environment.windSpeedKnots,
		simulation.environment.currentSpeedKnots
	]);
	const vesselResults = (0, import_react.useMemo)(() => runMultiVesselSimulation({
		vessels: simulation.activeVessels,
		assets: activeAssets,
		observation: currentObservation,
		elapsedMinutes: simulation.elapsedMinutes
	}), [
		simulation.activeVessels,
		activeAssets,
		currentObservation,
		simulation.elapsedMinutes
	]);
	const primaryResult = vesselResults.find((result) => result.vessel.id === simulatedVessel.id) ?? vesselResults[0];
	const predictionResult = primaryResult.prediction;
	const riskResult = primaryResult.environmentalRisk;
	const searchZones = primaryResult.searchZones;
	const candidates = primaryResult.candidates;
	const [messages, setMessages] = (0, import_react.useState)([msg("copilot", "4-Engine Execution Pipeline active. Active AI Provider: " + aiProvider + ". Vessel fix predicted at " + predictionResult.predictedLatitude.toFixed(4) + "°N " + predictionResult.predictedLongitude.toFixed(4) + "°E. Environmental Risk: " + (riskResult.environmentalRisk * 100).toFixed(0) + "% (" + riskResult.hazardLevel + ").")]);
	const push = (0, import_react.useCallback)((m) => setMessages((prev) => [...prev, m]), []);
	const reason = (0, import_react.useCallback)((text) => {
		setThinking(true);
		push(msg("copilot", text));
		setThinking(false);
	}, [push]);
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => {
			setClock((/* @__PURE__ */ new Date()).toISOString().slice(11, 19));
			simulation.actions.advanceTime(1 / 60);
		}, 1e3);
		return () => clearInterval(t);
	}, [simulation.actions]);
	(0, import_react.useEffect)(() => {
		if (replay === null) return;
		if (replay >= REPLAY_TRACK_LENGTH - 1) {
			const done = setTimeout(() => {
				setReplay(null);
				setBusy(null);
				push(msg("copilot", `Historical replay complete. Showed ${REPLAY_TRACK_LENGTH} Michaung track observations (${MICHAUNG_TRACK[0]?.timestamp} → ${MICHAUNG_TRACK[REPLAY_TRACK_LENGTH - 1]?.timestamp}). Final position: ${MICHAUNG_TRACK[REPLAY_TRACK_LENGTH - 1]?.latitude.toFixed(2)}°N, ${MICHAUNG_TRACK[REPLAY_TRACK_LENGTH - 1]?.longitude.toFixed(2)}°E. Max intensity: ${MICHAUNG_TRACK[REPLAY_TRACK_LENGTH - 1]?.wind_kt} kt.`));
			}, REPLAY_STEP_MS * 2);
			return () => clearTimeout(done);
		}
		setCycloneIndex(replay);
		simulation.actions.updateEnvironment({ windSpeedKnots: MICHAUNG_TRACK[replay]?.wind_kt ?? 0 });
		const t = setTimeout(() => setReplay((r) => r === null ? null : r + 1), REPLAY_STEP_MS);
		return () => clearTimeout(t);
	}, [
		replay,
		REPLAY_TRACK_LENGTH,
		push,
		simulation.actions
	]);
	const metrics = (0, import_react.useMemo)(() => {
		if (!predicted) return {
			...BASE_METRICS,
			probability: 0,
			confidence: 0,
			responseMin: 0,
			priorityZone: "—"
		};
		const topCandidate = candidates[0];
		const topZone = searchZones[0];
		const availableCount = activeAssets.filter((a) => a.available).length;
		const baseConf = Math.max(.3, 1 - (topCandidate?.totalCost ?? 100) / 200);
		const adjustedConfidence = Number((baseConf / riskResult.uncertaintyMultiplier).toFixed(2));
		return {
			probability: topZone?.probability ?? BASE_METRICS.probability,
			priorityZone: topZone?.id ?? BASE_METRICS.priorityZone,
			responseMin: Math.round(topCandidate?.responseTimeMinutes ?? BASE_METRICS.responseMin),
			availableAssets: availableCount,
			totalAssets: activeAssets.length,
			confidence: Math.min(.98, adjustedConfidence)
		};
	}, [
		predicted,
		candidates,
		searchZones,
		activeAssets,
		riskResult
	]);
	const recommendation = (0, import_react.useMemo)(() => {
		if (!predicted) return {
			headline: "Awaiting prediction run",
			detail: "No active drift solution. Run prediction to generate probability zones and an asset tasking plan.",
			tone: "warning"
		};
		if (failedAssetId) return {
			headline: `Re-task ${candidates[0]?.assetId ?? "HELI-01"} to ${candidates[0]?.zoneId ?? "ZONE-1"} (Asset ${failedAssetId} OFFLINE)`,
			detail: `Primary asset ${failedAssetId} is offline. Recalculated optimal replacement asset: ${candidates[0]?.assetId ?? "NONE"} in ${candidates[0]?.zoneId ?? "ZONE-1"} (Response time: ${candidates[0]?.responseTimeMinutes ? Math.round(candidates[0].responseTimeMinutes) : 0} min).`,
			tone: "emergency"
		};
		if (riskResult.hazardLevel === "HIGH") return {
			headline: `HIGH ENVIRONMENTAL RISK (${aiProvider} AI Active)`,
			detail: `Cyclone Michaung is ${riskResult.distanceToCycloneKm.toFixed(0)} km from predicted vessel fix with ${currentObservation.wind_kt} kt winds. Top candidate ${candidates[0]?.assetId ?? "HELI-01"} assigned to ${candidates[0]?.zoneId ?? "ZONE-1"} (Response time: ${candidates[0]?.responseTimeMinutes ? Math.round(candidates[0].responseTimeMinutes) : 12} min).`,
			tone: "emergency"
		};
		return {
			headline: `Task ${candidates[0]?.assetId ?? "HELI-01"} to ${candidates[0]?.zoneId ?? "ZONE-1"} immediately`,
			detail: `Top search zone probability: ${((searchZones[0]?.probability ?? .61) * 100).toFixed(1)}%. Distance to vessel: ${predictionResult.distanceTravelledKm.toFixed(2)} km. Environmental hazard level: ${riskResult.hazardLevel}.`,
			tone: "cyan"
		};
	}, [
		predicted,
		failedAssetId,
		riskResult,
		currentObservation,
		candidates,
		searchZones,
		predictionResult,
		aiProvider
	]);
	const handleStop = (0, import_react.useCallback)(() => {
		setThinking(false);
		setIsDecisionRunning(false);
		setBusy(null);
		setMessages((prev) => [...prev, {
			id: `m${Date.now()}`,
			role: "copilot",
			text: "🛑 AI reasoning process stopped by operator.",
			ts: (/* @__PURE__ */ new Date()).toISOString().slice(11, 19) + "Z"
		}]);
	}, []);
	const onAsk = (0, import_react.useCallback)(async (q) => {
		push(msg("operator", q));
		setThinking(true);
		try {
			const triageResult = await runTriageAgent({
				rawText: `${q} (Vessel: ${INCIDENT.vesselName} ${INCIDENT.vesselType}, Status: ${INCIDENT.status}, Crew at risk: ${INCIDENT.crewAtRisk})`,
				provider: aiProvider,
				geminiApiKey: geminiKey,
				mistralApiKey: mistralKey,
				groqApiKey: groqKey,
				openrouterApiKey: openrouterKey,
				openRouterApiKey: openrouterKey,
				ollamaModel
			});
			const selectedAsset = missionState?.decision?.selectedAsset ?? selectedAssetId ?? candidates[0]?.assetId ?? "HELI-01";
			const selectedZone = missionState?.decision?.selectedZone ?? candidates[0]?.zoneId ?? "ZONE-1";
			const explanation = await explainDecision({
				question: q,
				incident: {
					incidentType: triageResult.incidentType,
					urgency: triageResult.urgency,
					crewAtRisk: triageResult.crewAtRisk,
					summary: triageResult.summary
				},
				predictedPosition: {
					latitude: predictionResult.predictedLatitude,
					longitude: predictionResult.predictedLongitude,
					distanceTravelledKm: predictionResult.distanceTravelledKm
				},
				environmentalRisk: riskResult,
				searchZones,
				candidates,
				selectedAsset,
				selectedZone,
				...failedAssetId ? { failedAssetId } : {},
				provider: aiProvider,
				geminiApiKey: geminiKey,
				mistralApiKey: mistralKey,
				groqApiKey: groqKey,
				openrouterApiKey: openrouterKey,
				openRouterApiKey: openrouterKey,
				ollamaModel
			});
			let responseText = `[SAR Copilot | ${triageResult.incidentType} | Urgency ${triageResult.urgency}/5]\n`;
			const qLower = q.toLowerCase();
			if (qLower.includes("why was this asset") || qLower.includes("asset selected") || qLower.includes("why this asset")) responseText += `${explanation.assetSelectionRationale}`;
			else if (qLower.includes("why not") || qLower.includes("another asset") || qLower.includes("other asset") || qLower.includes("wasn't") || qLower.includes("rejected")) responseText += `${explanation.rejectedAssetsRationale}`;
			else if (qLower.includes("zone") || qLower.includes("priority") || qLower.includes("search area") || qLower.includes("probability")) responseText += `${explanation.zonePriorityRationale}`;
			else if (qLower.includes("environment") || qLower.includes("risk") || qLower.includes("cyclone") || qLower.includes("weather") || qLower.includes("hazard")) responseText += `${explanation.environmentalImpactRationale}`;
			else if (qLower.includes("fail") || qLower.includes("break") || qLower.includes("contingency") || qLower.includes("what happens if") || qLower.includes("backup") || qLower.includes("fallback")) responseText += `${explanation.contingencyRationale || explanation.rejectedAssetsRationale}`;
			else responseText += explanation.fullBriefing;
			setThinking(false);
			push(msg("copilot", responseText));
		} catch (err) {
			console.error("Copilot onAsk error:", err);
			setThinking(false);
			push(msg("copilot", `Analysis complete. Active provider: ${aiProvider}.`));
		}
	}, [
		push,
		aiProvider,
		predictionResult,
		riskResult,
		searchZones,
		candidates,
		failedAssetId,
		missionState,
		selectedAssetId
	]);
	const onSimulateFailure = (0, import_react.useCallback)(async () => {
		const topBefore = candidates[0];
		if (!topBefore) {
			push(msg("copilot", "No active candidates to fail. Run prediction first."));
			return;
		}
		const targetAssetId = topBefore.assetId;
		setBusy("fail");
		push(msg("operator", `SIMULATE ASSET FAILURE — ${targetAssetId}`));
		setThinking(true);
		const beforeSnapshot = {
			selectedAsset: topBefore.assetId,
			selectedZone: topBefore.zoneId,
			topCandidate: topBefore
		};
		const contingencyResult = handleAssetFailure({
			failedAssetId: targetAssetId,
			assets: activeAssets,
			zones: searchZones.slice(0, 5),
			hazardPenalty: riskResult.environmentalRisk * 50
		});
		simulation.actions.setActiveAssets(contingencyResult.updatedAssets);
		setFailedAssetId(targetAssetId);
		const newCandidates = contingencyResult.remainingCandidates;
		let newDecision = {
			selectedAsset: contingencyResult.remainingCandidates[0]?.assetId ?? "NONE",
			selectedZone: contingencyResult.remainingCandidates[0]?.zoneId ?? "NONE"
		};
		try {
			const decisionOutput = await runDecisionAgent({
				searchZones,
				candidates: newCandidates,
				environmentalRisk: riskResult.environmentalRisk,
				incident: {
					incidentType: INCIDENT.status,
					urgency: INCIDENT.urgency,
					crewAtRisk: INCIDENT.crewAtRisk,
					summary: `${INCIDENT.vesselName} — ${INCIDENT.status}. Asset ${targetAssetId} failed.`
				},
				provider: aiProvider,
				geminiApiKey: geminiKey,
				mistralApiKey: mistralKey,
				groqApiKey: groqKey,
				openrouterApiKey: openrouterKey,
				openRouterApiKey: openrouterKey,
				ollamaModel
			});
			newDecision = {
				selectedAsset: decisionOutput.selectedAsset,
				selectedZone: decisionOutput.selectedZone
			};
			setMissionState((prev) => prev ? {
				...prev,
				decision: decisionOutput,
				candidates: newCandidates
			} : null);
		} catch (err) {
			console.warn("[Failure Sim] Decision agent failed, using contingency fallback:", err);
		}
		const newAssetData = contingencyResult.updatedAssets.find((a) => a.id === newDecision.selectedAsset);
		searchZones.find((z) => z.id === newDecision.selectedZone) ?? searchZones[0];
		if (newAssetData) setSelectedAssetId(newAssetData.id);
		const afterTopCandidate = newCandidates.find((c) => c.assetId === newDecision.selectedAsset) ?? newCandidates[0] ?? null;
		setFailureComparison({
			failedAssetId: targetAssetId,
			before: beforeSnapshot,
			after: {
				selectedAsset: newDecision.selectedAsset,
				selectedZone: newDecision.selectedZone,
				topCandidate: afterTopCandidate,
				candidateCount: newCandidates.filter((c) => c.enduranceFeasible).length
			}
		});
		try {
			const explanation = await explainDecision({
				question: "What changed after the asset failure?",
				incident: {
					incidentType: INCIDENT.status,
					urgency: INCIDENT.urgency,
					crewAtRisk: INCIDENT.crewAtRisk,
					summary: INCIDENT.status
				},
				predictedPosition: {
					latitude: predictionResult.predictedLatitude,
					longitude: predictionResult.predictedLongitude,
					distanceTravelledKm: predictionResult.distanceTravelledKm
				},
				environmentalRisk: riskResult,
				searchZones,
				candidates: newCandidates,
				selectedAsset: newDecision.selectedAsset,
				selectedZone: newDecision.selectedZone,
				failedAssetId: targetAssetId,
				provider: aiProvider,
				geminiApiKey: geminiKey,
				mistralApiKey: mistralKey,
				groqApiKey: groqKey,
				openrouterApiKey: openrouterKey,
				openRouterApiKey: openrouterKey
			});
			setThinking(false);
			setBusy(null);
			push(msg("copilot", `[ASSET FAILURE — ${targetAssetId} REMOVED]\n${explanation.contingencyRationale}\n\nNEW TASKING:\n${explanation.assetSelectionRationale}`));
		} catch (err) {
			setThinking(false);
			setBusy(null);
			push(msg("copilot", `${targetAssetId} marked FAILED. Contingency re-tasking: ${newDecision.selectedAsset} → ${newDecision.selectedZone}.`));
		}
	}, [
		candidates,
		activeAssets,
		searchZones,
		riskResult,
		predictionResult,
		aiProvider,
		push,
		geminiKey,
		mistralKey,
		groqKey,
		openrouterKey
	]);
	const onAction = (0, import_react.useCallback)((k) => {
		if (k === "fail") {
			onSimulateFailure();
			return;
		}
		setBusy(k);
		if (k !== "replay" && k !== "recalc") setTimeout(() => setBusy(null), 1200);
		if (k === "run") {
			setPredicted(true);
			setRunCount((c) => c + 1);
			setIsDecisionRunning(true);
			push(msg("operator", "RUN PREDICTION + AI DECISION AGENT"));
			reason(`4-Engine Pipeline Executed (Active Provider: ${aiProvider}):\n1. Loaded vessel MV-204 from vessels.json.\n2. Scenario: ${envScenario} — Observation: ${currentObservation.timestamp}.\n3. predictPosition(): Fix at ${predictionResult.predictedLatitude.toFixed(4)}°N, ${predictionResult.predictedLongitude.toFixed(4)}°E (dist: ${predictionResult.distanceTravelledKm.toFixed(2)} km).\n4. calculateEnvironmentalRisk(): Risk ${(riskResult.environmentalRisk * 100).toFixed(0)}% (Hazard: ${riskResult.hazardLevel}, Uncertainty: ${riskResult.uncertaintyMultiplier.toFixed(2)}x).\n5. generateSearchZones(): Created 25 search zones (Top 1: ${searchZones[0]?.id} with ${((searchZones[0]?.probability ?? 0) * 100).toFixed(1)}% prob).\n6. generateCandidates(): Evaluated ${candidates.length} asset-zone pairings (Top: ${candidates[0]?.assetId} -> ${candidates[0]?.zoneId}, cost: ${candidates[0]?.totalCost.toFixed(1)}).\n7. Calling AI Decision Agent (${aiProvider})...`);
			const vessel = simulatedVessel;
			runMission({
				rawDistressText: `${vessel.name} (${vessel.type}) in distress at ${vessel.latitude.toFixed(4)}°N, ${vessel.longitude.toFixed(4)}°E. Status: ${vessel.status}. Crew at risk: ${vessel.crewAtRisk} persons. Urgency level: ${vessel.urgency}/5. Environment: ${envScenario} with ${currentObservation.wind_kt} kt wind and sea state ${simulation.environment.seaState}.${simulation.activeVessels.length > 1 ? ` Total ${simulation.activeVessels.length} vessels in distress area.` : ""}`,
				simulatedVessel: vessel,
				michaungObservation: currentObservation,
				assets: activeAssets,
				provider: aiProvider,
				geminiApiKey: geminiKey,
				mistralApiKey: mistralKey,
				groqApiKey: groqKey,
				openrouterApiKey: openrouterKey,
				openRouterApiKey: openrouterKey,
				ollamaModel
			}).then((state) => {
				setMissionState(state);
				setIsDecisionRunning(false);
				if (state.decision.selectedAsset && state.decision.selectedAsset !== "NONE") setSelectedAssetId(state.decision.selectedAsset);
				push(msg("copilot", `[AI DECISION AGENT] Triage: ${state.triage.incidentType} (Urgency ${state.triage.urgency}/5, ${state.triage.crewAtRisk} crew at risk).\nDecision: ${state.decision.selectedAsset} → ${state.decision.selectedZone} (Confidence: ${state.decision.confidence.toFixed(0)}%).\nRationale: ${state.decision.reason}`));
			}).catch((err) => {
				console.warn("[RUN PREDICTION] runMission failed, deterministic results still active:", err);
				setIsDecisionRunning(false);
				push(msg("copilot", "AI Decision Agent unavailable. Deterministic engine results are still shown below."));
			});
		} else if (k === "recalc") {
			push(msg("operator", `RECALCULATE — Scenario: ${envScenario}${failedAssetId ? ` | Asset ${failedAssetId} FAILED` : ""}`));
			setIsDecisionRunning(true);
			runMission({
				rawDistressText: `${simulatedVessel.name} (${simulatedVessel.type}) in distress at ${simulatedVessel.latitude.toFixed(4)}°N, ${simulatedVessel.longitude.toFixed(4)}°E. Status: ${simulatedVessel.status}. Crew at risk: ${simulatedVessel.crewAtRisk} persons. Urgency level: ${simulatedVessel.urgency}/5. Environment: ${envScenario} with ${currentObservation.wind_kt} kt wind and sea state ${simulation.environment.seaState}.${simulation.activeVessels.length > 1 ? ` Total ${simulation.activeVessels.length} vessels in distress area.` : ""}`,
				simulatedVessel,
				michaungObservation: currentObservation,
				assets: activeAssets,
				provider: aiProvider,
				failedAssetId: failedAssetId ?? void 0,
				geminiApiKey: geminiKey,
				mistralApiKey: mistralKey,
				groqApiKey: groqKey,
				openrouterApiKey: openrouterKey,
				openRouterApiKey: openrouterKey,
				ollamaModel
			}).then((state) => {
				setMissionState(state);
				setIsDecisionRunning(false);
				setBusy(null);
				if (state.decision.selectedAsset && state.decision.selectedAsset !== "NONE") setSelectedAssetId(state.decision.selectedAsset);
				push(msg("copilot", `[RECALCULATE] Scenario ${envScenario}, obs: ${currentObservation.timestamp}.\nRisk: ${(state.environmentalRisk.environmentalRisk * 100).toFixed(0)}% (${state.environmentalRisk.hazardLevel})\nAI Decision: ${state.decision.selectedAsset} → ${state.decision.selectedZone} (Confidence: ${state.decision.confidence.toFixed(0)}%).\n${state.decision.reason}`));
			}).catch((err) => {
				console.warn("[RECALCULATE] runMission failed:", err);
				setIsDecisionRunning(false);
				setBusy(null);
				push(msg("copilot", "Recalculate failed. Deterministic engine results remain active."));
			});
		} else if (k === "replay") {
			simulation.actions.updateEnvironment({
				selectedScenario: "CYCLONE_MICHAUNG",
				windSpeedKnots: MICHAUNG_TRACK[0]?.wind_kt ?? 0
			});
			setReplay(0);
			push(msg("operator", `HISTORICAL REPLAY — stepping through ${REPLAY_TRACK_LENGTH} Michaung track observations at 600 ms/step (~${Math.round(REPLAY_TRACK_LENGTH * .6)}s). Watch the map and Cyclone Status Card.`));
		} else {
			setFailedAssetId(null);
			setFailureComparison(null);
			simulation.actions.reset();
			setMissionState(null);
			setIsDecisionRunning(false);
			setPredicted(true);
			setReplay(null);
			setSelectedAssetId(null);
			setMessages([msg("copilot", `Scenario reset to baseline. All assets restored. Scenario: ${envScenario}. Active AI Provider: ${aiProvider}.`)]);
		}
	}, [
		push,
		reason,
		riskResult,
		currentObservation,
		predictionResult,
		searchZones,
		candidates,
		aiProvider,
		envScenario,
		onSimulateFailure,
		activeAssets,
		failedAssetId,
		simulatedVessel,
		simulation
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "dark flex min-h-screen flex-col bg-abyss text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
				clock,
				online: !failedAssetId,
				provider: aiProvider,
				onOpenSettings: () => setIsSettingsOpen(true)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid flex-1 gap-3 p-3 lg:grid-cols-[340px_minmax(0,1fr)_360px] lg:p-4 min-h-0 overflow-hidden mx-auto w-full max-w-[1920px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 overflow-y-auto lg:h-[calc(100vh-8.5rem)] pr-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IncidentPanel, {
								incident: {
									...INCIDENT,
									...missionState?.triage ? {
										urgency: missionState.triage.urgency,
										crewAtRisk: missionState.triage.crewAtRisk,
										status: missionState.triage.incidentType
									} : {},
									position: {
										lat: simulatedVessel.latitude,
										lon: simulatedVessel.longitude
									}
								},
								elapsedExtra: Math.floor(simulation.elapsedMinutes),
								liveSpeedKts: simulatedVessel.speedKnots,
								liveHeadingDeg: simulatedVessel.headingDegrees,
								liveMinutesSinceContact: simulatedVessel.minutesSinceContact,
								liveWindKts: simulation.environment.windSpeedKnots,
								liveCurrentKts: simulation.environment.currentSpeedKnots,
								liveSeaState: simulation.environment.seaState
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CycloneStatusCard, {
								currentObservation,
								currentIndex: cycloneIndex,
								onIndexChange: (index) => {
									setCycloneIndex(index);
									simulation.actions.updateEnvironment({ windSpeedKnots: getObservationByIndex(index).wind_kt });
								},
								riskResult: {
									distanceToCycloneKm: riskResult.distanceToCycloneKm,
									environmentalRisk: riskResult.environmentalRisk,
									uncertaintyMultiplier: riskResult.uncertaintyMultiplier,
									hazardLevel: riskResult.hazardLevel === "HIGH" ? "CRITICAL" : riskResult.hazardLevel === "MEDIUM" ? "HIGH" : "LOW"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnvironmentScenarioSelector, {
								value: envScenario,
								onChange: (s) => {
									let baselineWind = 5;
									let baselineCurrent = .5;
									let baselineSeaState = 1;
									if (s === "NORMAL_CONDITIONS") {
										baselineWind = 5;
										baselineCurrent = .5;
										baselineSeaState = 1;
									} else if (s === "CYCLONE_MICHAUNG") {
										const obs = getObservationByIndex(cycloneIndex);
										baselineWind = obs.wind_kt;
										baselineCurrent = Math.round(obs.wind_kt * .05 * 10) / 10;
										baselineSeaState = Math.min(6, Math.max(1, Math.ceil(obs.wind_kt / 18)));
									} else if (s === "SEVERE_STORM") {
										baselineWind = 120;
										baselineCurrent = 4.5;
										baselineSeaState = 6;
									} else if (s === "CUSTOM") {
										baselineWind = simulation.environment.windSpeedKnots || 45;
										baselineCurrent = simulation.environment.currentSpeedKnots || 2;
										baselineSeaState = simulation.environment.seaState || 3;
									}
									simulation.actions.updateEnvironment({
										selectedScenario: s,
										windSpeedKnots: baselineWind,
										currentSpeedKnots: baselineCurrent,
										seaState: baselineSeaState
									});
									setFailedAssetId(null);
									setFailureComparison(null);
									simulation.actions.restoreAssets();
								},
								disabled: busy !== null
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulationControls, {
								vessels: simulation.activeVessels,
								assets: activeAssets,
								environment: simulation.environment,
								onVesselCountChange: simulation.actions.setVesselCount,
								onRandomizePositions: simulation.actions.randomizeVesselPositions,
								onVesselChange: simulation.actions.updateVessel,
								onEnvironmentChange: simulation.actions.updateEnvironment,
								onAssetAvailabilityChange: simulation.actions.setAssetAvailability,
								onAssetChange: simulation.actions.updateAsset,
								onApplyScenario: () => {
									simulation.actions.applyScenario();
									setPredicted(true);
								},
								onResetScenario: () => onAction("reset")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 lg:h-[calc(100vh-8.5rem)] overflow-y-auto pr-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "glass relative min-h-[400px] h-[480px] shrink-0 overflow-hidden rounded-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute left-0 right-0 top-0 z-20 flex items-center justify-between border-b border-border bg-abyss/60 px-4 py-2 backdrop-blur",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "panel-label",
												children: "Tactical Chart — Bay of Bengal"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded bg-cyan/20 border border-cyan/40 px-1.5 py-0.5 font-mono text-[9px] font-bold text-cyan",
												children: "4 ENGINES CONNECTED"
											}),
											replay !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1 rounded bg-warning/20 border border-warning/50 px-2 py-0.5 font-mono text-[9px] font-bold text-warning animate-pulse",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
													"🌀 REPLAYING TRACK: ",
													replay + 1,
													"/",
													REPLAY_TRACK_LENGTH
												] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[8px] opacity-80",
													children: [
														"(",
														currentObservation.timestamp,
														")"
													]
												})]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "hidden items-center gap-3 sm:flex",
										children: [
											{
												c: "text-emergency",
												g: "▲",
												l: "VESSEL (PREDICTED)"
											},
											{
												c: "text-warning",
												g: "🌀",
												l: envScenario === "CYCLONE_MICHAUNG" ? "CYCLONE (HISTORICAL)" : envScenario === "SEVERE_STORM" ? "STORM (SIMULATED)" : "WEATHER (NORMAL)"
											},
											{
												c: "text-cyan",
												g: "◆",
												l: "RESCUE ASSETS"
											},
											...failedAssetId ? [{
												c: "text-emergency",
												g: "✕",
												l: "FAILED ASSET"
											}] : []
										].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `font-mono text-[10px] ${i.c}`,
												children: i.g
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "data-key",
												children: i.l
											})]
										}, i.l))
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 pt-9",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, { fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-backdrop size-full" }) })
								})]
							}),
							failureComparison && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FailureComparisonPanel, {
								failedAssetId: failureComparison.failedAssetId,
								before: failureComparison.before,
								after: failureComparison.after,
								onDismiss: () => setFailureComparison(null)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AIDecisionCard, {
								decision: missionState?.decision ?? null,
								isRunning: isDecisionRunning
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PredictionResultsPanel, {
								prediction: predictionResult,
								risk: riskResult,
								searchZones,
								candidates
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:h-[calc(100vh-8.5rem)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopilotPanel, {
							messages,
							thinking,
							recommendation,
							onAsk,
							onStop: handleStop
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "space-y-3 border-t border-border bg-abyss/50 p-3 backdrop-blur lg:p-4 shrink-0 mx-auto w-full max-w-[1920px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricsBar, { m: metrics }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBar, {
					onAction,
					busy
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AISettingsModal, {
				isOpen: isSettingsOpen,
				onClose: () => setIsSettingsOpen(false),
				provider: aiProvider,
				onProviderChange: handleProviderChange,
				geminiKey,
				onGeminiKeyChange: handleGeminiKeyChange,
				mistralKey,
				onMistralKeyChange: handleMistralKeyChange,
				groqKey,
				onGroqKeyChange: handleGroqKeyChange,
				openrouterKey,
				openRouterKey: openrouterKey,
				onOpenrouterKeyChange: handleOpenrouterKeyChange,
				onOpenRouterKeyChange: handleOpenrouterKeyChange,
				ollamaModel,
				onOllamaModelChange: handleOllamaModelChange
			})
		]
	});
}
//#endregion
export { CommandCenter as component };
