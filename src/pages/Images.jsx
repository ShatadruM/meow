import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Masonry from 'react-masonry-css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from '../hooks/useLenis';
import { X, ChevronLeft, ChevronRight } from 'lucide-react'; // Added Icons

gsap.registerPlugin(ScrollTrigger);

const Images = () => {
  useLenis();

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedIndex, setSelectedIndex] = useState(null); 
  
  const galleryRef = useRef(null);

  const cloudName = "dib8gimwq"; 
  const tag = "ntl-gallery";     

  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`);
        if (!response.ok) throw new Error("Cloudinary list not found.");
        
        const data = await response.json();
        
        const formattedImages = data.resources.map((img) => ({
          id: img.public_id,
          src: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_800/v${img.version}/${img.public_id}.${img.format}`,
          // We also fetch a high-res version for the Lightbox overlay
          highResSrc: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_1920/v${img.version}/${img.public_id}.${img.format}`,
          aspectRatio: `${img.width} / ${img.height}`,
          caption: img.context?.custom?.caption || "Next Tech Lab Archive Image"
        }));

        setImages(formattedImages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  // 2. GSAP SCROLL ANIMATIONS (Fixed Resize Bug)
  useLayoutEffect(() => {
    if (isLoading || images.length === 0) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".gallery-item", {
        interval: 0.1, 
        batchMax: 5,   
        onEnter: (batch) => {
          // Changed to gsap.from()
          // This prevents elements from disappearing when React Masonry shifts them to a new column on resize.
          gsap.from(batch, { 
            opacity: 0, 
            y: 40, 
            scale: 0.98, 
            stagger: 0.05, 
            duration: 0.8, 
            ease: "power2.out", 
            overwrite: true 
          });
        },
      });
      
      // Force ScrollTrigger to recalculate dimensions on window resize
      window.addEventListener('resize', () => ScrollTrigger.refresh());
      
    }, galleryRef);

    return () => ctx.revert();
  }, [isLoading, images]);

  // 3. LIGHTBOX NAVIGATION LOGIC
  const handleNext = (e) => {
    e?.stopPropagation(); // Prevents click from bubbling up and closing the modal
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleClose = () => setSelectedIndex(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, images.length]);


  // THE MOBILE 4-COLUMN LOGIC
  const breakpointColumnsObj = {
    default: 6, 
    1100: 5,    
    768: 4,     
    500: 4      
  };

  return (
    <div className="relative w-full min-h-screen bg-[#000000] pt-20 md:pt-32 pb-20 md:pb-40 px-2 md:px-10">
      
      {/* MASONRY GRID */}
      <div ref={galleryRef} className="max-w-500 mx-auto">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto gap-1 md:gap-4" 
          columnClassName="bg-clip-padding flex flex-col gap-1 md:gap-4" 
        >
          {images.map((img, index) => (
            <div 
              key={img.id} 
              // Removed opacity-0 here to fix the resize bug!
              className="gallery-item will-change-transform"
            >
              <div 
                // Added onClick to trigger the lightbox
                onClick={() => setSelectedIndex(index)}
                className="relative overflow-hidden rounded-sm md:rounded-lg group cursor-pointer bg-gray-900"
                style={{ aspectRatio: img.aspectRatio }}
              >
                <img 
                  src={img.src} 
                  alt={img.caption} 
                  loading="lazy" 
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 ease-out md:group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </Masonry>
      </div>

      {/* LIGHTBOX OVERLAY */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-md transition-opacity"
          onClick={handleClose} // Clicking anywhere outside the image closes it
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/70 hover:text-white transition-colors"
            onClick={handleClose}
          >
            <X size={36} strokeWidth={1.5} />
          </button>

          {/* Previous Button */}
          <button 
            className="absolute left-2 md:left-10 p-2 text-white/50 hover:text-white transition-colors"
            onClick={handlePrev}
          >
            <ChevronLeft size={48} strokeWidth={1} />
          </button>

          {/* Main Image Container */}
          <div 
            className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()} // Clicking the image itself shouldn't close the modal
          >
            <img 
              // Uses a high-res src for the full screen view
              src={images[selectedIndex].highResSrc} 
              alt={images[selectedIndex].caption}
              className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-sm"
            />
            {/* Optional Caption Display */}
            <p className="text-white/70 text-sm mt-4 font-mono uppercase tracking-wider text-center max-w-2xl">
              {images[selectedIndex].caption}
            </p>
          </div>

          {/* Next Button */}
          <button 
            className="absolute right-2 md:right-10 p-2 text-white/50 hover:text-white transition-colors"
            onClick={handleNext}
          >
            <ChevronRight size={48} strokeWidth={1} />
          </button>
        </div>
      )}

    </div>
  );
};

export default Images;