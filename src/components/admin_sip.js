import React, { useState } from "react";
import "../css/admin_sip.css"; // Assuming you have a CSS file for styling
import { authFetch } from "../utils/authFetch"; // Assuming you have a utility for authenticated fetch

function Admin_sip() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleFileUpload = async () => {
    if (!file) {
      setMessage("Please select an Excel file to upload.");
      return;
    }
    setMessage("Uploading file to backend...");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("token");

      const response = await authFetch("/api/admin/professors", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Upload failed");
      }

      setMessage("File uploaded successfully!");
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    }
  };

  const handleDownload = async () => {
    setMessage("Downloading...");
    try {
      const token = localStorage.getItem("token");
      const response = await authFetch("/api/admin/professors", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "professors.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setMessage("Download started!");
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    }
  };

  const handleGenerateIDCards = async () => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authorization token is missing. Please log in.");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/admin/generate_id_card", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to generate ID cards");
      }

      const data = await response.json();
      setMessage(data.message || "ID cards generated successfully!");
    } catch (error) {
      console.error("Error generating ID cards:", error);
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-sip">
      <h1>Admin SIP - Professor Registration</h1>
      <div className="upload-section">
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileChange}
          style={{
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <button
          onClick={handleFileUpload}
          disabled={!file}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Upload File
        </button>
        <button
          onClick={handleDownload}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2ecc71",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Download Professors
        </button>
        <button
          onClick={handleGenerateIDCards}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Generating..." : "Generate ID Cards"}
        </button>
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Admin_sip;