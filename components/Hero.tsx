"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import ErrorBoundary from "@/components/ErrorBoundary";
import { STATS } from "@/lib/data";

const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="mono-label text-text-muted">loading scene…</span>
    </div>
  ),
});

export default function Hero() {
  return (
    <header className="pt-16 pb-20 md:pt-20 md:pb-24">
      <div className="wrap grid md:grid-cols-3 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bento-card bento-card-feature bento-glow-corner md:col-span-2 p-7 md:p-10 flex flex-col justify-center"
        >
          <div className="mono-label flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-bright pulse-dot" />
            PORTFOLIO — BACKEND / AI / CLOUD
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[clamp(30px,4.4vw,50px)] leading-[1.08] font-semibold"
          >
            Four years building backend systems and{" "}
            <span className="text-accent-bright">AI agents</span> that reach{" "}
            <span className="text-accent-bright">production</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="text-text-secondary text-[16px] max-w-[48ch] mt-6"
          >
            Full stack developer specializing in backend architecture and AI engineering — working across APIs, AI
            agents, and mobile apps.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            <MagneticButton href="#projects">
              <span className="inline-flex items-center gap-2 rounded-lg bg-accent-bright text-bg-primary font-mono text-sm px-6 py-3.5">
                View Projects →
              </span>
            </MagneticButton>
            <MagneticButton href="#contact">
              <span className="inline-flex items-center gap-2 rounded-lg border border-border-active font-mono text-sm px-6 py-3.5">
                Start a Conversation
              </span>
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bento-card md:row-span-2 relative aspect-square md:aspect-auto overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center mono-label text-white/50 pointer-events-none">
            <span>Live Stack</span>
            <b className="text-white/85">ONLINE</b>
          </div>
          <ErrorBoundary
            fallback={
              <div className="w-full h-full flex items-center justify-center text-center px-6">
                <span className="mono-label text-white/40">3D preview unavailable in this browser — everything else on the page still works.</span>
              </div>
            }
          >
            <HeroScene />
          </ErrorBoundary>
          <div className="absolute bottom-0 left-0 right-0 z-10 p-3.5 flex justify-between mono-label text-[10px] text-white/40 pointer-events-none">
            <span>NODE.SYSTEM.v1</span>
            <span>drag to rotate</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="bento-card md:col-span-2 p-6 flex flex-wrap items-center gap-x-7 gap-y-3 mono-label text-text-muted"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-glow pulse-dot" />
            <b className="text-text-secondary font-medium">Available</b>&nbsp;for select projects
          </span>
          <span>📍 Islamabad, Pakistan</span>
          <span>Solo ownership or team specialist</span>
        </motion.div>

        <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="bento-card bento-card-interactive p-5"
            >
              <div className="font-heading text-2xl md:text-3xl font-semibold text-accent-bright">{s.value}</div>
              <div className="text-text-secondary text-[12.5px] mt-1.5 leading-snug">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </header>
  );
}
