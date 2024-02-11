import React from "react";
import "../styles/global.css";
import CookieConsent from "./CookieConsent";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-dark-purple relative">
      <div className="overlay-black" />
      <NavBar />
      <main>{children}</main>
      <CookieConsent />
    </div>
  );
};

export default Layout;
