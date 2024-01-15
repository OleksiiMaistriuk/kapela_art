import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { aboutList } from "../constants/aboutList";
import { useImageService } from "../elements/imageService";

const AboutSection = () => {
  const { getImageData } = useImageService();
  const myImageData = getImageData("backgrounds/about.png");

  return (
    <section className="bg-white dark:bg-gray-900 ">
      <div className="grid text-center text-black place-content-center min-h-[500px] relative isolate">
        <GatsbyImage
          image={myImageData}
          alt="Background Image"
          className="h-full w-full object-right md:object-center -z-10"
          style={{ position: "absolute" }}
        />
        <span className="bg-white absolute w-full h-full opacity-40" />
        <h1 className="max-w-2xl mx-auto mb-10 text-2xl font-extrabold text-center md:text-3xl xl:text-4xl dark:text-white pt-5 z-10">
          O mnie
        </h1>
        {aboutList.map((about, index) => (
          <article
            key={index}
            className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 z-10"
          >
            <div
              className={`m-auto place-self-center lg:col-span-7 p-5 ${
                index % 2 === 0 ? "lg:order-1" : "lg:order-2"
              }`}
            >
              <h2 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
                {about.title}
              </h2>
              <p className="max-w-2xl mb-6 font-bold dark:bg-gray-900 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                {about.description}
              </p>
            </div>
            <div
              className={`lg:col-span-5 lg:flex rounded-lg ${
                index % 2 === 0 ? "lg:order-2" : "lg:order-1"
              }`}
            >
              {" "}
              <GatsbyImage
                image={getImageData(about.imageUrl)}
                alt={about.altText}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
