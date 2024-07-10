import React from 'react';
import StudentNavbar from './StudentNavbar';
import '../css/ForStudent.css';
import { Outlet } from 'react-router-dom';
import Roadmap from './Roadmap';

const ForStudent = () => {
  return (
    <div className='forStudentContainer'>
      <StudentNavbar />
      {/* <Roadmap isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} /> */}
      <Outlet />
    </div>
  );
};

export default ForStudent;
