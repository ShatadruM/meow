import { useState, useEffect } from "react";
import { useLenis } from "../hooks/useLenis";
import ParallaxSection from "../components/Parallaxsection";

const Home = () => {
  useLenis();

  return (
    <div className="relative w-full">
      {/* 1. THE STAGE (Fixed Background) 
        We use z-0 here.
      */}
      <div className="fixed inset-0 z-0 w-full h-screen overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full w-auto h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover scale-100"
        >
          <source src="/vid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* 2. THE SCROLLABLE CONTENT 
        By making this relative and z-10, it floats ABOVE the video.
      */}
      <main className="relative z-10 w-full">
        {/* PAGE 1: NEXT TECH LAB (Transparent Background) */}
        <section className="relative h-screen w-full bg-transparent overflow-hidden">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="absolute -bottom-10 left-0 w-full leading-none">
              <h1 className="font-bebas text-amber-50 text-[25vw] tracking-tighter uppercase whitespace-nowrap">
                NEXT TECH LAB
              </h1>
            </div>
          </div>
        </section>

        {/* PAGE 2: TWO HEADINGS (Transparent Background) */}
        <section className="relative h-screen w-full bg-transparent px-6 md:px-12 py-24 flex flex-col justify-between overflow-hidden">
          <div className="w-full flex justify-start">
            <div className="max-w-[70%]">
              <h2 className="font-bebas text-6xl md:text-9xl text-white leading-[0.85] text-left uppercase tracking-tighter">
                STUDENT LED INNOVATION LAB, <br />
                TECH LAB, RESEARCH LAB
              </h2>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <div className="max-w-[70%]">
              <h2 className="font-bebas text-6xl md:text-9xl text-white leading-[0.85] text-left uppercase tracking-tighter">
                INDIA'S FIRST QS RANKED LAB <br />
                IN SRM AP UNIVERSITY LOREM IPSUM
              </h2>
            </div>
          </div>
        </section>

        <ParallaxSection
          imageSrc="/image1.png"
          title={
            <>
            WE INNOVATE. WE CRAFT. <br />
            WE DELIVER.
            </>
          }
          subtitle="WE DELIVER."
          linkText="[EXPLORE MORE WORK]"
        />

        {/* PAGE 4: Second Parallax Section */}

        <ParallaxSection
          imageSrc="/image2.png"
          title={
            <>
              STYLISH. <br />
              PRODUCTION. <br />
              SEAMLESS. <br />
              EXECUTION.
            </>
          }
          linkText="[SEE THE PROCESS]"
          linkUrl="/LABS"
        />
         <ParallaxSection
          imageSrc="/image.png"
          title={
            <>
              WE ARE NOT A CULT. <br />
              BUT PEOPLE DO KEEP <br />
              COMING BACK.
            </>
          }
          linkText="[LEARN MORE ABOUT US]"
          linkUrl="/info"
        />
      </main>
    </div>
  );
};

export default Home;
