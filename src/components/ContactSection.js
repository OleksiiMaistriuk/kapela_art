import { Input, Textarea } from "@material-tailwind/react";
import { Link } from "gatsby";
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

const ContactSection = () => {
  const { getImageData } = useImageService();
  const myImageData = getImageData("backgrounds/about.avif");
  const [state, handleSubmit] = useState("xoqopyrb");
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
            <div className="py-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="relative w-full min-w-[200px] h-11 !min-w-full">
                    <Input
                      type="text"
                      name="name"
                      label="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-900"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="relative w-full min-w-[200px] h-11 !min-w-full">
                    <Input
                      type="email"
                      name="email"
                      label="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-900"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="relative w-full min-w-[200px] h-11 !min-w-full">
                    <Input
                      type="tel"
                      name="phone"
                      label="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-900"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="relative w-full min-w-[200px] h-11 !min-w-full">
                    <Textarea
                      name="message"
                      label="Enter your message"
                      value={formData.message}
                      onChange={handleChange}
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-900"
                    />
                  </div>
                </div>
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center cursor-pointer p-3 rounded-full -ml-2.5"
                    htmlFor="consent"
                  >
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      id="consent"
                      className="peer relative appearance-none w-5 h-5 border rounded-md border-blue-gray-200 cursor-pointer transition-all before:content[''] before:block before:bg-blue-gray-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:bg-gray-900 checked:border-gray-900 checked:before:bg-gray-900"
                    />
                    <span className="text-white absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </label>
                  <label
                    className="text-gray-700 font-light select-none cursor-pointer mt-px"
                    htmlFor="consent"
                  >
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-normal !text-gray-500">
                      Wyrażam zgodę na przetwarzanie moich danych osobowych{" "}
                      <Link
                        to="/policy"
                        className="font-medium text-gray-700 hover:text-gray-900"
                      >
                        Polityka prywatności
                      </Link>
                    </p>
                  </label>
                </div>
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full mt-6"
                  type="submit"
                  disabled={!formData.consent || state.submitting}
                >
                  Wyślij
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
