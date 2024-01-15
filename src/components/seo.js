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
          ? `${title} - Certyfikowany Trener Jogi | ${defaultTitle}`
          : `${title} - Indywidualne Zajęcia Jogi`}
      </title>
      <meta
        name="description"
        content={`${metaDescription} Oferuję indywidualne sesje jogi, profesjonalne doradztwo oraz Treningi personalne na wszystkich poziomach zaawansowania.`}
      />
      <meta
        property="og:title"
        content="Certyfikowany Trener Jogi - Indywidualne Zajęcia Jogi i Treningi personalne"
      />
      <meta
        property="og:description"
        content="Odkryj drogę do wewnętrznego spokoju i fizycznego zdrowia z naszym certyfikowanym trenerem jogi. Dostosowane sesje jogi dla początkujących i zaawansowanych."
      />
      <meta property="og:type" content="website" />
      {children}
    </Helmet>
  );
}

export default Seo;
