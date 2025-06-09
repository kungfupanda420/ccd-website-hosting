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
  const [prerequisites, setPrerequisites] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState("");
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

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
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Fetch projects when "view" tab is active or after edit/delete
  const fetchProjects = async () => {
    setLoadingProjects(true);
    setMessage("");
    const token = localStorage.getItem("token");
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

  useEffect(() => {
    if (activeTab === "view") {
      fetchProjects();
    }
    // eslint-disable-next-line
  }, [activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in as a professor to add a project.");
      return;
    }
    const data = {
      title,
      description,
      // no_of_interns,
      duration,
      mode,
      prerequisites,
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
      // no_of_interns: project.no_of_interns,
      duration: project.duration,
      mode: project.mode,
      prerequisites: project.prerequisites,
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
    const token = localStorage.getItem("token");
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
        body: JSON.stringify(editFields),
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
    const token = localStorage.getItem("token");
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

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
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
              {/* <input
                type="number"
                placeholder="Number of Interns"
                // value={no_of_interns}
                onChange={(e) => setNoOfInterns(e.target.value)}
                required
              /> */}
              {/* Duration dropdown */}
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
              {/* Mode dropdown */}
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
                placeholder="Prerequisites"
                value={prerequisites}
                onChange={(e) => setPrerequisites(e.target.value)}
                required
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
                      <form onSubmit={(e) => handleEditSubmit(e, project.id)}>
                        <input
                          type="text"
                          name="title"
                          value={editFields.title}
                          onChange={handleEditChange}
                          required
                        />
                        <textarea
                          name="description"
                          value={editFields.description}
                          onChange={handleEditChange}
                          required
                        />
                        {/* <input
                          type="number"
                          name="no_of_interns"
                          value={editFields.no_of_interns}
                          onChange={handleEditChange}
                          required
                        /> */}
                        {/* Duration dropdown */}
                        <select
                          name="duration"
                          value={editFields.duration}
                          onChange={handleEditChange}
                          required
                          style={{ marginBottom: "14px", padding: "10px", borderRadius: "5px", border: "1.5px solid #bdbdbd", fontSize: "15px", width: "100%" }}
                        >
                          <option value="" disabled>
                            Select Duration
                          </option>
                          <option value="1 month">1 month</option>
                          <option value="2 months">2 months</option>
                        </select>
                        {/* Mode dropdown */}
                        <select
                          name="mode"
                          value={editFields.mode}
                          onChange={handleEditChange}
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
                          name="prerequisites"
                          value={editFields.prerequisites}
                          onChange={handleEditChange}
                          required
                        />
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setEditingId(null)}>
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <>
                        <strong>{project.title}</strong> - {project.description}
                        {/* <br />
                        <span>
                          Interns: {project.no_of_interns} | Duration: {project.duration} | Mode: {project.mode} | Prerequisites: {project.prerequisites}
                        </span>
                        <br /> */}
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
        {!activeTab && (
          <div >
            <h2>Welcome to Professor Dashboard</h2>
            <p>Select an option from the left menu.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Professor_dashboard;