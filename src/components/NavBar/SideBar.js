import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby-plugin-react-i18next";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { footerLinks } from "../../constants/footerLinks";
import { navIndex } from "../../constants/navLinks";


const SideBar = ({ isOpen, setIsOpen, myImageData,  handleNavigation }) => {
    const { t } = useTranslation();

    return (
  <div className={`navbar-menu relative z-50 ${isOpen ? "block" : "hidden"}`}>
    <div
      className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
      onClick={() => setIsOpen(false)}
    />
    <nav className={`fixed inset-0 flex items-start justify-center  bg-rich-black ${isOpen ? "slide-in" : ""}`}>
      <div className="text-center">
        <div className="flex justify-center mt-8 mb-8">
          {myImageData && (
            <GatsbyImage image={myImageData} alt="logo" className="h-14 w-14" />
          )}
        </div>
        <ul className="">
          {navIndex.map((link, index) => (
            <li key={index} className="w-56 border-b  p-2">

              <button
                onClick={() => {
            handleNavigation(link);
                  setIsOpen(false);
                }}
                className="hover:opacity-75 "
              >
                {t(`navIndex.${index}.label`)}
              </button>
            </li>
          ))}
          {footerLinks.map((item, index) => (
            <li key={index} className="w-56 border-b p-2">
              <Link className="hover:opacity-75 text-sm" to={item.to}>
                {t(`footerLinks.${item.label}`)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  </div>
)}

export default SideBar;
