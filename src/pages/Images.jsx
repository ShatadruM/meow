import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // 1. Import createPortal
import Masonry from 'react-masonry-css';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Images = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  // 2. SSR safety for the Portal
  const [mounted, setMounted] = useState(false);

  const cloudName = "dib8gimwq";
  const tag = "ntl-gallery";

  useEffect(() => {
    setMounted(true); // Ensures document.body is ready for the Portal

    const fetchImages = async () => {
      try {
        const response = await fetch(`https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`);
        if (!response.ok) throw new Error("Cloudinary list not found.");

        const data = await response.json();

        const formattedImages = data.resources.map((img) => ({
          id: img.public_id,
          src: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_800/v${img.version}/${img.public_id}.${img.format}`,
          highResSrc: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_1920/v${img.version}/${img.public_id}.${img.format}`,
          aspectRatio: `${img.width} / ${img.height}`,
         
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

  // SCROLL LOCK
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedIndex]);

  // NAVIGATION
  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleClose = () => setSelectedIndex(null);

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

  const breakpointColumnsObj = {
    default: 6,
    1100: 4,
    768: 3,
    500: 3
  };

  if (isLoading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white/50 text-sm tracking-widest uppercase font-mono">Loading Gallery...</div>;
  }

  // 3. Define the Lightbox contents separately
  const lightboxContent = selectedIndex !== null ? (
    <div
      // Explicitly forcing viewport dimensions here as a fail-safe
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
      className="z-[9999] bg-black/98 flex items-center justify-center backdrop-blur-sm"
      onClick={handleClose}
    >
      <button
        className="absolute top-6 right-6 z-[10000] text-white/60 hover:text-white p-4 transition-transform active:scale-90"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        <X size={36} strokeWidth={1.5} />
      </button>

      <button
        className="hidden sm:block absolute left-4 md:left-8 z-[10000] text-white/30 hover:text-white p-4 transition-colors"
        onClick={handlePrev}
      >
        <ChevronLeft size={48} strokeWidth={1} />
      </button>

      <button
        className="hidden sm:block absolute right-4 md:right-8 z-[10000] text-white/30 hover:text-white p-4 transition-colors"
        onClick={handleNext}
      >
        <ChevronRight size={48} strokeWidth={1} />
      </button>

      <div className="relative w-full h-full flex flex-col items-center justify-center p-6 md:p-12 pointer-events-none">
        <img
          src={images[selectedIndex].highResSrc}
          alt={images[selectedIndex].caption}
          className="max-w-[95vw] max-h-[75vh] md:max-h-[85vh] object-contain shadow-2xl pointer-events-auto select-none"
          onClick={(e) => e.stopPropagation()}
        />

        <p className="text-white/40 text-[10px] md:text-xs mt-6 font-mono uppercase tracking-[0.3em] text-center max-w-[80%] leading-relaxed pointer-events-auto">
          {images[selectedIndex].caption}
        </p>
      </div>
    </div>
  ) : null;

  return (
    <div className="relative w-full min-h-screen bg-black pt-20 md:pt-32 pb-20 md:pb-40 px-2 md:px-10">
      
      {/* MASONRY GRID */}
      <div className="max-w-[1800px] mx-auto">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto gap-2 md:gap-4"
          columnClassName="bg-clip-padding flex flex-col gap-2 md:gap-4"
        >
          {images.map((img, index) => (
            <div key={img.id} className="gallery-item">
              <div
                onClick={() => setSelectedIndex(index)}
                className="relative overflow-hidden rounded-sm md:rounded-lg group cursor-pointer bg-neutral-900"
                style={{ aspectRatio: img.aspectRatio }}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </Masonry>
      </div>

      {/* 4. Render the Portal injected directly into the document body */}
      {mounted && createPortal(lightboxContent, document.body)}
      
    </div>
  );
};

export default Images;