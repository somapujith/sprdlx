import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const DitherTorusKnot = lazy(() => import('./DitherTorusKnot'));

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>('.blur-reveal');
      
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 48,
          },
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
    <section ref={containerRef} className="text-black py-32 px-8 relative z-10">
      <div className="pointer-events-none absolute left-[-8%] top-[12%] h-[34vh] w-[28vw] min-w-[240px] opacity-20" aria-hidden>
        <Suspense fallback={null}>
          <DitherTorusKnot className="h-full w-full" pixelSize={3.5} cameraZ={5.4} knotScale={0.72} variant="octahedron" />
        </Suspense>
      </div>
      <div className="pointer-events-none absolute right-[-7%] bottom-[8%] h-[30vh] w-[24vw] min-w-[220px] opacity-15" aria-hidden>
        <Suspense fallback={null}>
          <DitherTorusKnot className="h-full w-full" pixelSize={4} cameraZ={5.6} knotScale={0.66} lightDir={[0.5, 1, 0.3]} variant="torus" />
        </Suspense>
      </div>
      <div className="pointer-events-none absolute left-[46%] top-[4%] h-[20vh] w-[14vw] min-w-[140px] opacity-18" aria-hidden>
        <Suspense fallback={null}>
          <DitherTorusKnot className="h-full w-full" pixelSize={3.2} cameraZ={5.2} knotScale={0.62} lightDir={[1, 0.7, 0.6]} variant="torusKnot" />
        </Suspense>
      </div>
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-24 blur-reveal">
          <h2 className="text-4xl md:text-5xl font-serif text-zinc-400">
            We work with anyone using AI. <span className="text-black">Especially these guys.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Startups */}
          <div className="flex flex-col blur-reveal">
            <p className="text-xl lg:text-2xl font-serif leading-snug text-zinc-500 mb-8">
              <span className="text-black">Startups</span> to do all the design work they don't have time for. Like branding, web, marketing and product.
            </p>
            <div className="w-full aspect-[2.5/1] rounded-lg overflow-hidden mb-6 bg-zinc-100">
              <img src="https://picsum.photos/seed/startups-ai-design/800/400" alt="Startups" className="w-full h-full object-cover mix-blend-multiply" />
            </div>
            <div className="flex items-center gap-6 opacity-60 grayscale text-sm">
              <span className="font-bold flex items-center gap-2"><span className="w-4 h-4 border-2 border-black rotate-45"></span> Wedge AI</span>
              <span className="font-bold flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L24 12H12V24L0 12H12V0Z"/></svg>
                Framer
              </span>
              <span className="font-bold flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M4 4l16 16M4 20L20 4"/></svg>
                creatives
              </span>
            </div>
          </div>

          {/* Enterprises */}
          <div className="flex flex-col blur-reveal">
            <p className="text-xl lg:text-2xl font-serif leading-snug text-zinc-500 mb-8">
              <span className="text-black">Enterprises</span> who want to automate their most boring jobs with bespoke, well-designed AI tools.
            </p>
            <div className="w-full aspect-[2.5/1] rounded-lg overflow-hidden mb-6 bg-zinc-100">
              <img src="https://picsum.photos/seed/enterprises-ai-tools/800/400" alt="Enterprises" className="w-full h-full object-cover mix-blend-multiply" />
            </div>
            <div className="flex items-center gap-6 opacity-60 grayscale text-sm">
              <span className="font-bold flex items-center gap-1"><span className="text-lg leading-none">✦</span> eurostar</span>
              <span className="font-bold tracking-widest">RYMAN</span>
              <span className="font-bold text-[10px] tracking-widest flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M2 2h6v6H2V2zm8 0h6v6h-6V2zm8 0h6v6h-6V2zM2 10h6v6H2v-6zm8 0h6v6h-6v-6zm8 0h6v6h-6v-6zM2 18h6v6H2v-6zm8 0h6v6h-6v-6zm8 0h6v6h-6v-6z"/></svg>
                SOHO HOUSE
              </span>
            </div>
          </div>

          {/* VCs */}
          <div className="flex flex-col blur-reveal">
            <p className="text-xl lg:text-2xl font-serif leading-snug text-zinc-500 mb-8">
              <span className="text-black">VCs</span> looking for a branding refresh to attract AI founders and help their PortCos move faster.
            </p>
            <div className="w-full aspect-[2.5/1] rounded-lg overflow-hidden mb-6 bg-zinc-100">
              <img src="https://picsum.photos/seed/vcs-ai-branding/800/400" alt="VCs" className="w-full h-full object-cover mix-blend-multiply" />
            </div>
            <div className="flex items-center gap-6 opacity-60 grayscale text-sm">
              <span className="font-bold flex items-center gap-1"><span className="bg-black text-white px-1.5 py-0.5 text-[10px] rounded-sm leading-none">Y</span> Combinator</span>
              <span className="font-bold tracking-tighter">kostcapital</span>
              <span className="font-bold tracking-widest flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L22 20H2L12 2Z"/></svg>
                ANTLER
              </span>
            </div>
          </div>
        </div>

        <div className="mt-32 flex justify-end blur-reveal">
          <div className="text-right flex flex-col items-end">
            <p className="text-zinc-500 mb-6 text-sm">£10k for a 2 week sprint.<br/>Constant progress updates.</p>
            <Link to="/contact" className="group flex items-center gap-3 text-lg font-serif italic transition-opacity">
              <span className="relative flex items-center justify-center w-10 h-10 border border-black/20 rounded-sm overflow-hidden">
                <svg className="transition-transform duration-300 ease-in-out group-hover:translate-x-8" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                <svg className="absolute -translate-x-8 transition-transform duration-300 ease-in-out group-hover:translate-x-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
              Get started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
