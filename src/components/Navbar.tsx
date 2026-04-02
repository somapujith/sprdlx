import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useLocation } from 'react-router-dom';
import { Sunrise, Sun, Moon } from 'lucide-react';
import VTLink from './VTLink';
import SprdlxLogoMark from './SprdlxLogoMark';
import { getNavSurface, setNavSurface, subscribeNavSurface } from '../navSurface';
import { useDesignTheme } from '../design/theme-context';
import { DesignThemeId } from '../design/themes';

type DayPhase = 'morning' | 'afternoon' | 'night';

const HYDERABAD_TIMEZONE = 'Asia/Kolkata';

const DAY_THEME_ORDER: DesignThemeId[] = ['editorial', 'atelier', 'analog'];

const THEME_ICONS: Record<DesignThemeId, React.FC<{ className?: string }>> = {
  editorial: Sunrise,
  atelier: Sun,
  analog: Moon,
};

const THEME_LABELS: Record<DesignThemeId, string> = {
  editorial: 'Morning',
  atelier: 'Afternoon',
  analog: 'Night',
};

const PHASE_ICONS: Record<DayPhase, React.FC<{ className?: string }>> = {
  morning: Sunrise,
  afternoon: Sun,
  night: Moon,
};

const PHASE_THEME: Record<DayPhase, DesignThemeId> = {
  morning: 'editorial',
  afternoon: 'atelier',
  night: 'analog',
};

const PHASE_LABELS: Record<DayPhase, string> = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  night: 'Night',
};

function getHyderabadHour(now: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: HYDERABAD_TIMEZONE,
    hour: 'numeric',
    hour12: false,
  }).formatToParts(now);

  const hourPart = parts.find((part) => part.type === 'hour')?.value;
  const hour = hourPart ? Number(hourPart) : 0;
  return Number.isFinite(hour) ? hour : 0;
}

function resolveDayPhaseFromHour(hour: number): DayPhase {
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  return 'night';
}

export default function Navbar() {
  const { pathname } = useLocation();
  const surface = useSyncExternalStore(subscribeNavSurface, getNavSurface, getNavSurface);
  const { themeId, setThemeId } = useDesignTheme();
  const [hyderabadPhase, setHyderabadPhase] = useState<DayPhase>(() => resolveDayPhaseFromHour(getHyderabadHour()));
  const [manualOverride, setManualOverride] = useState(false);
  const lastPhaseRef = useRef<DayPhase>(hyderabadPhase);
  const ActiveThemeIcon = THEME_ICONS[themeId];
  const currentThemeLabel = THEME_LABELS[themeId];
  const currentThemeIndex = DAY_THEME_ORDER.indexOf(themeId);
  const nextThemeId = currentThemeIndex === -1 ? DAY_THEME_ORDER[0] : DAY_THEME_ORDER[(currentThemeIndex + 1) % DAY_THEME_ORDER.length];
  const isLight = surface === 'light';

  useLayoutEffect(() => {
    if (pathname !== '/') setNavSurface('dark');
  }, [pathname]);

  const syncThemeToHyderabadTime = useCallback(() => {
    if (pathname === '/portfolio') return;

    const nextPhase = resolveDayPhaseFromHour(getHyderabadHour());
    const nextThemeId = PHASE_THEME[nextPhase];
    const phaseChanged = nextPhase !== lastPhaseRef.current;

    setHyderabadPhase(nextPhase);

    if (phaseChanged) {
      lastPhaseRef.current = nextPhase;
      setManualOverride(false);
      if (themeId !== nextThemeId) {
        setThemeId(nextThemeId);
      }
      return;
    }

    if (!manualOverride && themeId !== nextThemeId) {
      setThemeId(nextThemeId);
    }
  }, [manualOverride, pathname, setThemeId, themeId]);

  useEffect(() => {
    syncThemeToHyderabadTime();
    const timerId = window.setInterval(syncThemeToHyderabadTime, 60_000);
    return () => window.clearInterval(timerId);
  }, [syncThemeToHyderabadTime]);

  const linkClass = isLight
    ? 'text-[color:var(--theme-nav-light)] hover:opacity-70'
    : 'text-[color:var(--theme-nav-dark)] hover:opacity-80';
  const contactClass = isLight
    ? 'text-[color:var(--theme-nav-light)]'
    : 'text-[color:var(--theme-nav-dark)]';
  const iconBorderClass = isLight
    ? 'border-[color:var(--theme-nav-light-border)]'
    : 'border-[color:var(--theme-nav-dark-border)]';

  const cycleTheme = () => {
    setManualOverride(true);
    setThemeId(nextThemeId);
  };

  return (
    <nav
      className="theme-nav nav-entrance fixed left-0 right-0 top-0 z-50 flex items-center justify-between gap-2 px-3 pt-[max(1rem,env(safe-area-inset-top))] pb-4 sm:gap-3 sm:px-6 sm:pb-5 md:px-8 transition-colors duration-300"
    >
      <VTLink
        to="/"
        data-cursor="view"
        aria-label="SPRDLX — Home"
        className="block min-w-0 shrink text-[color:var(--theme-accent)] transition-opacity hover:opacity-90"
      >
        <SprdlxLogoMark className="h-7 w-auto sm:h-8 md:h-9" />
      </VTLink>

      <div className="flex max-w-[min(100%,calc(100vw-7.5rem))] shrink items-center justify-end gap-1.5 text-[11px] font-medium sm:max-w-none sm:gap-4 sm:text-sm md:gap-8">
        {pathname !== '/portfolio' && (
          <div className="flex shrink-0 items-center rounded-full border border-[color:var(--theme-border-soft)] bg-[color:var(--theme-chip-bg)] p-0.5 sm:p-1">
            <button
              type="button"
              className="theme-chip theme-chip--active px-2 py-1 sm:px-[0.6rem]"
              onClick={cycleTheme}
              aria-label={`Switch theme manually. Current: ${currentThemeLabel}. Hyderabad time: ${PHASE_LABELS[hyderabadPhase]}.`}
              title={`Current: ${currentThemeLabel} • Hyderabad auto: ${PHASE_LABELS[hyderabadPhase]} • Click to switch`}
            >
              <ActiveThemeIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
            </button>
          </div>
        )}

        <VTLink
          to="/portfolio"
          data-cursor="view"
          aria-label="Portfolio"
          className={`shrink-0 whitespace-nowrap italic transition-colors duration-300 ${linkClass}`}
        >
          <span aria-hidden className="sm:hidden">
            Work
          </span>
          <span aria-hidden className="hidden sm:inline">
            Portfolio
          </span>
        </VTLink>
        <VTLink
          to="/contact"
          data-cursor="accent"
          aria-label="Contact"
          className={`group flex shrink-0 items-center gap-1.5 transition-colors duration-300 sm:gap-2 ${contactClass}`}
        >
          <div
            className={`relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-sm border transition-colors duration-300 sm:h-6 sm:w-6 ${iconBorderClass}`}
          >
            <svg
              className="transition-transform duration-300 ease-in-out group-hover:translate-x-6"
              width="11"
              height="11"
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
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
          <span className="hidden font-serif italic sm:inline sm:text-lg" aria-hidden>
            Contact
          </span>
        </VTLink>
      </div>
    </nav>
  );
}





