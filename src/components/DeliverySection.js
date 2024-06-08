import React from "react";
import { deliveryDetails } from "../constants/deliveryDetails";
import "../styles/global.css";

const DeliverySection = () => {
  return (
    <section className=" pt-32">
      <h1 className="max-w-2xl z-50 mx-auto mb-10 text-2xl font-extrabold text-center md:text-3xl xl:text-4xl  ">
        Warunki dostawy
      </h1>

      {deliveryDetails.map((section, index) => (
        <div
          key={index}
          className="max-w-screen-xl px-8 py-2 mx-auto text-left  lg:gap-2 xl:gap-0 lg:py-2 flex flex-col items-start "
        >
          <h2 className="max-w-2xl mb-4  text-xl text-left  font-extrabold tracking-tight leading-none md:text-2xl xl:text-3xl ">
            {section.sectionTitle}
          </h2>
          <p className="max-w-2xl font-light  lg:mb-8 md:text-lg lg:text-xl ">
            {section.content}
          </p>
        </div>
      ))}
    </section>
  );
};

export default DeliverySection;
