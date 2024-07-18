import React, { useState } from 'react'
import '../css/OurRecruiters.css'
import { FaDownload } from "react-icons/fa6";


function OurRecruiters() {
  // const showBtn = (e) => {
  //   const buttonText = document.querySelector('.buttonText')
  //   buttonText.innerText = 'Download Brochure'
  // }
  // const hideBtn = (e) => {
  //   e.target.innerText = ''
  // }
  const [hover, setHover] = useState(false);
  const images = require.context('../../public/images/companies_logo', false, /\.(png|jpe?g|svg)$/);
  const imageList = images.keys().map((imageFileName) => {
    return images(imageFileName);
  });


  return (
    <>
      <h1 className='recruiter-head'>Our Past Recruiters</h1>
      <div className='companiesAll'>
        {imageList.map((imageSrc, index) => (
          <div className="card-company" key={index}>
            <img src={imageSrc} className="company-logo" alt="Company Logo" />
            {/* <p className="company-name">Company</p> */}
          </div>
        ))}
        <button className='whiteButton pageDownBtn' onMouseOver={() => { setHover(true); }}
          onMouseLeave={() => { setHover(false); }}>
          <a href='documents/placement_brochure_2024.pdf' download='Placement Brochure'>
            <span className='buttonText'>
              {!hover && <FaDownload />}
              {hover && 'Download Brochure'}
            </span>
          </a>
        </button>

      </div>

    </>
  )

}

export default OurRecruiters