import React from 'react'
import StudentNavbar from './StudentNavbar'
import '../css/ForStudent.css'
import { Outlet } from 'react-router-dom'
// <<<<<<< HEAD
import Roadmap from './Roadmap'
// =======
// >>>>>>> 4519c835e43dd15c0b74400daa244433996b0474
import AluminiTest from './AluminiTest'
function ForStudent() {
  return (
    <div className='forStudentContainer'>
        <StudentNavbar/>
        <Roadmap/>
        <Outlet/>
        <AluminiTest/>
    </div>
  )
}

export default ForStudent