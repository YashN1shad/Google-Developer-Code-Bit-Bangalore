"use client";

import { useEffect, useRef } from "react";

interface Sparkle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  opacity: number;
  life: number;
  maxLife: number;
  rotation: number;
  rotationSpeed: number;
}

export default function CursorBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smoothing
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isHovering: false,
    };

    const sparkles: Sparkle[] = [];
    const colors = [
      "rgba(34, 211, 238,", // Cyan #22d3ee
      "rgba(56, 189, 248,", // Sky #38bdf8
      "rgba(168, 85, 247,", // Purple #a855f7
      "rgba(255, 255, 255,", // White
    ];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    let lastSparkleTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovering = true;

      // Spawn sparkles as mouse moves (throttled to every ~20ms)
      const now = performance.now();
      if (now - lastSparkleTime > 18) {
        lastSparkleTime = now;
        const count = Math.floor(Math.random() * 2) + 1; // 1-2 particles per burst
        for (let i = 0; i < count; i++) {
          const colorBase = colors[Math.floor(Math.random() * colors.length)];
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 1.5 + 0.5;
          sparkles.push({
            x: e.clientX + (Math.random() - 0.5) * 8,
            y: e.clientY + (Math.random() - 0.5) * 8,
            size: Math.random() * 6 + 4,
            color: colorBase,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 0.4, // Slight upward drift
            opacity: 1,
            life: 0,
            maxLife: Math.random() * 25 + 25, // 25-50 frames duration (~0.5 - 0.8s)
            rotation: Math.random() * Math.PI,
            rotationSpeed: (Math.random() - 0.5) * 0.15,
          });
        }
      }
    };

    const handleMouseLeave = () => {
      mouse.isHovering = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleMouseMove({
          clientX: touch.clientX,
          clientY: touch.clientY,
        } as MouseEvent);
      }
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });

    // Draw a 4-point sparkle star
    const drawStar = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      rotation: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.beginPath();

      const spikes = 4;
      const outerRadius = size;
      const innerRadius = size * 0.25;

      let rot = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;

      c.moveTo(0, -outerRadius);
      for (let i = 0; i < spikes; i++) {
        let px = Math.cos(rot) * outerRadius;
        let py = Math.sin(rot) * outerRadius;
        c.lineTo(px, py);
        rot += step;

        px = Math.cos(rot) * innerRadius;
        py = Math.sin(rot) * innerRadius;
        c.lineTo(px, py);
        rot += step;
      }
      c.lineTo(0, -outerRadius);
      c.closePath();

      c.fillStyle = `${color}${opacity})`;
      c.shadowBlur = 10;
      c.shadowColor = `${color}${opacity * 0.8})`;
      c.fill();
      c.restore();
    };

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse tracking (lerp)
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // 1. Reactive Background Glow Spotlight
      if (mouse.isHovering || mouse.x !== width / 2) {
        // Outer ambient glow
        const ambientGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          650
        );
        ambientGradient.addColorStop(0, "rgba(6, 182, 212, 0.12)"); // Cyan spotlight center
        ambientGradient.addColorStop(0.35, "rgba(99, 102, 241, 0.06)"); // Indigo middle
        ambientGradient.addColorStop(1, "rgba(0, 0, 0, 0)"); // Fades out
        ctx.fillStyle = ambientGradient;
        ctx.fillRect(0, 0, width, height);

        // Inner tighter highlight
        const coreGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          140
        );
        coreGradient.addColorStop(0, "rgba(34, 211, 238, 0.15)");
        coreGradient.addColorStop(1, "rgba(34, 211, 238, 0)");
        ctx.fillStyle = coreGradient;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Render and update Sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.life++;
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rotationSpeed;

        // Fade out towards end of life
        const progress = s.life / s.maxLife;
        s.opacity = Math.max(0, 1 - progress);

        // Shrink slightly as it dies
        const currentSize = s.size * (1 - progress * 0.5);

        drawStar(ctx, s.x, s.y, currentSize, s.color, s.opacity, s.rotation);

        if (s.life >= s.maxLife || s.opacity <= 0) {
          sparkles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 h-full w-full"
      aria-hidden="true"
    />
  );
}
