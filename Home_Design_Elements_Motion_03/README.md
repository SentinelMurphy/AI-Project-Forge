# Home Page Guide — React + Vite + Tailwind + SCSS Module

This guide includes:
- a short "Install packages" section 
- the full Home.jsx source, (Please write out and ask questions)
- the Home.module.scss and How they align with the Home.jsx,
- and a clear breakdown of how each function and section works.

---

## Install packages 

Run this to install the listed packages:
```bash
# using npm
npm install @react-three/drei @react-three/fiber motion react-responsive

```

What each package is for:
- @react-three/fiber
    - React renderer for three.js. Use it to create and manage 3D scenes with React primitives (meshes, cameras, lights) instead of directly using the imperative three.js API.
    - Typical use: build WebGL/3D visuals inside React apps with declarative components.
- @react-three/drei
    - A collection of useful helpers and abstractions for react-three-fiber (e.g., loaders, controls, environment helpers, presets).
    - Typical use: speed up 3D development by reusing common building blocks instead of writing them from scratch.
- motion & Framer-motion (Same)
    - A small, high-performance animation library for web UI animations . Useful for animating DOM and SVG properties with a minimal footprint.
    - Typical use: quick, performant UI animations that respect reduced-motion preferences.
- react-responsive
    - A utility for rendering different React components or applying logic based on media queries / screen sizes.
    - Typical use: show/hide or switch behavior in components based on screen width, orientation, or other media queries.

Notes:
- These packages are optional for the Home page code provided in this guide; the Home.jsx relies on Tailwind + SCSS module for its visuals. Add the above packages only if you plan to incorporate 3D content, Motion animations, or responsive logic elsewhere in your app.
- If you intended a different animation library (e.g., framer-motion or @motionone/react), replace `motion` with the intended package. The command above installs the `motion` package as requested.

---

## Files involved
- src/components/Home.jsx
- src/styles/Home.module.scss

---

## Home.jsx (full source)
```jsx
import React from "react";
import styles from "../styles/Home.module.scss";

const Feature = ({ icon, title, children, delay = 0 }) => (
  <div
    className={[
      "group rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur p-6 transition-colors hover:border-white/20",
      styles.fadeInUp,
    ].join(" ")}
    style={{ "--delay": `${delay}ms` }}
  >
    <div className="flex items-start gap-4">
      <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-800/60 ring-1 ring-white/10 group-hover:ring-white/20 transition">
        {icon}
      </div>
      <div>
        <h3 className="text-white font-semibold tracking-tight">{title}</h3>
        <p className="mt-1 text-slate-400">{children}</p>
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 antialiased">
      <div className={styles.blobs} aria-hidden="true">
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />
      </div>

      <section className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-6">
        <span
          className={[
            "rounded-full border border-white/10 bg-slate-900/50 px-3 py-1 text-xs text-slate-300 backdrop-blur",
            styles.fadeInUp,
          ].join(" ")}
          style={{ "--delay": "0ms" }}
        >
          React + Vite + Tailwind
        </span>

        <h1
          className={[
            "mt-4 text-center text-5xl font-extrabold leading-tight tracking-tight md:text-7xl",
            styles.fadeInUp,
          ].join(" ")}
          style={{ "--delay": "120ms" }}
        >
          <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Build. Ship. Delight.
          </span>
        </h1>

        <p
          className={["mt-5 max-w-2xl text-center text-lg text-slate-400 md:text-xl", styles.fadeInUp].join(" ")}
          style={{ "--delay": "240ms" }}
        >
          A clean, animated landing experience using Tailwind utilities and a tiny SCSS module. Smooth by default,
          gentle on motion preferences.
        </p>

        <div
          className={["mt-8 flex items-center gap-3", styles.fadeInUp].join(" ")}
          style={{ "--delay": "360ms" }}
        >
          <a
            href="#get-started"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-5 py-3 font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:bg-indigo-400"
          >
            Get Started
          </a>
          <a
            href="#learn-more"
            className="inline-flex items-center justify-center rounded-xl bg-slate-800/60 px-5 py-3 font-medium text-slate-200 ring-1 ring-white/10 backdrop-blur transition hover:ring-white/20"
          >
            Learn More
          </a>
        </div>
      </section>

      <section id="learn-more" className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Feature
            title="Fast by default"
            delay={0}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-indigo-300">
                <path
                  d="M13 3l-1 6h6l-7 12 1-6H6l7-12z"
                  fill="currentColor"
                  className="opacity-90"
                />
              </svg>
            }
          >
            Vite dev server, instant HMR, and Tailwind JIT keep the feedback loop tight.
          </Feature>

          <Feature
            title="Simple animations"
            delay={120}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-fuchsia-300">
                <circle cx="12" cy="12" r="9" fill="currentColor" className="opacity-90" />
              </svg>
            }
          >
            Subtle fade, float, and glow with no extra libraries. Fully respects reduced motion.
          </Feature>

          <Feature
            title="Composable UI"
            delay={240}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-cyan-300">
                <rect x="4" y="4" width="7" height="7" rx="2" fill="currentColor" className="opacity-90" />
                <rect x="13" y="4" width="7" height="7" rx="2" fill="currentColor" className="opacity-70" />
                <rect x="4" y="13" width="7" height="7" rx="2" fill="currentColor" className="opacity-70" />
                <rect x="13" y="13" width="7" height="7" rx="2" fill="currentColor" className="opacity-50" />
              </svg>
            }
          >
            Keep it modular with small, focused components and SCSS modules for local styles.
          </Feature>
        </div>
      </section>
      <footer className="relative mx-auto max-w-6xl px-6 pb-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Your Project. All rights reserved.
      </footer>
    </main>
  );
}
```

---

## How the code works — breakdown by function & section

### Feature component
- Signature: `const Feature = ({ icon, title, children, delay = 0 }) => (...)`
- Responsibility:
    - Presentational card for a single feature (icon, title, description).
    - Reusable: used three times in the "learn more" grid.
- Key behavior and code mappings:
    - className: merges Tailwind utilities for card appearance and `styles.fadeInUp` for entrance animation.
    - style: `style={{ "--delay": `${delay}ms` }}` sets the CSS custom property `--delay` used in `.fadeInUp` to stagger animations.
    - The `.group` class is used so the icon container can change ring color on hover (`group-hover:ring-white/20`).
- Accessibility & motion:
    - `prefers-reduced-motion` in SCSS disables animations if the user requests reduced motion.

### Home (default export) — page structure
- Root `<main>`:
    - Sets page background, text color, min height and allows absolute-positioned decorative blobs.
- Decorative blobs:
    - Container: `styles.blobs` holds three blob elements.
    - Each blob uses `styles.blob` and one of `styles.blob1`/`blob2`/`blob3` for position/color/delay.
    - They are decorative (aria-hidden="true") and animated with `blobMove`.
- Hero section:
    - Small label, H1, description, and CTAs. Each uses `styles.fadeInUp` with staggered `--delay` values (0ms, 120ms, 240ms, 360ms).
    - Tailwind handles layout, spacing, gradients, hover states and button styling.
- Learn more / Features grid:
    - Responsive Tailwind grid with three Feature components; delays are 0, 120, 240ms respectively.
- Footer:
    - Simple centered footer using current year via `new Date().getFullYear()`.

---

## SCSS module
```scss
.blobs {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.blob {
  position: absolute;
  width: 40vmax;
  height: 40vmax;
  filter: blur(60px);
  opacity: 0.45;
  mix-blend-mode: screen;
  transform: translate3d(0, 0, 0);
  animation: blobMove 18s ease-in-out infinite;
}

.blob1 {
  top: -10%;
  left: -10%;
  background: radial-gradient(closest-side, #6366f1 0%, transparent 65%);
  animation-delay: -4s;
}

.blob2 {
  bottom: -15%;
  right: -10%;
  background: radial-gradient(closest-side, #22d3ee 0%, transparent 65%);
  animation-delay: -10s;
}

.blob3 {
  top: 20%;
  right: 20%;
  background: radial-gradient(closest-side, #e879f9 0%, transparent 65%);
  animation-delay: -1s;
}

@keyframes blobMove {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  33%  { transform: translate3d(4%, -2%, 0) scale(1.05); }
  66%  { transform: translate3d(-3%, 3%, 0) scale(0.98); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}


.fadeInUp {
  opacity: 0;
  transform: translateY(8px);
  animation: fadeInUp 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--delay, 0ms);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .blob {
    animation: none;
    opacity: 0.18;
  }
  .fadeInUp {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

How SCSS maps to JSX:
- `.blobs`: positions the container absolutely and hides pointer events so background is decorative.
- `.blob`: base blur, size, mix-blend and the `blobMove` animation for each blob element.
- `.blob1/.blob2/.blob3`: color gradients, positions and desynchronized animation delays to create organic motion.
- `.fadeInUp`: used on hero elements and Feature cards; it reads `--delay` to stagger animations.

---



