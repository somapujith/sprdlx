import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "hero": "We build AI products.\nWe invest in what's next.",
      "projects": "Selected Work",
      "letsBuild": "Let's build.",
      "copenhagen": "Copenhagen.",
      "london": "London."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
