import React from 'react';

const Work = () => {
  // Inline style for a subtle paper texture, matching the reference image
  const textureStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
  };

  return (
    // Main Section: Light grey background with texture
   <section className="relative h-screen w-full overflow-hidden bg-[#EAEAE5]">
      
      <div className="relative z-10 flex h-full w-full items-center justify-between px-4 md:px-20 ">
        
        {/* LEFT TEXT */}
        <h1 className="font-bebas text-[12vw] md:text-[10rem] leading-none text-[#1A1A1A]">
          FEATURED
        </h1>

        {/* CENTER IMAGE */}
        {/* Since parent is h-screen, h-[70%] is now 70vh (constant) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[70%] w-auto">
          <img 
            src="/ntl-text.png" 
            alt="NTL Text" 
            className="h-full w-auto object-contain" 
          />
        </div>

        {/* RIGHT TEXT */}
        <h1 className="font-bebas text-[12vw] md:text-[10rem] leading-none text-[#1A1A1A] text-right">
          PROJECTS
        </h1>

      </div>
    </section>
  );
};

export default Work;