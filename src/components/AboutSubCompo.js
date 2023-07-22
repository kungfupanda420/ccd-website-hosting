import React, {useState} from 'react'
import '../css/NewAbout.css'
function AboutSubCompo(props) {
    const [show, setShow] = useState(false)
    const [showOne, setShowOne] = useState(false)
    const [showTwo, setShowTwo] = useState(false)

    const knowMoreHandle = () => {
        setShowOne(!showOne)
        setShowTwo(!showTwo)
    }

    const {clubName, clubInfoTwoLines, clubInfoMore, clubImageOne,clubImageTwo,clubImageThree} = props.clubContent

    
  return (
    <div className='clubsDivContainers'>
         <div className='aboutContainer'  >
        <div className="aboutSubContainers">
            <div className="itemOnes">
                  <div className="imageContiners">
                        <img src={clubImageOne} alt="" />
                    </div>

                    <div className={show ? "contentDivs addVerticalFlow" : "contentDivs" }>
                        <h1 className='mainHeading'>
                            {clubName}
                        </h1>
                        <p className='smallHeading'>
                            {clubInfoTwoLines} <span className={show? 'show' :'hide'} >
                             {clubInfoMore}
                            </span>
                        </p>
                        
                         <p className='smallHeading knowMoreBtn' onClick={() => setShow(!show)} >{show ? "Show Less" : "Know More"}</p>
                    </div>
            </div>
            <div className="itemTwos">
                  <div className="imageContiners">
                        <img src={clubImageTwo} alt="" />
                    </div>
                      {/* <div className={showOne ? "contentDivs addVerticalFlow" : "contentDivs" }>
                        <h1 className='mainHeading'>
                           Our Motto
                        </h1>
                        <p className='smallHeading'>
                            Liaison with talent acquisition teams of industries, consultant firms and research organisations for placement and internship opportunities.<span className={showOne? 'show' :'hide'} >Collaborate with alumni to facilitate exploration of career options for students.Enhance the skill sets of students through training programmes so as to make them career-ready.</span>
                        </p>
                        
                        <p className='smallHeading knowMoreBtn' onClick={() => setShowOne(!showOne)} >{showOne ? "Show Less" : "Know More"}</p>
                    </div> */}
            </div>
            <div className="itemThrees">
                  <div className="imageContiners">
                        <img src={clubImageThree} alt="" />
                    </div>
                       {/* <div className={showTwo ? "contentDivs addVerticalFlow" : "contentDivs" }>
                        <h1 className='mainHeading'>
                            Vision
                        </h1>
                        <p className='smallHeading'>
                            Inculcate a career-oriented campus culture that moulds the undergraduate, postgraduate and doctoral <span className={showTwo? 'show' :'hide'} >research students of the Institute to pursue their academic and professional goals</span>
                        </p>
                        
                       <p className='smallHeading knowMoreBtn' onClick={() => setShowTwo(!showTwo)} >{showTwo ? "Show Less" : "Know More"}</p>
                    </div> */}
            </div>
        </div>

    </div>
    </div>
  )
}

export default AboutSubCompo