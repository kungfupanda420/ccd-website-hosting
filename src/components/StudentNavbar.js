import React from 'react'
import {NavLink} from 'react-router-dom'
import '../css/StudentNavbar.css'
function StudentNavbar() {
  return (
    <div className='studentNavbar'>
       <div className="studentSubNavbar">
         <ul className='studentNavlinks smallHeading'>
            <NavLink to='internships'>Internship</NavLink>
            <NavLink to='placements'>Placements</NavLink>
            <NavLink to='internopp'>Internship Opportunity</NavLink>
            <NavLink to='ccdprogrammes'>Career Development Program</NavLink>
        </ul>
       </div>


    </div>
  )
}

export default StudentNavbar