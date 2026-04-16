import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { useEffect, useState } from 'react';
import { lightTheme, darkTheme } from '~/styles/theme.css';
import '~/styles/global.css';
import { applyTheme, getSavedTheme } from '~/lib/theme';

const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('chroma-theme');
    if (!theme || theme === 'auto') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.remove('${lightTheme}', '${darkTheme}');
    document.documentElement.classList.add(theme === 'dark' ? '${darkTheme}' : '${lightTheme}');
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('${darkTheme}');
  }
})();
`;

export function Layout({ children }: { children: React.ReactNode }) {
  const [themeClass, setThemeClass] = useState(() => {
    if (typeof document === 'undefined') return darkTheme;
    return document.documentElement.classList.contains(lightTheme) ? lightTheme : darkTheme;
  });

  useEffect(() => {
    const sync = () => {
      const saved = getSavedTheme();
      applyTheme(saved);
      setThemeClass(saved === 'light' ? lightTheme : darkTheme);
    };

    sync();
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'chroma-theme') sync();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <html lang="zh-CN" className={themeClass}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
