import React, { useState, useEffect, useRef } from "react";
const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const stepTime = Math.max(Math.floor(duration / end), 20); // Speed of count
          
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
const Info = () => {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        setOffset(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgMove = offset * 0.5;
  const fgMove = offset * 0.1;

  return (
    <div ref={sectionRef} className="relative w-full overflow-hidden bg-black">
      
      {/* --- PARALLAX HERO SECTION WRAPPER --- */}
      {/* Increased height to min-h-[250vh] to accommodate the new content comfortably */}
      <div className="relative min-h-[250vh] w-full"> 
        
        {/* 1. BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-80 h-full"
          style={{
            backgroundImage: "url('/info.png')",
            transform: `translateY(${bgMove}px)`,
          }}
        />

        {/* 2. MAIN "IN-FO" CONTENT */}
        <div
          className="relative z-10 flex h-screen w-full items-center justify-between px-4 md:px-20 translate-y-32"
          style={{ transform: `translateY(${fgMove}px)` }}
        >
          <h1 className="font-bebas text-[45rem] md:text-[45vw] leading-none text-yellow-50">IN</h1>
          
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[70%] w-auto">
            <img
              src="/ntl-text.png"
              alt="NTL Text"
              className="h-full w-auto object-contain"
            />
          </div>

          <h1 className="font-bebas text-[45rem] md:text-[45vw] leading-none text-yellow-50 text-right">FO</h1>
        </div>

       
        <section className="relative mt-60 h-screen w-full bg-transparent px-6 md:px-12 py-24 flex flex-col justify-between overflow-hidden z-20">
          <div className="w-full flex justify-start">
            <div className="max-w-[70%]">
              <h2 className="font-bebas text-6xl md:text-8xl text-white leading-[0.85] text-left tracking-tighter">
                STUDENT LED{" "}
                <span className="font-ephesis md:text9xl text-yellow-200">Innovation</span>{" "}
                LAB, <br /> TECH LAB, RESEARCH LAB
              </h2>
            </div>
          </div>

          <div className="w-full flex justify-end">
            <div className="max-w-[70%]">
              <h2 className="font-bebas text-6xl md:text-8xl text-white leading-[0.85] text-left tracking-tighter">
                INDIA'S FIRST{" "}
                <span className="font-ephesis text-yellow-200">QS Ranked </span>{" "}
                LAB <br /> IN SRM AP UNIVERSITY LOREM IPSUM
              </h2>
            </div>
          </div>
        </section>

        {/* 4. "WHY ARE WE DIFFERENT?" SECTION (Moved Inside) */}
        <section className="relative z-20 w-full px-6 py-32 mt-20"> {/* Added mt-40 for spacing */}
          
          {/* CONTENT CONTAINER */}
          <div className="mx-auto flex w-min flex-col gap-4 md:gap-6">
            
            {/* HEADING */}
            <h2 className="whitespace-nowrap text-center font-bebas text-5xl md:text-5xl leading-[0.85] tracking-tight text-yellow-50 uppercase">
              WHY ARE WE DIFFERENT?
            </h2>

            {/* PARAGRAPH */}
            {/* Changed text color to gray-300 for readability on dark bg */}
            <p className="font-roboto-mono text-lg md:text-sm text-white leading-relaxed text-left w-full">
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
      {/* STATS SECTION */}
      <section className="relative z-30 w-full bg-[#EAEAE5] px-6 py-40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
          
          {/* STAT 1 */}
          <div className="flex flex-col items-center text-center group">
            {/* Top Tag */}
            <span className="font-roboto-mono text-sm md:text-base tracking-widest text-gray-500 mb-2">
              [ 1 ]
            </span>
            
            {/* Heading */}
            <h3 className="font-bebas text-5xl md:text-7xl text-[#1A1A1A] leading-none uppercase">
              <CountUp end={20} />+ HACKATHON WINS
            </h3>
            
            {/* --- THE SEPARATOR LINE --- */}
            <div className="h-px w-24 bg-[#1A1A1A]/20 my-6" />
            
            {/* Paragraph */}
            <p className="font-roboto-mono text-base md:text-lg text-gray-600 leading-relaxed max-w-sm">
              We go, we win, we conquer. Our team consistently pushes the boundaries of 
              rapid prototyping, securing top positions in global hackathons by delivering 
              innovative solutions under extreme pressure.
            </p>
          </div>

          {/* STAT 2 */}
          <div className="flex flex-col items-center text-center group">
            <span className="font-roboto-mono text-sm md:text-base tracking-widest text-gray-500 mb-2">
              [ 2 ]
            </span>
            <h3 className="font-bebas text-5xl md:text-7xl text-[#1A1A1A] leading-none uppercase">
              <CountUp end={50} />+LIVE PROJECTS
            </h3>
            
            {/* --- THE SEPARATOR LINE --- */}
            <div className="h-px w-24 bg-[#1A1A1A]/20 my-6" />
            
            <p className="font-roboto-mono text-base md:text-lg text-gray-600 leading-relaxed max-w-sm">
              We have the stuff to show. From concept to deployment, our lab has delivered 
              over 50 real-world applications that solve actual problems, demonstrating 
              our commitment to practical, impact-driven engineering.
            </p>
          </div>

          {/* STAT 3 */}
          <div className="flex flex-col items-center text-center group">
            <span className="font-roboto-mono text-sm md:text-base tracking-widest text-gray-500 mb-2">
              [3]
            </span>
            <h3 className="font-bebas text-5xl md:text-7xl text-[#1A1A1A] leading-none uppercase">
              {<CountUp end={10} />} PATENTS FILED
            </h3>
            
            {/* --- THE SEPARATOR LINE --- */}
            <div className="h-px w-24 bg-[#1A1A1A]/20 my-6" />
            
            <p className="font-roboto-mono text-base md:text-lg text-gray-600 leading-relaxed max-w-sm">
              Inventing new things is at our core. We don't just use technology; we create it. 
              Our portfolio of patents stands as a testament to our dedication to novel 
              research and intellectual property creation.
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
            
            {/* --- THE SEPARATOR LINE --- */}
            <div className="h-px w-24 bg-[#1A1A1A]/20 my-6" />
            
            <p className="font-roboto-mono text-base md:text-lg text-gray-600 leading-relaxed max-w-sm">
              Adding to the community. Knowledge grows when shared. Our members actively 
              contribute to the scientific community, publishing rigorous research in 
              top-tier conferences and journals.
            </p>
          </div>

        </div>
      </section>
      
    </div>
  );
};

export default Info;