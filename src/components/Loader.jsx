import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const words = ["THE", "BEST", "THERE", "IS"];

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    // Initialize a GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Trigger the callback to let the parent know loading is done
        if (onComplete) onComplete();
      },
    });

    // Animate each word sequentially
    wordsRef.current.forEach((word) => {
      tl.to(word, {
        y: "0%", // Slide up into view
        duration: 0.8,
        ease: "power4.out",
      }).to(word, {
        y: "-110%", // Slide up and out of view
        duration: 0.8,
        ease: "power4.in",
        delay: 0.2, // How long the word stays centered
      });
    });

    // Fade out the entire black loader background at the end
    tl.to(loaderRef.current, {
      opacity: 0,
      pointerEvents: "none", // Prevent it from blocking clicks after it fades
      duration: 0.8,
      ease: "power2.inOut",
    });

    // Cleanup function for React Strict Mode
    return () => {
      tl.kill(); 
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0c0c0c]"
    >
      {/* The Mask Container: 
        overflow-hidden ensures text disappears outside this 120px tall box.
        relative allows the absolute children to stack directly on top of each other.
      */}
      <div className="relative flex h-[95px] w-full items-center justify-center overflow-hidden">
        {words.map((word, index) => (
          <div
            key={index}
            // Add each element to the ref array for GSAP to target
            ref={(el) => (wordsRef.current[index] = el)}
            // translate-y-[110%] starts the text hidden below the mask
            className="absolute translate-y-[110%] text-7xl font-black uppercase tracking-tighter text-yellow-50 md:text-9xl"
            style={{ fontFamily: "'Inter', sans-serif" }} // Fallback if you haven't set up your Tailwind sans font family yet
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
}