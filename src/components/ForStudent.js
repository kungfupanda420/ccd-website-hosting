import React from 'react'
import StudentNavbar from './StudentNavbar'
import '../css/ForStudent.css'
import { Outlet } from 'react-router-dom'
function ForStudent() {
  return (
    <div className='forStudentContainer'>
        <StudentNavbar/>
        <Outlet/>
    </div>
  )
}

export default ForStudent