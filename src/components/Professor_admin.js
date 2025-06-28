import React, { useEffect, useState } from "react";

const Proffessor_admin = () => {
  const [professors, setProfessors] = useState([]);
  const [selectedProf, setSelectedProf] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("select"); // "select", "add", or "view"
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [message, setMessage] = useState("");

  // Add Project form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [no_of_interns, setNoOfInterns] = useState("");
  const [duration, setDuration] = useState("");
  const [mode, setMode] = useState("");
  const [prerequisites, setPrerequisites] = useState("");

  useEffect(() => {
    const fetchProfessors = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch("/api/admin/professors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.detail || "Failed to fetch professors");
        }
        const data = await res.json();
        setProfessors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfessors();
  }, []);

  // Fetch projects for the current professor
  const fetchProjects = async () => {
    setLoadingProjects(true);
    setMessage("");
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch("/api/professors/projects", {
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

  // Handle Add Project form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch("/api/professors/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          no_of_interns: Number(no_of_interns),
          duration,
          mode,
          prerequisites,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to add project");
      }
      setMessage("Project added successfully!");
      setTitle("");
      setDescription("");
      setNoOfInterns("");
      setDuration("");
      setMode("");
      setPrerequisites("");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Professor Admin Page</h1>
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => setActiveTab("select")}
          style={{
            marginRight: 10,
            padding: "8px 16px",
            background: activeTab === "select" ? "#1976d2" : "#eee",
            color: activeTab === "select" ? "#fff" : "#000",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Select Professor
        </button>
        <button
          onClick={() => setActiveTab("add")}
          style={{
            marginRight: 10,
            padding: "8px 16px",
            background: activeTab === "add" ? "#1976d2" : "#eee",
            color: activeTab === "add" ? "#fff" : "#000",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Add Project
        </button>
        <button
          onClick={() => setActiveTab("view")}
          style={{
            padding: "8px 16px",
            background: activeTab === "view" ? "#1976d2" : "#eee",
            color: activeTab === "view" ? "#fff" : "#000",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          View Projects
        </button>
      </div>

      {activeTab === "select" && (
        <>
          <p>This is the admin page for professors.</p>
          {loading && <p>Loading professors...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!loading && !error && (
            <div style={{ margin: "20px 0" }}>
              <label htmlFor="prof-select">Select Professor: </label>
              <select
                id="prof-select"
                value={selectedProf}
                onChange={e => setSelectedProf(e.target.value)}
                style={{ padding: "8px", borderRadius: "4px", minWidth: "200px" }}
              >
                <option value="">-- Select --</option>
                {professors.map(prof => (
                  <option key={prof.id} value={prof.id}>
                    {prof.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </>
      )}

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
              style={{ display: "block", marginBottom: 10, width: "100%" }}
            />
            <textarea
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ display: "block", marginBottom: 10, width: "100%" }}
            />
            <input
              type="number"
              placeholder="Number of Interns"
              value={no_of_interns}
              onChange={(e) => setNoOfInterns(e.target.value)}
              required
              style={{ display: "block", marginBottom: 10, width: "100%" }}
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
              style={{ display: "block", marginBottom: 10, width: "100%" }}
            />
            <button type="submit" style={{ padding: "10px 20px", borderRadius: 4, background: "#1976d2", color: "#fff", border: "none" }}>
              Submit
            </button>
          </form>
          {message && <p style={{ marginTop: "10px", color: message.includes("success") ? "green" : "red" }}>{message}</p>}
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
                  <strong>{project.title}</strong> - {project.description}
                  <br />
                  <span>
                    Interns: {project.no_of_interns} | Duration: {project.duration} |
                    Mode: {project.mode} | Prerequisites: {project.prerequisites || "NONE"}
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
};

export default Proffessor_admin;