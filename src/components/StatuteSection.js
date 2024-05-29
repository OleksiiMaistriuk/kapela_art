import React from "react";
import { statuteList } from "../constants/statuteList";
import "../styles/global.css";

const StatuteSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900 pt-32">
      <h1 className="max-w-2xl z-50 mx-auto mb-10 text-2xl font-extrabold text-center md:text-3xl xl:text-4xl dark:text-white ">
        Regulamin
      </h1>

      {statuteList.map((statute, index) => (
        <div
          key={index}
          className="max-w-screen-xl px-8 py-2 mx-auto text-left  lg:gap-2 xl:gap-0 lg:py-2 flex flex-col items-start "
        >
          <h2 className="max-w-2xl mb-4  text-xl text-left  font-extrabold tracking-tight leading-none md:text-2xl xl:text-3xl dark:text-white">
            {statute.title}
          </h2>
          <p className="max-w-2xl font-light text-gray-800 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-800">
            {statute.content}
          </p>
        </div>
      ))}
    </section>
  );
};

export default StatuteSection;
