// hooks/useWindowControls.ts
import { useCallback, useState, useEffect } from 'react';

export const useWindowControls = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  // Check if window is maximized on mount
  useEffect(() => {
    const checkMaximized = async () => {
      if (window.__TAURI__ && window.__TAURI__.window) {
        try {
          const maximized = await window.__TAURI__.window.appWindow.isMaximized();
          setIsMaximized(maximized);
        } catch (error) {
          console.error('Error checking maximized state:', error);
        }
      }
    };
    checkMaximized();
  }, []);

  const minimizeWindow = useCallback(async () => {
    console.log('Minimize button clicked');
    console.log('Tauri available:', !!window.__TAURI__);
    console.log('Window API available:', !!(window.__TAURI__ && window.__TAURI__.window));
    
    if (window.__TAURI__ && window.__TAURI__.window) {
      try {
        console.log('Calling minimize...');
        await window.__TAURI__.window.appWindow.minimize();
        console.log('Minimize successful');
      } catch (error) {
        console.error('Error minimizing window:', error);
      }
    } else {
      console.error('Tauri window API not available');
    }
  }, []);

  const maximizeWindow = useCallback(async () => {
    console.log('Maximize button clicked');
    console.log('Tauri available:', !!window.__TAURI__);
    console.log('Window API available:', !!(window.__TAURI__ && window.__TAURI__.window));
    console.log('Current maximized state:', isMaximized);
    
    if (window.__TAURI__ && window.__TAURI__.window) {
      try {
        if (isMaximized) {
          console.log('Calling unmaximize...');
          await window.__TAURI__.window.appWindow.unmaximize();
          setIsMaximized(false);
          console.log('Unmaximize successful');
        } else {
          console.log('Calling maximize...');
          await window.__TAURI__.window.appWindow.maximize();
          setIsMaximized(true);
          console.log('Maximize successful');
        }
      } catch (error) {
        console.error('Error toggling maximize:', error);
      }
    } else {
      console.error('Tauri window API not available');
    }
  }, [isMaximized]);

  const closeWindow = useCallback(async () => {
    console.log('Close button clicked');
    console.log('Tauri available:', !!window.__TAURI__);
    console.log('Window API available:', !!(window.__TAURI__ && window.__TAURI__.window));
    
    if (window.__TAURI__ && window.__TAURI__.window) {
      try {
        console.log('Calling close...');
        await window.__TAURI__.window.appWindow.close();
        console.log('Close successful');
      } catch (error) {
        console.error('Error closing window:', error);
      }
    } else {
      console.error('Tauri window API not available');
    }
  }, []);

  return {
    minimizeWindow,
    maximizeWindow,
    closeWindow,
    isMaximized
  };
};