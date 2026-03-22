import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const AnimatedHeading = ({ 
  text, 
  as: Tag = 'h1', 
  className = '', 
  delay = 0,
  staggerSpeed = 0.2
}) => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray('.char');

      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: -40, 
          filter: "blur(20px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          delay: delay,
          stagger: {
            each: staggerSpeed, // Changed from 'amount' to 'each'
            from: "start",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert(); 
  }, [text, delay, staggerSpeed]);

  const words = text.split(" ");

  return (
    <Tag ref={containerRef} className={className}>
      {words.map((word, wordIndex) => (
        <span 
          key={wordIndex} 
          className={`block md:inline-block whitespace-nowrap ${
            wordIndex !== words.length - 1 ? 'md:mr-[0.2em]' : ''
          }`}
        >
          {word.split("").map((char, charIndex) => (
            <span 
              key={charIndex} 
              className="char inline-block will-change-transform"
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
};

export default AnimatedHeading;