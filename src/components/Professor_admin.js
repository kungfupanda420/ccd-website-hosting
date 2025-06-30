import React, { useEffect, useState } from "react";

const ProfessorAdmin = () => {
  const [professors, setProfessors] = useState([]);
  const [selectedProf, setSelectedProf] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("select"); // "select", "add", "view", or "allotted"
  const [projects, setProjects] = useState([]);
  const [allottedStudents, setAllottedStudents] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [message, setMessage] = useState("");

  // Add/Edit Project form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [no_of_interns, setNoOfInterns] = useState("");
  const [duration, setDuration] = useState("");
  const [mode, setMode] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const [editingProjectId, setEditingProjectId] = useState(null);

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

  const fetchProjects = async () => {
    if (!selectedProf) {
      setMessage("Please select a professor first");
      return;
    }

    setLoadingProjects(true);
    setMessage("");
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`/api/admin/professors/${selectedProf}/projects`, {
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

  const fetchAllottedStudents = async () => {
    if (!selectedProf) {
      setMessage("Please select a professor first");
      return;
    }

    setLoadingStudents(true);
    setMessage("");
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`/api/admin/professors/${selectedProf}/allotted_student`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setAllottedStudents(data);
      } else {
        const err = await res.json();
        setMessage(err.detail || "Failed to fetch allotted students.");
      }
    } catch (error) {
      setMessage("Network error.");
    }
    setLoadingStudents(false);
  };

  useEffect(() => {
    if (activeTab === "view" && selectedProf) {
      fetchProjects();
    } else if (activeTab === "allotted" && selectedProf) {
      fetchAllottedStudents();
    }
  }, [activeTab, selectedProf]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!selectedProf) {
      setMessage("Please select a professor first");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const url = editingProjectId 
        ? `/api/professors/projects/${editingProjectId}`
        : `/api/admin/professors/${selectedProf}/projects`;

      const method = editingProjectId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
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
        throw new Error(data.detail || "Failed to save project");
      }

      setMessage(editingProjectId ? "Project updated successfully!" : "Project added successfully!");
      
      // Clear form
      setTitle("");
      setDescription("");
      setNoOfInterns("");
      setDuration("");
      setMode("");
      setPrerequisites("");
      setEditingProjectId(null);
      
      // Refresh projects list
      fetchProjects();
      setActiveTab("view");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleEdit = (project) => {
    setTitle(project.title);
    setDescription(project.description);
    setNoOfInterns(project.no_of_interns);
    setDuration(project.duration);
    setMode(project.mode);
    setPrerequisites(project.prerequisites || "");
    setEditingProjectId(project.id);
    setActiveTab("add");
  };

  const handleDelete = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch(`/api/professors/project/${projectId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 204) {
          setMessage("Project deleted successfully!");
          fetchProjects();
        } else {
          const data = await res.json();
          throw new Error(data.detail || "Failed to delete project");
        }
      } catch (err) {
        setMessage(err.message);
      }
    }
  };

  const cancelEdit = () => {
    setTitle("");
    setDescription("");
    setNoOfInterns("");
    setDuration("");
    setMode("");
    setPrerequisites("");
    setEditingProjectId(null);
    setActiveTab("view");
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
          onClick={() => {
            if (!selectedProf) {
              setMessage("Please select a professor first");
              setActiveTab("select");
            } else {
              setActiveTab("add");
            }
          }}
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
          {editingProjectId ? "Editing Project" : "Add Project"}
        </button>
        <button
          onClick={() => {
            if (!selectedProf) {
              setMessage("Please select a professor first");
              setActiveTab("select");
            } else {
              setActiveTab("view");
            }
          }}
          style={{
            marginRight: 10,
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
        <button
          onClick={() => {
            if (!selectedProf) {
              setMessage("Please select a professor first");
              setActiveTab("select");
            } else {
              setActiveTab("allotted");
            }
          }}
          style={{
            padding: "8px 16px",
            background: activeTab === "allotted" ? "#1976d2" : "#eee",
            color: activeTab === "allotted" ? "#fff" : "#000",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Allotted Students
        </button>
      </div>

      {message && (
        <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>
      )}

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
                onChange={(e) => setSelectedProf(e.target.value)}
                style={{ padding: "8px", borderRadius: "4px", minWidth: "200px" }}
              >
                <option value="">-- Select --</option>
                {professors.map(prof => (
                  <option key={prof.user.id} value={prof.user.id}>
                    {prof.name} ({prof.department.name})
                  </option>
                ))}
              </select>
              {selectedProf && (
                <p style={{ marginTop: "10px" }}>
                  Selected Professor: {professors.find(p => p.user.id === parseInt(selectedProf))?.name}
                </p>
              )}
            </div>
          )}
        </>
      )}

      {activeTab === "add" && (
        <div className="add-project-form">
          <h2>
            {editingProjectId ? "Edit Project" : "Add Project"} for {professors.find(p => p.user.id === parseInt(selectedProf))?.name}
          </h2>
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
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" style={{ padding: "10px 20px", borderRadius: 4, background: "#1976d2", color: "#fff", border: "none" }}>
                {editingProjectId ? "Update Project" : "Add Project"}
              </button>
              {editingProjectId && (
                <button type="button" onClick={cancelEdit} style={{ padding: "10px 20px", borderRadius: 4, background: "#f44336", color: "#fff", border: "none" }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {activeTab === "view" && (
        <div className="view-projects">
          <h2>Projects for {professors.find(p => p.user.id === parseInt(selectedProf))?.name}</h2>
          {loadingProjects ? (
            <p>Loading...</p>
          ) : projects.length === 0 ? (
            <p>No projects found for this professor.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {projects.map((project) => (
                <li key={project.id} style={{
                  marginBottom: "20px",
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  backgroundColor: "#f9f9f9",
                  position: "relative"
                }}>
                  <strong style={{ fontSize: "1.1em" }}>{project.title}</strong>
                  <p>{project.description}</p>
                  <div style={{ marginTop: "10px", color: "#555" }}>
                    <span style={{ display: "block" }}><strong>Interns:</strong> {project.no_of_interns}</span>
                    <span style={{ display: "block" }}><strong>Duration:</strong> {project.duration}</span>
                    <span style={{ display: "block" }}><strong>Mode:</strong> {project.mode}</span>
                    <span style={{ display: "block" }}><strong>Prerequisites:</strong> {project.prerequisites || "None"}</span>
                  </div>
                  <div style={{ position: "absolute", top: "15px", right: "15px", display: "flex", gap: "10px" }}>
                    <button 
                      onClick={() => handleEdit(project)}
                      style={{ 
                        padding: "5px 10px", 
                        background: "#ffc107", 
                        color: "#000", 
                        border: "none", 
                        borderRadius: 4,
                        cursor: "pointer"
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(project.id)}
                      style={{ 
                        padding: "5px 10px", 
                        background: "#f44336", 
                        color: "#fff", 
                        border: "none", 
                        borderRadius: 4,
                        cursor: "pointer"
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {activeTab === "allotted" && (
        <div className="allotted-students">
          <h2>Allotted Students for {professors.find(p => p.user.id === parseInt(selectedProf))?.name}</h2>
          {loadingStudents ? (
            <p>Loading students...</p>
          ) : allottedStudents.length === 0 ? (
            <p>No students allotted to this professor's projects.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f2f2f2" }}>
                    <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" }}>SIP ID</th>
                    <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Name</th>
                    <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Project Title</th>
                    <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Start Date</th>
                    <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" }}>End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {allottedStudents.map((student) => (
                    <tr key={student.sip_id} style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={{ padding: "12px" }}>{student.sip_id}</td>
                      <td style={{ padding: "12px" }}>{student.name}</td>
                      <td style={{ padding: "12px" }}>{student.project_title}</td>
                      <td style={{ padding: "12px" }}>{student.start_date}</td>
                      <td style={{ padding: "12px" }}>{student.end_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfessorAdmin;