import React, { useEffect } from 'react'; // Removed useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLoading } from './context/LoadingContext'; // <-- 1. Import the custom hook

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
import Card from './components/Card';
import Noise from './animations/Noise';
import CustomCursor from './components/Cursor';
import Loader from './components/Loader'; 

function App() {
  // 2. Pull the state globally instead of locally!
  const { isLoading, setIsLoading } = useLoading();

  // Prevent scrolling on the body while the loader is active
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
          <Route path="/test" element={<Card />} />
          <Route 
            path="/card" 
            element={
              <Card 
                name="John Doe" 
                idNumber="12345" 
                photoUrl="/photo.png" 
                role="Member" 
                links={[
                  "https://github.com/ShatadruM",
                  "https://www.linkedin.com/in/shatadru-mukhopadhyay-6a5a4b291/"
                ]}
              />
            } 
          />
        </Routes>
      </div>

      <div className="footer-placeholder fixed bottom-0 left-0 w-full z-0">
        <Footer />
      </div>

    </Router>
  );
}

export default App;