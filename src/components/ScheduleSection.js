import { Card, Typography } from "@material-tailwind/react";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { scheduleList } from "../constants/scheduleList";
import { useImageService } from "../elements/imageService";
import "../styles/global.css";
const ScheduleSection = () => {
  const { getImageData } = useImageService();
  const myImageData = getImageData("backgrounds/schedule.png");

  return (
    <div className="grid relative isolate overflow-hidden h-screen">
      {myImageData && (
        <GatsbyImage
          image={myImageData}
          alt="Yoga session in nature - promoting a healthy lifestyle"
          className=" inset-0 -z-10 h-full w-full object-right md:object-center"
          style={{ position: "absolute" }}
        />
      )}
      <span className="bg-black absolute w-full h-full opacity-40" />
      <div className="col-start-1 row-start-1 mx-auto my-auto z-10">
        <h1 className="font-bold text-2xl">Harmonogram zajęc</h1>
      </div>{" "}
      <Card className="p-4 md:p-10 m-4 md:m-20 bg-opacity-70" shadow={true}>
        <div className="flex flex-col">
          {scheduleList.map(
            ({ day, hour, description, localization, address }, index) => (
              <div
                key={index}
                className="flex flex-row text-center border-b border-blue-gray-50"
              >
                <div className="p-2 md:p-4 w-1/4">
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-bold text-xs md:text-base"
                  >
                    {day}
                  </Typography>
                </div>
                <div className="p-2 md:p-4 w-1/4">
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-bold text-xs md:text-base"
                  >
                    {hour}
                  </Typography>
                </div>
                <div className="p-2 md:p-4 w-1/4">
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-bold text-xs md:text-base"
                  >
                    <a
                      className="hover:opacity-50 flex items-center gap-2 justify-center"
                      href={localization}
                    >
                      {description}
                    </a>
                  </Typography>
                </div>
                <div className=" lg:flex w-1/4 p-2 md:p-4">
                  <Typography
                    variant="paragraph"
                    color="indigo"
                    className="font-bold text-xs md:text-base"
                  >
                    <a
                      className="hover:opacity-50 flex items-center gap-2 justify-center"
                      href={localization}
                      aria-label="View location and details of the fitness training center"
                    >
                      {address}
                    </a>{" "}
                  </Typography>
                </div>
              </div>
            )
          )}
        </div>
      </Card>
    </div>
  );
};

export default ScheduleSection;
