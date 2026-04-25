/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';

const Gallery = lazy(() => import('./pages/Gallery'));
const Editor = lazy(() => import('./pages/Editor'));
const Preview = lazy(() => import('./pages/Preview'));

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#050507] flex items-center justify-center z-[999]">
      <div className="w-12 h-12 border-2 border-landio-purple/20 border-t-landio-purple rounded-full animate-spin"></div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingScreen />}>
        <Routes location={location}>
          <Route path="/" element={<Gallery />} />
          <Route path="/editor/:id" element={<Editor />} />
          <Route path="/preview/:id" element={<Preview />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
