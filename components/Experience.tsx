"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const startDotRef = useRef<SVGCircleElement>(null);
  const endDotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !lineRef.current || !sectionRef.current) return;

    gsap.set(lineRef.current, { strokeDashoffset: 1 });
    gsap.set(endDotRef.current, { scale: 0.5, opacity: 0.4, transformOrigin: "center" });

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      end: "bottom 60%",
      scrub: 0.6,
      onUpdate: (self) => {
        gsap.to(lineRef.current, { strokeDashoffset: 1 - self.progress, duration: 0.1, overwrite: true });
        gsap.to(endDotRef.current, {
          scale: 0.5 + self.progress * 0.5,
          opacity: 0.4 + self.progress * 0.6,
          duration: 0.1,
          overwrite: true,
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section id="experience" className="py-20 md:py-24 border-t border-border-subtle" ref={sectionRef}>
      <div className="wrap">
        <div className="flex flex-wrap justify-between items-end gap-6 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(24px,3.2vw,36px)] font-semibold max-w-[26ch]"
          >
            Many projects, many roles.
          </motion.h2>
          <p className="text-text-secondary text-[15px] max-w-[42ch]">
            Four years across different teams and clients, moving between backend, AI, and mobile depending on what
            the project needed.
          </p>
        </div>

        <div className="grid grid-cols-[28px_1fr] md:grid-cols-[40px_1fr] gap-6 md:gap-10">
          <div className="relative flex flex-col items-center pt-1.5">
            <svg width="2" height="100%" className="absolute top-0 h-full text-border-active" style={{ minHeight: 220 }}>
              <line
                ref={lineRef}
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="currentColor"
                strokeWidth="2"
                pathLength={1}
                strokeDasharray={1}
              />
            </svg>
            <svg width="14" height="14" className="relative z-10">
              <circle ref={startDotRef} cx="7" cy="7" r="6" fill="var(--accent-bright)" />
            </svg>
            <div className="flex-1" />
            <svg width="14" height="14" className="relative z-10 mt-auto">
              <circle ref={endDotRef} cx="7" cy="7" r="6" fill="var(--accent-glow)" />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bento-card bento-card-interactive bento-glow-corner p-7 md:p-9 mb-2"
          >
            <div className="flex flex-wrap justify-between gap-4 mb-6">
              <div>
                <div className="text-xl font-semibold font-heading">{EXPERIENCE.role}</div>
                <div className="font-mono text-[13px] text-accent-bright mt-1.5">{EXPERIENCE.org}</div>
              </div>
              <div className="font-mono text-[12px] text-text-muted pt-1">{EXPERIENCE.time}</div>
            </div>
            <ul className="flex flex-col gap-3">
              {EXPERIENCE.points.map((pt, i) => (
                <motion.li
                  key={pt}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="text-[14.5px] text-text-secondary pl-5 relative"
                >
                  <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-accent-glow" />
                  {pt}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
