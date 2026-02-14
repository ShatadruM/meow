import React, { useState, useEffect } from 'react';

const VideoParallaxSection = ({ videoSrc, title, description, linkUrl }) => {
  const [sectionNode, setSectionNode] = useState(null);
  const [scrollData, setScrollData] = useState({ scrollY: 0, sectionTop: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (sectionNode) {
        setScrollData(prev => ({ ...prev, sectionTop: sectionNode.offsetTop }));
      }
    };

    const handleScroll = () => {
      setScrollData(prev => ({ ...prev, scrollY: window.scrollY }));
    };

    if (sectionNode) {
      handleResize();
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [sectionNode]);

  const relativeScroll = scrollData.scrollY - scrollData.sectionTop;
  const videoMove = relativeScroll * 0.2; 
  const textMove = relativeScroll * -0.1;

  return (
    <section 
      ref={setSectionNode}
      // CHANGED: Added 'sticky top-0'. This makes it stack over the previous one.
      className="sticky top-0 h-screen w-full z-40 overflow-hidden bg-black border-t border-white/10 shadow-2xl"
    >
      {/* 1. VIDEO LAYER */}
      <div 
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ transform: `translateY(${videoMove}px)` }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* 2. CONTENT LAYER */}
      <div 
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ transform: `translateY(${textMove}px)` }}
      >
        <h2 className="font-bebas text-6xl md:text-[20rem] text-yellow-50 tracking-tighter uppercase leading-none mb-6" >
          {title}
        </h2>
        
        <p className="font-nunito text-lg md:text-xl text-yellow-50 max-w-xl mb-10 leading-relaxed">
          {description}
        </p>

        <a 
          href={linkUrl}
          className="group relative px-10 py-4 border border-white text-white font-bebas text-xl tracking-widest uppercase overflow-hidden transition-all duration-300 hover:text-black"
        >
          <span className="absolute inset-0 w-full h-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out -z-10" />
          VIEW
        </a>
      </div>
    </section>
  );
};

export default VideoParallaxSection;