// useRevealAnimation.js
import { useEffect, useRef } from "react";

const useRevealAnimation = (
  animationClass = "animate__fadeInDown",
  options = {}
) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass, "animate__animated");
        }
      });
    }, options);

    const { current } = ref;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [ref, options, animationClass]);

  return ref;
};

export default useRevealAnimation;
