import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{
        /**
         * Lenis defaults (~lerp 0.1, multipliers 1) match “agency” smooth scroll (Lenis + GSAP sites).
         * Avoid extremely low lerp — it reads as stutter, not extra smoothness.
         */
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
