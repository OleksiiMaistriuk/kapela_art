import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import { heroLinks } from "../constants/heroLinks";
import { useImageService } from "../elements/imageService";

const HeroSection = () => {
  const { getImageData } = useImageService();

  const backgroundImageData = getImageData("backgrounds/hero.JPG");
  const backgroundImage = getImage(backgroundImageData);

  return (
    <header className="grid relative isolate overflow-hidden h-screen">
      {backgroundImage && (
        <GatsbyImage
          image={backgroundImage}
          alt="Yoga session in nature"
          className=" inset-0 -z-10 h-full w-full object-right md:object-center"
          style={{ position: "absolute" }}
        />
      )}
      <span className="bg-black absolute inset-0 opacity-10 sm:opacity-30" />
      <h1 className="z-50 mx-auto mt-10 max-w-2xl text-3xl font-extrabold text-center text-white xl:text-4xl">
        Tomasz Słowioczek
      </h1>
      <div className="z-10 lg:flex justify-between">
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl tracking-tight text-white sm:text-4xl">
              Trener Personalny i Instruktor Jogi
            </h2>
            <p className="mt-6 text-lg leading-8 text-white">
              Moja podróż z jogą rozpoczęła się lata temu i od tego czasu stała
              się nieodłączną częścią mojego życia. Joga to coś więcej niż
              ćwiczenia - to sposób na odnalezienie równowagi między ciałem,
              umysłem i duchem. W moim przekonaniu, joga pozwala każdemu z nas
              odkryć i pielęgnować głębokie połączenie z naturą i naszą
              wewnętrzną esencją.
            </p>
          </div>
        </div>
        <div className="px-6 mr-0 lg:px-8">
          <div className="hidden mx-auto max-w-2xl md:block lg:mx-0">
            <p className="mt-6 text-lg leading-8 text-white">
              Mam za sobą ponad 500 godzin szkoleniowych w renomowanych szkołach
              jogi w Indiach, co nie tylko wzbogaciło moje doświadczenie, ale
              również umocniło moje przekonanie o sile i uniwersalności tej
              praktyki. Moim celem jako trenera jest przekazywanie tej wiedzy i
              umiejętności, pomagając innym w ich indywidualnej podróży rozwoju
              przez jogę.
            </p>
          </div>
          <nav className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <ul className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
              {heroLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href}>
                    {link.name} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
