import { useSyncExternalStore, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BookOpen, Layers, Aperture } from 'lucide-react';
import VTLink from './VTLink';
import SprdlxLogoMark from './SprdlxLogoMark';
import { getNavSurface, setNavSurface, subscribeNavSurface } from '../navSurface';
import { useDesignTheme } from '../design/theme-context';
import { DesignThemeId } from '../design/themes';

const THEME_ICONS: Record<DesignThemeId, React.FC<{ className?: string }>> = {
  editorial: BookOpen,
  atelier: Layers,
  analog: Aperture,
};

export default function Navbar() {
  const { pathname } = useLocation();
  const surface = useSyncExternalStore(subscribeNavSurface, getNavSurface, getNavSurface);
  const { themeId, setThemeId, themes } = useDesignTheme();
  const isLight = surface === 'light';

  useLayoutEffect(() => {
    if (pathname !== '/') setNavSurface('dark');
  }, [pathname]);

  const linkClass = isLight
    ? 'text-[color:var(--theme-nav-light)] hover:opacity-70'
    : 'text-[color:var(--theme-nav-dark)] hover:opacity-80';
  const contactClass = isLight
    ? 'text-[color:var(--theme-nav-light)]'
    : 'text-[color:var(--theme-nav-dark)]';
  const iconBorderClass = isLight
    ? 'border-[color:var(--theme-nav-light-border)]'
    : 'border-[color:var(--theme-nav-dark-border)]';

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
          <div className="flex items-center gap-1 rounded-full border border-[color:var(--theme-border-soft)] bg-[color:var(--theme-chip-bg)] p-1">
            {themes.map((theme) => {
              const active = theme.id === themeId;
              const Icon = THEME_ICONS[theme.id];
              return (
                <button
                  key={theme.id}
                  type="button"
                  className={active ? 'theme-chip theme-chip--active' : 'theme-chip'}
                  style={{ paddingLeft: '0.6rem', paddingRight: '0.6rem' }}       
                  onClick={() => setThemeId(theme.id)}
                  aria-pressed={active}
                  title={theme.description}
                  aria-label={theme.label}
                >
                  <Icon className="w-4 h-4" strokeWidth={2.5} />
                </button>
              );
            })}
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
          <span
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
          </span>
          <span className="italic font-serif text-lg">Contact</span>
        </VTLink>
      </div>
    </nav>
  );
}





