import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HalftoneDotField from './effects/HalftoneDotField';

gsap.registerPlugin(ScrollTrigger);

const COLUMNS = [
  {
    id: 'startups',
    label: 'Startups',
    body: (
      <>
        Product design, brand, and web for teams shipping AI-native products — from zero to launch.
      </>
    ),
    img: 'https://picsum.photos/seed/startups-ai-design/960/600',
    partners: ['Wedge AI', 'Framer', 'creatives'],
  },
  {
    id: 'enterprises',
    label: 'Enterprises',
    body: (
      <>
        Bespoke AI tools and interfaces so your org can deploy models safely and your teams actually adopt them.
      </>
    ),
    img: 'https://picsum.photos/seed/enterprises-ai-tools/960/600',
    partners: ['eurostar', 'RYMAN', 'SOHO HOUSE'],
  },
  {
    id: 'vcs',
    label: 'VCs',
    body: (
      <>
        Brand and digital systems that help you win AI founders and give PortCos a credible story fast.
      </>
    ),
    img: 'https://picsum.photos/seed/vcs-ai-branding/960/600',
    partners: ['Y Combinator', 'kostcapital', 'ANTLER'],
  },
] as const;

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>('.blur-reveal');

      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'top 60%',
              scrub: 0.75,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-10 min-h-[1px] bg-transparent text-black px-6 sm:px-8 py-24 md:py-32 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <HalftoneDotField opacity={0.07} grid={30} dotMax={1.8} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <header className="text-center blur-reveal mb-16 md:mb-20 lg:mb-24">
          <p className="text-[0.65rem] sm:text-xs font-medium uppercase tracking-[0.28em] text-zinc-400 mb-5 md:mb-6">
            Who we work with
          </p>
          <h2 className="font-serif text-[1.75rem] sm:text-[2rem] md:text-[2.35rem] lg:text-[2.65rem] leading-[1.18] tracking-[-0.02em] text-zinc-400 max-w-[22ch] sm:max-w-2xl lg:max-w-3xl mx-auto">
            We work with anyone using AI.{' '}
            <span className="text-zinc-900">Especially these guys.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-10 items-stretch">
          {COLUMNS.map((col) => (
            <article
              key={col.id}
              className="blur-reveal group flex flex-col rounded-2xl border border-zinc-200/80 bg-zinc-50/40 p-6 sm:p-7 md:p-6 lg:p-7 shadow-[0_1px_0_0_rgb(0_0_0_/0.04)] transition-shadow duration-300 hover:shadow-[0_12px_40px_-12px_rgb(0_0_0_/0.12)] hover:border-zinc-300/90"
            >
              <div className="mb-6 md:mb-7">
                <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-zinc-400 mb-3">
                  {col.label}
                </h3>
                <p className="font-serif text-[1.0625rem] sm:text-lg lg:text-[1.125rem] leading-[1.55] text-zinc-600">
                  {col.body}
                </p>
              </div>

              <figure className="relative mb-6 md:mb-7 overflow-hidden rounded-xl bg-zinc-200/80 aspect-16/10 ring-1 ring-black/6">
                <img
                  src={col.img}
                  alt=""
                  className="h-full w-full object-cover object-center transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.03] saturate-[0.92] contrast-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
                <span
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/6 via-transparent to-transparent"
                  aria-hidden
                />
              </figure>

              <div className="mt-auto border-t border-zinc-200/90 pt-5 md:pt-6">
                <p className="text-[0.6rem] sm:text-[0.65rem] font-medium uppercase tracking-[0.2em] text-zinc-400 mb-3.5">
                  Teams like
                </p>
                <ul className="flex flex-wrap items-center gap-x-1 gap-y-2 text-[0.8125rem] sm:text-sm font-medium text-zinc-500">
                  {col.partners.map((name, i) => (
                    <li key={name} className="flex items-center gap-x-1">
                      {i > 0 && (
                        <span className="mx-2 text-zinc-300 select-none" aria-hidden>
                          ·
                        </span>
                      )}
                      <span className="tracking-tight">{name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
