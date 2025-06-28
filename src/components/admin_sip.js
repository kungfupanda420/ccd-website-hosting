import React, { useState, useEffect } from "react";
import "../css/Candidate_dashboard.css";
import Proffessor_admin from "./Professor_admin";

function ConfirmModal({ title, message, confirmText, onConfirm, onCancel, isLoading }) {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        width: "400px",
        maxWidth: "90%"
      }}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button
            onClick={onCancel}
            disabled={isLoading}
            style={{
              padding: "8px 16px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              opacity: isLoading ? 0.7 : 1
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            style={{
              padding: "8px 16px",
              backgroundColor: confirmText.toLowerCase().includes("reject") ? "#e74c3c" : "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

function PasswordModal({ title, onConfirm, onCancel, password, setPassword, isLoading }) {
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        width: "400px",
        maxWidth: "90%"
      }}>
        <h3>Confirm Password to {title}</h3>
        <input
          ref={inputRef}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "4px",
            border: "1px solid #ddd",
            outline: "none"
          }}
          autoFocus
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button
            onClick={onCancel}
            style={{
              padding: "8px 16px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading || !password}
            style={{
              padding: "8px 16px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              opacity: isLoading || !password ? 0.7 : 1
            }}
          >
            {isLoading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Admin_sip() {
  const [activeSection, setActiveSection] = useState("professors");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [deptStudents, setDeptStudents] = useState([]);
  const [roundDetails, setRoundDetails] = useState({
    number: 0,
    allow_reg: false,
    lock_choices: false
  });
  const [isUpdatingRound, setIsUpdatingRound] = useState(false);
  const [showStartRoundModal, setShowStartRoundModal] = useState(false);
  const [showStopRegModal, setShowStopRegModal] = useState(false);
  const [showLockChoicesModal, setShowLockChoicesModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    confirmText: "",
    onConfirm: () => { }
  });

  // Function to show confirmation modal
  const showConfirmation = (title, message, confirmText, onConfirmAction) => {
    setModalConfig({
      title,
      message,
      confirmText,
      onConfirm: () => {
        onConfirmAction();
        setShowConfirmModal(false);
      }
    });
    setShowConfirmModal(true);
  };

  // Fetch departments for dropdown
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
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

  // Fetch current round details
  const fetchRoundDetails = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("/api/admin/round_details", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to fetch round details");
      }
      const data = await response.json();
      setRoundDetails(data);
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Start a new round with password
  const handleStartRound = async () => {
    if (!password) {
      setMessage("Please enter password");
      return;
    }

    setIsUpdatingRound(true);
    setMessage("");
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("/api/admin/start_next_round", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          round_number: roundDetails.number + 1
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to start round");
      }

      const data = await response.json();
      setMessage(data.message || `Round ${roundDetails.number + 1} started successfully!`);
      setShowStartRoundModal(false);
      setPassword("");
      fetchRoundDetails();
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setIsUpdatingRound(false);
    }
  };

  // Stop registrations with password
  const handleStopRegistrations = async () => {
    if (!password) {
      setMessage("Please enter password");
      return;
    }

    setIsUpdatingRound(true);
    setMessage("");
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("/api/admin/stop_registrations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to stop registrations");
      }

      const data = await response.json();
      setMessage("Registrations stopped successfully!");
      setShowStopRegModal(false);
      setPassword("");
      fetchRoundDetails();
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setIsUpdatingRound(false);
    }
  };

  // Lock choices with password
  const handleLockChoices = async () => {
    if (!password) {
      setMessage("Please enter password");
      return;
    }

    setIsUpdatingRound(true);
    setMessage("");
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("/api/admin/lock_choices", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to lock choices");
      }

      const data = await response.json();
      setMessage("Choices locked successfully!");
      setShowLockChoicesModal(false);
      setPassword("");
      fetchRoundDetails();
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setIsUpdatingRound(false);
    }
  };

  // Fetch students for a department
  const fetchDeptStudents = async (deptId) => {
    setLoading(true);
    setDeptStudents([]);
    try {
      const token = localStorage.getItem("access_token");
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
      const token = localStorage.getItem("access_token");
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

    showConfirmation(
      "Confirm All Students",
      "Are you sure you want to confirm all students in this department?",
      "Confirm All",
      async () => {
        setLoading(true);
        setMessage("");
        try {
          const token = localStorage.getItem("access_token");
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
      }
    );
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

      const token = localStorage.getItem("access_token");

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

    showConfirmation(
      "Reject All Students",
      "Are you sure you want to reject all students in this department? This action cannot be undone.",
      "Reject All",
      async () => {
        setLoading(true);
        setMessage("");
        try {
          const token = localStorage.getItem("access_token");
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
      }
    );
  };

  // Download professors
  const handleDownload = async () => {
    setMessage("Downloading...");
    try {
      const token = localStorage.getItem("access_token");
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
    showConfirmation(
      "Generate ID Cards",
      "Are you sure you want to generate ID cards for all students?",
      "Generate ID Cards",
      async () => {
        setLoading(true);
        setMessage("");

        try {
          const token = localStorage.getItem("access_token");
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
      }
    );
  };
  
  // Handle email sending
  const handleSendEmail = async () => {
    showConfirmation(
      "Send Emails to Professors",
      "Are you sure you want to send notification emails to all professors?",
      "Send Emails",
      async () => {
        setLoading(true);
        setMessage("");
        try {
          const token = localStorage.getItem("access_token");
          const response = await fetch("/api/admin/send_professor_emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Failed to send emails");
          }

          const data = await response.json();
          setMessage(data.message || "Notification emails sent successfully!");
        } catch (error) {
          setMessage(`An error occurred: ${error.message}`);
        } finally {
          setLoading(false);
        }
      }
    );
  };

  // Fetch data when sections are opened
  useEffect(() => {
    if (activeSection === "confirm") {
      fetchDepartments();
      setSelectedDept("");
      setDeptStudents([]);
    }
    if (activeSection === "rounds") {
      fetchRoundDetails();
    }
  }, [activeSection]);

  return (
    <div className="cd-container">
      {/* Sidebar */}
      <div className="cd-sidebar">
        <button
          className={`cd-btn ${activeSection === "professors" ? "active" : ""}`}
          onClick={() => setActiveSection("professors")}
        >
          <i className="fas fa-user-tie"></i>
          <span>Professors</span>
        </button>
        <button
          className={`cd-btn ${activeSection === "generate" ? "active" : ""}`}
          onClick={() => setActiveSection("generate")}
        >
          <i className="fas fa-id-card"></i>
          <span> ID Cards</span>
        </button>
        <button
          className={`cd-btn ${activeSection === "confirm" ? "active" : ""}`}
          onClick={() => setActiveSection("confirm")}
        >
          <i className="fas fa-check-circle"></i>
          <span> Allotments</span>
        </button>
        <button
          className={`cd-btn ${activeSection === "rounds" ? "active" : ""}`}
          onClick={() => setActiveSection("rounds")}
        >
          <i className="fas fa-sync-alt"></i>
          <span>Manage Rounds</span>
        </button>
        <button
          className={`cd-btn ${activeSection === "admin_professors" ? "active" : ""}`}
          onClick={() => setActiveSection("admin_professors")}
        >
          admin professors
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
        {activeSection === "professors" && (
          <div className="professors-section">
            <h1>Professors Management</h1>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "20px",
              marginBottom: "20px"
            }}>
              <div style={{
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column"
              }}>
                <h2>Upload Professors</h2>
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
                    width: "100%",
                    marginTop: "auto"
                  }}
                >
                  {loading ? "Uploading..." : "Upload File"}
                </button>
              </div>

              <div style={{
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column"
              }}>
                <h2>Download Professors</h2>
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
                    width: "100%",
                    marginTop: "auto"
                  }}
                >
                  {loading ? "Preparing..." : "Download Professors"}
                </button>
              </div>

              <div style={{
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column"
              }}>
                <h2>Send Emails to professors</h2>
                <button
                  onClick={handleSendEmail}
                  disabled={loading}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#f39c12",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    width: "100%",
                    marginTop: "auto"
                  }}
                >
                  {loading ? "Sending..." : "Send Emails"}
                </button>

              </div>
            </div>
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
                  <div>
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
                        marginRight: "10px"
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
                          <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Project</th>
                          <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Professor</th>
                          <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Status</th>
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
                              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {project.title}
                              </td>
                              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {project.professor.name}
                              </td>
                              <td style={{
                                border: "1px solid #ddd",
                                padding: "8px",
                                textAlign: "center",
                                color: student.admin_conf ? "green" : "red"
                              }}>
                                {student.admin_conf ? "Confirmed" : "Not Confirmed"}
                              </td>
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

        {activeSection === "rounds" && roundDetails.number < 4 && (
          <div className="rounds-section">
            <h1>Round Management</h1>

            <div style={{
              marginBottom: "20px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              backgroundColor: "#f9f9f9"
            }}>
              <h2>Current Round: {roundDetails.number > 0 ? roundDetails.number : "Not started"}</h2>

              {roundDetails.number === 0 ? (
                <div style={{ marginTop: "20px" }}>
                  <button
                    onClick={() => setShowStartRoundModal(true)}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#27ae60",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    Start Round 1
                  </button>
                </div>
              ) : (
                <div style={{ marginTop: "20px" }}>
                  {/* Registration Control - Only show in odd rounds (1, 3, etc.) */}
                  {roundDetails.number % 2 === 1 && (
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px",
                      padding: "15px",
                      backgroundColor: "#fff",
                      borderRadius: "4px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}>
                      <div>
                        <h3 style={{ margin: "0 0 5px 0" }}>Registration</h3>
                        <p style={{ margin: "0", color: "#666" }}>
                          Status: {roundDetails.allow_reg ? (
                            <span style={{ color: "green", fontWeight: "bold" }}>OPEN</span>
                          ) : (
                            <span style={{ color: "red", fontWeight: "bold" }}>CLOSED</span>
                          )}
                        </p>
                      </div>
                      {roundDetails.allow_reg && (
                        <button
                          onClick={() => setShowStopRegModal(true)}
                          disabled={isUpdatingRound}
                          style={{
                            padding: "8px 16px",
                            backgroundColor: "#e74c3c",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "bold"
                          }}
                        >
                          Stop Registration
                        </button>
                      )}
                    </div>
                  )}

                  {/* Choice Locking Control - Show in all rounds except when registration is open */}
                  {(!roundDetails.allow_reg || roundDetails.number % 2 === 0) && (
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "15px",
                      backgroundColor: "#fff",
                      borderRadius: "4px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}>
                      <div>
                        <h3 style={{ margin: "0 0 5px 0" }}>Choice Locking</h3>
                        <p style={{ margin: "0", color: "#666" }}>
                          Status: {roundDetails.lock_choices ? (
                            <span style={{ color: "red", fontWeight: "bold" }}>LOCKED</span>
                          ) : (
                            <span style={{ color: "green", fontWeight: "bold" }}>UNLOCKED</span>
                          )}
                        </p>
                      </div>
                      {!roundDetails.lock_choices && (
                        <button
                          onClick={() => setShowLockChoicesModal(true)}
                          disabled={isUpdatingRound}
                          style={{
                            padding: "8px 16px",
                            backgroundColor: "#e74c3c",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "bold"
                          }}
                        >
                          Lock Choices
                        </button>
                      )}
                    </div>
                  )}

                  {/* Next Round Button - Show when appropriate */}
                  {(roundDetails.number % 2 === 0 ||
                    (roundDetails.number % 2 === 1 && !roundDetails.allow_reg && roundDetails.lock_choices || roundDetails.number < 3 && (roundDetails.number == 2 && roundDetails.lock_choices))) && !(roundDetails.number === 3 && roundDetails.lock_choices) && (
                      <div style={{ marginTop: "20px", textAlign: "center" }}>
                        <button
                          onClick={() => setShowStartRoundModal(true)}
                          disabled={isUpdatingRound}
                          style={{
                            padding: "10px 20px",
                            backgroundColor: "#3498db",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "16px"
                          }}
                        >
                          Start Round {roundDetails.number + 1}
                        </button>
                      </div>
                    )}
                  {(roundDetails.number === 3 && roundDetails.lock_choices) && (
                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                      <button
                        onClick={() => setShowStartRoundModal(true)}
                        disabled={isUpdatingRound}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#3498db",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "16px"
                        }}>Finish rounds</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Start Round Modal */}
            {showStartRoundModal && (
              <PasswordModal
                title={`Start Round ${roundDetails.number + 1}`}
                onConfirm={handleStartRound}
                onCancel={() => {
                  setShowStartRoundModal(false);
                  setPassword("");
                }}
                password={password}
                setPassword={setPassword}
                isLoading={isUpdatingRound}
              />
            )}

            {/* Stop Registration Modal */}
            {showStopRegModal && (
              <PasswordModal
                title="Stop Registrations"
                onConfirm={handleStopRegistrations}
                onCancel={() => {
                  setShowStopRegModal(false);
                  setPassword("");
                }}
                password={password}
                setPassword={setPassword}
                isLoading={isUpdatingRound}
              />
            )}

            {/* Lock Choices Modal */}
            {showLockChoicesModal && (
              <PasswordModal
                title="Lock Choices"
                onConfirm={handleLockChoices}
                onCancel={() => {
                  setShowLockChoicesModal(false);
                  setPassword("");
                }}
                password={password}
                setPassword={setPassword}
                isLoading={isUpdatingRound}
              />
            )}

            {message && (
              <div style={{
                marginTop: "20px",
                padding: "10px",
                borderRadius: "4px",
                backgroundColor: message.includes("success") ? "#d4edda" : "#f8d7da",
                color: message.includes("success") ? "#155724" : "#721c24",
                border: `1px solid ${message.includes("success") ? "#c3e6cb" : "#f5c6cb"}`,
              }}>
                {message}
              </div>
            )}
          </div>
        )}

        {activeSection === "admin_professors" && <Proffessor_admin />}
      </div>

      {/* Confirmation Modal */}
      {
        showConfirmModal && (
          <ConfirmModal
            title={modalConfig.title}
            message={modalConfig.message}
            confirmText={modalConfig.confirmText}
            onConfirm={modalConfig.onConfirm}
            onCancel={() => setShowConfirmModal(false)}
            isLoading={loading}
          />
        )
      }
    </div >
  );
}

export default Admin_sip;