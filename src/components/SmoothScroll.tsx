import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{
        /**
         * Liquid smooth scroll: lower lerp = more inertia / less “steppy” wheel quantization.
         * Slightly lower wheel/touch multipliers = smaller deltas per event → smoother blending.
         * (Below ~0.03 lerp can feel laggy on fast flicks; ~0.04–0.06 is a common “silk” band.)
         */
        lerp: 0.045,
        smoothWheel: true,
        wheelMultiplier: 0.78,
        touchMultiplier: 0.82,
        syncTouch: false,
        overscroll: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
