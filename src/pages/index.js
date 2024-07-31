import "animate.css";
import { graphql } from "gatsby";
import {
  I18nextProvider,
  useI18next,
  useTranslation,
} from "gatsby-plugin-react-i18next";
import * as React from "react";
import { useEffect } from "react";
import CookieConsent from "../components/CookieConsent";
import HeroSection from "../components/HeroSection";
import NavBar from "../components/NavBar";
import Seo from "../components/seo";
import "../styles/global.css";

const IndexPage = () => {
  const { t, i18n } = useTranslation();
  const { languages, changeLanguage, language, originalPath } = useI18next();

useEffect(() => {

    const pathLang = originalPath.split("/")[1];
    console.log("pathLang", pathLang);
    if (languages.includes(pathLang) && language !== pathLang) {
      changeLanguage(pathLang);
    }
  }, [originalPath, language, changeLanguage, languages]);

  return (
    <I18nextProvider
      i18n={i18n}
      className="min-h-screen bg-dark-purple relative"
    >
      <NavBar  />
      <CookieConsent />
      <Seo
        title={t("seo.home.title")}
        description={t("seo.home.description")}
      />
      <h1>Magdalena Kapela</h1>
      <HeroSection />
    </I18nextProvider>
  );
};

export default IndexPage;

export const Head = () => {
  const { t } = useTranslation();
  return (
    <Seo
      title={t("seo.home.title")}
      description={t("seo.home.description")}
      keywords={t("seo.home.keywords")}
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
