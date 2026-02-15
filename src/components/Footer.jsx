import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Footer = () => {
  return (
    <footer className="w-full h-full bg-black text-white flex flex-col justify-between overflow-hidden">
      
      {/* --- 1. ENDLESS MARQUEE --- */}
      {/* Reduced vertical padding on mobile (py-4) to save space */}
      <div className="w-full py-4 md:py-8 border-b border-white/10 shrink-0">
        <Marquee />
      </div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      {/* flex-grow ensures it takes available space, but we control spacing tightly */}
      <div className="container mx-auto px-6 md:px-10 py-8 md:py-12 flex flex-col flex-grow justify-between">
        
        {/* --- 2. UPPER SECTION (Tagline & Nav) --- */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0">
          
          {/* Tagline */}
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-6xl font-medium tracking-tight leading-[1.15]">
              Got a vision? We’ve got <br />
              caffeine and emotional <br />
              availability.
            </h2>
          </div>

          {/* Right Navigation */}
          <div className="flex flex-col text-left md:text-right w-full md:w-auto">
             {/* displayed horizontally on mobile to save vertical space, vertical on desktop */}
             <ul className="flex md:flex-col flex-wrap gap-x-6 gap-y-2 md:gap-y-1">
               {["Work", "Info", "Images", "Labs"].map((link, i) => (
                  <li key={i}>
                    <a 
                      href={`/${link.toLowerCase()}`} 
                      className="text-sm md:text-xl font-medium hover:text-gray-400 transition-colors uppercase md:normal-case tracking-widest md:tracking-normal"
                    >
                      {link}
                    </a>
                  </li>
               ))}
             </ul>
          </div>
        </div>


        {/* --- 3. LOWER SECTION (Compact Grid) --- */}
        {/* Mobile: 2 Columns. Address spans full width. Contact/Socials share a row. */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 mt-4 md:mt-0">
          
          {/* Column 1: Address (Full width on mobile to prevent squishing) */}
          <div className="col-span-2 md:col-span-1 flex flex-col">
            <div className="w-full h-[1px] bg-white/30 mb-3 md:mb-6"></div>
            <h3 className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-6">
              Our Address
            </h3>
            <p className="text-sm md:text-lg text-gray-200 leading-snug">
              SRM University, Andhra Pradesh<br />
              V-203, Neerukonda
            </p>
          </div>

          {/* Column 2: Contact */}
          <div className="col-span-1 flex flex-col">
             <div className="w-full h-[1px] bg-white/30 mb-3 md:mb-6"></div>
             <h3 className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-6">
               Get in Touch
             </h3>
             <div className="flex flex-col space-y-1">
               <a href="mailto:info@1820.com" className="text-xs md:text-lg hover:text-gray-400 truncate">
                  info@ntl.lab
               </a>
               <a href="tel:9728697778" className="text-xs md:text-lg hover:text-gray-400">
                  +91 972 869 7778
               </a>
             </div>
          </div>

          {/* Column 3: Socials */}
          <div className="col-span-1 flex flex-col">
             <div className="w-full h-[1px] bg-white/30 mb-3 md:mb-6"></div>
             <h3 className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-6">
               Socials
             </h3>
             <ul className="space-y-1">
                {["Instagram", "Twitter", "LinkedIn"].map((social, i) => (
                   <li key={i}>
                     <a href="#" className="text-xs md:text-lg hover:text-gray-400">
                        {social}
                     </a>
                   </li>
                ))}
             </ul>
          </div>

        </div>

        {/* --- 4. BOTTOM COPYRIGHT --- */}
        <div className="mt-8 md:mt-12 pt-4 border-t border-white/10 md:border-none">
          <p className="text-gray-600 text-[10px] md:text-xs font-medium tracking-wide">
            © Next Tech Lab, AP, 2026. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

// --- Sub-component: Marquee ---
const Marquee = () => {
  const marqueeRef = useRef(null);
  const text = "TESLA • MCCARTHY • NORMAN • SATOSHI • PAUSCH •";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50, 
        repeat: -1,
        duration: 20, 
        ease: "linear",
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden w-full flex select-none">
      <div 
        ref={marqueeRef} 
        className="flex whitespace-nowrap will-change-transform"
      >
        <span className="text-[12vw] md:text-[8vw] font-bebas font-bold leading-none uppercase text-white px-4">
          {text} {text}
        </span>
        <span className="text-[12vw] md:text-[8vw] font-bebas font-bold leading-none uppercase text-white px-4">
          {text} {text}
        </span>
      </div>
    </div>
  );
};

export default Footer;