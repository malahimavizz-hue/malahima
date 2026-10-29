export type Mode = "solo" | "team";

export interface Project {
  id: string;
  name: string;
  tag: string;
  role: string;
  mode: Mode;
  points: string[];
  tech: string[];
  caseStudy: boolean;
  pipeline?: string[];
  pipelineCaption?: string;
  links?: { label: string; href: string }[];
}

export const PROJECTS: Project[] = [
  {
    id: "ayywa",
    name: "Ayywa",
    tag: "Real-Estate Social Network — Web, Mobile & Admin",
    role: "Backend Owner & Website Frontend Developer",
    mode: "team",
    caseStudy: true,
    points: [
      "Designed and built the shared NestJS + PostgreSQL backend serving three clients — website, mobile app, and admin panel — live on AWS",
      "Built the full website in Next.js, pixel-perfect to Figma, responsive from 260px to 1920px, in English and Arabic (RTL)",
      "Built AI moderation for text, images, video, and documents, plus AI search interpretation and auto-review rules feeding a staff review queue",
      "Implemented billing across Stripe subscriptions and Apple/Google in-app purchases — prorated upgrades, scheduled downgrades, and renewals across three providers",
      "Built a full ads manager with targeting, payments, delivery rules, and analytics; ads ship in a separate sponsored field so existing mobile builds kept working",
      "Built an S3 upload + AWS MediaConvert video pipeline with status tracking, handling HEIC images and large phone videos for smooth playback on web and mobile",
      "Added feed, posts, profiles, real-time chat with Zoom meetings, KYC verification with verified badges, insights dashboards, push/email notifications, and role-based staff access",
      "Documented every endpoint in Swagger with examples and covered critical flows with unit tests, keeping one API stable for a mobile team building in parallel",
    ],
    tech: ["NestJS", "PostgreSQL", "Next.js", "AWS S3", "AWS MediaConvert", "Stripe", "Apple & Google IAP", "Zoom OAuth", "Swagger", "Jest"],
    pipeline: ["Web / Mobile / Admin", "NestJS API", "AI Moderation", "Staff Review Queue"],
    pipelineCaption: "How content from three clients gets moderated.",
  },
  {
    id: "matching",
    name: "Event Matching Engine",
    tag: "AI Attendee Matching for a Networking Events Platform",
    role: "Backend & AI Developer",
    mode: "team",
    caseStudy: true,
    points: [
      "Built a microservice on the OpenAI Agents SDK that pairs attendees in live 10-minute rounds using strict structured outputs",
      "Added a lease-based round lock in MongoDB so only one of several server replicas computes each round",
      "Wrapped agent calls in a timeout with a deterministic Jaccard interest-similarity fallback, so a round always completes on time",
      "Prevented repeat pairings and proved the pairing rules with property-based tests (fast-check, 100+ runs per rule)",
      "Worked with Flutter and web teams through written API guides and queue/flow documentation",
    ],
    tech: ["Node.js", "TypeScript", "OpenAI Agents SDK", "MongoDB", "fast-check", "Structured Outputs"],
    pipeline: ["Round Starts", "Replica Lock", "AI Agent Match", "Jaccard Fallback"],
    pipelineCaption: "How every round gets paired, even if the AI is slow.",
  },
  {
    id: "envia",
    name: "Envia",
    tag: "AI Meeting & Calendar Extraction Platform",
    role: "Backend & AI Developer",
    mode: "team",
    caseStudy: true,
    points: [
      "Built a multi-agent extraction pipeline on AWS Bedrock Agent (Claude 3 Haiku orchestration) with dedicated Lambda action groups to pull structured meeting/event data from emails, PDFs, images, and raw text",
      "Built a serverless ingestion flow: incoming emails queue through AWS SQS and are processed by Lambda before reaching the agents",
      "Agents detect conflicts against user preferences and use agent memory to filter out what isn't relevant",
      "Built a conversational agent and multi-agent collaboration on top of the extraction pipeline",
      "Built a companion iCal-compliant Calendar API (Node.js, Fastify, Drizzle ORM) with full RFC 5545 support — RRULE recurrence expansion, single-instance exception edits, Bearer-token auth — deployed on AWS Lambda + API Gateway",
      "Scoped least-privilege IAM roles per Lambda action group and managed the infrastructure in Terraform",
    ],
    tech: ["Python", "AWS Bedrock Agent", "AWS Lambda", "AWS SQS", "Terraform", "Node.js", "Fastify", "Drizzle ORM", "MySQL", "TypeScript"],
    pipeline: ["Email / PDF / Image", "Bedrock Agent", "Lambda Action Group", "Calendar API"],
    pipelineCaption: "How Envia turns a raw email into a calendar entry.",
  },
  {
    id: "propdating",
    name: "PropDating",
    tag: "AI-Powered Food Dating App",
    role: "Backend Developer & AI Engineer",
    mode: "team",
    caseStudy: true,
    points: [
      "Built the backend in NestJS, Prisma, and PostgreSQL — geolocation-based discovery, match state machines, group features, and restaurant integrations",
      "Used GPT-4o for matchmaking logic: compatibility summaries, icebreakers, and eating-habit insights per match",
      "Built an AI food vision scanner that auto-tags dishes from photos and flags fake/stock images, stored in AWS S3",
      "Generated a \"Food DNA\" taste profile for each user from their photo scans",
      "Implemented JWT auth (access + refresh tokens) with Redis-backed OTP rate limiting and transactional emails via SendGrid",
      "Added real-time chat via Socket.io and push notifications through Firebase Cloud Messaging",
    ],
    tech: ["Node.js", "NestJS", "Prisma", "PostgreSQL", "Redis", "OpenAI API (GPT-4o)", "Socket.io", "AWS S3", "Firebase (FCM)"],
    pipeline: ["User A + User B", "Match Engine", "GPT-4o Scoring", "Compatibility Match"],
    pipelineCaption: "How two profiles become a match.",
  },
  {
    id: "lyrixa",
    name: "Lyrixa",
    tag: "Music Streaming & Artist Platform",
    role: "Full Stack Developer — solo, owned end to end",
    mode: "solo",
    caseStudy: true,
    points: [
      "Built a three-sided platform serving listeners, artists, and moderators/admins from one NestJS + Prisma + PostgreSQL backend",
      "Built artist-facing tools: audio uploads to AWS S3 with metadata extraction, analytics dashboard, subscription entitlements, and verification workflow",
      "Built moderator and admin tooling: content moderation queue, copyright review, genre/catalog management",
      "Implemented auth with JWT + Google OAuth (Passport) and request throttling",
      "Built the listener-facing frontend in Next.js (App Router) and Tailwind CSS — library, search, playlists, following, notifications, reviews",
    ],
    tech: ["NestJS", "Prisma", "PostgreSQL", "AWS S3", "Passport (JWT + Google OAuth)", "Next.js", "React", "Tailwind CSS"],
    pipeline: ["Listener / Artist / Admin", "NestJS API", "PostgreSQL", "S3 Storage"],
    pipelineCaption: "One backend, three different portals.",
  },
  {
    id: "fitfam",
    name: "FitFam",
    tag: "AI Health & Wellness Platform",
    role: "Backend Developer & AI Engineer",
    mode: "team",
    caseStudy: true,
    points: [
      "Built on Python, FastAPI, MongoDB, Redis, and Celery for background job processing",
      "Built a multi-persona AI coaching system (4 distinct coach personalities) with OpenAI-powered responses and text-to-speech voice output",
      "Built AI meal, nutrition, sleep, and skin analysis features",
      "Added intermittent fasting plans with barcode-based food scanning, hydration tracking, and guided audio sessions",
      "Built the social layer — posts, comments, reactions, follows, stories, community challenges, and livestreaming via Agora",
      "Added identity verification, content watermarking for user uploads, and real-time chat",
      "Set up auth (email, Google, Apple) and billing via Stripe and RevenueCat",
      "Deployed with Docker and Gunicorn behind App Store and Google Play apps",
    ],
    tech: ["Python", "FastAPI", "MongoDB", "Redis", "Celery", "OpenAI", "Agora", "Stripe", "RevenueCat", "WebSockets"],
    pipeline: ["User Request", "FastAPI", "AI Coach Persona", "MongoDB"],
    pipelineCaption: "How a check-in reaches the right AI coach.",
  },
  {
    id: "gymai",
    name: "Gym AI",
    tag: "AI Fitness Application",
    role: "Backend Developer & AI Engineer",
    mode: "team",
    caseStudy: false,
    points: [
      "Built on NestJS, TypeScript, and PostgreSQL, with modular architecture and role-based admin access",
      "Used OpenAI to generate personalized workout plans and exercise recommendations per user",
      "Wired up in-app purchases for App Store and Google Play, and push notifications via Firebase",
      "Built a gamification layer: streaks, coins, referrals, community fitness challenges",
      "Used Cloudinary for media handling and Pinecone for vector-based exercise search",
      "Deployed with Docker and PM2",
    ],
    tech: ["NestJS", "TypeScript", "PostgreSQL", "OpenAI", "Pinecone", "Firebase", "Cloudinary", "JWT"],
  },
  {
    id: "hamaravenue",
    name: "HamaraVenue",
    tag: "Venue & Vendor Booking Platform",
    role: "Full Stack Mobile Developer — backend + app",
    mode: "team",
    caseStudy: false,
    points: [
      "Built the backend and mobile app for a multi-vendor marketplace connecting users with banquet halls, farmhouses, and event vendors across major Pakistani cities",
      "Built search/discovery by destination, service type, and date, plus venue/vendor comparison",
      "Built the multi-step signup flow, OTP-based password recovery, and real-time chat/inbox",
      "Managed state with Redux Toolkit and React Query; used Formik and Yup for form validation",
    ],
    tech: ["React Native", "Expo", "Redux Toolkit", "React Query", "Formik", "Yup"],
  },
  {
    id: "vscode",
    name: "ErrorDost & DevDiary",
    tag: "AI Developer Tools — Published VS Code Extensions",
    role: "Creator — solo, owned end to end",
    mode: "solo",
    caseStudy: false,
    points: [
      "ErrorDost explains compiler and runtime errors in plain English, Urdu, Hindi, and Arabic",
      "DevDiary turns coding activity into AI-written daily reports",
      "Both work with OpenAI, Claude, Gemini, or a local Ollama model",
      "Published on the VS Code Marketplace and Open VSX",
    ],
    tech: ["TypeScript", "VS Code Extension API", "OpenAI", "Claude API", "Gemini API", "Ollama"],
    links: [
      { label: "ErrorDost on Marketplace", href: "https://marketplace.visualstudio.com/items?itemName=malahimaamir.errordost" },
      { label: "DevDiary on Marketplace", href: "https://marketplace.visualstudio.com/items?itemName=malahimaamir.devdiary" },
    ],
  },
  {
    id: "telegram",
    name: "Telegram Mini App",
    tag: "TON Blockchain NFT Drops",
    role: "Backend Developer",
    mode: "team",
    caseStudy: false,
    points: [
      "Built the backend for a Telegram Mini App running NFT drops on the TON blockchain",
      "Implemented Telegram authentication and Redis caching",
    ],
    tech: ["Node.js", "TON Blockchain", "Telegram Auth", "Redis"],
  },
  {
    id: "mds",
    name: "MDS Boat Dealerships",
    tag: "Dealership Websites for a Brand Group",
    role: "Web Developer",
    mode: "team",
    caseStudy: false,
    points: [
      "Built websites for the MDS brand group, including Colorado Boat Center and Captains Marine",
    ],
    tech: ["Next.js", "React", "Tailwind CSS"],
  },
];

export interface SkillCategory {
  name: string;
  items: string[];
}

export const SKILLS: SkillCategory[] = [
  {
    name: "Backend",
    items: ["Node.js", "NestJS", "Express", "Fastify", "TypeScript", "Python", "FastAPI", "Socket.io / WebSockets"],
  },
  {
    name: "AI & Automation",
    items: [
      "OpenAI API",
      "OpenAI Agents SDK",
      "AWS Bedrock Agent",
      "Claude API",
      "Gemini API",
      "Ollama",
      "AI Agents",
      "Structured Outputs",
      "Prompt Engineering",
      "Pinecone (Vector DB)",
      "Celery",
      "Cron & Scheduled Jobs",
      "Webhooks",
    ],
  },
  {
    name: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL / MariaDB", "SQLite", "Redis", "Prisma", "TypeORM", "Drizzle", "Mongoose"],
  },
  {
    name: "Cloud & DevOps",
    items: [
      "AWS Bedrock",
      "AWS Lambda",
      "API Gateway",
      "S3",
      "SQS",
      "SES",
      "MediaConvert",
      "Terraform",
      "Docker",
      "PM2",
      "Gunicorn",
      "Firebase",
      "Cloudinary",
    ],
  },
  {
    name: "Frontend",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Three.js",
      "Redux Toolkit",
      "React Query",
      "React Native (Expo)",
      "Bootstrap",
    ],
  },
  {
    name: "Payments & Auth",
    items: [
      "Stripe",
      "RevenueCat",
      "Apple & Google In-App Purchases",
      "JWT",
      "Google, Apple & Microsoft Sign-In",
      "Zoom OAuth",
    ],
  },
  { name: "Testing & Docs", items: ["Jest", "Vitest", "fast-check", "Swagger / OpenAPI", "Postman"] },
];

export interface Stat {
  value: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: "4+", label: "Years in production" },
  { value: "40+", label: "Projects delivered across web, mobile & AI" },
  { value: "6", label: "Picked below as full case studies" },
  { value: "1 of 6", label: "Case studies below owned solo, end to end" },
];

export const PROFILE = {
  role: "Full Stack Developer — Backend & AI Engineer",
  since: "2022 — Present",
  stackSummary: "Node.js · NestJS · Python · FastAPI · AWS · OpenAI",
  mode: "Solo ownership, or embedded in a dev team",
  location: "Islamabad, Pakistan",
  education: "BS Software Engineering — Virtual University of Pakistan",
};

export const EXPERIENCE = {
  role: "Full Stack Developer",
  org: "Client projects — web, mobile & AI",
  time: "2022 — Present",
  points: [
    "Delivered production features across multiple client products spanning web, mobile, and AI — both independently as a full stack owner and within a cross-functional development team",
    "Built AI agents on OpenAI's API and AWS Bedrock Agent architecture to automate content extraction, matchmaking, and coaching workflows",
    "Wrote React Native (Expo) apps for iOS and Android",
    "Set up and maintained databases across PostgreSQL, MongoDB, MariaDB, SQLite, and Redis depending on project needs",
    "Managed AWS infrastructure (Bedrock, Lambda, API Gateway, S3, SQS, SES) for production deployments, using Terraform to keep infrastructure changes version-controlled and repeatable",
    "Integrated Stripe, RevenueCat, and Apple/Google in-app purchases for subscription billing",
    "Built AI features to stay reliable in production — timeouts, deterministic fallbacks, and multi-replica locking so a slow or invalid model response never breaks the product",
    "Kept mobile and web teams unblocked with written specs, Swagger docs, and backward-compatible API changes",
    "Built automation with SQS and Celery background workers, scheduled jobs, AWS MediaConvert video pipelines, and email/push notifications",
    "Handled a repository security incident: removed the malicious commits, kept backups, and rotated the affected keys before any damage",
    "Presented progress directly to clients on solo-owned projects, and represented the backend/AI piece in team client meetings on larger builds",
  ],
};

export const CONTACT = {
  phone: "0313-9470300",
  phoneHref: "tel:03139470300",
  email: "malahimaamir@gmail.com",
  github: "https://github.com/malahimaamir",
  linkedin: "https://www.linkedin.com/in/malahima-amir-408069287/",
};

export interface ChatbotQA {
  keywords: string[];
  answer: string;
}

// first match wins, so specific topics sit above the broad ones
export const CHATBOT_QA: ChatbotQA[] = [
  {
    keywords: ["ayywa", "real estate", "real-estate", "biggest", "most significant", "largest", "scope"],
    answer:
      "Her most significant project is Ayywa, a real-estate social network in English and Arabic. She designed the shared NestJS + PostgreSQL backend serving the website, mobile app, and admin panel, and built the full Next.js website (pixel-perfect, 260px to 1920px). It includes AI moderation and search, Stripe plus Apple/Google in-app purchases, KYC, a full ads manager, real-time chat with Zoom, and an AWS MediaConvert video pipeline.",
  },
  {
    keywords: ["challeng", "hard", "difficult", "problem", "unfamiliar", "matching engine", "networking"],
    answer:
      "On a networking events platform she built AI pairing for live 10-minute rounds across several server replicas. She used a MongoDB lease lock so only one replica computes each round, OpenAI Agents SDK calls with strict structured outputs and a timeout, a deterministic Jaccard fallback, and fast-check property tests (100+ runs per rule). The matching is AI-driven, but a round always completes on time.",
  },
  {
    keywords: ["extension", "vs code", "vscode", "errordost", "devdiary", "marketplace", "open source"],
    answer:
      "She built and published two VS Code extensions: ErrorDost explains compiler and runtime errors in English, Urdu, Hindi, and Arabic, and DevDiary turns coding activity into AI-written daily reports. Both work with OpenAI, Claude, Gemini, or a local Ollama model, and are on the VS Code Marketplace and Open VSX.",
  },
  {
    keywords: ["github", "linkedin", "link", "portfolio", "profile"],
    answer: `GitHub: ${CONTACT.github} · LinkedIn: ${CONTACT.linkedin} · Most client work is in private repositories, but she's happy to walk through any of it on a call.`,
  },
  {
    keywords: ["deploy", "production", "real-world", "real world", "live", "shipped"],
    answer:
      "Yes, several in production: Ayywa on AWS, Envia's AI calendar assistant and Calendar API on Lambda + API Gateway + SQS with Terraform, Gym AI and FitFam backends behind App Store and Google Play apps, a Telegram Mini App backend with TON NFT drops, boat dealership websites for the MDS brand group, and two published VS Code extensions.",
  },
  {
    keywords: ["automation", "automate", "queue", "worker", "celery", "sqs", "cron", "pipeline"],
    answer:
      "Her automation work includes SQS and Celery background workers, scheduled jobs, AWS MediaConvert video pipelines, Stripe/Apple/Google webhooks, and email and push notification automation. Envia's whole email-to-calendar flow runs on SQS + Lambda + Bedrock Agents.",
  },
  {
    keywords: ["test", "jest", "vitest", "quality", "swagger", "docs", "documentation"],
    answer:
      "She puts tests around the risky parts — payments, state machines, and AI fallbacks — using Jest, Vitest, and fast-check property-based tests, and documents every endpoint in Swagger/OpenAPI with examples.",
  },
  {
    keywords: ["setback", "debug", "bug", "issue", "incident", "security", "handle"],
    answer:
      "She reproduces the problem and finds the real cause instead of patching symptoms, tests a small fix before rolling it out, and adds tests and fallbacks so it can't come back quietly. If the timeline is affected she tells the client early with options. When a security incident hit one of the repositories, she removed the malicious commits, kept backups, and rotated the affected keys before any damage.",
  },
  {
    keywords: ["stay current", "up to date", "learn", "new tech", "emerging", "keep up", "trend"],
    answer:
      "She learns by building — trying new tools and models in real or side projects. That's how she picked up the OpenAI Agents SDK, AWS Bedrock Agents, and AI coding tools, and ended up publishing her own AI developer extensions. She follows official docs and changelogs from OpenAI, Anthropic, AWS, Next.js, and NestJS.",
  },
  {
    keywords: ["goal", "career", "future", "long-term", "long term", "looking for"],
    answer:
      "She wants to grow as an AI and automation engineer building complete, reliable systems that solve real business problems, not just demos — AI agents, matching engines, moderation, and workflow automation — with more ownership of architecture and product decisions.",
  },
  {
    keywords: ["frontend", "front-end", "backend", "back-end", "full stack", "full-stack", "expertise", "strength"],
    answer:
      "Full-stack, with her strongest depth in backend and AI: APIs, databases, and AI pipelines in NestJS, Node.js, Python/FastAPI, and PostgreSQL. She also builds pixel-perfect responsive frontends in Next.js and React, plus React Native apps — on Ayywa she owns the backend for three clients and the complete English/Arabic (RTL) website.",
  },
  {
    keywords: ["proficien", "skill level", "compare", "peers", "good", "senior"],
    answer:
      "Strong, especially in backend architecture and turning AI into reliable product features — clean modular code, typed APIs, detailed Swagger docs, and tests around the risky parts. She picks up new stacks quickly: Fastify + Drizzle, AWS Bedrock, TON blockchain, and the VS Code extension API were all new to her, and she shipped production work in each.",
  },
  {
    keywords: ["jira", "trello", "clickup", "slack", "figma", "notion", "postman", "project management", "communication"],
    answer:
      "Git and GitHub (PRs, code review), Jira / Trello / ClickUp, Figma, Postman and Swagger for API collaboration, Slack, Teams, Zoom and Google Meet for communication, Notion and Google Docs for documentation, and AI tools like Claude Code, Copilot, Cursor, and Kiro.",
  },
  {
    keywords: ["aws", "cloud", "bedrock", "lambda"],
    answer:
      "She's built production systems on AWS Bedrock Agent, Lambda, API Gateway, S3, SQS, and SES — Envia's extraction pipeline runs entirely on Bedrock Agent + Lambda action groups, with Terraform for infrastructure.",
  },
  {
    keywords: ["solo", "alone", "own", "end to end", "end-to-end"],
    answer:
      "Yes — Lyrixa, a music streaming and artist platform, was owned solo end to end: frontend, backend, and direct client communication, no team. Her two published VS Code extensions, ErrorDost and DevDiary, are solo work too.",
  },
  {
    keywords: ["ai", "openai", "gpt", "agent", "llm", "vector", "pinecone"],
    answer:
      "She's built AI into production products across her career: AWS Bedrock multi-agent calendar extraction (Envia), an OpenAI Agents SDK matching engine with a deterministic fallback, AI moderation and search (Ayywa), GPT-4o matchmaking and Food DNA (PropDating), a 4-persona AI coach with meal, sleep and skin analysis (FitFam), OpenAI workout plans with Pinecone vector search (Gym AI), and two AI-powered VS Code extensions.",
  },
  {
    keywords: ["team", "collaborat", "work with others"],
    answer:
      "Most of her projects were built inside cross-functional teams. On Ayywa a separate team builds the mobile app against her API, so she writes specs before each feature, documents every endpoint in Swagger, and ships backward-compatible changes — ads went into a new sponsored field so existing mobile builds kept working. She works the same way with Flutter and web teams on Envia and the networking platform. Lyrixa and her VS Code extensions she owned entirely solo.",
  },
  {
    keywords: ["experience", "years", "how long"],
    answer: "4+ years of professional full-stack development since 2022, across web, mobile, and AI projects.",
  },
  {
    keywords: ["mobile", "react native", "expo", "app"],
    answer:
      "She's shipped React Native (Expo) apps for iOS and Android — HamaraVenue is a full example, where she built both the backend and the mobile app.",
  },
  {
    keywords: ["database", "postgres", "mongo", "redis", "sql"],
    answer: "She works across PostgreSQL, MongoDB, MariaDB, SQLite, and Redis depending on what a project needs.",
  },
  {
    keywords: ["contact", "hire", "email", "reach", "available"],
    answer: `You can reach her directly at ${CONTACT.email} or ${CONTACT.phone}, or use the contact form on this page — she's based in Islamabad, Pakistan and open to remote work.`,
  },
  {
    keywords: ["education", "degree", "university", "study"],
    answer: PROFILE.education + ".",
  },
  {
    keywords: ["stack", "tech", "technology", "tools", "language"],
    answer:
      "Core stack: Node.js, NestJS, Express, Fastify, TypeScript, Python, FastAPI on the backend; PostgreSQL, MongoDB, MySQL, Redis with Prisma, TypeORM, Drizzle, or Mongoose for data; OpenAI, Agents SDK, Bedrock, Claude, Gemini, and Ollama for AI; AWS, Terraform, and Docker for infra; React, Next.js, Tailwind, Three.js, and React Native on the frontend.",
  },
];

export const CHATBOT_FALLBACK =
  "I don't have that detail on hand — try asking about her stack, AI work, AWS experience, or a specific project, or use the contact form to ask her directly.";
