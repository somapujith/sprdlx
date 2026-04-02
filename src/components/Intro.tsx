import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

function ManifestoHighlight({ children }: { children: ReactNode }) {
  return (
    <span className="manifesto-highlight-text text-[color:var(--theme-accent)]">{children}</span>
  );
}

const PILLAR_KEYS = ['introPillar1', 'introPillar2', 'introPillar3'] as const;

/**
 * Intro — asymmetric manifesto: main column + narrow aside (pillars + location).
 */
export default function Intro() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      container.querySelectorAll<HTMLElement>('.manifesto-highlight-text').forEach((el) => {
        gsap.set(el, { opacity: 1, y: 0 });
      });
      const pillars = container.querySelector<HTMLElement>('.manifesto-pillars');
      if (pillars) gsap.set(pillars, { opacity: 1, y: 0 });
      if (sublineRef.current) gsap.set(sublineRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>(container.querySelectorAll('.manifesto-block'));
      blocks.forEach((block) => {
        const texts = block.querySelectorAll<HTMLElement>('.manifesto-highlight-text');
        gsap.set(texts, { opacity: 0.2, y: '0.06em' });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: 'top 86%',
            end: 'top 44%',
            scrub: 0.72,
            invalidateOnRefresh: true,
          },
        });
        texts.forEach((textEl, i) => {
          tl.to(textEl, { opacity: 1, y: 0, ease: 'none', duration: 1 }, i * 0.05);
        });
      });

      const pillars = container.querySelector<HTMLElement>('.manifesto-pillars');
      if (pillars) {
        gsap.set(pillars, { opacity: 0.25, y: 16 });
        gsap.to(pillars, {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: pillars,
            start: 'top 88%',
            end: 'top 62%',
            scrub: 0.6,
          },
        });
      }

      const sub = sublineRef.current;
      if (sub) {
        gsap.set(sub, { opacity: 0.22, y: 10 });
        gsap.to(sub, {
          scrollTrigger: {
            trigger: sub,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 0.8,
          },
          opacity: 1,
          y: 0,
          ease: 'none',
        });
      }
    }, container);

    return () => ctx.revert();
  }, [i18n.language]);

  const sublineColor = 'color-mix(in srgb, var(--theme-ink) 50%, var(--theme-canvas) 50%)';

  return (
    <section
      id="section-manifesto"
      ref={containerRef}
      className="intro-section relative z-10 overflow-hidden py-24 md:py-36 lg:py-44 transition-[color] duration-150 ease-out"
      style={{
        color: 'hsl(0 0% calc((1 - var(--bg-l, 0)) * 100%))',
      }}
    >
      <h2 className="sr-only">Manifesto</h2>

      <div
        id="manifesto-blend-gate"
        className="pointer-events-none absolute left-0 right-0 top-[52%] h-px w-full opacity-0"
        aria-hidden
      />

      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12 lg:items-start">
          {/* Main column — statement */}
          <div className="lg:col-span-7 xl:col-span-8">
            <p className="mb-10 font-mono text-[0.62rem] uppercase tracking-[0.4em] text-[color:var(--theme-muted)] md:mb-12 md:text-[0.65rem]">
              {t('introEyebrow')}
            </p>

            <div
              className="font-serif tracking-[-0.04em] text-balance"
              role="group"
              aria-label={t('introEyebrow')}
            >
              <p className="manifesto-block m-0 text-[clamp(1.75rem,5vw,3.15rem)] font-light leading-[1.08]">
                <ManifestoHighlight>{t('introBeforeAi')}</ManifestoHighlight>
              </p>

              <p className="manifesto-block mt-10 max-w-[40ch] text-[clamp(1.15rem,2.4vw,1.5rem)] leading-[1.42] text-current/92 md:mt-12">
                <ManifestoHighlight>{t('introAfterLine1')}</ManifestoHighlight>
              </p>

              <p className="manifesto-block mt-8 max-w-[42ch] text-[clamp(1.05rem,2.1vw,1.35rem)] leading-[1.48] text-current/85 md:mt-10">
                {t('introAfterLine2')}{' '}
                <ManifestoHighlight>{t('introHighlight')}</ManifestoHighlight>
              </p>
            </div>
          </div>

          {/* Aside — pillars + studio line */}
          <aside className="flex flex-col justify-between gap-12 border-t border-[color:var(--theme-border-soft)] pt-10 lg:col-span-5 xl:col-span-4 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-2 xl:pl-12">
            <ul
              className="manifesto-pillars flex flex-col gap-6 font-mono text-[0.68rem] uppercase tracking-[0.28em] text-current/70 md:gap-7 md:text-[0.72rem]"
              role="list"
            >
              {PILLAR_KEYS.map((key) => (
                <li key={key} className="leading-snug">
                  <span className="mr-2 text-[color:var(--theme-accent)]">—</span>
                  {t(key)}
                </li>
              ))}
            </ul>

            <p
              ref={sublineRef}
              className="max-w-xs font-serif text-[0.95rem] italic leading-relaxed md:text-[1rem]"
              style={{ color: sublineColor }}
            >
              {t('introSubline')}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
