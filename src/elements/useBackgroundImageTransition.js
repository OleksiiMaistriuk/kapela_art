import { useEffect, useState } from "react";
import { useTransition } from "react-spring";
import { useImageService } from "../elements/imageService";

export function useBackgroundImageTransition(
  directory,
  interval = 6000,
  transitionDuration = 4000
) {
  const { getAllImagesFromDirectory } = useImageService();
  const backgroundImagesData = getAllImagesFromDirectory(directory);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const transitions = useTransition(currentImageIndex, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: transitionDuration },
    onRest: (_a, _b, item) => {
      if (currentImageIndex === item) {
        setCurrentImageIndex(
          (state) => (state + 1) % backgroundImagesData.length
        );
      }
    },
    exitBeforeEnter: true,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImagesData.length
      );
    }, interval);

    return () => clearInterval(timer);
  }, [backgroundImagesData.length, interval]);

  return transitions;
}
