import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../css/Navbar.css';
import AuraEffect from './AuraEffect';
import DarkMode from '../DarkMode/DarkMode';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleToggleTheme = (isDarkMode) => {
    setIsDarkMode(isDarkMode);
    if (isDarkMode) {
      document.querySelector("body").setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.querySelector("body").setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      <div className="aura-container">
        <nav className="navbar">
          <AuraEffect />
          <NavLink to="/" className="navbarLogo">
            <img
                src={isDarkMode ? "/images/navbar_logo.png" : "/images/navbar_logo_light_mode.png"}
                alt="Center for Career Development"
                className='navbarLogo'
            />
          </NavLink>

          <div className={`navLinks ${isMobileMenuOpen ? 'mobile-menu' : ''}`}>
            <ul className="centerList">
              <NavLink to="/" className="navLink" onClick={closeMobileMenu}>
                Home
              </NavLink>
              <NavLink to="/about" className="navLink" onClick={closeMobileMenu}>
                About Us
              </NavLink>
              <NavLink to="/placement" className="navLink" onClick={closeMobileMenu}>
                Placement Statistics
              </NavLink>
              <NavLink to="/recruiter" className="navLink" onClick={closeMobileMenu}>
                For Recruiter
              </NavLink>
              <NavLink to="/forstudents" className="navLink" onClick={closeMobileMenu}>
                For Students
              </NavLink>
            </ul>
            <DarkMode isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />
            <ul className="rightList">
              <NavLink to="https://nitc.ac.in/" className="navLink" onClick={closeMobileMenu}>
                Nit Calicut
              </NavLink>
              <NavLink to="/login" className="navLink" onClick={closeMobileMenu}>
                Login
              </NavLink>
            </ul>
          </div>
          <img
            src="/images/menuBtn.png"
            alt="MENU"
            className={`menuHamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          />
          {isMobileMenuOpen && <div className="menuOverlay" onClick={toggleMobileMenu}></div>}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
