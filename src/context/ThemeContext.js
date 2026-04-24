import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

function getSystemTheme() {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function ThemeProvider({ children }) {
  const [preference, setPreference] = useState(() => {
    try { return localStorage.getItem('theme-pref') || 'system'; }
    catch { return 'system'; }
  });

  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  // Track OS-level preference changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const update = () => setSystemTheme(mq.matches ? 'light' : 'dark');
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const effectiveTheme = preference === 'system' ? systemTheme : preference;

  // Apply to <html> and persist
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    try { localStorage.setItem('theme-pref', preference); } catch {}
  }, [preference, effectiveTheme]);

  // Cycle: dark → light → system → dark
  const cyclePreference = () => {
    setPreference(p => {
      if (p === 'dark')   return 'light';
      if (p === 'light')  return 'system';
      return 'dark';
    });
  };

  return (
    <ThemeContext.Provider value={{ preference, effectiveTheme, cyclePreference }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
