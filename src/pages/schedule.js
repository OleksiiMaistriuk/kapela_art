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

export const Head = () => <Seo title="Harmonogram" description="." />;
