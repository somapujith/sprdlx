import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS = ['section-hero', 'section-manifesto', 'portfolio-trigger', 'team'] as const;

const CHAPTERS = [
  { label: '01', title: 'Hero' },
  { label: '02', title: 'Manifesto' },
  { label: '03', title: 'Work' },
  { label: '04', title: 'Team' },
] as const;

/**
 * Sticky chapter rail — active index from ScrollTrigger (uses Lenis scrollerProxy via documentElement).
 */
export default function SectionChapters() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    SECTION_IDS.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const st = ScrollTrigger.create({
        trigger: el,
        scroller: document.documentElement,
        start: 'top 58%',
        end: 'bottom 42%',
        onToggle: (self) => {
          if (self.isActive) setActive(i);
        },
      });
      triggers.push(st);
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className="pointer-events-none fixed right-5 top-1/2 z-[39] hidden -translate-y-1/2 md:block xl:right-8"
    >
      <ol className="flex flex-col gap-3 border-l border-[color:var(--theme-border-soft)] pl-4 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-[color:var(--theme-muted)]">
        {CHAPTERS.map((ch, i) => (
          <li
            key={ch.label}
            className={
              active === i
                ? 'text-[color:var(--theme-accent)] [text-shadow:0_0_24px_var(--theme-accent-glow)]'
                : 'transition-colors duration-300'
            }
          >
            <span aria-hidden>{ch.label}</span>{' '}
            <span className="sr-only">
              {ch.title}
              {active === i ? ' (current section)' : ''}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
