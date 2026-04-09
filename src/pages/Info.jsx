import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import AnimatedHeading from "../animations/AnimatedHeading";
import FadeDropIn from "../animations/FadeDropIn";
import { useLenis } from "../hooks/useLenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card2 from "../components/Card2"; 
import FA from "../members/FA.json";

gsap.registerPlugin(ScrollTrigger);

// CountUp Component
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
          // Increment by 5 if end is greater than 200, otherwise increment by 1
          const increment = end > 200 ? 5 : 1;
          const steps = Math.ceil(end / increment);
          const stepTime = Math.max(Math.floor(duration / steps), 20);
          
          const timer = setInterval(() => {
            start += increment;
            if (start > end) start = end; // Prevent overshooting the target number
            setCount(start);
            if (start >= end) clearInterval(timer);
          }, stepTime);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count}</span>;
};


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
    <div
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden"
    >
      {/* HERO SECTION */}
      <div data-nav-color="white" className="relative min-h-[250vh] w-full">
        
        <div
          ref={bgRef}
          className="absolute inset-0 z-0 opacity-80 h-full w-full will-change-transform 
              bg-center bg-no-repeat bg-cover
              bg-[url('https://d3fmezyua6t45b.cloudfront.net/info-page/info-mob-mine.png')] 
              md:bg-[url('https://d3fmezyua6t45b.cloudfront.net/info-page/info-deskt.png')]"
        />
        <div
          ref={textRef}
          className="relative z-10 flex h-screen w-full 
              items-end justify-center pb-24      
              md:items-center md:justify-between md:pb-0 
              px-4 md:px-20 translate-y-32 will-change-transform"
        >
          {/* LEFT TEXT "IN" */}
          <AnimatedHeading
            text="IN"
            as="h1"
            className="font-bebas text-[60vw] md:text-[40vw] leading-none text-yellow-50"
          />

          {/* CENTER IMAGE */}
          <div
            className="absolute left-1/2 -translate-x-1/2 
                  top-[15%] h-[30vh] 
                  md:top-1/2 md:-translate-y-1/2 md:h-[70%] 
                  w-auto transition-all duration-500"
          >
            <FadeDropIn
              delay={0.3}
              className="h-full w-full flex items-center justify-center"
            >
              <img
                src="/ntl-text.svg"
                alt="NTL Text"
                className="h-full w-auto object-contain"
              />
            </FadeDropIn>
          </div>

          {/* RIGHT TEXT "FO" */}
          <AnimatedHeading
            text="FO"
            as="h1"
            className="font-bebas text-[60vw] md:text-[40vw] leading-none text-yellow-50 justify-end"
            delay={0.4}
          />
        </div>

        {/* SCROLLING TEXT SECTIONS */}
        <section className="relative mt-60 h-screen w-full bg-transparent px-6 md:px-12 py-24 flex flex-col gap-20 justify-between z-20 pointer-events-none">
           <div className="w-full flex justify-start">
            <div className="max-w-[80%] md:max-w-[70%]">
              <h2 data-cursor="hover" className="font-bebas text-6xl md:text-8xl text-white leading-[0.85] text-left tracking-tighter shadow-black drop-shadow-lg">
                STUDENT{" "}
                <span className="font-ephesis md:text-9xl text-yellow-200">
                  Built.
                </span>{" "}
                STUDENT{" "}
                <span className="font-ephesis md:text-9xl text-yellow-200">
                 Grown.
                </span>{" "} 
                STUDENT{" "}
                <span className="font-ephesis md:text-9xl text-yellow-200">
                 Governed.
                </span>
              </h2>
            </div>
          </div>

          <div data-cursor="hover" className="w-full flex justify-end">
            <div  className="max-w-[80%] md:max-w-[70%]">
              <h2  className="font-bebas text-6xl md:text-8xl text-white leading-[0.85] text-left tracking-tighter shadow-black drop-shadow-lg">
                INDIA'S FIRST{" "}
                <span className="font-ephesis text-yellow-200">QS Ranked </span>
                {" "}R&D LAB <br /> BY STUDENTS.
              </h2>
            </div>
          </div>
        </section>

        {/* "WHY ARE WE DIFFERENT?" SECTION */}
        <section className="relative z-20 w-full px-6 py-32 mt-20">
          <div className="mx-auto flex w-min flex-col gap-4 md:gap-6">
            <h2 data-cursor="hover" className="whitespace-nowrap text-center font-bebas text-5xl md:text-5xl leading-[0.85] tracking-tight text-yellow-50 uppercase">
              WHY ARE WE DIFFERENT?
            </h2>

            <p data-cursor="hover" className="font-roboto-mono text-lg md:text-sm text-gray-200 leading-relaxed text-left w-full">
              Next Tech Lab is a proven student experiment on re-imagining education. 
              We hustle like startups, and grow ourselves in an ecosystem of freedom, creativity and legion.
              <br />
              <br />
              Here, individuals accelerate themselves to search the "Next" through advanced technologies all condensed inside a 
              common lab space that encourages experimentation and growth.
            </p>
          </div>
        </section>

        
      </div>
      <section data-nav-color="white" className="relative z-20 w-full bg-black px-6 py-32">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-20 ">
            <div className="mb-16 border-b-4 border-white pb-4">
              <h2 data-cursor="hover" className="whitespace-nowrap text-center font-bebas text-5xl md:text-8xl leading-[0.85] tracking-tight text-yellow-50 uppercase">
              Faculty Advisors
            </h2>
            </div>
            

            <div className="flex flex-col gap-24">
              {/* Professor 1: Dr. Suvendu Rana (Card Left, Quote Right) */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
                <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                  {/* Passing the first object from FA.json into the data prop */}
                  <Card2 data={FA[0]} />
                </div>
                <div className="w-full md:w-1/2 flex justify-center md:justify-end text-center md:text-right">
                  <p className="font-roboto-mono text-xl md:text-xl text-gray-300 italic leading-relaxed">
                    "NTL began as an experiment to bridge the gap between the classroom and the industry; today, it’s a community that has gone far beyond that, building the future on its own terms."
                    </p>
                </div>
              </div>

              {/* Professor 2: Dr. Ashu Abdul (Quote Left, Card Right) */}
              <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-10 md:gap-16">
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                  {/* Passing the second object from FA.json into the data prop */}
                  <Card2 data={FA[1]} />
                </div>
                <div className="w-full md:w-1/2 flex justify-center md:justify-start text-center md:text-left">
                  <p className="font-roboto-mono text-xl md:text-xl text-gray-300 italic leading-relaxed">
                    "Aligned with SRM University AP’s vision of transforming students through excellence in education and research, Next Tech Lab empowers young minds to learn, create, and lead with purpose."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      
      <section data-nav-color="black" className="light-section relative z-30 w-full bg-[#EAEAE5] px-6 py-40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
          {/* STAT 1 */}
          <div className="flex flex-col items-center text-center group">
            <span className="font-roboto-mono text-sm md:text-base tracking-widest text-gray-500 mb-2">
              [ 1 ]
            </span>
            <h3 className="font-bebas text-5xl md:text-7xl text-[#1A1A1A] leading-none uppercase">
              <CountUp end={150} />+ HACKATHON WINS
            </h3>
            <div className="h-px w-24 bg-[#1A1A1A]/20 my-6" />
            <p className="font-roboto-mono text-base md:text-lg text-gray-600 leading-relaxed max-w-sm">
              We go, we win, we conquer. Our team consistently pushes the
              boundaries of rapid prototyping, securing top positions in global
              hackathons.
            </p>
          </div>

          {/* STAT 2 */}
          <div className="flex flex-col items-center text-center group">
            <span className="font-roboto-mono text-sm md:text-base tracking-widest text-gray-500 mb-2">
              [ 2 ]
            </span>
            <h3 className="font-bebas text-5xl md:text-7xl text-[#1A1A1A] leading-none uppercase">
              <CountUp end={500} />+ LIVE PROJECTS
            </h3>
            <div className="h-px w-24 bg-[#1A1A1A]/20 my-6" />
            <p className="font-roboto-mono text-base md:text-lg text-gray-600 leading-relaxed max-w-sm">
              From concept to deployment, our lab has delivered over 50
              real-world applications that solve actual problems.
            </p>
          </div>

          {/* STAT 3 */}
          <div className="flex flex-col items-center text-center group">
            <span className="font-roboto-mono text-sm md:text-base tracking-widest text-gray-500 mb-2">
              [ 3 ]
            </span>
            <h3 className="font-bebas text-5xl md:text-7xl text-[#1A1A1A] leading-none uppercase">
              <CountUp end={20} /> PATENTS FILED
            </h3>
            <div className="h-px w-24 bg-[#1A1A1A]/20 my-6" />
            <p className="font-roboto-mono text-base md:text-lg text-gray-600 leading-relaxed max-w-sm">
              Inventing new things is at our core. Our portfolio of patents
              stands as a testament to our dedication to novel research.
            </p>
          </div>

          {/* STAT 4 */}
          <div className="flex flex-col items-center text-center group">
            <span className="font-roboto-mono text-sm md:text-base tracking-widest text-gray-500 mb-2">
              [ 4 ]
            </span>
            <h3 className="font-bebas text-5xl md:text-7xl text-[#1A1A1A] leading-none uppercase">
              <CountUp end={50} /> + RESEARCH PAPERS
            </h3>
            <div className="h-px w-24 bg-[#1A1A1A]/20 my-6" />
            <p className="font-roboto-mono text-base md:text-lg text-gray-600 leading-relaxed max-w-sm">
              Knowledge grows when shared. Our members actively contribute to
              the scientific community through top-tier conferences.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Info;