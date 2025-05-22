import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import '../css/WhyRecruit.css';
import AOS from "aos";
import "aos/dist/aos.css";

const staticReasons = [
  { number: 1, reason: "Highly talented and diverse student pool" },
  { number: 2, reason: "Strong academic curriculum and research culture" },
  { number: 3, reason: "Excellent placement records" },
  { number: 4, reason: "Modern infrastructure and facilities" },
  { number: 5, reason: "Active student clubs and technical societies" },
];

const WhyRecruit = () => {
  const [reasonData, setReasonData] = useState(staticReasons);

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px -30% 0px'
  });

  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = '/documents/placement_brochure_2024.pdf';
    downloadLink.download = 'Placement Brochure 2024.pdf';
    downloadLink.click();
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className='whyRecruitContainer' ref={ref} data-aos="zoom-in">
      <div className='whyRecruitHolder'>
        {/* Title and button */}
        <div className='whyRecruitTitleContainer'>
          <h1 className='pageHeadingWhyRecruit'>Why Recruit from NIT Calicut?</h1>
          <div className='whiteButton' onClick={handleDownload}>
            <h1 className='buttonText'>Placement Brochure</h1>
            <svg
              className='arrow'
              width='10'
              height='10'
              viewBox='0 0 10 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.272008 0.75735L8.75729 9.24263M8.75729 9.24263V0.75735M8.75729 9.24263H0.272008'
                strokeOpacity='1'
                strokeWidth='0.65'
              />
            </svg>
          </div>
        </div>
        <div className='reasonListContainer'>
          <div className="reasons">
            {reasonData.map((output, index) => (
              <div
                className={`reasonContainer ${inView ? 'animated' : ''}`}
                key={index}
              >
                <div className="reasonNumber">
                  {output.number}
                </div>
                <div className="reasonText">
                  {output.reason}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyRecruit;