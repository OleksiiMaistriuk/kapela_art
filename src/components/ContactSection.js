import { ValidationError, useForm } from "@formspree/react";
import { useLocation } from "@reach/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ContactSection = () => {
  const { t } = useTranslation();
  const [state, handleSubmit] = useForm("xleqyryr");

  const [formState, setFormState] = useState({
    imageTitle: "",
    name: "",
    email: "",
    phone: "",
    details: "",
  });

  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.imageTitle) {
      setFormState((prevState) => ({
        ...prevState,
        imageTitle: location.state.imageTitle,
      }));
    }
  }, [location.state]);

  if (state.succeeded) {
    return <SuccessMessage />;
  }

  return (
    <section className="bg-black pt-20 px-5 md:px-12 pb-10">
      <section className="relative z-10 overflow-hidden py-20 lg:py-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap lg:justify-between">
            <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
              <div className="mb-12 max-w-[570px] lg:mb-0">
                <p className="mb-9 text-base leading-relaxed text-body-color">
                  {t("quote")} - Vincent van Gogh
                </p>
                <a href="tel:+48501686882">
                  <div className="mb-8 flex w-full max-w-1/2 hover:bg-gray-700 rounded">
                    <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                      {/* SVG icon here */}
                    </div>
                    <div className="w-full">
                      <h4 className="mb-1 text-base md:text-xl font-bold text-dark ">
                        {t("phone_number")}
                      </h4>
                      <p className="block antialiased font-sans text-sm md:text-base leading-relaxed text-inherit font-bold">
                        +(48) 501 686 882
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="relative rounded-lg p-2 md:p-8 shadow-lg sm:p-6 border ">
                <form onSubmit={handleSubmit}>
                  {formState.imageTitle && (
                    <>
                      <input
                        type="hidden"
                        name="Image Title"
                        value={formState.imageTitle}
                      />
                      <p className="mb-2">
                        {t("image_title")}: {formState.imageTitle}
                      </p>
                    </>
                  )}
                  <ContactInputBox
                    type="text"
                    name="name"
                    placeholder={t("name_placeholder")}
                  />
                  <ValidationError
                    prefix={t("form_errors.name")}
                    field="name"
                    errors={state.errors}
                    className="text-red-500 mb-1"
                  />
                  <ContactInputBox
                    type="text"
                    name="email"
                    placeholder={t("email_placeholder")}
                  />
                  <ValidationError
                    prefix={t("form_errors.email")}
                    field="email"
                    errors={state.errors}
                    className="text-red-500 mb-1"
                  />
                  <ContactInputBox
                    type="text"
                    name="phone"
                    placeholder={t("phone_placeholder")}
                  />
                  <ValidationError
                    prefix={t("form_errors.phone")}
                    field="phone"
                    errors={state.errors}
                    className="text-red-500 mb-1"
                  />
                  <ContactTextArea
                    row="6"
                    placeholder={t("message_placeholder")}
                    name="details"
                    defaultValue=""
                  />
                  <ValidationError
                    prefix={t("form_errors.details")}
                    field="details"
                    errors={state.errors}
                    className="text-red-500 mb-1"
                  />
                  <div>
                    <button
                      type="submit"
                      className="w-full rounded border border-primary bg-primary p-3 transition hover:bg-opacity-70 hover:border-gray-700 hover:text-gray-700 font-semibold text-center mt-4"
                      disabled={state.submitting}
                    >
                      {t("send_message")}
                    </button>
                  </div>
                  <ValidationError
                    errors={state.errors}
                    className="text-red-500 mt-1"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

const SuccessMessage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-2xl font-semibold text-center">{t("thank_you")}</p>
    </div>
  );
};

export default ContactSection;

const ContactTextArea = ({ row, placeholder, name, defaultValue }) => {
  return (
    <div className="mb-3 md:mb-6">
      <textarea
        rows={row}
        placeholder={placeholder}
        name={name}
        className="w-full resize-none placeholder-custom rounded border border-stroke px-[14px] py-3 text-base outline-none focus:border-primary bg-black"
        defaultValue={defaultValue}
      />
    </div>
  );
};

const ContactInputBox = ({ type, placeholder, name }) => {
  return (
    <div className="mb-3 md:mb-6">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="w-full rounded placeholder-custom border border-stroke px-[14px] py-3 text-base outline-none focus:border-primary bg-black"
      />
    </div>
  );
};
