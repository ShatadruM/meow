import { useLayoutEffect } from "react";
import gsap from "gsap";

export const useCenterOut = (scopeRef) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Target elements with the class '.animate-char'
      gsap.from(".animate-char", {
        opacity: 0,
        y: 40,                // Subtle slide up
        duration: 1.2,
        ease: "power4.out",
        stagger: {
          each: 0.04,
          from: "center",     // The "ripple" effect
        },
      });
    }, scopeRef);

    return () => ctx.revert(); // Cleanup
  }, [scopeRef]);
};