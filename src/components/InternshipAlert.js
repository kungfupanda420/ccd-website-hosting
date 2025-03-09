import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/InternshipAlert.css';

const AlertButton = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true); 
  const handleApplyClick = () => {
    navigate('/SummerInternship'); 
  };

  const handleCloseClick = () => {
    setIsVisible(false); 
  };

  if (!isVisible) return null;

  return (
    <div className="alert-background">
      <div className="alert-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={handleCloseClick}>
          ✕
        </button>
        <div className="alert-box">
          <h2>Internship Alert</h2>
          <p>Looking for an internship opportunity?</p>
          <button id="applyButton" onClick={handleApplyClick}>
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertButton;