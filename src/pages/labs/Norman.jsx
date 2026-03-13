import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLenis } from "../../hooks/useLenis"; 

const Norman = () => {
  useLenis();
  const containerRef = useRef(null);

  return (
  <>
   {/* FIXED: Removed the global overflow wrapper so sticky works perfectly again */}
   <div className='h-auto'>
    <div ref={containerRef} className="relative w-full h-screen bg-[#f6efae] overflow-hidden flex flex-col">
     <div className="relative z-10 flex-1 flex w-full 
                      flex-col md:flex-row 
                      justify-center items-center md:justify-between 
                      px-4 md:px-20 pb-20 md:pb-0 translate-y-32">
        
        {/* LEFT TEXT "BUILD BOLD" */}
        <div className="left-text z-10 text-center mt-[20vh] md:mt-0">
          <h1 className="font-bebas text-[25vw] md:text-[15vw] leading-[0.85] text-[#f25a42]">
            BUILD<br/>
            <span className="text-[#f25a42]">BOLD</span>
          </h1>
        </div>

        {/* CENTER IMAGE */}
        <div className="center-image absolute left-1/2 -translate-x-1/2 
                        top-[15%] h-[30vh] 
                        md:top-1/2 md:-translate-y-1/2 md:h-[70%] 
                        w-auto transition-all duration-500 z-0">
          
          <img
            src="/ntl-text.svg"
            alt="NTL Text"
            className="h-full w-auto object-contain opacity-0"
          />
          
          <div 
            className="absolute inset-0 bg-[#f25a42]"
            style={{
              mask: 'url(/ntl-text.svg) no-repeat center center / contain',
              WebkitMask: 'url(/ntl-text.svg) no-repeat center center / contain',
            }}
          />
        </div>

        {/* RIGHT TEXT "MADE HUMAN" */}
        <div className="right-text z-10 text-center mt-8 md:mt-0">
          <h1 className="font-bebas text-[25vw] md:text-[15vw] leading-[0.85] text-[#f25a42]">
            MADE<br/>
            <span className="text-[#f25a42]">HUMAN</span>
          </h1>
        </div>

      </div>

      {/* TOP TEXT: "NORMAN LAB" */}
      <div className="top-text absolute top-24 md:top-32 left-1/2 -translate-x-1/2 z-20">
        <a 
          href="#" 
          className="text-[#f25a42] font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase relative z-10 underline underline-offset-5 decoration-1"
        >
          [Norman Lab]
        </a>
      </div>

    </div>
    
    <section className="relative w-full bg-black text-white flex flex-col md:flex-row">
      
      <div className="md:w-2/3 md:sticky md:top-0 h-auto md:h-screen flex flex-col md:flex-row px-6 md:px-12 pt-20 pb-4 md:pb-10">
        
        {/* Left Text */}
        <div className="md:w-1/3 flex justify-start items-start">
          <h2 className="font-bebas text-5xl md:text-6xl tracking-wide">
            Our GOAL IS
          </h2>
        </div>

        {/* Center Image */}
        <div className="md:w-1/2 h-[45vh] md:h-full flex justify-center md:justify-start items-start mt-6 md:mt-0">
          <img
            src="/DonNorman.png" 
            alt="Don Norman"
            className="h-full w-auto object-contain object-top grayscale"
          />
        </div>
      </div>

      <div className="md:w-1/3 flex flex-col w-full px-8 md:pr-20">
        
        {/* Scroll Block 1 */}
        <div className="flex flex-col items-start pt-4 pb-12 md:pt-[25vh] md:pb-0 md:h-screen md:justify-start">
          <p className="text-base md:text-xl font-serif italic mb-6 leading-relaxed text-gray-200">
            "A product is more than its features. It is an experience — an
            experience shaped by expectations, context, culture, and
            emotion. Designers must understand people before they try to
            design for them."
          </p>
          <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-white flex items-center gap-4">
            <span className="w-6 h-0.5 bg-white block"></span> DON NORMAN
          </p>
        </div>

        {/* Scroll Block 2 */}
        <div className="flex flex-col items-start pb-16 md:pb-0 md:h-screen md:justify-start">
          <p className="text-xl md:text-4xl leading-snug font-sans text-gray-200">
            Norman lab is a center of innovation, specializing on web development, app development, cloud computing, and UI/UX design. Norman's lab is dedicated to pushing the boundaries of online experiences by creating seamless and user-friendly interfaces. Our focus extends beyond typical web apps to app development, where we create creative solutions based on cutting-edge technologies and best practices.
          </p>
        </div>

      </div>
      
    </section>

    <div className="w-full bg-black">
        <TiltedMarquee />
    </div>

   </div>
  </>
  );
};

const TiltedMarquee = () => {
  const marqueeRef = useRef(null);
  const text = "NORMAN • NORMAN • NORMAN • NORMAN •";

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
    // FIXED: Removed generic overflow-hidden. Added overflowX: 'clip' inline to strictly hide horizontal without touching vertical.
    <section 
      className="relative w-full h-[20vh] flex items-center justify-center bg-black"
      style={{ overflowX: 'clip' }}
    >
      <div className="absolute w-[200vw] -rotate-10 bg-[#000000] flex select-none py-6 z-10">
        
        <div 
          ref={marqueeRef} 
          className="flex whitespace-nowrap will-change-transform w-max"
        >
          <span className="text-[12vw] md:text-[8vw] font-bebas font-bold leading-none uppercase text-white px-4">
            {text} {text}
          </span>
          <span className="text-[12vw] md:text-[8vw] font-bebas font-bold leading-none uppercase text-white px-4">
            {text} {text}
          </span>
        </div>
        
      </div>
    </section>
  );
};

export default Norman;