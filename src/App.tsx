// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Titlebar from './components/Titlebar';
import PreferencesModal from './components/PreferencesModal';
import HomeScreen from './views/HomeScreen';
import SettingsScreen from './views/SettingsScreen';
import { useExternalLinks } from './hooks/useExternalLinks';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import { usePreferencesModal } from './hooks/usePreferencesModal';
import { useNotification } from './hooks/useNotification';
import NotificationModal from './components/NotificationModal';
import './styles/index.scss';

const App: React.FC = () => {
  useExternalLinks();
  useTheme();
  useLanguage();
  const { isOpen, activeTab, openModal, closeModal } = usePreferencesModal();
  const { notification, showNotification, hideNotification } = useNotification();

  return (
    <BrowserRouter>
      <Titlebar onOpenPreferences={openModal} />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
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
