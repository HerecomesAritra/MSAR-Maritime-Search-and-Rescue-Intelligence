# 🌊 MSAR — Maritime Search & Rescue Intelligence

[![Stack](https://img.shields.io/badge/Stack-TanStack_Start_%2B_React_19-cyan?style=for-the-badge&logo=react)](https://tanstack.com/start)
[![AI Providers](https://img.shields.io/badge/AI_Providers-Gemini_|_Groq_|_Mistral_|_OpenRouter_|_Ollama-purple?style=for-the-badge)](https://aistudio.google.com)
[![License](https://img.shields.io/badge/License-MIT-blue.style=for-the-badge)](LICENSE)

**MSAR (Maritime Search & Rescue Intelligence)** is a full-stack, AI-assisted tactical command center designed for Search and Rescue (SAR) mission planning, position prediction, dynamic environmental risk assessment, and autonomous decision support in maritime emergencies.

Built for high-stakes operational environments, MSAR integrates **4 deterministic calculation engines** with a **multi-agent LLM pipeline** to calculate leeway drift, generate search probability grids, score rescue assets, and synthesize operational briefings for search directors.

---

## 📸 Overview & Command Center Interface

![MSAR Command Center Overview](https://raw.githubusercontent.com/user-attachments/assets/demo-preview.png)

> **Key Architectural Principle**: Math and physics are deterministic; reasoning is AI-assisted. Deterministic engines perform all spatial and mathematical calculations, while AI agents analyze reports, reason over candidate options, and explain decisions.

---

## ✨ Key Features

### 1. 🧮 Deterministic 4-Engine Core
* **Position Prediction Engine**: Calculates projected vessel datum using dead-reckoning leeway drift models based on vessel speed, heading, and elapsed time since contact.
* **Environmental Risk Engine**: Computes proximity to extreme weather (e.g., historical **Cyclone Michaung** track data or synthetic storm models), outputting hazard levels and uncertainty multipliers.
* **Search Probability Grid**: Generates a 25-cell spatial containment grid with normalized probability decay centered on the predicted fix (highlighting Top 5 priority search zones).
* **Rescue Candidate Scoring Engine**: Evaluates available assets (`BOAT-01`, `BOAT-02`, `HELI-01`, `HELI-02`) by calculating distance, response ETA, endurance feasibility, hazard penalties, and capability requirements.

### 2. 🤖 Multi-Agent LLM Pipeline
* **Triage Agent**: Parses raw distress text / MAYDAY reports into structured incident classifications (`FLOODING`, `ENGINE_FAILURE`, `LOST_CONTACT`, `MEDICAL_EMERGENCY`, `NAVIGATION_HAZARD`), urgency levels (1–5), and POB (persons on board) at risk.
* **Decision Agent**: Reasons over precomputed candidate scores, enforces endurance/capability constraints, and selects the optimal asset-to-zone tasking with operational rationale and alternative candidates.
* **Validation Engine**: Deterministic safety layer that overrides AI selections if mandatory constraints (e.g., medical evacuation requirement, asset availability) are violated.
* **SAR Copilot Agent**: Interactive briefing assistant that answers natural language operator queries (*"Why was this asset selected?"*, *"Why isn't HELI-01 tasked?"*, *"What happens if this asset fails?"*).

### 3. 🌐 Multi-Provider AI & Offline Support
Connect seamlessly to multiple cloud or local AI models with zero code changes:
* **Google Gemini** (`gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-flash`)
* **Groq Cloud** (`llama-3.3-70b-versatile`, `llama-3.1-8b-instant`)
* **Mistral AI** (`mistral-small`)
* **OpenRouter** (`gpt-4o-mini`, `llama-3.3-70b-instruct`)
* **Ollama (Local & Offline)**: Zero-latency offline operation via local models (e.g., `gemma4:latest`, `gemma2`).
* **100% Deterministic Fallback**: Automatic failover ensures full mission planning functionality even if external API connections are completely offline.

### 4. 🗺️ Tactical Interactive Map & Simulation
* Interactive Bay of Bengal chart with live search probability heatmaps, cyclone radius overlays, and vessel drift paths.
* **Drag-and-Drop Asset Re-tasking**: Drag rescue markers directly on the chart to instantly recalculate ETAs, candidate scores, and route paths.
* **Asset Failure Simulator**: One-click 10-step contingency pipeline simulating asset breakdown, re-scoring remaining units, and presenting side-by-side impact metrics.
* **Dynamic Environment Sliders**: Real-time control over wind speed, current velocity/direction, sea state, and multi-vessel dynamics.

---

## 🛠️ System Architecture

```
                          DISTRESS INCIDENT / MAYDAY REPORT
                                         │
                                         ▼
                                 🤖 AI TRIAGE AGENT
                          (Classifies Type, Urgency, POB)
                                         │
                                         ▼
                     ┌──────────────────────────────────────┐
                     │     DETERMINISTIC 4-ENGINE PIPELINE  │
                     ├──────────────────────────────────────┤
                     │ 1. Position Prediction (Leeway Drift)│
                     │ 2. Environmental Risk (Cyclone Data) │
                     │ 3. Search Probability Grid (25 Cells)│
                     │ 4. Candidate Scoring & Routing       │
                     └──────────────────────────────────────┘
                                         │
                                         ▼
                                🤖 AI DECISION AGENT
                          (Evaluates Candidate Options)
                                         │
                                         ▼
                             🛡️ VALIDATION ENGINE
                        (Guarantees Medical & Range Safety)
                                         │
                                         ▼
                                🤖 AI SAR COPILOT
                         (Explains Decision & Briefing)
```

---

## ⚙️ Tech Stack

* **Framework**: [TanStack Start](https://tanstack.com/start) (Full-stack SSR & Server Functions) + [TanStack Router](https://tanstack.com/router)
* **Frontend**: React 19, Tailwind CSS v4, Lucide Icons, MapLibre GL / Leaflet
* **Server Runtime**: [Nitro Engine](https://nitro.unjs.io) + Vite
* **AI & Validation**: `@google/genai`, Zod schema validation, fetch-based provider adapters
* **Language**: TypeScript (Strict type checking)

---

## 🚀 Quick Start & Local Setup

### Prerequisites
* **Node.js** v18.0.0 or higher
* **npm** v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/msar-main.git
   cd msar-main
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000` (or `http://localhost:8080`).

---

## 🔑 AI Key Configuration

MSAR works out of the box with built-in deterministic fallback engines. To activate live AI agents:

1. Click the ⚙️ **AI Settings** button in the top-right header of the application.
2. Select your active provider (**Google Gemini**, **Groq**, **Mistral**, **OpenRouter**, or **Ollama**).
3. Enter your API key (stored securely in browser `localStorage`).

Alternatively, set environment variables in a `.env` file at the project root:
```env
GEMINI_API_KEY=your_gemini_key_here
GROQ_API_KEY=your_groq_key_here
MISTRAL_API_KEY=your_mistral_key_here
OPENROUTER_API_KEY=your_openrouter_key_here
```

---



---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
