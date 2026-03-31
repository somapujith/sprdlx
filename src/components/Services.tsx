import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const DitherTorusKnot = lazy(() => import('./DitherTorusKnot'));

const COLUMNS = [
  {
    id: 'startups',
    label: 'Startups',
    body: (
      <>
        We handle the design work you don&apos;t have time for—branding, web, marketing, and product.
      </>
    ),
    img: 'https://picsum.photos/seed/startups-ai-design/960/600',
    partners: ['Wedge AI', 'Framer', 'creatives'],
  },
  {
    id: 'enterprises',
    label: 'Enterprises',
    body: (
      <>We build bespoke, well-designed AI tools so your teams can automate the work nobody wants to do.</>
    ),
    img: 'https://picsum.photos/seed/enterprises-ai-tools/960/600',
    partners: ['eurostar', 'RYMAN', 'SOHO HOUSE'],
  },
  {
    id: 'vcs',
    label: 'VCs',
    body: (
      <>
        Branding and digital systems that help you attract AI founders and move PortCos faster.
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
      className="relative z-10 bg-transparent text-black px-6 sm:px-8 py-24 md:py-32 overflow-hidden"
    >
      <div className="pointer-events-none absolute left-[-8%] top-[10%] h-[32vh] w-[26vw] min-w-[200px] opacity-[0.12]" aria-hidden>
        <Suspense fallback={null}>
          <DitherTorusKnot className="h-full w-full" pixelSize={3.5} cameraZ={5.4} knotScale={0.72} variant="octahedron" />
        </Suspense>
      </div>
      <div className="pointer-events-none absolute right-[-6%] bottom-[6%] h-[28vh] w-[22vw] min-w-[200px] opacity-[0.1]" aria-hidden>
        <Suspense fallback={null}>
          <DitherTorusKnot className="h-full w-full" pixelSize={4} cameraZ={5.6} knotScale={0.66} lightDir={[0.5, 1, 0.3]} variant="torus" />
        </Suspense>
      </div>
      <div className="pointer-events-none absolute left-[48%] top-[2%] h-[18vh] w-[12vw] min-w-[120px] opacity-[0.11]" aria-hidden>
        <Suspense fallback={null}>
          <DitherTorusKnot className="h-full w-full" pixelSize={3.2} cameraZ={5.2} knotScale={0.62} lightDir={[1, 0.7, 0.6]} variant="torusKnot" />
        </Suspense>
      </div>

      <div className="relative max-w-6xl mx-auto w-full">
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

        <div className="mt-20 md:mt-24 lg:mt-28 flex justify-center sm:justify-end blur-reveal">
          <div
            id="services-sprint-cta"
            className="services-sprint-cta w-full max-w-md sm:max-w-lg sm:ml-auto rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-[0_1px_0_0_rgb(0_0_0_/0.04)] sm:p-7 text-center sm:text-left"
          >
            <p className="text-sm leading-relaxed text-zinc-600">
              £10k for a 2 week sprint.
              <br />
              Constant progress updates.
            </p>
            <Link
              to="/contact"
              className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 sm:w-auto sm:justify-start sm:px-6"
            >
              Get started
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
