import "animate.css";
import * as React from "react";

import HeroSection from "../components/HeroSection";
import Seo from "../components/seo";
import ParallaxContext from "../elements/ParallaxContext";
import "../styles/global.css";

import CookieConsent from "../components/CookieConsent";
import NavBar from "../components/NavBar";

const IndexPage = () => {
  const [parallaxApi, setParallaxApi] = React.useState(null);

  const updateParallaxApi = (api) => {
    setParallaxApi(api);
  };
  return (
    <ParallaxContext.Provider value={{ parallaxApi, updateParallaxApi }}>
      <div className="min-h-screen bg-dark-purple relative scrollbar-custom">
        <div className="overlay-black " />
        <NavBar />
        <CookieConsent />
        <Seo title="Home" />
        <HeroSection />{" "}
      </div>
    </ParallaxContext.Provider>
  );
};

export default IndexPage;

export const Head = () => <Seo title="" description="" />;
