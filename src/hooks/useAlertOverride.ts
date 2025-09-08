import { useEffect, useCallback } from 'react';

// Global alert override hook
// This allows replacing the default browser alert() with custom notification system

let showNotificationCallback: ((message: string, type?: 'success' | 'info' | 'warning' | 'error') => void) | null = null;
let originalAlert: ((message: string) => void) | null = null;

export const useAlertOverride = (notificationCallback?: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void) => {

  const overrideAlert = useCallback(() => {
    if (originalAlert === null) {
      originalAlert = window.alert;
    }

    showNotificationCallback = notificationCallback || null;

    window.alert = (message: string) => {
      if (showNotificationCallback) {
        showNotificationCallback(message, 'warning');
      } else {
        // Fallback to original alert if no callback is set
        if (originalAlert) {
          originalAlert(message);
        }
      }
    };
  }, [notificationCallback]);

  const restoreAlert = useCallback(() => {
    if (originalAlert) {
      window.alert = originalAlert;
      originalAlert = null;
      showNotificationCallback = null;
    }
  }, []);

  useEffect(() => {
    if (notificationCallback) {
      overrideAlert();
    }

    return () => {
      // Cleanup on unmount - but only if this is the last component using it
      // For now, we'll leave the override active since it's a global change
    };
  }, [notificationCallback, overrideAlert]);

  return {
    overrideAlert,
    restoreAlert,
    isOverridden: showNotificationCallback !== null
  };
};