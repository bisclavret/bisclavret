import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export interface StoryTemplate {
  title: string;
  genre: string;
  template: string[];
}

export const useNewStoryModal = (onShowNotification?: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const createStory = useCallback(async (storyData: StoryTemplate) => {
    try {
      // Here you would typically call your backend API to create the story
      // For now, we'll just log the data and show a success message

      console.log('Creating new story:', storyData);

      // You can integrate with your existing story management system here
      // For example, calling a Tauri command or updating local state

      // Show success feedback (you might want to use a notification system)
      if (onShowNotification) {
        onShowNotification(t('newStory.successMessage', `Story "${storyData.title}" created successfully!`), 'success');
      }

      return storyData;
    } catch (error) {
      console.error('Error creating story:', error);
      if (onShowNotification) {
        onShowNotification(t('newStory.errorMessage', 'Failed to create story. Please try again.'), 'error');
      }
      throw error;
    }
  }, [t]);

  const handleCreateStory = useCallback(async (storyData: StoryTemplate) => {
    await createStory(storyData);
    closeModal();
  }, [createStory, closeModal]);

  return {
    isOpen,
    openModal,
    closeModal,
    createStory: handleCreateStory
  };
};