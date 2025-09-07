import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import fr from './locales/fr.json';
import de from './locales/de.json';

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  de: {
    translation: de,
  },
};

const getInitialLanguage = (): string => {
  // First check for saved language preference
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && ['en', 'fr', 'de'].includes(savedLanguage)) {
    return savedLanguage;
  }

  // Fall back to system language
  const systemLang = navigator.language;
  if (systemLang.startsWith('fr')) {
    return 'fr';
  }
  if (systemLang.startsWith('de')) {
    return 'de';
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;