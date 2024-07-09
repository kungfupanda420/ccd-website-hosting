import React from 'react'
import StudentNavbar from './StudentNavbar'
import '../css/ForStudent.css'
import { Outlet } from 'react-router-dom'
import Roadmap from './Roadmap'
import AluminiTest from './AluminiTest'
function ForStudent() {
  return (
    <div className='forStudentContainer'>
        <StudentNavbar/>
        {/* <Roadmap/> */}
        <Outlet/>
        {/* <AluminiTest/> */}
    </div>
  )
}

export default ForStudent