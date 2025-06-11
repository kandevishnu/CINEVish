import React, { useEffect, useState } from "react";
import Sun from './Sun.svg?react';
import Moon from './Moon.svg?react';
import "./DarkMode.css";

const DarkMode = () => {
    const [theme, setTheme] = useState('light');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('selectedTheme') || 'light';
        setTheme(savedTheme);
        document.body.setAttribute('data-theme', savedTheme);
        setIsMounted(true); // Ensure this runs after hydration
    }, []);

    const toggleTheme = (e) => {
        const newTheme = e.target.checked ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('selectedTheme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
    };

    if (!isMounted) return null; // Avoid incorrect render on first load

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
