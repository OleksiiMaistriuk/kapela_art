import React, { Suspense, lazy, useEffect, useState } from "react";
import { useTransition } from "react-spring";
import loadingImage from "../images/backgrounds/download.png";
import photo from "../images/backgrounds/photo.jpg";
import video from "../images/Magdalena.mp4";
import videoMobile3 from "../images/mobile3.mp4";
import "../styles/global.css";

const GallerySection = lazy(() => import("./GallerySection"));
const OpinionsSection = lazy(() => import("./OpinionsSection"));
const AboutSection = lazy(() => import("./AboutSection"));
const Footer = lazy(() => import("./Footer"));

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [bigVideoLoaded, setBigVideoLoaded] = useState(false);
  const [smallVideoLoaded, setSmallVideoLoaded] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  const transition = useTransition(true, {
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-100%)" },
    config: { duration: 5000 },
  });


  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);
  return (
    <>
     <div className="h-screen">
        {transition((style, i) => (
          <div
            key={i}
            style={style}
            className="fixed top-0 left-0 w-full h-full"
          >
            {!isModalOpen && !bigVideoLoaded && !isMobile && (
              <img
                src={loadingImage}
                alt="Loading"
                className="hidden md:block inset-0 h-full w-full object-cover"
              />
            )}
            {!isMobile && (
              <video
                autoPlay
                muted
                loop
                className={`hidden md:block inset-0 h-full w-full object-cover overlay-black ${
                  bigVideoLoaded ? "block" : "hidden"
                }`}
                onLoadedData={() => setBigVideoLoaded(true)}
              >
                <source src={video} type="video/mp4" />
                Magdalena Kapela
              </video>
            )}

            {!isModalOpen && !smallVideoLoaded && isMobile && (
              <img
                src={photo}
                alt="Loading"
                className="md:hidden inset-0 h-full w-full object-cover"
              />
            )}
            {isMobile && (
              <video
                autoPlay
                muted
                loop
                className={`md:hidden inset-0 h-full w-full object-cover ${
                  smallVideoLoaded ? "block" : "hidden"
                }`}
                onLoadedData={() => setSmallVideoLoaded(true)}
              >
                <source src={videoMobile3} type="video/mp4" />
                Magdalena Kapela
              </video>
            )}
          </div>
        ))}
      </div>

      <div className="relative bg-transparent z-10 text-white pt-[100vh] sm:pt-[50vh]">
        <div id="1" className="my-10">
          <AboutSection />
        </div>
        <div id="2" className="my-10">
          <Suspense fallback={<div>Loading...</div>}>
            <OpinionsSection />
          </Suspense>
        </div>
        <div id="3" className="my-10">
          <Suspense fallback={<div>Loading...</div>}>
            <GallerySection />
          </Suspense>
        </div>
        <div id="4" className="my-10">
          <Suspense fallback={<div>Loading...</div>}>
            <Footer />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
