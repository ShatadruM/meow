import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from '../components/ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: "CORTEX", category: "ERP", src: "/image1.png" },
  { id: 2, title: "HUSH", category: "APP", src: "/image2.png" },
  { id: 3, title: "ROBO", category: "IOT", src: "/image3.png" },
  { id: 4, title: "HACKER", category: "SEC", src: "/image1.png" },
];

const Work = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);   // Layer 1: Text
  // imageRef is static, no ref needed for animation
  const gridRef = useRef(null);   // Layer 3: Projects

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- 1. INITIAL LOAD ANIMATION (Blur In) ---
      // Runs once on mount. 
      // We use clearProps: "all" at the end to ensure no CSS conflicts later.
      gsap.fromTo(".work-text-char", 
        { opacity: 0, filter: "blur(15px)", y: 50 },
        { 
          opacity: 1, 
          filter: "blur(0px)", 
          y: 0, 
          duration: 1.5, 
          ease: "power3.out", 
          stagger: 0.02
        }
      );

      // --- 2. SCROLL SETUP ---
      
      // Force projects to start completely below the viewport
      gsap.set(gridRef.current, { y: "100vh" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%", // Controls how long the scroll lasts
          pin: true,     // Pins the section
          scrub: 1,      // Smooth scrubbing
          anticipatePin: 1 // Helps prevent jitter on fast scrolls
        }
      });

      // --- 3. SCROLL ANIMATIONS ---

      // A. Text Moves UP (No Opacity Change)
      // It moves up slightly to create parallax separation
      tl.to(textRef.current, {
        y: -150,      
        duration: 5,  
        ease: "none"
      }, 0);

      // B. Projects Slide UP (Covering everything)
      // Moves from 100vh to -100px
      tl.to(gridRef.current, {
        y: -100,      
        duration: 10, 
        ease: "none"
      }, 0);

      // C. Center Image is STATIC (Not in timeline)
      // It will stay pinned exactly where it is.

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      // BG COLOR IS CRITICAL HERE to prevent "White Screen" during pinning
      className="relative h-screen w-full overflow-hidden bg-[#EAEAE5]"
    >
      
      {/* --- LAYER 1: TEXT (Moves Up) --- */}
      {/* z-10: Above Image, Below Projects */}
      <div 
        ref={textRef}
        className="absolute inset-0 z-10 flex items-center justify-between px-4 md:px-20 pointer-events-none"
      >
        {/* Left Text */}
        <h1 className="font-bebas text-[12vw] md:text-[11rem] leading-none text-[#1A1A1A] shrink-0">
          {"FEATURED".split("").map((char, i) => (
            <span key={i} className="work-text-char inline-block">{char}</span>
          ))}
        </h1>

        {/* Right Text */}
        <h1 className="font-bebas text-[12vw] md:text-[11rem] leading-none text-[#1A1A1A] shrink-0">
          {"PROJECTS".split("").map((char, i) => (
            <span key={i} className="work-text-char inline-block">{char}</span>
          ))}
        </h1>
      </div>


      {/* --- LAYER 2: CENTER IMAGE (Static) --- */}
      {/* z-0: At the bottom. Static. */}
      <div 
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        {/* Responsive sizing: h-[20%] mobile, h-[60%] desktop */}
        <div className="h-[20%] md:h-[60%] w-auto">
          <img 
            src="/ntl-text.png" 
            alt="NTL" 
            className="h-full w-auto object-contain" 
          />
        </div>
      </div>


      {/* --- LAYER 3: PROJECTS (Slides Up) --- */}
      {/* z-20: Top layer. Covers text and image. */}
      <div 
        ref={gridRef}
        className="absolute inset-0 z-20 flex flex-col items-center pt-[15vh] w-full h-full pointer-events-auto"
      >
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-32 gap-y-20 w-full pb-32">
               {projects.map((p, i) => (
                  <div 
                    key={p.id} 
                    className={`w-[90%] md:w-[80%] mx-auto ${i % 2 !== 0 ? "md:translate-y-24" : ""}`}
                  >
                     <ProjectCard 
                        src={p.src} 
                        title={p.title} 
                        category={p.category} 
                        className="h-[40vh] md:h-[50vh]" 
                     />
                  </div>
               ))}
            </div>
         </div>
      </div>

    </section>
  );
};

export default Work;