import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Footer from '../components/Footer';

const ESTHETIC_LOGO_SRC = '/projects/esthetic-insights/esthetic-insights-logo.svg';
const PULP_LOGO_SRC = '/projects/pulp/logo.png';

const projectsData = {
  'anthill': {
    title: 'Anthill',
    desc: 'The AI Operating System for Venture Capital — pitch intelligence, diligence, portfolio, and LP reporting.',
    heroImg: '/projects/anthill/hero.png',
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
      '/projects/anthill/gallery-1.png',
      '/projects/anthill/gallery-2.png',
    ],
    next: 'pulp',
    prev: 'jay'
  },
  'pulp': {
    title: 'Pulp',
    desc: 'A creative storytelling platform for the next generation of writers.',
    heroImg: '/projects/pulp/hero.png',
    heroOverlay: {
      title: 'pulp',
      tagline: 'Skincare for everyone.',
    },
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
    images: ['/projects/pulp/hero.png', '/projects/pulp/cosmic-dew.png'],
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
    backedBy: 'ANTLER',
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
  const isPulp = id === 'pulp';

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
            ) : isPulp ? (
              <div className="flex max-w-[min(96vw,56rem)] flex-col items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-8 py-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-xl md:px-14 md:py-9">
                <div className="relative flex w-full flex-col items-center gap-5 text-center">
                  <div
                    className="pointer-events-none absolute left-1/2 top-0 h-36 w-36 -translate-x-1/2 -translate-y-1 rounded-full bg-fuchsia-500/45 blur-3xl md:h-44 md:w-44"
                    aria-hidden
                  />
                  <img
                    src={PULP_LOGO_SRC}
                    alt=""
                    className="relative z-10 h-16 w-16 object-contain md:h-[min(20vh,150px)] md:w-[min(20vh,150px)]"
                    decoding="async"
                    draggable={false}
                  />
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <h1 className="m-0 font-sans text-3xl font-bold lowercase tracking-tight text-white md:text-4xl">
                      {projectsData.pulp.heroOverlay.title}
                    </h1>
                    <p className="m-0 max-w-[18rem] text-[0.65rem] font-semibold uppercase leading-snug tracking-[0.22em] text-white/95 md:text-xs md:tracking-[0.24em]">
                      {projectsData.pulp.heroOverlay.tagline}
                    </p>
                  </div>
                </div>
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
              ) : isPulp ? (
                <>
                  <img
                    src={PULP_LOGO_SRC}
                    alt=""
                    width={128}
                    height={128}
                    className="h-14 w-14 shrink-0 object-contain md:h-16 md:w-16"
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
            <button
              type="button"
              className="group inline-flex cursor-pointer items-center gap-4 border-0 bg-transparent px-0 py-2 text-left transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/35"
            >
              <span className="view-work-icon inline-flex h-8 w-8 shrink-0 items-center justify-center" aria-hidden>
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="1.35"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 9V3h6M15 3h6v6M3 15v6h6M21 15v6h-6"
                  />
                  <path
                    stroke="currentColor"
                    strokeWidth="1.35"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h5M14 12l-2-2M14 12l-2 2"
                  />
                </svg>
              </span>
              <span className="view-work-chromatic font-serif text-base font-normal italic tracking-tight text-zinc-100">
                View work
              </span>
            </button>
          </div>
        </div>

        {/* Right: Table */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col text-sm border-t border-white/10">
            <div className="flex justify-between gap-8 py-5 border-b border-white/10">
              <span className="text-zinc-500 font-medium shrink-0">Industry</span>
              <div className="flex flex-wrap justify-end items-center gap-x-3 gap-y-1 font-bold text-right text-base">
                <span>{project.industry}</span>
                {project.subIndustry ? (
                  <>
                    <span className="text-white/25" aria-hidden>
                      ·
                    </span>
                    <span>{project.subIndustry}</span>
                  </>
                ) : null}
              </div>
            </div>
            <div className="flex justify-between gap-8 py-5 border-b border-white/10">
              <span className="text-zinc-500 font-medium shrink-0">Deliverables</span>
              <div className="flex flex-wrap justify-end gap-x-3 gap-y-1 font-bold text-right text-base">
                {project.deliverables.map((d, i) => (
                  <span key={i}>{d.replaceAll('-', ' ')}</span>
                ))}
              </div>
            </div>
            {'status' in project && project.status ? (
              <div className="flex justify-between gap-8 py-5 border-b border-white/10">
                <span className="text-zinc-500 font-medium shrink-0">Status</span>
                <span className="font-bold text-right text-base">{project.status}</span>
              </div>
            ) : (
              'completed' in project &&
              project.completed && (
                <div className="flex justify-between gap-8 py-5 border-b border-white/10">
                  <span className="text-zinc-500 font-medium shrink-0">Completed</span>
                  <span className="font-bold text-right text-base">{project.completed}</span>
                </div>
              )
            )}
            {'fundingStage' in project && project.fundingStage ? (
              <div className="flex justify-between gap-8 py-5 border-b border-white/10">
                <span className="text-zinc-500 font-medium shrink-0">Funding Stage</span>
                <span className="font-bold flex items-center justify-end gap-1.5 text-right text-base">
                  {project.fundingStage}
                  <span className="text-white" aria-hidden>
                    ♥
                  </span>
                </span>
              </div>
            ) : null}
            <div className="flex justify-between gap-8 py-5 border-b border-white/10">
              <span className="text-zinc-500 font-medium shrink-0">Backed by</span>
              <span className="font-bold flex items-center justify-end gap-2 text-right text-base">
                {project.backedByLogo === 'Y' ? (
                  <span className="bg-white text-black px-1.5 py-0.5 rounded-sm text-[10px] font-black leading-none">Y</span>
                ) : project.backedByLogo === 'alóz' ? (
                  <span className="text-lg font-serif font-black tracking-tighter">alóz</span>
                ) : (
                  <span className="font-bold tracking-widest">{project.backedByLogo}</span>
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
            alt={project.title === 'Pulp' ? 'Pulp skincare product lineup on blue hexagonal pedestals' : `${project.title} detail`}
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
              alt={project.title === 'Pulp' ? 'Pulp Cosmic Dew AHA BHA PHA clarifying exfoliating toner' : `${project.title} showcase`}
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
