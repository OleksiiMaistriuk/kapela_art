import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import Slider from "react-slick";
import { opinions } from "../constants/opinions";
import { useImageService } from "../elements/imageService";
import useRevealAnimation from "../useRevealAnimation";

const TextSection = ({ title, description, subTitle }) => (
  <div className="flex flex-col items-center justify-center w-full p-4 md:w-1/2 border-l-2 border-gray-200 h-full md:h-screen animate-fadeInUp">
    <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl md:text-5xl text-center text-black">
      {title}
    </h2>
    <p className="text-base font-semibold tracking-tight sm:text-lg md:text-xl text-center text-black mt-2">
      {subTitle}
    </p>
    <p className="mt-3 text-sm font-light leading-relaxed text-black sm:text-base md:text-lg max-w-prose text-center">
      {description}
    </p>
  </div>
);

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        cursor: "pointer",

        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",

        position: "absolute",
        left: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        cursor: "pointer",

        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

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
    autoplaySpeed: 10000,
    cssEase: "ease-in-out",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const { getImageData } = useImageService();

  return (
    <div
      ref={revealRef}
      className="h-full bg-stone-300/90 flex flex-col justify-center relative"
    >
      <Slider {...settings}>
        {opinions.map((item, index) => {
          const photo = getImageData(`opinions/${item.image}.png`);
          return (
            <div key={index} className="px-2 py-6 sm:px-4 sm:py-8">
              <div className="flex flex-col md:flex-row items-center justify-center w-full">
                <div className="w-full sm:w-2/5 mr-5 p-2 transition-transform duration-300 ease-in-out transform ">
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
