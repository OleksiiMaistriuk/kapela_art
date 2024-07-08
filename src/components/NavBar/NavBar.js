import { navigate, useLocation } from "@reach/router";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link, useI18next } from "gatsby-plugin-react-i18next";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useImageService } from "../../elements/imageService";
import NavLinks from "./NavLinks";
import SideBar from "./Sidebar";
import BurgerButton from "./icons/BurgerButton";
import FacebookIcon from "./icons/FacebookIcon";
import InstagramIcon from "./icons/InstagramIcon";


const NavBar = () => {
  const { t } = useTranslation();
  const { languages, originalPath } = useI18next();
  const [isOpen, setIsOpen] = useState(false);

  const { getImageData } = useImageService();
  const myImageData = getImageData("icon.png");

  const location = useLocation();

  const scrollToNext = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const sectionId = localStorage.getItem('scrollToSection');
    if (sectionId) {
      scrollToNext(sectionId);
      localStorage.removeItem('scrollToSection');
    }
  }, []);

  const handleNavigation = (link) => {
    if (location.pathname === "/" || location.pathname === "/en/") {
      scrollToNext(link.to);
    } else {
      localStorage.setItem('scrollToSection', link.to);
      navigate(`/`);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-black/90">
      <nav className="relative px-4 py-2 flex justify-between items-center bg-rich-black/90">
        <span className="text-3xl font-bold leading-none">
          {myImageData && (
            <GatsbyImage image={myImageData} alt="logo" className="h-14 w-14" />
          )}
        </span>

        <>
          <BurgerButton isOpen={isOpen} setIsOpen={setIsOpen} />

          <NavLinks handleNavigation={handleNavigation} />
        </>

        <div className="flex align-top justify-between">
          <a
            className="hover:opacity-75"
            href="https://www.instagram.com/magdalenakapelaart/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only"> Instagram </span>
            <InstagramIcon />
          </a>
          <a
            className="hover:opacity-75"
            href="https://www.facebook.com/MagdalenaKapelaBB/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only">Facebook</span>
            <FacebookIcon />
          </a>

          <div className="ml-4 flex space-x-2">
            <ul className="languages">
              {languages.map((lng) => (
                <li key={lng}>
                  <Link to={originalPath} language={lng}>
                    {lng}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
  
      <SideBar 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        myImageData={myImageData} 
        handleNavigation={handleNavigation}
      />    </nav>
    </div>
  );
};

export default NavBar;
