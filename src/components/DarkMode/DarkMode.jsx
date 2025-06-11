import React, { useEffect, useState } from "react";
import Sun from './Sun.svg?react';
import Moon from './Moon.svg?react';
import "./DarkMode.css";

const getInitialTheme = () => {
  const stored = localStorage.getItem('selectedTheme');
  return stored ? stored : 'dark';
};

const DarkMode = () => {
  const [theme, setTheme] = useState(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('selectedTheme', theme);
    setMounted(true);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <div className="dark_mode_toggle" onClick={toggleTheme} title="Toggle theme">
      <div className={`toggle-switch ${theme}`}>
        <div className="icon sun"><Sun /></div>
        <div className="icon moon"><Moon /></div>
        <div className="toggle-ball" />
      </div>
    </div>
  );
};

export default DarkMode;
