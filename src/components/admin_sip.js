import React, { useState, useEffect } from "react";
import "../css/Candidate_dashboard.css";

function Admin_sip() {
  const [activeSection, setActiveSection] = useState("upload");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [deptStudents, setDeptStudents] = useState([]);

  // Fetch departments for dropdown
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/admin/departments", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to fetch departments");
      }
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch students for a department
  const fetchDeptStudents = async (deptId) => {
    setLoading(true);
    setDeptStudents([]);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/admin/department_data/${deptId}`, {
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
      setDeptStudents(data);
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Confirm individual student allotment
  const handleConfirmStudent = async (studentId) => {
    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/admin/confirm_student/${studentId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "confirmed" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to confirm student");
      }

      const data = await response.json();
      setMessage(data.message || "Student confirmed successfully!");

      // Refresh students after confirmation
      if (selectedDept) {
        fetchDeptStudents(selectedDept);
      }
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Confirm all students in a department
  const handleConfirmAllStudents = async () => {
  if (!selectedDept) {
    setMessage("Please select a department first.");
    return;
  }

  setLoading(true);
  setMessage("");
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/admin/department_data/${selectedDept}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "confirmed" }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to confirm all students");
    }

    const data = await response.json();
    setMessage(data.message || "All students confirmed successfully!");

    // Refresh students after confirmation
    fetchDeptStudents(selectedDept);
  } catch (error) {
    setMessage(`An error occurred: ${error.message}`);
  } finally {
    setLoading(false);
  }
};
  // Handle department selection change
  const handleDeptChange = (e) => {
    const deptId = e.target.value;
    setSelectedDept(deptId);
    if (deptId) {
      fetchDeptStudents(deptId);
    } else {
      setDeptStudents([]);
    }
    setMessage("");
  };

  // File upload functions
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
const handleRejectAllStudents = async () => {
    if (!selectedDept) {
      setMessage("Please select a department first.");
      return;
    }

    const confirmReject = window.confirm("Are you sure you want to reject all allotments for this department?");
    if (!confirmReject) return;

    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/admin/department_data/${selectedDept}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "rejected" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to reject all students");
      }

      const data = await response.json();
      setMessage(data.message || "All students rejected successfully!");

      // Refresh students after rejection
      fetchDeptStudents(selectedDept);
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  // Download professors
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

  // Generate ID cards
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
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all allotted students
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

      const response = await fetch(`/api/admin/department_data/1`, {
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
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch departments when Confirm section is opened
  useEffect(() => {
    if (activeSection === "confirm") {
      fetchDepartments();
      setSelectedDept("");
      setDeptStudents([]);
    }
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
            window.location.href = "/login";
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
                width: "100%",
                maxWidth: "400px",
              }}
            />
            <button
              onClick={handleFileUpload}
              disabled={!file || loading}
              style={{
                padding: "10px 20px",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {loading ? "Uploading..." : "Upload File"}
            </button>
          </div>
        )}

        {activeSection === "download" && (
          <div className="download-section">
            <h1>Download Professors</h1>
            <button
              onClick={handleDownload}
              disabled={loading}
              style={{
                padding: "10px 20px",
                backgroundColor: "#2ecc71",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {loading ? "Preparing..." : "Download Professors"}
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
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f2f2f2" }}>
                      <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Name</th>
                      {/* <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Email</th> */}
                      <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Project</th>
                      <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Professor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{student.name}</td>
                        {/* <td style={{ border: "1px solid #ddd", padding: "8px" }}>{student.email}</td> */}
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{student.project}</td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{student.professor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeSection === "confirm" && (
          <div className="confirm-section">
            <h1>Confirm Allotments</h1>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="dept-select" style={{ marginRight: "10px" }}>
                Select Department:
              </label>
              <select
                id="dept-select"
                value={selectedDept}
                onChange={handleDeptChange}
                style={{
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  minWidth: "200px",
                }}
                disabled={loading}
              >
                <option value="">-- Select Department --</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            {selectedDept && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h2>Allotted Students</h2>



                  <button
                onClick={handleRejectAllStudents}
                disabled={loading || deptStudents.length === 0}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  // marginRight: "10px"
                }}
              >
                {loading ? "Processing..." : "Reject All"}
              </button>
                  <button
                    onClick={handleConfirmAllStudents}
                    disabled={loading || deptStudents.length === 0}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#27ae60",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                  
                    {loading ? "Processing..." : "Confirm All Students"}
                  </button>
                </div>
                {deptStudents.length === 0 ? (
                  <p>No students found for this department.</p>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#f2f2f2" }}>
                          <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>SIP ID</th>
                          <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Name</th>
                          {/* <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Email</th> */}
                          <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Project</th>
                          <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Professor</th>
                          {/* <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Status</th> */}
                          {/* <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {deptStudents.map((project) =>
                          project.selected_students.map((student) => (
                            <tr key={student.sip_id}>
                              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {student.sip_id}
                              </td>
                              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {student.name}
                              </td>
                              {/* <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {student.email}
                              </td> */}
                              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {project.title}
                              </td>
                              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {project.professor.name}
                              </td>
                              {/* <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {student.is_confirmed ? (
                                  <span style={{ color: "green" }}>Confirmed</span>
                                ) : (
                                  <span style={{ color: "orange" }}>Pending</span>
                                )}
                              </td> */}
                              {/* <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {!student.is_confirmed && (
                                  <button
                                    onClick={() => handleConfirmStudent(student.sip_id)}
                                    disabled={loading}
                                    style={{
                                      padding: "5px 10px",
                                      backgroundColor: "#27ae60",
                                      color: "white",
                                      border: "none",
                                      borderRadius: "4px",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Confirm
                                  </button>
                                )}
                              </td> */}
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {message && (
          <div 
            className="message" 
            style={{
              marginTop: "20px",
              padding: "10px",
              borderRadius: "4px",
              backgroundColor: message.includes("success") ? "#d4edda" : "#f8d7da",
              color: message.includes("success") ? "#155724" : "#721c24",
              border: `1px solid ${message.includes("success") ? "#c3e6cb" : "#f5c6cb"}`,
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin_sip;