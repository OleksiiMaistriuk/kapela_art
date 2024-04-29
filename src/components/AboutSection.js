import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { useImageService } from "../elements/imageService";
import useRevealAnimation from "../useRevealAnimation"; // Ensure the path is correct

const TextSection = ({ title, description }) => (
  <div className="w-full md:w-1/2 flex justify-center items-center flex-col m-5 p-0 border-l">
    <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
      {title}
    </h2>
    <p className="relative mt-6 font-light leading-7 sm:max-w-md lg:max-w-none w-3/4">
      {description}
    </p>
  </div>
);

// const ImageGallerySection = ({ columnImages }) => (
//   <div className="w-full md:w-1/2 flex justify-center items-center p-0 ">
//     <div className="gap-3 md:gap-4 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
//       {columnImages.map((images, columnIndex) => (
//         <ul
//           key={columnIndex}
//           className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4"
//         >
//           {images.map(({ image, originalIndex }, index) => {
//             const rotationClass = index % 2 === 0 ? "rotate-2" : "-rotate-2";
//             return (
//               <li
//                 key={originalIndex}
//                 className={`relative overflow-hidden ${rotationClass} w-1/3 md:w-full`}
//               >
//                 <div className="rounded-xl focus:outline-none focus-visible:ring shadow-lg transition-transform hover:border">
//                   <GatsbyImage
//                     image={image}
//                     alt={`photo ${originalIndex}`}
//                     className="rounded-xl transform transition duration-500 hover:scale-110 w-full sm:w-auto m-1 sm:m-2 "
//                     imgClassName="object-cover"
//                   />
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       ))}
//     </div>
//   </div>
// );

// function splitImagesIntoColumns(images) {
//   const columns = [[], [], []];
//   images.forEach((image, index) => {
//     columns[index % 3].push({ image, originalIndex: index });
//   });
//   return columns;
// }

const AboutSection = ({ isMobile }) => {
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
  const photo1 = getImageData("about/photo(1).jpg");
  const photo2 = getImageData("about/photo(2).jpg");

  const data = useStaticQuery(graphql`
    query {
      aboutImages: allFile(
        filter: { absolutePath: { regex: "/src/images/about/" } }
      ) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 4000, quality: 100)
            }
          }
        }
      }
      biographyImages: allFile(
        filter: { absolutePath: { regex: "/src/images/biography/" } }
      ) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 4000, quality: 100)
            }
          }
        }
      }
    }
  `);

  // const aboutColumns = splitImagesIntoColumns(
  //   data.aboutImages.edges.map(
  //     (edge) => edge.node.childImageSharp.gatsbyImageData
  //   )
  // );
  // const biographyColumns = splitImagesIntoColumns(
  //   data.biographyImages.edges.map(
  //     (edge) => edge.node.childImageSharp.gatsbyImageData
  //   )
  // );

  return (
    <>
      <div
        ref={revealRef}
        className="flex flex-col md:flex-row w-full px-4 py-8 z-10 reveal bg-slate-950/75  "
      >
        {/* {!isMobile && <ImageGallerySection columnImages={aboutColumns} />} */}
        <div className="rounded-sm focus:outline-none focus-visible:ring shadow-lg transition-transform w-full sm:w-1/3">
          <GatsbyImage
            image={photo1}
            alt={`photo `}
            className="rounded-sm transform transition duration-500 hover:scale-110 w-full sm:w-auto m-1 sm:m-2 "
            imgClassName="object-cover"
          />
        </div>
        <TextSection description="Sztuka jest dla mnie sposobem wyrażania siebie poprzez medium malarskie. Tworzę obrazy od ponad 25 lat. Co mnie wyróżnia? Jestem z wykształcenia artystą, magistrem sztuki, malarstwa i grafiki na Akademii Sztuk Pięknych w Katowicach. Moje prace mogą być częścią twojej inwestycji kolekcjonerskiej." />
      </div>

      <div
        ref={revealRef2}
        className="flex flex-col md:flex-row w-full px-4 p-8 z-10 reveal bg-stone-300"
      >
        <div className="w-full md:w-1/2 flex justify-center items-center flex-col m-5 p-0 border-r-2 border-black">
          <p className="relative mt-6 font-light leading-7 sm:max-w-md lg:max-w-none text-black w-3/4">
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

        <div className="rounded-sm focus:outline-none focus-visible:ring shadow-lg transition-transform w-full sm:w-1/3">
          <GatsbyImage
            image={photo2}
            alt={`photo `}
            className="rounded-sm transform transition duration-500 hover:scale-110 w-full sm:w-auto m-1 sm:m-2 "
            imgClassName="object-cover"
          />
        </div>
      </div>

      <div
        ref={revealRef3}
        className="flex flex-col md:flex-row w-full px-4 p-8 z-10 reveal bg-stone-300"
      >
        <div className="w-full  flex justify-center flex-col items-center  m-5 p-0 ">
          <h2 className="text-black text-4xl">Co mnie wyróznia</h2>

          <p className="relative mt-6 font-light leading-7 sm:max-w-md lg:max-w-none text-black mx-44">
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
      </div>

      {/* <div
        ref={revealRef2}
        className="flex flex-col md:flex-row w-full px-4 p-8 z-10 reveal bg-stone-300"
      >
        <div className="w-full  flex justify-center flex-col items-center  m-5 p-0 ">
          <h2 className="text-black text-4xl">Co mnie wyróznia</h2>

          <p className="relative mt-6 font-light leading-7 sm:max-w-md lg:max-w-none text-black mx-44">
            Jestem artystką malarką, twórczynią licznych wystaw indywidualnych i
            zbiorowych w Polsce i za granicą. Jako jedyna kobieta w Polsce
            wprowadziłam sztukę w przemysł, malując osobiste dzieła na
            kilkudziesięciu silosach w strefie wybuchu. Moje obrazy znalazły się
            w prestiżowych hotelach, w tym w Ohla Barcelona i Plaza Athénée w
            Paryżu. Moje ekspozycje w programie "Dzień Dobry TVN", w tym m.in.
            portret prof. Z.Religii oraz „Sanitariuszka 19”, przyciągnęły sporą
            uwagę telewidzów. Moje dzieła zdobią również kolekcje prywatne,
            zarówno w kraju, jak i za granicą. Moja twórczość zaznacza się w
            świecie sztuki, z czarnymi płótnami i złotymi liniami jako
            kluczowymi elementami.
          </p>
        </div>
      </div> */}
    </>
  );
};

export default AboutSection;
