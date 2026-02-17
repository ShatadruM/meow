import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom'; // <--- IMPORT THIS
import Location from './Location';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkText, setIsDarkText] = useState(false);
  
  const navRef = useRef(null); 
  const headerRef = useRef(null); 

  const handleLinkClick = () => setIsOpen(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const mainContent = document.querySelector('.main-content');
    const lightSections = document.querySelectorAll('.light-section');

    const handleScroll = () => {
      // LOGIC A: DELAYED FOOTER REVEAL
      if (mainContent && headerRef.current) {
        const rect = mainContent.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const overlap = windowHeight - rect.bottom;
        const threshold = 500; 

        if (overlap > threshold) {
          const moveUpAmount = overlap - threshold;
          headerRef.current.style.transform = `translateY(-${moveUpAmount}px)`;
        } else {
          headerRef.current.style.transform = `translateY(0px)`;
        }
      }

      // LOGIC B: COLOR SWITCHING
      if (navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const navMiddleY = navRect.top + navRect.height / 2;
        
        let isOverLight = false;
        lightSections.forEach(section => {
          const rect = section.getBoundingClientRect();
          if (navMiddleY >= rect.top && navMiddleY <= rect.bottom) {
            isOverLight = true;
          }
        });
        setIsDarkText(isOverLight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textColorClass = isDarkText ? 'text-gray-900' : 'text-white';
  const logoFilter = isDarkText ? 'invert(1)' : 'invert(0)'; 
  const borderColorClass = isDarkText ? 'border-gray-900/40 hover:text-white hover:bg-gray-900' : 'border-white/40 hover:text-black hover:bg-white';

  return (
    <>
      {/* 1. THE HEADER (Moves up/down) */}
      <header 
        ref={headerRef}
        className="fixed top-0 left-0 w-full h-0 z-50 pointer-events-none transition-transform duration-75 ease-out"
      >
        <nav 
          ref={navRef}
          className={`w-full bg-transparent px-6 py-6 font-nunito transition-colors duration-300 pointer-events-auto ${textColorClass}`}
        >
          <div className="max-w-[1800px] mx-auto flex justify-between items-center md:grid md:grid-cols-3">
            
            {/* LEFT SECTION */}
            <div className="flex items-center justify-start">
              <div className="hidden md:flex flex-col text-sm uppercase tracking-[0.2em]">
                {['Work', 'Labs', 'Images', 'Info'].map((item) => (
                  <a key={item} href={`/${item.toLowerCase()}`} className="hover:opacity-50 transition-opacity">
                    {item}
                  </a>
                ))}
              </div>

              <a href="/" className="md:hidden block">
                <img 
                  className="h-10 sm:h-12 transition-all duration-300" 
                  src="/NTLlogo.png" 
                  alt="logo" 
                  style={{ filter: logoFilter }}
                />
              </a>
            </div>

            {/* CENTER SECTION */}
            <div className="hidden md:flex justify-center">
              <a href="/">
                <img 
                  className="h-16 transition-all duration-300"
                  src="/NTLlogo.png" 
                  alt="logo" 
                  style={{ filter: logoFilter }}
                />
              </a>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center justify-end">
              <div className="hidden md:flex justify-end items-center text-[10px] uppercase tracking-[0.2em]">
                <Location/>
              </div>
              <button 
                onClick={() => setIsOpen(true)}
                className={`md:hidden text-[11px] uppercase tracking-widest border px-3 py-1 transition-all ${borderColorClass}`}
              >
                Menu
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* 2. MOBILE MENU OVERLAY (Rendered outside via Portal) */}
      {isOpen && createPortal(
        <div className="fixed inset-0 bg-black z-[100] flex flex-col text-white animate-fade-in">
          
          {/* Header Area within Overlay */}
          <div className="flex justify-between items-center px-6 py-6 pt-8"> {/* Added pt-8 to match navbar position */}
             <img className='h-10 sm:h-12' src="/NTLlogo.png" alt="logo" />
             <button 
               onClick={() => setIsOpen(false)}
               className="text-4xl font-light leading-none hover:opacity-70 transition-opacity"
             >
               &times;
             </button>
          </div>

          {/* Links */}
          <div className="grow flex flex-col items-center justify-center space-y-8">
             {['Work', 'Labs', 'Images', 'Info'].map((item) => (
                <a 
                  key={item}
                  href={`/${item.toLowerCase()}`} 
                  onClick={handleLinkClick}
                  className="text-3xl font-bebas tracking-widest hover:text-gray-400 transition-colors uppercase"
                >
                  {item}
                </a>
             ))}
          </div>

          {/* Location */}
          <div className="absolute bottom-6 right-6 text-[10px] uppercase tracking-[0.2em] text-white">
             <Location />
          </div>
        </div>,
        document.body // This renders the div into the <body> tag directly
      )}
    </>
  );
};

export default Navbar;