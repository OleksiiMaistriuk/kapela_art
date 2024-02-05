// AboutSection.js
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { aboutList } from "../constants/aboutList";
import { useImageService } from "../elements/imageService";
import useRevealAnimation from "../useRevealAnimation"; // Ensure the path is correct

const AboutItem = ({ about, index, getImageData }) => {
  const revealRef = useRevealAnimation("animate__fadeInUp", {
    threshold: 0.1,
    triggerOnce: true,
  });
  const imageData = getImageData(about.imageUrl);

  return (
    <article
      ref={revealRef}
      classNameName="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 z-10 reveal"
    >
      <div
        classNameName={`m-auto place-self-center lg:col-span-7 p-5 ${
          index % 2 === 0 ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <h2 classNameName="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
          {about.title}
        </h2>
        <p classNameName="max-w-2xl mb-6 font-bold dark:bg-gray-900 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          {about.description}
        </p>
      </div>
      <div
        classNameName={`lg:col-span-5 lg:flex rounded-lg ${
          index % 2 === 0 ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <GatsbyImage
          image={imageData}
          alt={about.altText}
          classNameName="w-full h-full object-cover rounded-lg"
        />
      </div>
    </article>
  );
};

const AboutSection = () => {
  const { getImageData } = useImageService();
  const myImageData = getImageData("backgrounds/second.jpg");
  return (
    <section classNameName="bg-slate-950">
      <div classNameName="text-center place-content-center min-h-[500px] relative isolate">
        <div className="h-96 text-white text-center grid bg-cover ">
          {myImageData && (
            <GatsbyImage
              image={myImageData}
              alt="Background Image"
              className="h-full w-full object-right md:object-center"
              style={{ position: "absolute" }}
            />
          )}{" "}
          <div className="col-start-1 row-start-1 bg-gray-800 bg-opacity-70 w-full h-full"></div>
          <div className="col-start-1 row-start-1 mx-auto my-auto">
            <h1 className="font-bold text-2xl">Hero Message</h1>
            <p>Something interesting about hero message</p>
          </div>
        </div>

        <div className=" text-center text-black place-content-center min-h-[500px] relative isolate  after:absolute after:z-[-1] after:inset-0 after:bg-pink-700 after:opacity-90 after:bg-[url('https://images.unsplash.com/photo-1604050170221-aed634784f64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1664&q=80')] after:bg-top after:bg-cover ">
          {aboutList.map((about, index) => (
            <AboutItem
              key={index}
              about={about}
              index={index}
              getImageData={getImageData}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

// const AboutSection = () => {
//   const { getImageData } = useImageService();
//   const myImageData = getImageData("backgrounds/about.png");
//   let rafId;
//   const revealContainerRef = useRef(null);

//   useEffect(() => {
//     const reveal = () => {
//       if (!revealContainerRef.current) return;

//       var reveals = revealContainerRef.current.querySelectorAll(".reveal");

//       for (var i = 0; i < reveals.length; i++) {
//         var windowHeight = window.innerHeight;
//         var elementTop = reveals[i].getBoundingClientRect().top;
//         var elementVisible = 150;

//         if (elementTop < windowHeight - elementVisible) {
//           reveals[i].classNameList.add("active");
//         } else {
//           reveals[i].classNameList.remove("active");
//         }
//       }
//     };

//     const handleScroll = () => {
//       if (rafId) cancelAnimationFrame(rafId);
//       rafId = requestAnimationFrame(reveal);
//     };

//     window.addEventListener("scroll", handleScroll);

//     reveal();
//     console.log("Reveal function called");
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       if (rafId) cancelAnimationFrame(rafId);
//     };
//   }, []);

//   return (
//     <section classNameName=" bg-slate-950">
//       <div
//         ref={revealContainerRef}
//         classNameName="grid text-centerplace-content-center min-h-[500px] relative isolate"
//       >
//         {/* <GatsbyImage
//           image={myImageData}
//           alt="Background Image"
//           classNameName="h-full w-full object-right md:object-center -z-10"
//           style={{ position: "absolute" }}
//         /> */}
//         {/* <span classNameName="bg-white absolute w-full h-full opacity-40" /> */}
//         <h1 classNameName="max-w-2xl mx-auto mb-10 text-2xl font-extrabold text-center md:text-3xl xl:text-4xl dark:text-white pt-5 z-10">
//           O mnie
//         </h1>
//         <section>
//           <h1>Scroll Down to Reveal Elements &#8595;</h1>
//         </section>
//         <section>
//           <div classNameName="container reveal">
//             <h2>Caption</h2>
//             <div classNameName="text-container">
//               <div classNameName="text-box">
//                 <h3>Section Text</h3>
//                 <p>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                   Tempore eius molestiae perferendis eos provident vitae iste.
//                 </p>
//               </div>
//               <div classNameName="text-box">
//                 <h3>Section Text</h3>
//                 <p>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                   Tempore eius molestiae perferendis eos provident vitae iste.
//                 </p>
//               </div>
//               <div classNameName="text-box">
//                 <h3>Section Text</h3>
//                 <p>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                   Tempore eius molestiae perferendis eos provident vitae iste.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section>
//           <div classNameName="container reveal">
//             <h2>Caption</h2>
//             <div classNameName="text-container">
//               <div classNameName="text-box">
//                 <h3>Section Text</h3>
//                 <p>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                   Tempore eius molestiae perferendis eos provident vitae iste.
//                 </p>
//               </div>
//               <div classNameName="text-box">
//                 <h3>Section Text</h3>
//                 <p>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                   Tempore eius molestiae perferendis eos provident vitae iste.
//                 </p>
//               </div>
//               <div classNameName="text-box">
//                 <h3>Section Text</h3>
//                 <p>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                   Tempore eius molestiae perferendis eos provident vitae iste.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section>
//           <div classNameName="container reveal">
//             <h2>Caption</h2>
//             <div classNameName="text-container">
//               <div classNameName="text-box">
//                 <h3>Section Text</h3>
//                 <p>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                   Tempore eius molestiae perferendis eos provident vitae iste.
//                 </p>
//               </div>
//               <div classNameName="text-box">
//                 <h3>Section Text</h3>
//                 <p>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                   Tempore eius molestiae perferendis eos provident vitae iste.
//                 </p>
//               </div>
//               <div classNameName="text-box">
//                 <h3>Section Text</h3>
//                 <p>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                   Tempore eius molestiae perferendis eos provident vitae iste.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//       </div>
//     </section>
//   );
// };
