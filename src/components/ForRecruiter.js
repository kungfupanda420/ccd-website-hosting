import React from 'react'
import '../css/ForRecruiter.css'
import Placement from '../pages/Placement'
import Form from './Form'
import PlacementPathCompo from '../pages/PlacementPathCompo'
import AluminiTest from './AluminiTest'
function ForRecruiter() {
  return (
    <div className='forRecruiterContainer'>
        <PlacementPathCompo/>
        <AluminiTest/>
        <Form/>
    </div>
  )
}

export default ForRecruiter