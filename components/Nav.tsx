"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINKS = [
  { id: "profile", label: "Profile" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("profile");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.getAttribute("data-theme") !== "light");

    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  function toggleTheme() {
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("ma-theme", next);
    } catch {
      /* storage unavailable */
    }
    setIsDark(!isDark);
  }

  return (
    <div className="sticky top-4 z-40 px-4 md:px-0">
      <nav
        className={`wrap bento-card flex items-center justify-between h-14 px-5 transition-shadow duration-300 ${
          scrolled ? "shadow-[0_16px_40px_-24px_rgba(0,0,0,0.5)]" : ""
        }`}
        style={{ borderRadius: 999 }}
      >
        <a href="#" className="font-heading font-semibold text-sm tracking-wide" data-cursor-hover>
          MALAHIMA<span className="text-accent-bright">.</span>AMIR
        </a>

        <ul className="hidden md:flex gap-7 mono-label">
          {LINKS.map((l) => (
            <li key={l.id} className="relative py-2">
              <a href={`#${l.id}`} data-cursor-hover className={active === l.id ? "text-text-primary" : "text-text-secondary"}>
                {l.label}
              </a>
              {active === l.id && (
                <motion.div
                  layoutId="nav-active-dot"
                  className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-accent-bright"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        <button
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          data-cursor-hover
          className="w-9 h-9 rounded-full border border-border-subtle bg-bg-elevated flex items-center justify-center overflow-hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isDark ? "moon" : "sun"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-base leading-none"
            >
              {isDark ? "🌙" : "☀️"}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>
    </div>
  );
}
