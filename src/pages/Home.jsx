import { useState, useEffect } from "react";
import { useLenis } from "../hooks/useLenis";
import AnimatedHeading from "../animations/AnimatedHeading";
import ParallaxSection from "../components/ParallaxSection";

const Home = () => {
  useLenis();

  return (
    <div className="relative w-full">
      
      <div className="fixed inset-0 z-0 w-full h-screen overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full w-auto h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover scale-100"
        >
          <source src="https://d3fmezyua6t45b.cloudfront.net/homepage/Sequence_04_2_xwnum6.mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      
      <main className="relative z-10 w-full">
       
       <section className="relative h-screen w-full bg-transparent overflow-hidden">
  <div className="flex h-full flex-col items-center justify-center">
    
   
    <div className="absolute w-full leading-none z-0
                top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                md:top-auto md:-bottom-10 md:left-0 md:translate-x-0 md:translate-y-0">
  
  <AnimatedHeading 
    text="NEXT TECH LAB"
    as="h1"
    className="font-bebas text-amber-50 tracking-tighter uppercase text-center text-[45vw] leading-[0.8] md:text-[24vw] md:leading-none md:whitespace-nowrap"
  />

</div>
  </div>
</section>
       

        <ParallaxSection
          imageSrc="https://d3fmezyua6t45b.cloudfront.net/homepage/image11_qzro5w.png"
          title={
            <>
              WE INNOVATE. WE CRAFT. <br />
              WE DELIVER.
            </>
          }


          linkText="[EXPLORE OUR WORK]"
           linkUrl="/work"
        />

      

        <ParallaxSection
          imageSrc="https://d3fmezyua6t45b.cloudfront.net/homepage/image22_govsu2.png"
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
          imageSrc="https://d3fmezyua6t45b.cloudfront.net/homepage/image33_ikjbku.png"
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
          linkUrl="/gallery"
          enableTrail={true}
        />
      </main>
    </div>
  );
};

export default Home;
