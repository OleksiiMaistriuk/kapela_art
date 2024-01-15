import { graphql, useStaticQuery } from "gatsby";

export const useImageService = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "images" } }) {
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

  const getImageData = (imageName) => {
    const imageData = data.allFile.edges.find(
      (edge) => edge.node.relativePath === imageName
    )?.node.childImageSharp.gatsbyImageData;

    return imageData;
  };

  return { getImageData };
};
