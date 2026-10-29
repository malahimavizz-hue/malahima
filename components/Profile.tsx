"use client";

import { motion } from "framer-motion";
import { PROFILE } from "@/lib/data";

const FACTS: [string, string, string][] = [
  ["🧩", "ROLE", PROFILE.role],
  ["🕒", "SINCE", PROFILE.since],
  ["🧠", "STACK", PROFILE.stackSummary],
  ["🤝", "MODE", PROFILE.mode],
  ["📍", "LOCATION", PROFILE.location],
  ["🎓", "EDUCATION", PROFILE.education],
];

const tileVariants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
};

export default function Profile() {
  return (
    <section id="profile" className="py-20 md:py-24 border-t border-border-subtle">
      <div className="wrap flex flex-col gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="bento-card bento-glow-corner p-7 md:p-9"
        >
          <div className="mono-label mb-4">Profile</div>
          <p className="text-[clamp(21px,2.6vw,29px)] leading-[1.3] font-medium font-heading max-w-[42ch]">
            I ship production software end to end when I own the project — and slot into whatever role a team
            needs, backend, AI, DevOps, or frontend, on web or mobile.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {FACTS.map(([icon, k, v], i) => (
            <motion.div
              key={k}
              custom={i}
              variants={tileVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bento-card bento-card-interactive p-5 flex flex-col gap-2"
            >
              <span className="text-xl leading-none">{icon}</span>
              <div className="mono-label text-text-muted">{k}</div>
              <div className="text-text-primary text-[14.5px] font-medium leading-snug">{v}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
