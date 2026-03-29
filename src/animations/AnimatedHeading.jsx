import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { useLoading } from '../context/LoadingContext'; 

const AnimatedHeading = ({ 
  text, 
  as: Tag = 'h1', 
  className = '', 
  delay = 0,
  staggerSpeed = 0.2
}) => {
  const containerRef = useRef(null);
  const tweenRef = useRef(null); 
  const { isLoading } = useLoading(); 

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray('.char');

     
      tweenRef.current = gsap.fromTo(
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
            each: staggerSpeed, 
            from: "start",
          },
          paused: true, // <--- CRITICAL: Applies the opacity:0 instantly, but waits to animate
        }
      );
    }, containerRef);

    return () => ctx.revert(); 
  }, [text, delay, staggerSpeed]);

  // 5. Watch the isLoading state and trigger play() when it turns false
  useEffect(() => {
    if (!isLoading && tweenRef.current) {
      tweenRef.current.play();
    }
  }, [isLoading]);

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