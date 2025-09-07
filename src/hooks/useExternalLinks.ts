// hooks/useExternalLinks.ts
import { useCallback, useEffect } from 'react';

export const useExternalLinks = () => {
  const openExternalLink = useCallback(async (url: string) => {
    console.log(`Attempting to open URL externally: ${url}`);

    if (window.__TAURI__) {
      try {
        // Try Tauri shell plugin (v2 API)
        const { open } = await import('@tauri-apps/plugin-shell');
        await open(url);
        console.log('Opened via shell plugin');
        return;
      } catch (shellErr) {
        console.warn('Shell plugin failed:', shellErr);
        try {
          // Fallback to opener plugin (v2 API)
          const { openUrl } = await import('@tauri-apps/plugin-opener');
          await openUrl(url);
          console.log('Opened via opener plugin');
          return;
        } catch (openerErr) {
          console.warn('Opener plugin failed:', openerErr);
        }
      }

      // Final fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert(`Link copied! Please paste in your browser:\n${url}`);
      } catch (clipboardErr) {
        alert(`Cannot open link automatically. Copy manually:\n${url}`);
      }
    } else {
      // Dev / browser mode
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  // Global interceptor for <a target="_blank"> clicks
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      const targetAttr = anchor.getAttribute('target');
      const isExternal = targetAttr === '_blank' && href?.startsWith('http');
      if (isExternal) {
        event.preventDefault();
        event.stopPropagation();
        openExternalLink(href!);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [openExternalLink]);

  return { openExternalLink };
};
