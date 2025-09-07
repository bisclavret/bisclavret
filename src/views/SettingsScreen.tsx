// SettingsScreen.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const SettingsScreen: React.FC = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = event.target.value;
    i18n.changeLanguage(selectedLang);
  };

  return (
    <div id="app">
      <h2>{t('settings.language')}</h2>
      <select value={i18n.language} onChange={handleLanguageChange}>
        <option value="en">{t('settings.english')}</option>
        <option value="fr">{t('settings.french')}</option>
      </select>
    </div>
  );
};

export default SettingsScreen;
