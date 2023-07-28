import React, { useEffect, useState } from 'react';
import '../css/ActivePrograms.css';

const ActivePrograms = () => {
  const [programsData, setProgramsData] = useState([]);

  useEffect(() => {
    fetchProgramsData();
  }, []);

  const fetchProgramsData = async () => {
    try {
      const response = await fetch('/api/active-program');
      if (response.ok) {
        const data = await response.json();
        setProgramsData(data);
      } else {
        throw new Error('Error fetching programs data');
      }
    } catch (error) {
      console.error('Error fetching programs data:', error);
    }
  };

  const programHandleDownload = (document) => {
    window.open(document, '_blank');
  };

  return (
    <div className="activeProgramContainer">
      <div className="activeProgramHolder">
        <h3 className="activeProgramHeading">Active Programmes</h3>
        <div className="programsContainer">
          {programsData.map((program, index) => (
            <div className="programCard" key={index}>
              <div className="programCardDateShare">
                <h2 className="programPostDate">{program.posted}</h2>
                <div className="shareIconContainer">
                  <img className="shareIcon" src="/images/shareIco.png" alt="Share Icon" />
                </div>
              </div>
              <h2 className="programCardTitle">{program.title}</h2>
              <div className="programTagContainer">
                {program.tags.map((tag, index) => (
                  <div className="programTag" key={index}>
                    {tag}
                  </div>
                ))}
              </div>
              <h2 className="programDetailsHeading">Details</h2>
              <p className="programDetails">{program.details}</p>
              <button
                className="downloadButton"
                onClick={() => programHandleDownload(program.document)}
              >
                Download Brochure
                <img className="downloadIcon" src="images/downloadIco.png" alt="Download Icon" />
              </button>
              {/*<button className="programRegBtn">Register</button>*/}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivePrograms;
