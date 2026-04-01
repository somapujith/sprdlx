import { useEffect, useRef } from 'react';

/**
 * Lightweight pixel trail (dither-adjacent) — no external animation lib.
 */
export default function GlobalDitherCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const trail: { x: number; y: number; t: number }[] = [];
    const maxAge = 420;
    const size = 3;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    const loop = () => {
      raf = 0;
      const now = performance.now();
      while (trail.length && now - trail[0].t > maxAge) trail.shift();
      ctx.clearRect(0, 0, w, h);
      for (const p of trail) {
        const age = now - p.t;
        const a = 1 - age / maxAge;
        if (a <= 0) continue;
        ctx.fillStyle = `rgba(255,255,255,${a * 0.22})`;
        const gx = Math.floor(p.x / size) * size;
        const gy = Math.floor(p.y / size) * size;
        ctx.fillRect(gx, gy, size - 1, size - 1);
      }
      if (trail.length > 0) {
        raf = requestAnimationFrame(loop);
      }
    };
    const schedule = () => {
      if (raf === 0) raf = requestAnimationFrame(loop);
    };
    const onMove = (e: MouseEvent) => {
      trail.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      schedule();
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[40] hidden md:block opacity-90"
      aria-hidden
    />
  );
}
