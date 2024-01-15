import React from "react";
import "../styles/global.css";
import CookieConsent from "./CookieConsent";
import Footer from "./Footer.js";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="pt-[4.5rem]  ">{children}</main>
      <CookieConsent />
      <Footer />
    </div>
  );
};

export default Layout;
