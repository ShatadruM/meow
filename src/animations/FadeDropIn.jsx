import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const FadeDropIn = ({ children, delay = 0, className = "" }) => {
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
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
        }
      );
    }, elementRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={elementRef} className={`will-change-transform will-change-filter ${className}`}>
      {children}
    </div>
  );
};

export default FadeDropIn;