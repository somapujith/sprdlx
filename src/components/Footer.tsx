import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col relative z-10">
      {/* Build with us */}
      <div className="w-full py-40 flex flex-col items-center justify-center relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-black to-black blur-3xl"></div>
        <h2 className="text-5xl md:text-7xl font-serif mb-12 relative z-10">Build with us.</h2>
        <Link to="/contact" className="group flex items-center gap-3 text-lg font-serif italic transition-opacity relative z-10">
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

      {/* Footer Logo & Links */}
      <div className="w-full bg-gradient-to-b from-black via-[#3a0010] to-[#5c0016] text-[#e8203d] pt-20 pb-12 flex flex-col relative overflow-hidden">
        <div className="w-full max-w-[100rem] mx-auto px-8 relative z-10">
          <h1 className="text-[26vw] font-black tracking-tighter leading-none italic -mb-[1vw] select-none -ml-[0.15em]">SPRDLX</h1>
        </div>
        
        <div className="w-full max-w-[100rem] mx-auto px-8 relative z-10 mt-16">
          <div className="border-t border-[#e8203d]/30 pt-8 flex flex-col md:flex-row justify-between gap-8 text-sm text-[#e8203d]/70 mb-16">
            <div className="flex flex-col gap-2">
              <a href="mailto:hello@sprdlx.co" className="hover:text-[#e8203d] transition-colors">hello@sprdlx.co</a>
              <a href="#" className="hover:text-[#e8203d] transition-colors">Twitter / X</a>
              <a href="#" className="hover:text-[#e8203d] transition-colors">LinkedIn</a>
            </div>
            <div className="flex flex-col gap-2">
              <a href="#" className="hover:text-[#e8203d] transition-colors">Radio SPRDLX</a>
              <a href="#" className="hover:text-[#e8203d] transition-colors">Framer Experts</a>
              <a href="#" className="hover:text-[#e8203d] transition-colors">Terms</a>
            </div>
            <div className="flex flex-col gap-2 text-left md:text-right">
              <span>Strandgade 26, Copenhagen 1401</span>
              <span>56 Parma Cres, London SW11 1LU</span>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-4 hover:text-[#e8203d] transition-colors flex items-center gap-2 md:justify-end"
              >
                Back to top ↑
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-[10px] text-[#e8203d]/50">
            <p>Crafted between London and Copenhagen. Operating globally.</p>
            <p>© 2026 SPRDLX®.</p>
            <p>"SPRDLX" is a registered trade mark of LSD Design Ltd (Company No. 14410233), registered in England and Wales.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
