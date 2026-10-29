"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS, Project } from "@/lib/data";
import ProjectDiagram from "@/components/ProjectDiagram";

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = PROJECTS.find((p) => p.id === selectedId) ?? null;

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedId(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="projects" className="py-20 md:py-24 border-t border-border-subtle">
      <div className="wrap">
        <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(24px,3.2vw,36px)] font-semibold max-w-[26ch]"
          >
            {PROJECTS.length} picks, out of 40+ shipped projects.
          </motion.h2>
          <p className="text-text-secondary text-[15px] max-w-[42ch]">
            These are the ones worth walking through in detail — different stacks, different roles. Click any project
            to open the full case study.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => {
            const featured = i % 2 === 0;
            return (
              <motion.div
                key={p.id}
                layoutId={p.id}
                onClick={() => setSelectedId(p.id)}
                data-cursor-hover
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                className={`bento-card bento-card-interactive cursor-pointer p-6 ${featured ? "lg:col-span-2 bento-glow-corner" : ""}`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="mono-label mb-2 text-text-muted">PROJECT — {p.name.toUpperCase()}</div>
                    <h3 className="text-xl font-semibold font-heading">{p.name}</h3>
                    <p className="text-text-secondary text-sm mt-1">{p.tag}</p>
                  </div>
                  <span
                    className={`shrink-0 font-mono text-[11px] px-2.5 py-1 rounded-md ${
                      p.mode === "solo"
                        ? "bg-[color-mix(in_srgb,var(--accent-bright)_15%,transparent)] text-accent-bright"
                        : "bg-[color-mix(in_srgb,var(--accent-glow)_15%,transparent)] text-accent-glow"
                    }`}
                  >
                    {p.mode === "solo" ? "SOLO" : "TEAM"}
                  </span>
                </div>

                {featured && p.pipeline && (
                  <div className="mt-5 rounded-xl border border-border-subtle bg-[color-mix(in_srgb,var(--bg-primary)_40%,transparent)] px-4 py-3">
                    <ProjectDiagram stages={p.pipeline} caption={p.pipelineCaption ?? ""} />
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-5">
                  {p.tech.slice(0, featured ? 6 : 4).map((t) => (
                    <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-bg-elevated border border-border-subtle text-text-secondary">
                      {t}
                    </span>
                  ))}
                  {p.tech.length > (featured ? 6 : 4) && (
                    <span className="font-mono text-[11px] px-2.5 py-1 text-text-muted">
                      +{p.tech.length - (featured ? 6 : 4)} more
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-[70] flex items-start md:items-center justify-center p-4 md:p-8 overflow-y-auto">
              <motion.div
                layoutId={selected.id}
                className="bento-card w-full max-w-2xl !rounded-3xl border-border-active p-7 md:p-9 my-8"
              >
                <CaseStudyDetail project={selected} onClose={() => setSelectedId(null)} />
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

function CaseStudyDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div>
      <div className="flex justify-between items-start gap-4 mb-6">
        <div>
          <div className="mono-label mb-2 text-text-muted">PROJECT — {project.name.toUpperCase()}</div>
          <h3 className="text-2xl font-semibold font-heading">{project.name}</h3>
          <p className="text-text-secondary text-sm mt-1">{project.tag}</p>
          <p className="font-mono text-[12px] text-accent-bright mt-2">{project.role}</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close case study"
          data-cursor-hover
          className="shrink-0 w-8 h-8 rounded-lg border border-border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary"
        >
          ✕
        </button>
      </div>

      <ul className="flex flex-col gap-2.5 mb-6">
        {project.points.map((pt) => (
          <li key={pt} className="text-[14px] text-text-secondary pl-4 relative">
            <span className="absolute left-0 text-text-muted">—</span>
            {pt}
          </li>
        ))}
      </ul>

      {project.pipeline && (
        <div className="mb-6 rounded-xl border border-border-subtle bg-[color-mix(in_srgb,var(--bg-primary)_40%,transparent)] p-5">
          <ProjectDiagram stages={project.pipeline} caption={project.pipelineCaption ?? ""} />
        </div>
      )}

      {project.links && (
        <div className="flex flex-wrap gap-3 mb-6">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="font-mono text-[12px] px-3 py-1.5 rounded-md border border-border-active text-accent-bright hover:bg-bg-elevated transition-colors"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-bg-elevated border border-border-subtle text-text-secondary">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
