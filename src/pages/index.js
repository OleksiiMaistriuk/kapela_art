import "animate.css";
import * as React from "react";
import CookieConsent from "../components/CookieConsent";
import HeroSection from "../components/HeroSection";
import NavBar from "../components/NavBar";
import Seo from "../components/seo";
import "../styles/global.css";

const IndexPage = () => {
  return (
    <div className="min-h-screen bg-dark-purple relative  ">
      <div className="overlay-black" />
      <NavBar />
      <CookieConsent />
      <Seo title="Home" />
      <HeroSection />
    </div>
  );
};

export default IndexPage;

export const Head = () => <Seo title="" description="" />;
