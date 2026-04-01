import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Official Lenis + GSAP ScrollTrigger wiring so scrub/timeline positions match smooth scroll.
 * @see https://github.com/darkroomengineering/lenis#gsap-scrolltrigger
 */
export default function GsapLenisSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const scroller = document.documentElement;

    // Lenis drives scroll position; ScrollTrigger must read lenis.scroll, not only window.scrollY,
    // or triggers lower on the page (e.g. white → black) never fire correctly.
    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', onScroll);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Defer refresh so it runs after layout settles, not during mount
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(raf);
      ScrollTrigger.scrollerProxy(scroller, null);
    };
  }, [lenis]);

  return null;
}
