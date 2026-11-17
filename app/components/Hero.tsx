export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4 sm:px-6">
      {/* Background Decorative Tech Grid & Glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Status Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-xs sm:text-sm font-mono mb-6 backdrop-blur-sm animate-pulse">
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        Available for new projects & opportunities
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
        Hi, I&apos;m{" "}
        <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
          Yash Nishad
        </span>
      </h1>

      {/* Intro Subtitle */}
      <p className="max-w-2xl text-lg sm:text-xl text-slate-300 font-light mb-10 leading-relaxed">
        CS student who loves building web apps{" "}
        <span className="text-cyan-400 font-medium">rizzlord maximum</span>.
        Turning complex ideas into sleek, high-performance web experiences.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <a
          href="#projects"
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold text-base shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_25px_rgba(6,182,212,0.55)] hover:brightness-110 active:scale-95 transition-all duration-200"
        >
          View my work
        </a>
        <a
          href="#contact"
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-slate-700 bg-slate-900/60 backdrop-blur-sm text-slate-200 font-medium text-base hover:bg-slate-800 hover:text-white hover:border-cyan-500/50 active:scale-95 transition-all duration-200"
        >
          Contact me
        </a>
      </div>
    </section>
  );
}
