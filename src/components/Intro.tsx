import React, { useEffect, useRef, useSyncExternalStore } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DitherTorusKnot from './DitherTorusKnot';
import InlineAiBlob from './effects/InlineAiBlob';
import SynapticThreadsBg from './effects/SynapticThreadsBg';
import { getNavSurface, subscribeNavSurface } from '../navSurface';

gsap.registerPlugin(ScrollTrigger);

/**
 * Copy + decor track `--bg-l` on `<main>` (0 = black … 1 = white) so contrast stays
 * correct through the Intro → Portfolio scroll blend.
 */
export default function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const surface = useSyncExternalStore(subscribeNavSurface, getNavSurface, getNavSurface);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll<HTMLElement>('.word-reveal');
      const sub = sublineRef.current;

      if (!words?.length) return;

      gsap.set(words, { opacity: 0.08, y: '0.55em' });
      if (sub) gsap.set(sub, { opacity: 0.06, y: 18 });

      const st = {
        trigger: containerRef.current,
        start: 'top 78%',
        end: 'center 42%',
        scrub: 1.05,
        invalidateOnRefresh: true,
      };

      gsap.to(words, {
        scrollTrigger: st,
        opacity: 1,
        y: 0,
        stagger: 0.028,
        ease: 'none',
      });

      if (sub) {
        gsap.to(sub, {
          scrollTrigger: {
            ...st,
            start: 'top 72%',
            end: 'center 48%',
          },
          opacity: 1,
          y: 0,
          ease: 'power1.out',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const wrapWords = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="word-reveal inline-block mr-[0.28em] will-change-transform">
        {word}
      </span>
    ));
  };

  const sublineColor = 'hsl(0 0% calc(62% - var(--bg-l, 0) * 22%))';

  return (
    <section
      ref={containerRef}
      className="py-28 md:py-36 lg:py-44 px-6 sm:px-8 min-h-[min(100vh,56rem)] flex items-center relative z-10 overflow-hidden transition-[color] duration-150 ease-out"
      style={{
        color: 'hsl(0 0% calc((1 - var(--bg-l, 0)) * 100%))',
      }}
    >
      {/* Soft edge vignette — visible mainly on dark backgrounds */}
      <div
        className="pointer-events-none absolute inset-0 z-2"
        style={{
          background:
            'radial-gradient(ellipse 115% 95% at 14% 48%, transparent 38%, rgb(0 0 0 / calc((1 - var(--bg-l, 0)) * 0.16)) 100%)',
        }}
        aria-hidden
      />

      <SynapticThreadsBg />

      <div
        className="pointer-events-none absolute right-[-8%] top-1/2 h-[58vh] w-[54vw] max-h-[760px] max-w-[820px] -translate-y-1/2 z-1"
        style={{ opacity: 'calc(0.48 - var(--bg-l, 0) * 0.24)' }}
        aria-hidden
      >
        <DitherTorusKnot
          className="w-full h-full"
          color1="#ffffff"
          color2="#000000"
          pixelSize={3}
          lightDir={[1, 0.8, 0.6]}
          cameraZ={5.2}
          knotScale={0.8}
          variant="torusKnot"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-[46rem] lg:max-w-[52rem]">
          <h2
            ref={textRef}
            className="text-[2rem] sm:text-[2.35rem] md:text-5xl lg:text-6xl xl:text-[3.35rem] font-serif leading-[1.14] tracking-[-0.028em] text-balance"
          >
            {wrapWords('We build')}
            <span className="word-reveal inline-block mx-2 md:mx-2.5 align-middle will-change-transform">
              <InlineAiBlob tone={surface === 'light' ? 'light' : 'dark'} />
            </span>
            {wrapWords(
              "standout brands, digital experiences, and AI tools — and invest in teams building what's next."
            )}
          </h2>

          <p
            ref={sublineRef}
            className="mt-9 md:mt-11 text-lg sm:text-xl md:text-2xl font-serif leading-snug tracking-[-0.02em] max-w-xl"
            style={{ color: sublineColor }}
          >
            We&apos;re based in Hyderabad.
          </p>
        </div>
      </div>
    </section>
  );
}
