import React, { useRef, useState, useEffect } from "react";
import "../css/Candidate_dashboard.css";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/authFetch";

function CandidateDashboard() {
  const fileInputRef = useRef(null);
  const [profilePhoto, setProfilePhoto] = useState("/images/default.png");
  const [feeStatus, setFeeStatus] = useState("Pending");
  // const [shortlistStatus, setShortlistStatus] = useState("Not Shortlisted");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch profile photo on component mount
  useEffect(() => {
    const fetchProfilePhoto = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found");
          return;
        }

        const res = await authFetch("/api/students/profile_photo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data.profile_photo_url) {
            // Construct full URL to the image
            const fullUrl = `http://localhost:8000${data.profile_photo_url}`;
            setProfilePhoto(fullUrl);
          }
        } else if (res.status === 404) {
          console.log("Profile photo not found, using default");
        } else {
          const err = await res.json();
          setError(err.detail || "Failed to fetch profile photo");
        }
      } catch (error) {
        console.error("Error fetching profile photo:", error);
        setError("Error fetching profile photo");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfilePhoto();
  }, []);

  // Handle profile photo upload
  const handleProfilePhotoChange = async (e) => {
    if (!e.target.files || !e.target.files[0]) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        return;
      }

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
        // Construct new URL for the updated photo
        const newPhotoUrl = `http://localhost:8000/uploads/profilePhotos/${updated.profilePhotoPath.split('/').pop()}`;
        setProfilePhoto(newPhotoUrl);
        alert("Profile photo updated successfully!");
      } else {
        const err = await res.json();
        setError(err.detail || "Failed to update profile photo");
        alert(err.detail || "Failed to update profile photo");
      }
    } catch (error) {
      console.error("Error updating profile photo:", error);
      setError("Error updating profile photo");
      alert("Error updating profile photo");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle general file uploads
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      alert("File uploaded: " + e.target.files[0].name);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="profile-photo-wrapper">
          {isLoading ? (
            <div className="profile-photo-loading">Loading...</div>
          ) : (
            <img
              src={profilePhoto}
              alt="Profile"
              className="profile-photo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/default.png";
              }}
            />
          )}
          
          
        </div>

        <button 
          className="sidebar-btn" 
          onClick={() => navigate('/candidate_profile')}
          disabled={isLoading}
        >
          Profile Page
        </button>
        {/* <button className="sidebar-btn" disabled={isLoading}>
          Shortlisting Status
        </button> */}
        <button className="sidebar-btn" disabled={isLoading}>
          Fee Payment
        </button>
        <button className="sidebar-btn" disabled={isLoading}>
          Upload Docs
        </button>
        <button 
          className="sidebar-btn" 
          onClick={() => navigate('/CandidatePreferences')}
          disabled={isLoading}
        >
          Project Preferences
        </button>
        <button 
          className="sidebar-btn" 
          onClick={() => navigate('/')}
          disabled={isLoading}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <h1>Candidate Dashboard</h1>
        {error && <div className="error-message">{error}</div>}
        
        {isLoading ? (
          <div className="loading-indicator">Loading dashboard...</div>
        ) : (
          <>
            <p>Welcome to the candidate dashboard!</p>

            <div className="status-section">
              {/* <h3>
                Shortlisting Status:{" "}
                <span className="shortlist-status">{shortlistStatus}</span>
              </h3> */}
              <h3>
                Fee Payment Status:{" "}
                <span className={feeStatus === "Paid" ? "fee-paid" : "fee-pending"}>
                  {feeStatus}
                </span>
              </h3>
            </div>

            <div className="upload-section">
              <h3>Upload Files / Documents</h3>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                disabled={isLoading}
              />
              <p className="upload-hint">Supported formats: PDF, JPG, PNG</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CandidateDashboard;