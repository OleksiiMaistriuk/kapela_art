// AboutSection.js
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { aboutList } from "../constants/aboutList";
import { useImageService } from "../elements/imageService";
import useRevealAnimation from "../useRevealAnimation"; // Ensure the path is correct
import Footer from "./Footer";

const AboutItem = ({ about, index, getImageData }) => {
  const revealRef = useRevealAnimation("animate__fadeInUp", {
    threshold: 0.1,
    triggerOnce: true,
  });
  const imageData = getImageData(about.imageUrl);

  return (
    <>
      <div
        ref={revealRef}
        className="flex w-full h-screen px-4 py-8  z-10 reveal "
      >
        <div
          className={`w-1/2 flex justify-center items-center flex-col p-0 ${
            index % 2 === 0 ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-extrabold leading-tight ">
            {about.title}
          </h2>
          <p className="text-base md:text-lg lg:text-xl font-bold ">
            {about.description}
          </p>
        </div>

        <div
          className={`w-1/2 flex justify-center items-center p-0  ${
            index % 2 === 0 ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <GatsbyImage
            image={imageData}
            alt={about.altText}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
    </>
  );
};

const AboutSection = () => {
  const { getImageData } = useImageService();

  return (
    <section className="bg-slate-950/75 ">
      <div className="text-center min-h-[500px] ">
        {aboutList.map((about, index) => (
          <AboutItem
            key={index}
            about={about}
            index={index}
            getImageData={getImageData}
          />
        ))}
      </div>
      <Footer />
    </section>
  );
};

export default AboutSection;
