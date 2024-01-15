import * as React from "react";
import Layout from "../components/Layout";
import PositionsSection from "../components/PositionsSection";
import Seo from "../components/seo";

const PositionsPage = () => {
  return (
    <Layout>
      <PositionsSection />
    </Layout>
  );
};

export default PositionsPage;

export const Head = () => (
  <Seo
    title="Pozycje Jogi - Tomasz Słowioczek, Trener Jogi"
    description="Poznaj różne pozycje jogi z Tomaszem Słowioczkiem. Znajdziesz tutaj przewodnik po asanach, ich korzyściach i wskazówkach dotyczących praktyki."
  />
);
