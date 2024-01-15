import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { biographyList } from "../constants/biographyList";
import { useImageService } from "../elements/imageService";

const BiographySection = () => {
  const { getImageData } = useImageService();
  const myImageData = getImageData("backgrounds/biography.JPG");

  return (
    <section className="relative">
      <div className="grid text-center  place-content-center  isolate">
        {myImageData && (
          <GatsbyImage
            image={myImageData}
            alt="Decorative Background Image"
            className="h-full w-full object-right md:object-center -z-10"
            style={{ position: "absolute" }}
          />
        )}
        <span className="bg-black absolute w-full h-full opacity-40" />
        <h1 className="max-w-2xl mx-auto mb-10 text-2xl font-extrabold text-center md:text-3xl xl:text-4xl text-white pt-5 z-10">
          Biografia
        </h1>

        {biographyList.map((biography, index) => (
          <article
            key={index}
            className="grid max-w-screen-xl px-1 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 p-5 rounded-xl mb-5 z-10"
          >
            <div className={`m-auto place-self-center  `}>
              <h2 className=" mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl text-white">
                {biography.title}
              </h2>
              <p className="mb-6 font-light lg:mb-8 md:text-lg lg:text-xl text-white p-3">
                {biography.description}
              </p>

              <GatsbyImage
                image={getImageData(biography.imageUrl)}
                alt={biography.altText}
                className="object-fill rounded-lg max-w-xl"
              />
            </div>
            <a
              href={biography.link}
              className=" m-6 font-light md:text-lg lg:text-xl text-bold text-white"
            >
              {biography.link}
            </a>{" "}
          </article>
        ))}
      </div>
    </section>
  );
};

export default BiographySection;
