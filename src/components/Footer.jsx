import React from 'react'
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <footer
                className="p-4 mt-10 text-center text-sm"
                style={{
                    backgroundColor: 'var(--color-header-footer)',
                    color: 'white',
                }}
            >
                <div className="mb-2">
                    <NavLink to="/" className="mx-2 nav-item">Home</NavLink>|
                    <NavLink to="/favorites" className="mx-2 nav-item">Favorites</NavLink>|
                    <NavLink to="/watchlater" className="mx-2 nav-item">WatchLater</NavLink>
                </div>

                <p className="mb-1">CINEVish — A personal movie app by Vishnu</p>
                <p className="mb-1">Built with React & TMDB API & ❤️</p>

                <p>© 2025 Vishnu. All rights reserved.</p>
            </footer>

        </div>
    )
}

export default Footer
