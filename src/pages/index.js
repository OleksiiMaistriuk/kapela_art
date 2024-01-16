import * as React from "react";
import HeroSection from "../components/HeroSection";
import Layout from "../components/Layout";
import Seo from "../components/seo";

const IndexPage = () => {
  return (
    <Layout>
      <HeroSection />
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <Seo title="" description="" />;
