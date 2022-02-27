import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translationEN.json";
import translationGR from "./locales/gr/translationGR.json";
import translationHI from "./locales/hi/translationHI.json";
import translationCH from "./locales/ch/translationCH.json";
// import { useSelector } from "react-redux";

// const selectedLanguage = useSelector((state) => state.info.language);
const resources = {
  english: {
    translation: translationEN,
  },
  // pt: {
  //   translation: translationPT,
  // },
  hindi: {
    translation: translationHI,
  },
  germany: {
    translation: translationGR,
  },
  chinese: {
    translation: translationCH,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "english",

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
