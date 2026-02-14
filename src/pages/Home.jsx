import { useState, useEffect } from "react";
import { useLenis } from "../hooks/useLenis";
import ParallaxSection from "../components/ParallaxSection";

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
       

        <ParallaxSection
          imageSrc="/image1.png"
          title={
            <>
              WE INNOVATE. WE CRAFT. <br />
              WE DELIVER.
            </>
          }


          linkText="[EXPLORE OUR WORK]"
           linkUrl="/work"
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
          linkUrl="/labs"
        />
        <ParallaxSection
          imageSrc="/image3.png"
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
        <ParallaxSection
          title={
            <>
              WE PROBABLY <br />
              SHOULDN'T <br />
              POST THIS...
            </>
          }
          linkText="[WHAT GOES ON INSIDE]"
          linkUrl="/images"
          enableTrail={true}
        />
      </main>
    </div>
  );
};

export default Home;
