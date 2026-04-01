import { useEffect, useRef } from 'react';

const CHARS = ' .:-=+*#%@';

/** Terminal-style ASCII wave background */
export default function AsciiWavesBg() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    const fontSize = 14;
    let t = 0;
    let raf = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      if (w < 2 || h < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${fontSize}px ui-monospace, monospace`;
      cols = Math.max(1, Math.ceil(w / (fontSize * 0.6)));
      rows = Math.max(1, Math.ceil(h / fontSize));
    };

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();

    const loop = () => {
      if (w > 2 && h > 2 && cols > 0 && rows > 0) {
        t += 0.032;
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const nx = x / cols;
            const ny = y / rows;
            const wave =
              Math.sin(nx * 8 + t) * Math.cos(ny * 6 - t * 0.7) * 0.5 + 0.5;
            const idx = Math.floor(wave * (CHARS.length - 1));
            const ch = CHARS[idx];
            ctx.fillText(ch, x * fontSize * 0.6, (y + 1) * fontSize);
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden
    />
  );
}
