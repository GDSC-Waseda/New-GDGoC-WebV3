import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// You can adjust these options as needed for your project
const options = {
  fallbackLng: "en",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(options);
}

export default i18n;
