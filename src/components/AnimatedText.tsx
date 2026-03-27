import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AnimatedWord = ({ children, className = "" }: { children: React.ReactNode, className?: string, key?: React.Key }) => (
  <span className={`inline-block overflow-hidden mr-[0.25em] pb-2 -mb-2 align-middle ${className}`}>
    <span className="reveal-inner inline-block translate-y-[120%] rotate-[5deg] origin-top-left opacity-0">
      {children}
    </span>
  </span>
);

export const AnimatedWords = ({ text }: { text: string }) => {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <AnimatedWord key={i}>{word}</AnimatedWord>
      ))}
    </>
  );
};

interface AnimatedTextProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}

export default function AnimatedText({ text, children, className = "", delay = 0, as: Component = "div" }: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll('.reveal-inner');
    
    gsap.to(elements, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%",
      },
      y: 0,
      rotation: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.02,
      ease: 'power4.out',
      delay: delay
    });
  }, [delay]);

  return (
    <Component ref={containerRef} className={className}>
      {text ? <AnimatedWords text={text} /> : children}
    </Component>
  );
}
