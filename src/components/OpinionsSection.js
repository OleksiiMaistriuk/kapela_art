import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import Slider from "react-slick";

import { opinions } from "../constants/opnionsList";
import { useImageService } from "../elements/imageService";
import useRevealAnimation from "../useRevealAnimation";

const TextSection = ({ title, description, subTitle }) => (
  <div className="flex flex-col items-center justify-center w-full p-5 md:w-1/2 border-l-2 border-gray-200 h-screen">
    <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl text-center text-black">
      {title}
    </h2>
    <p className="text-lg font-semibold tracking-tight sm:text-xl text-center text-black">
      {subTitle}
    </p>
    <p className="mt-4 text-lg font-light leading-relaxed text-black sm:text-xl max-w-prose text-center">
      {description}
    </p>
  </div>
);

const OpinionsSection = () => {
  const revealRef = useRevealAnimation("animate__fadeInUp", {
    threshold: 0.1,
    triggerOnce: true,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "ease-in-out",
  };

  const { getImageData } = useImageService();

  return (
    <div className="h-full bg-white flex flex-col justify-center">
      <Slider {...settings}>
        {opinions.map((item, index) => {
          const photo = getImageData(`opinions/${item.image}.png`);
          return (
            <div key={index} ref={revealRef} className=" px-4 py-8 ">
              <div className="flex flex-row items-center justify-center w-full ">
                <div className="w-full sm:w-1/3 p-2 transition-transform duration-300 ease-in-out transform hover:scale-105">
                  <GatsbyImage
                    image={photo}
                    alt={item.title}
                    className="rounded-lg shadow-sm m-1"
                    imgClassName="object-cover w-full h-full"
                  />
                </div>
                <TextSection
                  description={item.description}
                  title={item.title}
                  subTitle={item.subTitle}
                />
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default OpinionsSection;
