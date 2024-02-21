import "animate.css";
import * as React from "react";
import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import Layout from "../components/Layout";
import Seo from "../components/seo";
import Trail from "../elements/trail";
const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Home" />

      <HeroSection />
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <Seo title="" description="" />;
