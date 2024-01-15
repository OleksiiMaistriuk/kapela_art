// // import { ValidationError, useForm } from "@formspree/react";
// import {
//   Card,
//   Checkbox,
//   Input,
//   Textarea,
//   Typography,
// } from "@material-tailwind/react";
// import { Link } from "gatsby";
// import { GatsbyImage } from "gatsby-plugin-image";
// import React, { useState } from "react";
// import { useImageService } from "../elements/imageService";
// function Icon() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="currentColor"
//       className="h-6 w-6"
//     >
//       <path
//         fillRule="evenodd"
//         d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
//         clipRule="evenodd"
//       />
//     </svg>
//   );
// }
// const ContactSection = () => {
//   const { getImageData } = useImageService();
//   const myImageData = getImageData("backgrounds/about.avif");
//   // const [state, handleSubmit] = useForm("xoqopyrb");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//     consent: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // if (state.succeeded) {
//   //   return (
//   //     <div className="grid text-center text-black place-content-center min-h-[500px] relative isolate  h-screen">
//   //       {myImageData && (
//   //         <GatsbyImage
//   //           image={myImageData}
//   //           alt="Description of the image"
//   //           className="absolute top-0 left-0 w-full h-full z-[-1] opacity-90"
//   //         />
//   //       )}
//   //       <Alert
//   //         icon={<Icon />}
//   //         className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
//   //       >
//   //         Powiadomienie wysłane, dziękuję! Odpiszemy Ci natychmiast!{" "}
//   //         <Link
//   //           to="/"
//   //           className="font-medium text-deep-orange-900 transition-colors hover:text-gray-900"
//   //         >
//   //           &nbsp;Wrócić na stronę główną.
//   //         </Link>
//   //       </Alert>
//   //     </div>
//   //   );
//   // }

//   return (
//     <section className="bg-white dark:bg-gray-900">
//       <div className="grid text-center text-black place-content-center min-h-[500px] relative isolate h-screen">
//         {myImageData && (
//           <GatsbyImage
//             image={myImageData}
//             alt="Background Image"
//             className="h-full w-full object-cover md:object-center -z-10"
//             style={{ position: "absolute" }}
//           />
//         )}
//         <h1 className="max-w-md mx-auto mb-4 text-xl font-bold text-center sm:text-2xl md:text-3xl text-black">
//           Kontakt
//         </h1>
//         <Card shadow={true} className="mx-4 p-6 bg-opacity-70 sm:p-8 md:p-10">
//           <Typography variant="h5" color="blue-gray">
//             Napisz do mnie
//           </Typography>
//           <form
//             className="mt-6 mb-2 w-full max-w-md sm:w-96"
//             onSubmit={handleSubmit}
//           >
//             <div className="mb-4 flex flex-col gap-4">
//               <Input
//                 type="text"
//                 size="lg"
//                 label="Imię"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//               <Input
//                 type="email"
//                 size="lg"
//                 label="Adres e-mail"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//               {/* <ValidationError
//                 prefix="Email"
//                 field="email"
//                 errors={state.errors}
//               /> */}
//               <Input
//                 type="tel"
//                 size="lg"
//                 label="Numer telefonu"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//               />
//               <Textarea
//                 size="lg"
//                 label="Wiadomość"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//               />
//               {/* <ValidationError
//                 prefix="Message"
//                 field="message"
//                 errors={state.errors}
//               /> */}
//             </div>
//             <Checkbox
//               name="consent"
//               checked={formData.consent}
//               onChange={handleChange}
//               label={
//                 <Typography
//                   variant="small"
//                   color="gray"
//                   className="flex items-center font-normal"
//                 >
//                   Wyrażam zgode na przetwarzanie moich danych osobowych
//                   <Link
//                     to="/policy"
//                     className="font-medium transition-colors hover:text-gray-900"
//                   >
//                     &nbsp;Polityka prywatności
//                   </Link>
//                 </Typography>
//               }
//               containerProps={{ className: "-ml-2.5" }}
//             />
//             {/* <Button
//               className="mt-6"
//               fullWidth
//               type="submit"
//               disabled={!formData.consent || state.submitting}
//             >
//               Wyślij
//             </Button> */}
//           </form>
//         </Card>
//       </div>
//     </section>
//   );
// };

// export default ContactSection;



