import React, { useRef } from 'react';
import VideoParallaxSection from '../components/VideoParallaxSection'; 

const Labs = () => {
  const sectionRef = useRef(null);

  return (
    // MAIN WRAPPER: Removed 'h-screen' and 'overflow-hidden' so we can scroll
    <div className="relative w-full bg-black">
      
      {/* --- HERO SECTION (Sticky) --- */}
      {/* Added 'sticky top-0' so the next video slides OVER it */}
      <div 
        ref={sectionRef} 
        className="sticky top-0 h-screen w-full overflow-hidden bg-black z-0"
      >
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-80" 
          style={{ backgroundImage: "url('/lab-bg.png')" }}
        />
        
        <div className="relative z-10 flex h-full w-full items-center justify-between px-4 md:px-20 translate-y-32">
          <h1 className="font-bebas text-[45rem] md:text-[30vw] leading-none text-yellow-50">PILL</h1>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[70%] w-auto">
            <img src="/ntl-text.png" alt="NTL Text" className="h-full w-auto object-contain" />
          </div>
          <h1 className="font-bebas text-[45rem] md:text-[30vw] leading-none text-yellow-50 text-right">ARS</h1>
        </div>
      </div>

      {/* --- VIDEO STACKING SECTIONS --- */}
      {/* These will naturally stack on top of the Hero and each other */}
      
      <VideoParallaxSection 
        videoSrc="/Norman-vid.mp4" 
        title="NORMAN LAB"
        description="Pushing the boundaries of machine learning and neural networks to solve complex problems in real-time environments."
        linkUrl="/labs/ai"
      />

      <VideoParallaxSection 
        videoSrc="/mccarthy-vid.mp4"
        title="MCCARTHY LAB"
        description="Developing next-generation security protocols to protect infrastructure from evolving digital threats."
        linkUrl="/labs/cyber"
      />

      <VideoParallaxSection 
        videoSrc="/pausch-vid.mp4"
        title="PAUSCH LAB"
        description="Connecting the physical and digital worlds through smart sensors and automated mesh networks."
        linkUrl="/labs/iot"
      />

      <VideoParallaxSection 
        videoSrc="/videos/arvr.mp4"
        title="TESLA LAB"
        description="Crafting immersive AR and VR experiences that redefine how humans interact with digital information."
        linkUrl="/labs/xr"
      />

      <VideoParallaxSection 
        videoSrc="/videos/robotics.mp4"
        title="SATOSHI LAB"
        description="Engineering autonomous systems capable of navigating and manipulating the world with precision."
        linkUrl="/labs/robotics"
      />

    </div>
  );
}

export default Labs;