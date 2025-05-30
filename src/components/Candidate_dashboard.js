import React, { useState, useEffect } from "react";
import "../css/Candidate_dashboard.css";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/authFetch";

function CandidateDashboard() {
  const [profilePhoto, setProfilePhoto] = useState("/images/default.png");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
          if (data.profile_photo_path) {
            // Remove the leading '/' if present and add the base URL
            const cleanedPath = data.profile_photo_path.startsWith('/') 
              ? data.profile_photo_path.substring(1) 
              : data.profile_photo_path;
            
            // Use the correct base URL (adjust if your backend is hosted elsewhere)
            const fullUrl = `${window.location.origin}/${cleanedPath}`;
            
            // Add cache-busting parameter to force refresh
            setProfilePhoto(`${fullUrl}?${Date.now()}`);
          }
        } else if (res.status === 404) {
          console.log("Profile photo not found, using default");
          setProfilePhoto("/images/default.png");
        } else {
          const err = await res.json();
          setError(err.detail || "Failed to fetch profile photo");
        }
      } catch (error) {
        console.error("Error fetching profile photo:", error);
        setError("Error fetching profile photo");
        setProfilePhoto("/images/default.png");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfilePhoto();

    // Listen for profile updates from other components
    const handleStorageChange = () => {
      if (localStorage.getItem('profileUpdated')) {
        fetchProfilePhoto();
        localStorage.removeItem('profileUpdated');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="dashboard-container">
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

        <button 
          className="sidebar-btn" 
          onClick={() => navigate('/CandidatePreferences')}
          disabled={isLoading}
        >
          Project Preferences
        </button>

        <button 
          className="sidebar-btn" 
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/');
          }}
          disabled={isLoading}
        >
          Logout
        </button>
      </div>

      <div className="dashboard-main">
        <h1>Candidate Dashboard</h1>
        {error && <div className="error-message">{error}</div>}
        {isLoading ? (
          <div className="loading-indicator">Loading dashboard...</div>
        ) : (
          <p>Welcome to the candidate dashboard!</p>
        )}
      </div>
    </div>
  );
}

export default CandidateDashboard;