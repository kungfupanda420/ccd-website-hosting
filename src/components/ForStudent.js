import React from 'react'
import StudentNavbar from './StudentNavbar'
import '../css/ForStudent.css'
import { Outlet } from 'react-router-dom'
import Roadmap from './Roadmap'
function ForStudent() {
  return (
    <div className='forStudentContainer'>
        <StudentNavbar/>
        <Roadmap/>
        <Outlet/>
    </div>
  )
}

export default ForStudent