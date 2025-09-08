import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomSelect from './CustomSelect';

type ThemeType = 'dark' | 'light' | 'system';

interface PreferencesThemesTabProps {
  theme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
}

const PreferencesThemesTab: React.FC<PreferencesThemesTabProps> = ({ theme, onThemeChange }) => {
  const { t } = useTranslation();

  const themeOptions = [
    { value: 'system', label: `${t('settings.system')} ${t('settings.default')}` },
    { value: 'dark', label: t('settings.dark') },
    { value: 'light', label: t('settings.light') }
  ];

  return (
    <div className="theme-settings">
      <h3>{t('settings.themes')}</h3>
      <CustomSelect
        value={theme}
        options={themeOptions}
        onChange={(value) => onThemeChange(value as ThemeType)}
      />
    </div>
  );
};

export default PreferencesThemesTab;