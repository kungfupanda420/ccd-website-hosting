import React, { useState } from "react";
import '../css/admin_sip.css';
import {authFetch} from "../utils/authFetch"; // Assuming you have a utility for authenticated fetch

function Admin_sip() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

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

      const token = localStorage.getItem('token');

      const response = await authFetch("/api/admin/makeProfessor", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
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

  // Download professors CSV
  const handleDownload = async () => {
    setMessage("Downloading...");
    try {
      const token = localStorage.getItem('token');
      const response = await authFetch("/api/admin/exportProfessors", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
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

  return (
    <div className="admin-sip">
      <h1>Admin SIP - Professor Registration</h1>
      <div className="upload-section">
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileChange}
        />
        <button onClick={handleFileUpload} disabled={!file}>
          Upload File
        </button>
        <button onClick={handleDownload} style={{ marginLeft: "10px" }}>
          Download Professors
        </button>
      </div>
      {message && <div className="message">{message}</div>}
      <div className="export professor"></div>
    </div>
  );
}

export default Admin_sip;