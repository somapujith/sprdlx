import { useSyncExternalStore, useLayoutEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import SprdlxLogoMark from './SprdlxLogoMark';
import { getNavSurface, setNavSurface, subscribeNavSurface } from '../navSurface';

export default function Navbar() {
  const { pathname } = useLocation();
  const surface = useSyncExternalStore(subscribeNavSurface, getNavSurface, getNavSurface);
  const isLight = surface === 'light';

  useLayoutEffect(() => {
    if (pathname !== '/') setNavSurface('dark');
  }, [pathname]);

  const linkClass = isLight
    ? 'text-neutral-900 hover:opacity-70'
    : 'text-zinc-100 hover:opacity-80';
  const contactClass = isLight ? 'text-neutral-900' : 'text-white';
  const iconBorderClass = isLight ? 'border-black/25' : 'border-white/30';

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-transparent transition-colors duration-300"
    >
      <Link
        to="/"
        aria-label="SPRDLX — Home"
        className="block shrink-0 text-[#ccff00] transition-opacity hover:opacity-90"
      >
        <SprdlxLogoMark className="h-8 w-auto md:h-9" />
      </Link>
      <div className="flex items-center gap-8 text-sm font-medium">
        <Link
          to="/portfolio"
          className={`italic transition-colors duration-300 ${linkClass}`}
        >
          Portfolio
        </Link>
        <Link
          to="/contact"
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
        </Link>
      </div>
    </motion.nav>
  );
}
