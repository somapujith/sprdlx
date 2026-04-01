import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis + GSAP ScrollTrigger — same wiring as Lenis docs / typical Webflow+GSAP builds
 * (e.g. ashleybrookecs.com): raf on gsap.ticker, ScrollTrigger on lenis scroll, lag smoothing off.
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

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);

    // Prevents GSAP from “catching up” after frame gaps — important for scroll-linked motion to feel liquid.
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(onTick);
      gsap.ticker.lagSmoothing(500, 33);
      ScrollTrigger.scrollerProxy(scroller, null);
    };
  }, [lenis]);

  return null;
}
