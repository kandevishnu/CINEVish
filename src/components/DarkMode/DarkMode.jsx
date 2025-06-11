import React, { useEffect, useState } from "react";
import Sun from './Sun.svg?react';
import Moon from './Moon.svg?react';
import "./DarkMode.css";

const DarkMode = () => {
    const [theme, setTheme] = useState('dark'); // Default to dark
    const [mounted, setMounted] = useState(false); // Prevent mismatch on first render

    useEffect(() => {
        const savedTheme = localStorage.getItem('selectedTheme');

        if (savedTheme === 'light') {
            setTheme('light');
            document.body.setAttribute('data-theme', 'light');
        } else {
            // Default to dark
            setTheme('dark');
            document.body.setAttribute('data-theme', 'dark');
        }

        setMounted(true);
    }, []);

    const toggleTheme = (e) => {
        const newTheme = e.target.checked ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('selectedTheme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
    };

    if (!mounted) return null; // Prevent mismatch during SSR/first render

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                checked={theme === 'dark'} // Keep checkbox in sync
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

export default DarkMode;
