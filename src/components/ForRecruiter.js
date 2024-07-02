import React from 'react'
import '../css/ForRecruiter.css'
import Placement from '../pages/Placement'
import Form from './Form'
import PlacementPathCompo from '../pages/PlacementPathCompo'
import Roadmap from './Roadmap'
function ForRecruiter() {
  return (
    <div className='forRecruiterContainer'>
        <PlacementPathCompo/>
        <Form/>
        <Roadmap/>
    </div>
  )
}

export default ForRecruiter