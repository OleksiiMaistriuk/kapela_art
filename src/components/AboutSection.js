import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { useState } from "react";
import useRevealAnimation from "../useRevealAnimation"; // Ensure the path is correct

const TextSection = ({ title, description }) => (
  <div className="w-1/2 flex justify-center items-center flex-col m-5 p-0">
    <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
      {title}
    </h2>
    <p className="relative mt-6 text-lg leading-8 sm:max-w-md lg:max-w-none">
      {description}
    </p>
  </div>
);

const ImageGallerySection = ({ columnImages }) => (
  <div className="w-1/2 flex justify-center items-center p-0">
    <div className="gap-3 md:gap-4 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {columnImages.map((images, columnIndex) => (
        <ul
          key={columnIndex}
          className="flex flex-wrap justify-center items-center gap-4"
        >
          {images.map(({ image, originalIndex }, index) => {
            const rotationClass = index % 2 === 0 ? "rotate-2" : "-rotate-2";
            return (
              <li
                key={originalIndex}
                className={`relative overflow-hidden ${rotationClass}`}
              >
                <div className="rounded-xl focus:outline-none focus-visible:ring shadow-lg transition-transform hover:border">
                  <GatsbyImage
                    image={image}
                    alt={`photo ${originalIndex}`}
                    className="rounded-xl transform transition duration-500 hover:scale-110 m-3"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  </div>
);

const AboutSection = () => {
  const revealRef = useRevealAnimation("animate__fadeInUp", {
    threshold: 0.1,
    triggerOnce: true,
  });
  const revealRef2 = useRevealAnimation("animate__fadeInUp", {
    threshold: 0.1,
    triggerOnce: true,
  });

  const data = useStaticQuery(graphql`
    query {
      aboutImages: allFile(
        filter: { absolutePath: { regex: "/src/images/about/" } }
      ) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 4000, quality: 100)
            }
          }
        }
      }
      biographyImages: allFile(
        filter: { absolutePath: { regex: "/src/images/biography/" } }
      ) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 4000, quality: 100)
            }
          }
        }
      }
    }
  `);

  const aboutImages = data.aboutImages.edges.map(
    (edge) => edge.node.childImageSharp.gatsbyImageData
  );
  const biographyImages = data.biographyImages.edges.map(
    (edge) => edge.node.childImageSharp.gatsbyImageData
  );

  // We'll assume you want to keep the same column split logic
  const [aboutColumns] = useState(splitImagesIntoColumns(aboutImages));
  const [biographyColumns] = useState(splitImagesIntoColumns(biographyImages));

  return (
    <>
      <div
        ref={revealRef}
        className="flex w-full px-4 py-8 z-10 reveal bg-slate-950/75"
      >
        <ImageGallerySection columnImages={aboutColumns} />
        <TextSection
          title="Warsztaty i wystawy artystyczne"
          description="Regularnie organizuję warsztaty i wystawy, aby dzielić się moją
            pasją i wiedzą z innymi. Te wydarzenia są okazją do spotkań z
            ludźmi, wymiany doświadczeń i prezentowania moich najnowszych prac."
        />
      </div>{" "}
      <div
        ref={revealRef2}
        className="flex w-full px-4 py-8 z-10 reveal bg-slate-950/75"
      >
        <TextSection
          title="Rozwój i eksploracja nowych technik"
          description="Jestem zawsze otwarta na nowe techniki i podejścia w sztuce. Uważam,
            że ciągła nauka i eksploracja są kluczowe dla rozwoju artystycznego.
            Regularnie uczestniczę w warsztatach i szkoleniach, aby rozwijać
            moje umiejętności i wprowadzać świeże pomysły do moich prac."
        />
        <ImageGallerySection columnImages={biographyColumns} />
      </div>
    </>
  );
};

export default AboutSection;

function splitImagesIntoColumns(images) {
  const columns = [[], [], []];
  images.forEach((image, index) => {
    columns[index % 3].push({ image, originalIndex: index });
  });
  return columns;
}
