import React from "react";
import "../styles/global.css";
import CookieConsent from "./CookieConsent";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-dark-purple relative scrollbar-custom">
      <div className="overlay-black " />
      <NavBar />
      <div>{children}</div>
      <CookieConsent />
      <Footer />
    </div>
  );
};

export default Layout;
