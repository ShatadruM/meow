import React, { useRef } from 'react';
import gsap from 'gsap';

const labColors = {
  norman: '#f25a42',   
  mccarthy: '#1c55f1', 
  pausch: '#a146e7',   
  tesla: '#39ff14',    
  satoshi: '#f7562b',  
  default: '#ffffff',  
};

const Card2 = ({ data }) => {
  const cardRef = useRef(null);
  const themeColor = labColors[data.lab?.toLowerCase()] || labColors.default;

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      x: 48, 
      y: 48, 
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div
      className="relative w-64 h-80 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* --- REVEALED BACKGROUND LAYER --- */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden shadow-inner"
        style={{ backgroundColor: themeColor }}
      >
        
        {/* Top: Social Icons */}
        <div className="absolute top-3 right-3 flex gap-4">
          {data.socialLinks?.github && (
            <a href={data.socialLinks.github} target="_blank" rel="noreferrer">
              <img 
                src="/github.png" 
                alt="GitHub" 
                className="w-7 h-7 hover:opacity-75 transition-opacity" 
              />
            </a>
          )}
          {data.socialLinks?.linkedin && (
            <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer">
              <img 
                src="/linkedin.png" 
                alt="LinkedIn" 
                className="w-7 h-7 hover:opacity-75 transition-opacity" 
              />
            </a>
          )}
          {data.socialLinks?.twitter && (
            <a href={data.socialLinks.twitter} target="_blank" rel="noreferrer">
              <img 
                src="/twitter.png" 
                alt="Twitter" 
                className="w-7 h-7 hover:opacity-75 transition-opacity" 
              />
            </a>
          )}
          {data.socialLinks?.portfolio && (
            <a href={data.socialLinks.portfolio} target="_blank" rel="noreferrer">
              <img 
                src="/portfolio.png" 
                alt="Portfolio" 
                className="w-7 h-7 hover:opacity-75 transition-opacity" 
              />
            </a>
          )}
          {data.socialLinks?.instagram && (
            <a href={data.socialLinks.instagram} target="_blank" rel="noreferrer">
              <img 
                src="/insta.png" 
                alt="Instagram" 
                className="w-7 h-7 hover:opacity-75 transition-opacity" 
              />
            </a>
          )}
        </div>

        {/* Left Side: Role */}
        <div className="absolute bottom-4 left-13 origin-bottom-left -rotate-90 flex items-center whitespace-nowrap">
          <span className="font-bebas text-black uppercase tracking-wider text-5xl">
            {data.role}
          </span>
        </div>
      </div>

      {/* --- FOREGROUND MAIN CARD LAYER --- */}
      <div
        ref={cardRef}
        className="absolute inset-0 flex flex-col bg-white overflow-hidden shadow-lg z-10"
        style={{
          border: `1px solid ${themeColor}`, 
          borderRadius: 0, 
        }}
      >
        {/* Top: Image Section */}
        <div className="flex-grow bg-gray-200 overflow-hidden">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom: Variable Background Section */}
        <div className="flex flex-col justify-center items-start p-3 bg-black text-white font-bold">
          {/* Added tracking-wider to fix the condensed text issue */}
          <span className="w-full break-words font-bebas text-2xl tracking-wider">
            {data.name}
          </span>
          <span className="text-sm font-roboto-mono opacity-70 mt-1">
            {data.idNumber}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card2;