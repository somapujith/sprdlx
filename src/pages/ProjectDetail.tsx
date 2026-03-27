import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Footer from '../components/Footer';

const ESTHETIC_LOGO_SRC = '/projects/esthetic-insights/esthetic-insights-logo.svg';

const projectsData = {
  'anthill': {
    title: 'Anthill',
    desc: 'The AI Operating System for Venture Capital — pitch intelligence, diligence, portfolio, and LP reporting.',
    heroImg: 'https://picsum.photos/seed/anthill-hero/1920/800',
    logo: 'Anthill',
    logoIcon: '✦',
    industry: 'AI',
    subIndustry: 'B2B SaaS',
    deliverables: [
      'Pitch deck analysis',
      'Portfolio management',
      'VC workflows automation',
      'LP reports generation',
    ],
    status: 'In Dev',
    backedBy: 'Anthill Ventures',
    backedByLogo: 'Anthill Ventures',
    about:
      'Anthill is the AI Operating System built for Venture Capital. It reads and scores pitch decks, automates due diligence, monitors portfolio performance, surfaces market intelligence, and generates LP reports — so your team spends less time on process and more time on conviction.',
    images: [
      'https://picsum.photos/seed/anthill-1/1200/800',
      'https://picsum.photos/seed/anthill-2/1920/1080',
    ],
    next: 'pulp',
    prev: 'jay'
  },
  'pulp': {
    title: 'Pulp',
    desc: 'A creative storytelling platform for the next generation of writers.',
    heroImg: 'https://picsum.photos/seed/pulp-hero/1920/800',
    logo: 'Pulp',
    logoIcon: '✶',
    industry: 'Creative',
    subIndustry: 'Publishing',
    deliverables: ['Web design', 'Brand identity'],
    completed: 'January 2026',
    fundingStage: 'Pre-Seed',
    backedBy: 'Y Combinator',
    backedByLogo: 'Y',
    about: 'Pulp is a creative storytelling platform designed to empower the next generation of writers with collaborative tools and AI-enhanced narrative structures.',
    images: [
      'https://picsum.photos/seed/pulp-1/1200/800',
      'https://picsum.photos/seed/pulp-2/1920/1080',
    ],
    next: 'esthetic-insights',
    prev: 'anthill'
  },
  'esthetic-insights': {
    title: 'Esthetic Insights',
    desc: 'Data-driven design analytics to optimize your visual identity.',
    heroImg: '/projects/esthetic-insights/hero.png',
    logo: 'Esthetic',
    logoIcon: '✦',
    industry: 'Design',
    subIndustry: 'Analytics',
    deliverables: ['Web design', 'Data visualization'],
    completed: 'February 2026',
    fundingStage: 'Series A',
    backedBy: 'Antler',
    backedByLogo: 'ANTLER',
    about:
      'Esthetic Insights is focused on helping brands create and optimize beauty, skincare, and haircare products using data-driven design analytics. However, they faced challenges in effectively integrating AI into their product ecosystem and digital presence.',
    images: [
      '/projects/esthetic-insights/gallery-1.png',
      '/projects/esthetic-insights/gallery-2.png',
    ],
    next: 'volery',
    prev: 'pulp'
  },
  'volery': {
    title: 'Volery',
    desc: 'Collaborative workspace designed for high-performance distributed teams.',
    heroImg: 'https://picsum.photos/seed/volery-hero/1920/800',
    logo: 'Volery',
    logoIcon: '✶',
    industry: 'Productivity',
    subIndustry: 'Collaboration',
    deliverables: ['Web design', 'Product design'],
    completed: 'April 2026',
    fundingStage: 'Seed',
    backedBy: 'Seed',
    backedByLogo: 'S',
    about: 'Volery is a collaborative workspace designed specifically for high-performance distributed teams, focusing on deep work and asynchronous communication.',
    images: [
      'https://picsum.photos/seed/volery-1/1200/800',
      'https://picsum.photos/seed/volery-2/1920/1080',
    ],
    next: 'jay',
    prev: 'esthetic-insights'
  },
  'jay': {
    title: 'Jay',
    desc: 'Your personal AI assistant for seamless productivity and focus.',
    heroImg: 'https://picsum.photos/seed/jay-hero/1920/800',
    logo: 'Jay',
    logoIcon: '✦',
    industry: 'AI',
    subIndustry: 'Personal Assistant',
    deliverables: ['Web design', 'Mobile app'],
    completed: 'May 2026',
    fundingStage: 'Pre-Seed',
    backedBy: 'Y Combinator',
    backedByLogo: 'Y',
    about: 'Jay is your personal AI assistant that integrates across all your devices to provide seamless productivity, focus management, and intelligent task automation.',
    images: [
      'https://picsum.photos/seed/jay-1/1200/800',
      'https://picsum.photos/seed/jay-2/1920/1080',
    ],
    next: 'anthill',
    prev: 'volery'
  }
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectsData[id as keyof typeof projectsData] : null;
  const isEsthetic = id === 'esthetic-insights';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center text-white">Project not found</div>;
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Hero Banner */}
      <div className="w-full px-4 md:px-8 pt-24 pb-8">
        <div className="w-full h-[40vh] md:h-[50vh] relative overflow-hidden rounded-[2rem]">
          <img 
            src={project.heroImg} 
            alt={project.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            {isEsthetic ? (
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-6 md:px-12 md:py-8 rounded-2xl flex items-center justify-center max-w-[min(96vw,36rem)] text-center">
                <h1 className="m-0 font-sans font-bold uppercase tracking-[0.14em] text-white text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight">
                  ESTHETIC INSIGHTS
                </h1>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-10 py-5 rounded-full flex items-center gap-4">
                <h1 className="m-0 flex items-center gap-4 text-3xl md:text-5xl font-serif italic tracking-tight">
                  {project.logoIcon && <span className="text-3xl font-serif italic">{project.logoIcon}</span>}
                  {project.title}
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-7xl mx-auto px-8 py-24 flex flex-col lg:flex-row gap-20">
        {/* Left: Info */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-8">
              {isEsthetic ? (
                <>
                  <img
                    src={ESTHETIC_LOGO_SRC}
                    alt=""
                    width={180}
                    height={48}
                    className="h-10 w-auto max-w-[min(42vw,12rem)] shrink-0 object-contain object-left brightness-0 invert md:h-12"
                    decoding="async"
                    draggable={false}
                    aria-hidden
                  />
                  <h2 className="text-4xl font-bold tracking-tight">{project.title}</h2>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center border border-white/10">
                    <span className="text-xl font-bold">{project.logoIcon || project.title[0]}</span>
                  </div>
                  <h2 className="text-4xl font-bold tracking-tight">{project.title}</h2>
                </>
              )}
            </div>
            <p className="text-zinc-400 text-lg max-w-md leading-snug font-medium">
              {project.desc}
            </p>
          </div>
          
          <div className="mt-16">
            <button className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 group">
              <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center overflow-hidden relative">
                 <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                   <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                 </svg>
              </div>
              <span className="text-sm font-medium">View work</span>
            </button>
          </div>
        </div>

        {/* Right: Table */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col text-sm border-t border-white/10">
            <div className="flex justify-between py-5 border-b border-white/10">
              <span className="text-zinc-500 font-medium">Industry</span>
              <div className="flex gap-4 font-bold">
                <span>{project.industry}</span>
                <span>{project.subIndustry}</span>
              </div>
            </div>
            <div className="flex justify-between py-5 border-b border-white/10">
              <span className="text-zinc-500 font-medium">Deliverables</span>
              <div className="flex flex-wrap justify-end gap-x-4 gap-y-1 font-bold">
                {project.deliverables.map((d, i) => (
                  <span key={i}>{d.replace('-', ' ')}</span>
                ))}
              </div>
            </div>
            {'status' in project && project.status ? (
              <div className="flex justify-between py-5 border-b border-white/10">
                <span className="text-zinc-500 font-medium">Status</span>
                <span className="font-bold">{project.status}</span>
              </div>
            ) : (
              'completed' in project &&
              project.completed && (
                <div className="flex justify-between py-5 border-b border-white/10">
                  <span className="text-zinc-500 font-medium">Completed</span>
                  <span className="font-bold">{project.completed}</span>
                </div>
              )
            )}
            {'fundingStage' in project && project.fundingStage ? (
              <div className="flex justify-between py-5 border-b border-white/10">
                <span className="text-zinc-500 font-medium">Funding Stage</span>
                <span className="font-bold flex items-center gap-1">
                  {project.fundingStage}
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </span>
              </div>
            ) : null}
            <div className="flex justify-between py-5 border-b border-white/10">
              <span className="text-zinc-500 font-medium">Backed by</span>
              <span className="font-bold flex items-center gap-2">
                {project.backedByLogo === 'Y' ? (
                  <span className="bg-white text-black px-1.5 py-0.5 rounded-sm text-[10px] font-black leading-none">Y</span>
                ) : project.backedByLogo === 'alóz' ? (
                  <span className="text-lg font-serif font-black tracking-tighter">alóz</span>
                ) : (
                  <span className="text-sm font-bold tracking-widest">{project.backedByLogo}</span>
                )}
                {project.backedByLogo === 'Y' ? 'Combinator' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-8 py-32 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <p className="text-left text-xl md:text-2xl font-serif italic leading-[1.55] md:leading-[1.6] max-w-2xl text-zinc-100 tracking-[-0.01em]">
            {project.about}
          </p>
        </div>
        <div className="w-full lg:w-1/2">
          <img 
            src={project.images[0]} 
            alt={`${project.title} detail`} 
            className="w-full rounded-3xl shadow-2xl" 
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Showcase Image */}
      {project.images[1] && (
        <div className="w-full px-4 md:px-8 pb-32">
          <div className="max-w-[1400px] mx-auto">
            <img 
              src={project.images[1]} 
              alt={`${project.title} showcase`} 
              className="w-full rounded-[2rem] shadow-2xl" 
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="w-full border-t border-white/10 py-20 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-lg font-serif italic text-zinc-400">
          <Link to={`/project/${project.prev}`} className="hover:text-white transition-colors flex items-center gap-4">
            <span className="not-italic text-sm font-sans opacity-50">Prev</span>
            {projectsData[project.prev as keyof typeof projectsData].title}
          </Link>
          <Link to="/#work" className="hover:text-white transition-colors not-italic font-sans font-medium text-sm uppercase tracking-widest">
            All Projects
          </Link>
          <Link to={`/project/${project.next}`} className="hover:text-white transition-colors flex items-center gap-4">
            {projectsData[project.next as keyof typeof projectsData].title}
            <span className="not-italic text-sm font-sans opacity-50">Next</span>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
