import * as React from "react";
import GallerySection from "../components/GallerySection";
import Layout from "../components/Layout";
import Seo from "../components/seo";

const BiographyPage = () => {
  return (
    <Layout>
      <GallerySection />
    </Layout>
  );
};

export default BiographyPage;

export const Head = () => <Seo title="" description="" />;
