import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { useImageService } from "../elements/imageService";
import useRevealAnimation from "../useRevealAnimation"; // Ensure the path is correct

const TextSection = ({ title, description }) => (
  <div className="w-full md:w-2/3 flex justify-center items-center flex-col m-5 p-0">
    <p className="relative mt-6 font-bold leading-10 sm:max-w-md lg:max-w-none w-3/4 text-base sm:text-lg ">
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
  const photo3 = getImageData("about/photo(5).jpg");

  return (
    <>
      <div
        ref={revealRef}
        className="relative flex w-full px-4 py-2 z-10 bg-slate-950 h-screen sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 "
      >
        <div
          style={{ position: "absolute" }}
          className=" inset-0 rounded-sm overflow-hidden w-1/2 right-auto left-0 z-0"
        >
          <GatsbyImage
            image={photo1}
            alt="photo301"
            className="object-cover h-full"
          />
          <div
            style={{ position: "absolute" }}
            className=" inset-0 bg-gradient-to-l from-slate-950 to-transparent"
          ></div>
        </div>
        <div
          style={{ position: "absolute" }}
          className=" z-20 top-0 right-0 bottom-0 flex items-center justify-end p-0 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14"
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
      {/* <div

        ref={revealRef}
        className="flex flex-col md:flex-row w-full px-4 py-8 z-10 reveal bg-stone-300/90 "
      >
        <div className="w-full md:w-1/2 flex justify-center items-center flex-col m-5 p-0 md:border-r-2 border-black">
          <p className="relative mt-6 font-light leading-7 sm:max-w-md lg:max-w-none text-black w-3/4 text-base sm:text-lg">
            Jestem artystką malarką, twórczynią licznych wystaw indywidualnych i
            zbiorowych w Polsce i za granicą. Jako jedyna kobieta w Polsce
            wprowadziłam sztukę w przemysł, malując osobiste dzieła na
            kilkudziesięciu silosach w strefie wybuchu. Moje obrazy znalazły się
            w prestiżowych hotelach, w tym w Ohla Barcelona i Plaza Athénée w
            Paryżu. Moje ekspozycje w programie "Dzień Dobry TVN", w tym m.in.
            portret „Sanitariuszka 19”, przyciągnęły zasłużoną uwagę telewidzów.
            Moje dzieła zdobią również kolekcje prywatne, zarówno w kraju, jak i
            za granicą. Niezaprzeczalnie pozostawiam trwały ślad w świecie
            sztuki, a moim znakiem rozpoznawczym są czarne płótna i złote linie.
          </p>
        </div>

        <div className="rounded-sm focus:outline-none focus-visible:ring shadow-lg transition-transform w-full sm:w-1/3 mb-5 md:mb-0">
          <GatsbyImage
            image={photo2}
            alt="photo"
            className="rounded-sm transform transition duration-500 hover:scale-110 w-full sm:w-auto m-1 sm:m-2"
            imgClassName="object-cover"
          />
        </div>
      </div> */}
      <div
        ref={revealRef2}
        className="relative flex w-full px-4 py-2 z-10 bg-slate-950 h-screen sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 mt-5"
      >
        <div
          style={{ position: "absolute" }}
          className=" inset-0 rounded-sm overflow-hidden w-1/2 left-auto right-0 z-0"
        >
          <GatsbyImage
            image={photo2}
            alt="photo2"
            className="object-cover h-full"
          />
          <div
            style={{ position: "absolute" }}
            className="absolute inset-0 bg-gradient-to-r from-slate-950 to-transparent"
          ></div>
        </div>
        <TextSection description="Sztuka jest dla mnie sposobem wyrażania siebie poprzez medium malarskie. Tworzę obrazy od ponad 25 lat. Co mnie wyróżnia? Jestem z wykształcenia artystą, magistrem sztuki, malarstwa i grafiki na Akademii Sztuk Pięknych w Katowicach. Moje prace mogą być częścią twojej inwestycji kolekcjonerskiej." />
      </div>

      <div
        ref={revealRef3}
        className="relative flex w-full px-4 py-2 z-10 bg-slate-950 h-screen sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 mt-5"
      >
        <div
          style={{ position: "absolute" }}
          className=" inset-0 rounded-sm overflow-hidden w-1/2 right-auto left-0 z-0"
        >
          <GatsbyImage
            image={photo3}
            alt="photo301"
            className="rounded-lg shadow-sm m-1 opacity-90"
          />
          <div
            style={{ position: "absolute" }}
            className=" inset-0 bg-gradient-to-l from-slate-950 to-transparent"
          ></div>
        </div>
        <div
          style={{ position: "absolute" }}
          className=" z-20 top-0 right-0 bottom-0 flex items-center justify-end p-0 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14"
        >
          <TextSection
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
          />
        </div>
      </div>
      {/* <div
        ref={revealRef3}
        className="flex flex-col md:flex-row w-full px-4 py-8 z-10 reveal bg-stone-300/90 mt-5"
      >
        <div className="w-full flex justify-center flex-col items-center m-5 p-0">
          <p className="relative mt-6 font-light leading-7 sm:max-w-md lg:max-w-none text-black mx-2 sm:mx-10 text-base sm:text-lg">
            Możesz mieć piękne wnętrze, które zdecydowanie ożyje i sprawi, że
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
            marzenia, natchnienie, coś bezcennego.
          </p>
        </div>
      </div> */}
    </>
  );
};

export default AboutSection;
