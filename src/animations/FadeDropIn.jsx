import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { useLoading } from '../context/LoadingContext'; // 1. Import your context

const FadeDropIn = ({ children, delay = 0, className = "" }) => {
  const elementRef = useRef(null);
  const tweenRef = useRef(null); // 2. Ref to store the GSAP tween
  const { isLoading } = useLoading(); // 3. Get the loading state

  useLayoutEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      // 4. Store the animation in the ref and set it to paused
      tweenRef.current = gsap.fromTo(
        elementRef.current,
        {
          opacity: 0,
          y: -40, // Drops from above
          filter: "blur(20px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          delay: delay,
          paused: true, // <--- Freezes it in the 'opacity: 0' state immediately
        }
      );
    }, elementRef);

    return () => ctx.revert();
  }, [delay]);

  // 5. Watch for the loader to finish, then hit play
  useEffect(() => {
    if (!isLoading && tweenRef.current) {
      tweenRef.current.play();
    }
  }, [isLoading]);

  return (
    <div ref={elementRef} className={`will-change-transform will-change-filter ${className}`}>
      {children}
    </div>
  );
};

export default FadeDropIn;