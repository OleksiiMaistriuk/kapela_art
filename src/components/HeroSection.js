import React, { useEffect, useState } from "react";
import { animated, useTransition } from "react-spring";
import Trail from "../elements/trail";
import video from "../images/Magdalena.mp4";
import videoMobile1 from "../images/mobile1.mp4";
import videoMobile2 from "../images/mobile2.mp4";
import videoMobile3 from "../images/mobile3.mp4";
import "../styles/global.css";
import AboutSection from "./AboutSection";
import Footer from "./Footer";
import GallerySection from "./GallerySection";
import OpinionsSection from "./OpinionsSection";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isShown, setIsShown] = useState(true);
  const [buttonToUp, setButtonToUp] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);

  const videos = [videoMobile1, videoMobile2, videoMobile3];
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  useEffect(() => {
    setCurrentVideoIndex(Math.floor(Math.random() * videos.length));
  }, []);

  const transition = useTransition(isShown, {
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-100%)" },
    config: { duration: 3000 },
  });

  const transitions = useTransition(isModalOpen, {
    from: { opacity: 0, transform: "scale(0.95)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.95)" },
    config: { duration: 3000 },
  });

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {transitions(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              className="fixed inset-0 flex justify-center items-center z-50 cursor-pointer"
              onClick={toggleModal}
            >
              <Trail>
                <h1 className="text-3xl font-extrabold text-center sm:text-4xl">
                  Magdalena Kapela
                </h1>
              </Trail>
            </animated.div>
          )
      )}
      <div className="relative isolate overflow-hidden h-screen scrollbar-custom">
        {transition((style, i) => (
          <animated.div
            key={i}
            style={style}
            className="fixed top-0 left-0 w-full h-full"
          >
            <video
              autoPlay
              muted
              loop
              className="hidden md:block inset-0 h-full w-full object-cover"
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {videos.map((videoSrc, index) => (
              <video
                key={index}
                autoPlay
                muted
                loop
                className={`md:hidden responsive-video inset-0 h-full w-full object-cover ${
                  index === currentVideoIndex ? "" : "hidden"
                }`}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ))}
          </animated.div>
        ))}
      </div>
      <span className="bg-black absolute inset-0 opacity-50" />
      <div className="relative bg-transparent z-10 text-white pt-[100vh] sm:pt-[50vh] scrollbar-custom">
        <div id="1" className="my-10">
          <AboutSection />
        </div>
        <div id="2" className="my-10">
          <OpinionsSection />
        </div>
        <div id="3" className="my-10">
          <GallerySection />
        </div>
        <div id="4" className="my-10">
          <Footer />
        </div>
      </div>
      {buttonToUp && (
        <div className="fixed bottom-4 left-0 right-0 pb-4 flex justify-center z-50">
          <button
            onClick={() => scrollToSection(0)}
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border"
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
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default HeroSection;
