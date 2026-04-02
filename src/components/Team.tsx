import React, { useCallback, useRef, useState } from 'react';
import VTLink from './VTLink';
import GlitchHeadline from './effects/GlitchHeadline';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

type TeamMember = {
  name: string;
  role: string;
  accent: string;
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    name: 'Pujith Soma',
    role: 'Creative Frontend Developer',
    accent: '#a78bfa',
    image: '/team/pujith-soma.png',
  },
  {
    name: 'Ajith Prudhvi',
    role: 'Frontend Designer',
    accent: '#67e8f9',
    image: '/team/ajith-prudhvi.jpeg',
  },
  {
    name: 'Nithin Singarapu',
    role: 'AI Engineer',
    accent: '#34d399',
    image: '/team/nithin-singarapu.png',
  },
  {
    name: 'Rakesh Thakkuri',
    role: 'AI Research Engineer',
    accent: '#fbbf24',
    image: '/team/rakesh-thakkuri.jpg',
  },
];

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const TILT_MAX = 11;

function TeamMemberCard({ member, reducedMotion }: { member: TeamMember; reducedMotion: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isActive, setIsActive] = useState(false);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (reducedMotion) return;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ rx: y * -TILT_MAX, ry: x * TILT_MAX });
      setIsActive(true);
    },
    [reducedMotion]
  );

  const endTilt = useCallback(() => {
    setIsActive(false);
    setTilt({ rx: 0, ry: 0 });
  }, []);

  const transform = reducedMotion
    ? undefined
    : `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`;

  return (
    <motion.article variants={cardVariants} className="relative min-w-0">
      {/* Ambient accent glow (React Bits / 21st-style depth) */}
      <div
        className="pointer-events-none absolute -inset-3 rounded-[1.35rem] opacity-0 blur-2xl transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${member.accent}35 0%, transparent 70%)`,
        }}
        aria-hidden
      />

      <div
        ref={wrapRef}
        className={cn(
          'team-card group/card relative overflow-hidden rounded-2xl border transition-shadow duration-500',
          'shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)]',
          'hover:shadow-[0_28px_60px_-18px_rgba(0,0,0,0.55)]'
        )}
        onPointerMove={handlePointerMove}
        onPointerLeave={endTilt}
        onPointerCancel={endTilt}
        style={{
          transform,
          transition: isActive
            ? 'transform 0.08s ease-out, box-shadow 0.5s ease'
            : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
        }}
      >
        {/* Hover ring — accent bleed */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] rounded-2xl opacity-0 ring-1 ring-inset transition-opacity duration-400 group-hover/card:opacity-100"
          style={{
            boxShadow: `inset 0 0 0 1px ${member.accent}40, 0 0 32px -8px ${member.accent}30`,
          }}
          aria-hidden
        />

        <div className="relative aspect-[3/4] isolate">
          {/* Photo: no repeating CSS mesh (causes scanline/moiré on portraits). */}
          <div className="absolute inset-0 overflow-hidden rounded-t-2xl bg-[color:var(--theme-canvas-strong)]">
            <img
              src={member.image}
              alt={`${member.name} portrait`}
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out [transform:translateZ(0)] group-hover/card:scale-[1.06]"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>

          {/* Soft vignette + accent wash — avoid repeating-linear-gradient (moiré / fake “scanlines”). */}
          <div
            className="pointer-events-none absolute inset-0 z-[1] rounded-t-2xl"
            style={{
              background: `
                linear-gradient(to top, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.04) 48%, transparent 72%),
                radial-gradient(ellipse 95% 65% at 32% 12%, ${member.accent}14 0%, transparent 58%)
              `,
            }}
            aria-hidden
          />

          <div className="absolute inset-0 z-[3] flex flex-col justify-end rounded-t-2xl p-5 opacity-0 transition-opacity duration-400 group-hover/card:opacity-100">
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
              aria-hidden
            />
            <h3 className="relative text-lg font-serif text-[color:var(--theme-ink)] leading-tight drop-shadow-sm">
              {member.name}
            </h3>
            <p
              className="relative mt-1.5 text-[11px] uppercase tracking-[0.2em]"
              style={{ color: member.accent }}
            >
              {member.role}
            </p>
          </div>
        </div>

        <div
          className={cn(
            'team-card-meta relative z-[4] border-t border-[color:var(--theme-border-soft)]',
            'px-4 py-3.5 backdrop-blur-md',
            'supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--theme-canvas-strong)_82%,transparent)]'
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-[color:var(--theme-ink-soft)] tracking-tight truncate">
              {member.name}
            </span>
            <span
              className="h-2 w-2 shrink-0 rounded-full shadow-[0_0_12px_currentColor]"
              style={{ backgroundColor: member.accent, color: member.accent }}
              aria-hidden
            />
          </div>
          <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[color:var(--theme-muted)] truncate">
            {member.role}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Team() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="team"
      className="team-section relative z-10 overflow-hidden px-5 py-24 sm:px-8 sm:py-32 md:py-40"
    >
      {/* Grid + accent wash: mask fades in so we don’t get a hard seam under Services (matches scroll-driven main bg). */}
      <div
        className="pointer-events-none absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_100%)]"
        aria-hidden
      >
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(var(--theme-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--theme-grid-line) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,color-mix(in_srgb,var(--theme-accent)_12%,transparent),transparent_55%)]" />
      </div>

      {/* Seam bridge: soft blend with the section above (same idea as Services bottom fade). */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 sm:h-48 bg-gradient-to-b from-[var(--dynamic-bg)] via-[color-mix(in_srgb,var(--dynamic-bg)_55%,transparent)] to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 text-center text-[0.65rem] font-medium uppercase tracking-[0.28em] text-[color:var(--theme-muted)] sm:mb-6 sm:text-xs"
        >
          The team
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-8 max-w-4xl text-center sm:mb-10 md:mb-12"
        >
          <GlitchHeadline
            text="From engineers, to designers — our team knows how to ship AI products."
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.15rem] lg:leading-[1.12]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05, duration: 0.5 }}
          className="mb-16 flex justify-center sm:mb-20 md:mb-32"
        >
          <VTLink
            to="/contact"
            data-cursor="accent"
            className="group inline-flex items-center gap-3 rounded-full border border-[color:var(--theme-border-soft)] px-5 py-2.5 text-base font-serif italic text-[color:var(--theme-ink-soft)] transition-colors hover:border-[color:var(--theme-border)] hover:text-[color:var(--theme-ink)]"
          >
            <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-[color:var(--theme-border)]">
              <svg
                className="transition-transform duration-300 ease-in-out group-hover:translate-x-6"
                width="12"
                height="12"
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
                className="absolute -translate-x-6 transition-transform duration-300 ease-in-out group-hover:translate-x-0"
                width="12"
                height="12"
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
            Book a call with our team
          </VTLink>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-9 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-12% 0px' }}
          variants={listVariants}
        >
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} reducedMotion={reducedMotion} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
