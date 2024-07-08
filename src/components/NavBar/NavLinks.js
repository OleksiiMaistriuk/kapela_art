import React from 'react';
import { useTranslation } from 'react-i18next';
import { navIndex } from "../../constants/navLinks";
import VerticalDotsIcon from './icons/VerticalDotsIcon';
const NavLinks = ({ handleNavigation }) => {
  const { t } = useTranslation();

  return (
    <>
      <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
        {navIndex.map((link, index) => (
          <li
            key={index}
            className="lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6"
          >
            <span className="text-gray-300">
              <VerticalDotsIcon />
            </span>
            <button
              onClick={() => handleNavigation(link)}
              className={`text-sm hover:text-amber-400 whitespace-nowrap `}
            >
              {t(`navIndex.${index}.label`)}
            </button>
            <span className="text-gray-300">
              <VerticalDotsIcon />
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavLinks;
