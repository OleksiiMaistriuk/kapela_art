import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { useState } from "react";
import { footerLinks } from "../constants/footerLinks";
import { navIndex } from "../constants/navLinks";
import { useImageService } from "../elements/imageService";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLinkIndex, setActiveLinkIndex] = useState(null);
  const { getImageData } = useImageService();
  const myImageData = getImageData("icon.png");

  const location = useLocation();

  const scrollToNext = (sectionId) => {
    setActiveLinkIndex(sectionId);

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <nav className="relative px-4 py-2 flex justify-between items-center bg-rich-black/90">
        <span className="text-3xl font-bold leading-none">
          {myImageData && (
            <GatsbyImage image={myImageData} alt="logo" className="h-14 w-14" />
          )}
        </span>

        {location.pathname === "/" ? (
          <>
            {" "}
            <div className="lg:hidden">
              <button
                className="navbar-burger flex items-center p-3"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  className="block h-8 w-8 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
              </button>
            </div>
            <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
              {navIndex.map((link, index) => (
                <li
                  key={index}
                  className="lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6"
                >
                  {" "}
                  <span className="text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      className="w-4 h-4 current-fill"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </span>
                  <button
                    onClick={() => scrollToNext(link.to)}
                    className={`text-sm hover:text-amber-400 whitespace-nowrap `}
                  >
                    {link.label}
                  </button>
                  <span className="text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      className="w-4 h-4 current-fill"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="">
            <Link
              to="/"
              className="hover:text-amber-400 text-center font-bold p-0 m-0 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 mr-2"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Wrócić
            </Link>
          </div>
        )}

        <div className="flex align-top justify-between">
          {" "}
          <a
            className="hover:opacity-75"
            href="https://www.instagram.com/magdalenakapelaart/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only"> Instagram </span>
            <svg className="w-8 h-8" viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient
                  id="instaGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#f09433" />
                  <stop offset="25%" stopColor="#e6683c" />
                  <stop offset="50%" stopColor="#dc2743" />
                  <stop offset="75%" stopColor="#cc2366" />
                  <stop offset="100%" stopColor="#bc1888" />
                </linearGradient>
              </defs>
              <path
                fill="url(#instaGradient)"
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            className="hover:opacity-75"
            href="https://www.facebook.com/MagdalenaKapelaBB/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only">Facebook</span>
            <svg className="w-9 h-9" viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient
                  id="fbGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#4064ac" />
                  <stop offset="50%" stopColor="#3a559f" />
                  <stop offset="100%" stopColor="#315b96" />
                </linearGradient>
              </defs>
              <path
                fill="url(#fbGradient)"
                d="M16.5,3H7.5C6.119,3,5,4.119,5,5.5v11C5,17.881,6.119,19,7.5,19h4.5v-6h-2v-2h2v-1.5c0-2.481,1.519-3.5,3.738-3.5   1.066,0,1.982,0.079,2.25,0.115v2.609l-1.545,0.001c-1.212,0-1.455,0.576-1.455,1.422V11h2.9l-0.379,2h-2.521v6h3.621   c1.381,0,2.5-1.119,2.5-2.5v-11C19,4.119,17.881,3,16.5,3z"
              />
            </svg>
          </a>
        </div>
      </nav>
      <div
        className={`navbar-menu relative z-50 ${isOpen ? "block" : "hidden"}`}
      >
        <div
          className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
          onClick={() => setIsOpen(false)}
        />
        <nav
          className={`fixed inset-0 flex items-start justify-center  bg-rich-black ${
            isOpen ? "slide-in" : ""
          }`}
        >
          <div className="text-center">
            <div className="flex justify-center mt-8 mb-8">
              {myImageData && (
                <GatsbyImage
                  image={myImageData}
                  alt="logo"
                  className="h-20 w-20"
                />
              )}
            </div>

            <ul className="">
              {navIndex.map((link, index) => (
                <li key={index} className={"w-56 border-b  "}>
                  <button
                    onClick={() => {
                      scrollToNext(link.to);
                      setIsOpen(false);
                    }}
                    className="hover:opacity-75 "
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              {footerLinks.map((item, index) => (
                <li key={index} className={"w-56 border-b  "}>
                  <Link className="hover:opacity-75  text-sm" to={item.to}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
