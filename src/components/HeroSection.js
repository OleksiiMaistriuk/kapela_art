import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import React, { useEffect, useRef, useState } from "react";
import { animated, useTransition } from "react-spring";
import { useImageService } from "../elements/imageService";
import Trail from "../elements/trail";
import video from "../images/Magdalena.mp4";
import "../styles/global.css";
import AboutSection from "./AboutSection";
import BiographySection from "./BiographySection";
const HeroSection = () => {
  const parallaxRef = useRef(null);
  const [parallaxApi, setParallaxApi] = useState(null);

  const { getAllImagesFromDirectory } = useImageService();
  const backgroundImagesData = getAllImagesFromDirectory("backgrounds");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
    if (parallaxRef.current && !parallaxApi) {
      setParallaxApi(parallaxRef.current);
    }
  }, [parallaxRef, parallaxApi]);

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

  const scrollToNext = (e) => {
    if (parallaxApi) {
      parallaxApi.scrollTo(e);
    }
  };
  const scrollToPage = (page) => {
    if (parallaxRef.current) {
      parallaxRef.current.scrollTo(page);
      setCurrentPage(page); // Update the current page state
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
              {/* <GatsbyImage
                image={getImage(backgroundImagesData[i])}
                alt=""
                className="inset-0 h-full w-full object-cover"
                style={{ position: "absolute" }}
              /> */}
              <video
                autoPlay
                muted
                loop
                className="inset-0 h-full w-full object-contain"
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>{" "}
            </animated.div>
          ))}
        </div>
      </div>
      {/* <div className="absolute top-0 left-0 w-full h-full z-[-10]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto min-w-full min-h-full h-auto  object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
      </div> */}
      <Parallax pages={10} ref={parallaxRef}>
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
          {/* <div className="absolute bottom-5 w-full flex justify-center">
            <button
              onClick={() => {
                scrollToNext(1);
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </div> */}
        </ParallaxLayer>

        <ParallaxLayer sticky={{ start: 1, end: 1 }}>
          <AboutSection />{" "}
        </ParallaxLayer>

        <ParallaxLayer
          sticky={{ start: isMobile ? 8.7 : 3, end: isMobile ? 8.7 : 3 }}
        >
          <BiographySection />
        </ParallaxLayer>
      </Parallax>
      <div className="fixed bottom-4 left-0 right-0 z-40 pb-4 flex justify-center">
        <button
          onClick={() => scrollToPage(currentPage + 1)}
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default HeroSection;
function isLocalStorageAvailable() {
  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    console.log("location");
    return true;
  } catch (e) {
    return false;
  }
}
