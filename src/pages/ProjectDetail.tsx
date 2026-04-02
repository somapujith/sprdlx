import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import VTLink from '../components/VTLink';

const ESTHETIC_LOGO_SRC = '/projects/esthetic-insights/esthetic-insights-logo.svg';
const PULP_LOGO_SRC = '/projects/pulp/logo.png';
/** Full Anthill Ventures wordmark (SVG). */
const ANTHILL_VENTURES_LOGO = '/projects/anthill/Anthill%20Ventures%20Logo.svg';

const projectsData = {
  anthill: {
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
    images: ['/projects/anthill/gallery-1.png', '/projects/anthill/gallery-2.png'],
    next: 'pulp',
    prev: 'jay',
  },
  pulp: {
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
    about:
      'Pulp is a creative storytelling platform designed to empower the next generation of writers with collaborative tools and AI-enhanced narrative structures.',
    images: ['/projects/pulp/hero.png', '/projects/pulp/cosmic-dew.png'],
    next: 'esthetic-insights',
    prev: 'anthill',
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
    images: ['/projects/esthetic-insights/gallery-1.png', '/projects/esthetic-insights/gallery-2.png'],
    next: 'volery',
    prev: 'pulp',
  },
  volery: {
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
    about:
      'Volery is a collaborative workspace designed specifically for high-performance distributed teams, focusing on deep work and asynchronous communication.',
    images: ['https://picsum.photos/seed/volery-1/1200/800', 'https://picsum.photos/seed/volery-2/1920/1080'],
    next: 'jay',
    prev: 'esthetic-insights',
  },
  jay: {
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
    about:
      'Jay is your personal AI assistant that integrates across all your devices to provide seamless productivity, focus management, and intelligent task automation.',
    images: ['https://picsum.photos/seed/jay-1/1200/800', 'https://picsum.photos/seed/jay-2/1920/1080'],
    next: 'anthill',
    prev: 'volery',
  },
};

function BlurUpImg({ className = '', ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      {...rest}
      onLoad={(e) => {
        setLoaded(true);
        rest.onLoad?.(e);
      }}
      className={`${className} transition-[filter,opacity,transform] duration-700 ease-out ${
        loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
      }`}
    />
  );
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectsData[id as keyof typeof projectsData] : null;
  const isEsthetic = id === 'esthetic-insights';
  const isPulp = id === 'pulp';
  const isAnthill = id === 'anthill';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center text-white">Project not found</div>;
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white selection:bg-white selection:text-black">
      {/* Hero */}
      <section
        className="w-full px-5 pb-8 pt-[max(5.5rem,env(safe-area-inset-top))] sm:px-6 sm:pb-8 md:px-8"
        aria-labelledby="project-hero-title"
      >
        <div className="relative h-[min(42vh,22rem)] w-full overflow-hidden rounded-2xl sm:h-[40vh] sm:rounded-[2rem] md:h-[50vh]">
          <BlurUpImg
            src={project.heroImg}
            alt={`${project.title} — hero`}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center px-3 sm:px-4">
            {isEsthetic ? (
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-6 md:px-12 md:py-8 rounded-2xl flex items-center justify-center max-w-[min(96vw,36rem)] text-center">
                <h1
                  id="project-hero-title"
                  className="m-0 font-sans font-bold uppercase tracking-[0.14em] text-white text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight"
                >
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
                    <h1
                      id="project-hero-title"
                      className="m-0 font-sans text-3xl font-bold lowercase tracking-tight text-white md:text-4xl"
                    >
                      {projectsData.pulp.heroOverlay.title}
                    </h1>
                    <p className="m-0 max-w-[18rem] text-[0.65rem] font-semibold uppercase leading-snug tracking-[0.22em] text-white/95 md:text-xs md:tracking-[0.24em]">
                      {projectsData.pulp.heroOverlay.tagline}
                    </p>
                  </div>
                </div>
              </div>
            ) : isAnthill ? (
              <div className="flex max-w-[min(96vw,40rem)] items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl md:px-12 md:py-6">
                <h1 id="project-hero-title" className="sr-only">
                  {project.title}
                </h1>
                <img
                  src={ANTHILL_VENTURES_LOGO}
                  alt=""
                  className="h-8 w-auto max-w-[min(88vw,20rem)] shrink-0 object-contain object-left brightness-0 invert md:h-10 md:max-w-[min(88vw,24rem)]"
                  width={360}
                  height={86}
                  decoding="async"
                  draggable={false}
                  aria-hidden
                />
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-10 py-5 rounded-full flex items-center gap-4">
                <h1
                  id="project-hero-title"
                  className="m-0 flex items-center gap-4 text-3xl md:text-5xl font-serif italic tracking-tight"
                >
                  {project.logoIcon && <span className="text-3xl font-serif italic">{project.logoIcon}</span>}
                  {project.title}
                </h1>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 01 — Overview */}
      <section className="border-t border-white/10" aria-labelledby="chapter-overview">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 md:px-8 md:py-28">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
            <div className="lg:w-[min(100%,18rem)] lg:shrink-0 lg:sticky lg:top-28 lg:self-start">
              <p id="chapter-overview" className="font-mono text-[0.65rem] uppercase tracking-[0.32em] text-[#ccff00]/55">
                01 — Overview
              </p>
              <p className="mt-4 text-xs font-serif italic text-zinc-500 leading-relaxed max-w-[14rem]">
                Role, scope, and delivery — the contract between idea and ship.
              </p>
            </div>

            <div className="flex flex-1 flex-col gap-16 lg:flex-row lg:gap-20">
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
                        <h2 className="text-4xl font-bold tracking-tight font-serif">{project.title}</h2>
                      </>
                    ) : isAnthill ? (
                      <>
                        <h2 className="sr-only">{project.title}</h2>
                        <img
                          src={ANTHILL_VENTURES_LOGO}
                          alt=""
                          width={360}
                          height={86}
                          className="h-10 w-auto max-w-[min(92vw,20rem)] shrink-0 object-contain object-left brightness-0 invert md:h-12 md:max-w-[min(92vw,24rem)]"
                          decoding="async"
                          draggable={false}
                          aria-hidden
                        />
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
                        <h2 className="text-4xl font-bold tracking-tight font-serif">{project.title}</h2>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center border border-white/10">
                          <span className="text-xl font-bold">{project.logoIcon || project.title[0]}</span>
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight text-white">{project.title}</h2>
                      </>
                    )}
                  </div>
                  {isAnthill ? (
                    <p className="sr-only">{project.desc}</p>
                  ) : (
                    <p className="text-zinc-400 text-lg max-w-md leading-snug font-medium">{project.desc}</p>
                  )}
                </div>

                <div className="mt-16">
                  <button
                    type="button"
                    data-cursor="view"
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

              <div className="w-full lg:w-1/2">
                <div className="flex flex-col border-t border-white/10 text-sm">
                  <div className="flex flex-col gap-1 border-b border-white/10 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                    <span className="shrink-0 font-mono text-[0.7rem] font-medium uppercase tracking-wider text-zinc-500">
                      Industry
                    </span>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-left font-bold text-base sm:justify-end sm:text-right">
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
                  <div className="flex flex-col gap-1 border-b border-white/10 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                    <span className="shrink-0 font-mono text-[0.7rem] font-medium uppercase tracking-wider text-zinc-500">
                      Deliverables
                    </span>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-left font-bold text-base sm:justify-end sm:text-right">
                      {project.deliverables.map((d, i) => (
                        <span key={i}>{d.replaceAll('-', ' ')}</span>
                      ))}
                    </div>
                  </div>
                  {'status' in project && project.status ? (
                    <div className="flex flex-col gap-1 border-b border-white/10 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                      <span className="shrink-0 font-mono text-[0.7rem] font-medium uppercase tracking-wider text-zinc-500">
                        Status
                      </span>
                      <span className="text-left font-bold text-base sm:text-right">{project.status}</span>
                    </div>
                  ) : (
                    'completed' in project &&
                    project.completed && (
                      <div className="flex flex-col gap-1 border-b border-white/10 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                        <span className="shrink-0 font-mono text-[0.7rem] font-medium uppercase tracking-wider text-zinc-500">
                          Completed
                        </span>
                        <span className="text-left font-bold text-base sm:text-right">{project.completed}</span>
                      </div>
                    )
                  )}
                  {'fundingStage' in project && project.fundingStage ? (
                    <div className="flex flex-col gap-1 border-b border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                      <span className="shrink-0 font-mono text-[0.7rem] font-medium uppercase tracking-wider text-zinc-500">
                        Funding Stage
                      </span>
                      <span className="flex items-center gap-1.5 text-left font-bold text-base sm:justify-end sm:text-right">
                        {project.fundingStage}
                        <span className="text-white" aria-hidden>
                          ♥
                        </span>
                      </span>
                    </div>
                  ) : null}
                  <div className="flex flex-col gap-1 border-b border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                    <span className="shrink-0 font-mono text-[0.7rem] font-medium uppercase tracking-wider text-zinc-500">
                      Backed by
                    </span>
                    <span className="flex flex-wrap items-center gap-2 text-left font-bold text-base sm:justify-end sm:text-right">
                      {project.backedByLogo === 'Y' ? (
                        <span className="bg-white text-black px-1.5 py-0.5 rounded-sm text-[10px] font-black leading-none">
                          Y
                        </span>
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
          </div>
        </div>
      </section>

      {/* 02 — Narrative */}
      <section className="border-t border-white/10" aria-labelledby="chapter-narrative">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-10 px-5 py-16 sm:gap-12 sm:px-6 sm:py-20 md:px-8 md:py-28 lg:flex-row lg:gap-20">
          <div className="lg:w-[min(100%,18rem)] lg:shrink-0 lg:sticky lg:top-28">
            <p id="chapter-narrative" className="font-mono text-[0.65rem] uppercase tracking-[0.32em] text-[#ccff00]/55">
              02 — Narrative
            </p>
          </div>
          <div className="flex flex-1 flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="flex w-full flex-col justify-center lg:w-1/2">
              <p className="max-w-2xl text-left text-lg font-serif italic leading-[1.55] tracking-[-0.01em] text-zinc-100 sm:text-xl md:text-2xl md:leading-[1.6]">
                {project.about}
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <BlurUpImg
                src={project.images[0]}
                alt={project.title === 'Pulp' ? 'Pulp skincare product lineup on blue hexagonal pedestals' : `${project.title} detail`}
                className="w-full rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Gallery */}
      {project.images[1] ? (
        <section className="border-t border-white/10" aria-labelledby="chapter-gallery">
          <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20 md:pb-32">
            <p id="chapter-gallery" className="font-mono text-[0.65rem] uppercase tracking-[0.32em] text-[#ccff00]/55 mb-10 md:mb-14">
              03 — Gallery
            </p>
            <BlurUpImg
              src={project.images[1]}
              alt={
                project.title === 'Pulp'
                  ? 'Pulp Cosmic Dew AHA BHA PHA clarifying exfoliating toner'
                  : `${project.title} showcase`
              }
              className="w-full rounded-[2rem] shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </section>
      ) : null}

      {/* Prev / Next */}
      <div className="w-full border-t border-white/10 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 text-base font-serif italic text-zinc-400 sm:flex-row sm:items-center sm:justify-between sm:text-lg">
          <VTLink
            to={`/project/${project.prev}`}
            data-cursor="view"
            className="hover:text-white transition-colors flex items-center gap-4 order-2 sm:order-1"
          >
            <span className="not-italic text-sm font-sans opacity-50">Prev</span>
            {projectsData[project.prev as keyof typeof projectsData].title}
          </VTLink>
          <VTLink
            to="/#work"
            data-cursor="view"
            className="hover:text-white transition-colors not-italic font-sans font-medium text-sm uppercase tracking-widest order-1 sm:order-2"
          >
            All Projects
          </VTLink>
          <VTLink
            to={`/project/${project.next}`}
            data-cursor="view"
            className="hover:text-white transition-colors flex items-center gap-4 justify-end order-3"
          >
            {projectsData[project.next as keyof typeof projectsData].title}
            <span className="not-italic text-sm font-sans opacity-50">Next</span>
          </VTLink>
        </div>
      </div>

      <Footer />
    </main>
  );
}
