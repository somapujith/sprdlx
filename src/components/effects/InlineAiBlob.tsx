/** Inline “living” AI pill — CSS-only; `tone` matches scroll-driven page luminance */
export default function InlineAiBlob({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const isLight = tone === 'light';
  return (
    <span
      className={`relative inline-flex h-10 w-20 md:h-14 md:w-28 items-center justify-center rounded-full align-middle overflow-hidden ${
        isLight ? 'ring-1 ring-neutral-900/12' : 'ring-1 ring-white/15'
      }`}
    >
      <span
        className="absolute inset-0 opacity-90"
        style={{
          background: isLight
            ? 'conic-gradient(from 180deg at 50% 50%, #e4e4e7 0deg, #fafafa 120deg, #a1a1aa 240deg, #d4d4d8 360deg)'
            : 'conic-gradient(from 180deg at 50% 50%, #27272a 0deg, #fafafa 120deg, #52525b 240deg, #18181b 360deg)',
          animation: 'spin 8s linear infinite',
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
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </span>
  );
}
