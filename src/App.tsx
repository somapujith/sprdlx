/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import GsapLenisSync from './components/GsapLenisSync';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
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

export default function App() {
  return (
    <SmoothScroll>
      <Router>
        <GsapLenisSync />
        <ScrollToTop />
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
          <Navbar />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </SmoothScroll>
  );
}
