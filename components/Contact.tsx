"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT } from "@/lib/data";
import Chatbot from "@/components/Chatbot";

type SendState = "idle" | "sending" | "sent";

export default function Contact() {
  const [state, setState] = useState<SendState>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name || !email || !message || state === "sending") return;
    setState("sending");

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    const mailto = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;

    window.setTimeout(() => {
      window.location.href = mailto;
      setState("sent");
      window.setTimeout(() => {
        setState("idle");
        setName("");
        setEmail("");
        setMessage("");
      }, 2600);
    }, 500);
  }

  return (
    <section id="contact" className="py-20 md:py-24 border-t border-border-subtle">
      <div className="wrap grid md:grid-cols-[.85fr_1.15fr] gap-10 md:gap-14 items-start">
        <div>
          <div className="mono-label mb-4">Contact</div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(24px,3.2vw,36px)] font-semibold"
          >
            Have something that needs building?
          </motion.h2>
          <p className="text-text-secondary mt-4 max-w-[38ch]">
            Reach out directly, or send a message — I read every one.
          </p>
          <div className="bento-card bento-card-interactive flex flex-col gap-4 mt-8 p-6">
            <a href={CONTACT.phoneHref} data-cursor-hover className="font-mono text-[15px] flex items-center gap-2.5 hover:text-accent-bright transition-colors">
              📞 {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} data-cursor-hover className="font-mono text-[15px] flex items-center gap-2.5 hover:text-accent-bright transition-colors">
              ✉ {CONTACT.email}
            </a>
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" data-cursor-hover className="font-mono text-[15px] flex items-center gap-2.5 hover:text-accent-bright transition-colors">
              ⌥ github.com/malahimaamir
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" data-cursor-hover className="font-mono text-[15px] flex items-center gap-2.5 hover:text-accent-bright transition-colors">
              in LinkedIn — Malahima Amir
            </a>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="bento-card bento-glow-corner p-7"
        >
          <FloatingField id="cf-name" label="Name" value={name} onChange={setName} />
          <FloatingField id="cf-email" label="Email" type="email" value={email} onChange={setEmail} />
          <FloatingField id="cf-msg" label="Message" textarea value={message} onChange={setMessage} />

          <button
            type="submit"
            disabled={state === "sending"}
            data-cursor-hover
            className="w-full rounded-lg bg-accent-bright text-bg-primary font-mono text-sm px-6 py-3.5 mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <AnimatePresence mode="wait" initial={false}>
              {state === "idle" && (
                <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Send Message
                </motion.span>
              )}
              {state === "sending" && (
                <motion.span
                  key="sending"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-4 h-4 rounded-full inline-block"
                  style={{
                    border: "2px solid rgba(10,14,20,0.35)",
                    borderTopColor: "var(--bg-primary)",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
              )}
              {state === "sent" && (
                <motion.span
                  key="sent"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  ✓ Opened your email app
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.form>
      </div>
      <Chatbot />
    </section>
  );
}

function FloatingField({
  id,
  label,
  value,
  onChange,
  type = "text",
  textarea = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
}) {
  const shared =
    "peer w-full bg-bg-elevated border border-border-subtle rounded-lg px-3.5 pt-5 pb-2 text-sm text-text-primary placeholder-transparent focus:outline-none focus:border-accent-bright transition-colors";
  return (
    <div className="relative mb-4">
      {textarea ? (
        <textarea
          id={id}
          required
          rows={4}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={shared + " resize-y"}
        />
      ) : (
        <input
          id={id}
          type={type}
          required
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={shared}
        />
      )}
      <label
        htmlFor={id}
        className="absolute left-3.5 top-3.5 text-text-muted text-sm transition-all pointer-events-none
          peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-accent-bright peer-focus:tracking-wide
          peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:tracking-wide"
      >
        {label.toUpperCase()}
      </label>
    </div>
  );
}
