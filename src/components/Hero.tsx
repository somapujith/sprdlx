import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
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

export default function Hero() {
  const { t } = useTranslation();
  const heroText = t('hero');
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const [mountSpline, setMountSpline] = useState(false);

  useEffect(() => {
    return scheduleIdle(() => setMountSpline(true));
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
        className="absolute bottom-0 left-0 right-0 w-full z-10 opacity-0 border-t border-white/10"
      >
        <div
          className="w-full px-8 overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          }}
        >
          <div className="flex whitespace-nowrap animate-marquee items-center h-7 py-2 will-change-transform">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-9 md:gap-11 lg:gap-14 min-w-max [&_svg]:shrink-0"
              >
                <span className="marquee-item text-white/45 font-medium">
                  <span className="text-[0.65rem] mr-0.5">✦</span> eurostar
                </span>
                <span className="marquee-item text-white/45 font-semibold flex items-center gap-1.5">
                  <svg
                    className="w-2.5 h-2.5 opacity-90"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                  omnera
                </span>
                <span className="marquee-item font-serif text-white/45">
                  <span className="text-[0.65rem] mr-0.5">✶</span> Eragon
                </span>
                <span className="marquee-item text-white/45 font-semibold tracking-tight">
                  kostcapital
                </span>
                <span className="marquee-item font-serif text-white/45">a16z</span>
                <span className="marquee-item text-white/45 font-medium flex items-center gap-1">
                  <span className="bg-white text-black px-[3px] py-px text-[8px] font-bold leading-none rounded-[2px]">
                    Y
                  </span>
                  Combinator
                </span>
                <span className="marquee-item text-white/45 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-linear-to-tr from-white to-white/25" />{' '}
                  Nucleo
                </span>
                <span className="marquee-item text-white/45 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 border border-white/45 rotate-45" /> Wedge
                </span>
                <span className="marquee-item text-white/45 font-semibold tracking-tight">
                  K kivira
                </span>
                <span className="marquee-item text-white/45 font-medium flex items-center gap-1">
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
                  </svg>
                  Framer
                </span>
                <span className="marquee-item text-white/45 font-semibold flex items-center gap-1">
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 22h20L12 2zm0 4l7 14H5l7-14z" />
                  </svg>
                  LiveRamp
                </span>
                <span className="marquee-item text-white/45 font-semibold flex items-center gap-0.5">
                  <span className="font-serif italic text-[0.7rem]">x</span> creativex
                </span>
                <span className="marquee-item font-serif text-white/45 tracking-[0.2em] uppercase">
                  Condé Nast
                </span>
                <span className="marquee-item font-serif text-white/45 flex items-center gap-1">
                  <svg
                    className="w-2.5 h-2.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v8M8 12h8" />
                  </svg>
                  PASTA EVANGELISTS
                </span>
                <span className="marquee-item text-white/45 font-medium flex items-center gap-1">
                  <span className="bg-white text-black px-[3px] py-px text-[8px] font-bold leading-none rounded-[2px]">
                    T
                  </span>
                  Tesora
                </span>
                <span className="marquee-item text-white/45 font-semibold flex items-center gap-1">
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  GHOST SHIP
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
