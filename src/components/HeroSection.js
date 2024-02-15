import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect, useRef, useState } from "react";
import { animated, useTransition } from "react-spring";
import { useImageService } from "../elements/imageService";
import "../styles/global.css";

import Trail from "../elements/trail";
import AboutSection from "./AboutSection";
const HeroSection = () => {
  const parallaxRef = useRef(null);
  const [parallaxApi, setParallaxApi] = useState(null);

  const { getAllImagesFromDirectory } = useImageService();
  const backgroundImagesData = getAllImagesFromDirectory("backgrounds");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const scrollToNext = () => {
    if (parallaxApi) {
      parallaxApi.scrollTo(1);
    }
  };

  const alignCenter = { display: "flex", alignItems: "center" };

  return (
    <>
      <div className="background">
        <div className="grid relative isolate overflow-hidden h-screen">
          {transitions((style, i) => (
            <animated.div
              key={i}
              style={{
                ...style,
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            >
              <GatsbyImage
                image={getImage(backgroundImagesData[i])}
                alt=""
                className="inset-0 h-full w-full object-cover"
                style={{ position: "absolute" }}
              />
            </animated.div>
          ))}
        </div>
      </div>

      <Parallax pages={3} ref={parallaxRef}>
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
          <div className="absolute bottom-5 w-full flex justify-center">
            <button
              onClick={scrollToNext}
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
                  fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </div>
        </ParallaxLayer>

        <ParallaxLayer sticky={{ start: 1, end: 1 }}>
          <AboutSection />
        </ParallaxLayer>

        {/* Arrow button layer */}
      </Parallax>

      {/* <span className="bg-black absolute inset-0 opacity-10 sm:opacity-30" /> */}
      {/* <div className="z-20 lg:flex justify-between">
            <div className="px-6 lg:px-8">
              <div className="mx-auto max-w-2xl">
                {" "}
                <h2 className="text-2xl tracking-tightsm:text-4xl">tekst</h2>
                  <p className="mt-6 text-lg leading-8 text-white">tekst</p>
              </div>
            </div>
            <div className="px-6 mr-0 lg:px-8">
                <div className="hidden mx-auto max-w-2xl md:block lg:mx-0">
                  <p className="mt-6 text-lg leading-8 text-white">tekst</p>
                </div>
                <nav className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none"></nav>{" "}
                <h1 className="z-50 mx-auto mt-10 max-w-2xl text-3xl font-extrabold text-centerxl:text-4xl">
                  Magdalena Kapela
                </h1>
              </div>
          </div>{" "}
          <ul className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7sm:grid-cols-2 md:flex lg:gap-x-10">
              {heroLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href}>
                    {link.name} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </li>
              ))}
            </ul> */}
      {/* <header className="grid relative isolate overflow-hidden h-screen">
        {backgroundImage && (
          <animated.div style={props}>
            <GatsbyImage
              image={backgroundImage}
              alt=""
              className="inset-0 -z-10 h-full w-full object-cover"
              style={{ position: "absolute" }}
            />
          </animated.div>
        )}
        <span className="bg-black absolute inset-0 opacity-10 sm:opacity-30" />
        <div className="z-20 lg:flex justify-between">
          <div className="px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
              {" "}
              <button onClick={handleClearLocalStorage}>
                Clear Local Storage
              </button>
              <h2 className="text-2xl tracking-tight  sm:text-4xl">tekst</h2>
              <p className="mt-6 text-lg leading-8 text-white">tekst</p>
            </div>
          </div>
          <div className="px-6 mr-0 lg:px-8">
            <div className="hidden mx-auto max-w-2xl md:block lg:mx-0">
              <p className="mt-6 text-lg leading-8 text-white">tekst</p>
            </div>
            <nav className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none"></nav>{" "}
            <h1 className="z-50 mx-auto mt-10 max-w-2xl text-3xl font-extrabold text-centerxl:text-4xl">
              Magdalena Kapela
            </h1>
          </div>
        </div>{" "}
        <ul className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7sm:grid-cols-2 md:flex lg:gap-x-10">
          {heroLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.href}>
                {link.name} <span aria-hidden="true">&rarr;</span>
              </Link>
            </li>
          ))}
        </ul>
      </header>
      <div className="relative z-30">
        <AboutSection />
      </div> */}
    </>
  );
};

export default HeroSection;
