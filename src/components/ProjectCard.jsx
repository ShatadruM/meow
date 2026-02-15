import React from "react";

const ProjectCard = ({ src, title, category, className = "" }) => {
  return (
    // The parent controls width/height via className
    <div className={`w-full ${className} flex flex-col`}>
      
      {/* Image Container: flex-grow ensures it fills available space */}
      <div className="group relative w-full flex-grow overflow-hidden rounded-lg bg-gray-900">
        
        {/* Main Image */}
        <img
          src={src}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />

        {/* Dropdown Image Logic */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative h-[50%] w-[60%] overflow-hidden rounded-md shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] -translate-y-[250%] group-hover:translate-y-0 rotate-[-5deg] group-hover:rotate-0">
            <img
              src={src}
              alt="preview"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-700 pointer-events-none" />
      </div>

      {/* Text Below Image */}
      <div className="mt-3 flex justify-between items-center px-1">
        <h3 className="text-lg md:text-xl font-bold text-[#1A1A1A] uppercase tracking-tight">
          {title}
        </h3>
        <span className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-widest">
          {category}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;