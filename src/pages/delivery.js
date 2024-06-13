import * as React from "react";
import DeliverySection from "../components/DeliverySection";
import Layout from "../components/Layout";
import Seo from "../components/seo";

const DeliveryPage = () => {
  return (
    <Layout>
      <DeliverySection />
    </Layout>
  );
};

export default DeliveryPage;

export const Head = () => (
  <Seo
    title="Warunki dostawy"
    description="Sprawdź warunki dostawy moich obrazów. Zapewniam bezpieczny i szybki transport."
  />
);
