import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { footerLinks } from "../constants/footerLinks";
import { useImageService } from "../elements/imageService";
import "../styles/global.css";

const Footer = () => {
  const { getImageData } = useImageService();
  const myImageData = getImageData("icon.png");

  return (
    <footer className="bg-gradient-to-r from-[#e43838] via-[#e7c026] to-[#ffffff]">
      <div className="max-w-screen px-4 py-5 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className=" pt-3">
              <span className="text-3xl font-bold  leading-none">
                {myImageData && (
                  <GatsbyImage
                    image={myImageData}
                    alt="logo"
                    className="h-14 w-14"
                  />
                )}
              </span>
              <p className="max-w-xs mt-4 text-sm font-semibold text-gray-600">
                © 2023 Tomasz Słowioczek{" "}
              </p>
            </div>

            <div className="flex mt-8 space-x-6 text-gray-600"></div>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-bold">Linki</p>
              <nav className="flex flex-col mt-4 space-y-2 text-base font-semibold text-gray-900">
                {footerLinks.map((item, index) => (
                  <Link key={index} className="hover:opacity-75" to={item.to}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <p className="font-bold">Dane kontaktowe</p>
              <address className="flex flex-col mt-4 space-y-2 text-base font-semibold text-gray-900">
                <a
                  className="hover:opacity-75 "
                  href="mailto:yogatomasz@gmail.com"
                  aria-label="Email to Tomasz Słowioczek"
                >
                  yogatomasz@gmail.com
                </a>
                <a
                  className="hover:opacity-75"
                  href="tel:+48882572332"
                  aria-label="Phone number to Tomasz Słowioczek"
                >
                  +487360556375
                </a>
              </address>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
