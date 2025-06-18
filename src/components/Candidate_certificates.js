import React, { useState } from "react";
import "../css/Candidate_dashboard.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faList, faSignOutAlt, faHome, faDownload } from "@fortawesome/free-solid-svg-icons";
import "../css/Candidate_certificates.css"; // Assuming you have a CSS file for styling

function DownloadDocuments() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDownload = async (endpoint, filename) => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                setError("No authentication token found");
                return;
            }

            const response = await fetch(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.detail || "Failed to download document");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            setError(error.message || "Error downloading document");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="cd-container">
            {/* Sidebar */}
            <div className="cd-sidebar">
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

            {/* Main Content */}
            <div className="cd-main-content">
                <h1>Download Documents</h1>
                <p>Use the buttons below to download your offer letter and internship completion certificate.</p>

                {error && (
                    <div style={{ color: "red", marginBottom: "20px" }}>
                        {error}
                    </div>
                )}

                <button
                    className="download-btn offer-letter"
                    onClick={() => handleDownload("/api/students/offer_letter", "offer_letter.pdf")}
                    disabled={isLoading}
                >
                    <FontAwesomeIcon icon={faDownload} />
                    <span>Download Offer Letter</span>
                </button>

                <button
                    className="download-btn completion-cert"
                    onClick={() => handleDownload("/api/students/completion_certificate", "completion_certificate.pdf")}
                    disabled={isLoading}
                >
                    <FontAwesomeIcon icon={faDownload} />
                    <span>Download Completion Certificate</span>
                </button>
            </div>
        </div>
    );
}

export default DownloadDocuments;