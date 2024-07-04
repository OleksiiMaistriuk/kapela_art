import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import * as React from "react";
import Layout from "../components/Layout";
import StatuteSection from "../components/StatuteSection";
import Seo from "../components/seo";

const StatutePage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Seo
        title={t("seo.statute.title")}
        description={t("seo.statute.description")}
      />
      <StatuteSection />
    </Layout>
  );
};

export default StatutePage;

export const Head = () => {
  const { t } = useTranslation();
  return (
    <Seo
      title={t("seo.statute.title")}
      description={t("seo.statute.description")}
    />
  );
};

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
