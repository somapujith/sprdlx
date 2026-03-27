import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Footer from '../components/Footer';
import DarkVeil from '../components/DarkVeil';

const projects = [
  { id: 1, slug: 'anthill', title: 'Anthill', desc: 'AI-powered knowledge management for modern teams.', img: 'https://picsum.photos/seed/anthill/800/800', logo: 'Anthill', logoIcon: '✦', iconBg: '#1a1a1a' },
  { id: 2, slug: 'pulp', title: 'Pulp', desc: 'A creative storytelling platform for the next generation of writers.', img: 'https://picsum.photos/seed/pulp/800/800', logo: 'Pulp', logoIcon: '✶', iconBg: '#e5d5c5' },
  { id: 3, slug: 'esthetic-insights', title: 'Esthetic Insights', desc: 'Data-driven design analytics to optimize your visual identity.', img: 'https://picsum.photos/seed/esthetic/800/800', logo: 'Esthetic', logoIcon: '✦', iconBg: '#ffffff' },
  { id: 4, slug: 'volery', title: 'Volery', desc: 'Collaborative workspace designed for high-performance distributed teams.', img: 'https://picsum.photos/seed/volery/800/800', logo: 'Volery', logoIcon: '✶', iconBg: '#8b5cf6' },
  { id: 5, slug: 'jay', title: 'Jay', desc: 'Your personal AI assistant for seamless productivity and focus.', img: 'https://picsum.photos/seed/jay/800/800', logo: 'Jay', logoIcon: '✦', iconBg: '#ffffff' },
];

export default function PortfolioPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* DarkVeil Hero */}
      <div className="relative h-screen w-full overflow-hidden flex flex-col justify-center px-8 md:px-20">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full opacity-40">
            <DarkVeil
              hueShift={-100}
              noiseIntensity={0}
              scanlineIntensity={0.75}
              speed={0.7}
              scanlineFrequency={10}
              warpAmount={0.55}
              resolutionScale={1.75}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>
        
        <div className="relative z-10 w-full mt-24">
          <h1 className="text-[20vw] md:text-[16vw] font-serif italic leading-none tracking-tighter opacity-90">
            Portfolio
          </h1>
          <div className="mt-12 max-w-xl">
            <h2 className="text-3xl md:text-5xl font-serif italic mb-4 tracking-tight">Some of our favourite projects.</h2>
            <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest">Build with our team</p>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="max-w-[1400px] mx-auto px-8 pb-32 mt-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {projects.map((project) => (
            <Link 
              key={project.id} 
              to={`/project/${project.slug}`}
              className="group block"
            >
              <div className="aspect-square relative overflow-hidden rounded-2xl bg-zinc-900 transition-all duration-700 group-hover:scale-[0.97] group-hover:rounded-3xl">
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="text-white text-center transform transition-transform duration-700 group-hover:scale-110">
                    {project.logoIcon && <span className="block text-4xl mb-3 drop-shadow-lg">{project.logoIcon}</span>}
                    <span className="text-3xl md:text-4xl font-serif italic tracking-tighter drop-shadow-lg">{project.logo}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex items-start gap-5">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xl border border-white/5"
                  style={{ backgroundColor: project.iconBg }}
                >
                  {project.logoIcon ? (
                    <span className="text-black font-black text-xl">{project.logoIcon}</span>
                  ) : (
                    <span className="text-black font-black text-xl">{project.title[0]}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-1 tracking-tight">{project.title}</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 font-medium">{project.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
