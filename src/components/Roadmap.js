import React, { useEffect, useState } from "react";
import "../css/Roadmap.css";
import { ReactComponent as IconCloseCircleOutline } from "../icons/close-circle-outline.svg"; // Import the SVG as a React component
import { ReactComponent as IconCloseCircleOutlineDark } from '../icons/close-circle-outline_dark.svg';
import AOS from "aos";
import "aos/dist/aos.css";

const Roadmap = ({ isDarkMode, onToggleTheme }) => {
  const [clickedItem, setClickedItem] = useState(null);

  const handleItemClick = (index) => {
    setClickedItem(index === clickedItem ? null : index);
  };

  const handleCloseClick = () => {
    setClickedItem(null);
  };

  useEffect(() => {
    AOS.init({duration: 1600});
  }, []);

  return (
    <div className="roadmap" data-aos="zoom-in">
      <h1 className="title">Path to Placement</h1>
      <div className="roadmap-container">
        <svg
          className="road-svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            id="roadPath"
            d="M-50 10 C30 30, 70 30, 50 50 S100 70, 150 90"
            stroke={isDarkMode ? "grey" : "grey"}
            strokeWidth="5"
            fill="none"
          />
          <path
            d="M-50 10 C30 30, 70 30, 50 50 S100 70, 150 90"
            stroke={isDarkMode ? "black" : "white"}
            strokeWidth="1"
            strokeDasharray="5,5"
            fill="none"
          />

          <g className="roadmap-item" onClick={() => handleItemClick(1)}>
            <path d="M31,18 C26,17 26,23 30,27 C34,23 34,17 29,18 Z" fill="#d82929" />
            <circle cx="30" cy="21" r="2" fill="white" />
            <text x="30" y="21" textAnchor="middle" dy=".3em" fill="black" fontSize="2px">1</text>
          </g>
          <g className="roadmap-item" transform="translate(0,-2)" onClick={() => handleItemClick(2)}>
            <path d="M51,27 C46,26 46,32 50,36 C54,32 54,26 49,27 Z" fill="#d82929" />
            <circle cx="50" cy="30" r="2" fill="white" />
            <text x="50" y="30" textAnchor="middle" dy=".3em" fill="black" fontSize="2px">2</text>
          </g>
          <g className="roadmap-item" transform="translate(0,-3)" onClick={() => handleItemClick(3)}>
            <path d="M54,57 C49,56 49,62 53,66 C57,62 57,56 52,57 Z" fill="#d82929" />
            <circle cx="53" cy="60" r="2" fill="white" />
            <text x="53" y="60" textAnchor="middle" dy=".3em" fill="black" fontSize="2px">3</text>
          </g>
          <g className="roadmap-item" transform="translate(0,-7)" onClick={() => handleItemClick(4)}>
            <path d="M71,67 C66,66 66,72 70,76 C74,72 74,66 69,67 Z" fill="#d82929" />
            <circle cx="70" cy="70" r="2" fill="white" />
            <text x="70" y="70" textAnchor="middle" dy=".3em" fill="black" fontSize="2px">4</text>
          </g>
          <g className="roadmap-item" transform="translate(0,-13)" onClick={() => handleItemClick(5)}>
            <path d="M91,77 C86,76 86,82 90,86 C94,82 94,76 89,77 Z" fill="#d82929" />
            <circle cx="90" cy="80" r="2" fill="white" />
            <text x="90" y="80" textAnchor="middle" dy=".3em" fill="black" fontSize="2px">5</text>
          </g>
        </svg>

        {clickedItem === 1 && (
          <div className="description" style={{ top: '20%', left: '41%' }}>
            <button className="close-btn" onClick={handleCloseClick}>
              {isDarkMode ? <IconCloseCircleOutlineDark /> : <IconCloseCircleOutline />}
            </button>
            <div className="desText">
            <span>1. Register in Genskill and Join the Respective Campaign (Intern/ Placement):</span><br />
            All interested students must register on the Genskill portal and join either the Internship or Placement campaign based on their eligibility and interest.
            </div>
            
          </div>
        )}
        {clickedItem === 2 && (
          <div className="description" style={{ top: '25%', left: '51%' }}>
            <button className="close-btn" onClick={handleCloseClick}>
              {isDarkMode ? <IconCloseCircleOutlineDark /> : <IconCloseCircleOutline />}
            </button>
            <div className="desText">
            <span>2. Apply for Company Drives:</span><br />
            When a company starts a recruitment drive, apply for it through the Genskill portal. Detailed information and further instructions will be sent to your registered email.
            </div>
            
          </div>
        )}
        {clickedItem === 3 && (
          <div className="description" style={{ top: '55%', left: '53%' }}>
            <button className="close-btn" onClick={handleCloseClick}>
              {isDarkMode ? <IconCloseCircleOutlineDark /> : <IconCloseCircleOutline />}
            </button>
            <div className="desText">
            <span>3. Online Assessment and Interview Rounds:</span><br />
            Initially, there will be an online assessment. Students who clear this stage will proceed to subsequent interview rounds.
            </div>
          </div>
        )}
        {clickedItem === 4 && (
          <div className="description" style={{ top: '60%', left: '62%' }}>
            <button className="close-btn" onClick={handleCloseClick}>
              {isDarkMode ? <IconCloseCircleOutlineDark /> : <IconCloseCircleOutline />}
            </button>
            <div className="desText">
            <span>4. Notification of Shortlisted Students:</span><br />
            The company will update the list of shortlisted students in Genskill. If you are selected, Congratulations!
            </div>
          </div>
        )}
        {clickedItem === 5 && (
          <div className="description" style={{ top: '65%', left: '55%' }}>
            <button className="close-btn" onClick={handleCloseClick}>
              {isDarkMode ? <IconCloseCircleOutlineDark /> : <IconCloseCircleOutline />}
            </button>
            <div className="desText">
            <span>5. Attend the Onboarding Session:</span><br />
            Shortlisted students will be invited to attend an onboarding session where they will receive further instructions and join their respective teams.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;
