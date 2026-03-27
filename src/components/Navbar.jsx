import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Location from "./Location";
import { gsap } from "gsap";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useRef(null);
  const headerRef = useRef(null);

  const handleLinkClick = () => setIsOpen(false);

  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      skewX: -12,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      skewX: 0,
      duration: 0.4,
      ease: "power2.in",
    });
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const mainContent = document.querySelector(".main-content");

    const handleScroll = () => {
      // LOGIC A: DELAYED FOOTER REVEAL (Kept exactly as you had it)
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

      // LOGIC B IS GONE! CSS handles the colors now.
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 1. THE HEADER */}
      {/* ADDED: mix-blend-difference. Everything inside this will invert! */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full h-0 z-50 pointer-events-none transition-transform duration-75 ease-out mix-blend-difference"
      >
        <nav
          ref={navRef}
          // ADDED: text-white. (Mix-blend-difference needs the base color to be pure white to invert to pure black)
          className="w-full bg-transparent px-6 py-6 font-nunito pointer-events-auto text-white"
        >
          <div className="max-w-450 mx-auto flex justify-between items-center md:grid md:grid-cols-3">
            {/* LEFT SECTION */}
            <div className="flex items-center justify-start">
              <div className="hidden md:flex flex-col text-sm uppercase tracking-[0.2em]">
                {["Work", "Labs", "Gallery", "Info"].map((item) => (
                  <a
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    data-cursor="hover"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="inline-block transition-opacity duration-300 origin-left"
                  >
                    {item}
                  </a>
                ))}
              </div>

              <a href="/" className="md:hidden block">
                {/* REMOVED: Invert style tag */}
                <img
                  className="h-10 sm:h-12 transition-all duration-300"
                  src="/NTLlogo.png"
                  alt="logo"
                />
              </a>
            </div>

            {/* CENTER SECTION */}
            <div className="hidden md:flex justify-center">
              <a href="/">
                {/* REMOVED: Invert style tag */}
                <img
                  className="h-16 transition-all duration-300"
                  src="/NTLlogo.png"
                  alt="logo"
                />
              </a>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center justify-end">
              <div
                data-cursor="hover"
                className="hidden md:flex justify-end items-center text-[10px] uppercase tracking-[0.2em]"
              >
                <Location />
              </div>
              <button
                onClick={() => setIsOpen(true)}
                // Updated border and hover effects to rely on the white base
                className="md:hidden text-[11px] uppercase tracking-widest border border-white/40 px-3 py-1 hover:bg-white hover:text-black transition-all"
              >
                Menu
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* 2. MOBILE MENU OVERLAY (Unchanged) */}
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black z-[100] flex flex-col text-white animate-fade-in">
            <div className="flex justify-between items-center px-6 py-6 pt-8">
              <img className="h-10 sm:h-12" src="/NTLlogo.png" alt="logo" />
              <button
                onClick={() => setIsOpen(false)}
                className="text-4xl font-light leading-none hover:opacity-70 transition-opacity"
              >
                &times;
              </button>
            </div>

            <div className="grow flex flex-col items-center justify-center space-y-8">
              {["Work", "Labs", "Gallery", "Info"].map((item) => (
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

            <div className="absolute bottom-6 right-6 text-[10px] uppercase tracking-[0.2em] text-white">
              <Location />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default Navbar;
