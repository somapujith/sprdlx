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
      className="services-section relative z-10 min-h-[1px] overflow-hidden bg-transparent px-5 py-20 sm:px-8 sm:py-28 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <HalftoneDotField opacity={0.07} grid={30} dotMax={1.8} />
      </div>

      {/* Fade halftone into scroll-driven page background so Team doesn’t read as a hard cut. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-44 sm:h-52 bg-gradient-to-t from-[var(--dynamic-bg)] via-[color-mix(in_srgb,var(--dynamic-bg)_35%,transparent)] to-transparent"
        aria-hidden
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <header className="blur-reveal mb-12 text-center sm:mb-16 md:mb-20 lg:mb-24">
          <p className="services-meta mb-4 text-[0.65rem] font-medium uppercase tracking-[0.28em] sm:mb-5 sm:text-xs md:mb-6">
            Who we work with
          </p>
          <h2 className="services-copy font-serif text-[1.75rem] sm:text-[2rem] md:text-[2.35rem] lg:text-[2.65rem] leading-[1.18] tracking-[-0.02em] max-w-[22ch] sm:max-w-2xl lg:max-w-3xl mx-auto">
            We work with anyone using AI.{' '}
            <span className="services-copy-strong">Especially these guys.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-3 md:gap-8 lg:gap-10">
          {COLUMNS.map((col) => (
            <article
              key={col.id}
              className="service-card blur-reveal group flex flex-col rounded-2xl border p-5 sm:p-7 md:p-6 lg:p-7 transition-shadow duration-300"
            >
              <div className="mb-6 md:mb-7">
                <h3 className="services-meta text-[0.65rem] font-semibold uppercase tracking-[0.22em] mb-3">
                  {col.label}
                </h3>
                <p className="services-copy font-serif text-[1.0625rem] sm:text-lg lg:text-[1.125rem] leading-[1.55]">
                  {col.body}
                </p>
              </div>

              <figure className="relative isolate mb-6 md:mb-7 overflow-hidden rounded-xl bg-[color:var(--theme-card-quiet)] aspect-16/10 ring-1 ring-[color:var(--theme-border)] [contain:paint]">
                <img
                  src={col.img}
                  alt=""
                  className="h-full w-full object-cover object-center transition-[transform,filter] duration-700 ease-out [transform:translateZ(0)] group-hover:scale-[1.03] saturate-[0.92] contrast-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
                <span
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/6 via-transparent to-transparent"
                  aria-hidden
                />
              </figure>

              <div className="mt-auto border-t border-[color:var(--theme-border)] pt-5 md:pt-6">
                <p className="services-meta text-[0.6rem] sm:text-[0.65rem] font-medium uppercase tracking-[0.2em] mb-3.5">
                  Teams like
                </p>
                <ul className="services-copy flex flex-wrap items-center gap-x-1 gap-y-2 text-[0.8125rem] sm:text-sm font-medium">
                  {col.partners.map((name, i) => (
                    <li key={name} className="flex items-center gap-x-1">
                      {i > 0 && (
                        <span className="services-meta mx-2 select-none" aria-hidden>
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
