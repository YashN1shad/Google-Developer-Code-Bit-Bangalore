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

  // Fireworks explosion inside this section
  const launchFirework = useCallback((originX: number, originY: number) => {
    const colors = [
      "#facc15", // bright gold
      "#fbbf24", // amber
      "#f43f5e", // casino ruby
      "#ffffff", // diamond white
      "#38bdf8", // electric cyan
      "#a855f7", // royal purple
      "#4ade80", // lucky green
    ];
    const particleCount = 75;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.4;
      const speed = Math.random() * 6.5 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      particlesRef.current.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
        size: Math.random() * 3.5 + 2,
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
        ctx.shadowBlur = 10;
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

  const triggerFireworksShow = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    const burstCount = 7;
    for (let i = 0; i < burstCount; i++) {
      setTimeout(() => {
        const x = w * (0.15 + Math.random() * 0.7);
        const y = h * (0.15 + Math.random() * 0.45);
        launchFirework(x, y);
      }, i * 320);
    }
  }, [launchFirework]);

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

      if (counter > 16) {
        clearInterval(spinInterval);

        let finalD1: number, finalD2: number, finalD3: number;
        if (forceJackpot) {
          finalD1 = 7;
          finalD2 = 7;
          finalD3 = 7;
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
    }, 55);
  };

  const isGenerated = digits !== null;
  const isLoss = isGenerated && !isSpinning && !hasWon;

  return (
    <section
      id="not-gambling"
      className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto scroll-mt-20 overflow-hidden"
    >
      {/* Fireworks Canvas restricted to this section */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-20 w-full h-full"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/50 bg-black/60 text-amber-300 font-mono text-xs uppercase tracking-widest mb-3 backdrop-blur-md shadow-[0_0_15px_rgba(251,191,36,0.2)]">
          <span>🍒</span> 100% Certified Skill Lounge <span>🎰</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          The Lucky Pixel Slot Machine
        </h2>
        <p className="text-amber-100/80 text-sm sm:text-base">
          Pull the lever or click spin to generate 3 random digits in the slot reels. Match all 3 to set off fireworks!
        </p>
      </div>

      {/* Pixel Art Slot Machine Wrapper */}
      <div className="relative z-10 max-w-[340px] sm:max-w-[420px] mx-auto text-center">
        {/* Machine Frame with Realistic Shadow */}
        <div className="relative mx-auto drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]">
          {/* Base Slot Machine Image */}
          <img
            src="/slot-machine.png"
            alt="Pixel Art Slot Machine"
            className="w-full h-auto [image-rendering:pixelated] select-none pointer-events-none"
          />

          {/* 
            Reel Window Coordinates:
            Matches the 3 white slot rectangles in the pixel-art cabinet.
            top: 38.6%, left: 32.1%, width: 32.6%, height: 12.0%
          */}
          <div
            className="absolute flex items-center justify-between z-10 pointer-events-none"
            style={{
              top: "38.6%",
              left: "32.1%",
              width: "32.6%",
              height: "12.0%",
            }}
          >
            {[0, 1, 2].map((idx) => {
              const digitVal = digits ? digits[idx] : "-";
              return (
                <div
                  key={idx}
                  className="flex-1 h-full flex items-center justify-center text-center"
                >
                  <span
                    className={`font-mono font-black text-2xl sm:text-4xl select-none leading-none transition-transform duration-100 ${
                      hasWon
                        ? "text-yellow-500 scale-125 animate-bounce drop-shadow-[0_0_8px_#fde047]"
                        : "text-[#871919] drop-shadow-[1px_1px_0px_#3f0909]"
                    } ${isSpinning ? "opacity-75 blur-[0.5px]" : "opacity-100"}`}
                  >
                    {digitVal}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Crying Emoji on the right of the final generated digit */}
          {isLoss && (
            <div
              className="absolute z-20 flex items-center justify-center animate-bounce select-none pointer-events-none"
              style={{
                top: "36%",
                left: "66%",
                height: "16%",
              }}
            >
              <span className="text-3xl sm:text-4xl drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]">
                😭
              </span>
            </div>
          )}

          {/* Winner Celebration Party Popper */}
          {hasWon && (
            <div
              className="absolute z-20 flex items-center justify-center animate-pulse select-none pointer-events-none"
              style={{
                top: "36%",
                left: "66%",
                height: "16%",
              }}
            >
              <span className="text-3xl sm:text-4xl drop-shadow-[0_0_15px_rgba(250,204,21,0.9)]">
                🎉
              </span>
            </div>
          )}

          {/* Clickable Lever Hotspot (right side of cabinet) */}
          <button
            onClick={() => generateDigits(false)}
            disabled={isSpinning}
            aria-label="Pull slot machine lever"
            title="Click lever to spin!"
            className="absolute z-20 cursor-pointer rounded-full opacity-0 hover:opacity-20 hover:bg-yellow-400 transition-opacity active:scale-95"
            style={{
              top: "35%",
              left: "68%",
              width: "10%",
              height: "18%",
            }}
          />
        </div>

        {/* Status Message */}
        <div className="h-9 flex items-center justify-center mt-5 mb-4">
          {hasWon && (
            <p className="text-sm sm:text-base font-black text-yellow-300 tracking-wider animate-pulse drop-shadow-[0_0_10px_#facc15]">
              🎆 VEGAS JACKPOT! All 3 digits match! 🎆
            </p>
          )}
          {isLoss && (
            <p className="text-xs sm:text-sm text-amber-200/90 font-medium">
              House takes the round! Try your luck again. (Spins: {attempts})
            </p>
          )}
          {!isGenerated && (
            <p className="text-xs sm:text-sm text-amber-300/80 font-mono">
              Click the lever or press spin below
            </p>
          )}
        </div>

        {/* Control Buttons */}
        <div className="space-y-3 max-w-xs mx-auto">
          <button
            onClick={() => generateDigits(false)}
            disabled={isSpinning}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-black text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:shadow-[0_0_30px_rgba(245,158,11,0.8)] hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 border border-yellow-200 flex items-center justify-center gap-2"
          >
            <span>{isSpinning ? "SPINNING REELS..." : "PULL LEVER / SPIN"}</span>
            <span className="text-black">🎰</span>
          </button>

          {/* Dev Cheat Button for Instant Fireworks Verification */}
          <button
            onClick={() => generateDigits(true)}
            disabled={isSpinning}
            className="text-xs text-amber-400/70 hover:text-amber-200 font-mono underline decoration-dotted transition-colors"
          >
            [VIP Pass: Trigger Instant 7-7-7 Fireworks]
          </button>
        </div>
      </div>
    </section>
  );
}
