import {
  Dialog,
  DialogBody,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useState } from "react";

const BiographySection = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = (node) => {
    setSelectedImage(node);
    setOpen(true);
  };

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
    <div>
      <Dialog size="xs" open={open} handler={handleClose} className="bg-black">
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
            {/* <IconButton variant="text" size="sm" color={"red"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </IconButton> */}
            {/* <Button color="gray" size="sm">
              Free Download
            </Button> */}
          </div>
        </DialogHeader>
        <div className="flex flex-wrap overflow-auto max-h-[90vh]">
          {" "}
          {/* Added overflow-auto and max height */}
          <DialogBody>
            {selectedImage ? (
              <GatsbyImage
                image={getImage(selectedImage)}
                alt={selectedImage.node?.relativePath || "image"}
                className="object-contain h-auto w-auto max-w-full"
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
            <Typography className="min-w-64 max-w-72">
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
