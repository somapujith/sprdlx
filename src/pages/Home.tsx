import { useCallback, useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import { setNavSurface } from '../navSurface';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import Team from '../components/Team';
import Footer from '../components/Footer';

function smoothstep01(t: number) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

/**
 * Scroll-driven background using lenis.scroll (virtual scroll position) so
 * getBoundingClientRect() values are always in sync with Lenis's interpolated position.
 */
export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const lastAppliedRef = useRef('');
  const lastBgLRef = useRef<number | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const pendingScrollRef = useRef(0);

  const updateMainBg = useCallback((scrollY: number) => {
    const mainEl = mainRef.current;
    const portfolio = document.getElementById('portfolio-trigger');
    const team = document.getElementById('team');
    if (!mainEl || !portfolio || !team) return;

    // offsetTop gives the true document position — no getBoundingClientRect needed.
    const ptOffset = (portfolio as HTMLElement).offsetTop;
    const teamOffset = (team as HTMLElement).offsetTop;

    const vp = window.innerHeight;

    // How far each section's top is from the current viewport top
    const ptTop = ptOffset - scrollY;
    const teamTop = teamOffset - scrollY;

    const portfolioLine = vp * 0.44;
    const introBlend = vp * 0.55;
    const teamBlendEnd = vp * 0.38;

    let bg: string;
    let surface: 'light' | 'dark';
    let luminance: number;

    if (ptTop > portfolioLine + introBlend) {
      // Still in Intro / Hero — full black
      bg = '#000000';
      surface = 'dark';
      luminance = 0;
    } else if (ptTop > portfolioLine) {
      // Smoothly ramp black → white as portfolio approaches
      const u = (portfolioLine + introBlend - ptTop) / introBlend;
      const v = Math.round(255 * smoothstep01(u));
      bg = `rgb(${v},${v},${v})`;
      luminance = v / 255;
      surface = v > 165 ? 'light' : 'dark';
    } else if (teamTop > vp) {
      // Portfolio / Services — full white
      bg = '#ffffff';
      surface = 'light';
      luminance = 1;
    } else {
      // Team entering — smoothly ramp white → black
      const span = vp - teamBlendEnd;
      const raw = span > 0 ? (teamTop - teamBlendEnd) / span : 0;
      const t = Math.max(0, Math.min(1, raw));
      const v = Math.round(255 * smoothstep01(t));
      bg = `rgb(${v},${v},${v})`;
      luminance = v / 255;
      surface = v > 165 ? 'light' : 'dark';
    }

    // `--bg-l` only when meaningfully changed — avoids style thrash every Lenis sub-tick
    const lumQ = Math.round(luminance * 2000) / 2000;
    if (lastBgLRef.current === null || Math.abs(lumQ - lastBgLRef.current) > 0.0005) {
      lastBgLRef.current = lumQ;
      mainEl.style.setProperty('--bg-l', lumQ.toFixed(4));
    }

    const token = `${bg}|${surface}`;
    if (token === lastAppliedRef.current) return;
    lastAppliedRef.current = token;
    mainEl.style.backgroundColor = bg;
    mainEl.setAttribute('data-surface', surface);
    setNavSurface(surface);
  }, []);

  // At most one background update per animation frame (Lenis can emit multiple times per frame).
  useLenis(({ scroll }) => {
    pendingScrollRef.current = scroll;
    if (scrollRafRef.current != null) return;
    scrollRafRef.current = requestAnimationFrame(() => {
      scrollRafRef.current = null;
      updateMainBg(pendingScrollRef.current);
    });
  });

  // Resize: re-run with current scroll so offsets are recalculated
  useEffect(() => {
    let resizeRaf = 0;
    const onResize = () => {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0;
        lastAppliedRef.current = '';
        lastBgLRef.current = null;
        // Read scrollY from documentElement since Lenis scrolls it
        updateMainBg(document.documentElement.scrollTop || window.scrollY);
      });
    };
    window.addEventListener('resize', onResize);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', onResize);
    // Initial paint
    lastAppliedRef.current = '';
    lastBgLRef.current = null;
    updateMainBg(document.documentElement.scrollTop || window.scrollY);
    return () => {
      window.removeEventListener('resize', onResize);
      if (window.visualViewport) window.visualViewport.removeEventListener('resize', onResize);
    };
  }, [updateMainBg]);

  useEffect(() => {
    return () => setNavSurface('dark');
  }, []);

  return (
    <main
      ref={mainRef}
      className="flex flex-col w-full"
      style={{ backgroundColor: '#000000', ['--bg-l' as string]: 0 }}
      data-surface="dark"
    >
      <Hero />
      <Intro />
      <div id="portfolio-trigger">
        <Portfolio />
        <Services />
      </div>
      <div id="team-trigger">
        <Team />
        <Footer />
      </div>
    </main>
  );
}
