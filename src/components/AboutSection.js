import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { useTranslation } from "react-i18next";
import { useImageService } from "../elements/imageService";
import useRevealAnimation from "../useRevealAnimation";

const TextSection = ({ descriptionKey }) => {
  const { t } = useTranslation();
  return (
    <div className="w-screen h-screen md:h-1/2 md:w-2/3 flex justify-center items-center flex-col md:m-5 md:p-7 bg-black/50 md:bg-transparent rounded-md z">
      <p className="relative p-5 md:p-0 text-xs leading-5 sm:max-w-md lg:max-w-none md:w-3/4 md:text-base sm:text-lg ">
        {t(descriptionKey)}
      </p>
    </div>
  );
};

const AboutSection = () => {
  const { t } = useTranslation();
  const revealRef = useRevealAnimation("animate__fadeInUp", {
    threshold: 0.1,
    triggerOnce: true,
  });
  const revealRef2 = useRevealAnimation("animate__fadeInUp", {
    threshold: 0.1,
    triggerOnce: true,
  });
  const revealRef3 = useRevealAnimation("animate__fadeInUp", {
    threshold: 0.1,
    triggerOnce: true,
  });

  const { getImageData } = useImageService();
  const photo1 = getImageData("about/photo(4).jpg");
  const photo2 = getImageData("about/photo(2).jpg");
  const photo3 = getImageData("about/photo(1).jpg");

  return (
    <>
      <div
        ref={revealRef}
        className="relative flex w-full md:first:px-4 py-2 z-10 bg-black h-screen sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 "
      >
        <div
          style={{ position: "absolute" }}
          className=" inset-0 rounded-sm overflow-hidden w-full md:w-1/2 right-auto left-0 z-0 hidden md:flex"
        >
          <GatsbyImage
            image={photo1}
            alt="photo301"
            className="object-cover h-full"
          />
          <div
            style={{ position: "absolute" }}
            className=" inset-0 md:bg-gradient-to-l md:from-black md:to-transparent bg-black/20"
          ></div>
        </div>
        <div
          style={{ position: "absolute" }}
          className=" z-20 top-0 right-0 bottom-0 flex items-center justify-end sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14"
        >
          <TextSection descriptionKey="description1" />
        </div>
      </div>

      <div
        ref={revealRef2}
        className="relative flex w-full md:px-4 py-2 z-10 bg-stone-300 h-screen sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 mt-5"
      >
        <div className="w-screen h-screen md:h-1/2 md:w-2/3 flex justify-center  items-center flex-col p-4 md:m-5 md:p-7  md:bg-transparent rounded-md z-50">
          <p className="relative p-5 md:p-0 text-black text-xs font-bold leading-5 sm:max-w-md lg:max-w-none md:w-3/4 md:text-base sm:text-lg ">
            {t("description2")}
          </p>
        </div>
        <div
          style={{ position: "absolute" }}
          className=" inset-0 rounded-sm overflow-hidden w-full md:w-1/2 left-auto right-0 z-0 hidden md:flex"
        >
          <GatsbyImage
            image={photo2}
            alt="photo2"
            className="object-contain h-full"
          />
          <div
            style={{ position: "absolute" }}
            className="inset-0 md:bg-gradient-to-r md:from-stone-300 md:to-transparent bg-black/20"
          ></div>
        </div>
      </div>

      <div
        ref={revealRef3}
        className="relative flex w-full md:first:px-4 py-2 z-10 bg-black h-screen sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 mt-5"
      >
        <div
          style={{ position: "absolute" }}
          className=" inset-0 rounded-sm overflow-hidden w-full md:w-1/2 right-auto left-0 z-0 hidden md:flex"
        >
          <GatsbyImage
            image={photo3}
            alt="photo301"
            className="object-cover h-full"
          />
          <div
            style={{ position: "absolute" }}
            className=" inset-0 md:bg-gradient-to-l md:from-black md:to-transparent bg-black/20"
          ></div>
        </div>
        <div
          style={{ position: "absolute" }}
          className=" z-20 top-0 right-0 bottom-0 flex items-center justify-end sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14"
        >
          <TextSection descriptionKey="description3" />
        </div>
      </div>
    </>
  );
};

export default AboutSection;
