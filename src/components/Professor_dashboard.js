import React, { useState, useEffect } from "react";
import "../css/Professor_dashboard.css";

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

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Fetch projects when "view" tab is active
  useEffect(() => {
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
        const res = await fetch("/api/professors/myProjects", {
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

    if (activeTab === "view") {
      fetchProjects();
    }
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
      no_of_interns,
      duration,
      mode,
      prerequisites,
    };
    try {
      const res = await fetch("/api/professors/makeProject", {
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

  if (!isAuthenticated) {
    return (
      <div className="dashboard-container">
        <h2>You must be logged in as a professor to access this page.</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <button onClick={() => setActiveTab("add")}>Add Project</button>
      <button onClick={() => setActiveTab("view")}>View Projects</button>

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
            <input
              type="text"
              placeholder="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Mode (e.g. Remote/Onsite)"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              required
            />
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
                <li key={project.id}>
                  <strong>{project.title}</strong> - {project.description}
                  <br />
                  <span>
                    Interns: {project.no_of_interns} | Duration: {project.duration} | Mode: {project.mode} | Prerequisites: {project.prerequisites}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {message && <p style={{ marginTop: "10px", color: "red" }}>{message}</p>}
        </div>
      )}
    </div>
  );
}

export default Professor_dashboard;