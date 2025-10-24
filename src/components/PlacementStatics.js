
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/PlacementStatics.css';
import { useInView } from 'react-intersection-observer';
import AOS from "aos";
import "aos/dist/aos.css";
import OurRecruiters from './OurRecruiters';

const RunningNumbers = ({ endNumber }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < endNumber) {
        setCount(count + 1);
      } else {
        clearInterval(interval);
      }
    }, 1);

    return () => clearInterval(interval);
  }, [count, endNumber]);

  return <div>{count}</div>;
};

const PlacementStatics = () => {
  const location = useLocation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px -40% 0px', // Ensures the trigger fires only once
  });

  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = '/documents/Annual Report CCD 2023-2024 (2).pdf';
    downloadLink.download = 'Annual Report CCD 2023-2024.pdf';
    downloadLink.click();
  };

  const handleDownload2 = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = '/documents/anual_report_2022-2023.pdf';
    downloadLink.download = 'Annual Report CCD 2022-2023.pdf';
    downloadLink.click();
  };
  const handleDownload3 = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = '/documents/WebData2021_22.pdf';
    downloadLink.download = 'Annual Report CCD 2021-2022.pdf';
    downloadLink.click();
  };
  const handleDownload4 = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = '/documents/Web Data 2020-2021 (1).pdf';
    downloadLink.download = '2019-20PlacementDetailsFINAL.pdf';
    downloadLink.click();
  };
  const handleDownload5 = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = '/documents/2019-20PlacementDetailsFINAL.pdf';
    downloadLink.download = 'Annual Report CCD 2019-2020.pdf';
    downloadLink.click();
  };
  const handleDownload6 = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = '/documents/2018-2019.pdf';
    downloadLink.download = 'Annual Report CCD 2018-2019.pdf';
    downloadLink.click();
  };
  const handleDownload7 = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = '/documents/2016-2018 (1).pdf';
    downloadLink.download = 'Annual Report CCD 2016-2018.pdf';
    downloadLink.click();
  };
  const handleDownload8 = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = '/documents/Annual Report CCD 2023-2024 (2).pdf';
    downloadLink.download = 'Annual Report CCD 2023-2024.pdf';
    downloadLink.click();
  };
  const [endNumbers] = useState({
    Placements: 1080,
    companiesVisited: 208,
    Internships: 187,
    highestPackage: 50.64,
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <div className='placementStaticContainer1' data-aos="zoom-in">
        <div className='placementStaticHolder' ref={ref}>
          {/* Title and button */}
          <div className='titleAndButtonContainer'>
            <h1 className='mainHeading'>Placement Statistics 2024</h1>
            <div className='whiteButton' onClick={handleDownload}>
              <h1 className='buttonText'>Detailed Report</h1>
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
          {/* Running Stats */}
          <div className='runningStatContainer'>
            {/* Students Placed */}
            <div className='eachStatContainer'>
              <div className='statValue'>
                <h1 className='statNumber'>
                  <RunningNumbers endNumber={endNumbers.Placements} />
                </h1>
                <h2 className='statPlus'>+</h2>
              </div>
              <p className='statText'>Placements</p>
            </div>
            <div className='verticalLine'></div>
            {/* Companies Visited */}
            <div className='eachStatContainer'>
              <div className='statValue'>
                <h1 className='statNumber'>
                  <RunningNumbers endNumber={endNumbers.companiesVisited} />
                </h1>
                <h2 className='statPlus'>+</h2>
              </div>
              <p className='statText'>Companies Visited</p>
            </div>
            <div className='verticalLine secondVerticalLine'></div>
            {/* Total Offers */}
            <div className='eachStatContainer'>
              <div className='statValue'>
                <h1 className='statNumber'>
                  <RunningNumbers endNumber={endNumbers.Internships} />
                </h1>
                <h2 className='statPlus'>+</h2>
              </div>
              <p className='statText'>Internships</p>
            </div>
            <div className='verticalLine thirdVerticalLine'></div>
            {/* Highest Package */}
            <div className='eachStatContainer'>
              <div className='statValue'>
                <h1 className='statNumber'>
                  <RunningNumbers endNumber={endNumbers.highestPackage} />
                </h1>
                <h2 className='statLpa'>LPA</h2>
              </div>
              <p className='statText'>Highest Package</p>
            </div>
          </div>
         
          <h6 className='mainHeading'>Previous Year Placement Statistics</h6>
          <div className='Prev'>
            <div className='whiteButton' onClick={handleDownload8}>
              <h1 className='buttonText'>Report 2023-24</h1>
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
            <div className='whiteButton' onClick={handleDownload2}>
              <h1 className='buttonText'>Report 2022-23</h1>
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
            <div className='whiteButton' onClick={handleDownload3}>
              <h1 className='buttonText'>Report 2021-22</h1>
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
            <div className='whiteButton' onClick={handleDownload4}>
              <h1 className='buttonText'>Report 2020-21</h1>
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
            <div className='whiteButton' onClick={handleDownload5}>
              <h1 className='buttonText'>Report 2019-20</h1>
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
            <div className='whiteButton' onClick={handleDownload6}>
              <h1 className='buttonText'>Report 2018-19</h1>
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
            <div className='whiteButton' onClick={handleDownload7}>
              <h1 className='buttonText'>Report 2016-18</h1>
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
        </div>
        {location.pathname === '/placement' && 
        <><OurRecruiters />
        </>}
      </div>
    </>
  );
};

export default PlacementStatics;
