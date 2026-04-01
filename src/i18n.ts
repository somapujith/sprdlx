import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "hero": "We build AI products.\nWe invest in what's next.",
      "heroEyebrow": "AI Studio · Hyderabad",
      "introEyebrow": "Manifesto · Studio",
      "introBeforeAi": "We build",
      "introAfterLine1": "standout brands, digital experiences, and AI tools —",
      "introAfterLine2": "and invest in teams building",
      "introHighlight": "what's next.",
      "introSubline": "We're based in Hyderabad.",
      "introPillar1": "Build",
      "introPillar2": "Invest",
      "introPillar3": "Ship",
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
