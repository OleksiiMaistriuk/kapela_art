import {
  Dialog,
  DialogBody,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useState } from "react";
import useRevealAnimation from "../useRevealAnimation";

const BiographySection = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = (node) => {
    setSelectedImage(node);
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
              gatsbyImageData(layout: CONSTRAINED, width: 4000, quality: 100)
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
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium"
              >
                Nazwa obrazu
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="text-xs font-normal"
              >
                @kod obrazu
              </Typography>
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
          {" "}
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
          <DialogBody>
            <Typography className="min-w-64 max-w-screen-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </DialogBody>
        </div>
      </Dialog>

      <div>
        {data.rooms.edges.map((room, index) => {
          const roomImage = getImage(room.node.childImageSharp.gatsbyImageData);
          const smallPhotos = groupedSmallPhotos[index] || [];
          const orderClass = index % 2 === 0 ? "order-last" : "order-first";
          return (
            <div key={room.node.relativePath} className="flex flex-wrap mb-4">
              <div className={`w-1/3 flex-none p-1 ${orderClass}`}>
                <div
                  className="rounded overflow-hidden shadow-lg h-full transition-transform duration-300 hover:scale-95 cursor-pointer"
                  onClick={() => handleOpen(roomImage)}
                >
                  <GatsbyImage
                    image={roomImage}
                    alt={room.node.relativePath || "image"}
                    className="object-contain h-full w-full"
                  />
                </div>
              </div>
              <div className="w-2/3 flex-1">
                <div className="flex flex-row flex-wrap">
                  {smallPhotos.slice(0, 3).map(({ node }) => (
                    <div
                      key={node.relativePath}
                      className="rounded overflow-hidden shadow-lg w-1/3 p-1 transition-transform duration-300 hover:scale-95 cursor-pointer"
                      onClick={() =>
                        handleOpen(node.childImageSharp.gatsbyImageData)
                      }
                    >
                      <GatsbyImage
                        image={getImage(node.childImageSharp.gatsbyImageData)}
                        alt={node.relativePath || "image"}
                        className="object-contain h-full w-full"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-row flex-wrap flex-1">
                  {smallPhotos.slice(3, 6).map(({ node }) => (
                    <div
                      key={node.relativePath}
                      className="rounded overflow-hidden shadow-lg w-1/3 p-1 transition-transform duration-300 hover:scale-95 cursor-pointer"
                      onClick={() =>
                        handleOpen(node.childImageSharp.gatsbyImageData)
                      }
                    >
                      <GatsbyImage
                        image={getImage(node.childImageSharp.gatsbyImageData)}
                        alt={node.relativePath || "image"}
                        className="object-contain h-full w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BiographySection;
