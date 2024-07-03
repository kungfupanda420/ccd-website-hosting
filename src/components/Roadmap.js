import React, { useState } from "react";
import "../css/Roadmap.css";
import { ReactComponent as IconCloseCircleOutline } from "../icons/close-circle-outline.svg"; // Import the SVG as a React component

const Roadmap = () => {
  const [clickedItem, setClickedItem] = useState(null);

  const handleItemClick = (index) => {
    setClickedItem(index === clickedItem ? null : index);
  };

  const handleCloseClick = () => {
    setClickedItem(null);
  };

  return (
    <div className="roadmap">
      <h1 className="title">Path to Placement</h1>
      <div className="roadmap-container">
        <svg
          className="road-svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M-50 10 C30 30, 70 30, 50 50 S100 70, 150 90"
            stroke="black"
            strokeWidth="5"
            fill="none"
          />
          <path
            d="M-50 10 C30 30, 70 30, 50 50 S100 70, 150 90"
            stroke="white"
            strokeWidth="1"
            strokeDasharray="5,5"
            fill="none"
          />

          {/* Pointers */}
          <g className="roadmap-item" onClick={() => handleItemClick(1)}>
            <path d="M31,18 C26,17 26,23 30,27 C34,23 34,17 29,18 Z" fill="#d82929" />
            <circle cx="30" cy="21" r="2" fill="white" />
          </g>
          <g className="roadmap-item" transform="translate(0,-2)" onClick={() => handleItemClick(2)}>
            <path d="M51,27 C46,26 46,32 50,36 C54,32 54,26 49,27 Z" fill="#d82929" />
            <circle cx="50" cy="30" r="2" fill="white" />
          </g>
          <g className="roadmap-item" transform="translate(0,-3)" onClick={() => handleItemClick(3)}>
            <path d="M54,57 C49,56 49,62 53,66 C57,62 57,56 52,57 Z" fill="#d82929" />
            <circle cx="53" cy="60" r="2" fill="white" />
          </g>
          <g className="roadmap-item" transform="translate(0,-7)" onClick={() => handleItemClick(4)}>
            <path d="M71,67 C66,66 66,72 70,76 C74,72 74,66 69,67 Z" fill="#d82929" />
            <circle cx="70" cy="70" r="2" fill="white" />
          </g>
        </svg>
        {clickedItem === 1 && (
          <div className="centered-description">
            <button className="close-btn" onClick={handleCloseClick}><IconCloseCircleOutline /></button>
            1. Excel Academically and Choose Relevant Courses<br/>
            Maintain a strong GPA: Consistently perform well in your studies, as academic excellence is a key criterion for many recruiters. Aim to keep your GPA high, especially in courses related to your desired field.<br/>
            Enroll in relevant coursework: Select courses that align with your career goals. This not only builds your expertise but also signals your commitment to potential employers. Participate actively and strive for excellence in these classes.
          </div>
        )}
        {clickedItem === 2 && (
          <div className="centered-description">
            <button className="close-btn" onClick={handleCloseClick}><IconCloseCircleOutline /></button>
            2. Build Technical and Soft Skills through Practical Experience<br/>
            Technical skills development: Gain proficiency in the tools and technologies pertinent to your field.<br/>
            Soft skills enhancement: Cultivate essential soft skills such as communication, teamwork, and problem-solving. Engage in extracurricular activities, student organizations, and group projects to hone these abilities.<br/>
            Internships and projects: Pursue internships, part-time jobs, or freelance work related to your industry. This hands-on experience demonstrates your ability to apply academic knowledge in real-world settings.<br/>
            Clubs and competitions: Participate in student clubs, hackathons, coding competitions, or industry-specific contests. These activities not only build your resume but also expand your professional network.
          </div>
        )}
        {clickedItem === 3 && (
          <div className="centered-description">
            <button className="close-btn" onClick={handleCloseClick}><IconCloseCircleOutline /></button>
            3. Prepare Thoroughly for Interviews<br/>
            Craft a compelling resume: Develop a resume that highlight your skills, experiences, and accomplishments. Tailor these documents to each position you apply for, emphasizing your most relevant qualifications.<br/>
            Practice interview skills: Prepare for both technical and behavioral interview questions. Engage in mock interviews to gain confidence and receive feedback. Use resources like coding platforms, interview preparation websites, and campus career services to refine your responses.
          </div>
        )}
        {clickedItem === 4 && (
          <div className="centered-description">
            <button className="close-btn" onClick={handleCloseClick}><IconCloseCircleOutline /></button>
            4. Register and Apply Strategically<br/>
            Register on placement portals: Sign up on platforms GENSKILL to stay informed about job opportunities and recruitment drives.<br/>
            Thoroughly review job descriptions: Carefully read and understand the job descriptions to ensure you meet the qualifications and requirements. Tailor your applications to highlight how your skills and experiences align with the job.<br/>
            Apply promptly and follow up: Submit your applications promptly and keep track of deadlines.
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;
