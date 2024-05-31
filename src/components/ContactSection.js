import { ValidationError, useForm } from "@formspree/react";
import React, { useState } from "react";
import { useImageService } from "../elements/imageService";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}
const SponsorForm = ({ buttonText }) => {
  const [state, handleSubmit] = useForm("xleqyryr");

  if (state.succeeded) {
    return <p>Dzięki za dołączenie!</p>;
  }

  return (
    <div className="w-ful  border ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center p-4 "
      >
        <label htmlFor="name" className="text-sm font-bold mb-2 ">
          Nazwa firmy:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="mb-4 p-2 border rounded w-full b"
          placeholder="Wpisz nazwę swojej firmy"
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
        <label htmlFor="email" className="text-sm font-bold mb-2 ">
          Email:
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="mb-4 p-2 border rounded w-full"
          placeholder="Wpisz swój email"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <label htmlFor="phone" className="text-sm font-bold mb-2 ">
          Numer telefonu :
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          className="mb-4 p-2 border rounded w-full"
          placeholder="Wpisz swój numer telefonu"
        />
        <ValidationError prefix="Phone" field="phone" errors={state.errors} />
        <label htmlFor="message" className="text-sm font-bold mb-2">
          Wiadomość:
        </label>
        <textarea
          id="message"
          name="message"
          className="mb-4 p-2 border rounded w-full"
          placeholder="Wpisz swoją wiadomość"
          rows="4"
        />

        <button
          type="submit"
          disabled={state.submitting}
          className=" hover:bg-blue-700 font-bold py-2 px-4 rounded border"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};
const ContactSection = () => {
  const { getImageData } = useImageService();
  const myImageData = getImageData("backgrounds/about.avif");
  const [state, handleSubmit] = useForm("xleqyryr");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <section className="bg-gray-900 pt-48 pb-10">
      <div className="-mt-16 mb-8 px-8">
        <div className="container mx-auto">
          <div className="py-12 flex justify-center rounded-xl border  shadow-md saturate-200">
            <div className="my-8 grid gap-6 px-4">
              <div className="flex items-center gap-4">
                <Icon />
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-bold">
                  123 Main Street, Los Angeles, CA
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Icon />
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-bold">
                  +1 123 456 7890
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Icon />
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-bold">
                  info@lahospital.com
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Icon />
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-bold">
                  Open Support Ticket
                </p>
              </div>
            </div>
          </div>{" "}
          <div className="py-4">
            <SponsorForm buttonText={"Wyslać"} />
          </div>
        </div>{" "}
      </div>
    </section>
  );
};

export default ContactSection;
