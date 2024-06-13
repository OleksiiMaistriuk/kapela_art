import * as React from "react";
import Layout from "../components/Layout";
import StatuteSection from "../components/StatuteSection";
import Seo from "../components/seo";

const StatutePage = () => {
  return (
    <Layout>
      <StatuteSection />
    </Layout>
  );
};

export default StatutePage;

export const Head = () => (
  <Seo
    title="Regulamin"
    description="Przeczytaj nasz regulamin, aby poznać zasady korzystania z naszej strony internetowej."
  />
);
