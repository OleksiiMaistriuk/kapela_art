import React from "react";
import "../styles/global.css";
import CookieConsent from "./CookieConsent";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black relative  ">
      <NavBar />
      <div>{children}</div>
      <CookieConsent />
      <Footer />
    </div>
  );
};

export default Layout;
