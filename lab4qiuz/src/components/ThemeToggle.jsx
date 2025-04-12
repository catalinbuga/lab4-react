// ThemeToggle.jsx - Buton care comută între temă light și dark

import React, { useEffect, useState } from 'react';
import '../styles/theme.css';

function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Schimbă tema ({theme === 'light' ? 'Întunecată' : 'Luminoasă'})
    </button>
  );
}

export default ThemeToggle;
