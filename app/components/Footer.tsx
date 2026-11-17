export default function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-sm text-slate-500">
          © 2026 <span className="text-slate-300 font-medium">Yash Nishad</span>. All rights reserved.
        </p>

        <a
          href="#"
          className="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
        >
          <span>Back to top</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
