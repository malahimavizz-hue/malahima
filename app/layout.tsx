import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import GlowBackground from "@/components/GlowBackground";

// loaded at runtime instead of next/font/google, whose build-time fetch fails on Vercel
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap";

export const metadata: Metadata = {
  title: "Malahima Amir — Full Stack Developer",
  description: "Full stack developer specializing in backend architecture and AI engineering.",
};

const THEME_INIT = `
try {
  var saved = localStorage.getItem('ma-theme');
  var theme = saved === 'light' || saved === 'dark' ? saved : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', theme);
} catch (e) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href={FONTS_URL} />
      </head>
      <body>
        <GlowBackground />
        <div className="relative z-10">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
