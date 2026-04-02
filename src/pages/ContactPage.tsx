import React from 'react';
import { motion } from 'motion/react';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <main className="theme-shell min-h-screen overflow-x-hidden pt-[max(5.5rem,env(safe-area-inset-top))] text-[color:var(--theme-ink)] sm:pt-24">
      <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-20">
          
          {/* Left Side: Form */}
          <div className="flex flex-col">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12 text-[clamp(2.5rem,12vw,4.5rem)] font-serif italic tracking-tighter sm:mb-16 sm:text-6xl md:mb-20 md:text-7xl"
            >
              what's up hello
            </motion.h1>

            <form className="flex max-w-xl flex-col gap-8 sm:gap-12">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full border-b border-[color:var(--theme-border)] bg-transparent py-3 text-lg font-serif italic outline-none transition-colors focus:border-[color:var(--theme-accent)] sm:py-4 sm:text-xl"
                />
              </div>
              
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full border-b border-[color:var(--theme-border)] bg-transparent py-3 text-lg font-serif italic outline-none transition-colors focus:border-[color:var(--theme-accent)] sm:py-4 sm:text-xl"
                />
              </div>

              <div className="relative group flex items-center">
                <input 
                  type="text" 
                  placeholder="Tell us about your project..." 
                  className="w-full border-b border-[color:var(--theme-border)] bg-transparent py-3 pr-10 text-lg font-serif italic outline-none transition-colors focus:border-[color:var(--theme-accent)] sm:py-4 sm:text-xl"
                />
                <span className="absolute bottom-4 right-0 text-[color:var(--theme-muted)] sm:bottom-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </div>

              <div className="mt-12 flex flex-col gap-8">
                <a href="#" className="group flex items-center gap-3 text-lg font-serif italic transition-opacity w-fit">
                  <span className="relative flex items-center justify-center w-10 h-10 border border-[color:var(--theme-border)] rounded-sm overflow-hidden">
                    <svg className="transition-transform duration-300 ease-in-out group-hover:translate-x-8" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                    <svg className="absolute -translate-x-8 transition-transform duration-300 ease-in-out group-hover:translate-x-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                  Book a call with us
                </a>

                <div className="mt-4 flex flex-wrap gap-6 text-sm font-medium uppercase tracking-widest text-[color:var(--theme-muted)] sm:gap-12">
                  <a
                    href="https://www.linkedin.com/company/super-deluxe-studios/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[color:var(--theme-ink)] transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a href="#" className="hover:text-[color:var(--theme-ink)] transition-colors">X</a>
                </div>
              </div>
            </form>
          </div>

          {/* Right Side: Placeholder image + Addresses */}
          <div
            className="relative min-h-[min(22rem,50vh)] h-[42vh] overflow-hidden rounded-2xl border border-[color:var(--theme-border-soft)] sm:min-h-0 sm:h-[56vh] sm:rounded-3xl lg:h-[85vh]"
            style={{ backgroundColor: 'color-mix(in srgb, var(--theme-canvas-strong) 40%, transparent)' }}
          >
            <img
              src="https://picsum.photos/seed/daisies-field/1200/1600"
              alt="Daisies field"
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              draggable={false}
            />
            
            <div className="absolute bottom-6 left-4 right-4 z-10 flex flex-col gap-6 text-[color:var(--theme-ink)] sm:bottom-10 sm:left-8 sm:right-8 md:bottom-12 md:left-12 md:right-12 md:flex-row md:justify-between md:gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold tracking-tight">Strandgade 26</span>
                <span className="text-sm font-bold tracking-tight">København K 1401</span>
                <span className="text-sm font-bold tracking-tight opacity-70">Denmark</span>
              </div>
              
              <div className="flex flex-col gap-1 md:text-right">
                <span className="text-sm font-bold tracking-tight">56 Parma Cres</span>
                <span className="text-sm font-bold tracking-tight">London SW11 1LU</span>
                <span className="text-sm font-bold tracking-tight opacity-70">United Kingdom</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}
