import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Location from "./Location";
import { gsap } from "gsap";

const THEMES = {
  white: {
    text: "text-white",
  },
  black: {
    text: "text-black",
  },
  orange: {
    text: "text-[#FF5722]",
  },
  green: {
    text: "text-[#39ff14]",
  },
  red:{
    text: "text-[#f25a42]"
  },
  blue:{
    text: "text-[#1c55f1]"
  },
  orange: {
    text: "text-[#1a0088]",
  },
  purple:{
    text: " text-[#a146e7]"
  }
};

const LogoSVG = ({ className }) => (
  <div className={`relative inline-block ${className}`}>
    <img src="/ntl-logo.svg" className="h-full w-auto opacity-0 block" alt="logo" />
    <div
      className="absolute inset-0 bg-current"
      style={{
        WebkitMaskImage: 'url(/ntl-logo.svg)',
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskImage: 'url(/ntl-logo.svg)',
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
      }}
    />
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navTheme, setNavTheme] = useState("white"); 

  const navRef = useRef(null);
  const headerRef = useRef(null);

  const handleLinkClick = () => setIsOpen(false);

  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, { skewX: -12, duration: 0.6, ease: "power2.out" });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, { skewX: 0, duration: 0.4, ease: "power2.in" });
  };

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
    const sections = document.querySelectorAll("[data-nav-color]");

    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -90% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const colorName = entry.target.getAttribute("data-nav-color");
          if (THEMES[colorName]) {
            setNavTheme(colorName);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mainContent = document.querySelector(".main-content");
    const handleScroll = () => {
      if (mainContent && headerRef.current) {
        const rect = mainContent.getBoundingClientRect();
        const overlap = window.innerHeight - rect.bottom;
        const threshold = 500;
        if (overlap > threshold) {
          const moveUpAmount = overlap - threshold;
          headerRef.current.style.transform = `translateY(-${moveUpAmount}px)`;
        } else {
          headerRef.current.style.transform = `translateY(0px)`;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeTheme = THEMES[navTheme] || THEMES.white;

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full h-0 z-50 pointer-events-none transition-transform duration-75 ease-out"
      >
        <nav
          ref={navRef}
          className={`w-full bg-transparent px-6 py-6 font-nunito pointer-events-auto transition-colors duration-500 ${activeTheme.text}`}
        >
          <div className="max-w-450 mx-auto flex justify-between items-center md:grid md:grid-cols-3">
            
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
                 <LogoSVG className="h-10 sm:h-12" />
              </a>
            </div>

            <div className="hidden md:flex justify-center">
              <a href="/">
                <LogoSVG className="h-16" />
              </a>
            </div>

            <div className="flex items-center justify-end">
              <div
                data-cursor="hover"
                className="hidden md:flex justify-end items-center text-[10px] uppercase tracking-[0.2em]"
              >
                <Location />
              </div>
              <button
                onClick={() => setIsOpen(true)}
                className={`md:hidden text-[11px] uppercase tracking-widest border px-3 py-1 transition-all ${activeTheme.border} ${activeTheme.hoverBg} ${activeTheme.hoverText}`}
              >
                Menu
              </button>
            </div>
          </div>
        </nav>
      </header>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black z-[100] flex flex-col text-white animate-fade-in">
            <div className="flex justify-between items-center px-6 py-6 pt-8">
              <LogoSVG className="h-10 sm:h-12 text-white" />
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