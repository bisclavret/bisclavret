// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Titlebar from './components/Titlebar';
import PreferencesModal from './components/PreferencesModal';
import LandingScreen from './views/LandingScreen';
import TempScreen from './views/TempScreen';
import { useExternalLinks } from './hooks/useExternalLinks';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import { usePreferencesModal } from './hooks/usePreferencesModal';
import { useNotification } from './hooks/useNotification';
import NotificationModal from './components/NotificationModal';
import { useAlertOverride } from './hooks/useAlertOverride';
import './styles/index.scss';

const App: React.FC = () => {
  useExternalLinks();
  useTheme();
  useLanguage();
  const { isOpen, activeTab, openModal, closeModal } = usePreferencesModal();
  const { notification, showNotification, hideNotification } = useNotification();

  // Override global alert to use notifications
  useAlertOverride(showNotification);

  return (
    <BrowserRouter>
      <Titlebar onOpenPreferences={openModal} />
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/Temp" element={<TempScreen />} />
      </Routes>
      <PreferencesModal
        isOpen={isOpen}
        onClose={closeModal}
        initialTab={activeTab}
        onShowNotification={showNotification}
      />
      <NotificationModal
        isOpen={notification.isOpen}
        message={notification.message}
        type={notification.type}
        onClose={hideNotification}
      />
    </BrowserRouter>
  );
};

export default App;
