import React, { useState } from "react";
import ParallaxContext from "../elements/ParallaxContext";
import "../styles/global.css";
import CookieConsent from "./CookieConsent";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  const [parallaxApi, setParallaxApi] = useState(null);

  const updateParallaxApi = (api) => {
    setParallaxApi(api);
  };
  return (
    <ParallaxContext.Provider value={{ parallaxApi, updateParallaxApi }}>
      <div className="min-h-screen bg-dark-purple relative scrollbar-custom">
        <div className="overlay-black " />
        <NavBar />
        <main>{children}</main>
        <CookieConsent />
      </div>
    </ParallaxContext.Provider>
  );
};

export default Layout;
