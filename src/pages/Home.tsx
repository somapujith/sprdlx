import { useCallback, useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDesignTheme } from '../design/theme-context';
import type { RgbTuple } from '../design/themes';
import { setNavSurface } from '../navSurface';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import Team from '../components/Team';
import Footer from '../components/Footer';
import SectionChapters from '../components/SectionChapters';

function smoothstep01(t: number) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

/** Fewer grey steps while scrolling = far fewer style/nav updates (was hammering every frame in ramps). */
function quantizeChannel(v: number, step = 7) {
  return Math.min(255, Math.max(0, Math.round(v / step) * step));
}

function blendRgb(from: RgbTuple, to: RgbTuple, amount: number): RgbTuple {
  const t = Math.max(0, Math.min(1, amount));
  return [
    quantizeChannel(from[0] + (to[0] - from[0]) * t, 6),
    quantizeChannel(from[1] + (to[1] - from[1]) * t, 6),
    quantizeChannel(from[2] + (to[2] - from[2]) * t, 6),
  ];
}

function toRgbCss([r, g, b]: RgbTuple) {
  return `rgb(${r},${g},${b})`;
}

function getCurrentScrollY() {
  return document.documentElement.scrollTop || window.scrollY;
}

type SectionOffsets = {
  portfolioTop: number;
  teamTop: number;
  gateTop: number | null;
};

/**
 * Scroll-driven background using lenis.scroll (virtual scroll position) so
 * getBoundingClientRect() values are always in sync with Lenis's interpolated position.
 */
export default function Home() {
  const { theme } = useDesignTheme();
  const mainRef = useRef<HTMLElement>(null);
  const lastAppliedRef = useRef('');
  const lastBgLRef = useRef<number | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const pendingScrollRef = useRef(0);
  const sectionOffsetsRef = useRef<SectionOffsets | null>(null);

  const refreshSectionOffsets = useCallback(() => {
    const portfolio = document.getElementById('portfolio-trigger');
    const team = document.getElementById('team');
    const gate = document.getElementById('manifesto-blend-gate');

    if (!portfolio || !team) {
      sectionOffsetsRef.current = null;
      return;
    }

    const scrollY = getCurrentScrollY();
    const toDocumentTop = (el: HTMLElement) => el.getBoundingClientRect().top + scrollY;

    sectionOffsetsRef.current = {
      portfolioTop: toDocumentTop(portfolio),
      teamTop: toDocumentTop(team),
      gateTop: gate ? toDocumentTop(gate) : null,
    };
  }, []);

  const updateMainBg = useCallback((scrollY: number) => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    if (!sectionOffsetsRef.current) {
      refreshSectionOffsets();
    }

    const offsets = sectionOffsetsRef.current;
    if (!offsets) return;

    const { portfolioTop: ptOffset, teamTop: teamOffset, gateTop } = offsets;
    const { dark, light, navLightThreshold } = theme.surfaceRamp;


    const vp = window.innerHeight;

    // How far each section's top is from the current viewport top
    const ptTop = ptOffset - scrollY;
    const teamTop = teamOffset - scrollY;

    const portfolioLine = vp * 0.44;
    const introBlend = vp * 0.55;
    const teamBlendEnd = vp * 0.38;

    /** Until viewport center passes mid-manifesto, keep full black (defer Portfolio entry transition). */
    let manifestoMidPassed = true;
    if (gateTop != null) {
      const viewportCenterY = scrollY + vp * 0.5;
      manifestoMidPassed = viewportCenterY >= gateTop;
    }

    let transitionLevel = 0;

    if (!manifestoMidPassed) {
      transitionLevel = 0;
    } else if (ptTop > portfolioLine + introBlend) {
      // Still in Intro / Hero — stay at theme dark surface.
      transitionLevel = 0;
    } else if (ptTop > portfolioLine) {
      // Smoothly ramp dark → light as portfolio approaches.
      const u = (portfolioLine + introBlend - ptTop) / introBlend;
      transitionLevel = smoothstep01(u);
    } else if (teamTop > vp) {
      // Portfolio / Services — full light surface.
      transitionLevel = 1;
    } else {
      // Team entering — smoothly ramp light → dark.
      const span = vp - teamBlendEnd;
      const raw = span > 0 ? (teamTop - teamBlendEnd) / span : 0;
      transitionLevel = smoothstep01(raw);
    }

    const bg = toRgbCss(blendRgb(dark, light, transitionLevel));
    const surface: 'light' | 'dark' = transitionLevel > navLightThreshold ? 'light' : 'dark';
    const luminance = transitionLevel;

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
    mainEl.style.setProperty('--dynamic-bg', bg);
    mainEl.setAttribute('data-surface', surface);
    setNavSurface(surface);
  }, [refreshSectionOffsets, theme]);

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
        refreshSectionOffsets();
        // Read scrollY from documentElement since Lenis scrolls it
        updateMainBg(getCurrentScrollY());
      });
    };
    window.addEventListener('resize', onResize);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', onResize);
    // Initial paint
    lastAppliedRef.current = '';
    lastBgLRef.current = null;
    refreshSectionOffsets();
    updateMainBg(getCurrentScrollY());
    return () => {
      window.removeEventListener('resize', onResize);
      if (window.visualViewport) window.visualViewport.removeEventListener('resize', onResize);
    };
  }, [refreshSectionOffsets, updateMainBg]);

  // ScrollTrigger refresh can shift section geometry (font/image load, pinning) — recache offsets afterwards.
  useEffect(() => {
    const onScrollTriggerRefresh = () => {
      refreshSectionOffsets();
      updateMainBg(getCurrentScrollY());
    };

    ScrollTrigger.addEventListener('refreshInit', onScrollTriggerRefresh);
    ScrollTrigger.addEventListener('refresh', onScrollTriggerRefresh);

    return () => {
      ScrollTrigger.removeEventListener('refreshInit', onScrollTriggerRefresh);
      ScrollTrigger.removeEventListener('refresh', onScrollTriggerRefresh);
    };
  }, [refreshSectionOffsets, updateMainBg]);

  useEffect(() => {
    lastAppliedRef.current = '';
    lastBgLRef.current = null;
    refreshSectionOffsets();
    updateMainBg(getCurrentScrollY());
  }, [theme.id, refreshSectionOffsets, updateMainBg]);

  useEffect(() => {
    return () => {
      if (scrollRafRef.current != null) {
        cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    return () => setNavSurface('dark');
  }, []);

  return (
    <main
      ref={mainRef}
      className="flex flex-col w-full"
      style={{ backgroundColor: toRgbCss(theme.surfaceRamp.dark), ['--bg-l' as string]: 0 }}
      data-surface="dark"
    >
      <SectionChapters />
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
