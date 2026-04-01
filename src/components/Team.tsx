import React, { useEffect, useRef } from 'react';
import VTLink from './VTLink';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlitchHeadline from './effects/GlitchHeadline';

gsap.registerPlugin(ScrollTrigger);

type TeamMember = {
  name: string;
  role: string;
  accent: string;
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    name: 'Pujith Soma',
    role: 'Creative Frontend Developer',
    accent: '#a78bfa',
    image: '/team/pujith-soma.png',
  },
  {
    name: 'Ajith Prudhvi',
    role: 'Frontend Designer',
    accent: '#67e8f9',
    image: '/team/ajith-prudhvi.jpeg',
  },
  {
    name: 'Nithin Singarapu',
    role: 'AI Engineer',
    accent: '#34d399',
    image: '/team/nithin-singarapu.png',
  },
  {
    name: 'Rakesh Thakkuri',
    role: 'AI Research Engineer',
    accent: '#fbbf24',
    image: '/team/rakesh-thakkuri.jpg',
  },
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
        const offset = i - 2;

        gsap.fromTo(
          wrapper,
          { y: 400, x: -offset * 40 },
          {
            y: Math.abs(offset) * 20,
            x: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              end: 'top 30%',
              scrub: 1,
            },
          }
        );

        if (inner) {
          gsap.fromTo(
            inner,
            { rotation: 0 },
            {
              rotation: offset * 6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                end: 'top 30%',
                scrub: 1,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="team" className="team-section py-32 md:py-40 px-8 overflow-hidden relative z-10" ref={containerRef}>
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(var(--theme-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--theme-grid-line) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Eyebrow */}
        <p className="text-[0.65rem] sm:text-xs font-medium uppercase tracking-[0.28em] text-[color:var(--theme-muted)] text-center mb-6">
          The team
        </p>

        {/* Headline */}
        <div className="max-w-4xl mx-auto text-center mb-8">
          <GlitchHeadline
            text="From engineers, to designers — our team knows how to ship AI products."
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem]"
          />
        </div>

        {/* CTA */}
        <div className="flex justify-center mb-28 md:mb-36">
          <VTLink
            to="/contact"
            data-cursor="accent"
            className="group inline-flex items-center gap-3 text-base font-serif italic text-[color:var(--theme-ink-soft)] hover:text-[color:var(--theme-ink)] transition-colors px-5 py-2.5 rounded-full border border-[color:var(--theme-border-soft)] hover:border-[color:var(--theme-border)]"
          >
            <span className="relative flex items-center justify-center w-8 h-8 border border-[color:var(--theme-border)] rounded-full overflow-hidden">
              <svg className="transition-transform duration-300 ease-in-out group-hover:translate-x-6" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              <svg className="absolute -translate-x-6 transition-transform duration-300 ease-in-out group-hover:translate-x-0" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
            Book a call with our team
          </VTLink>
        </div>

        {/* Team cards */}
        <div className="flex justify-center gap-5 md:gap-6 no-scrollbar">
          {teamMembers.map((member, i) => {
            const initials = member.name
              .split(/\s+/)
              .map((p) => p[0])
              .join('');
            return (
              <div
                key={member.name}
                className="relative group shrink-0"
                style={{ willChange: 'transform' }}
                ref={(el) => { wrappersRef.current[i] = el; }}
              >
                <div
                  className="team-card w-[200px] md:w-[230px] rounded-2xl overflow-hidden relative z-10 transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ willChange: 'transform' }}
                  ref={(el) => { innersRef.current[i] = el; }}
                >
                  {/* Card face */}
                  <div className="relative aspect-[3/4]">
                    {/* Member photo */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                    >
                      <img
                        src={member.image}
                        alt={`${member.name} portrait`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Dither + tint overlays */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `
                          repeating-linear-gradient(
                            135deg,
                            rgba(255,255,255,0.04) 0,
                            rgba(255,255,255,0.04) 1px,
                            transparent 1px,
                            transparent 5px
                          ),
                          linear-gradient(to top, rgba(8,8,10,0.72) 0%, rgba(8,8,10,0.2) 48%, rgba(8,8,10,0.58) 100%),
                          radial-gradient(ellipse at 30% 20%, ${member.accent}1f 0%, transparent 65%)
                        `,
                      }}
                    />

                    {/* Subtle initial watermark */}
                    <div className="absolute inset-0 flex items-end justify-start p-4">
                      <span
                        className="font-serif text-5xl md:text-6xl leading-none select-none"
                        style={{ color: `${member.accent}2b` }}
                      >
                        {initials}
                      </span>
                    </div>

                    {/* Hover overlay with name */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5 team-card-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10">
                      <h3 className="text-lg font-serif text-[color:var(--theme-ink)] leading-tight">{member.name}</h3>
                      <p className="text-[11px] uppercase tracking-[0.18em] mt-1.5" style={{ color: member.accent }}>
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="team-card-meta border-t border-[color:var(--theme-border-soft)] px-4 py-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-[color:var(--theme-ink-soft)] tracking-tight">{member.name}</span>
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: member.accent }}
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
