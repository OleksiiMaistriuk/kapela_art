import * as React from "react";
import Layout from "../components/Layout";

import ScheduleSection from "../components/ScheduleSection";
import Seo from "../components/seo";

const SchedulePage = () => {
  return (
    <Layout>
      <ScheduleSection />
    </Layout>
  );
};

export default SchedulePage;

export const Head = () => (
  <Seo
    title="Harmonogram - Tomasz Słowioczek, Trener Jogi"
    description="Zapoznaj się z harmonogramem zajęć jogi u Tomasza Słowioczka. Znajdź najbardziej odpowiednie dla siebie terminy i zapisz się na sesje."
  />
);
