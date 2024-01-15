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

export const Head = () => (
  <Seo
    title="Biografia - Tomasz Słowioczek, Profesjonalny Trener Jogi"
    description="Zapoznaj się z biografią Tomasza Słowioczka, cenionego trenera jogi. Odkryj jego podróż, osiągnięcia i unikalne podejście do nauczania jogi, które inspiruje i przekształca życie wielu osób."
  />
);
