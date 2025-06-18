import React, { useState, useEffect } from "react";
import "../css/Candidate_dashboard.css";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/authFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faList, 
  faSignOutAlt,
  faHome
} from "@fortawesome/free-solid-svg-icons";

function CandidateDashboard() {
  const [profilePhoto, setProfilePhoto] = useState("/images/default.png");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com"
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("access_token");
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
            const cleanedPath = data.profile_photo_path.startsWith("/")
              ? data.profile_photo_path.substring(1)
              : data.profile_photo_path;

            const fullUrl = `${window.location.origin}/${cleanedPath}`;
            console.log("Full URL for profile photo:", fullUrl);
            setProfilePhoto(`${fullUrl}?${Date.now()}`);
          }
          // Update user data if available
          if (data.name || data.email) {
            setUserData({
              name: data.name || userData.name,
              email: data.email || userData.email
            });
          }
        } else if (res.status === 404) {
          setProfilePhoto("/images/default.png");
        } else {
          const err = await res.json();
          setError(err.detail || "Failed to fetch profile photo");
        }
      } catch (error) {
        setError("Error fetching profile photo");
        setProfilePhoto("/images/default.png");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfilePhoto();

    const handleStorageChange = () => {
      if (localStorage.getItem("profileUpdated")) {
        fetchProfilePhoto();
        localStorage.removeItem("profileUpdated");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="cd-container">
      <div className="cd-sidebar">
        <div className="cd-profile-wrapper">
          {isLoading ? (
            <div className="cd-photo-loading">Loading...</div>
          ) : (
            <>
              <img
                src={profilePhoto}
                alt="Profile"
                className="cd-photo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/default.png";
                }}
              />
              {/* <h3>{userData.name}</h3>
              <p>{userData.email}</p> */}
            </>
          )}
        </div>

        {/* <button 
          className="cd-btn" 
          onClick={() => navigate("/dashboard")}
        >
          <FontAwesomeIcon icon={faHome}/>
          <span>Dashboard</span>
        </button> */}

        <button 
          className="cd-btn" 
          onClick={() => navigate("/candidate_profile")}
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faUser} />
          <span>Profile Page</span>
        </button>

        <button 
          className="cd-btn" 
          onClick={() => navigate("/CandidatePreferences")}
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faList} />
          <span>Project Preferences</span>
        </button>

        <button 
          className="cd-btn" 
          onClick={() => {
            localStorage.removeItem("access_token");
            navigate("/");
          }}
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Logout</span>
        </button>
      </div>
      
      <div className="cd-main-content">
        <h1>Welcome candidate!</h1>
        <p>This is your candidate dashboard. Use the sidebar to navigate.</p>
        
      
      </div>
    </div>
  );
}

export default CandidateDashboard;