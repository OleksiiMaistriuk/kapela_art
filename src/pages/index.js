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

export const Head = () => (
  <Seo
    title="Strona Główna - Tomasz Słowioczek, Profesjonalny Trener Jogi"
    description="Witaj na stronie Tomasza Słowioczka, trenera jogi w Bielsko-Białej. Dowiedz się więcej o jego zajęciach, filozofii jogi i jak możesz wziąć udział w sesjach."
  />
);
