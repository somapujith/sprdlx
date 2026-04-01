/** Inline “living” AI pill — CSS-only; `tone` matches scroll-driven page luminance */
export default function InlineAiBlob({
  tone = 'dark',
  interactive = true,
}: {
  tone?: 'dark' | 'light';
  interactive?: boolean;
}) {
  const isLight = tone === 'light';
  return (
    <span
      title="AI Studio — products & tooling"
      className={`relative inline-flex h-10 w-20 md:h-14 md:w-28 items-center justify-center rounded-full align-middle overflow-hidden ${
        isLight ? 'ring-1 ring-neutral-900/12' : 'ring-1 ring-white/15'
      } ${interactive ? 'transition-transform duration-300 ease-out hover:scale-[1.06] active:scale-[0.98] motion-reduce:hover:scale-100' : ''}`}
    >
      <span
        className={`absolute inset-0 opacity-90 ${interactive ? 'ai-blob-conic' : ''}`}
        style={{
          background: isLight
            ? 'conic-gradient(from 180deg at 50% 50%, #e4e4e7 0deg, #fafafa 120deg, #a1a1aa 240deg, #d4d4d8 360deg)'
            : 'conic-gradient(from 180deg at 50% 50%, #27272a 0deg, #fafafa 120deg, #52525b 240deg, #18181b 360deg)',
        }}
      />
      <span
        className="absolute inset-[2px] rounded-full opacity-95"
        style={{
          background: isLight
            ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), transparent 55%), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.06), #f4f4f5)'
            : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), transparent 55%), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.45), #18181b)',
        }}
      />
      <span
        className={`relative z-10 text-[10px] font-mono font-medium tracking-tighter ${
          isLight ? 'text-neutral-700' : 'text-white/80'
        }`}
      >
        AI
      </span>
    </span>
  );
}
