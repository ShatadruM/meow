import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import TestPage from './pages/TestPage';

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