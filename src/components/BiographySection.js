import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

const BiographySection = () => {
  const data = useStaticQuery(graphql`
    query {
      photos: allFile(
        filter: { absolutePath: { regex: "/src/images/photos/" } }
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
      {data.rooms.edges.map((room, index) => {
        const roomImage = getImage(room.node.childImageSharp.gatsbyImageData);
        const smallPhotos = groupedSmallPhotos[index] || [];

        return (
          <div key={room.node.relativePath} className="flex flex-wrap mb-4">
            <div className="w-1/3 flex-none p-1">
              <div className="rounded overflow-hidden shadow-lg h-full">
                <GatsbyImage
                  image={roomImage}
                  alt={room.node.relativePath}
                  className="object-contain h-full w-full"
                />
              </div>
            </div>
            <div className="w-2/3 flex-1">
              <div className="flex flex-row flex-wrap">
                {smallPhotos.slice(0, 3).map(({ node }) => (
                  <div
                    key={node.relativePath}
                    className="rounded overflow-hidden shadow-lg w-1/3 p-1"
                  >
                    <GatsbyImage
                      image={getImage(node.childImageSharp.gatsbyImageData)}
                      alt={node.relativePath}
                      className="object-contain h-full w-full"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-row flex-wrap flex-1">
                {smallPhotos.slice(3, 6).map(({ node }) => (
                  <div
                    key={node.relativePath}
                    className="rounded overflow-hidden shadow-lg w-1/3 p-1"
                  >
                    <GatsbyImage
                      image={getImage(node.childImageSharp.gatsbyImageData)}
                      alt={node.relativePath}
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
  );
};

export default BiographySection;
