
import '../pagesCss/placementPage.css'
import React, { useState,useEffect } from 'react'
import faqData from "./faqData";
import AOS from "aos";
import "aos/dist/aos.css";

const FaqStudents = () => {
  const [viewAnswer, setViewAnswer] = useState(-1)
  function handleViewAnswer(index){
    if(viewAnswer === index) {
      return setViewAnswer(-1)
    }
    setViewAnswer(prev => prev = index)
  }
  useEffect(() => {
    AOS.init({duration: 1600});
  }, []);
  return (
    <>
    <div className="page">
    <div className="faqs" data-aos="zoom-in">
        <h1 className="pageHeading">FaQ</h1>
        {faqData.map((output, index) => 
        (
          
          <div className="questionContainer">
            <div className="question smallHeading" onClick={() => handleViewAnswer(index)} >
              {output.question}
              <span className={viewAnswer === index ? "arrowIcon": "arrowIconInactive"}>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.272008 0.75735L8.75729 9.24263M8.75729 9.24263V0.75735M8.75729 9.24263H0.272008"
                    stroke="white"
                    stroke-opacity="0.5"
                    stroke-width="0.72"
                  />
                </svg>
              </span>
            </div>
            {viewAnswer === index ? <div className="answer tinyTexts">{output.answer}</div> : ""}
          </div>
        ))}
    </div>
    </div>
    </>
  )
}

export default FaqStudents

    