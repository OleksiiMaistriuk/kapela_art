import * as React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import DeliverySection from "../components/DeliverySection";
import Layout from "../components/Layout";
import Seo from "../components/seo";

const DeliveryPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Seo
        title={t("seo.delivery.title")}
        description={t("seo.delivery.description")}
      />
      <DeliverySection />
    </Layout>
  );
};

export default DeliveryPage;

export const Head = () => {
  const { t } = useTranslation();
  return (
    <Seo
      title={t("seo.delivery.title")}
      description={t("seo.delivery.description")}
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
