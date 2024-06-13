import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { useImageService } from "../elements/imageService";
import useRevealAnimation from "../useRevealAnimation"; // Ensure the path is correct

const TextSection = ({ title, description }) => (
  <div className="w-screen h-screen md:h-1/2 md:w-2/3 flex justify-center items-center flex-col p-4 md:m-5 md:p-7 bg-black/50 md:bg-transparent rounded-md z">
    <p className="relative p-5 md:p-0 text-xs font-bold leading-5 sm:max-w-md lg:max-w-none md:w-3/4 md:text-base sm:text-lg ">
      {description}
    </p>
  </div>
);

const AboutSection = () => {
  const revealRef = useRevealAnimation("animate__fadeInUp", {
    threshold: 0.1,
    triggerOnce: true,
  });
  const revealRef2 = useRevealAnimation("animate__fadeInUp", {
    threshold: 0.1,
    triggerOnce: true,
  });
  const revealRef3 = useRevealAnimation("animate__fadeInUp", {
    threshold: 0.1,
    triggerOnce: true,
  });

  const { getImageData } = useImageService();
  const photo1 = getImageData("about/photo(4).jpg");
  const photo2 = getImageData("about/photo(2).jpg");
  const photo3 = getImageData("about/photo(1).jpg");

  return (
    <>
      <div
        ref={revealRef}
        className="relative flex w-full md:first:px-4 py-2 z-10 bg-black h-screen sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 "
      >
        <div
          style={{ position: "absolute" }}
          className=" inset-0  rounded-sm overflow-hidden w-full md:w-1/2 right-auto left-0 z-0 hidden md:flex"
        >
          <GatsbyImage
            image={photo1}
            alt="photo301"
            className="object-cover h-full"
          />
          <div
            style={{ position: "absolute" }}
            className=" inset-0 md:bg-gradient-to-l md:from-black md:to-transparent bg-black/20"
          ></div>
        </div>
        <div
          style={{ position: "absolute" }}
          className=" z-20 top-0 right-0 bottom-0 flex items-center justify-end  sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14"
        >
          <TextSection
            description="Jestem artystką malarką, twórczynią licznych wystaw indywidualnych i
            zbiorowych w Polsce i za granicą. Jako jedyna kobieta w Polsce
            wprowadziłam sztukę w przemysł, malując osobiste dzieła na
            kilkudziesięciu silosach w strefie wybuchu. Moje obrazy znalazły się
            w prestiżowych hotelach, w tym w Ohla Barcelona i Plaza Athénée w
            Paryżu. Moje ekspozycje w programie Dzień Dobry TVN, w tym m.in.
            portret „Sanitariuszka 19”, przyciągnęły zasłużoną uwagę telewidzów.
            Moje dzieła zdobią również kolekcje prywatne, zarówno w kraju, jak i
            za granicą. Niezaprzeczalnie pozostawiam trwały ślad w świecie
            sztuki, a moim znakiem rozpoznawczym są czarne płótna i złote linie."
          />
        </div>
      </div>

      <div
        ref={revealRef2}
        className="relative flex w-full md:px-4 py-2 z-10 bg-stone-300 h-screen sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 mt-5"
      >
        <div
          style={{ position: "absolute" }}
          className=" z-20 top-0 right-0 bottom-0 flex items-center justify-start p-0 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14"
        >
          <div className="w-screen h-screen md:h-1/2 md:w-2/3 flex justify-center  items-center flex-col p-4 md:m-5 md:p-7 bg-black/50 md:bg-transparent rounded-md z">
            <p className="relative p-5 md:p-0 text-black text-xs font-bold leading-5 sm:max-w-md lg:max-w-none md:w-3/4 md:text-base sm:text-lg ">
              Możesz mieć piękne wnętrze, które zdecydowanie ożyje i sprawi, że
              Twoje samopoczucie – rzecz bezcenna – będzie na wyższym poziomie
              energetycznym. Sztuka jest potrzebą duchową. Jest sensem nie tylko
              kolekcjonerskim, ale często zaskoczeniem, ponieważ odczytujemy ją
              za każdym razem inaczej. Sztuka potrafi zaskakiwać nas samych. W
              twoim otoczeniu twój wzrok zawsze kieruje się horyzontalnie, czyli
              w pomieszczeniu to zawsze ściana, patrzymy na wprost – to nasze
              główne pole widzenia, reszta to pole poboczne, dla naszego wzroku
              rzeczy mniej ważne. Tak samo, gdy patrzymy na człowieka,
              koncentrujemy się na twarzy i oczach. Więc to, w jaki sposób i co
              chcesz widzieć na ścianie, zależy od ciebie. Podaruj sobie patrząc
              na wyjątkowy obraz, marzenia, natchnienie, coś bezcennego.
            </p>
          </div>
          {/* <TextSection
            text={black}
            description="    Możesz mieć piękne wnętrze, które zdecydowanie ożyje i sprawi, że
            Twoje samopoczucie – rzecz bezcenna – będzie na wyższym poziomie
            energetycznym. Sztuka jest potrzebą duchową. Jest sensem nie tylko
            kolekcjonerskim, ale często zaskoczeniem, ponieważ odczytujemy ją za
            każdym razem inaczej. Sztuka potrafi zaskakiwać nas samych. W twoim
            otoczeniu twój wzrok zawsze kieruje się horyzontalnie, czyli w
            pomieszczeniu to zawsze ściana, patrzymy na wprost – to nasze główne
            pole widzenia, reszta to pole poboczne, dla naszego wzroku rzeczy
            mniej ważne. Tak samo, gdy patrzymy na człowieka, koncentrujemy się
            na twarzy i oczach. Więc to, w jaki sposób i co chcesz widzieć na
            ścianie, zależy od ciebie. Podaruj sobie patrząc na wyjątkowy obraz,
            marzenia, natchnienie, coś bezcennego."
          /> */}
        </div>{" "}
        <div
          style={{ position: "absolute" }}
          className=" inset-0 rounded-sm overflow-hidden w-full md:w-1/2 left-auto right-0 z-0 hidden md:flex"
        >
          <GatsbyImage
            image={photo2}
            alt="photo2"
            className="object-contain h-full"
          />
          <div
            style={{ position: "absolute" }}
            className="inset-0 md:bg-gradient-to-r md:from-stone-300   md:to-transparent bg-black/20"
          ></div>
        </div>
      </div>

      <div
        ref={revealRef3}
        className="relative flex w-full md:first:px-4 py-2 z-10 bg-black h-screen sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 mt-5"
      >
        <div
          style={{ position: "absolute" }}
          className=" inset-0 rounded-sm overflow-hidden w-full md:w-1/2 right-auto left-0 z-0 hidden md:flex"
        >
          <GatsbyImage
            image={photo3}
            alt="photo301"
            className="object-cover h-full"
          />
          <div
            style={{ position: "absolute" }}
            className=" inset-0 md:bg-gradient-to-l md:from-black md:to-transparent bg-black/20"
          ></div>
        </div>
        <div
          style={{ position: "absolute" }}
          className=" z-20 top-0 right-0 bottom-0 flex  items-center justify-end p-0 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14"
        >
          <TextSection description="Sztuka jest dla mnie sposobem wyrażania siebie poprzez medium malarskie. Tworzę obrazy od ponad 25 lat. Co mnie wyróżnia? Jestem z wykształcenia artystą, magistrem sztuki, malarstwa i grafiki na Akademii Sztuk Pięknych w Katowicach. Moje prace mogą być częścią twojej inwestycji kolekcjonerskiej." />
        </div>
      </div>
    </>
  );
};

export default AboutSection;
