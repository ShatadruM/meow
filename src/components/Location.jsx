import React from 'react';

const Coordinates = () => {
  const lat = 16.464824;
  const lng = 80.507542;

  // I updated this URL to actually point to the coordinates
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <a 
      href={mapUrl}
      target="_blank" 
      rel="noopener noreferrer"
      className="
        group
        flex items-center gap-3
        px-4 py-2
        cursor-pointer
        font-mono text-xs md:text-sm tracking-widest
        transition-colors duration-100
      "
    >
      {/* Text Content */}
      <div className="flex flex-col gap-3 font-nunito clash-title text-xs md:text-lg leading-none text-right">
        <div>{lat.toFixed(6)}</div>
        <div>{lng.toFixed(6)}</div>
      </div>
    </a>
  );
};

export default Coordinates;