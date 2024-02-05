import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import { heroLinks } from "../constants/heroLinks";
import { useImageService } from "../elements/imageService";
import "../styles/global.css";
import { reloadPage } from "./../../.cache/fast-refresh-overlay/utils";

const HeroSection = () => {
  const { getAllImagesFromDirectory } = useImageService();
  const backgroundImagesData = getAllImagesFromDirectory("backgrounds");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImagesData.length
      );
    }, 6000);

    return () => clearInterval(timer);
  }, [backgroundImagesData.length]);

  const [props, set] = useSpring(() => ({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 500,
  }));

  useEffect(() => {
    set({ opacity: 1 });
    const timeout = setTimeout(() => set({ opacity: 0 }), 5000);

    return () => clearTimeout(timeout);
  }, [currentImageIndex, set]);

  const backgroundImage = getImage(backgroundImagesData[currentImageIndex]);

  const handleClearLocalStorage = () => {
    localStorage.clear();
    reloadPage();
  };

  return (
    <header className="grid relative isolate overflow-hidden h-screen ">
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
      <div className="z-10 lg:flex justify-between">
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            {" "}
            <button onClick={handleClearLocalStorage}>
              Clear Local Storage
            </button>
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
      </ul>
    </header>
  );
};

export default HeroSection;
