import React from 'react';

// --- MODULAR ICON COMPONENT ---
// Detects the platform from the URL string and returns the corresponding PNG.
const SocialIcon = ({ url }) => {
  const lowerUrl = url.toLowerCase();
  
  if (lowerUrl.includes('github.com')) {
    return <img src="/github.png" alt="GitHub" className="w-full h-full object-contain" />;
  }
  
  if (lowerUrl.includes('linkedin.com')) {
    return <img src="/linkedin.png" alt="LinkedIn" className="w-full h-full object-contain" />;
  }
  
  if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) {
    return <img src="/twitter.png" alt="Twitter" className="w-full h-full object-contain" />;
  }

  // Default Link Icon fallback for other URLs
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-white">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  );
};

// --- MAIN CARD COMPONENT ---
const Card = ({ name, idNumber, photoUrl, role, links = [] }) => {
  return (
    <div className="relative w-full max-w-sm mx-auto @container font-sans select-none drop-shadow-2xl">
      
      {/* Background Template */}
      <img 
        src="/card.png" 
        alt="ID Card Background" 
        className="w-full h-auto block pointer-events-none"
      />

      {/* Dynamic Top Left Text */}
      <div className="absolute top-[6.5%] left-[8%] text-white font-medium text-[4.5cqw] tracking-wide uppercase">
        {role}
      </div>

      {/* Profile Photo */}
      <div className="absolute top-[16.5%] left-[25%] w-[50%] aspect-square rounded-full overflow-hidden flex items-center justify-center bg-black/50">
        <img 
          src={photoUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Member Name */}
      <div className="absolute top-[55.5%] left-[9.5%] text-white text-[7cqw] font-semibold leading-none tracking-wide">
        {name}
      </div>

      {/* ID Number */}
      <div className="absolute top-[62.5%] left-[9.5%] text-[#e0e0e0] text-[3.5cqw] font-medium leading-none tracking-wider">
        {idNumber}
      </div>

      {/* Dynamic Social Links (Bottom Right) */}
      {links.length > 0 && (
        <div className="absolute bottom-[4.5%] right-[8%] flex gap-[2cqw] items-center">
          {links.map((url, index) => (
            <a 
              key={index} 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-[5cqw] h-[5cqw] hover:scale-110 transition-transform duration-300 block"
            >
              <SocialIcon url={url} />
            </a>
          ))}
        </div>
      )}

    </div>
  );
};

export default Card;