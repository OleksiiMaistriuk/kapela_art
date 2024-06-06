import { Dialog, DialogHeader, Typography } from "@material-tailwind/react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import { animated, useTransition } from "react-spring";
import { imageDetails } from "../constants/gallery";
import { useImageService } from "../elements/imageService";
import useRevealAnimation from "../useRevealAnimation";
const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const GallerySection = () => {
  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [smallRandomImage, setSmallRandomImage] = useState(null);
  const [renderedImage, setRenderedImage] = useState(null);
  const [secondRenderedImage, setSecondRenderedImage] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [imageId, setImageId] = useState("");
  const [rate, setRate] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [secondCurrentImageIndex, setSecondCurrentImageIndex] = useState(0);
  const [shuffledRooms, setShuffledRooms] = useState([]);
  const [shuffledSecondRooms, setShuffledSecondRooms] = useState([]);

  const { getAllImagesFromDirectory } = useImageService();

  const backgroundImagesData = getAllImagesFromDirectory("photos");
  const secondBackgroundImagesData = getAllImagesFromDirectory("nsphotos");

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

  const secondTransitions = useTransition(secondCurrentImageIndex, {
    from: { opacity: 0, config: { duration: 1000 } },
    enter: { opacity: 1, config: { duration: 10000 } },
    leave: { opacity: 0, config: { duration: 1000 } },
    config: { duration: 8000 },
    onRest: (_a, _b, item) => {
      if (secondCurrentImageIndex === item) {
        setSecondCurrentImageIndex(
          (state) => (state + 1) % backgroundImagesData.length
        );
      }
    },
    exitBeforeEnter: true,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImagesData.length
      );
    }, 10000);

    return () => clearInterval(timer);
  }, [backgroundImagesData.length]);

  useEffect(() => {
    shuffleRooms();
    shuffleSecondRooms();
  }, []);

  const shuffleRooms = () => {
    setShuffledRooms(shuffleArray([...data.rooms.edges]).slice(0, 3));
  };
  const shuffleSecondRooms = () => {
    setShuffledSecondRooms(shuffleArray([...data.rooms.edges]).slice(0, 1));
  };

  const handleOpen = (node, smallNode, nodeName) => {
    setSelectedImage(node);
    setSmallRandomImage(smallNode);
    const imageDetail = imageDetails.find(
      (detail) => detail.id === nodeName || detail.name === nodeName
    );
    setImageTitle(imageDetail?.title || "Default Title");
    setImageDescription(imageDetail?.description || "Default Description");
    setImageId(imageDetail?.id || nodeName);
    setRate(imageDetail?.rate || nodeName);
    setOpen(true);
  };
  const handleSecondOpen = (node, smallNode, nodeName) => {
    setSelectedImage(node);
    setSmallRandomImage(smallNode);
    const imageDetail = imageDetails.find(
      (detail) => detail.id === nodeName || detail.name === nodeName
    );
    setImageTitle(imageDetail?.title || "Default Title");
    setImageDescription(imageDetail?.description || "Default Description");
    setImageId(imageDetail?.id || nodeName);
    setRate(imageDetail?.rate || nodeName);
    setOpenSecond(true);
  };

  const revealRef = useRevealAnimation("animate__fadeInUp", {
    threshold: 0,
    triggerOnce: true,
  });

  const handleClose = () => {
    setOpen(false);
    setOpenSecond(false);
  };

  const data = useStaticQuery(graphql`
    query {
      photosNS: allFile(
        filter: { absolutePath: { regex: "/src/images/nsphotos/" } }
      ) {
        edges {
          node {
            name
            relativePath
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, height: 800, quality: 100)
            }
          }
        }
      }
      photos: allFile(
        filter: { absolutePath: { regex: "/src/images/photos/" } }
      ) {
        edges {
          node {
            name
            relativePath
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, height: 800, quality: 100)
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
              gatsbyImageData(layout: CONSTRAINED, height: 800, quality: 100)
            }
          }
        }
      }
    }
  `);

  const groupedSmallPhotos = [];
  const groupedPhotosNS = [];

  if (data.photosNS) {
    for (let i = 0; i < data.photosNS.edges.length; i += 4) {
      groupedPhotosNS.push(data.photosNS.edges.slice(i, i + 4));
    }
  }
  for (let i = 0; i < data.photos.edges.length; i += 6) {
    groupedSmallPhotos.push(data.photos.edges.slice(i, i + 6));
  }

  return (
    <div ref={revealRef} className="reveal bg-slate-950/90 p-6">
      <Dialog size="xxl" open={open} handler={handleClose} className="bg-black">
        <div>
          <DialogHeader className="justify-between absolute bg-transparent w-full z-30">
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
                {rate && (
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {rate}
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
          <div className="flex flex-wrap justify-center items-start max-h-full p-5 mt-16 md:mt-7">
            {selectedImage && (
              <div className="relative">
                <GatsbyImage
                  image={getImage(selectedImage)}
                  alt={"image"}
                  className="max-h-min object-contain"
                />

                {smallRandomImage && (
                  <div
                    className="absolute w-1/4 h-1/3 flex justify-center items-center"
                    style={{
                      top: "39%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <GatsbyImage
                      image={getImage(smallRandomImage)}
                      alt="small random"
                      className="inset-0 h-full w-full object-cover"
                      style={{
                        boxShadow: `0 0 50px black, inset 0 0 50px white`,
                      }}
                    />{" "}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20  to-black/50 "></div>
                  </div>
                )}
              </div>
            )}
            {imageDescription && (
              <div className="p-5 ">
                <Typography className="min-w-64 max-w-screen-sm">
                  {imageDescription}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </Dialog>
      <Dialog
        size="xxl"
        open={openSecond}
        handler={handleClose}
        className="bg-black"
      >
        <div>
          <DialogHeader className="justify-between absolute bg-transparent w-full z-30">
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
                {rate && (
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {rate}
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
          <div className="flex flex-wrap justify-center items-start max-h-full p-5 mt-16 md:mt-7">
            {selectedImage && (
              <div className="relative">
                <GatsbyImage
                  image={getImage(selectedImage)}
                  alt={"image"}
                  className="max-h-min object-contain"
                />

                {smallRandomImage && (
                  <div
                    className="absolute w-1/3 h-1/4 flex justify-center items-center"
                    style={{
                      top: "40%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <GatsbyImage
                      image={getImage(smallRandomImage)}
                      alt="small random"
                      className="inset-0 h-full w-full object-cover"
                      style={{
                        boxShadow: `0 0 50px black, inset 0 0 50px white`,
                      }}
                    />{" "}
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/30 to-black/50 "></div> */}
                  </div>
                )}
              </div>
            )}
            {imageDescription && (
              <div className="p-5 ">
                <Typography className="min-w-64 max-w-screen-sm">
                  {imageDescription}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </Dialog>

      <div>
        {" "}
        {shuffledRooms.map((room, roomIndex) => {
          const roomImage = getImage(room.node.childImageSharp.gatsbyImageData);
          const smallPhotos = groupedSmallPhotos[roomIndex] || [];

          const randomIndex = Math.floor(Math.random() * smallPhotos.length);
          const randomSmallPhoto = smallPhotos[randomIndex];
          const orderClass = roomIndex % 2 === 0 ? "order-last" : "order-first";

          return (
            <>
              <div
                key={`room-${room.node.relativePath}`}
                className="flex flex-wrap mb-4 "
              >
                <div className={`w-1/3 flex-none p-1 ${orderClass}`}>
                  <button
                    onClick={shuffleRooms}
                    className="  absolute p-1 m-5 z-30 "
                  >
                    Change rooms
                  </button>
                  {/* <p className=" bg-black bg-opacity-50 text-xs sm:text-sm p-1">
                    {room.node.relativePath}
                  </p> */}
                  <div
                    className="rounded overflow-hidden shadow-lg h-full transition-transform duration-300 hover:scale-95 cursor-pointer relative flex justify-center items-center"
                    onClick={() => {
                      handleOpen(roomImage, renderedImage, roomIndex);
                      setImageTitle(null);
                      setImageDescription(null);
                    }}
                  >
                    {" "}
                    <GatsbyImage
                      image={roomImage}
                      alt={room.node.relativePath || "image"}
                      className="object-contain h-full w-full"
                    />
                    {randomSmallPhoto && (
                      <div
                        className="absolute inset-0 flex justify-center items-center bg-gradient-to-r  from-white/50 to-transparent  rounded-sm  p-4"
                        style={{
                          top: "41%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "auto",
                          height: "auto",
                          maxWidth: "70%",
                          maxHeight: "33%",
                        }}
                      >
                        {transitions((style, i) => {
                          const currentRenderedImage = backgroundImagesData[i];
                          return (
                            <animated.div
                              key={i}
                              style={{
                                ...style,
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                boxShadow: `0 0 50px black, inset 0 0 50px white`,
                              }}
                            >
                              <GatsbyImage
                                image={getImage(currentRenderedImage)}
                                alt="room image"
                                className="inset-0 h-full w-full object-cover"
                                onLoad={() =>
                                  setRenderedImage(currentRenderedImage)
                                }
                              />{" "}
                              <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent "></div>
                            </animated.div>
                          );
                        })}
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
                          key={`smallphoto-1-${node.relativePath}`}
                          className="rounded overflow-hidden shadow-lg w-1/3 p-1 transition-transform duration-300 hover:scale-95 cursor-pointer"
                          onClick={() => {
                            handleOpen(
                              node.childImageSharp.gatsbyImageData,
                              null,
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
                              {smallPhotoDetails.title}
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
                          key={`smallphoto-2-${node.relativePath}`}
                          className="rounded overflow-hidden shadow-lg w-1/3 p-1 transition-transform duration-300 hover:scale-95 cursor-pointer"
                          onClick={() => {
                            handleOpen(
                              node.childImageSharp.gatsbyImageData,
                              null,
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
                              {smallPhotoDetails.title}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div>
        {" "}
        {shuffledSecondRooms.map((room, roomIndex) => {
          const roomImage = getImage(room.node.childImageSharp.gatsbyImageData);
          const smallPhotosNS = groupedPhotosNS[roomIndex] || [];
          const randomIndex = Math.floor(Math.random() * smallPhotosNS.length);
          const randomSmallPhoto = smallPhotosNS[randomIndex];

          return (
            <>
              <div
                key={`secondroom-${room.node.relativePath}`}
                className="flex flex-wrap mb-4 "
              >
                <div className={`w-1/3 flex-none p-1 `}>
                  <button
                    onClick={shuffleSecondRooms}
                    className="  absolute p-1 m-5 z-30 "
                  >
                    Change rooms
                  </button>
                  {/* <p className=" bg-black bg-opacity-50 text-xs sm:text-sm p-1">
                    {room.node.relativePath}
                  </p> */}
                  <div
                    className="rounded overflow-hidden shadow-lg h-full transition-transform duration-300 hover:scale-95 cursor-pointer relative flex justify-center items-center"
                    onClick={() => {
                      handleSecondOpen(
                        roomImage,
                        secondRenderedImage,
                        roomIndex
                      );
                      setImageTitle(null);
                      setImageDescription(null);
                    }}
                  >
                    {" "}
                    <GatsbyImage
                      image={roomImage}
                      alt={room.node.relativePath || "image"}
                      className="object-contain h-full w-full"
                    />
                    {randomSmallPhoto && (
                      <div
                        className="absolute inset-0 flex justify-center items-center   rounded-sm  p-4"
                        style={{
                          top: "40%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          maxWidth: "100%",
                          maxHeight: "23%",
                        }}
                      >
                        {secondTransitions((style, i) => {
                          const currentRenderedImage =
                            secondBackgroundImagesData[i];
                          return (
                            <animated.div
                              key={i}
                              style={{
                                ...style,
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                boxShadow: `0 0 50px black, inset 0 0 50px white`,
                              }}
                            >
                              <GatsbyImage
                                image={getImage(currentRenderedImage)}
                                alt="room image"
                                className="inset-0 h-full w-full object-cover"
                                onLoad={() =>
                                  setSecondRenderedImage(currentRenderedImage)
                                }
                              />{" "}
                            </animated.div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-2/3 flex-1">
                  <div className="flex flex-row flex-wrap">
                    {smallPhotosNS.map(({ node }, i) => {
                      const imageName = node.name;
                      const smallPhotoDetails = imageDetails.find(
                        (detail) => detail.id === imageName
                      );

                      return (
                        <div
                          key={`secondsmallphoto-1-${node.relativePath}`}
                          className="rounded overflow-hidden shadow-lg w-1/2 p-1 transition-transform duration-300 hover:scale-95 cursor-pointer"
                          onClick={() => {
                            handleOpen(
                              node.childImageSharp.gatsbyImageData,
                              null,
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
                              {smallPhotoDetails.title}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default GallerySection;
