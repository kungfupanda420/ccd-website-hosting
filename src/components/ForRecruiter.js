import React from 'react'
import '../css/ForRecruiter.css'
import Placement from '../pages/Placement'
import Form from './Form'
import PlacementPathCompo from '../pages/PlacementPathCompo'
function ForRecruiter() {
  return (
    <div className='forRecruiterContainer'>
        <PlacementPathCompo/>
        <Form/>
    </div>
  )
}

export default ForRecruiter