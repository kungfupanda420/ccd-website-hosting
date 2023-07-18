import React, { useState } from 'react'
import '../css/NewAbout.css'
function NewAbout() {

    const [show, setShow] = useState(false)
    const [showOne, setShowOne] = useState(false)
    const [showTwo, setShowTwo] = useState(false)

    const knowMoreHandle = () => {
        setShowOne(!showOne)
        setShowTwo(!showTwo)
    }

  return (
    <div className='aboutContainer'>

        <div className="aboutSubContainers">
            <div className="itemOnes">
                  <div className="imageContiners">
                        <img src="/images/about.png" alt="" />
                    </div>

                    <div className={show ? "contentDivs addVerticalFlow" : "contentDivs" }>
                        <h1 className='mainHeading'>
                            About us
                        </h1>
                        <p className='smallHeading'>
                            The Center for Career Development (CCD) at NIT Calicut is dedicated to providing comprehensive career guidance, training, and placement support to students.<span className={show? 'show' :'hide'} >Our mission is to empower students with the skills, knowledge, and opportunities necessary to succeed in their chosen careers. We offer personalized counseling, industry connections, and a range of workshops and training programs to enhance employability skills. Our goal is to bridge the gap between academia and industry, ensuring students have access to internships, industrial training, and placement opportunities. At CCD, we are committed to nurturing well-rounded professionals who are equipped for the challenges of the ever-evolving job market.</span>
                        </p>
                        
                         <p className='smallHeading knowMoreBtn' onClick={() => setShow(!show)} >{show ? "Show Less" : "Know More"}</p>
                    </div>
            </div>
            <div className="itemTwos">
                  <div className="imageContiners">
                        <img src="/images/about.png" alt="" />
                    </div>
                      <div className={showOne ? "contentDivs addVerticalFlow" : "contentDivs" }>
                        <h1 className='mainHeading'>
                           Mission
                        </h1>
                        <p className='smallHeading'>
                            Liaison with talent acquisition teams of industries, consultant firms and research organisations for placement and internship opportunities.<span className={showOne? 'show' :'hide'} >Collaborate with alumni to facilitate exploration of career options for students.Enhance the skill sets of students through training programmes so as to make them career-ready.</span>
                        </p>
                        
                        <p className='smallHeading knowMoreBtn' onClick={() => setShowOne(!showOne)} >{showOne ? "Show Less" : "Know More"}</p>
                    </div>
            </div>
            <div className="itemThrees">
                  <div className="imageContiners">
                        <img src="/images/about.png" alt="" />
                    </div>
                       <div className={showTwo ? "contentDivs addVerticalFlow" : "contentDivs" }>
                        <h1 className='mainHeading'>
                            Vision
                        </h1>
                        <p className='smallHeading'>
                            Inculcate a career-oriented campus culture that moulds the undergraduate, postgraduate and doctoral <span className={showTwo? 'show' :'hide'} >research students of the Institute to pursue their academic and professional goals</span>
                        </p>
                        
                       <p className='smallHeading knowMoreBtn' onClick={() => setShowTwo(!showTwo)} >{showTwo ? "Show Less" : "Know More"}</p>
                    </div>
            </div>
        </div>

    </div>
  )
}

export default NewAbout