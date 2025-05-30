import React, { useRef, useState, useEffect } from "react";
import "../css/Candidate_dashboard.css";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/authFetch";

function CandidateDashboard() {
  const fileInputRef = useRef(null);
  const [profilePhoto, setProfilePhoto] = useState("/images/default.png");
  const [feeStatus, setFeeStatus] = useState("Pending");
  const [shortlistStatus, setShortlistStatus] = useState("Not Shortlisted");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await authFetch("/api/students/profile_photo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data.profile_photo_path) {
            setProfilePhoto(data.profile_photo_path);
          }
        }
      } catch (error) {
        console.error("Error fetching profile photo:", error);
      }
    };

    fetchProfilePhoto();
  }, []);

  const handleProfilePhotoChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("profilePhoto", e.target.files[0]);

        const res = await authFetch("/api/students/me/edit", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (res.ok) {
          const updated = await res.json();
          setProfilePhoto(updated.profilePhotoPath);
          alert("Profile photo updated successfully!");
        } else {
          const err = await res.json();
          alert(err.detail || "Failed to update profile photo");
        }
      } catch (error) {
        console.error("Error updating profile photo:", error);
        alert("Error updating profile photo");
      }
    }
  };

  const handleFileChange = (e) => {
    alert("File uploaded: " + e.target.files[0]?.name);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="profile-photo-wrapper">
          <img
            src={profilePhoto}
            alt="Profile"
            className="profile-photo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/default.png";
            }}
          />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleProfilePhotoChange}
            id="profile-photo-upload"
          />
          <label htmlFor="profile-photo-upload" className="profile-photo-edit">
            ✎
          </label>
        </div>
        <button className="sidebar-btn" onClick={() => navigate('/candidate_profile')}>
          Profile Page
        </button>
        <button className="sidebar-btn">Shortlisting Status</button>
        <button className="sidebar-btn">Fee Payment</button>
        <button className="sidebar-btn">Upload Docs</button>
        <button className="sidebar-btn" onClick={() => navigate('/CandidatePreferences')}>
          Project Preferences
        </button>
        <button className="sidebar-btn" onClick={() => navigate('/')}>
          Logout
        </button>
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