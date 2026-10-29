"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ProjectDiagram({ stages, caption }: { stages: string[]; caption: string }) {
  const stageRefs = useRef<(SVGGElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const rootRef = useRef<SVGSVGElement | null>(null);

  const w = 560;
  const h = 130;
  const n = stages.length;
  const gap = w / n;
  const y = h / 2;
  const boxW = 118;
  const boxH = 46;

  const points = stages.map((_, i) => gap * i + gap / 2);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tl = gsap.timeline();

    stages.forEach((_, i) => {
      const stageEl = stageRefs.current[i];
      if (!stageEl) return;

      if (reduceMotion) {
        gsap.set(stageEl, { opacity: 1, scale: 1 });
        return;
      }

      gsap.set(stageEl, { opacity: 0, scale: 0.85, transformOrigin: "center" });
      tl.to(stageEl, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, i === 0 ? 0 : ">-0.05");

      if (i < n - 1) {
        const line = lineRefs.current[i];
        const dot = dotRefs.current[i];
        if (line) {
          gsap.set(line, { strokeDashoffset: 1 });
          tl.to(line, { strokeDashoffset: 0, duration: 0.35, ease: "power1.inOut" }, ">-0.05");
        }
        if (dot) {
          gsap.set(dot, { opacity: 1, attr: { cx: points[i] + boxW / 2 } });
          tl.to(dot, { attr: { cx: points[i + 1] - boxW / 2 }, duration: 0.45, ease: "power1.inOut" }, "<");
        }
      }
    });

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <figure className="m-0">
      <svg
        ref={rootRef}
        viewBox={`0 0 ${w} ${h}`}
        role="img"
        aria-label={`Flow: ${stages.join(" to ")}`}
        className="w-full h-auto text-text-secondary"
      >
        {points.map((cx, i) =>
          i < n - 1 ? (
            <line
              key={`line-${i}`}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              x1={cx + boxW / 2}
              y1={y}
              x2={points[i + 1] - boxW / 2}
              y2={y}
              stroke="currentColor"
              strokeWidth={1.4}
              pathLength={1}
              strokeDasharray={1}
              opacity={0.55}
            />
          ) : null
        )}
        {points.map((cx, i) => (
          <circle
            key={`dot-${i}`}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            r={3}
            cy={y}
            cx={cx}
            fill="var(--accent-bright)"
            opacity={0}
          />
        ))}
        {stages.map((label, i) => {
          const cx = points[i];
          const words = label.split(" ");
          const mid = Math.ceil(words.length / 2);
          const twoLines = words.length > 2;
          const line1 = twoLines ? words.slice(0, mid).join(" ") : label;
          const line2 = twoLines ? words.slice(mid).join(" ") : null;
          return (
            <g
              key={label}
              ref={(el) => {
                stageRefs.current[i] = el;
              }}
            >
              <rect
                x={cx - boxW / 2}
                y={y - boxH / 2}
                width={boxW}
                height={boxH}
                rx={8}
                fill="var(--bg-secondary)"
                stroke="currentColor"
                strokeWidth={1.4}
              />
              <text
                x={cx}
                y={line2 ? y - 2 : y + 4}
                textAnchor="middle"
                fontFamily="var(--font-mono), monospace"
                fontSize="9.5"
                fill="var(--text-primary)"
              >
                {line1}
              </text>
              {line2 && (
                <text
                  x={cx}
                  y={y + 10}
                  textAnchor="middle"
                  fontFamily="var(--font-mono), monospace"
                  fontSize="9.5"
                  fill="var(--text-primary)"
                >
                  {line2}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <figcaption className="font-mono text-[11px] text-text-muted mt-2.5">{caption}</figcaption>
    </figure>
  );
}
