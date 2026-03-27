import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    // 1. Smooth Movement Logic
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 1.5, // The "delay" or lag feeling
        ease: "elastic",
      });
    };

    window.addEventListener('mousemove', moveCursor);

    // 2. Interaction Logic (Hovering over text)
    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 4,
        backgroundColor: "white", // Must be solid for mix-blend-mode to invert colors
        duration: 0.3
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "transparent",
        duration: 0.3
      });
    };

    // Attach listeners to any element with data-cursor="hover"
    const hoverElements = document.querySelectorAll('[data-cursor="hover"]');
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-7 h-7 border-1 border-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      style={{ backgroundColor: 'transparent' }}
    />
  );
};

export default CustomCursor;