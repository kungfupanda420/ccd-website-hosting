import React, { useState, useEffect } from "react";
import "../css/Candidate_dashboard.css";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/authFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faList,
  faSignOutAlt,
  faHome,
  faFileUpload,
  faUpload,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
function CandidateProjectReport() {
  const [profilePhoto, setProfilePhoto] = useState("/images/default.png");
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
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
            setProfilePhoto(`${fullUrl}?${Date.now()}`);
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadMsg("");
    setError(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadMsg("");
    setError(null);

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("project_report", file);

      const token = localStorage.getItem("access_token");
      const res = await fetch("/api/students/project_report", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setUploadMsg(data.message || "Report uploaded successfully!");
        setFile(null);
      } else {
        setError(data.detail || "Failed to upload report.");
      }
    } catch (err) {
      setError("Failed to upload report.");
    }
    setUploading(false);
  };

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
            </>
          )}
        </div>

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
        <h1>Upload Project Report</h1>
        <form onSubmit={handleUpload} className="upload-form">
          <div className="form-group">
            <label htmlFor="projectReport" className="file-upload-label">
              <FontAwesomeIcon icon={faFileUpload} className="upload-icon" />
              <span>{file ? file.name : "Choose Project Report (PDF, DOC, DOCX)"}</span>
              <input
                id="projectReport"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                disabled={uploading}
                className="file-input"
                required
              />
            </label>
          </div>

          <button
            type="submit"
            className="upload-btn"
            disabled={uploading || !file}
          >
            {uploading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faUpload} />
                <span>Upload Report</span>
              </>
            )}
          </button>

          {uploadMsg && <div className="success-message">{uploadMsg}</div>}
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default CandidateProjectReport;