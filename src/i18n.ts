import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      hero: "AI products worth trusting.\nShipped with intention.",
      heroEyebrow: 'SPR DLX · Hyderabad',
      introEyebrow: 'Principles',
      introBeforeAi: 'AI is the medium.',
      introAfterLine1: 'Clarity is the product—we shape systems people return to.',
      introAfterLine2: 'We stay in the room from rough idea to live release',
      introHighlight: 'without losing the plot.',
      introSubline: 'Hyderabad studio · collaborating across time zones.',
      introPillar1: 'Design',
      introPillar2: 'Build',
      introPillar3: 'Launch',
      projects: 'Selected Work',
      letsBuild: "Let's build.",
      copenhagen: 'Copenhagen.',
      london: 'London.',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
