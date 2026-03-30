import React, { use, useRef } from 'react';
import VideoParallaxSection from '../components/VideoParallaxSection'; 
import { useLenis } from '../hooks/useLenis';
import AnimatedHeading from '../animations/AnimatedHeading';
import FadeDropIn from '../animations/FadeDropIn';
const Labs = () => {
  const sectionRef = useRef(null);
  useLenis();

  return (
    // MAIN WRAPPER: Removed 'h-screen' and 'overflow-hidden' so we can scroll
    <div className="relative w-full bg-black">
      
     <div 
  ref={sectionRef} 
  className="sticky top-0 h-screen w-full overflow-hidden bg-black z-0"
>
  {/* 1. BACKGROUND IMAGE DIV */}
  <div 
    className="absolute inset-0 z-0 bg-cover bg-center opacity-80
               bg-[url('/lab-bg2.png')]      
               md:bg-[url('/lab-bg.png')]     
              " 
    // Removed the style={{ backgroundImage... }} prop so classes can take effect
  />
  
 <div className="relative z-10 flex h-full w-full 
                items-end justify-center pb-30     
                md:items-center md:justify-between md:pb-0 
                px-4 md:px-20 translate-y-32">
  
  {/* LEFT TEXT "PILL" */}
  {/* Mobile: 40vw to fit half screen. Desktop: 30vw massive. */}
  <AnimatedHeading 
        text="PILL"
        as="h1"
        className="font-bebas text-[40vw] md:text-[30vw] leading-none text-yellow-50"
      />
  
  {/* CENTER IMAGE */}
  {/* Mobile: Floating at top (top-[15%]), smaller height (h-[30vh]) */}
  {/* Desktop: Centered (top-1/2), full height (h-[70%]) */}
  <div className="absolute left-1/2 -translate-x-1/2 
                      top-[15%] h-[30vh] 
                      md:top-1/2 md:-translate-y-1/2 md:h-[70%] 
                      w-auto">
        
        {/* We animate the contents inside the stable container */}
        <FadeDropIn delay={0.8} className="h-full w-full flex items-center justify-center">
          <img 
            src="/ntl-text.svg" 
            alt="NTL Text" 
            className="h-full w-auto object-contain" 
          />
        </FadeDropIn>

      </div>

  {/* RIGHT TEXT "ARS" */}
  <AnimatedHeading 
        text="ARS"
        as="h1"
        // Swapped text-right for justify-end because AnimatedHeading uses flex
        className="font-bebas text-[40vw] md:text-[30vw] leading-none text-yellow-50 justify-end"
        delay={1} // Slight delay so it drops right after PILL
      />
  
</div>
</div>


      
      <VideoParallaxSection 
        videoSrc="https://res.cloudinary.com/dib8gimwq/video/upload/v1774811575/Norman-vid_rx6jve.mp4" 
        title="NORMAN LAB"
        description="Pushing the boundaries of Design and Development to solve complex problems in real-time environments."
        linkUrl="/labs/norman"
      />

      <VideoParallaxSection 
        videoSrc="https://res.cloudinary.com/dib8gimwq/video/upload/v1774882589/John_Mccarthy_oojmsm.mp4"
        title="MCCARTHY LAB"
        description="Building high-performance ML pipelines and NLP systems to unlock deep contextual understanding and drive data-centric decision-making."
        linkUrl="/labs/mccarthy"
      />

      <VideoParallaxSection 
        videoSrc="https://res.cloudinary.com/dib8gimwq/video/upload/v1774882585/Randy_Pausch_wnq6sz.mp4"
        title="PAUSCH LAB"
        description="Connecting the physical and digital worlds through AR and VR technology."
        linkUrl="/labs/pausch"
      />

      <VideoParallaxSection 
        videoSrc="https://res.cloudinary.com/dib8gimwq/video/upload/v1774811430/Nikola_Tesla_qwkdwq.mp4"
        title="TESLA LAB"
        description="Engineering autonomous systems capable of navigating and manipulating the world with precision."
        linkUrl="/labs/tesla"
      />

      <VideoParallaxSection 
        videoSrc="https://res.cloudinary.com/dib8gimwq/video/upload/v1774882583/Satoshi_Nakamotto_cg3yrn.mp4"
        title="SATOSHI LAB"
        description="Developing next-generation security protocols to protect infrastructure from evolving digital threats."
        linkUrl="/labs/satoshi"
      />
    </div>
  );
}

export default Labs;