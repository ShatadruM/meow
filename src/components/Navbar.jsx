import React, { useState } from 'react';
import Location from './Location';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper function to close menu when a link is clicked
  const handleLinkClick = () => setIsOpen(false);

  return (
    // 1. STICKY HEADER WRAPPER (Preserves Footer Reveal functionality)
    <header className="sticky top-0 left-0 w-full h-0 z-50">
      
      <nav className="w-full bg-transparent px-6 py-6 text-white font-nunito">
        <div className="max-w-[1800px] mx-auto flex justify-between items-center md:grid md:grid-cols-3">
          
          {/* --- LEFT SECTION --- */}
          <div className="flex items-center justify-start">
            
            {/* DESKTOP: Vertical Links (Hidden on Mobile) */}
            <div className="hidden md:flex flex-col text-sm uppercase tracking-[0.2em]">
              {['Work', 'Labs', 'Images', 'Info'].map((item) => (
                <a 
                  key={item} 
                  href={`/${item.toLowerCase()}`} 
                  className="hover:opacity-50 transition-opacity"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* MOBILE: Logo (Visible only on Mobile) */}
            {/* This places the logo on the Left for mobile view */}
            <a href="/" className="md:hidden block">
               <img className='h-10 sm:h-12' src="/NTLlogo.png" alt="logo" />
            </a>
          </div>


          {/* --- CENTER SECTION (Desktop Only) --- */}
          <div className="hidden md:flex justify-center">
            <a href="/" >
              <img className='h-16' src="/NTLlogo.png" alt="logo" />
            </a>
          </div>


          {/* --- RIGHT SECTION --- */}
          <div className="flex items-center justify-end">
            
            {/* DESKTOP: Location (Hidden on Mobile) */}
            <div className="hidden md:flex justify-end items-center text-[10px] uppercase tracking-[0.2em]">
              <Location/>
            </div>

            {/* MOBILE: Menu Button (Hidden on Desktop) */}
            <button 
              onClick={() => setIsOpen(true)}
              className="md:hidden text-[11px] uppercase tracking-widest border border-white/40 px-3 py-1 hover:bg-white hover:text-black transition-all"
            >
              Menu
            </button>
          </div>

        </div>

        {/* --- MOBILE FULLSCREEN MENU OVERLAY --- */}
        {isOpen && (
          <div className="fixed inset-0 bg-black z-[100] flex flex-col">
            
            {/* 1. OVERLAY HEADER: Logo Left, Cross Right */}
            <div className="flex justify-between items-center px-6 py-6">
               {/* Logo Top Left */}
               <img className='h-10 sm:h-12' src="/NTLlogo.png" alt="logo" />
               
               {/* Cross Button Top Right */}
               <button 
                 onClick={() => setIsOpen(false)}
                 className="text-white text-4xl font-light leading-none hover:opacity-70 transition-opacity"
                 aria-label="Close Menu"
               >
                 &times; {/* HTML entity for 'X' */}
               </button>
            </div>

            {/* 2. OVERLAY LINKS (Centered) */}
            <div className="grow flex flex-col items-center justify-center space-y-8">
               {['Work', 'Labs', 'Images', 'Info'].map((item) => (
                  <a 
                    key={item}
                    href={`/${item.toLowerCase()}`} 
                    onClick={handleLinkClick}
                    className="text-3xl font-bebas tracking-widest hover:text-gray-400 transition-colors uppercase text-white"
                  >
                    {item}
                  </a>
               ))}
            </div>

            {/* 3. OVERLAY FOOTER: Location Bottom Right */}
            <div className="absolute bottom-6 right-6 text-[10px] uppercase tracking-[0.2em] text-white/80">
               <Location />
            </div>

          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;