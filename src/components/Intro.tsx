import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DitherTorusKnot from './DitherTorusKnot';

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll('.word-reveal');
      
      if (!words) return;

      gsap.set(words, { opacity: 0.15 });

      gsap.to(words, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'center center',
          scrub: 1.25,
          invalidateOnRefresh: true,
        },
        opacity: 1,
        stagger: 0.04,
        ease: 'none',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const wrapWords = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="word-reveal inline-block mr-[0.25em]">{word}</span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="text-white py-32 px-8 min-h-screen flex items-center relative z-10 overflow-hidden"
    >
      {/* Dither Torus Knot — floating on right side behind text */}
      <div className="pointer-events-none absolute right-[-6%] top-1/2 h-[56vh] w-[52vw] max-h-[720px] max-w-[760px] -translate-y-1/2 opacity-40 md:opacity-50" aria-hidden>
        <DitherTorusKnot
          className="w-full h-full"
          color1="#ffffff"
          color2="#000000"
          pixelSize={3}
          lightDir={[1, 0.8, 0.6]}
          cameraZ={5.2}
          knotScale={0.8}
          variant="torusKnot"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <h2 ref={textRef} className="text-4xl md:text-5xl lg:text-7xl font-serif leading-[1.2] tracking-tight max-w-5xl">
          {wrapWords("We build")}
          <span className="word-reveal inline-block mx-2 align-middle">
            <span className="inline-block w-20 h-10 md:w-28 md:h-14 bg-zinc-800 rounded-full overflow-hidden">
              <img src="https://picsum.photos/seed/sprdlx-logo/200/100" alt="Logo" className="w-full h-full object-cover opacity-80" />
            </span>
          </span>
          {wrapWords("standout brands, digital experiences, and AI tools — and invest in teams building what's next. We're based in Hyderabad.")}
        </h2>
      </div>
    </section>
  );
}
