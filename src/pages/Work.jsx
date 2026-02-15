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
  const textRef = useRef(null);
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. INTRO ANIMATION (Blur In)
      gsap.fromTo(".work-text-char", 
        { opacity: 0, filter: "blur(15px)", y: 50 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.5, ease: "power3.out", stagger: 0.02 }
      );

      // 2. SCROLL ANIMATION (Projects Up, Text Fade Out)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%", // Length of scroll
          pin: true,
          scrub: 1,
        }
      });

      // Start grid below viewport
      gsap.set(gridRef.current, { y: "100vh" });

      // Move Grid Up
      tl.to(gridRef.current, {
        y: -150, // Move up past header
        duration: 10,
        ease: "none"
      });

      // Fade Text Out (Delayed start so it doesn't vanish instantly)
      tl.to(textRef.current, {
        opacity: 0,
        y: -50,
        duration: 5,
        ease: "power1.in"
      }, "<+2"); // Start 20% into the grid movement

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#EAEAE5]">
      
      {/* --- BACKGROUND TEXT LAYER --- */}
      <div ref={textRef} className="relative z-10 flex h-full w-full items-center justify-center md:justify-between px-2 md:px-20 pointer-events-none">
        
        {/* Left Text */}
        <h1 className="font-bebas text-[12vw] md:text-[11rem] leading-none text-[#1A1A1A] shrink-0">
          {"FEATURED".split("").map((char, i) => (
            <span key={i} className="work-text-char inline-block">{char}</span>
          ))}
        </h1>

        {/* Center Image */}
        <div className="mx-2 md:mx-0 h-[15%] md:h-[60%] w-auto z-20">
          <img src="/ntl-text.png" alt="NTL" className="h-full w-auto object-contain" />
        </div>

        {/* Right Text */}
        <h1 className="font-bebas text-[12vw] md:text-[11rem] leading-none text-[#1A1A1A] shrink-0">
          {"PROJECTS".split("").map((char, i) => (
            <span key={i} className="work-text-char inline-block">{char}</span>
          ))}
        </h1>
      </div>

      {/* --- FOREGROUND PROJECT GRID --- */}
      <div ref={gridRef} className="absolute inset-0 z-30 flex flex-col items-center pt-[15vh] w-full h-full pointer-events-auto">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-32 gap-y-20 w-full">
               {projects.map((p, i) => (
                  <div key={p.id} className={`w-[90%] md:w-[80%] mx-auto ${i % 2 !== 0 ? "md:translate-y-24" : ""}`}>
                     <ProjectCard src={p.src} title={p.title} category={p.category} className="h-[40vh] md:h-[50vh]" />
                  </div>
               ))}
            </div>
         </div>
      </div>
    </section>
  );
};

export default Work;