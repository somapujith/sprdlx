import { useId } from 'react';

/** Subtle animated “synapse” lines — inherits `color` from parent; slow drift for depth */
export default function SynapticThreadsBg() {
  const uid = useId().replace(/:/g, '');
  const gradId = `syn-stroke-${uid}`;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 text-inherit opacity-[0.11] transition-opacity duration-300"
      aria-hidden
    >
      <div
        className="absolute inset-[-8%] h-[116%] w-[116%] animate-[syn-drift_42s_ease-in-out_infinite] motion-reduce:animate-none"
        style={{ willChange: 'transform' }}
      >
        <svg className="h-full w-full text-current" preserveAspectRatio="none" viewBox="0 0 400 400">
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.92" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.14" />
            </linearGradient>
          </defs>
          {Array.from({ length: 18 }).map((_, i) => {
            const x1 = (i * 37) % 400;
            const y1 = (i * 53) % 400;
            const x2 = (x1 + 80 + (i % 5) * 20) % 400;
            const y2 = (y1 + 120) % 400;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={`url(#${gradId})`}
                strokeWidth="0.32"
                className="animate-pulse"
                style={{ animationDuration: `${5 + (i % 5)}s`, animationDelay: `${i * 0.12}s` }}
              />
            );
          })}
        </svg>
      </div>
      <style>{`
        @keyframes syn-drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(1.2%, -0.8%) rotate(0.35deg); }
          66% { transform: translate(-0.9%, 1.1%) rotate(-0.25deg); }
        }
      `}</style>
    </div>
  );
}
