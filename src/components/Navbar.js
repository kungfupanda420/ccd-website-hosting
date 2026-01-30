import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import '../css/Navbar.css';
import AuraEffect from './AuraEffect';
import DarkMode from '../DarkMode/DarkMode';

const Navbar = ({ isDarkMode, onToggleTheme }) => {
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
              {/* <NavLink to="/sipresults" className="navLink" onClick={closeMobileMenu}>
                Summer Internshiphttps://github.com/CCD-NITC-Website/ccd-website-hosting/pull/73/conflict?name=src%252Fcomponents%252FNavbar.js&ancestor_oid=c4558a1f31e739b71892d6e44d0e6b6f80f0460a&base_oid=a0f19733208409863650309d6272ad68d52b5317&head_oid=359a13265ae265ff9c455fbbc3de727093519052
              </NavLink> */}
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
            <DarkMode isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />
            <ul className="rightList">
              <NavLink to="https://nitc.ac.in/" target='_blank' className="navLink" onClick={closeMobileMenu}>
                NIT CALICUT
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
