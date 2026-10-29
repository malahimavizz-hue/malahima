"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CHATBOT_QA, CHATBOT_FALLBACK } from "@/lib/data";

interface Msg {
  role: "bot" | "user";
  text: string;
}

function findAnswer(question: string): string {
  const q = question.toLowerCase();
  // match keywords at the start of a word, so "ai" doesn't fire on "email" or "available"
  const hits = (k: string) => new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(q);
  for (const entry of CHATBOT_QA) {
    if (entry.keywords.some(hits)) return entry.answer;
  }
  return CHATBOT_FALLBACK;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: 'Hi — I can answer questions about Malahima’s projects, stack, and experience. Try "What’s her AWS experience?" or "Has she built anything solo?"',
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, thinking]);

  function send() {
    const q = input.trim();
    if (!q || thinking) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: q }]);
    setThinking(true);
    const delay = 500 + Math.random() * 500;
    window.setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: findAnswer(q) }]);
      setThinking(false);
    }, delay);
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label="Ask about my work"
        data-cursor-hover
        animate={open ? { y: 0 } : { y: [0, -8, 0] }}
        transition={open ? {} : { duration: 0.6, repeat: Infinity, repeatDelay: 5.4, ease: "easeInOut" }}
        className="fixed right-5 bottom-5 z-50 w-14 h-14 rounded-full bg-accent-bright text-bg-primary flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.35)]"
      >
        <span className="text-xl leading-none">{open ? "✕" : "💬"}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="fixed right-5 bottom-[88px] z-50 w-[340px] max-w-[calc(100vw-40px)] h-[440px] max-h-[calc(100vh-140px)]
              rounded-2xl border border-border-active bg-bg-elevated shadow-[0_20px_50px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden backdrop-blur-md"
          >
            <div className="px-4 py-3.5 border-b border-border-subtle font-mono text-xs text-text-secondary">
              Ask about <b className="text-text-primary">Malahima&apos;s work</b>
            </div>

            <div ref={bodyRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`text-[13.5px] leading-relaxed max-w-[88%] px-3.5 py-2.5 rounded-xl ${
                    m.role === "bot"
                      ? "bg-bg-secondary self-start"
                      : "bg-accent-bright text-bg-primary self-end"
                  }`}
                >
                  {m.text}
                </motion.div>
              ))}
              {thinking && (
                <div className="bg-bg-secondary self-start px-3.5 py-3 rounded-xl flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-text-muted"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex border-t border-border-subtle p-2.5 gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask a question…"
                maxLength={300}
                className="flex-1 bg-bg-secondary border border-border-subtle rounded-lg px-3 py-2.5 text-[13.5px] text-text-primary focus:outline-none focus:border-accent-bright"
              />
              <button
                onClick={send}
                data-cursor-hover
                className="bg-accent-bright text-bg-primary rounded-lg px-3.5 font-mono text-xs"
              >
                Ask
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
