import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";
import { Helmet } from "react-helmet";

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

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <Helmet
      htmlAttributes={{
        lang: "pl",
      }}
    >
      <title>
        {defaultTitle
          ? `${title} -  ${defaultTitle}`
          : `${title} - Sztuka Magdalena Kapela`}
      </title>
      <meta
        name="description"
        content={`${metaDescription} Tworzę wyjątkowe obrazy, które oddają emocje i piękno otaczającego świata. Moje dzieła to połączenie pasji, talentu i unikalnej wizji artystycznej.`}
      />
      <meta property="og:title" content="Magdalena Kapela - Artystka Malarka" />
      <meta
        property="og:description"
        content="Zapraszam do odkrycia mojej kolekcji obrazów, które oddają niepowtarzalne emocje i piękno otaczającego nas świata. Każde dzieło jest wyjątkowe i tworzę je z pasją oraz zaangażowaniem."
      />
      <meta property="og:type" content="website" />
      {children}
    </Helmet>
  );
}

export default Seo;
