
import { gsap } from "gsap";


const animateLeft = (target) => {
  return gsap.fromTo(
    target,
    {
      opacity: 0,
      y: 50 , // Positive Y = Starts below
      filter: "blur(30px)", // Increased blur intensity
    },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out",
      stagger: {
        amount: 0.5,
        from: "start", // "F" animates first, "D" last
      },
    }
  );
};
/**
 * Animates text from Right -> Left (Reverse reading direction)
 * Use this for text on the Right side of the screen.
 */
const animateRight = (target) => {
  return gsap.fromTo(
    target,
    {
      opacity: 0,
      y: 50, // Positive Y = Starts below
      filter: "blur(30px)", // Increased blur intensity
    },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out",
      stagger: {
        amount: 0.5,
        from: "end", // "S" animates first, "P" last
      },
    }
  );
};

export { animateLeft, animateRight };