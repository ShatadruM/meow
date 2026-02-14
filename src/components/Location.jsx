import React from 'react';

const Coordinates = () => {
  const lat = 16.464824;
  const lng = 80.507542;

  
  const mapUrl = `https://maps.app.goo.gl/YQnVx8uEguP8T6qPA`;

  return (
    <a 
      href={mapUrl}
      target="_blank" 
      rel="noopener noreferrer"
      className="
        group
        flex items-center gap-3
        px-4 py-2
        text-white
        cursor-pointer
        font-mono text-xs md:text-sm tracking-widest
      "
    >
      {/* Text Content */}
      <div className="flex flex-col font-nunito clash-title text-xs md:text-lg">
        <div>{lat}</div>
        <div>{lng}</div>
      </div>
    </a>
  );
};

export default Coordinates;