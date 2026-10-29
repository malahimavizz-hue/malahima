"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/lib/data";

const ICONS: Record<string, string> = {
  Backend: "⚙️",
  "AI & Automation": "🤖",
  Databases: "🗄️",
  "Cloud & DevOps": "☁️",
  Frontend: "🎨",
  "Payments & Auth": "💳",
  "Testing & Docs": "🧪",
};

const chip = {
  hidden: { opacity: 0, scale: 0.9 },
  show: (i: number) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.02, duration: 0.25 } }),
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-24 border-t border-border-subtle">
      <div className="wrap">
        <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(24px,3.2vw,36px)] font-semibold max-w-[26ch]"
          >
            What I actually build with.
          </motion.h2>
          <p className="text-text-secondary text-[15px] max-w-[40ch]">
            No skill bars, no percentages — just the tools that show up in the projects below.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((category, ci) => {
            const featured = category.name === "AI & Automation";
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (ci % 3) * 0.06 }}
                className={`bento-card bento-card-interactive p-6 ${featured ? "lg:col-span-2 bento-card-feature bento-glow-corner" : ""}`}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-xl leading-none">{ICONS[category.name] ?? "🔧"}</span>
                  <h3 className="font-heading font-semibold text-[15px]">{category.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {category.items.map((item, i) => (
                    <motion.span
                      key={item}
                      custom={i}
                      variants={chip}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      whileHover={{ y: -2, filter: "brightness(1.2)" }}
                      className="font-mono text-[12.5px] px-3.5 py-2 rounded-lg bg-bg-elevated border border-border-subtle"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
