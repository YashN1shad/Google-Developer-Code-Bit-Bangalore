"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
}

export default function NotGambling() {
  const [digits, setDigits] = useState<[number, number, number] | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<FireworkParticle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Trigger colorful fireworks explosion inside this section
  const launchFirework = useCallback((originX: number, originY: number) => {
    const colors = [
      "#22d3ee", // cyan
      "#f43f5e", // rose
      "#fbbf24", // amber
      "#a855f7", // purple
      "#34d399", // emerald
      "#38bdf8", // sky
      "#ffffff", // white
    ];
    const particleCount = 70;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.4;
      const speed = Math.random() * 6 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      particlesRef.current.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
        size: Math.random() * 3 + 2,
        decay: Math.random() * 0.015 + 0.008,
      });
    }
  }, []);

  // Animation loop for fireworks canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & update firework particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // Gravity
        p.vx *= 0.98; // Drag
        p.alpha -= p.decay;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Continuous fireworks blast sequence when winning
  const triggerFireworksShow = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    // Burst multiple bursts across the section
    const burstCount = 6;
    for (let i = 0; i < burstCount; i++) {
      setTimeout(() => {
        const x = w * (0.2 + Math.random() * 0.6);
        const y = h * (0.2 + Math.random() * 0.4);
        launchFirework(x, y);
      }, i * 350);
    }
  }, [launchFirework]);

  // Generate 3 random digits with rapid shuffle animation
  const generateDigits = (forceJackpot = false) => {
    if (isSpinning) return;
    setIsSpinning(true);
    setHasWon(false);

    let counter = 0;
    const spinInterval = setInterval(() => {
      setDigits([
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ]);
      counter++;

      if (counter > 15) {
        clearInterval(spinInterval);

        let finalD1: number, finalD2: number, finalD3: number;
        if (forceJackpot) {
          const lucky = 7;
          finalD1 = lucky;
          finalD2 = lucky;
          finalD3 = lucky;
        } else {
          finalD1 = Math.floor(Math.random() * 10);
          finalD2 = Math.floor(Math.random() * 10);
          finalD3 = Math.floor(Math.random() * 10);
        }

        const win = finalD1 === finalD2 && finalD2 === finalD3;
        setDigits([finalD1, finalD2, finalD3]);
        setIsSpinning(false);
        setHasWon(win);
        setAttempts((prev) => prev + 1);

        if (win) {
          triggerFireworksShow();
        }
      }
    }, 60);
  };

  const isGenerated = digits !== null;
  const isLoss = isGenerated && !isSpinning && !hasWon;

  return (
    <section
      id="not-gambling"
      className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto scroll-mt-20 overflow-hidden"
    >
      {/* Interactive Fireworks Canvas restricted to this particular section */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-20 w-full h-full"
        aria-hidden="true"
      />

      <div className="relative z-10 text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-500/30 bg-pink-950/30 text-pink-400 font-mono text-xs uppercase tracking-widest mb-3 backdrop-blur-sm">
          <span>🎰</span> Not Gambling Section
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          100% Certified Skill-Based Randomizer
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Roll 3 digits. If all 3 match, enjoy fireworks in this section. If they don&apos;t... well, the tears speak for themselves.
        </p>
      </div>

      {/* Main Machine Card */}
      <div className="relative z-10 max-w-md mx-auto rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8 shadow-[0_0_50px_-12px_rgba(6,182,212,0.15)] text-center">
        {/* Digits Display Area */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 my-6">
          {[0, 1, 2].map((idx) => {
            const digitValue = digits ? digits[idx] : "-";
            return (
              <div
                key={idx}
                className={`w-16 h-24 sm:w-20 sm:h-28 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl font-extrabold font-mono transition-all duration-300 ${
                  hasWon
                    ? "bg-gradient-to-b from-amber-500/20 to-yellow-500/30 border-2 border-yellow-400 text-yellow-300 shadow-[0_0_25px_rgba(250,204,21,0.5)] scale-105 animate-bounce"
                    : isLoss
                    ? "bg-slate-950/90 border border-slate-800 text-slate-200"
                    : "bg-slate-950/80 border border-slate-800 text-cyan-400"
                }`}
              >
                <span className={isSpinning ? "blur-[1px] opacity-80" : "opacity-100"}>
                  {digitValue}
                </span>
              </div>
            );
          })}

          {/* Crying Emoji on the right of the final generated digit if not all 3 are the same */}
          <div className="w-10 sm:w-14 flex items-center justify-center">
            {isLoss && (
              <span
                role="img"
                aria-label="Crying emoji"
                className="text-4xl sm:text-5xl animate-bounce drop-shadow-[0_0_12px_rgba(239,68,68,0.4)] select-none"
              >
                😭
              </span>
            )}
            {hasWon && (
              <span
                role="img"
                aria-label="Celebration party popper"
                className="text-4xl sm:text-5xl animate-pulse select-none"
              >
                🎉
              </span>
            )}
          </div>
        </div>

        {/* Status Message */}
        <div className="h-8 flex items-center justify-center mb-6">
          {hasWon && (
            <p className="text-base sm:text-lg font-bold text-yellow-300 tracking-wide animate-pulse">
              🎆 JACKPOT! All 3 digits match! Enjoy the fireworks! 🎆
            </p>
          )}
          {isLoss && (
            <p className="text-xs sm:text-sm text-slate-400">
              Not quite! Give it another shot. (Rolls: {attempts})
            </p>
          )}
          {!isGenerated && (
            <p className="text-xs sm:text-sm text-slate-500 font-mono">
              Press generate to spin the numbers
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => generateDigits(false)}
            disabled={isSpinning}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 text-slate-950 font-bold text-base shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
          >
            {isSpinning ? "Generating..." : "Generate 3 Digits"}
          </button>

          {/* Dev Cheat Button to preview fireworks instantly */}
          <button
            onClick={() => generateDigits(true)}
            disabled={isSpinning}
            className="text-xs text-slate-500 hover:text-cyan-400 font-mono underline decoration-dotted transition-colors"
          >
            [Dev Mode: Test Guaranteed Fireworks (7-7-7)]
          </button>
        </div>
      </div>
    </section>
  );
}
