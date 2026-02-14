import React, { useState } from 'react';
import Location from './Location';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent px-6 py-6 text-white">
      <div className="max-w-[1800px] mx-auto grid grid-cols-2 md:grid-cols-3 items-center">
        
        {/* LEFT SIDE: Desktop Links / Mobile Toggle */}
        <div className="flex items-center">
          {/* Desktop: Vertical Stack */}
          <div className="hidden md:flex flex-col text-sm uppercase tracking-[0.2em] font-nunito">
            <a href="work" className="hover:opacity-50 transition-opacity">Work</a>
            <a href="labs" className="hover:opacity-50 transition-opacity">Labs</a>
            <a href="images" className="hover:opacity-50 transition-opacity">Images</a>
            <a href="info" className="hover:opacity-50 transition-opacity">Info</a>
          </div>

          {/* Mobile: Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[11px] uppercase tracking-widest border border-white/40 px-3 py-1 hover:bg-white hover:text-black transition-all"
          >
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {/* CENTER: Logo */}
        <div className="flex justify-center">
          <a href="/" >
           <img className='h-16 ' src="/NTLlogo.png" alt="logo" />
          </a>
        </div>

        {/* RIGHT SIDE: Location Component */}
        <div className="hidden md:flex justify-end items-center text-[10px] uppercase tracking-[0.2em]">
          <Location/>
        </div>
      </div>

      {/* MOBILE OVERLAY: Triggered by Menu Button */}
      {isOpen && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center space-y-8 text-2xl uppercase tracking-widest md:hidden">
          <a href="#work" onClick={() => setIsOpen(false)}>Work</a>
          <a href="#labs" onClick={() => setIsOpen(false)}>Labs</a>
          <a href="#images" onClick={() => setIsOpen(false)}>Images</a>
          <a href="#info" onClick={() => setIsOpen(false)}>Info</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;