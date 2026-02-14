import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Info from './pages/Info';
import Labs from './pages/Labs';
import Navbar from './components/Navbar';
import Work from './pages/Work';
import './App.css';

function App() {
  return (
    <Router>
     
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/work" element={<Work />} />
       
      </Routes>
    </Router>
  );
}

export default App;