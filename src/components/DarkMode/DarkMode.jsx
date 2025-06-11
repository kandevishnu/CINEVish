import React, { useEffect, useState } from "react";
import Sun from './Sun.svg?react';
import Moon from './Moon.svg?react';
import "./DarkMode.css";

const DarkMode = () => {
    const [theme, setTheme] = useState('dark'); // default to dark
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('selectedTheme') || 'dark';
        setTheme(savedTheme);
        document.body.setAttribute('data-theme', savedTheme);
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('selectedTheme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
    };

    if (!mounted) return null;

    return (
        <div className="dark_mode" onClick={toggleTheme} style={{ cursor: "pointer" }}>
            {theme === 'dark' ? <Sun /> : <Moon />}
        </div>
    );
};

export default DarkMode;
