import React, { useRef,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; 
import { useLoading } from './context/LoadingContext'; 

import Home from './pages/Home';
import Info from './pages/Info';
import Labs from './pages/Labs';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Work from './pages/Work';
import './App.css';
import Images from './pages/Images';
import Norman from './pages/labs/Norman';
import Pausch from './pages/labs/Pausch';
import Mccarthy from './pages/labs/Mccarthy';
import Satoshi from './pages/labs/Satoshi';
import Tesla from './pages/labs/Tesla';
//import Card from './components/Card';
import Noise from './animations/Noise';
import CustomCursor from './components/Cursor';
import Loader from './components/Loader'; 

// Listens for route change
function RouteChangeListener() {
  const location = useLocation();
  const { setIsLoading, isInitialLoad } = useLoading();
  
  // Create a ref to remember the last URL we were on
  const lastPath = useRef(location.pathname);

  useEffect(() => {
    // ONLY trigger the loader if it's not the first load AND the URL actually changed
    if (!isInitialLoad && location.pathname !== lastPath.current) {
      setIsLoading(true);
      lastPath.current = location.pathname; // Update the ref to the new URL
    }
  }, [location.pathname, isInitialLoad, setIsLoading]); 

  return null;
}

function App() {
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);
  
  return (
    <Router>
      <CustomCursor />
      
      
      <RouteChangeListener />
      
      {/* The Loader will now update the GLOBAL state when it finishes */}
      {isLoading && (
        <Loader onComplete={() => setIsLoading(false)} />
      )}

      <div className="fixed inset-0 z-20 pointer-events-none">
        <Noise
          patternSize={400}
          patternScaleX={6}
          patternScaleY={6}
          patternRefreshInterval={2}
          patternAlpha={19}
        />
      </div>
      
      <div className="relative z-30">
        <Navbar />
      </div>
      
      <div className="main-content relative z-10 bg-white shadow-2xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/work" element={<Work />} />
          <Route path="/gallery" element={<Images />} />
          <Route path="/labs/norman" element={<Norman />} />
          <Route path="/labs/pausch" element={<Pausch />} />
          <Route path="/labs/mccarthy" element={<Mccarthy />} />
          <Route path="/labs/satoshi" element={<Satoshi />} />  
          <Route path="/labs/tesla" element={<Tesla />} />
        </Routes>
      </div>

      <div className="footer-placeholder fixed bottom-0 left-0 w-full z-0">
        <Footer />
      </div>

    </Router>
  );
}

export default App;