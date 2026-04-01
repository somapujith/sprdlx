import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  text: string;
  className?: string;
};

/**
 * Scroll-triggered word-by-word reveal with a brief per-word glitch flicker.
 * No permanent ::before/::after duplication — the glitch is a momentary event.
 */
export default function GlitchHeadline({ text, className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLSpanElement>('.gh-word');
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0, y: 18, filter: 'blur(6px)' });

      gsap.to(words, {
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          end: 'top 40%',
          scrub: false,
          once: true,
        },
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.7,
        stagger: 0.06,
        ease: 'power3.out',
        onStart() {
          words.forEach((w, i) => {
            const delay = i * 60;
            setTimeout(() => {
              w.classList.add('gh-flicker');
              setTimeout(() => w.classList.remove('gh-flicker'), 220);
            }, delay);
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, [text]);

  const words = text.split(/\s+/);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <h2 className="font-serif leading-[1.15] tracking-tight">
        {words.map((word, i) => (
          <span key={i} className="gh-word inline-block mr-[0.28em] will-change-[transform,opacity,filter]">
            {word}
          </span>
        ))}
      </h2>
      <style>{`
        .gh-flicker {
          animation: gh-glitch 0.22s steps(2, end);
        }
        @keyframes gh-glitch {
          0%   { text-shadow: -2px 0 rgba(255,255,255,0.5), 2px 0 rgba(120,120,120,0.4); transform: translate(1px, 0); }
          25%  { text-shadow: 2px 0 rgba(255,255,255,0.4), -1px 0 rgba(80,80,80,0.3); transform: translate(-1px, 1px); }
          50%  { text-shadow: -1px 1px rgba(200,200,200,0.5), 1px -1px rgba(100,100,100,0.3); transform: translate(0, -1px); }
          75%  { text-shadow: 1px -1px rgba(255,255,255,0.3), -2px 0 rgba(90,90,90,0.4); transform: translate(1px, 0); }
          100% { text-shadow: none; transform: translate(0); }
        }
      `}</style>
    </div>
  );
}
