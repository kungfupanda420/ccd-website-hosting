import React, { useState } from "react";
import '../css/admin_sip.css';

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

      const response = await fetch("/api/admin/make_proffesor", {
        method: "POST",
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
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Admin_sip;