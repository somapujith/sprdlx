import { useEffect, useRef, type MutableRefObject } from 'react';

/**
 * SPRDLX Hero Visual — Interactive ASCII Field (performance-tuned)
 */

const BASE_CHARS = ' ·:;=+*#%@';
const ACCENT_CHARS = '01∆◆▲■●◉✦✧⬡';
/** Larger cells = fewer draw calls; still reads as a dense field */
const FONT_SIZE = 20;
const CHAR_W_RATIO = 0.58;
/** Cap canvas backing store — ASCII does not need full retina density */
const MAX_DPR = 1.25;

type Props = {
  intensityRef?: MutableRefObject<number>;
};

function buildPalettes() {
  const white: string[] = [];
  const lime: string[] = [];
  for (let i = 0; i <= 32; i++) {
    const a = i / 32;
    white.push(`rgba(255,255,255,${a.toFixed(3)})`);
    lime.push(`rgba(204,255,${Math.round(255 * (1 - a))},${a.toFixed(3)})`);
  }
  return { white, lime };
}

export default function HeroVisual({ intensityRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const internalIntensity = useRef(1);
  const intensity = intensityRef ?? internalIntensity;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { white: W_PAL, lime: L_PAL } = buildPalettes();

    let w = 0,
      h = 0,
      cols = 0,
      rows = 0;
    let raf = 0;
    let t = 0;
    let mouseX = -9999,
      mouseY = -9999;
    let visible = true;
    /** Avoid IO kicking the loop before deferred start (hurts LCP). */
    let everStarted = false;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT_SIZE}px ui-monospace, "SF Mono", monospace`;
      cols = Math.max(1, Math.ceil(w / (FONT_SIZE * CHAR_W_RATIO)));
      rows = Math.max(1, Math.ceil(h / FONT_SIZE));
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && raf === 0 && everStarted) {
          raf = requestAnimationFrame(frame);
        }
      },
      { root: null, rootMargin: '80px', threshold: 0 }
    );
    io.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const r = canvas!.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
    };
    const onLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave, { passive: true });

    const RADIUS_FRAC = 0.22;

    function frame() {
      raf = 0;
      if (!visible) return;

      if (!ctx || w < 2 || h < 2 || cols < 1 || rows < 1) {
        if (visible) raf = requestAnimationFrame(frame);
        return;
      }

      t += reducedMotion ? 0.006 : 0.018;

      const cw = w / cols;
      const ch = FONT_SIZE;
      const radius = w * RADIUS_FRAC;
      const radiusSq = radius * radius;
      const inten = Math.max(0, Math.min(1, intensity.current));
      const cursorGain = inten < 0.35 ? inten / 0.35 : 1;
      const floorInten = inten * 0.04;

      ctx.clearRect(0, 0, w, h);

      for (let row = 0; row < rows; row++) {
        const py = (row + 0.5) * ch;
        for (let col = 0; col < cols; col++) {
          const px = (col + 0.5) * cw;

          const nx = col / cols;
          const ny = row / rows;
          const wave = Math.sin(nx * 9 + t) * Math.cos(ny * 7 - t * 0.65) * 0.5 + 0.5;

          const dx = px - mouseX;
          const dy = py - mouseY;
          const distSq = dx * dx + dy * dy;
          const proximity = distSq >= radiusSq ? 0 : Math.max(0, 1 - distSq / radiusSq);

          const baseBright = (0.06 + wave * 0.08) * inten;
          const cursorBoost = proximity * proximity * 0.66 * cursorGain;
          const brightness = baseBright + cursorBoost;

          if (brightness < floorInten) continue;

          let char: string;
          if (proximity > 0.12 && inten > 0.25) {
            const accentIdx =
              Math.floor((wave + t * 0.4 + proximity) * ACCENT_CHARS.length) % ACCENT_CHARS.length;
            char = ACCENT_CHARS[Math.abs(accentIdx)];
          } else {
            const baseIdx = Math.floor(wave * (BASE_CHARS.length - 1));
            char = BASE_CHARS[baseIdx];
          }

          if (char === ' ') continue;

          const a = Math.min(1, brightness);
          const ai = Math.min(32, Math.max(0, Math.round(a * 32)));
          ctx.fillStyle = proximity > 0.08 ? L_PAL[ai] : W_PAL[ai];
          ctx.fillText(char, col * cw, (row + 1) * ch - 2);
        }
      }

      raf = requestAnimationFrame(frame);
    }

    /** Defer first frame until after paint so headline/text can win LCP. */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        everStarted = true;
        if (visible && raf === 0) raf = requestAnimationFrame(frame);
      });
    });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />
  );
}
