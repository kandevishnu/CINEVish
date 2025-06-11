import React, { useEffect, useState } from "react";
import Sun from './Sun.svg?react';
import Moon from './Moon.svg?react';
import "./DarkMode.css";

const DarkMode = () => {
    const [theme, setTheme] = useState(null); // null initially
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('selectedTheme');
        const currentTheme = savedTheme || 'dark'; // Default to dark

        setTheme(currentTheme);
        document.body.setAttribute('data-theme', currentTheme);
        setMounted(true);
    }, []);

    const toggleTheme = (e) => {
        const newTheme = e.target.checked ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('selectedTheme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
    };

    // Prevent any flicker or mismatch
    if (!mounted || theme === null) return null;

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                checked={theme === 'dark'}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

export default DarkMode;
