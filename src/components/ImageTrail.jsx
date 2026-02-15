import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const trailImages = [
  "/image1.png", 
  "/image2.png", 
  "/image3.png"
];

const ImageTrail = ({ targetNode }) => {
  const lastPos = useRef({ x: 0, y: 0 });
  const imageIndex = useRef(0);
  const zIndexCounter = useRef(10000); 

  useEffect(() => {
    if (!targetNode) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      const distance = Math.hypot(
        clientX - lastPos.current.x,
        clientY - lastPos.current.y
      );

      // Threshold: 50px
      if (distance > 50) {
        spawnImage(clientX, clientY);
        lastPos.current = { x: clientX, y: clientY };
      }
    };

    const spawnImage = (x, y) => {
      const img = document.createElement('img');
      img.src = trailImages[imageIndex.current % trailImages.length];
      imageIndex.current++;
      zIndexCounter.current++;

      // FIX 1: Add 'top-0 left-0' to force the starting position to the corner
      // FIX 2: Ensure pointer-events-none is on so it doesn't block the mouse
      img.className = "fixed top-0 left-0 w-52 h-44 pointer-events-none";
      
      // Initial GSAP Set
      gsap.set(img, {
        x: x,
        y: y,
        xPercent: -50, // Center the image on cursor
        yPercent: -50,
        scale: 0,
        opacity: 0,
        zIndex: zIndexCounter.current,
      });

      document.body.appendChild(img);

      const tl = gsap.timeline({
        onComplete: () => {
          // Safety check before removing
          if (img.parentNode) img.parentNode.removeChild(img);
        }
      });

      tl.to(img, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(img, {
        y: "+=100", // Move down a bit while fading out
        opacity: 0,
        duration: 0.5,
        delay: 0.1, // Wait briefly before fading
      });
    };

    targetNode.addEventListener('mousemove', handleMouseMove);

    return () => {
      targetNode.removeEventListener('mousemove', handleMouseMove);
    };
  }, [targetNode]);

  return null;
};

export default ImageTrail;