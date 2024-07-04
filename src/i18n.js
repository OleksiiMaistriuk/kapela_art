import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enTranslations from "../locales/en/translation.json";
import plTranslations from "../locales/pl/translation.json";

const resources = {
  en: {
    translation: enTranslations,
  },
  pl: {
    translation: plTranslations,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    debug: true,
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
  });

export default i18n;
