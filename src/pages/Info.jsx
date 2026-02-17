import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { useLenis } from "../hooks/useLenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- 1. Reusable CountUp Component (Kept same) ---
const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  useLenis();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const stepTime = Math.max(Math.floor(duration / end), 20);
          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) clearInterval(timer);
          }, stepTime);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count}</span>;
};

// --- 2. The Fixed Info Page ---
const Info = () => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);

  // Use GSAP for Parallax instead of React State
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // A. Background Parallax (Moves slower than scroll)
      gsap.to(bgRef.current, {
        yPercent: 30, // Moves the image down by 30% of its height as you scroll
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true, // Smoothly links to scrollbar
        },
      });

      // B. Text Parallax (Moves slightly to create depth)
      gsap.to(textRef.current, {
        y: 100, // Slight movement
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-black overflow-hidden">
      
      {/* --- PARALLAX HERO SECTION --- */}
      <div className="relative min-h-[250vh] w-full"> 
        
        {/* 1. BACKGROUND IMAGE (Ref added) */}
        <div
          ref={bgRef}
          className="absolute inset-0 z-0 bg-cover bg-center opacity-80 h-full w-full will-change-transform"
          style={{
            backgroundImage: "url('/info.png')",
            // No inline style transform here, GSAP handles it
          }}
        />

        <div
          ref={textRef}
          className="relative z-10 flex h-screen w-full 
                     items-end justify-center pb-24      // MOBILE: Push to bottom, center horizontally, add padding
                     md:items-center md:justify-between md:pb-0 // DESKTOP: Center vertically, split horizontally
                     px-4 md:px-20 translate-y-32 will-change-transform"
        >
          {/* LEFT TEXT "IN" */}
          {/* Mobile: 42vw (Massive, fills half width) */}
          <h1 className="font-bebas text-[60vw] md:text-[40vw] leading-none text-yellow-50">
            IN
          </h1>
          
          {/* CENTER IMAGE */}
          {/* Mobile: Floating at the top (top-[15%]) */}
          {/* Desktop: Centered vertically and horizontally */}
          <div className="absolute left-1/2 -translate-x-1/2 
                          top-[15%] h-[30vh] 
                          md:top-1/2 md:-translate-y-1/2 md:h-[70%] 
                          w-auto transition-all duration-500">
            <img
              src="/ntl-text.png"
              alt="NTL Text"
              className="h-full w-auto object-contain"
            />
          </div>

          {/* RIGHT TEXT "FO" */}
          {/* Mobile: 42vw (Massive) */}
          <h1 className="font-bebas text-[60vw] md:text-[40vw] leading-none text-yellow-50 text-right">
            FO
          </h1>
        </div>

        
        {/* 3. SCROLLING TEXT SECTIONS */}
        <section className="relative mt-60 h-screen w-full bg-transparent px-6 md:px-12 py-24 flex flex-col justify-between z-20 pointer-events-none">
          {/* pointer-events-none allows clicks to pass through if needed, remove if you have links here */}
          
          <div className="w-full flex justify-start">
            <div className="max-w-[80%] md:max-w-[70%]">
              <h2 className="font-bebas text-6xl md:text-8xl text-white leading-[0.85] text-left tracking-tighter shadow-black drop-shadow-lg">
                STUDENT LED{" "}
                <span className="font-ephesis md:text-9xl text-yellow-200">Innovation</span>{" "}
                LAB, <br /> TECH LAB, RESEARCH LAB
              </h2>
            </div>
          </div>

          <div className="w-full flex justify-end">
            <div className="max-w-[80%] md:max-w-[70%]">
              <h2 className="font-bebas text-6xl md:text-8xl text-white leading-[0.85] text-left tracking-tighter shadow-black drop-shadow-lg">
                INDIA'S FIRST{" "}
                <span className="font-ephesis text-yellow-200">QS Ranked </span>{" "}
                LAB <br /> IN SRM AP UNIVERSITY LOREM IPSUM
              </h2>
            </div>
          </div>
        </section>

        {/* 4. "WHY ARE WE DIFFERENT?" SECTION */}
        <section className="relative z-20 w-full px-6 py-32 mt-20"> 
          <div className="mx-auto flex w-min flex-col gap-4 md:gap-6">
            {/* Added backdrop blur to make text readable over moving background */}
            
            <h2 className="whitespace-nowrap text-center font-bebas text-5xl md:text-5xl leading-[0.85] tracking-tight text-yellow-50 uppercase">
              WHY ARE WE DIFFERENT?
            </h2>

            <p className="font-roboto-mono text-lg md:text-sm text-gray-200 leading-relaxed text-left w-full">
              We are not just a research lab. Next Tech Lab is a vibrant ecosystem where 
              innovation meets collaboration. Our lab goes beyond traditional boundaries 
              by hosting regular events that foster learning, creativity, and community building.
              <br /><br />
              Individuals are highly motivated to accomplish their dreams and interests in the 
              lab with highly advanced equipment and a supportive environment that encourages 
              experimentation and growth.
            </p>
          </div>
        </section>

      </div>

      {/* STATS SECTION (Solid Background covers the parallax image) */}
      <section className="light-section relative z-30 w-full bg-[#EAEAE5] px-6 py-40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
          
          {/* STAT 1 */}
          <div className="flex flex-col items-center text-center group">
            <span className="font-roboto-mono text-sm md:text-base tracking-widest text-gray-500 mb-2">
              [ 1 ]
            </span>
            <h3 className="font-bebas text-5xl md:text-7xl text-[#1A1A1A] leading-none uppercase">
              <CountUp end={20} />+ HACKATHON WINS
            </h3>
            <div className="h-px w-24 bg-[#1A1A1A]/20 my-6" />
            <p className="font-roboto-mono text-base md:text-lg text-gray-600 leading-relaxed max-w-sm">
              We go, we win, we conquer. Our team consistently pushes the boundaries of 
              rapid prototyping, securing top positions in global hackathons.
            </p>
          </div>

          {/* STAT 2 */}
          <div className="flex flex-col items-center text-center group">
            <span className="font-roboto-mono text-sm md:text-base tracking-widest text-gray-500 mb-2">
              [ 2 ]
            </span>
            <h3 className="font-bebas text-5xl md:text-7xl text-[#1A1A1A] leading-none uppercase">
              <CountUp end={50} />+ LIVE PROJECTS
            </h3>
            <div className="h-px w-24 bg-[#1A1A1A]/20 my-6" />
            <p className="font-roboto-mono text-base md:text-lg text-gray-600 leading-relaxed max-w-sm">
              From concept to deployment, our lab has delivered over 50 real-world 
              applications that solve actual problems.
            </p>
          </div>

          {/* STAT 3 */}
          <div className="flex flex-col items-center text-center group">
            <span className="font-roboto-mono text-sm md:text-base tracking-widest text-gray-500 mb-2">
              [ 3 ]
            </span>
            <h3 className="font-bebas text-5xl md:text-7xl text-[#1A1A1A] leading-none uppercase">
              <CountUp end={10} /> PATENTS FILED
            </h3>
            <div className="h-px w-24 bg-[#1A1A1A]/20 my-6" />
            <p className="font-roboto-mono text-base md:text-lg text-gray-600 leading-relaxed max-w-sm">
              Inventing new things is at our core. Our portfolio of patents stands as a 
              testament to our dedication to novel research.
            </p>
          </div>

          {/* STAT 4 */}
          <div className="flex flex-col items-center text-center group">
            <span className="font-roboto-mono text-sm md:text-base tracking-widest text-gray-500 mb-2">
              [ 4 ]
            </span>
            <h3 className="font-bebas text-5xl md:text-7xl text-[#1A1A1A] leading-none uppercase">
              <CountUp end={15} /> RESEARCH PAPERS
            </h3>
            <div className="h-px w-24 bg-[#1A1A1A]/20 my-6" />
            <p className="font-roboto-mono text-base md:text-lg text-gray-600 leading-relaxed max-w-sm">
              Knowledge grows when shared. Our members actively contribute to the scientific 
              community through top-tier conferences.
            </p>
          </div>

        </div>
      </section>
      
    </div>
  );
};

export default Info;