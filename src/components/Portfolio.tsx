import React from 'react';
import VTLink from './VTLink';
import AnimatedText from './AnimatedText';
import HalftoneDotField from './effects/HalftoneDotField';

const ANTHILL_VENTURES_LOGO = '/projects/anthill/Anthill%20Ventures%20Logo.svg';

const projects = [
  { id: 1, slug: 'anthill', title: 'Anthill', desc: 'The AI Operating System for Venture Capital — pitch intelligence, diligence, and LP reporting.', img: '/projects/anthill/hero.png', logo: 'Anthill', logoIcon: '✦' },
  { id: 2, slug: 'pulp', title: 'Pulp', desc: 'A creative storytelling platform for the next generation of writers.', img: '/projects/pulp/hero.png', logo: 'Pulp', logoIcon: '✶' },
  {
    id: 3,
    slug: 'esthetic-insights',
    title: 'Esthetic Insights',
    desc: 'Data-driven design analytics to optimize your visual identity.',
    img: '/projects/esthetic-insights/esthetic-product-hero.png',
    logo: 'Esthetic Insights',
    logoIcon: undefined,
  },
  { id: 4, slug: 'volery', title: 'Volery', desc: 'Collaborative workspace designed for high-performance distributed teams.', img: '', logo: 'Volery', logoIcon: '✶', placeholder: true as const },
  { id: 5, slug: 'jay', title: 'Jay', desc: 'Your personal AI assistant for seamless productivity and focus.', img: '', logo: 'Jay', logoIcon: '✦', placeholder: true as const },
];

export default function Portfolio() {
  return (
    <section id="work" className="portfolio-section relative z-10 min-h-px px-5 py-20 sm:px-6 sm:py-28 md:px-8 md:py-32">
      <div className="pointer-events-none absolute inset-0 z-0">
        <HalftoneDotField opacity={0.045} grid={34} dotMax={1.5} />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-10 flex flex-col gap-5 sm:mb-16 sm:gap-6 md:mb-20 sm:flex-row sm:items-end sm:justify-between">
          <AnimatedText
            as="h2"
            text="We've done a lot. Here are some highlights"
            className="portfolio-title max-w-xl text-2xl sm:max-w-md sm:text-3xl md:text-5xl font-serif"
          />
          <span className="portfolio-kicker text-xs font-medium uppercase tracking-widest hidden md:block">Portfolio</span>
        </div>

        <div className="relative flex flex-col gap-10 pb-24 sm:gap-12 sm:pb-32">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="portfolio-card sticky top-[calc(4.25rem+var(--card-i)*0.8rem)] flex flex-col overflow-hidden rounded-[2rem] border md:top-[calc(7rem+var(--card-i)*1.2rem)] md:flex-row"
              style={{ ['--card-i' as string]: index } as React.CSSProperties}
            >
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-[600px] relative overflow-hidden bg-[color:var(--theme-canvas-strong)]">
                {'placeholder' in project && project.placeholder ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[linear-gradient(145deg,#080808_0%,#2a2a2e_48%,#0c0c0c_100%)]">
                    <div
                      className="absolute inset-0 opacity-50"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.035) 3px, rgba(255,255,255,0.035) 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.02) 3px, rgba(255,255,255,0.02) 4px)',
                      }}
                      aria-hidden
                    />
                    <div className="relative z-10 text-center px-6">
                      <span className="text-5xl mb-2 block" aria-hidden>
                        {project.logoIcon}
                      </span>
                      <span className="text-white font-bold text-2xl tracking-tight">{project.logo}</span>
                      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[color:var(--theme-muted)]">Visual coming soon</p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={project.img}
                    alt={project.title}
                    className={
                      project.slug === 'esthetic-insights' || project.slug === 'anthill' || project.slug === 'pulp'
                        ? 'w-full h-full object-cover bg-black'
                        : 'w-full h-full object-contain bg-black'
                    }
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                )}
                {project.slug === 'esthetic-insights' ? (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 p-6 md:p-10">
                    <img
                      src="/projects/esthetic-insights/EI%20logo%202.svg"
                      alt="Esthetic Insights"
                      className="h-auto w-[min(88%,min(420px,90vw))] max-h-[42%] object-contain brightness-0 invert drop-shadow-[0_4px_32px_rgba(0,0,0,0.5)]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : project.slug === 'anthill' ? (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 p-6 md:p-10">
                    <img
                      src={ANTHILL_VENTURES_LOGO}
                      alt="Anthill Ventures"
                      className="h-auto w-[min(92%,min(520px,92vw))] max-h-[36%] object-contain brightness-0 invert drop-shadow-[0_4px_32px_rgba(0,0,0,0.5)]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : project.slug === 'pulp' ? (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 p-6 md:p-10">
                    <img
                      src="/projects/pulp/logo.png"
                      alt="Pulp"
                      className="h-auto w-[min(42%,min(280px,50vw))] aspect-square max-h-[40%] object-contain drop-shadow-[0_4px_32px_rgba(0,0,0,0.5)]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : project.slug === 'volery' || project.slug === 'jay' ? null : (
                  <div className="absolute left-5 top-5 flex items-center gap-2 text-2xl font-bold text-white drop-shadow-md sm:left-8 sm:top-8 sm:text-3xl">
                    {project.logoIcon && <span className="text-4xl">{project.logoIcon}</span>}
                    {project.logo}
                  </div>
                )}
              </div>
              <div className="flex w-full flex-col justify-between p-5 sm:p-10 md:w-1/2 md:p-16 lg:p-20">
                <div>
                  {project.slug === 'anthill' ? (
                    <h3 className="sr-only">{project.title}</h3>
                  ) : (
                    <AnimatedText as="h3" text={project.title} className="text-3xl font-serif mb-6" />
                  )}
                  <AnimatedText as="p" text={project.desc} className="portfolio-description text-lg leading-relaxed max-w-sm" />
                </div>
                <VTLink
                  to={`/project/${project.slug}`}
                  data-cursor="view"
                  className="group mt-8 flex w-fit items-center gap-3 text-sm font-medium transition-opacity sm:mt-12"
                >
                  <span className="relative flex items-center justify-center w-10 h-10 border border-[color:var(--theme-border)] rounded-sm overflow-hidden">
                    <svg className="transition-transform duration-300 ease-in-out group-hover:translate-x-8" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                    <svg className="absolute -translate-x-8 transition-transform duration-300 ease-in-out group-hover:translate-x-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                  View project
                </VTLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
