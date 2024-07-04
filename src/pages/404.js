// src/pages/404.js
import React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <main>
      <h1>{t("404:Page Not Found")}</h1>
      <p>{t("404:Sorry, the page you are looking for does not exist.")}</p>
    </main>
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

export default NotFoundPage;
