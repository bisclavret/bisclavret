import { useEffect } from 'react';

type ThemeType = 'dark' | 'light' | 'system';

export const useTheme = () => {
  const getSystemTheme = (): 'dark' | 'light' => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme: ThemeType) => {
    const effectiveTheme = theme === 'system' ? getSystemTheme() : theme;
    document.body.className = document.body.className.replace(/\b(light|dark)-theme\b/g, '');
    document.body.classList.add(`${effectiveTheme}-theme`);
  };

  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme') as ThemeType | null;
    const initialTheme = savedTheme || 'system';
    applyTheme(initialTheme);
  };

  useEffect(() => {
    initializeTheme();
  }, []);

  return {
    applyTheme,
    getSystemTheme
  };
};

export type { ThemeType };