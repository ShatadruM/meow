import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Data from "../../members/pausch.json";
import { useLenis } from "../../hooks/useLenis"; 
import Card2 from '../../components/Card2';

const Pausch = () => {
  useLenis();
  const containerRef = useRef(null);
   // Group members dynamically based on your JSON roles
  const teamGroups = [
    {
      title: "SYNDICATES",
      members: Data.filter(m => m.role.toLowerCase().includes('syndicate') )
    },
    {
      title: "MEMBERS",
      members: Data.filter(m => m.role.toLowerCase() === 'member')
    },
    {
      title: "ASSOCIATES",
      members: Data.filter(m => m.role.toLowerCase() === 'associate')
    }
  ];

  return (
  <>
   {/* FIXED: Removed the global overflow wrapper so sticky works perfectly again */}
   <div className='h-auto'>
    <div ref={containerRef} className="relative w-full h-screen bg-[#1a0545] overflow-hidden flex flex-col">
      <div className="relative z-10 flex-1 flex w-full 
                      flex-col md:flex-row 
                      justify-center items-center md:justify-between 
                      px-4 md:px-20 pb-20 md:pb-0 translate-y-12 md:translate-y-32">
        
        {/* LEFT TEXT "BEND REALITY" */}
        <div className="left-text z-10 text-center mt-4 md:mt-0">
          <h1 className="font-bebas text-[25vw] md:text-[13vw] leading-[0.85] text-[#a146e7]">
            BEND<br/>
            <span className="text-[#a146e7]">REALITY</span>
          </h1>
        </div>

        {/* CENTER IMAGE */}
        {/* Changed to relative for mobile to sit in flex flow, absolute on md: to keep desktop unchanged */}
        <div className="center-image relative md:absolute 
                        md:left-1/2 md:-translate-x-1/2 
                        md:top-1/2 md:-translate-y-1/2 
                        h-[33vh] md:h-[70%] 
                        w-full md:w-auto transition-all duration-500 z-0
                        my-8 md:my-0 flex justify-center items-center">
          
          <img
            src="/ntl-text.svg"
            alt="NTL Text"
            className="h-full w-auto object-contain opacity-0"
          />
          
          <div 
            className="absolute inset-0 bg-[#a146e7]"
            style={{
              mask: 'url(/ntl-text.svg) no-repeat center center / contain',
              WebkitMask: 'url(/ntl-text.svg) no-repeat center center / contain',
            }}
          />
        </div>

        {/* RIGHT TEXT "BUILD PLAY" */}
        <div className="right-text z-10 text-center mt-4 md:mt-0">
          <h1 className="font-bebas text-[25vw] md:text-[13vw] leading-[0.85] text-[#a146e7]">
            BUILD<br/>
            <span className="text-[#a146e7]">PLAY</span>
          </h1>
        </div>

      </div>

      {/* TOP TEXT: "PAUSCH LAB" */}
      {/* Changed top-24 to top-8 for mobile, kept md:top-32 for desktop */}
      <div className="top-text absolute top-8 md:top-32 left-1/2 -translate-x-1/2 z-20">
        <a 
          href="#" 
          className="text-[#a146e7] font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase relative z-10 underline underline-offset-5 decoration-1"
        >
          [Pausch Lab]
        </a>
      </div>

    </div>
    
    <section className="relative w-full bg-black text-white flex flex-col md:flex-row">
      
      <div className="md:w-2/3 md:sticky md:top-10 h-auto md:h-screen flex flex-col md:flex-row px-6 md:px-12 pt-20 pb-4 md:pb-10">
        
        {/* Left Text */}
        <div className="md:w-1/3 flex justify-start items-start">
          <h2 className="font-bebas text-5xl md:text-6xl tracking-wide">
            Our GOAL IS
          </h2>
        </div>

        {/* Center Image */}
        <div className="md:w-1/2 h-[45vh] md:h-full flex justify-center md:justify-start items-start mt-6 md:mt-0">
          <img
            src="/randy_pausch.webp" 
            alt="Randy Pausch"
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
          <p className="text-xl md:text-4xl leading-snug font-inter text-gray-200">
            Norman lab is a center of innovation, specializing on web development, app development, cloud computing, and UI/UX design. Norman's lab is dedicated to pushing the boundaries of online experiences by creating seamless and user-friendly interfaces. Our focus extends beyond typical web apps to app development, where we create creative solutions based on cutting-edge technologies and best practices.
          </p>
        </div>

      </div>
      
    </section>

    <div className="w-full bg-black text-[#a146e7]">
        <TiltedMarquee />
    </div>

    {/* --- TEAM CARDS SECTION --- */}
    <section className="relative w-full bg-[#000000] px-6 md:px-20 py-24 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        {teamGroups.map((group, index) => {
          if (group.members.length === 0) return null; // Skip empty groups
          
          return (
            <div key={index} className="flex flex-col">
              {/* Group Heading */}
              <div className="mb-16 border-b-4 border-white pb-4">
                <h2 className="font-bebas text-5xl md:text-6xl text-white tracking-wide">
                  {group.title}
                </h2>
              </div>

              {/* Grid: 1 col on mobile, up to 4 on desktop. 
                  gap-y-24 prevents vertical overlapping.
                  pr-12 (padding-right) and pb-12 ensure edge cards don't bleed out of screen on mobile when sliding 48px */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-24 pr-12 pb-12">
                {group.members.map((member) => (
                  <div key={member.id} className="flex justify-center sm:justify-start">
                    <Card2 data={member} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>



   </div>
  </>
  );
};

const TiltedMarquee = () => {
  const marqueeRef = useRef(null);
  const text = "MEET THE TEAM • MEET THE TEAM • MEET THE TEAM • MEET THE TEAM •";

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
    <section 
      className="relative w-full h-[20vh] flex items-center justify-center bg-black"
      style={{ overflowX: 'clip' }}
    >
      {/* FIXED: Added lg:translate-y-12 right here on the wrapper! 
        This moves the entire black band down on laptops without fighting GSAP.
        Adjust the "12" to "16" or "20" if you need it lower.
      */}
      <div className="absolute w-[200vw] rotate-10 bg-[#000000] flex select-none py-6 z-10 lg:translate-y-12">
        
        <div 
          ref={marqueeRef} 
          // Removed the translate class from here so GSAP has full control
          className="flex whitespace-nowrap will-change-transform w-max"
        >
          <span className="text-[12vw] md:text-[8vw] font-bebas font-bold leading-none uppercase text-[#a146e7] px-4">
            {text} {text}
          </span>
          <span className="text-[12vw] md:text-[8vw] font-bebas font-bold leading-none uppercase text-[#a146e7] px-4">
            {text} {text}
          </span>
        </div>
        
      </div>
    </section>
  );
};

export default Pausch;