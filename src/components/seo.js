import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

function Seo({ description, title, children }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  const { t, i18n } = useTranslation();

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title || "Magdalena Kapela" ;

  return (
    <Helmet
      htmlAttributes={{
        lang: i18n.language,
      }}
    >
      <title>
        {defaultTitle
          ? `${title} - ${defaultTitle}`
          : `${title} - ${t("seo.defaultTitle")}`}
      </title>
      <meta
        name="description"
        content={`${metaDescription} ${t("seo.metaDescription")}`}
      />
      <meta property="og:title" content={t("seo.ogTitle")} />
      <meta property="og:description" content={t("seo.ogDescription")} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/src/images/icon.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t("seo.twitterTitle")} />
      <meta name="twitter:description" content={t("seo.twitterDescription")} />
      <meta name="twitter:image" content="/src/images/icon.png" />
      {children}
    </Helmet>
  );
}

export default Seo;
