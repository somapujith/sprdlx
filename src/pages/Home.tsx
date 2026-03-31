import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import Team from '../components/Team';
import Footer from '../components/Footer';

/**
 * Scroll-driven main background. Lenis often does not emit native `window` `scroll` events,
 * so we subscribe to `lenis.on('scroll')` directly. Tailwind `bg-*` on `<main>` can also override
 * inline colors — use JS-only background on `main`.
 */
export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const rafRef = useRef(0);
  const lenis = useLenis();

  const updateMainBg = useCallback(() => {
    const mainEl = mainRef.current;
    const portfolio = document.getElementById('portfolio-trigger');
    const team = document.getElementById('team');
    if (!mainEl || !portfolio || !team) return;

    const vp = window.innerHeight;
    const ptTop = portfolio.getBoundingClientRect().top;
    const teamTop = team.getBoundingClientRect().top;

    const portfolioLine = vp * 0.44;
    const teamBlendEnd = vp * 0.38;

    let bg: string;
    let surface: 'light' | 'dark';

    if (ptTop > portfolioLine) {
      bg = '#000000';
      surface = 'dark';
    } else if (teamTop > vp) {
      bg = '#ffffff';
      surface = 'light';
    } else if (teamTop <= teamBlendEnd) {
      bg = '#000000';
      surface = 'dark';
    } else {
      const span = vp - teamBlendEnd;
      const t = span > 0 ? Math.max(0, Math.min(1, (teamTop - teamBlendEnd) / span)) : 0;
      const v = Math.round(255 * t);
      bg = `rgb(${v},${v},${v})`;
      surface = v > 165 ? 'light' : 'dark';
    }

    mainEl.style.backgroundColor = bg;
    mainEl.setAttribute('data-surface', surface);
  }, []);

  const schedule = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      updateMainBg();
    });
  }, [updateMainBg]);

  useLayoutEffect(() => {
    updateMainBg();
  }, [updateMainBg]);

  /** Primary: Lenis fires every tick while smooth-scrolling (window scroll often does not). */
  useEffect(() => {
    if (!lenis) return;
    const onScroll = () => schedule();
    lenis.on('scroll', onScroll);
    schedule();
    return () => {
      lenis.off('scroll', onScroll);
    };
  }, [lenis, schedule]);

  /** Fallback for environments where native scroll still fires. */
  useEffect(() => {
    const onResize = () => schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', onResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', onResize);
    }
    schedule();
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', onResize);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [schedule]);

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
