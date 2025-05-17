import React, { useState } from "react";
import '../css/admin_sip.css'; // Assuming you have a CSS file for styling
function AdminSIP() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setMessage("Please select an Excel file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload-excel", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("File uploaded and data stored successfully!");
      } else {
        setMessage("Failed to upload file or store data.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("An error occurred while uploading the file.");
    }
  };

  return (
    <div className="admin-sip">
      <h1>Admin SIP - Upload Excel</h1>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
      />
      <button onClick={handleFileUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AdminSIP;