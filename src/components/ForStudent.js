import React from 'react'
import StudentNavbar from './StudentNavbar'
import '../css/ForStudent.css'
import { Outlet } from 'react-router-dom'
import AluminiTest from './AluminiTest'
function ForStudent() {
  return (
    <div className='forStudentContainer'>
        <StudentNavbar/>
        <Outlet/>
        <AluminiTest/>
    </div>
  )
}

export default ForStudent