import React, { useState, useEffect } from "react";
import "../css/Candidate_dashboard.css"; // Using the provided CSS styles

function Admin_sip() {
  const [activeSection, setActiveSection] = useState("upload"); // Tracks the active section
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]); // Stores the list of students

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

      const response = await fetch("/api/admin/professors", {
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
      const response = await fetch("/api/admin/professors", {
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

  const fetchAllottedStudents = async () => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authorization token is missing. Please log in.");
        setLoading(false);
        return;
      }

      const response = await fetch(`/api/admin/department_data/1`, { // Replace `1` with the actual department ID
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to fetch students");
      }

      const data = await response.json();
      setStudents(data);
      setMessage("Students fetched successfully!");
    } catch (error) {
      console.error("Error fetching students:", error);
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAllotments = async () => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authorization token is missing. Please log in.");
        setLoading(false);
        return;
      }

      const response = await fetch(`/api/admin/department_data/1`, { // Replace `1` with the actual department ID
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "confirmed" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to confirm allotments");
      }

      const data = await response.json();
      setMessage(data.message || "Allotments confirmed successfully!");
    } catch (error) {
      console.error("Error confirming allotments:", error);
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeSection === "students") {
      fetchAllottedStudents();
    }
  }, [activeSection]);

  return (
    <div className="cd-container">
      {/* Sidebar */}
      <div className="cd-sidebar">
        <button
          className={`cd-btn ${activeSection === "upload" ? "active" : ""}`}
          onClick={() => setActiveSection("upload")}
        >
          <i className="fas fa-upload"></i>
          <span>Upload Professors</span>
        </button>
        <button
          className={`cd-btn ${activeSection === "download" ? "active" : ""}`}
          onClick={() => setActiveSection("download")}
        >
          <i className="fas fa-download"></i>
          <span>Download Professors</span>
        </button>
        <button
          className={`cd-btn ${activeSection === "generate" ? "active" : ""}`}
          onClick={() => setActiveSection("generate")}
        >
          <i className="fas fa-id-card"></i>
          <span>Generate ID Cards</span>
        </button>
        <button
          className={`cd-btn ${activeSection === "students" ? "active" : ""}`}
          onClick={() => setActiveSection("students")}
        >
          <i className="fas fa-users"></i>
          <span>View Allotted Students</span>
        </button>
        <button
          className={`cd-btn ${activeSection === "confirm" ? "active" : ""}`}
          onClick={() => setActiveSection("confirm")}
        >
          <i className="fas fa-check-circle"></i>
          <span>Confirm Allotments</span>
        </button>
        <button
          className="cd-btn"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login"; // Redirect to login page
          }}
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="cd-main-content">
        {activeSection === "upload" && (
          <div className="upload-section">
            <h1>Upload Professors</h1>
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
              }}
            >
              Upload File
            </button>
          </div>
        )}

        {activeSection === "download" && (
          <div className="download-section">
            <h1>Download Professors</h1>
            <button
              onClick={handleDownload}
              style={{
                padding: "10px 20px",
                backgroundColor: "#2ecc71",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Download Professors
            </button>
          </div>
        )}

        {activeSection === "generate" && (
          <div className="generate-section">
            <h1>Generate ID Cards</h1>
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
        )}

        {activeSection === "students" && (
          <div className="students-section">
            <h1>Allotted Students</h1>
            {students.length === 0 ? (
              <p>No students found.</p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Project</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Professor</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>{student.name}</td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>{student.email}</td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>{student.project}</td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>{student.professor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeSection === "confirm" && (
          <div className="confirm-section">
            <h1>Confirm Allotments</h1>
            <button
              onClick={handleConfirmAllotments}
              disabled={loading}
              style={{
                padding: "10px 20px",
                backgroundColor: "#f39c12",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {loading ? "Confirming..." : "Confirm Allotments"}
            </button>
          </div>
        )}

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}

export default Admin_sip;