import { useCallback } from 'react';

export const useExternalLink = () => {
  const openExternalLink = useCallback((url: string) => {
    console.log('Opening external link:', url);
    console.log('Tauri available:', !!window.__TAURI__);
    
    try {
      if (window.__TAURI__ && window.__TAURI__.shell) {
        // Use Tauri shell to open external links
        console.log('Using Tauri shell to open:', url);
        window.__TAURI__.shell.open(url);
      } else {
        // Fallback to regular window.open for web browsers
        console.log('Using window.open fallback for:', url);
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error('Error opening external link:', error);
      // Final fallback
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  return { openExternalLink };
};
