import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Info from './pages/Info';
import Labs from './pages/Labs';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Work from './pages/Work';
import './App.css';

function App() {
 return (
    <Router>
       <Navbar />
      <div className="main-content relative z-10 bg-white shadow-2xl">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/work" element={<Work />} />
        </Routes>
      </div>

      {/* 2. FOOTER WRAPPER
        - Fixed at bottom
        - z-index 0 (Behind everything)
      */}
      <div className="footer-placeholder fixed bottom-0 left-0 w-full z-0">
         <Footer />
      </div>

    </Router>
  );
}

export default App;