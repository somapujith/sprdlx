import React from 'react';
import { Link } from 'react-router-dom';
import TextCursor from './TextCursor';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col relative z-10">
      {/* Build with us */}
      <div className="w-full py-24 md:py-32 lg:py-40 flex flex-col items-center justify-center relative overflow-hidden bg-black text-white">
        <div
          className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-black to-black blur-3xl pointer-events-none"
          aria-hidden
        />
        <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden>
          <TextCursor
            text="Lets Work!"
            spacing={80}
            followMouseDirection
            randomFloat
            exitDuration={0.3}
            removalInterval={20}
            maxPoints={10}
          />
        </div>
        <h2 className="text-5xl md:text-7xl font-serif mb-12 relative z-10">Build with us.</h2>
        <Link to="/contact" className="group flex items-center gap-3 text-lg font-serif italic transition-opacity relative z-10 pointer-events-auto">
          <span className="relative flex items-center justify-center w-10 h-10 border border-white/30 rounded-sm overflow-hidden">
            <svg className="transition-transform duration-300 ease-in-out group-hover:translate-x-8" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            <svg className="absolute -translate-x-8 transition-transform duration-300 ease-in-out group-hover:translate-x-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
          Let's have a chat
        </Link>
      </div>

      {/* Wordmark: full-bleed row; text-right so the right edge (and X) pins to the viewport — wide 26vw type overflows left, not off-screen right */}
      <div className="w-full bg-black text-[#ccff00] pt-12 pb-8 md:pt-14 md:pb-10 flex flex-col relative overflow-x-visible">
        <div className="w-full relative z-10 px-0">
          <h1 className="whitespace-nowrap text-[26vw] font-sans font-black tracking-tighter leading-none italic -mb-[1vw] select-none text-right text-[#ccff00] pr-4 sm:pr-6 lg:pr-8 -translate-x-[50px]">
            SPRDLX
          </h1>
        </div>

        <div className="w-full max-w-7xl mx-auto px-8 lg:px-12 relative z-10 mt-6 md:mt-8">
          <div className="border-t border-[#ccff00]/30 pt-5 flex flex-col md:flex-row md:items-start justify-between gap-6 text-sm text-[#ccff00]/70">
            <div className="flex flex-col gap-1.5">
              <a href="mailto:hello@sprdlx.co" className="hover:text-[#ccff00] transition-colors">hello@sprdlx.co</a>
              <a href="#" className="hover:text-[#ccff00] transition-colors">Twitter / X</a>
              <a href="#" className="hover:text-[#ccff00] transition-colors">LinkedIn</a>
            </div>
            <div className="flex flex-col text-left md:text-right md:shrink-0">
              <button 
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-[#ccff00] transition-colors flex items-center gap-2 md:justify-end"
              >
                Back to top ↑
              </button>
            </div>
          </div>

          <p className="mt-4 text-[10px] leading-snug text-[#ccff00]/50">© 2026 SPRDLX®.</p>
        </div>
      </div>
    </footer>
  );
}
