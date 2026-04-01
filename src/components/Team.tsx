import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from './AnimatedText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const DitherTorusKnot = lazy(() => import('./DitherTorusKnot'));

const teamMembers = [
  { name: 'Luca', role: 'Product, Look and Feel', img: 'https://picsum.photos/seed/team1/400/500' },
  { name: 'Ana', role: 'Product design genius', img: 'https://picsum.photos/seed/team2/400/500' },
  { name: 'Emily', role: 'End-to-end design strategist', img: 'https://picsum.photos/seed/team3/400/500' },
  { name: 'John', role: 'Frontend Engineer', img: 'https://picsum.photos/seed/team4/400/500' },
  { name: 'Sarah', role: 'Backend Engineer', img: 'https://picsum.photos/seed/team5/400/500' },
];

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const innersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      wrappersRef.current.forEach((wrapper, i) => {
        if (!wrapper) return;
        const inner = innersRef.current[i];
        const offset = i - 2; // -2, -1, 0, 1, 2
        
        gsap.fromTo(wrapper,
          { 
            y: 400, 
            x: -offset * 40 
          },
          {
            y: Math.abs(offset) * 20,
            x: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            }
          }
        );

        if (inner) {
          gsap.fromTo(inner,
            { rotation: 0 },
            {
              rotation: offset * 6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "top 30%",
                scrub: 1,
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="team" className="text-white py-40 px-8 overflow-hidden relative z-10" ref={containerRef}>
      <div className="pointer-events-none absolute right-[-6%] top-[8%] h-[34vh] w-[28vw] min-w-[240px] opacity-25" aria-hidden>
        <Suspense fallback={null}>
          <DitherTorusKnot
            className="h-full w-full"
            pixelSize={3}
            cameraZ={5}
            knotScale={0.75}
            lightDir={[1, 0.7, 0.5]}
            variant="icosahedron"
          />
        </Suspense>
      </div>
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        <AnimatedText as="h2" text="From engineers, to designers—our team knows how to ship AI products." className="text-4xl md:text-5xl lg:text-6xl font-serif mb-12 max-w-4xl leading-tight" />
        <Link to="/contact" className="group flex items-center gap-3 text-lg font-serif italic transition-opacity px-6 py-3">
          <span className="relative flex items-center justify-center w-10 h-10 border border-white/30 rounded-sm overflow-hidden">
            <svg className="transition-transform duration-300 ease-in-out group-hover:translate-x-8" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            <svg className="absolute -translate-x-8 transition-transform duration-300 ease-in-out group-hover:translate-x-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
          Book a call with our team
        </Link>
      </div>

      <div className="mt-40 flex justify-center gap-6 px-8 no-scrollbar">
        {teamMembers.map((member, i) => (
          <div 
            key={i} 
            className="relative group flex-shrink-0"
            style={{ willChange: 'transform' }}
            ref={el => { wrappersRef.current[i] = el; }}
          >
            {/* Hover Text */}
            <div className="absolute bottom-full left-0 mb-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none flex flex-col items-start z-20">
              <h3 className="text-2xl font-serif text-white">{member.name}</h3>
              <p className="text-sm text-gray-400 font-sans mt-1">{member.role}</p>
            </div>
            
            {/* Image Container */}
            <div 
              className="w-[240px] h-[320px] rounded-xl overflow-hidden bg-zinc-900 relative z-10"
              style={{ willChange: 'transform' }}
              ref={el => { innersRef.current[i] = el; }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img 
                src={member.img} 
                alt={member.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
