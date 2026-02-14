import React, { useRef } from 'react';

const Labs = () => {
  const sectionRef = useRef(null);

  return (
    // MAIN CONTAINER: Holds the black background and full height
    <div ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* CONTENT LAYER */}
      <div className="relative z-10 flex h-full w-full items-center justify-between px-4 md:px-20">
        
        {/* LEFT TEXT: "PILL" */}
        <h1 className="font-bebas text-[45rem] md:text-[30vw] leading-none text-yellow-50">
          PILL
        </h1>
        
        {/* CENTER IMAGE */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[70%] w-auto">
          <img
            src="/ntl-text.png"
            alt="NTL Text"
            className="h-full w-auto object-contain"
          />
        </div>

        {/* RIGHT TEXT: "ARS" */}
        <h1 className="font-bebas text-[45rem] md:text-[30vw] leading-none text-yellow-50 text-right">
          ARS
        </h1>
        
      </div>
    </div>
  );
}

export default Labs;