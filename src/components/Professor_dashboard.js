import React, { useState, useEffect } from "react";
import "../css/Professor_dashboard.css";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/authFetch";

function Professor_dashboard() {
  const [activeTab, setActiveTab] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [no_of_interns, setNoOfInterns] = useState("");
  const [duration, setDuration] = useState("");
  const [mode, setMode] = useState("");
  const [prerequisites, setPrerequisites] = useState("NONE");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState("");
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [allottedStudents, setAllottedStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [dateInputs, setDateInputs] = useState({});
  const [projectReports, setProjectReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);

  // For editing
  const [editingId, setEditingId] = useState(null);
  const [editFields, setEditFields] = useState({
    title: "",
    description: "",
    no_of_interns: "",
    duration: "",
    mode: "",
    prerequisites: "",
  });

  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
  }, []);

  // Fetch projects when "view" tab is active or after edit/delete
  const fetchProjects = async () => {
    setLoadingProjects(true);
    setMessage("");
    const token = localStorage.getItem("access_token");
    if (!token) {
      setMessage("You must be logged in as a professor to view projects.");
      setLoadingProjects(false);
      return;
    }
    try {
      const res = await authFetch("/api/professors/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      } else {
        const err = await res.json();
        setMessage(err.detail || "Failed to fetch projects.");
      }
    } catch (error) {
      setMessage("Network error.");
    }
    setLoadingProjects(false);
  };

  // Fetch allotted students
  const fetchAllottedStudents = async () => {
    setLoadingStudents(true);
    setMessage("");
    const token = localStorage.getItem("access_token");
    if (!token) {
      setMessage("You must be logged in as a professor to view allotted students.");
      setLoadingStudents(false);
      return;
    }
    try {
      const res = await authFetch("/api/professors/allotted_student", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setAllottedStudents(data);
        // Initialize date inputs for each student
        const inputs = {};
        data.forEach(student => {
          inputs[student.sip_id] = {
            start_date: student.start_date || '',
            end_date: student.end_date || ''
          };
        });
        setDateInputs(inputs);
      } else {
        const err = await res.json();
        setMessage(err.detail || "Failed to fetch allotted students.");
      }
    } catch (error) {
      setMessage("Network error.");
    }
    setLoadingStudents(false);
  };

  // Fetch project reports
  const fetchProjectReports = async () => {
    setLoadingReports(true);
    setMessage("");
    const token = localStorage.getItem("access_token");
    if (!token) {
      setMessage("You must be logged in as a professor to view reports.");
      setLoadingReports(false);
      return;
    }
    try {
      const res = await authFetch("/api/professors/project_report", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setProjectReports(data);
      } else {
        const err = await res.json();
        setMessage(err.detail || "Failed to fetch project reports.");
      }
    } catch (error) {
      setMessage("Network error.");
    }
    setLoadingReports(false);
  };

  useEffect(() => {
    if (activeTab === "view") {
      fetchProjects();
    } else if (activeTab === "students") {
      fetchAllottedStudents();
    } else if (activeTab === "project_reports") {
      fetchProjectReports();
    }
    // eslint-disable-next-line
  }, [activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const token = localStorage.getItem("access_token");
    if (!token) {
      setMessage("You must be logged in as a professor to add a project.");
      return;
    }
    const data = {
      title,
      description,
      no_of_interns,
      duration,
      mode,
      prerequisites: prerequisites || "NONE",
    };
    try {
      const res = await authFetch("/api/professors/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setMessage("Project added successfully!");
        setTitle("");
        setDescription("");
        setNoOfInterns("");
        setDuration("");
        setMode("");
        setPrerequisites("");
      } else {
        const err = await res.json();
        setMessage(err.detail || "Failed to add project.");
      }
    } catch (error) {
      setMessage("Network error.");
    }
  };

  // Handle edit button click
  const handleEditClick = (project) => {
    setEditingId(project.id);
    setEditFields({
      title: project.title,
      description: project.description,
      no_of_interns: project.no_of_interns,
      duration: project.duration,
      mode: project.mode,
      prerequisites: project.prerequisites || "",
    });
  };

  // Handle edit form change
  const handleEditChange = (e) => {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  };

  // Handle edit form submit
  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    setMessage("");
    const token = localStorage.getItem("access_token");
    if (!token) {
      setMessage("You must be logged in as a professor to edit a project.");
      return;
    }
    try {
      const res = await authFetch(`/api/professors/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...editFields,
          prerequisites: editFields.prerequisites || "NONE",
        }),
      });
      if (res.ok) {
        setMessage("Project updated successfully!");
        setEditingId(null);
        fetchProjects();
      } else {
        const err = await res.json();
        setMessage(err.detail || "Failed to update project.");
      }
    } catch (error) {
      setMessage("Network error.");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    setMessage("");
    const token = localStorage.getItem("access_token");
    if (!token) {
      setMessage("You must be logged in as a professor to delete a project.");
      return;
    }
    try {
      const res = await authFetch(`/api/professors/project/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 204) {
        setMessage("Project deleted successfully!");
        fetchProjects();
      } else {
        const err = await res.json();
        setMessage(err.detail || "Failed to delete project.");
      }
    } catch (error) {
      setMessage("Network error.");
    }
  };

  // Handle date input change
  const handleDateChange = (sipId, field, value) => {
    setDateInputs(prev => ({
      ...prev,
      [sipId]: {
        ...prev[sipId],
        [field]: value
      }
    }));
  };

  // Set start date
  const handleSetStartDate = async (sipId) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setMessage("You must be logged in to perform this action.");
      return;
    }

    try {
      const res = await authFetch(`/api/professors/set_start_date/${sipId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: dateInputs[sipId]?.start_date
        }),
      });

      if (res.ok) {
        setMessage(`Start date set successfully for student ${sipId}`);
        fetchAllottedStudents(); // Refresh the list
      } else {
        const err = await res.json();
        setMessage(err.detail || "Failed to set start date.");
      }
    } catch (error) {
      setMessage("Network error.");
    }
  };

  // Set end date
  const handleSetEndDate = async (sipId) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setMessage("You must be logged in to perform this action.");
      return;
    }

    try {
      const res = await authFetch(`/api/professors/set_end_date/${sipId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: dateInputs[sipId]?.end_date
        }),
      });

      if (res.ok) {
        setMessage(`End date set successfully for student ${sipId}`);
        fetchAllottedStudents(); // Refresh the list
      } else {
        const err = await res.json();
        setMessage(err.detail || "Failed to set end date.");
      }
    } catch (error) {
      setMessage("Network error.");
    }
  };

  // Download project report handler
  const handleDownloadReport = async (sip_id, studentName) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setMessage("You must be logged in to download reports.");
      return;
    }
    try {
      const res = await fetch(`/api/project_report/${sip_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const err = await res.json();
        setMessage(err.detail || "Failed to download report.");
        return;
      }
      // Get filename from Content-Disposition header if available
      const disposition = res.headers.get("Content-Disposition");
      let filename = "project_report.pdf";
      if (disposition && disposition.indexOf("filename=") !== -1) {
        filename = disposition
          .split("filename=")[1]
          .replace(/['"]/g, "")
          .trim();
      } else if (studentName) {
        filename = `${studentName}_project_report.pdf`;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setMessage("Network error while downloading report.");
    }
  };

  // Confirm project report
  const handleConfirmReport = async (sip_id) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setMessage("You must be logged in to confirm reports.");
      return;
    }
    try {
      const res = await fetch(`/api/project_report/${sip_id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "Project report confirmed!");
        fetchProjectReports(); // Refresh the table
      } else {
        setMessage(data.detail || "Failed to confirm report.");
      }
    } catch (error) {
      setMessage("Network error while confirming report.");
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  if (!isAuthenticated) {
    return (
      <div className="dashboard-container">
        <h2>You must be logged in as a professor to access this page.</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <button className="sidebar-btn" onClick={() => setActiveTab("add")}>Add Project</button>
        <button className="sidebar-btn" onClick={() => setActiveTab("view")}>View Projects</button>
        <button className="sidebar-btn" onClick={() => setActiveTab("students")}>Allotted Students</button>
        <button className="sidebar-btn" onClick={() => setActiveTab("project_reports")}>
          Project Reports
        </button>
        <button className="sidebar-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-main">
        {activeTab === "add" && (
          <div className="add-project-form">
            <h2>Add Project</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Project Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Project Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Number of Interns"
                value={no_of_interns}
                onChange={(e) => setNoOfInterns(e.target.value)}
                required
              />
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                style={{ marginBottom: "14px", padding: "10px", borderRadius: "5px", border: "1.5px solid #bdbdbd", fontSize: "15px", width: "100%" }}
              >
                <option value="" disabled>
                  Select Duration
                </option>
                <option value="1 month">1 month</option>
                <option value="2 months">2 months</option>
              </select>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                required
                style={{ marginBottom: "14px", padding: "10px", borderRadius: "5px", border: "1.5px solid #bdbdbd", fontSize: "15px", width: "100%" }}
              >
                <option value="" disabled>
                  Select Mode
                </option>
                <option value="Remote">Remote</option>
                <option value="Onsite">Onsite</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              <input
                type="text"
                placeholder="Prerequisites (optional)"
                value={prerequisites}
                onChange={(e) => setPrerequisites(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
            {message && <p style={{ marginTop: "10px", color: "red" }}>{message}</p>}
          </div>
        )}

        {activeTab === "view" && (
          <div className="view-projects">
            <h2>Projects List</h2>
            {loadingProjects ? (
              <p>Loading...</p>
            ) : projects.length === 0 ? (
              <p>No projects found.</p>
            ) : (
              <ul>
                {projects.map((project) => (
                  <li key={project.id} style={{ marginBottom: "20px" }}>
                    {editingId === project.id ? (
                      <div className="edit-project-container">
                        <h3>Editing: {project.title}</h3>
                        <form onSubmit={(e) => handleEditSubmit(e, project.id)}>
                          <div className="form-group">
                            <label>Title:</label>
                            <input
                              type="text"
                              name="title"
                              value={editFields.title}
                              onChange={handleEditChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Description:</label>
                            <textarea
                              name="description"
                              value={editFields.description}
                              onChange={handleEditChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Number of Interns:</label>
                            <input
                              type="number"
                              name="no_of_interns"
                              value={editFields.no_of_interns}
                              onChange={handleEditChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Duration:</label>
                            <select
                              name="duration"
                              value={editFields.duration}
                              onChange={handleEditChange}
                              required
                            >
                              <option value="" disabled>Select Duration</option>
                              <option value="1 month">1 month</option>
                              <option value="2 months">2 months</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Mode:</label>
                            <select
                              name="mode"
                              value={editFields.mode}
                              onChange={handleEditChange}
                              required
                            >
                              <option value="" disabled>Select Mode</option>
                              <option value="Remote">Remote</option>
                              <option value="Onsite">Onsite</option>
                              <option value="Hybrid">Hybrid</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Prerequisites:</label>
                            <input
                              type="text"
                              name="prerequisites"
                              value={editFields.prerequisites}
                              onChange={handleEditChange}
                            />
                          </div>
                          <div className="edit-buttons">
                            <button type="submit">Save Changes</button>
                            <button type="button" onClick={() => setEditingId(null)}>
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <>
                        <strong>{project.title}</strong> - {project.description}
                        <br />
                        <span>
                          Interns: {project.no_of_interns} | Duration: {project.duration} |
                          Mode: {project.mode} | Prerequisites: {project.prerequisites || "NONE"}
                        </span>
                        <br />
                        <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                          <button
                            className="sidebar-btn"
                            style={{ width: "120px", marginTop: 0 }}
                            onClick={() => handleEditClick(project)}
                          >
                            Edit
                          </button>
                          <button
                            className="sidebar-btn"
                            style={{
                              width: "120px",
                              marginTop: 0,
                              background: "#d32f2f",
                              color: "#fff",
                              borderColor: "#d32f2f",
                            }}
                            onClick={() => handleDelete(project.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {message && <p style={{ marginTop: "10px", color: "red" }}>{message}</p>}
          </div>
        )}

        {activeTab === "students" && (
          <div className="allotted-students">
            <h2>Allotted Students</h2>
            {loadingStudents ? (
              <p>Loading...</p>
            ) : allottedStudents.length === 0 ? (
              <p>No students have been allotted to your projects yet.</p>
            ) : (
              <div className="students-table-container">
                <table className="students-table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>SIP ID</th>
                      <th>Project Title</th>
                      {/* <th>Department</th> */}
                      {/* <th>Contact</th> */}
                      <th>Start Date</th>
                      <th>End Date</th>
                      {allottedStudents.some(student => !student.start_date || !student.end_date) && (
                        <th className="actions-column">Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {allottedStudents.map((student) => {
                      const needsStartDate = !student.start_date;
                      const needsEndDate = student.start_date && !student.end_date;
                      const showActions = needsStartDate || needsEndDate;

                      return (
                        <tr key={student.sip_id}>
                          <td>{student.name}</td>
                          <td>{student.sip_id}</td>
                          <td>{student.project_title}</td>
                          {/* <td>{student.department}</td> */}
                          {/* <td>{student.email}</td> */}
                          <td>
                            {student.start_date
                              ? new Date(student.start_date).toLocaleDateString()
                              : showActions && (
                                <input
                                  type="date"
                                  className="date-input"
                                  value={dateInputs[student.sip_id]?.start_date || ''}
                                  onChange={(e) => handleDateChange(student.sip_id, 'start_date', e.target.value)}
                                />
                              )}
                          </td>
                          <td>
                            {student.end_date
                              ? new Date(student.end_date).toLocaleDateString()
                              : showActions && needsEndDate && (
                                <input
                                  type="date"
                                  className="date-input"
                                  value={dateInputs[student.sip_id]?.end_date || ''}
                                  onChange={(e) => handleDateChange(student.sip_id, 'end_date', e.target.value)}
                                />
                              )}
                          </td>
                          {showActions && (
                            <td className="actions-cell">
                              {needsStartDate && (
                                <button
                                  onClick={() => handleSetStartDate(student.sip_id)}
                                  className="date-btn"
                                >
                                  Set Start
                                </button>
                              )}
                              {needsEndDate && (
                                <button
                                  onClick={() => handleSetEndDate(student.sip_id)}
                                  className="date-btn"
                                >
                                  Set End
                                </button>
                              )}
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            {message && <p className="message">{message}</p>}
          </div>
        )}

        {activeTab === "project_reports" && (
          <div className="project-reports">
            <h2>All Project Reports</h2>
            {loadingReports ? (
              <p>Loading...</p>
            ) : projectReports.length === 0 ? (
              <p>No project reports submitted yet.</p>
            ) : (
              <div className="reports-table-container">
                <table className="students-table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>SIP ID</th>
                      <th>Project Title</th>
                      <th>Download Report</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectReports.map((student) => (
                      <tr key={student.sip_id}>
                        <td>{student.name}</td>
                        <td>{student.sip_id}</td>
                        <td>{student.project_title}</td>
                        <td>
                          <button
                            className="sidebar-btn"
                            style={{ width: "120px", marginTop: 0, background: "#1976d2", color: "#fff" }}
                            onClick={() => handleDownloadReport(student.sip_id, student.name)}
                          >
                            Download
                          </button>
                        </td>
                        <td>
                          {student.project_report_approval ? (
                            <span style={{ color: "green" }}>Confirmed</span>
                          ) : (
                            <button
                              className="sidebar-btn"
                              style={{ width: "120px", marginTop: 0, background: "#388e3c", color: "#fff" }}
                              onClick={() => handleConfirmReport(student.sip_id)}
                            >
                              Confirm
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {message && <p className="message">{message}</p>}
          </div>
        )}

        {!activeTab && (
          <div>
            <h2>Welcome to Professor Dashboard</h2>
            <p>Select an option from the left menu.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Professor_dashboard;