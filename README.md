# Malahima Amir — Portfolio

Next.js 14 (App Router) + TypeScript + Tailwind, with Framer Motion, GSAP/ScrollTrigger, Lenis smooth scroll, and a react-three-fiber hero scene.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Content

All real content — projects, skills, experience, chatbot answers — lives in one file: `lib/data.ts`. Edit that file to update anything on the site; no need to touch component code for text changes.

## Contact form

The form has no backend — it opens the visitor's email app via a `mailto:` link pre-filled with their message. Zero setup, zero cost. If you later want messages to land straight in your inbox instead, that needs an email API (e.g. Resend or your SendGrid account) wired into a Next.js API route — ask and I'll add it once you have a key.

## Chatbot

Rule-based, not an LLM — it matches visitor questions against keyword rules in `lib/data.ts` (`CHATBOT_QA`). No API key, no cost, always available. If you later want a real AI-powered version, that needs an Anthropic or OpenAI API key wired into an API route.

## Deploy (Vercel — recommended, free for personal projects)

1. Push this folder to a GitHub repo.
2. Go to vercel.com → New Project → import the repo.
3. No environment variables are required for the current build.
4. Deploy — Vercel auto-detects Next.js.

## Editing the theme

Colors live as CSS variables in `app/globals.css` (`:root` = dark, `[data-theme="light"]` = light override). Fonts are set in `app/layout.tsx` via `next/font/google` (Sora / Inter / JetBrains Mono).
