import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import * as React from "react";
import ContactSection from "../components/ContactSection";
import Layout from "../components/Layout";
import Seo from "../components/seo";

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Seo
        title={t("seo.contact.title")}
        description={t("seo.contact.description")}
      />
      <ContactSection />
    </Layout>
  );
};

export default ContactPage;

export const Head = () => {
  const { t } = useTranslation();
  return (
    <Seo
      title={t("seo.contact.title")}
      description={t("seo.contact.description")}
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
