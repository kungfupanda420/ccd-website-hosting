import React, { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";
// import "../css/CandidatePreferences.css";

function CandidatePreferences() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [preferences, setPreferences] = useState({ pref1: null, pref2: null, pref3: null });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch all available projects
    const fetchProjects = async () => {
      try {
        const res = await authFetch("/api/projects", { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
          setFiltered(data);
        } else {
          setMessage("Failed to load projects.");
        }
      } catch {
        setMessage("Network error.");
      }
    };
    fetchProjects();
  }, []);

  // Filter projects by search
  useEffect(() => {
    setFiltered(
      projects.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
      )
    );
  }, [search, projects]);

  // Handle preference selection
  const handlePrefChange = (pref, projectId) => {
    setPreferences((prev) => {
      // Prevent duplicate preferences
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (updated[key] === projectId) updated[key] = null;
      });
      updated[pref] = projectId;
      return updated;
    });
  };

  // Submit preferences
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!preferences.pref1 || !preferences.pref2 || !preferences.pref3) {
      setMessage("Please select all three preferences.");
      return;
    }
    if (
      new Set([preferences.pref1, preferences.pref2, preferences.pref3]).size !== 3
    ) {
      setMessage("Preferences must be unique.");
      return;
    }
    try {
      const res = await authFetch("/api/students/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });
      if (res.ok) {
        setMessage("Preferences submitted successfully!");
      } else {
        const err = await res.json();
        setMessage(err.detail || "Failed to submit preferences.");
      }
    } catch {
      setMessage("Network error.");
    }
  };

  return (
    <div className="candidate-preferences">
      <h1>Project Preferences</h1>
      <input
        type="text"
        placeholder="Search projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <form onSubmit={handleSubmit}>
        <div className="preferences-list">
          {filtered.length === 0 && <div>No projects found.</div>}
          {filtered.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-title">{project.title}</div>
              <div className="project-desc">{project.description}</div>
              <div className="pref-selectors">
                <label>
                  <input
                    type="radio"
                    name="pref1"
                    checked={preferences.pref1 === project.id}
                    onChange={() => handlePrefChange("pref1", project.id)}
                  />
                  Preference 1
                </label>
                <label>
                  <input
                    type="radio"
                    name="pref2"
                    checked={preferences.pref2 === project.id}
                    onChange={() => handlePrefChange("pref2", project.id)}
                  />
                  Preference 2
                </label>
                <label>
                  <input
                    type="radio"
                    name="pref3"
                    checked={preferences.pref3 === project.id}
                    onChange={() => handlePrefChange("pref3", project.id)}
                  />
                  Preference 3
                </label>
              </div>
            </div>
          ))}
        </div>
        <button type="submit" className="submit-btn">
          Submit Preferences
        </button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default CandidatePreferences;