import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ICON  = { dark: '☽', light: '☀', system: '◑' };
const LABEL = { dark: 'Dark', light: 'Light', system: 'Auto' };
const NEXT  = { dark: 'light', light: 'system', system: 'dark' };

export default function ThemeToggle() {
  const { preference, cyclePreference } = useTheme();

  return (
    <button
      className={`theme-toggle theme-toggle--${preference}`}
      onClick={cyclePreference}
      aria-label={`Theme: ${LABEL[preference]}. Click to switch to ${LABEL[NEXT[preference]]}.`}
      title={`Switch to ${LABEL[NEXT[preference]]}`}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {ICON[preference]}
      </span>
      <span className="theme-toggle__label">{LABEL[preference]}</span>
    </button>
  );
}
