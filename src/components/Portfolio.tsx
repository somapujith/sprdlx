import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from './AnimatedText';

const projects = [
  { id: 1, slug: 'anthill', title: 'Anthill', desc: 'The AI Operating System for Venture Capital — pitch intelligence, diligence, and LP reporting.', img: 'https://picsum.photos/seed/anthill/1200/1200', logo: 'Anthill', logoIcon: '✦', badge: 'Anthill Ventures' },
  { id: 2, slug: 'pulp', title: 'Pulp', desc: 'A creative storytelling platform for the next generation of writers.', img: 'https://picsum.photos/seed/pulp/1200/1200', logo: 'Pulp', logoIcon: '✶', badge: 'Y Combinator' },
  { id: 3, slug: 'esthetic-insights', title: 'Esthetic Insights', desc: 'Data-driven design analytics to optimize your visual identity.', img: 'https://picsum.photos/seed/esthetic/1200/1200', logo: 'Esthetic', logoIcon: '✦', badge: 'Antler' },
  { id: 4, slug: 'volery', title: 'Volery', desc: 'Collaborative workspace designed for high-performance distributed teams.', img: 'https://picsum.photos/seed/volery/1200/1200', logo: 'Volery', logoIcon: '✶', badge: 'Seed' },
  { id: 5, slug: 'jay', title: 'Jay', desc: 'Your personal AI assistant for seamless productivity and focus.', img: 'https://picsum.photos/seed/jay/1200/1200', logo: 'Jay', logoIcon: '✦', badge: 'Y Combinator' },
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
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-[600px] relative overflow-hidden bg-zinc-200">
                <img src={project.img} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
                <div className="absolute top-8 left-8 text-white font-bold text-3xl drop-shadow-md flex items-center gap-2">
                  {project.logoIcon && <span className="text-4xl">{project.logoIcon}</span>}
                  {project.logo}
                </div>
                {project.badge && (
                  <div className="absolute bottom-8 left-8 text-white font-bold text-xl drop-shadow-md flex items-center gap-2">
                    {project.badge === 'Y Combinator' ? (
                      <div className="bg-white text-black px-3 py-1.5 rounded-sm text-sm flex items-center gap-2">
                        <span className="bg-black text-white px-1 rounded-sm text-xs font-bold">Y</span> 
                        Combinator
                      </div>
                    ) : (
                      <span className={project.badge === 'Antler' ? 'tracking-widest uppercase text-2xl' : 'text-2xl'}>
                        {project.badge}
                      </span>
                    )}
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
