import { useState } from 'react';

type PreferencesTab = 'themes' | 'language' | 'aiModel';

export const usePreferencesModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<PreferencesTab>('themes');

  const openModal = (tab?: string) => {
    if (!isOpen) {
      setIsOpen(true);
      if (tab === 'language') {
        setActiveTab('language');
      } else if (tab === 'aiModel') {
        setActiveTab('aiModel');
      } else {
        setActiveTab('themes');
      }
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    activeTab,
    openModal,
    closeModal
  };
};