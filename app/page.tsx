import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import NotGambling from "./components/NotGambling";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CursorBackground from "./components/CursorBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-slate-100 selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">
      {/* Dynamic Cursor Reactive Background & Sparkle Trail */}
      <CursorBackground />

      <Navbar />
      <main className="relative z-10 flex-1">
        <Hero />
        <NotGambling />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
