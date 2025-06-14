import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import DarkMode from './DarkMode/DarkMode';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar" style={{ backgroundColor: 'var(--color-header-footer)' }}>
      <div className='flex justify-between items-center p-3 px-5'>
        
        <div className='flex gap-1 items-center'>
          <NavLink to='/' className='text-lg link' onClick={closeMenu}>
            <div
              className='logo flex items-center rounded-full py-2 px-2 font-bold text-3xl'
              style={{ backgroundColor: 'var(--color-link-hover)', color: 'var(--color-hover-text)' }}
            >
              CV
            </div>
          </NavLink>
          <NavLink to='/' className='text-lg link' onClick={closeMenu}>
            <div
              className='link text-2xl font-bold'
              style={{ color: 'var(--color-link-hover)' }}
            >
              CINEVish
            </div>
          </NavLink>
        </div>

        <div className='hidden md:flex items-center justify-center gap-4'>
          <DarkMode />
          <NavLink to='/' className={({ isActive }) =>
            isActive ? 'nav-item active text-lg font-semibold' : 'nav-item text-lg'
          } onClick={closeMenu}>Home</NavLink>

          <NavLink to='/favorites' className={({ isActive }) =>
            isActive ? 'nav-item active text-lg font-semibold' : 'nav-item text-lg'
          } onClick={closeMenu}>Favorites</NavLink>

          <NavLink to='/watchlater' className={({ isActive }) =>
            isActive ? 'nav-item active text-lg font-semibold' : 'nav-item text-lg'
          } onClick={closeMenu}>WatchLater</NavLink>
        </div>

        {/* Hamburger Icon */}
        <div className='md:hidden flex items-center gap-4'>
          <DarkMode />
          <button onClick={toggleMenu} className='text-3xl text-white focus:outline-none'>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='flex flex-col gap-4 px-5 pb-4 text-center md:hidden bg-inherit'>
          <NavLink to='/' className={({ isActive }) =>
            isActive ? 'nav-item active font-semibold' : 'nav-item'
          } onClick={closeMenu}>Home</NavLink>

          <NavLink to='/favorites' className={({ isActive }) =>
            isActive ? 'nav-item active font-semibold' : 'nav-item'
          } onClick={closeMenu}>Favorites</NavLink>

          <NavLink to='/watchlater' className={({ isActive }) =>
            isActive ? 'nav-item active font-semibold' : 'nav-item'
          } onClick={closeMenu}>WatchLater</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
