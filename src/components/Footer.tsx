import React from 'react';
import VTLink from './VTLink';
import TextCursor from './TextCursor';
import AsciiWavesBg from './effects/AsciiWavesBg';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col relative z-10">
      {/* Build with us */}
      <div className="footer-primary relative flex min-h-[20rem] w-full flex-col items-center justify-center overflow-hidden px-5 py-20 sm:min-h-[22rem] sm:py-24 md:py-32 lg:py-40">
        <AsciiWavesBg />
        <div
          className="absolute inset-0 z-[1] opacity-25 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/15 via-black to-black blur-3xl pointer-events-none"
          aria-hidden
        />
        <div className="absolute inset-0 z-[2] pointer-events-none" aria-hidden>
          <TextCursor
            text="Lets Work!"
            spacing={150}
            followMouseDirection
            randomFloat={false}
            exitDuration={0.45}
            removalInterval={28}
            maxPoints={5}
          />
        </div>
        <h2 className="relative z-10 mb-8 max-w-[min(100%,22rem)] text-center text-[clamp(2.25rem,10vw,6rem)] font-serif leading-[1.05] sm:mb-10 sm:max-w-none sm:text-6xl md:mb-12 md:text-7xl lg:text-8xl">
          Build with us.
        </h2>
        <VTLink
          to="/contact"
          data-cursor="accent"
          className="group flex items-center gap-3 text-lg font-serif italic transition-opacity relative z-10 pointer-events-auto"
        >
          <span className="relative flex items-center justify-center w-10 h-10 border border-white/30 rounded-sm overflow-hidden">
            <svg
              className="transition-transform duration-300 ease-in-out group-hover:translate-x-8"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <svg
              className="absolute -translate-x-8 transition-transform duration-300 ease-in-out group-hover:translate-x-0"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
          Let&apos;s have a chat
        </VTLink>
      </div>

      <div className="footer-strip relative flex w-full flex-col overflow-x-visible pt-12 pb-8 md:pt-14 md:pb-10">
        <div className="relative z-10 w-full max-w-[100vw] overflow-x-hidden px-0">
          <h1 className="footer-wordmark whitespace-nowrap text-[min(26vw,9rem)] font-sans font-black tracking-tighter leading-none italic -mb-[1vw] select-none text-right pr-3 sm:text-[22vw] sm:pr-6 md:text-[26vw] lg:pr-8 -translate-x-3 sm:-translate-x-[50px]">
            SPRDLX
          </h1>
        </div>

        <div className="relative z-10 mx-auto mt-6 w-full max-w-7xl px-5 sm:px-8 md:mt-8 lg:px-12">
          <div className="border-t border-[color:var(--theme-border-soft)] pt-5 flex flex-col md:flex-row md:items-start justify-between gap-6 text-sm text-[color:var(--theme-ink-soft)]">
            <div className="flex flex-col gap-1.5">
              <a href="mailto:hello@sprdlx.co" className="hover:text-[color:var(--theme-accent)] transition-colors">
                hello@sprdlx.co
              </a>
              <a href="#" className="hover:text-[color:var(--theme-accent)] transition-colors" aria-label="Twitter (placeholder)">
                [twitter]
              </a>
              <a
                href="https://www.linkedin.com/company/super-deluxe-studios/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--theme-accent)] transition-colors"
                aria-label="SPR DLX on LinkedIn"
              >
                LinkedIn
              </a>
            </div>
            <div className="flex flex-col text-left md:text-right md:shrink-0">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-[color:var(--theme-accent)] transition-colors flex items-center gap-2 md:justify-end"
              >
                Back to top ↑
              </button>
            </div>
          </div>

          <p className="mt-4 text-[10px] leading-snug text-[color:var(--theme-muted)]">© 2026 SPRDLX®.</p>
        </div>
      </div>
    </footer>
  );
}
