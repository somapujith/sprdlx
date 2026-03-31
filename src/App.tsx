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
import './i18n';

const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const Loading = () => (
  <div className="fixed inset-0 bg-black flex items-center justify-center z-[100]">
    <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
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
    <SmoothScroll>
      <Router>
        <GsapLenisSync />
        <ScrollToTop />
        <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
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
  );
}
