import { useEffect, useRef } from 'react';

type CursorMode = 'default' | 'accent' | 'view';

function resolveCursorMode(clientX: number, clientY: number): CursorMode {
  let el = document.elementFromPoint(clientX, clientY) as Element | null;
  while (el && el !== document.body) {
    const v = el.getAttribute?.('data-cursor');
    if (v === 'accent' || v === 'view') return v;
    el = el.parentElement;
  }
  return 'default';
}

/**
 * Lightweight pixel trail (dither-adjacent) — reacts to [data-cursor="accent"|"view"] on interactive targets.
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
    const trail: { x: number; y: number; t: number; mode: CursorMode }[] = [];
    const maxAge = 420;
    const baseSize = 3;

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

    const fillForMode = (mode: CursorMode, alpha: number) => {
      if (mode === 'accent') return `rgba(204,255,0,${alpha * 0.35})`;
      if (mode === 'view') return `rgba(180,250,220,${alpha * 0.32})`;
      return `rgba(255,255,255,${alpha * 0.22})`;
    };

    const sizeForMode = (mode: CursorMode) => (mode === 'view' ? 4 : baseSize);

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
        ctx.fillStyle = fillForMode(p.mode, a);
        const sz = sizeForMode(p.mode);
        const gx = Math.floor(p.x / sz) * sz;
        const gy = Math.floor(p.y / sz) * sz;
        ctx.fillRect(gx, gy, sz - 1, sz - 1);
      }
      if (trail.length > 0) {
        raf = requestAnimationFrame(loop);
      }
    };
    const schedule = () => {
      if (raf === 0) raf = requestAnimationFrame(loop);
    };
    const onMove = (e: MouseEvent) => {
      const mode = resolveCursorMode(e.clientX, e.clientY);
      trail.push({ x: e.clientX, y: e.clientY, t: performance.now(), mode });
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
