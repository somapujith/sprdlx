import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from './AnimatedText';

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
  { id: 4, slug: 'volery', title: 'Volery', desc: 'Collaborative workspace designed for high-performance distributed teams.', img: 'https://picsum.photos/seed/volery/1200/1200', logo: 'Volery', logoIcon: '✶' },
  { id: 5, slug: 'jay', title: 'Jay', desc: 'Your personal AI assistant for seamless productivity and focus.', img: 'https://picsum.photos/seed/jay/1200/1200', logo: 'Jay', logoIcon: '✦' },
];

export default function Portfolio() {
  return (
    <section id="work" className="text-black py-32 px-8 relative z-10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-20">
          <AnimatedText as="h2" text="We've done a lot. Here are some highlights" className="text-3xl md:text-5xl font-serif text-zinc-400 max-w-md" />
          <span className="text-xs font-medium uppercase tracking-widest text-zinc-400 hidden md:block">Portfolio</span>
        </div>

        <div className="relative flex flex-col gap-12 pb-32">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="sticky flex flex-col md:flex-row bg-[#f4f4f4] rounded-[2rem] overflow-hidden shadow-2xl border border-black/5"
              style={{ top: `${120 + index * 20}px` }}
            >
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-[600px] relative overflow-hidden bg-zinc-900">
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
                      src="/projects/anthill/Anthill%20Ventures%20Logo.svg"
                      alt="Anthill"
                      className="h-auto w-[min(92%,min(520px,92vw))] max-h-[36%] object-contain drop-shadow-[0_4px_32px_rgba(0,0,0,0.5)]"
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
                ) : (
                  <div className="absolute top-8 left-8 text-white font-bold text-3xl drop-shadow-md flex items-center gap-2">
                    {project.logoIcon && <span className="text-4xl">{project.logoIcon}</span>}
                    {project.logo}
                  </div>
                )}
              </div>
              <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-between">
                <div>
                  <AnimatedText as="h3" text={project.title} className="text-3xl font-serif mb-6" />
                  <AnimatedText as="p" text={project.desc} className="text-zinc-500 text-lg leading-relaxed max-w-sm" />
                </div>
                <Link to={`/project/${project.slug}`} className="group flex items-center gap-3 text-sm font-medium transition-opacity mt-12 w-fit">
                  <span className="relative flex items-center justify-center w-10 h-10 border border-black/20 rounded-sm overflow-hidden">
                    <svg className="transition-transform duration-300 ease-in-out group-hover:translate-x-8" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                    <svg className="absolute -translate-x-8 transition-transform duration-300 ease-in-out group-hover:translate-x-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                  View project
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
