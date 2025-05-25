import React, { useRef, useState } from "react";
import "../css/Candidate_dashboard.css";
// import { usenavigate, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/authFetch";


function CandidateDashboard() {
  const fileInputRef = useRef(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [feeStatus, setFeeStatus] = useState("Pending");
  const [shortlistStatus, setShortlistStatus] = useState("Not Shortlisted");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simulating authentication status
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    alert("File uploaded: " + e.target.files[0]?.name);
  };

  const handleProfilePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfilePhoto(ev.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="profile-photo-wrapper">
          <img
            src={profilePhoto || "/images/default.png"}
            alt="Profile"
            className="profile-photo"
          />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleProfilePhotoChange}
            id="profile-photo-upload"
          />
          <label htmlFor="profile-photo-upload" className="profile-photo-edit">✎</label>
        </div>
        {/* <button className="sidebar-btn" onClick={useNavigate('/Candidate_profile')}>Profile Page</button> */}
        <button className="sidebar-btn" onClick={() => navigate('/candidate_profile')}>Profile Page</button>
        <button className="sidebar-btn">Shortlisting Status</button>
        <button className="sidebar-btn">Fee Payment</button>
        <button className="sidebar-btn">Upload Docs</button>
        <button className="sidebar-btn" onClick={() => navigate('/CandidatePreferences')}>project preferences</button>
        <button className="sidebar-btn" onClick={() => navigate('/logout')}>Logout</button>
        
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <h1>Candidate Dashboard</h1>
        <p>Welcome to the candidate dashboard!</p>

        <div className="status-section">
          <h3>
            Shortlisting Status:{" "}
            <span className="shortlist-status">{shortlistStatus}</span>
          </h3>
          <h3>
            Fee Payment Status:{" "}
            <span className={feeStatus === "Paid" ? "fee-paid" : "fee-pending"}>
              {feeStatus}
            </span>
          </h3>
        </div>

        <div>
          <h3>Upload Files / Documents</h3>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
          />
        
        </div>
      </div>
    </div>
  );
}

export default CandidateDashboard;