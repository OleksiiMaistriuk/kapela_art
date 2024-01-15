import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";

const GallerySection = () => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { absolutePath: { regex: "/src/images/photos/" } }) {
        edges {
          node {
            relativePath
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 4000, quality: 100)
            }
          }
        }
      }
    }
  `);
  const allImages = data.allFile.edges.map(
    (edge) => edge.node.childImageSharp.gatsbyImageData
  );

  const splitImagesIntoColumns = (images) => {
    const columns = [[], [], []];
    images.forEach((image, index) => {
      columns[index % 3].push({ image, originalIndex: index });
    });
    return columns;
  };

  const [columns] = useState(splitImagesIntoColumns(allImages));

  const handleImageClick = (originalIndex) => {
    setCurrentImage(originalIndex);
    setActiveIndex(originalIndex);
    setIsSliderOpen(true);
  };

  const handleNext = () => {
    const nextIndex = (currentImage + 1) % allImages.length;
    setCurrentImage(nextIndex);
    setActiveIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex =
      currentImage === 0 ? allImages.length - 1 : currentImage - 1;
    setCurrentImage(prevIndex);
    setActiveIndex(prevIndex);
  };
  useEffect(() => {
    if (isSliderOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSliderOpen]);
  return (
    <section className="container mx-auto p-4 ">
      <h1 className="max-w-2xl mx-auto mb-10 text-2xl font-extrabold text-center sm:text-3xl md:text-3xl xl:text-4xl dark:text-white pt-14">
        Galeria
      </h1>

      <div className="gap-3 md:gap-4 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {columns.map((columnImages, columnIndex) => (
          <ul key={columnIndex} className="grid grid-cols-1 gap-y-2">
            {columnImages.map(({ image, originalIndex }) => (
              <li key={originalIndex} className="relative h-full">
                <button
                  className="rounded-xl focus:outline-none focus-visible:ring"
                  onClick={() => handleImageClick(originalIndex)}
                  aria-label={`Open image ${originalIndex}`}
                >
                  <GatsbyImage
                    image={image}
                    alt={`photo ${originalIndex}`}
                    className="rounded-xl"
                  />
                </button>
              </li>
            ))}
          </ul>
        ))}
      </div>

      {isSliderOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center pt-10">
          <div className="relative max-w-3xl w-full">
            <span
              className="absolute top-1 right-4 text-white text-3xl md:text-4xl cursor-pointer z-50"
              onClick={() => setIsSliderOpen(false)}
              role="button"
              tabIndex={0}
              aria-label="Close image slider"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setIsSliderOpen(false);
                }
              }}
            >
              &times;
            </span>
            <div className="relative flex items-center justify-center">
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 text-white z-50"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setIsSliderOpen(false);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="h-7 w-7 transform rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
              <GatsbyImage
                image={getImage(allImages[currentImage])}
                alt={`photo ${currentImage}`}
                className="mx-auto"
                imgClassName="rounded-md"
                style={{ maxHeight: "85vh" }}
              />
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-white z-50"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setIsSliderOpen(false);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>{" "}
          <div className="absolute bottom-7 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(allImages.length).fill("").map((_, i) => (
              <span
                key={i}
                role="button" // Indicate that this is an interactive element
                tabIndex={0} // Make it focusable
                className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => {
                  setActiveIndex(i);
                  setCurrentImage(i);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Esc" || e.key === " ") {
                    setActiveIndex(i);
                    setCurrentImage(i);
                  }
                }}
                aria-label={`Select image ${i + 1}`} // Add aria-label for screen readers
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
