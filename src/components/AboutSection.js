import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { useImageService } from "../elements/imageService";
import useRevealAnimation from "../useRevealAnimation"; // Ensure the path is correct

const TextSection = ({ title, description }) => (
  <div className="w-full md:w-1/2 flex justify-center items-center flex-col m-5 p-0 border-l">
    <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
      {title}
    </h2>
    <p className="relative mt-6 font-light leading-7 sm:max-w-md lg:max-w-none w-3/4">
      {description}
    </p>
  </div>
);

const ImageGallerySection = ({ columnImages }) => (
  <div className="w-full md:w-1/2 flex justify-center items-center p-0 ">
    <div className="gap-3 md:gap-4 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {columnImages.map((images, columnIndex) => (
        <ul
          key={columnIndex}
          className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4"
        >
          {images.map(({ image, originalIndex }, index) => {
            const rotationClass = index % 2 === 0 ? "rotate-2" : "-rotate-2";
            return (
              <li
                key={originalIndex}
                className={`relative overflow-hidden ${rotationClass} w-1/3 md:w-full`}
              >
                <div className="rounded-xl focus:outline-none focus-visible:ring shadow-lg transition-transform hover:border">
                  <GatsbyImage
                    image={image}
                    alt={`photo ${originalIndex}`}
                    className="rounded-xl transform transition duration-500 hover:scale-110 w-full sm:w-auto m-1 sm:m-2 "
                    imgClassName="object-cover"
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
function splitImagesIntoColumns(images) {
  const columns = [[], [], []];
  images.forEach((image, index) => {
    columns[index % 3].push({ image, originalIndex: index });
  });
  return columns;
}

const AboutSection = ({ isMobile }) => {
  const revealRef = useRevealAnimation("animate__fadeInUp", {
    threshold: 0.1,
    triggerOnce: true,
  });
  const revealRef2 = useRevealAnimation("animate__fadeInUp", {
    threshold: 0.1,
    triggerOnce: true,
  });
  const { getImageData } = useImageService();
  const photo1 = getImageData("about/photo(1).jpg");
  const photo2 = getImageData("about/photo(2).jpg");

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

  const aboutColumns = splitImagesIntoColumns(
    data.aboutImages.edges.map(
      (edge) => edge.node.childImageSharp.gatsbyImageData
    )
  );
  const biographyColumns = splitImagesIntoColumns(
    data.biographyImages.edges.map(
      (edge) => edge.node.childImageSharp.gatsbyImageData
    )
  );

  return (
    <>
      <div
        ref={revealRef}
        className="flex flex-col md:flex-row w-full px-4 py-8 z-10 reveal bg-slate-950/75  "
      >
        {/* {!isMobile && <ImageGallerySection columnImages={aboutColumns} />} */}
        <div className="rounded-sm focus:outline-none focus-visible:ring shadow-lg transition-transform w-full sm:w-1/3">
          <GatsbyImage
            image={photo1}
            alt={`photo `}
            className="rounded-sm transform transition duration-500 hover:scale-110 w-full sm:w-auto m-1 sm:m-2 "
            imgClassName="object-cover"
          />
        </div>
        <TextSection
          // title="Warsztaty i wystawy artystyczne"
          description="Regularnie organizuję warsztaty i wystawy, aby dzielić się moją pasją i wiedzą z innymi. Te wydarzenia są okazją do spotkań z ludźmi, wymiany doświadczeń i prezentowania moich najnowszych prac."
        />
      </div>
      <div
        ref={revealRef2}
        className="flex flex-col md:flex-row w-full px-4 p-8 z-10 reveal bg-stone-300"
      >
        <div className="w-full md:w-1/2 flex justify-center items-center flex-col m-5 p-0 border-r-2 border-black">
          <p className="relative mt-6 font-light leading-7 sm:max-w-md lg:max-w-none text-black w-3/4">
            Jestem zawsze otwarta na nowe techniki i podejścia w sztuce. Uważam,
            że ciągła nauka i eksploracja są kluczowe dla rozwoju artystycznego.
            Regularnie uczestniczę w warsztatach i szkoleniach, aby rozwijać
            moje umiejętności i wprowadzać świeże pomysły do moich prac
          </p>
        </div>
        <div className="rounded-sm focus:outline-none focus-visible:ring shadow-lg transition-transform w-full sm:w-1/3">
          <GatsbyImage
            image={photo2}
            alt={`photo `}
            className="rounded-sm transform transition duration-500 hover:scale-110 w-full sm:w-auto m-1 sm:m-2 "
            imgClassName="object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default AboutSection;
