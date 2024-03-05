import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import React, { useContext, useEffect, useRef, useState } from "react";
import { animated, useTransition } from "react-spring";
import ParallaxContext from "../elements/ParallaxContext";
import { useImageService } from "../elements/imageService";
import Trail from "../elements/trail";
import video from "../images/Magdalena.mp4";
import videoMobile from "../images/mobile.mp4";
import "../styles/global.css";
import AboutSection from "./AboutSection";
import BiographySection from "./BiographySection";

function isLocalStorageAvailable() {
  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    return true;
  } catch (e) {
    return false;
  }
}

const HeroSection = () => {
  const { getAllImagesFromDirectory } = useImageService();
  const backgroundImagesData = getAllImagesFromDirectory("backgrounds");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [buttonToUp, setButtonToUp] = useState(false);
  const [parallaxApi, setParallaxApi] = useState(null);

  const { updateParallaxApi } = useContext(ParallaxContext);

  const parallaxRef = useRef(null);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 768);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const transition = useTransition(isModalOpen, {
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-100%)" },
    config: { duration: 3000 },
  });

  useEffect(() => {
    if (parallaxRef.current && !parallaxApi) {
      setParallaxApi(parallaxRef.current);

      updateParallaxApi(parallaxRef.current);
    }
  }, [parallaxRef, parallaxApi]);

  const scrollToNext = (e) => {
    if (parallaxApi) {
      parallaxApi.scrollTo(e);
    }
  };

  const transitions = useTransition(currentImageIndex, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 4000 },
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
    }, 6000);

    return () => clearInterval(timer);
  }, [backgroundImagesData.length]);

  useEffect(() => {
    if (isLocalStorageAvailable()) {
      const modalShown = localStorage.getItem("modalShown");
      if (!modalShown) {
        setIsModalOpen(true);
        localStorage.setItem("modalShown", "true");

        setTimeout(() => {
          setIsModalOpen(false);
        }, 3000);
      }
    }
  }, []);

  const scrollToPage = (page) => {
    if (parallaxRef.current.offset >= 4.5) {
      setCurrentPage(0);
      parallaxRef.current.scrollTo(0);
    } else {
      parallaxRef.current.scrollTo(page);
      setCurrentPage(page);
      setButtonToUp(false);
    }
  };
  const alignCenter = { display: "flex", alignItems: "center" };
  const handleModalClick = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isLocalStorageAvailable()) {
      const modalShown = localStorage.getItem("modalShown");
      if (!modalShown) {
        setIsModalOpen(true);
        localStorage.setItem("modalShown", "true");
      }
    }
  }, []);

  useEffect(() => {
    const container = document.querySelector(".parallax-container");
    if (container) {
      const handleScroll = () => {
        const currentValue = parallaxRef.current
          ? parallaxRef.current.current
          : 0;
        const conditions = [
          { threshold: 1, setPage: 0, setButton: false },
          { threshold: 500, setPage: 1, setButton: false },
          { threshold: 1000, setPage: 2, setButton: false },
          { threshold: 2000, setPage: 3, setButton: false },
          { threshold: 3000, setPage: 4, setButton: false },
          { threshold: 4000, setPage: 5, setButton: true },
        ];
        let actionApplied = false;
        conditions.forEach((condition, index, array) => {
          if (
            currentValue > condition.threshold &&
            (index === array.length - 1 ||
              currentValue < array[index + 1].threshold)
          ) {
            setCurrentPage(condition.setPage);
            setButtonToUp(condition.setButton);
            actionApplied = true;
          }
        });

        if (!actionApplied && currentValue <= conditions[0].threshold) {
          setCurrentPage(0);
          setButtonToUp(false);
        }
      };

      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <>
      {transition((style, item) =>
        item ? (
          <animated.div
            style={style}
            className="fixed inset-0 bg-dark-purple flex justify-center items-center z-50 cursor-pointer"
            onClick={handleModalClick}
          >
            <Trail>
              <h1 className="text-3xl font-extrabold text-center xl:text-4xl">
                Magdalena Kapela
              </h1>
            </Trail>
          </animated.div>
        ) : (
          ""
        )
      )}
      <div className="background">
        <div className="grid relative isolate overflow-hidden h-screen">
          {transition((style, i) => (
            <animated.div
              key={i}
              style={{
                ...style,
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            >
              {" "}
              <video
                autoPlay
                muted
                loop
                className="hidden md:block inset-0 h-full w-full object-cover"
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <video
                autoPlay
                muted
                loop
                className="md:hidden inset-0 h-full w-full object-cover"
                onLoadedMetadata={(e) => {
                  e.currentTarget.playbackRate = 0.7;
                }}
              >
                <source src={videoMobile} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </animated.div>
          ))}
        </div>
      </div>
      <span className="bg-black absolute w-full h-full  opacity-50" />

      <Parallax pages={5} ref={parallaxRef} className="parallax-container">
        <ParallaxLayer
          offset={0}
          speed={0.5}
          style={{ ...alignCenter, justifyContent: "center" }}
        >
          <Trail>
            <h1 className="z-50 mx-auto max-w-2xl text-3xl font-extrabold text-center xl:text-4xl scrollText">
              Magdalena Kapela
            </h1>
          </Trail>
        </ParallaxLayer>

        <ParallaxLayer sticky={{ start: 1, end: 1 }}>
          <AboutSection />{" "}
        </ParallaxLayer>

        <ParallaxLayer
          sticky={{ start: isMobile ? 3.8 : 3, end: isMobile ? 3.8 : 3 }}
        >
          <BiographySection />
        </ParallaxLayer>
      </Parallax>

      <div className="fixed bottom-4 left-0 right-0 pb-4 flex justify-center">
        <button
          onClick={() => scrollToPage(currentPage + 1)}
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border "
        >
          {buttonToUp ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-black "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-black "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          )}
        </button>
      </div>
    </>
  );
};

export default HeroSection;
