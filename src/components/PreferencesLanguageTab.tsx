import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomSelect from './CustomSelect';
import { useLanguage } from '../hooks/useLanguage';

interface PreferencesLanguageTabProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

const PreferencesLanguageTab: React.FC<PreferencesLanguageTabProps> = ({ language, onLanguageChange }) => {
  const { t } = useTranslation();
  const { changeLanguage } = useLanguage();

  const languageOptions = [
    { value: 'en', label: `${t('settings.english')} ${t('settings.default')}` },
    { value: 'fr', label: t('settings.french') },
    { value: 'de', label: t('settings.german') }
  ];

  const handleLanguageChange = (value: string) => {
    onLanguageChange(value);
    changeLanguage(value);
  };

  return (
    <div className="language-settings">
      <h3>{t('settings.language')}</h3>
      <CustomSelect
        value={language}
        options={languageOptions}
        onChange={handleLanguageChange}
      />
    </div>
  );
};

export default PreferencesLanguageTab;