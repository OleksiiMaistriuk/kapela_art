import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import * as React from "react";
import Layout from "../components/Layout";
import PolicySection from "../components/PolicySection";
import Seo from "../components/seo";

const PolicyPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Seo
        title={t("seo.policy.title")}
        description={t("seo.policy.description")}
      />
      <PolicySection />
    </Layout>
  );
};

export default PolicyPage;

export const Head = () => {
  const { t } = useTranslation();
  return (
    <Seo
      title={t("seo.policy.title")}
      description={t("seo.policy.description")}
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
