import {
  Dialog,
  DialogBody,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import { animated, useTransition } from "react-spring";
import { useImageService } from "../elements/imageService";
import useRevealAnimation from "../useRevealAnimation";
import Footer from "./Footer";

const imageDetails = [
  {
    id: "photo(1)",
    title: "Sunset Boulevard",
    description:
      "A stunning sunset view over the urban landscape, capturing the golden hour's serene beauty.",
  },
  {
    id: "photo(2)",
    title: "Forest Whisper",
    description:
      "The dense foliage of an ancient forest, where sunlight barely touches the moss-covered ground.",
  },
  {
    id: "photo(3)",
    title: "Urban Rhythm",
    description:
      "The dynamic hustle of city life, with streaks of light illustrating the fast pace of urban dwellers.",
  },
  {
    id: "photo(4)",
    title: "Mountain Solitude",
    description:
      "A solitary peak rising above the clouds, embodying the majestic isolation of nature.",
  },
  {
    id: "photo(5)",
    title: "Ocean's Embrace",
    description:
      "The endless expanse of the ocean, where waves meet the shore in a gentle embrace.",
  },
  {
    id: "photo(6)",
    title: "Desert Mirage",
    description:
      "The deceptive calm of the desert, with mirages blurring the lines between reality and illusion.",
  },
  {
    id: "photo(7)",
    title: "Frozen in Time",
    description:
      "A landscape caught in the grip of winter, where every detail is crystallized in ice.",
  },
  {
    id: "photo(8)",
    title: "City at Night",
    description:
      "The city comes alive at night, with lights twinkling like stars in a concrete sky.",
  },
  {
    id: "photo(9)",
    title: "Spring Awakening",
    description:
      "Nature reborn, with flowers blooming and trees bursting into life, heralding the arrival of spring.",
  },
  {
    id: "photo(10)",
    title: "Autumn's Palette",
    description:
      "The warm hues of autumn leaves creating a tapestry of color, signaling the change of seasons.",
  },
  {
    id: "photo(11)",
    title: "Summer Vibes",
    description:
      "The joyful energy of summer, with bright skies and a sense of endless possibilities.",
  },
  {
    id: "photo(12)",
    title: "Winter Wonderland",
    description:
      "A serene, snowy landscape, transforming the world into a magical winter wonderland.",
  },
  {
    id: "photo(13)",
    title: "Rainforest Canopy",
    description:
      "The vibrant life of the rainforest, with a canopy teeming with diverse flora and fauna.",
  },
  {
    id: "photo(14)",
    title: "Ancient Ruins",
    description:
      "The mysterious allure of ancient ruins, whispering stories of civilizations long past.",
  },
  {
    id: "photo(15)",
    title: "Cosmic Dance",
    description:
      "The mesmerizing beauty of the night sky, adorned with stars in a cosmic dance.",
  },
  {
    id: "photo(16)",
    title: "Garden Tranquility",
    description:
      "A tranquil garden, offering a peaceful retreat from the hustle and bustle of daily life.",
  },
  {
    id: "photo(17)",
    title: "Mountain Reflection",
    description:
      "A pristine lake reflecting the majestic beauty of surrounding mountains, creating a symphony of nature.",
  },
  {
    id: "photo(18)",
    title: "Golden Fields",
    description:
      "Vast fields of golden crops swaying in the breeze, heralding a season of abundance.",
  },
  {
    id: "photo(19)",
    title: "Seaside Serenity",
    description:
      "The tranquil sound of waves lapping at the shore, offering a moment of serenity by the seaside.",
  },
  {
    id: "photo(20)",
    title: "Urban Oasis",
    description:
      "A lush green space amidst the urban sprawl, providing a much-needed oasis of calm.",
  },
];

const GallerySection = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [imageId, setImageId] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { getAllImagesFromDirectory } = useImageService();

  const backgroundImagesData = getAllImagesFromDirectory("photos");

  const transitions = useTransition(currentImageIndex, {
    from: { opacity: 0, config: { duration: 1000 } },
    enter: { opacity: 1, config: { duration: 10000 } },
    leave: { opacity: 0, config: { duration: 1000 } },
    config: { duration: 8000 },
    onRest: (_a, _b, item) => {
      if (currentImageIndex === item) {
        setCurrentImageIndex(
          (state) => (state + 1) % backgroundImagesData.length
        );
      }
    },
    exitBeforeEnter: true,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImagesData.length
      );
    }, 10000);

    return () => clearInterval(timer);
  }, [backgroundImagesData.length]);

  const handleOpen = (node, nodeName) => {
    setSelectedImage(node);

    const imageDetail = imageDetails.find(
      (detail) => detail.id === nodeName || detail.name === nodeName
    );

    setImageTitle(imageDetail?.title || "Default Title");
    setImageDescription(imageDetail?.description || "Default Description");
    setImageId(imageDetail?.id || nodeName);
    setOpen(true);
  };

  const revealRef = useRevealAnimation("animate__fadeInUp", {
    threshold: 0,
    triggerOnce: true,
  });
  const handleClose = () => setOpen(false);

  const data = useStaticQuery(graphql`
    query {
      photos: allFile(
        filter: { absolutePath: { regex: "/src/images/photos/" } }
      ) {
        edges {
          node {
            name
            relativePath
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                width: 600
                quality: 100
                transformOptions: { fit: CONTAIN }
              )
            }
          }
        }
      }
      rooms: allFile(
        filter: { absolutePath: { regex: "/src/images/rooms/" } }
      ) {
        edges {
          node {
            relativePath
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 2000, quality: 100)
            }
          }
        }
      }
    }
  `);

  const groupedSmallPhotos = [];
  for (let i = 0; i < data.photos.edges.length; i += 6) {
    groupedSmallPhotos.push(data.photos.edges.slice(i, i + 6));
  }

  return (
    <div ref={revealRef} className="reveal bg-slate-950 p-6">
      <Dialog
        size="xxl"
        open={open}
        handler={handleClose}
        className="bg-black "
      >
        <DialogHeader className="justify-between">
          <div className="flex items-center gap-3">
            <div className="-mt-px flex flex-col">
              {imageTitle && (
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {imageTitle}
                </Typography>
              )}
              {imageId && (
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {imageId}
                </Typography>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClose}
              className="text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </DialogHeader>
        <div className="flex flex-wrap justify-center overflow-auto max-h-[90vh] scrollbar-custom">
          <DialogBody>
            {selectedImage ? (
              <GatsbyImage
                image={getImage(selectedImage)}
                alt={selectedImage.node?.relativePath || "image"}
                className="object-contain h-auto w-auto max-w-full "
              />
            ) : (
              <div className="text-center p-4">
                <Typography color="gray" className="font-normal">
                  No image selected.
                </Typography>
              </div>
            )}
          </DialogBody>
          {imageDescription && (
            <DialogBody>
              <Typography className="min-w-64 max-w-screen-sm">
                {imageDescription}
              </Typography>
            </DialogBody>
          )}
        </div>
      </Dialog>

      <div>
        {data.rooms.edges.map((room, roomIndex) => {
          const roomImage = getImage(room.node.childImageSharp.gatsbyImageData);
          const smallPhotos = groupedSmallPhotos[roomIndex] || [];
          const randomIndex = Math.floor(Math.random() * smallPhotos.length);
          const randomSmallPhoto = smallPhotos[randomIndex];
          const orderClass = roomIndex % 2 === 0 ? "order-last" : "order-first";
          return (
            <div key={room.node.relativePath} className="flex flex-wrap mb-4 ">
              <div className={`w-1/3 flex-none p-1 ${orderClass}`}>
                <div
                  className="rounded overflow-hidden shadow-lg h-full transition-transform duration-300 hover:scale-95 cursor-pointer relative flex justify-center items-center"
                  onClick={() => {
                    handleOpen(roomImage, roomIndex);
                    setImageTitle(null);
                    setImageDescription(null);
                  }}
                >
                  <GatsbyImage
                    image={roomImage}
                    alt={room.node.relativePath || "image"}
                    className="object-contain h-full w-full"
                  />
                  {randomSmallPhoto && (
                    <div
                      className="absolute w-1/3 h-1/3 flex justify-center items-center"
                      style={{
                        top: "40%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {transitions((style, i) => (
                        <animated.div
                          key={i}
                          style={{
                            ...style,
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            boxShadow: `0 0 10px white, inset 0 0 10px white`,
                          }}
                        >
                          {" "}
                          <GatsbyImage
                            image={getImage(backgroundImagesData[i])}
                            alt=""
                            className="inset-0 h-full w-full object-cover"
                          />
                        </animated.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-2/3 flex-1">
                <div className="flex flex-row flex-wrap">
                  {smallPhotos.slice(0, 3).map(({ node }, i) => {
                    const imageName = node.name;
                    const smallPhotoDetails = imageDetails.find(
                      (detail) => detail.id === imageName
                    );

                    return (
                      <div
                        key={node.relativePath}
                        className="rounded overflow-hidden shadow-lg w-1/3 p-1 transition-transform duration-300 hover:scale-95 cursor-pointer"
                        onClick={() => {
                          handleOpen(
                            node.childImageSharp.gatsbyImageData,
                            imageName
                          );
                          setImageTitle(
                            smallPhotoDetails?.title || "Default Title"
                          );
                          setImageDescription(
                            smallPhotoDetails?.description ||
                              "Default Description"
                          );
                        }}
                      >
                        <div className="relative w-full h-full">
                          <GatsbyImage
                            image={getImage(
                              node.childImageSharp.gatsbyImageData
                            )}
                            alt={node.relativePath || "image"}
                            className="object-cover w-full h-full"
                          />
                          <p className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-xs sm:text-sm p-1">
                            {node.name}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-row flex-wrap flex-1">
                  {smallPhotos.slice(3, 6).map(({ node }, i) => {
                    const imageName = node.name;
                    const smallPhotoDetails = imageDetails.find(
                      (detail) => detail.id === imageName
                    );

                    return (
                      <div
                        key={node.relativePath}
                        className="rounded overflow-hidden shadow-lg w-1/3 p-1 transition-transform duration-300 hover:scale-95 cursor-pointer"
                        onClick={() => {
                          handleOpen(
                            node.childImageSharp.gatsbyImageData,
                            imageName
                          );
                          setImageTitle(
                            smallPhotoDetails?.title || "Default Title"
                          );
                          setImageDescription(
                            smallPhotoDetails?.description ||
                              "Default Description"
                          );
                        }}
                      >
                        {" "}
                        <div className="relative w-full h-full">
                          <GatsbyImage
                            image={getImage(
                              node.childImageSharp.gatsbyImageData
                            )}
                            alt={node.relativePath || "image"}
                            className="object-cover w-full h-full"
                          />
                          <p className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-xs sm:text-sm p-1">
                            {node.name}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

   
    </div>
  );
};

export default GallerySection;
