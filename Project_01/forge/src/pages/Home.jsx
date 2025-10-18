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