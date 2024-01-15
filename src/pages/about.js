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
  <Seo
    title="O Mnie - Tomasz Słowioczek, Profesjonalny Trener Jogi"
    description="Tomasz Słowioczek - wykwalifikowany trener jogi z pasją i doświadczeniem. Dowiedz się więcej o jego podejściu do jogi, kwalifikacjach i filozofii nauczania, które pomagają uczniom osiągnąć harmonię ciała i umysłu."
  />
);
