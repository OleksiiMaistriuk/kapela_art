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
    title="Polityka Prywatności - Tomasz Słowioczek, Trener Jogi"
    description="Zapoznaj się z polityką prywatności na stronie Tomasza Słowioczka. Dowiedz się, jak chronimy Twoje dane i jakie są zasady korzystania ze strony."
  />
);
