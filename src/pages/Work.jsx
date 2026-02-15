import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from '../components/ProjectCard';
import { animateLeft, animateRight } from '../hooks/useCenterOut';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: "CORTEX", category: "ERP", src: "/image1.png" },
  { id: 2, title: "HUSH", category: "APP DEVELOPMENT", src: "/image2.png" },
  { id: 3, title: "ROBO", category: "IOT", src: "/image3.png" },
  { id: 4, title: "HACKER", category: "CYBERSECURITY", src: "/image1.png" },
];

const Work = () => {
  const containerRef = useRef(null);
  const projectContainerRef = useRef(null);

 useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- 1. LOAD ANIMATION ---
      animateLeft(".left-text-char");
      animateRight(".right-text-char");


      // --- 2. PROJECT SCROLL ANIMATION ---
      gsap.set(projectContainerRef.current, { y: "100vh" });

      gsap.to(projectContainerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
        },
        y: -200, 
        ease: "none",
      });


      // --- 3. TEXT OPACITY ANIMATION (FIXED) ---
      // We use fromTo to guarantee the text starts at Opacity 1 and goes to 0
      gsap.fromTo([".left-text-char", ".right-text-char"], 
        { 
          opacity: 1 // Start State
        },
        {
          opacity: 0, // End State
          ease: "power1.inOut",
          stagger: 0.01,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=300%",
            scrub: true, // Instant scrub response
          },
          overwrite: "auto" // Ensures this takes priority over load animation
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden bg-[#EAEAE5]"
    >
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="relative z-10 flex h-full w-full items-center justify-between px-4 md:px-20 pointer-events-none">
        {/* Left Text */}
        <h1 className="font-bebas text-[12vw] md:text-[11rem] leading-none text-[#1A1A1A] text-left">
          {"FEATURED".split("").map((char, index) => (
            <span key={index} className="left-text-char inline-block will-change-transform">
              {char}
            </span>
          ))}
        </h1>

        {/* Center Image */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[70%] w-auto z-20">
          <img 
            src="/ntl-text.png" 
            alt="NTL Text" 
            className="h-full w-auto object-contain" 
          />
        </div>

        {/* Right Text */}
        <h1 className="font-bebas text-[12vw] md:text-[11rem] leading-none text-[#1A1A1A] text-right">
          {"PROJECTS".split("").map((char, index) => (
            <span key={index} className="right-text-char inline-block will-change-transform">
              {char}
            </span>
          ))}
        </h1>
      </div>

      {/* --- FOREGROUND PROJECT LAYER --- */}
      {/* 1. h-full & w-full: Takes up full screen size 
          2. absolute inset-0: Overlays the text
          3. pt-20: Adds some padding so projects don't hit the absolute top
      */}
      <div 
        ref={projectContainerRef}
        className="absolute inset-0 z-30 flex flex-col items-start justify-start pt-[10vh] px-4 md:px-24 w-full h-full pointer-events-auto"
      >
          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-32 lg:gap-x-60 gap-y-20 w-full">
            {projects.map((project, index) => (
             <div 
                    key={project.id} 
                    // WIDTH CHANGE: w-[85%] mx-auto makes cards narrower and centered in their column
                    className={`w-[85%] mx-auto `}
                  >
                <ProjectCard 
                  src={project.src}
                  title={project.title}
                  category={project.category}
                  // SMALLER CARDS: Force height to 40vh
                  className="h-[40vh] md:h-[45vh]"
                />
              </div>
            ))}
          </div>
      </div>

    </section>
  );
};

export default Work;