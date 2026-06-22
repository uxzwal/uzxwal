import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import { NavbarProvider } from './contexts/NavbarContext';
import { AdminProvider } from './contexts/AdminContext';
import Lenis from 'lenis';

// Pages
import Home from './pages/Home';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <AdminProvider>
      <NavbarProvider>
        <div className="relative min-h-screen bg-[#000000] text-[#a6a6a6] overflow-x-hidden font-sans selection:bg-[#f3f3f3] selection:text-[#000000]">
          <Header />
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </NavbarProvider>
    </AdminProvider>
  );
}

export default App;