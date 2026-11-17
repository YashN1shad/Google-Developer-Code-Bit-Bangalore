import ProjectCard, { Project } from "./ProjectCard";

export default function Projects() {
  const projects: Project[] = [
    {
      title: "DevFlow",
      description:
        "A full-featured agile project management dashboard with real-time kanban boards, sprint tracking, and team activity feeds.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
      githubUrl: "https://github.com/yashnishad/devflow",
    },
    {
      title: "CodeForge",
      description:
        "Interactive code snippet sharing platform with live syntax preview, multi-language runner integration, and websocket collaboration.",
      tech: ["React", "Node.js", "Express", "WebSockets", "Tailwind CSS"],
      githubUrl: "https://github.com/yashnishad/codeforge",
    },
    {
      title: "Aura AI",
      description:
        "A minimalist AI assistant with dynamic tool calling, multi-model streaming responses, and markdown code export capabilities.",
      tech: ["Next.js 14", "TypeScript", "OpenAI API", "Tailwind CSS"],
      githubUrl: "https://github.com/yashnishad/aura-ai",
    },
  ];

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
          <span className="w-8 h-px bg-cyan-400"></span>
          Featured Work
          <span className="w-8 h-px bg-cyan-400"></span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
          Things I&apos;ve built & shipped
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          A collection of projects showcasing full-stack engineering, performance,
          and attention to UI design details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
