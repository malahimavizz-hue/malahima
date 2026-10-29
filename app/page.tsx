import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Profile from "@/components/Profile";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Profile />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer className="py-9 border-t border-border-subtle">
        <div className="wrap flex flex-wrap justify-between items-center gap-3 font-mono text-xs text-text-muted">
          <span>© 2026 Malahima Amir</span>
          <span>Built solo, same as most of the work above.</span>
        </div>
      </footer>
    </>
  );
}
