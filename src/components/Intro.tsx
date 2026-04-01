import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

/**
 * Intro — editorial manifesto: no watermarks, balanced grid, clear type hierarchy.
 */
export default function Intro() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll<HTMLElement>('.word-reveal');
      const sub = sublineRef.current;

      if (!words?.length) return;

      gsap.set(words, { opacity: 0.08, y: '0.5em' });
      if (sub) gsap.set(sub, { opacity: 0.06, y: 14 });

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
        stagger: 0.022,
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
  const highlightColor = 'hsl(72 100% calc(46% - var(--bg-l, 0) * 18%))';
  const eyebrowMuted = 'hsl(72 85% calc(58% - var(--bg-l, 0) * 32%))';

  return (
    <section
      id="section-manifesto"
      ref={containerRef}
      className="relative z-10 overflow-hidden py-28 md:py-36 lg:py-44 transition-[color] duration-150 ease-out"
      style={{
        color: 'hsl(0 0% calc((1 - var(--bg-l, 0)) * 100%))',
      }}
    >
      {/*
        Home.tsx: background stays black until viewport center passes this line (~mid manifesto),
        so the black→white transition toward Portfolio begins after scroll-driven copy is underway.
      */}
      <div
        id="manifesto-blend-gate"
        className="pointer-events-none absolute left-0 right-0 top-[52%] h-px w-full opacity-0"
        aria-hidden
      />

      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12 lg:items-end">
          {/* Main column — readable measure (7/12) */}
          <div className="lg:col-span-7">
            {/* Eyebrow: rule + label (no vertical rail) */}
            <div className="mb-8 flex flex-wrap items-center gap-4 md:gap-5">
              <span
                className="h-px w-10 shrink-0 bg-current opacity-20 md:w-14"
                aria-hidden
              />
              <p
                className="font-mono text-[0.62rem] uppercase tracking-[0.32em] sm:text-[0.65rem]"
                style={{ color: eyebrowMuted }}
              >
                {t('introEyebrow')}
              </p>
              <span className="hidden h-px min-w-8 flex-1 bg-current opacity-15 sm:block" aria-hidden />
            </div>

            <h2
              ref={textRef}
              className="font-serif text-[1.65rem] leading-[1.22] tracking-[-0.025em] text-balance sm:text-[1.85rem] md:text-[2.15rem] lg:text-[2.45rem] xl:text-[2.65rem]"
            >
              <span className="block">
                {wrapWords(t('introBeforeAi'))}
                <span className="word-reveal mx-1.5 inline-block align-baseline font-mono text-[0.52em] font-medium tracking-[0.18em] text-[#ccff00] sm:mx-2 md:text-[0.5em]">
                  [AI]
                </span>
              </span>
              <span className="mt-3 block text-[0.96em] leading-[1.28] text-current/90 md:mt-4">
                {wrapWords(t('introAfterLine1'))}
              </span>
              <span className="mt-2 block md:mt-3">
                {wrapWords(t('introAfterLine2'))}{' '}
                <span
                  className="word-reveal inline-block font-medium will-change-transform"
                  style={{ color: highlightColor }}
                >
                  {t('introHighlight')}
                </span>
              </span>
            </h2>

            <p
              ref={sublineRef}
              className="mt-10 max-w-md font-serif text-[1.05rem] italic leading-relaxed sm:text-lg md:mt-12 md:text-xl"
              style={{ color: sublineColor }}
            >
              {t('introSubline')}
            </p>
          </div>

          {/* Right column — typographic balance (5/12), no images */}
          <aside className="hidden lg:col-span-5 lg:flex lg:flex-col lg:justify-end lg:pb-1">
            <ul className="space-y-5 border-l border-[#ccff00]/35 pl-6 font-serif text-2xl tracking-[-0.02em] text-current/88 xl:text-[1.65rem]">
              <li>{t('introPillar1')}</li>
              <li>{t('introPillar2')}</li>
              <li>{t('introPillar3')}</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
