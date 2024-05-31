import { Link } from "gatsby";
import React from "react";
import { useImageService } from "../elements/imageService";
import "../styles/global.css";
import { footerLinks } from "./../constants/footerLinks";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const Footer = () => {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className="bg-dark-blue/90 pt-8 pb-6 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-50">
        <div className="flex flex-col lg:flex-row text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4 mb-6 lg:mb-0">
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              "Artysta powinien być jak Bóg: niewidzialny a wszechmocny."
            </h5>
            <h4 className="text-xl font-semibold">Gustave Flaubert</h4>
            <div className="mt-6 lg:mb-0 mb-6 flex align-center p-4">
              <a
                className="hover:opacity-75"
                href="https://www.instagram.com/magdalenakapelaart/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
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
                <svg
                  className="w-11 h-11"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
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
          </div>
          <div className="w-full lg:w-6/12 px-4 mb-6 lg:mb-0">
            <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
              Contact Information
            </span>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Icon />
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-bold">
                  123 Main Street, Los Angeles, CA
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Icon />
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-bold">
                  +1 123 456 7890
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Icon />
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-bold">
                  info@example.com
                </p>
              </div>
            </div>
          </div>{" "}
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <ul className="flex flex-col mt-4 space-y-2 text-base font-semibold text-white">
                  {footerLinks.map((item, index) => (
                    <li key={index}>
                      <Link
                        className="hover:opacity-75 text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        to={item.to}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-6 border-blueGray-300" />

        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">{getCurrentYear()}</span>{" "}
              Magdalena Kapela{" "}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
