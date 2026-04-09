import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLocation } from "react-router-dom"; 
import { useLoading } from "../context/LoadingContext"; 

const ROUTE_WORDS = {
 
  "/info": ["INFO"],
  "/labs": ["LABS"],
  "/work": ["WORK"],
  "/gallery": ["GALLERY"],
  "/labs/norman": ["NORMAN"],
  "/labs/pausch": ["PAUSCH"],
  "/labs/mccarthy": ["MCCARTHY"],
  "/labs/satoshi": ["SATOSHI"],
  "/labs/tesla": ["TESLA"],
   
};

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const wordsRef = useRef([]);
  const location = useLocation();
  const { isInitialLoad, setIsInitialLoad } = useLoading();

  wordsRef.current = [];

  // --- THE FIX IS HERE ---
  // Create a variable to check if it's BOTH the first load AND the home page
  const isGrandIntro = isInitialLoad && location.pathname === "/";

  let words = [];
  if (isGrandIntro) {
    words = ["THE", "BEST", "THERE", "IS"]; 
  } else {
    words = ROUTE_WORDS[location.pathname] || ROUTE_WORDS.default;
  }
  // -----------------------

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (isInitialLoad) {
          setIsInitialLoad(false); 
        }
        if (onComplete) onComplete();
      },
    });

    wordsRef.current.forEach((word) => {
      if (word) {
        tl.to(word, {
          y: "0%",
          // Use isGrandIntro so only the main home page gets the super slow cinematic load
          duration: isGrandIntro ? 0.8 : 0.6, 
          ease: "power4.out",
        }).to(word, {
          y: "-110%",
          duration: isGrandIntro ? 0.8 : 0.6,
          ease: "power4.in",
          delay: isGrandIntro ? 0.2 : 0.1,
        });
      }
    });

    tl.to(loaderRef.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.8,
      ease: "power2.inOut",
    });

    return () => tl.kill();
  }, [onComplete, isInitialLoad, setIsInitialLoad, location.pathname, isGrandIntro]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0c0c0c]"
    >
      <div className="relative flex h-[95px] w-full items-center justify-center overflow-hidden">
        {words?.map((word, index) => (
          <div
            key={index}
            ref={(el) => (wordsRef.current[index] = el)}
            className="absolute w-full text-center translate-y-[110%] text-6xl md:text-[12vw] font-black uppercase tracking-tighter text-yellow-50 md:text-[100px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
}