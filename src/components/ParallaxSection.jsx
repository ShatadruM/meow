import React, { useRef, useState, useEffect } from 'react';

const ParallaxSection = ({ imageSrc, title, linkText, linkUrl }) => {
  const sectionRef = useRef(null);
  const [scrollData, setScrollData] = useState({ scrollY: 0, sectionTop: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (sectionRef.current) {
        setScrollData(prev => ({
          ...prev,
          sectionTop: sectionRef.current.offsetTop
        }));
      }
    };

    const handleScroll = () => {
      setScrollData(prev => ({ 
        ...prev, 
        scrollY: window.scrollY 
      }));
    };

    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const relativeScroll = scrollData.scrollY - scrollData.sectionTop;
  const imageMove = relativeScroll * 0.2; 
  const textMove = relativeScroll * -0.1;

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen w-full z-40 overflow-hidden bg-black shadow-2xl border-t border-white/10"
    >
      {/* WRAPPER */}
      <div 
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ transform: `translateY(${imageMove}px)` }}
      >
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${imageSrc}')` }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* CONTENT */}
      <div 
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ transform: `translateY(${textMove}px)` }}
      >
        {/* Render Title (Accepts JSX for line breaks) */}
        <h2 className="font-bebas text-5xl md:text-8xl text-white tracking-tighter uppercase leading-none">
          {title}
        </h2>

        {/* Dynamic Link */}
        <a 
          href={linkUrl} 
          className="mt-12 font-nunito text-lg md:text-xl text-amber-50"
        >
          <span className="relative z-10 underline underline-offset-8 decoration-1">
            {linkText}
          </span>
        </a>
      </div>
    </section>
  );
};

export default ParallaxSection;