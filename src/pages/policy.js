import * as React from "react";
import Layout from "../components/Layout";
import PolicySection from "../components/PolicySection";
import Seo from "../components/seo";

const PolicyPage = () => {
  return (
    <Layout>
      <PolicySection />
    </Layout>
  );
};

export default PolicyPage;

export const Head = () => (
  <Seo
    title="Polityka Prywatności"
    description="Zapoznaj się z naszą polityką prywatności i dowiedz się, jak chronimy Twoje dane osobowe."
  />
);
