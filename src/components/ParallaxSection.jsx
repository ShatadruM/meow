import React, { useState, useEffect } from 'react'; 
import ImageTrail from './ImageTrail'; 

const ParallaxSection = ({ imageSrc, title, linkText, linkUrl, enableTrail = false }) => {
  const [sectionNode, setSectionNode] = useState(null);
  const [scrollData, setScrollData] = useState({ scrollY: 0, sectionTop: 0 });

  useEffect(() => {
    // We only attach listeners if the node actually exists
    if (!sectionNode) return;

    const handleResize = () => {
        setScrollData(prev => ({ 
            ...prev, 
            sectionTop: sectionNode.offsetTop 
        }));
    };
    
    const handleScroll = () => {
        setScrollData(prev => ({ 
            ...prev, 
            scrollY: window.scrollY 
        }));
    };

    // Initial measurement
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [sectionNode]); 

  const relativeScroll = scrollData.scrollY - scrollData.sectionTop;
  // Adjusted speeds slightly for smoother feel
  const imageMove = relativeScroll * 0.2; 
  const textMove = relativeScroll * -0.1;

  return (
    <section 
      ref={setSectionNode} 
      className="relative h-screen w-full z-40 overflow-hidden bg-black shadow-2xl border-t border-white/10"
    >
      {/* Render trail only if enabled and node exists */}
      {enableTrail && sectionNode && <ImageTrail targetNode={sectionNode} />}

      {imageSrc && (
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
      )}

      <div 
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ transform: `translateY(${textMove}px)` }}
      >
        <h2 className="font-bebas text-5xl md:text-8xl text-white tracking-tighter uppercase leading-none">
          {title}
        </h2>

        {linkUrl && (
            <a 
            href={linkUrl} 
            className="mt-12 font-nunito text-lg md:text-xl text-amber-50"
            >
            <span className="relative z-10 underline underline-offset-8 decoration-1">
                {linkText}
            </span>
            </a>
        )}
      </div>
    </section>
  );
};

export default ParallaxSection;