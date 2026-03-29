import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Feather, Layers, Mountain, Sparkles, User, type LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Spline = lazy(() => import('@splinetool/react-spline'));

function scheduleIdle(cb: () => void, timeoutMs = 1500) {
  if (typeof requestIdleCallback !== 'undefined') {
    const id = requestIdleCallback(cb, { timeout: timeoutMs });
    return () => cancelIdleCallback(id);
  }
  const id = window.setTimeout(cb, 400);
  return () => clearTimeout(id);
}

/** Symbol + wordmark per brand; spacing between units set on strip (60–80px) */
const MARQUEE_ENTRIES: {
  name: string;
  Icon: LucideIcon;
  fontClass: string;
}[] = [
  { name: 'Anthill', Icon: Mountain, fontClass: 'font-serif tracking-tight' },
  { name: 'Esthetic Insights', Icon: Sparkles, fontClass: 'font-serif tracking-tight' },
  { name: 'Pulp', Icon: Layers, fontClass: 'font-sans font-semibold tracking-tight' },
  { name: 'Volery', Icon: Feather, fontClass: 'font-sans font-medium tracking-tight' },
  { name: 'Jay', Icon: User, fontClass: 'font-sans font-bold tracking-tight' },
];

/** Full cycles per half-strip; wider units → fewer repeats than plain text */
const MARQUEE_CYCLES_PER_HALF = 8;

const MARQUEE_SEGMENT = Array.from({ length: MARQUEE_CYCLES_PER_HALF }, () => [...MARQUEE_ENTRIES]).flat();

export default function Hero() {
  const { t } = useTranslation();
  const heroText = t('hero');
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const [mountSpline, setMountSpline] = useState(false);

  useEffect(() => {
    return scheduleIdle(() => {
      try {
        const canvas = document.createElement('canvas');
        const gl =
          canvas.getContext('webgl') ||
          canvas.getContext('experimental-webgl') ||
          canvas.getContext('webgl2');
        if (gl) setMountSpline(true);
      } catch {
        /* WebGL unavailable (sandbox, GPU off, strict browser) — skip Spline */
      }
    });
  }, []);

  useEffect(() => {
    if (!textRef.current) return;

    const lines = heroText.split(/\r?\n/).filter(Boolean);
    textRef.current.innerHTML = '';

    lines.forEach((line) => {
      const lineDiv = document.createElement('div');
      lineDiv.className = 'hero-line';

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

      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(innerSpans, {
        y: '0%',
        rotation: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.05,
        ease: 'expo.out',
      });

      tl.to(
        bgRef.current,
        {
          opacity: 1,
          duration: 2,
          ease: 'power2.inOut',
        },
        '-=0.6'
      );

      tl.to(
        [logoRef.current, tickerRef.current],
        {
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
        },
        '-=1.5'
      );
    });

    return () => ctx.revert();
  }, [heroText]);

  return (
    <section className="relative min-h-screen flex flex-col justify-end pt-28 md:pt-32 pb-24 md:pb-32 px-8 w-full overflow-hidden isolate">
      {/* Feather Spline / hero color into #000 so the next section reads as one black field */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-4 h-[min(62vh,32rem)]"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.12) 15%, rgba(0,0,0,0.45) 38%, rgba(0,0,0,0.82) 68%, #000 100%)',
        }}
        aria-hidden
      />
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 overflow-hidden opacity-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute -top-[120px] -bottom-[120px] -left-[120px] -right-[120px]">
          {mountSpline && (
            <Suspense fallback={null}>
              <Spline scene="https://prod.spline.design/3Z9HZVYsWsN84iLT/scene.splinecode" />
            </Suspense>
          )}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start text-left">
        <div ref={logoRef} className="mb-5 md:mb-6 opacity-0">
          <svg
            width="56"
            height="28"
            viewBox="0 0 100 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <ellipse cx="50" cy="25" rx="46" ry="21" stroke="white" strokeWidth="4" />
            <path
              d="M50 4 Q50 25 96 25 Q50 25 50 46 Q50 25 4 25 Q50 25 50 4 Z"
              fill="white"
            />
          </svg>
        </div>

        <h1
          ref={textRef}
          aria-label={heroText.replace(/\r?\n/g, ' ')}
          className="hero-headline font-serif text-left text-white tracking-[-0.035em]"
        />
      </div>

      <div
        ref={tickerRef}
        className="absolute bottom-0 left-0 right-0 w-full z-10 opacity-0 pt-14 md:pt-20"
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
            className="flex w-max shrink-0 whitespace-nowrap animate-marquee items-center min-h-14 h-auto py-4 md:py-5 will-change-transform motion-reduce:animate-none"
            style={{ animationDuration: '150s' }}
            aria-hidden
          >
            {[0, 1].map((strip) => (
              <div
                key={strip}
                className="flex shrink-0 items-center gap-[60px] md:gap-[72px] lg:gap-20 pr-[60px] md:pr-[72px] lg:pr-20"
              >
                {MARQUEE_SEGMENT.map((entry, idx) => {
                  const Icon = entry.Icon;
                  return (
                    <span
                      key={`${strip}-${idx}-${entry.name}`}
                      className={`marquee-item ${entry.fontClass}`}
                    >
                      <Icon className="marquee-item-icon" stroke="currentColor" fill="none" aria-hidden />
                      <span className="whitespace-nowrap">{entry.name}</span>
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
