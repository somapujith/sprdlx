import { useEffect, useRef } from 'react';

type Props = {
  className?: string;
  /** 0–1 master opacity */
  opacity?: number;
  grid?: number;
  dotMax?: number;
};

/**
 * Halftone-style dot field with soft cursor interaction (single canvas).
 */
export default function HalftoneDotField({
  className = '',
  opacity = 0.08,
  grid = 28,
  dotMax = 1.6,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let mx = -999;
    let my = -999;
    let raf = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const step = Math.max(10, Math.floor(Math.min(w, h) / grid));
      for (let x = step / 2; x < w; x += step) {
        for (let y = step / 2; y < h; y += step) {
          const d = Math.hypot(mx - x, my - y);
          const boost = Math.max(0, 1 - d / 220) * 0.85;
          const base = 0.35 + Math.sin(x * 0.01 + y * 0.012) * 0.15;
          const r = Math.min(dotMax, (base + boost) * (step * 0.12));
          ctx.beginPath();
          ctx.fillStyle = `rgba(0,0,0,${opacity * (0.5 + boost)})`;
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    const onLeave = () => {
      mx = -999;
      my = -999;
    };

    const parent = canvas.parentElement;
    const ro = new ResizeObserver(() => resize());
    if (parent) ro.observe(parent);
    resize();
    window.addEventListener('mousemove', onMove, { passive: true });
    canvas.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, [opacity, grid, dotMax]);

  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden />;
}
