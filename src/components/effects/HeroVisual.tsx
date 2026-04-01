import { useEffect, useRef } from 'react';

/**
 * SPRDLX Hero Visual — Interactive ASCII Field
 *
 * Same aesthetic as the "Build with us" footer section but tuned for the hero:
 * - Full-bleed monospace character grid, characters chosen by a slow wave
 * - Mouse proximity brightens characters and shifts them toward the brand
 *   lime (#ccff00) — cursor acts as a "signal source" lighting up the field
 * - Characters near cursor cycle through AI/tech symbols for personality
 * - Calm base animation, no flicker, no chaos
 */

const BASE_CHARS   = ' ·:;=+*#%@';
const ACCENT_CHARS = '01∆◆▲■●◉✦✧⬡';  // AI/tech symbols near cursor
const FONT_SIZE    = 13;               // px — character cell height
const CHAR_W_RATIO = 0.58;             // monospace width ≈ 58% of height

export default function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, cols = 0, rows = 0;
    let raf = 0;
    let t = 0;
    let mouseX = -9999, mouseY = -9999;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width  = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT_SIZE}px ui-monospace, "SF Mono", monospace`;
      cols = Math.max(1, Math.ceil(w / (FONT_SIZE * CHAR_W_RATIO)));
      rows = Math.max(1, Math.ceil(h / FONT_SIZE));
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onMove = (e: MouseEvent) => {
      const r = canvas!.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
    };
    const onLeave = () => { mouseX = -9999; mouseY = -9999; };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave, { passive: true });

    // Cursor influence radius (fraction of screen width)
    const RADIUS_FRAC = 0.22;

    function frame() {
      if (!ctx || w < 2 || h < 2 || cols < 1 || rows < 1) {
        raf = requestAnimationFrame(frame);
        return;
      }

      t += reducedMotion ? 0.006 : 0.022;

      const cw = w / cols;
      const ch = FONT_SIZE;
      const radius = w * RADIUS_FRAC;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cx = (col + 0.5) * cw;
          const cy = (row + 0.5) * ch;

          // ── Base wave field ──────────────────────────────────────────────
          const nx = col / cols;
          const ny = row / rows;
          const wave =
            Math.sin(nx * 9 + t) * Math.cos(ny * 7 - t * 0.65) * 0.5 + 0.5;

          // ── Mouse proximity ──────────────────────────────────────────────
          const dx = cx - mouseX, dy = cy - mouseY;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const proximity = Math.max(0, 1 - dist / radius); // 0..1

          // ── Combined brightness ──────────────────────────────────────────
          // Base: very faint (0.06–0.14), cursor zone: up to 0.72
          const baseBright  = 0.06 + wave * 0.08;
          const cursorBoost = proximity * proximity * 0.66; // quadratic falloff
          const brightness  = baseBright + cursorBoost;

          if (brightness < 0.04) continue;

          // ── Character selection ──────────────────────────────────────────
          let char: string;
          if (proximity > 0.15) {
            // Near cursor: cycle through AI/tech accent symbols
            const accentIdx = Math.floor(
              (wave + t * 0.4 + proximity) * ACCENT_CHARS.length
            ) % ACCENT_CHARS.length;
            char = ACCENT_CHARS[Math.abs(accentIdx)];
          } else {
            const baseIdx = Math.floor(wave * (BASE_CHARS.length - 1));
            char = BASE_CHARS[baseIdx];
          }

          if (char === ' ') continue;

          // ── Colour ───────────────────────────────────────────────────────
          // Interpolate white → #ccff00 based on proximity
          // white = (204, 204, 204) at base, (255,255,255) at peak
          // lime  = (204, 255,   0) = #ccff00
          const r = Math.round(255 * (1 - proximity * 0.2));
          const g = Math.round(255 * 1.0);
          const b = Math.round(255 * (1 - proximity));
          const a = Math.min(1, brightness);

          ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(3)})`;
          ctx.fillText(char, col * cw, (row + 1) * ch - 2);
        }
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden
    />
  );
}
