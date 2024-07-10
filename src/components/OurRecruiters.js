import React from 'react'
import '../css/OurRecruiters.css'

function OurRecruiters(){

  const images = require.context('../../public/images/companies_logo', false,  /\.(png|jpe?g|svg)$/);
  const imageList = images.keys().map((imageFileName)=>{
    return images(imageFileName);
  });

  return (
    <>
      <h1 className='recruiter-head'>Our Past Recruiters</h1>
      <div className='companies'>
        {imageList.map((imageSrc, index) => (
          <div className="card-company" key={index}>
            <img src={imageSrc} className="company-logo" alt="Company Logo" />
            {/* <p className="company-name">Company</p> */}
          </div>
        ))}
      </div>
    </>
  )

}

export default OurRecruiters