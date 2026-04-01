import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{
        /** Lower lerp = smoother glide (less snappy catch-up). `duration` is ignored when lerp is set. */
        lerp: 0.075,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        /** Smoother trackpad / touch inertia on supported devices */
        syncTouch: true,
        syncTouchLerp: 0.08,
      }}
    >
      {children}
    </ReactLenis>
  );
}
