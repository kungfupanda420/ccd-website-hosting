import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import '../css/Navbar.css';
import AuraEffect from './AuraEffect';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [entered, setEntered] = useState(false)
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  window.addEventListener('scroll', (e) => {
    const pageyStart = 3250.93896484375;
    const pageyEnd = 3681.4423828125;   //check this height when backend is added 
    const homePage = e.target.location.pathname
    const moved = e.target.scrollingElement.scrollTop
    if(moved >= pageyStart && moved <= pageyEnd && homePage == '/'){
      setEntered(true)
    }
    else{
      setEntered(false)
    }
  })

  return (
    <>
      <div className="aura-container" >
        <nav className={entered ? "navbar navbarModified": "navbar"} id='navbar_Id'>
          <AuraEffect />
          <NavLink to="/" className="navbarLogo">
            <img src="/images/navbar_logo.png" alt="Center for Career Development" />
          </NavLink>

          <div className={`navLinks ${isMobileMenuOpen ? 'mobile-menu' : ''}`}>
            <ul className="centerList">
              <NavLink to="/" className={entered ? "navLink navLinkModified": "navLink"} onClick={closeMobileMenu}>
                Home
              </NavLink>
              <NavLink to="/about" className={entered ? "navLink navLinkModified": "navLink"} onClick={closeMobileMenu}>
                About Us
              </NavLink>
              <NavLink to="/placement" className={entered ? "navLink navLinkModified": "navLink"}  onClick={closeMobileMenu}>
                Placement Statistics
              </NavLink>
              <NavLink to="/recruiter" className={entered ? "navLink navLinkModified": "navLink"} onClick={closeMobileMenu}>
                For Recruiter
              </NavLink>
              <NavLink to="/forstudents" className={entered ? "navLink navLinkModified": "navLink"} onClick={closeMobileMenu}>
                For Students
              </NavLink>
            </ul>
            <ul className="rightList">
              {/*<NavLink to="/blogs" className="navLink">Blog</NavLink>*/}
              <NavLink to="https://nitc.ac.in/" className={entered ? "navLink navLinkModified": "navLink"}  onClick={closeMobileMenu}>
                Nit Calicut
              </NavLink>
              <NavLink to="/login" className={entered ? "navLink navLinkModified": "navLink"}  onClick={closeMobileMenu}>
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
