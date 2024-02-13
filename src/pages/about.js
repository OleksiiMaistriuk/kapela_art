import * as React from "react";
import AboutSection from "../components/AboutSection";
import Layout from "../components/Layout";
import Seo from "../components/seo";

const AboutPage = () => {
  return (
    <Layout>
      <AboutSection />
    </Layout>
  );
};

export default AboutPage;

export const Head = () => (
  <Seo title="O Mnie - Magdalena Kapelaart" description="" />
);
