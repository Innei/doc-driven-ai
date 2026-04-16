import { lightTheme, darkTheme } from '~/styles/theme.css';

export function applyTheme(theme: 'light' | 'dark') {
  const html = document.documentElement;
  html.classList.remove(lightTheme, darkTheme);
  html.classList.add(theme === 'dark' ? darkTheme : lightTheme);
  html.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('chroma-theme', theme);
  } catch {}
}

export function getSavedTheme(): 'light' | 'dark' {
  try {
    const raw = localStorage.getItem('chroma-theme');
    if (raw === 'dark' || raw === 'light') return raw;
  } catch {}
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'dark';
}
