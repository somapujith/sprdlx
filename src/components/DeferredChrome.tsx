import { type ReactNode, useEffect, useState } from 'react';

/**
 * Mounts children after the browser is idle (or a short timeout fallback).
 * Keeps film grain + cursor off the critical path for LCP / TBT.
 */
export default function DeferredChrome({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const reveal = () => {
      if (!cancelled) setShow(true);
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = window.requestIdleCallback(reveal, { timeout: 450 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const t = window.setTimeout(reveal, 200);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  if (!show) return null;
  return <>{children}</>;
}
