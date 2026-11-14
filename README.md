# RequestInfo - IP & Network Intelligence 🌐

[![Node.js CI](https://github.com/mohammad-hosein-shahpouri/RequestInfo/actions/workflows/node.js.yml/badge.svg)](https://github.com/mohammad-hosein-shahpouri/RequestInfo/actions/workflows/node.js.yml)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-v8-646cff.svg)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A modern, comprehensive IP address, geolocation, network routing intelligence, and client environment diagnostic tool.

---

## ✨ Features

- **🌐 Public IP & Geo Intelligence**
  - Instant detection of your public IPv4 or IPv6 address.
  - High-resolution SVG country flags, country codes (Alpha-2, Alpha-3), and regional metadata.
  - EU member state identification and live roundtrip latency ping indicator.
- **🔎 Universal IP & Domain Lookup**
  - Search any custom IPv4, IPv6, or domain name (e.g. `1.1.1.1`, `8.8.8.8`, `github.com`).
  - Integrated DNS-over-HTTPS (DoH) resolver via Google Public DNS to seamlessly resolve domains to IP addresses.
  - Quick-preset chips for popular public resolvers (Cloudflare, Google, Quad9).
  - One-click reset to your own IP address.
- **🗺️ Interactive Satellite Map**
  - Powered by Google Maps Hybrid View (high-resolution satellite imagery with vector road and landmark overlays).
  - High-precision coordinate pinning with 1-click copying (`lat, lng`).
  - Interactive zoom controls (+ / -) and instant view reloader.
  - Direct external link to Google Maps search.
  - Geographic breakdown: City, District, State/Province, Capital, Postal/ZIP code, and Continent.
- **📡 Network & Routing Telemetry**
  - Internet Service Provider (ISP) and Autonomous System (Organization).
  - Connection type, Country TLD, International calling code, and Geoname ID.
- **⏰ Real-time Local Clock & Timezone**
  - Live ticking seconds clock reflecting the exact local time at the detected location.
  - Formatted calendar date, Timezone identifier (e.g., `Europe/Paris`, `America/Los_Angeles`).
  - UTC Offset badge (`UTC+01:00`, `UTC-08:00`) and Daylight Saving Time (DST) status.
- **💻 Client & Device Diagnostics**
  - Operating System detection (Windows, macOS, Linux, iOS, Android) with badges.
  - Web browser detection (Chrome, Firefox, Safari, Edge) with versions.
  - Display resolution, screen pixel ratio (Retina display detection), and device form factor.
  - Real-time online/offline network listener.
- **🪙 Currency & Regional Locale**
  - Official currency name, currency code, and currency symbol (e.g., `EUR (€)`, `USD ($)`).
  - Spoken / official languages pills.
- **📜 Lookup & Connection History**
  - Slide-over history drawer logging every connection and query.
  - Grouped by day with relative timestamps.
  - One-click to re-inspect any historical IP.
  - Dedicated Clear History action.
- **🛠️ Developer Tools & Raw JSON Modal**
  - Full syntax-highlighted JSON viewer.
  - One-click Copy JSON and Generate cURL command.
  - Export and download telemetry as `.json` file.
- **🌓 Modern Glassmorphism & Theme Control**
  - Dark, Light, and System theme synchronization.
  - Zero-flash theme initialization script.
  - Responsive Bento Grid UI crafted with Tailwind CSS.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+) or Bun (v1.0+)
- npm or bun

### Installation

```bash
git clone https://github.com/mohammad-hosein-shahpouri/RequestInfo.git
cd RequestInfo
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
```

Build output is optimized and minified into the `build/` directory with gzip compression.

### Preview Production Build

```bash
npm run preview
```

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Mapping**: [Google Maps](https://maps.google.com/) (interactive embed & direct links)
- **UI Primitives**: [shadcn/ui](https://ui.shadcn.com/) (`class-variance-authority`, `clsx`, `tailwind-merge`)
- **Icons**: [Lucide React](https://lucide.dev/) (lightweight & tree-shakeable)
- **Time Manipulation**: [Day.js](https://day.js.org/)
- **Device Telemetry**: [react-device-detect](https://github.com/duskload/react-device-detect)

---

## ☕ Support & Author

Developed by **Mohammad Hosein Shahpouri**:

- 🌐 GitHub: [@mohammad-hosein-shahpouri](https://github.com/mohammad-hosein-shahpouri)
- 💼 LinkedIn: [mohammad-hosein-shahpouri](https://www.linkedin.com/in/mohammad-hosein-shahpouri/)
- ☕ Buy Me a Coffee: [coffeete.ir/mohammad-hosein-shahpouri](https://www.coffeete.ir/mohammad-hosein-shahpouri)
