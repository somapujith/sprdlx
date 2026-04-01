import { useEffect, useRef, type MutableRefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Feather, User, type LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HeroVisual from './effects/HeroVisual';
import SprdlxLogoMark from './SprdlxLogoMark';

gsap.registerPlugin(ScrollTrigger);

type MarqueeEntry =
  | {
      name: string;
      fontClass: string;
      logoSrc: string;
      logoClass?: string;
      wordmarkOnly?: boolean;
    }
  | {
      name: string;
      fontClass: string;
      Icon: LucideIcon;
    };

const MARQUEE_ENTRIES: MarqueeEntry[] = [
  {
    name: 'Anthill',
    fontClass: 'font-serif tracking-tight',
    logoSrc: '/projects/anthill/Anthill%20Ventures%20Logo.svg',
    wordmarkOnly: true,
  },
  {
    name: 'Esthetic Insights',
    fontClass: 'font-serif tracking-tight',
    logoSrc: '/projects/esthetic-insights/EI%20logo%202.svg',
    logoClass: 'brightness-0 invert',
    wordmarkOnly: true,
  },
  {
    name: 'Pulp',
    fontClass: 'font-sans font-semibold tracking-tight',
    logoSrc: '/projects/pulp/logo.png',
  },
  { name: 'Volery', fontClass: 'font-sans font-medium tracking-tight', Icon: Feather },
  { name: 'Jay', fontClass: 'font-sans font-bold tracking-tight', Icon: User },
];

const MARQUEE_CYCLES_PER_HALF = 8;
const MARQUEE_SEGMENT = Array.from({ length: MARQUEE_CYCLES_PER_HALF }, () => [...MARQUEE_ENTRIES]).flat();

function setIntensityFromProgress(intensityRef: MutableRefObject<number>, p: number) {
  if (p < 0.12) {
    intensityRef.current = 0.22;
  } else if (p < 0.55) {
    intensityRef.current = 0.22 + ((p - 0.12) / 0.43) * 0.78;
  } else {
    intensityRef.current = 1;
  }
}

export default function Hero() {
  const { t } = useTranslation();
  const heroText = t('hero');
  const heroEyebrow = t('heroEyebrow');
  const outerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const fullWordmarkRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const intensityRef = useRef(0.22);

  useEffect(() => {
    if (!textRef.current || !outerRef.current) return;

    const lines = heroText.split(/\r?\n/).filter(Boolean);
    textRef.current.innerHTML = '';

    lines.forEach((line, lineIdx) => {
      const lineDiv = document.createElement('div');
      lineDiv.className = lineIdx === 1 ? 'hero-line hero-line--secondary' : 'hero-line';

      const words = line.trim().split(/\s+/).filter(Boolean);
      words.forEach((word) => {
        const span = document.createElement('span');
        span.className =
          'inline-block overflow-hidden mr-[0.25em] pb-[0.1em] -mb-[0.1em] align-bottom';
        const innerSpan = document.createElement('span');
        innerSpan.className =
          'inline-block translate-y-[120%] rotate-[4deg] origin-top-left opacity-0';
        innerSpan.innerText = word;
        span.appendChild(innerSpan);
        lineDiv.appendChild(span);
      });

      textRef.current?.appendChild(lineDiv);
    });

    const ctx = gsap.context(() => {
      const innerSpans = textRef.current?.querySelectorAll('span > span');
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reducedMotion) {
        gsap.set(innerSpans ?? [], { y: '0%', rotation: 0, opacity: 1 });
        gsap.set(bgRef.current, { opacity: 1 });
        gsap.set([logoRef.current, tickerRef.current], { autoAlpha: 1 });
        if (eyebrowRef.current) gsap.set(eyebrowRef.current, { autoAlpha: 1, y: 0 });
        if (fullWordmarkRef.current) gsap.set(fullWordmarkRef.current, { autoAlpha: 0, scale: 1, y: 0 });
        intensityRef.current = 1;
        return;
      }

      gsap.set(bgRef.current, { opacity: 1 });
      gsap.set(fullWordmarkRef.current, { autoAlpha: 1, scale: 1, y: 0 });
      gsap.set(logoRef.current, { autoAlpha: 0, y: 10 });
      gsap.set(eyebrowRef.current, { autoAlpha: 0, y: 10 });
      gsap.set(tickerRef.current, { autoAlpha: 0 });
      gsap.set(innerSpans ?? [], { y: '120%', rotation: 4, opacity: 0 });
      setIntensityFromProgress(intensityRef, 0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: 'top top',
          end: '+=100vh',
          scrub: 0.85,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setIntensityFromProgress(intensityRef, self.progress);
          },
        },
      });

      tl.to(
        fullWordmarkRef.current,
        {
          autoAlpha: 0,
          scale: 0.26,
          y: '-11vh',
          duration: 0.42,
          ease: 'power2.inOut',
        },
        0.1
      );

      tl.to(
        logoRef.current,
        { autoAlpha: 1, y: 0, duration: 0.34, ease: 'power2.out' },
        0.16
      );

      if (eyebrowRef.current) {
        tl.to(
          eyebrowRef.current,
          { autoAlpha: 1, y: 0, duration: 0.26, ease: 'power2.out' },
          0.48
        );
      }

      tl.to(
        innerSpans ?? [],
        {
          y: '0%',
          rotation: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.042,
          ease: 'expo.out',
        },
        0.5
      );

      tl.to(
        tickerRef.current,
        { autoAlpha: 1, duration: 0.32, ease: 'power2.out' },
        0.58
      );
    }, outerRef);

    const refreshRaf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshRaf);
      ctx.revert();
    };
  }, [heroText]);

  return (
    <div ref={outerRef} className="relative min-h-[200vh] w-full">
      <section className="sticky top-0 z-10 flex min-h-screen w-full flex-col justify-end overflow-hidden isolate px-8 pt-28 pb-24 md:pt-32 md:pb-32">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-4 h-[min(62vh,32rem)]"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.12) 15%, rgba(0,0,0,0.45) 38%, rgba(0,0,0,0.82) 68%, #000 100%)',
          }}
          aria-hidden
        />

        <div ref={bgRef} className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <HeroVisual intensityRef={intensityRef} />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
          aria-hidden
        >
          <div ref={fullWordmarkRef} className="hero-wordmark-stage text-white">
            <SprdlxLogoMark className="h-auto w-full" />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start text-left pointer-events-none">
          <div ref={logoRef} className="mb-5 md:mb-6 opacity-0 pointer-events-auto">
            <SprdlxLogoMark className="h-7 w-auto md:h-8 text-[#ccff00]" />
          </div>

          <p
            ref={eyebrowRef}
            className="mb-4 md:mb-5 opacity-0 text-[0.6rem] sm:text-[0.65rem] font-mono font-medium uppercase tracking-[0.26em] text-[#ccff00]/70 pointer-events-auto"
          >
            {heroEyebrow}
          </p>
          <h1
            ref={textRef}
            aria-label={heroText.replace(/\r?\n/g, ' ')}
            className="hero-headline font-serif text-left text-white tracking-[-0.035em] pointer-events-auto"
          />
        </div>

        <div
          ref={tickerRef}
          className="absolute bottom-0 left-0 right-0 z-10 w-full opacity-0 pt-14 md:pt-20 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgb(0 0 0 / 0.97) 0%, rgb(0 0 0 / 0.72) 32%, rgb(0 0 0 / 0.28) 58%, rgb(0 0 0 / 0.06) 78%, transparent 100%)',
          }}
        >
          <div
            className="w-full px-8 overflow-hidden"
            aria-label="Featured brands: Anthill, Esthetic Insights, Pulp, Volery, Jay"
            style={{
              maskImage:
                'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
            }}
          >
            <div
              className="flex w-max shrink-0 whitespace-nowrap animate-marquee items-center min-h-16 md:min-h-20 h-auto py-5 md:py-7 will-change-transform motion-reduce:animate-none"
              style={{ animationDuration: '150s' }}
              aria-hidden
            >
              {[0, 1].map((strip) => (
                <div
                  key={strip}
                  className="flex shrink-0 items-center gap-[72px] md:gap-[88px] lg:gap-28 pr-[72px] md:pr-[88px] lg:pr-28"
                >
                  {MARQUEE_SEGMENT.map((entry, idx) => (
                    <span
                      key={`${strip}-${idx}-${entry.name}`}
                      className={`marquee-item ${entry.fontClass}`}
                    >
                      {'logoSrc' in entry ? (
                        <img
                          src={entry.logoSrc}
                          alt={entry.wordmarkOnly ? entry.name : ''}
                          className={`marquee-item-logo ${entry.logoClass ?? ''}`}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                          aria-hidden={entry.wordmarkOnly ? undefined : true}
                        />
                      ) : (
                        <entry.Icon
                          className="marquee-item-icon"
                          stroke="currentColor"
                          fill="none"
                          aria-hidden
                        />
                      )}
                      {(!('logoSrc' in entry) || !entry.wordmarkOnly) && (
                        <span className="whitespace-nowrap">{entry.name}</span>
                      )}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
