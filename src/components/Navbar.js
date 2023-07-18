import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import '../css/Navbar.css';
import AuraEffect from './AuraEffect';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="aura-container">
        <nav className="navbar">
          <AuraEffect />
          <NavLink to="/" className="navbarLogo">
            <img src="/images/navbar_logo.png" alt="Center for Career Development" />
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
            <ul className="rightList">
              {/*<NavLink to="/blogs" className="navLink">Blog</NavLink>*/}
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
