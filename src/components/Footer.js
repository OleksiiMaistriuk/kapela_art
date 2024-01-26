import { Typography } from "@material-tailwind/react";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { useImageService } from "../elements/imageService";
import "../styles/global.css";

const Footer = () => {
  const { getImageData } = useImageService();
  const myImageData = getImageData("icon.png");

  return (
    // <footer className="bg-gradient-to-r from-rich-black to-dark-blue text-white">
    //   <div className="max-w-screen px-4 py-5 mx-auto sm:px-6 lg:px-8">
    //     <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
    //       <div>
    //         <div className=" pt-3">
    //           <span className="text-3xl font-bold  leading-none">
    //             {myImageData && (
    //               <GatsbyImage
    //                 image={myImageData}
    //                 alt="logo"
    //                 className="h-14 w-14"
    //               />
    //             )}
    //           </span>
    //           <p className="max-w-xs mt-4 text-sm font-semibold">
    //             © 2024 Magdalena Kapela{" "}
    //           </p>
    //         </div>

    //         <div className="flex mt-8 space-x-6 text-white"></div>
    //       </div>
    //       <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
    //         <div>
    //           <p className="font-bold">Linki</p>
    //           <nav className="flex flex-col mt-4 space-y-2 text-base font-semibold text-white">
    //             {footerLinks.map((item, index) => (
    //               <Link key={index} className="hover:opacity-75" to={item.to}>
    //                 {item.label}
    //               </Link>
    //             ))}
    //           </nav>
    //         </div>
    //         <div>
    //           <p className="font-bold">Dane kontaktowe</p>
    //           <address className="flex flex-col mt-4 space-y-2 text-base font-semibold text-white">
    //             <a
    //               className="hover:opacity-75 "
    //               href="mailto:    Magdalena Kapela@gmail.com"
    //               aria-label="Email to     Magdalena Kapela"
    //             >
    //               Magdalena Kapela@gmail.com
    //             </a>
    //             <a
    //               className="hover:opacity-75"
    //               href="tel:+48882572332"
    //               aria-label="Phone number to     Magdalena Kapela"
    //             >
    //               +40000000000
    //             </a>
    //           </address>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </footer>

    <footer className=" bg-gradient-to-r from-rich-black to-dark-blue flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between px-4">
      <span className="text-3xl font-bold  leading-none">
        {myImageData && (
          <GatsbyImage image={myImageData} alt="logo" className="h-10 w-10" />
        )}
      </span>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            About Us
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            License
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Contribute
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Contact Us
          </Typography>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
