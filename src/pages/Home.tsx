import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import Team from '../components/Team';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const main = () => mainRef.current;
    const toBg = (color: string) => {
      const el = main();
      if (!el) return;
      const isLight = color.toLowerCase() === '#ffffff';
      el.setAttribute('data-surface', isLight ? 'light' : 'dark');
      gsap.killTweensOf(el);
      gsap.to(el, { backgroundColor: color, duration: 0.8, overwrite: 'auto' });
    };

    const ctx = gsap.context(() => {
      const stCommon = { scroller: document.documentElement };

      // One continuous black field (no opaque section bg); flash white only after scrolling into the portfolio block
      ScrollTrigger.create({
        ...stCommon,
        trigger: '#portfolio-trigger',
        start: 'top 44%',
        onEnter: () => toBg('#ffffff'),
        onLeaveBack: () => toBg('#000000'),
      });

      ScrollTrigger.create({
        ...stCommon,
        trigger: '#team',
        start: 'top 42%',
        onEnter: () => toBg('#000000'),
        onEnterBack: () => toBg('#000000'),
        onLeaveBack: () => toBg('#ffffff'),
      });
    }, mainRef);

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    const t = window.setTimeout(refresh, 300);

    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <main ref={mainRef} className="flex flex-col w-full bg-black" data-surface="dark">
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
