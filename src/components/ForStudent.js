import React from 'react';
import StudentNavbar from './StudentNavbar';
import '../css/ForStudent.css';
import { Outlet } from 'react-router-dom';
import Roadmap from './Roadmap';
import AluminiTest from './AluminiTest';

const ForStudent = ({ isDarkMode, onToggleTheme }) => {
  return (
    <div className='forStudentContainer'>
      <StudentNavbar />
      {/* <Roadmap isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} /> */}
      <Outlet />
      {/* <AluminiTest /> */}
    </div>
  );
};

export default ForStudent;
