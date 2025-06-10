import React, { useEffect } from "react";
import Sun from './Sun.svg?react';
import Moon from './Moon.svg?react';
import "./DarkMode.css";

const DarkMode = () => {
    const setDarkMode = () => {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('selectedTheme', 'dark');
    };

    const setLightMode = () => {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('selectedTheme', 'light');
    };

    useEffect(() => {
        const selectedTheme = localStorage.getItem('selectedTheme');
        if (selectedTheme === 'dark') {
            setDarkMode();
        } else {
            setLightMode();
        }
    }, []);

    const toggleTheme = (e) => {
        if (e.target.checked) {
            setDarkMode();
        } else {
            setLightMode();
        }
    };

    const selectedTheme = localStorage.getItem('selectedTheme');

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                defaultChecked={selectedTheme === 'dark'}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

export default DarkMode;
