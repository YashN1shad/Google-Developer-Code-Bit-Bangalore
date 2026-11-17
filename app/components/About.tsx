export default function About() {
  const skills = [
    { name: "React", category: "frontend" },
    { name: "Next.js", category: "frontend" },
    { name: "TypeScript", category: "core" },
    { name: "JavaScript", category: "core" },
    { name: "Tailwind CSS", category: "frontend" },
    { name: "HTML & CSS", category: "frontend" },
    { name: "Node.js", category: "backend" },
    { name: "Python", category: "backend" },
    { name: "Git & GitHub", category: "tools" },
    { name: "REST APIs", category: "backend" },
    { name: "PostgreSQL", category: "backend" },
    { name: "Hypixel PvP Ranked Diamond ⚔️", category: "special" },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-20">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Left Column: Heading & Bio */}
        <div className="w-full md:w-1/2">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
            <span className="w-8 h-px bg-cyan-400"></span>
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6">
            Driven by curiosity, fueled by clean code.
          </h2>
          <div className="space-y-4 text-slate-300 text-base leading-relaxed">
            <p>
              I&apos;m a Computer Science student passionate about full-stack web
              development and building scalable, user-centric software.
            </p>
            <p>
              I specialize in modern JavaScript/TypeScript ecosystems, bringing
              intuitive web applications to life with high performance and clean aesthetics.
            </p>
            <p>
              When I&apos;m away from my keyboard crafting interfaces, you&apos;ll probably
              find me strategizing in competitive games, exploring new dev tools, or
              collaborating on open-source ideas.
            </p>
          </div>
        </div>

        {/* Right Column: Skills Chips & Tech Highlights */}
        <div className="w-full md:w-1/2 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md p-6 sm:p-8 shadow-xl">
          <h3 className="text-lg font-semibold text-slate-100 mb-2 flex items-center gap-2">
            <span className="text-cyan-400">⚡</span> Technologies & Skills
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mb-6">
            A snapshot of the languages, frameworks, and perks in my toolkit:
          </p>

          <div className="flex flex-wrap gap-2.5">
            {skills.map((skill) => {
              const isSpecial = skill.category === "special";
              return (
                <span
                  key={skill.name}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-default ${
                    isSpecial
                      ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/40 hover:scale-105 hover:border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.2)]"
                      : "bg-slate-800/80 text-slate-200 border border-slate-700 hover:border-cyan-400 hover:text-cyan-300 hover:bg-slate-800 hover:-translate-y-0.5"
                  }`}
                >
                  {skill.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
