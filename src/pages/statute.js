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
    title="Regulamin - Tomasz Słowioczek, Trener Jogi"
    description="Zapoznaj się z regulaminem i zasadami uczestnictwa w zajęciach jogi u Tomasza Słowioczka. Znajdziesz tu ważne informacje dotyczące polityki, procedur i wytycznych."
  />
);
