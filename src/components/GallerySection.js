import { Dialog, DialogHeader, Typography } from "@material-tailwind/react";
import { graphql, navigate, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { animated, useTransition } from "react-spring";
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
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [smallRandomImage, setSmallRandomImage] = useState(null);
  const [renderedImage, setRenderedImage] = useState(null);
  const [secondRenderedImage, setSecondRenderedImage] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [rate, setRate] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [secondCurrentImageIndex, setSecondCurrentImageIndex] = useState(0);
  const [shuffledRooms, setShuffledRooms] = useState([]);
  const [shuffledSecondRooms, setShuffledSecondRooms] = useState([]);

  const { getAllImagesFromDirectory } = useImageService();

  const backgroundImagesData = getAllImagesFromDirectory("photos");
  const secondBackgroundImagesData = getAllImagesFromDirectory("nsphotos");

  const transitions = useTransition(currentImageIndex, {
    from: { opacity: 0, config: { duration: 500 } },
    enter: { opacity: 1, config: { duration: 11000 } },
    leave: { opacity: 0, config: { duration: 500 } },

    onRest: (_a, _b, item) => {
      if (currentImageIndex === item) {
        setCurrentImageIndex(
          (state) => (state + 1) % backgroundImagesData.length
        );
      }
    },
    exitBeforeEnter: true,
  });

  const secondTransitions = useTransition(secondCurrentImageIndex, {
    from: { opacity: 0, config: { duration: 500 } },
    enter: { opacity: 1, config: { duration: 11000 } },
    leave: { opacity: 0, config: { duration: 500 } },

    onRest: (_a, _b, item) => {
      if (secondCurrentImageIndex === item) {
        setSecondCurrentImageIndex(
          (state) => (state + 1) % secondBackgroundImagesData.length
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
    }, 12000);

    return () => clearInterval(timer);
  }, [backgroundImagesData.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % secondBackgroundImagesData.length
      );
    }, 12000);

    return () => clearInterval(timer);
  }, [secondBackgroundImagesData.length]);

  const shuffleRooms = () => {
    setShuffledRooms(shuffleArray([...data.rooms.edges]).slice(0, 3));
  };
  const shuffleSecondRooms = () => {
    setShuffledSecondRooms(shuffleArray([...data.rooms.edges]).slice(0, 1));
  };

  useEffect(() => {
    shuffleRooms();
    shuffleSecondRooms();
  }, []);

  const handleOpen = (node, smallNode, nodeName) => {
    setSelectedImage(node);
    setSmallRandomImage(smallNode);
    const imageDetail = t("gallery.imageDetails", { returnObjects: true }).find(
      (detail) => detail.id === nodeName || detail.name === nodeName
    );
    setImageTitle(imageDetail?.title || t("gallery.default_title"));
    setImageDescription(
      imageDetail?.description || t("gallery.default_description")
    );
    setRate(imageDetail?.size);
    setOpen(true);
  };

  const handleSecondOpen = (node, smallNode, nodeName) => {
    setSelectedImage(node);
    setSmallRandomImage(smallNode);
    const imageDetail = t("gallery.imageDetails", { returnObjects: true }).find(
      (detail) => detail.id === nodeName || detail.name === nodeName
    );
    setImageTitle(imageDetail?.title || t("gallery.default_title"));
    setImageDescription(
      imageDetail?.description || t("gallery.default_description")
    );

    setRate(imageDetail?.size);
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
    <div ref={revealRef} className="reveal bg-black/90 p-1 sm:p-6">
      <Dialog
        size="xxl"
        open={open}
        handler={handleClose}
        className={` bg-black h-full xl:h-screen ${
          !imageDescription && "h-screen"
        }`}
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

                {rate && (
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {t("gallery.size_label")}: {rate} cm.
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
                    className="absolute w-1/4  flex justify-center items-center"
                    style={{
                      top: "41%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "auto",
                      height: "auto",
                    }}
                  >
                    <GatsbyImage
                      image={getImage(smallRandomImage)}
                      alt="small random"
                      className="inset-0 w-1/2  object-cover "
                    />{" "}
                  </div>
                )}
              </div>
            )}
            {imageDescription && (
              <div className="p-5 ">
                <Typography className="min-w-64 max-w-screen-sm bg-black">
                  {imageDescription}
                </Typography>
                <button
                  onClick={() =>
                    navigate("/contact", { state: { imageTitle } })
                  }
                  className="border p-2 rounded  hover:bg-gray-700 focus:outline-none w-15 mt-10 "
                >
                  {t("gallery.learn_more")}
                </button>
              </div>
            )}
          </div>
        </div>
      </Dialog>

      <Dialog
        size="xxl"
        open={openSecond}
        handler={handleClose}
        className={` bg-black h-full xl:h-screen ${
          !imageDescription && "h-screen"
        }`}
      >
        <div>
          <DialogHeader className="justify-between absolute bg-transparent w-full z-30">
            <div className="flex items-center gap-3">
              <div className="flex flex-col bg-black ">
                {imageTitle && (
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {imageTitle}
                  </Typography>
                )}

                {rate && (
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {t("gallery.size_label")}: {rate} cm.
                  </Typography>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClose}
                className=" p-2 rounded-full hover:bg-gray-700 focus:outline-none"
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
                    className="absolute w-1/3  flex justify-center items-center"
                    style={{
                      top: "40%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <GatsbyImage
                      image={getImage(smallRandomImage)}
                      alt="small random"
                      className="inset-0 h-full w-full object-cover "
                    />{" "}
                  </div>
                )}
              </div>
            )}
            {imageDescription && (
              <div className="p-5 ">
                <Typography className="min-w-64 max-w-screen-sm">
                  {imageDescription}
                </Typography>
                <button
                  onClick={() =>
                    navigate("/contact", { state: { imageTitle } })
                  }
                  className="border p-2 rounded  hover:bg-gray-700 focus:outline-none w-15 m-10"
                >
                  {t("gallery.learn_more")}
                </button>
              </div>
            )}
          </div>
        </div>
      </Dialog>

      <div className="mt-5">
        {" "}
        {shuffledRooms.map((room, roomIndex) => {
          const roomImage = getImage(room.node.childImageSharp.gatsbyImageData);
          const smallPhotos = groupedSmallPhotos[roomIndex] || [];
          const randomIndex = Math.floor(Math.random() * smallPhotos.length);
          const randomSmallPhoto = smallPhotos[randomIndex];
          const orderClass = roomIndex % 2 === 0 ? "order-last" : "order-first";

          return (
            <div
              key={`room-${room.node.relativePath}`}
              className="flex flex-wrap mb-4 "
            >
              {" "}
              <div className={`w-1/3 flex-none p-1 ${orderClass} relative `}>
                <button
                onClick={() => shuffleRooms()}
                  className="absolute bg-black/50 rounded p-1 m-2 z-30 bottom-0 text-[0.5rem]  md-text:base  hover:bg-gray-700/60  md:bottom-4 sm:right-4 sm:p-2 sm:text-base sm:m-3"
                >
                  {t("gallery.change_room")}
                </button>
                <div
                  className="rounded overflow-hidden shadow-lg h-full transition-transform duration-300 hover:scale-95 cursor-pointer relative flex justify-center items-center"
                  onClick={() => {
                    handleOpen(roomImage, renderedImage, roomIndex);
                    setImageTitle(null);
                    setImageDescription(null);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleOpen(roomImage, renderedImage, roomIndex);
                      setImageTitle(null);
                      setImageDescription(null);
                    }
                  }}
                  aria-label="Open room image"
                >
                  {" "}
                  {roomImage ? (
                    <GatsbyImage
                      image={roomImage}
                      alt={room.node.relativePath || "image"}
                      className="object-contain h-full w-full"
                    />
                  ) : (
                    <p>Image not found</p>
                  )}
                  {randomSmallPhoto && (
                    <div
                      className="absolute inset-0 flex justify-center items-center bg-gradient-to-r   rounded-sm  p-4"
                      style={{
                        top: "41%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "auto",
                        height: "auto",
                      }}
                    >
                      {" "}
                      {transitions((style, i) => {
                        const currentRenderedImage = backgroundImagesData[i];

                        return (
                          <animated.div
                            key={i}
                            style={{
                              ...style,
                              position: "absolute",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {currentRenderedImage ? (
                              <GatsbyImage
                                image={getImage(currentRenderedImage)}
                                alt="room image"
                                className="inset-0  w-5/6 mr-0  object-cover"
                                onLoad={() =>
                                  setRenderedImage(currentRenderedImage)
                                }
                              />
                            ) : (
                              <p>Image not found</p>
                            )}
                          </animated.div>
                        );
                      })}{" "}
                    </div>
                  )}
                </div>{" "}
              </div>
              <div className="w-2/3 flex-1">
                <div className="flex flex-row flex-wrap">
                  {smallPhotos.slice(0, 3).map(({ node }, i) => {
                    const imageName = node.name;
                    const smallPhotoDetails = t("gallery.imageDetails", {
                      returnObjects: true,
                    }).find((detail) => detail.id === imageName);
                    const smallPhotoImage = getImage(
                      node.childImageSharp.gatsbyImageData
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
                            smallPhotoDetails?.title ||
                              t("gallery.default_title")
                          );
                          setImageDescription(
                            smallPhotoDetails?.description ||
                              t("gallery.default_description")
                          );
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleOpen(
                              node.childImageSharp.gatsbyImageData,
                              null,
                              imageName
                            );
                            setImageTitle(
                              smallPhotoDetails?.title ||
                                t("gallery.default_title")
                            );
                            setImageDescription(
                              smallPhotoDetails?.description ||
                                t("gallery.default_description")
                            );
                          }
                        }}
                        aria-label="Open small photo"
                      >
                        <div className="relative w-full h-full flex items-center">
                          {smallPhotoImage ? (
                            <GatsbyImage
                              image={smallPhotoImage}
                              alt={node.relativePath || "Magdalena Kapela"}
                              className="object-cover "
                            />
                          ) : (
                            <p>Image not found</p>
                          )}
                          <p className="absolute bottom-0  left-0 bg-black bg-opacity-50 text-[0.5rem] sm:text-sm p-1">
                            {smallPhotoDetails?.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-row flex-wrap flex-1">
                  {smallPhotos.slice(3, 6).map(({ node }, i) => {
                    const imageName = node.name;
                    const smallPhotoDetails = t("gallery.imageDetails", {
                      returnObjects: true,
                    }).find((detail) => detail.id === imageName);
                    const smallPhotoImage = getImage(
                      node.childImageSharp.gatsbyImageData
                    );

                    return (
                      <div
                        key={`smallphoto-2-${node.relativePath}`}
                        className="rounded overflow-hidden shadow-lg w-1/3 p-1 transition-transform duration-300 hover:scale-95 cursor-pointer flex justify-center items-center"
                        onClick={() => {
                          handleOpen(
                            node.childImageSharp.gatsbyImageData,
                            null,
                            imageName
                          );
                          setImageTitle(
                            smallPhotoDetails?.title ||
                              t("gallery.default_title")
                          );
                          setImageDescription(
                            smallPhotoDetails?.description ||
                              t("gallery.default_description")
                          );
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleOpen(
                              node.childImageSharp.gatsbyImageData,
                              null,
                              imageName
                            );
                            setImageTitle(
                              smallPhotoDetails?.title ||
                                t("gallery.default_title")
                            );
                            setImageDescription(
                              smallPhotoDetails?.description ||
                                t("gallery.default_description")
                            );
                          }
                        }}
                        aria-label="Open small photo"
                      >
                        <div className="relative w-full h-full flex items-center">
                          {smallPhotoImage ? (
                            <GatsbyImage
                              image={smallPhotoImage}
                              alt={node.relativePath || "Magdalena Kapela"}
                              className="object-cover w-full "
                            />
                          ) : (
                            <p>Image not found</p>
                          )}
                          <p className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-[0.5rem] sm:text-sm p-1">
                            {smallPhotoDetails?.title}
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
      <div className="mt-5">
        {" "}
        {shuffledSecondRooms.map((room, roomIndex) => {
          const roomImage = getImage(room.node.childImageSharp.gatsbyImageData);
          const smallPhotosNS = groupedPhotosNS[roomIndex] || [];
          const randomIndex = Math.floor(Math.random() * smallPhotosNS.length);
          const randomSmallPhoto = smallPhotosNS[randomIndex];

          return (
            <div
              key={`secondroom-${room.node.relativePath}`}
              className="flex flex-wrap mb-4 "
            >
              <div className={`w-1/3 flex-none p-1 relative`}>
                <button
                  onClick={shuffleSecondRooms}
                  className="absolute bg-black/50 rounded p-1 m-2 z-30 bottom-0 text-[0.5rem]  md-text:base  hover:bg-gray-700/60  md:bottom-4 sm:right-4 sm:p-2 sm:text-base sm:m-3"
                >
                  {t("gallery.change_room")}
                </button>
                <div
                  className="rounded overflow-hidden shadow-lg h-full transition-transform duration-300 hover:scale-95 cursor-pointer relative flex justify-center items-center"
                  onClick={() => {
                    handleSecondOpen(roomImage, secondRenderedImage, roomIndex);
                    setImageTitle(null);
                    setImageDescription(null);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSecondOpen(roomImage, secondRenderedImage, roomIndex);
                      setImageTitle(null);
                      setImageDescription(null);
                    }
                  }}
                  aria-label="Open room image"
                >
                  {" "}
                  {roomImage ? (
                    <GatsbyImage
                      image={roomImage}
                      alt={room.node.relativePath || "image"}
                      className="object-contain h-full w-full"
                    />
                  ) : (
                    <p>Image not found</p>
                  )}
                  {randomSmallPhoto && (
                    <div
                      className="absolute inset-0 flex justify-center items-center   rounded-sm  p-4"
                      style={{
                        top: "40%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        maxWidth: "100%",
                        maxHeight: "24%",
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
                            }}
                          >
                            {currentRenderedImage ? (
                              <GatsbyImage
                                image={getImage(currentRenderedImage)}
                                alt="room image"
                                className="inset-0 h-full w-full object-cover"
                                onLoad={() =>
                                  setSecondRenderedImage(currentRenderedImage)
                                }
                              />
                            ) : (
                              <p>Image not found</p>
                            )}
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
                    const smallPhotoDetails = t("gallery.imageDetails", {
                      returnObjects: true,
                    }).find((detail) => detail.id === imageName);
                    const smallPhotoImage = getImage(
                      node.childImageSharp.gatsbyImageData
                    );

                    return (
                      <div
                        key={`secondsmallphoto-1-${node.relativePath}`}
                        className="rounded overflow-hidden shadow-lg w-1/2 p-1 transition-transform duration-300 hover:scale-95 cursor-pointer flex justify-center items-center"
                        onClick={() => {
                          handleSecondOpen(
                            node.childImageSharp.gatsbyImageData,
                            null,
                            imageName
                          );
                          setImageTitle(
                            smallPhotoDetails?.title ||
                              t("gallery.default_title")
                          );
                          setImageDescription(
                            smallPhotoDetails?.description ||
                              t("gallery.default_description")
                          );
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleSecondOpen(
                              node.childImageSharp.gatsbyImageData,
                              null,
                              imageName
                            );
                            setImageTitle(
                              smallPhotoDetails?.title ||
                                t("gallery.default_title")
                            );
                            setImageDescription(
                              smallPhotoDetails?.description ||
                                t("gallery.default_description")
                            );
                          }
                        }}
                        aria-label="Open small photo"
                      >
                        <div className="relative w-full h-full flex items-center">
                          {smallPhotoImage ? (
                            <GatsbyImage
                              image={smallPhotoImage}
                              alt={node.relativePath || "Magdalena Kapela"}
                              className="object-cover w-full "
                            />
                          ) : (
                            <p>Image not found</p>
                          )}
                          <p className="absolute bottom-0 left-0 text-[0.5rem] bg-black bg-opacity-50 text-xs sm:text-sm p-1">
                            {smallPhotoDetails?.title}
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
