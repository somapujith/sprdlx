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
      className="theme-nav nav-entrance fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-5 transition-colors duration-300"
    >
      <VTLink
        to="/"
        data-cursor="view"
        aria-label="SPRDLX — Home"
        className="block shrink-0 text-[color:var(--theme-accent)] transition-opacity hover:opacity-90"
      >
        <SprdlxLogoMark className="h-8 w-auto md:h-9" />
      </VTLink>

      <div className="flex items-center gap-4 md:gap-8 text-sm font-medium">
        {pathname !== '/portfolio' && (
          <div className="flex items-center rounded-full border border-[color:var(--theme-border-soft)] bg-[color:var(--theme-chip-bg)] p-1">
            <button
              type="button"
              className="theme-chip theme-chip--active"
              style={{ paddingLeft: '0.6rem', paddingRight: '0.6rem' }}
              onClick={cycleTheme}
              aria-label={`Switch theme manually. Current: ${currentThemeLabel}. Hyderabad time: ${PHASE_LABELS[hyderabadPhase]}.`}
              title={`Current: ${currentThemeLabel} • Hyderabad auto: ${PHASE_LABELS[hyderabadPhase]} • Click to switch`}
            >
              <ActiveThemeIcon className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        )}

        <VTLink
          to="/portfolio"
          data-cursor="view"
          className={`italic transition-colors duration-300 ${linkClass}`}
        >
          Portfolio
        </VTLink>
        <VTLink
          to="/contact"
          data-cursor="accent"
          className={`group flex items-center gap-2 transition-colors duration-300 ${contactClass}`}
        >
          <div
            className={`relative flex items-center justify-center w-6 h-6 border rounded-sm overflow-hidden transition-colors duration-300 ${iconBorderClass}`}
          >
            <svg
              className="transition-transform duration-300 ease-in-out group-hover:translate-x-6"
              width="10"
              height="10"
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
              width="10"
              height="10"
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
          <span className="italic font-serif text-lg">Contact</span>
        </VTLink>
      </div>
    </nav>
  );
}





