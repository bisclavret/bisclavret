import { useState } from 'react';

interface NotificationState {
  isOpen: boolean;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export const useNotification = () => {
  const [notification, setNotification] = useState<NotificationState>({
    isOpen: false,
    message: '',
    type: 'info'
  });

  const showNotification = (
    message: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'info'
  ) => {
    setNotification({
      isOpen: true,
      message,
      type
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  return {
    notification,
    showNotification,
    hideNotification
  };
};