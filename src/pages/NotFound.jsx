import React from "react";

const NotFound = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-black px-6 text-center overflow-hidden">
      {/* Optional: Faint background texture to match your theme */}
      <div 
        className="absolute inset-0 z-0 opacity-10 bg-center bg-no-repeat bg-cover bg-[url('/info-deskt.png')]" 
      />

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* HUGE 404 */}
        <h1 className="font-bebas text-[50vw] md:text-[35vw] leading-none text-yellow-50 tracking-tighter drop-shadow-2xl select-none">
          404
        </h1>

        {/* The cheeky message */}
        <p className="font-roboto-mono text-lg md:text-2xl text-gray-300 max-w-2xl mt-4 leading-relaxed z-20">
          It's fine you ended up on the wrong route, <br className="hidden md:block" />
          but just don't end up in the wrong lab <span className="text-yellow-200 text-2xl md:text-3xl">;)</span>
        </p>

      </div>
    </div>
  );
};

export default NotFound;