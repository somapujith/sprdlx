import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
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
 * Scroll-driven `main` background. Lenis is advanced via `gsap.ticker` in GsapLenisSync; relying on
 * `window` scroll or Lenis `scroll` alone often leaves this stuck on black. We hook the same ticker
 * so `getBoundingClientRect()` updates every frame with smooth scroll.
 */
export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  const updateMainBg = useCallback(() => {
    const mainEl = mainRef.current;
    const portfolio = document.getElementById('portfolio-trigger');
    const team = document.getElementById('team');
    if (!mainEl || !portfolio || !team) return;

    const vp = window.innerHeight;
    const ptTop = portfolio.getBoundingClientRect().top;
    const teamTop = team.getBoundingClientRect().top;

    const portfolioLine = vp * 0.44;
    const introBlend = vp * 0.14;
    const teamBlendEnd = vp * 0.38;

    let bg: string;
    let surface: 'light' | 'dark';

    if (ptTop > portfolioLine + introBlend) {
      bg = '#000000';
      surface = 'dark';
    } else if (ptTop > portfolioLine) {
      const span = introBlend;
      const u = span > 0 ? (portfolioLine + introBlend - ptTop) / span : 1;
      const v = Math.round(255 * smoothstep01(u));
      bg = `rgb(${v},${v},${v})`;
      surface = v > 165 ? 'light' : 'dark';
    } else if (teamTop > vp) {
      bg = '#ffffff';
      surface = 'light';
    } else {
      const span = vp - teamBlendEnd;
      const raw = span > 0 ? (teamTop - teamBlendEnd) / span : 0;
      const t = Math.max(0, Math.min(1, raw));
      const v = Math.round(255 * smoothstep01(t));
      bg = `rgb(${v},${v},${v})`;
      surface = v > 165 ? 'light' : 'dark';
    }

    mainEl.style.backgroundColor = bg;
    mainEl.setAttribute('data-surface', surface);
  }, []);

  useLayoutEffect(() => {
    updateMainBg();
  }, [updateMainBg]);

  /** Same ticker Lenis uses — background stays in sync with smooth scroll (fixes “stuck black”). */
  useEffect(() => {
    const tick = () => updateMainBg();
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
    };
  }, [updateMainBg]);

  useEffect(() => {
    const onResize = () => updateMainBg();
    window.addEventListener('resize', onResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', onResize);
    }
    updateMainBg();
    return () => {
      window.removeEventListener('resize', onResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', onResize);
      }
    };
  }, [updateMainBg]);

  return (
    <main
      ref={mainRef}
      className="flex flex-col w-full"
      style={{ backgroundColor: '#000000' }}
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
