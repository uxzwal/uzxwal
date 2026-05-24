import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Squares from './components/Squares';
import { NavbarProvider } from './contexts/NavbarContext';
import { AdminProvider } from './contexts/AdminContext';
import { useTheme } from './contexts/ThemeContext';
import FloatingThemeToggle from './components/FloatingThemeToggle';

// Pages
import Home from './pages/Home';

function App() {
  const { theme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const removeSplineWatermarks = () => {
      // Find all anchors and elements in the light DOM and physically delete them
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        if (
          link.href && 
          (link.href.includes('spline') || 
           link.id === 'logo' || 
           link.className?.includes('logo') || 
           link.innerText?.includes('Spline') || 
           link.innerText?.includes('Built with'))
        ) {
          link.remove(); // Physical deletion!
        }
      });

      // Target shadow DOMs of any spline-viewer elements and remove internal logo
      const splineViewers = document.querySelectorAll('spline-viewer');
      splineViewers.forEach(viewer => {
        if (viewer.shadowRoot) {
          const shadowLogo = viewer.shadowRoot.getElementById('logo') || 
                             viewer.shadowRoot.querySelector('a') || 
                             viewer.shadowRoot.querySelector('.logo');
          if (shadowLogo) {
            shadowLogo.remove(); // Physical deletion inside shadow root!
          }
        }
      });

      const logoEl = document.getElementById('logo');
      if (logoEl) {
        logoEl.remove(); // Physical deletion!
      }
    };

    removeSplineWatermarks();
    const interval = setInterval(removeSplineWatermarks, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <AdminProvider>
      <NavbarProvider>
        <div className="relative min-h-screen dark:bg-[#000000] bg-slate-50 transition-colors duration-500 overflow-hidden">
          {/* Global Background Animation */}
          <div className="fixed inset-0 z-0">
            <Squares
              speed={0.2}
              squareSize={35}
              direction="diagonal"
              borderColor={theme === 'dark' ? "rgba(255, 255, 255, 0.02)" : "rgba(15, 23, 42, 0.05)"}
              hoverFillColor={theme === 'dark' ? "rgba(255, 255, 255, 0.05)" : "rgba(8, 145, 178, 0.1)"}
              gradientColorStart={theme === 'dark' ? "#000000" : "#f1f5f9"}
              gradientColorEnd={theme === 'dark' ? "#000000" : "#e2e8f0"}
            />
          </div>

          <Header />

          {/* Page Routing with Transitions */}
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
            </Routes>
          </AnimatePresence>

          <FloatingThemeToggle />
        </div>
      </NavbarProvider>
    </AdminProvider>
  );
}

export default App;