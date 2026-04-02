/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import GsapLenisSync from './components/GsapLenisSync';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import GradualBlur from './components/GradualBlur';
import GlobalDitherCursor from './components/GlobalDitherCursor';
import FilmGrain from './components/effects/FilmGrain';
import DeferredChrome from './components/DeferredChrome';
import Home from './pages/Home';
import { DesignThemeProvider } from './design/theme-context';
import './i18n';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const Loading = () => (
  <div className="theme-shell fixed inset-0 z-[100] flex items-center justify-center">
    <div className="h-12 w-12 rounded-full border-2 border-[color:var(--theme-border)] border-t-[color:var(--theme-accent)] animate-spin" />
  </div>
);

/** zIndex -60 → fixed layer 40 (below Navbar z-50) */
const PAGE_BOTTOM_BLUR = {
  target: 'page' as const,
  position: 'bottom' as const,
  height: '7rem',
  strength: 1.5,
  divCount: 10,
  curve: 'bezier' as const,
  exponential: true,
  opacity: 0.7,
  zIndex: -60,
};

/** Bottom gradual blur on every route except the homepage */
function GradualBlurExceptHome() {
  const { pathname } = useLocation();
  if (pathname === '/') return null;
  return <GradualBlur {...PAGE_BOTTOM_BLUR} />;
}

export default function App() {
  return (
    <DesignThemeProvider>
      <SmoothScroll>
        <Router>
          <GsapLenisSync />
          <ScrollToTop />
          <div className="theme-shell relative min-h-screen w-full max-w-[100vw] overflow-x-hidden font-sans">
            <DeferredChrome>
              <GlobalDitherCursor />
              <FilmGrain />
            </DeferredChrome>
            <Navbar />
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
              </Routes>
            </Suspense>
            <GradualBlurExceptHome />
          </div>
        </Router>
      </SmoothScroll>
    </DesignThemeProvider>
  );
}
