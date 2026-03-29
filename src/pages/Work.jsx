import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "../components/ProjectCard";
import AnimatedHeading from "../animations/AnimatedHeading";
import FadeDropIn from "../animations/FadeDropIn";
import projects from "../projects/projects.json"; // <-- Imported the JSON file here

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    // matchMedia ensures this animation ONLY runs on screens 768px and wider (Desktop)
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.to(textRef.current, {
        y: -150,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600",
          scrub: true,
        },
      });
    });

    return () => mm.revert(); // Automatically cleans up everything on unmount
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#EAEAE5]">
      {/* --- LAYER 1: HERO BACKGROUND --- */}
      {/* Changed to "relative md:sticky" -> Scrolls normally on mobile, pins on desktop */}
      <div className="relative md:sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* TEXT LAYER */}
        {/* Mobile: Anchored to bottom, centered with gap. Desktop: Centered vertically, spread apart */}
        <div
          ref={textRef}
          className="absolute w-full z-10 flex flex-col md:flex-row items-center px-4 md:px-20 pointer-events-none 
             bottom-0 justify-center gap-y-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:justify-between md:gap-y-0"
        >
          <AnimatedHeading
            text="FEATURED"
            as="h1"
            className="font-bebas text-[28vw] md:text-[12rem] leading-none text-[#1A1A1A] text-center md:text-left"
            delay={0}
          />
          <AnimatedHeading
            text="PROJECTS"
            as="h1"
            className="font-bebas text-[28vw] md:text-[12rem] leading-none text-[#1A1A1A] text-center md:justify-end"
            delay={0.2}
          />
        </div>
        {/* CENTER IMAGE LAYER */}
        {/* Mobile: Pushed up slightly and made larger. Desktop: Centered and standard size */}
        <div
          className="absolute z-0 flex items-center justify-center pointer-events-none 
                         top-[15%] h-[50vh] md:top-auto md:h-[60%] w-auto"
        >
          <FadeDropIn delay={0.1} className="h-full w-full">
            <img
              src="/ntl-text.svg"
              alt="NTL"
              className="h-full w-auto object-contain"
            />
          </FadeDropIn>
        </div>
      </div>

      {/* --- LAYER 2: THE PROJECTS GRID --- */}
      <div className="relative z-20 w-full pb-40">
        <div className="container mx-auto px-4 md:px-10">
          {/* Added pt-10 md:pt-0 so the grid has breathing room below the mobile text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-32 gap-y-20 w-full pt-10 md:pt-0">
            {projects.map((p) => (
              <div key={p.id} className="w-[90%] md:w-[80%] mx-auto">
                <ProjectCard
                  src={p.src}
                  title={p.title}
                  category={p.category}
                  link={p.link} // Passed the link prop to match your updated ProjectCard and JSON
                  className="h-[40vh] md:h-[50vh] "
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