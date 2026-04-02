import React from 'react';
import { motion } from 'motion/react';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <main className="theme-shell min-h-screen pt-24 text-[color:var(--theme-ink)]">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12 lg:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left Side: Form */}
          <div className="flex flex-col">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-7xl font-serif italic mb-20 tracking-tighter"
            >
              what's up hello
            </motion.h1>

            <form className="flex flex-col gap-12 max-w-xl">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full bg-transparent border-b border-[color:var(--theme-border)] py-4 outline-none focus:border-[color:var(--theme-accent)] transition-colors text-xl font-serif italic"
                />
              </div>
              
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full bg-transparent border-b border-[color:var(--theme-border)] py-4 outline-none focus:border-[color:var(--theme-accent)] transition-colors text-xl font-serif italic"
                />
              </div>

              <div className="relative group flex items-center">
                <input 
                  type="text" 
                  placeholder="Tell us about your project..." 
                  className="w-full bg-transparent border-b border-[color:var(--theme-border)] py-4 outline-none focus:border-[color:var(--theme-accent)] transition-colors text-xl font-serif italic pr-10"
                />
                <span className="absolute right-0 bottom-5 text-[color:var(--theme-muted)]">
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

                <div className="flex gap-12 text-sm font-medium text-[color:var(--theme-muted)] uppercase tracking-widest mt-4">
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
            className="relative h-[70vh] lg:h-[85vh] rounded-3xl overflow-hidden border border-[color:var(--theme-border-soft)]"
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
            
            <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row justify-between gap-8 text-[color:var(--theme-ink)] z-10">
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
