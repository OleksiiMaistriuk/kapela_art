import * as React from "react";
import BiographySection from "../components/BiographySection";
import Layout from "../components/Layout";
import Seo from "../components/seo";

const BiographyPage = () => {
  return (
    <Layout>
      <BiographySection />
    </Layout>
  );
};

export default BiographyPage;

export const Head = () => <Seo title="" description="" />;
