import * as React from "react";
import GallerySection from "../components/GallerySection";
import Layout from "../components/Layout";
import Seo from "../components/seo";

const GalleryPage = () => {
  return (
    <Layout>
      <GallerySection />
    </Layout>
  );
};

export default GalleryPage;

export const Head = () => (
  <Seo
    title="Galeria - Tomasz Słowioczek, Trener Jogi"
    description="Obejrzyj galerię zdjęć Tomasza Słowioczka, pokazującą jego sesje jogi i warsztaty. Zdjęcia odzwierciedlają atmosferę zajęć i techniki nauczania jogi."
  />
);
