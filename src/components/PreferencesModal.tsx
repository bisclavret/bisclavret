import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import PreferencesThemesTab from './PreferencesThemesTab';
import PreferencesLanguageTab from './PreferencesLanguageTab';
import PreferencesAIModelTab from './PreferencesAIModelTab';

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'themes' | 'language' | 'aiModel';
  onShowNotification?: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

type ThemeType = 'dark' | 'light' | 'system';

const PreferencesModal: React.FC<PreferencesModalProps> = ({ isOpen, onClose, initialTab = 'themes', onShowNotification }) => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'themes' | 'language' | 'aiModel'>(initialTab);
  const [theme, setTheme] = useState<ThemeType>('system');
  const [language, setLanguage] = useState(i18n.language);
  const [aiModelPath, setAiModelPath] = useState<string>('');

  const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const applyTheme = (selectedTheme: ThemeType) => {
    const effectiveTheme = selectedTheme === 'system' ? getSystemTheme() : selectedTheme;
    document.body.className = document.body.className.replace(/\b(light|dark)-theme\b/g, '');
    document.body.classList.add(`${effectiveTheme}-theme`);
    localStorage.setItem('theme', selectedTheme);
  };

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeType | null;
    const initialTheme = savedTheme || 'system';
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  React.useEffect(() => {
    const savedAiModelPath = localStorage.getItem('aiModelPath');
    if (savedAiModelPath) {
      setAiModelPath(savedAiModelPath);
    }
  }, []);


  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.custom-select')) {
        // Custom select click outside handling is managed by CustomSelect component
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (selectedTheme: ThemeType) => {
    setTheme(selectedTheme);
    applyTheme(selectedTheme);
  };

  const handleLanguageChange = (selectedLang: string) => {
    setLanguage(selectedLang);
    localStorage.setItem('language', selectedLang);
    i18n.changeLanguage(selectedLang);
  };



  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-header">
        <h2>{t('fileMenu.preferences')}</h2>
        <button className="close-button" onClick={onClose}>&times;</button>
      </div>
      <div className="modal-body">
        <div className="tabs">
          <button
            className={activeTab === 'themes' ? 'active' : ''}
            onClick={() => setActiveTab('themes')}
          >
            {t('settings.themes')}
          </button>
          <button
            className={activeTab === 'language' ? 'active' : ''}
            onClick={() => setActiveTab('language')}
          >
            {t('settings.language')}
          </button>
          <button
            className={activeTab === 'aiModel' ? 'active' : ''}
            onClick={() => setActiveTab('aiModel')}
          >
            {t('settings.aiModel')}
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'themes' && (
            <PreferencesThemesTab theme={theme} onThemeChange={handleThemeChange} />
          )}
          {activeTab === 'language' && (
            <PreferencesLanguageTab language={language} onLanguageChange={handleLanguageChange} />
          )}
          {activeTab === 'aiModel' && (
            <PreferencesAIModelTab
              aiModelPath={aiModelPath}
              onModelPathChange={setAiModelPath}
              onShowNotification={onShowNotification}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PreferencesModal;