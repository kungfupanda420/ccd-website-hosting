import React, { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "../css/CandidatePreferences.css";

function CandidatePreferences() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [modes, setModes] = useState([]);
  const [durations, setDurations] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [filters, setFilters] = useState({
    department: "",
    mode: "",
    duration: "",
    professor: "",
    search: ""
  });
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await authFetch("/api/students/allProjects", { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
          setFilteredProjects(data);

          setDepartments([...new Set(data.map(p => p.professor?.department?.name || "N/A"))]);
          setModes([...new Set(data.map(p => p.mode || "N/A"))]);
          setDurations([...new Set(data.map(p => p.duration || "N/A"))]);
          setProfessors([...new Set(data.map(p => p.professor?.name || "N/A"))]);
        } else {
          setMessage({ text: "Failed to load projects.", type: "error" });
        }
      } catch (err) {
        setMessage({ text: "Network error.", type: "error" });
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    let result = [...projects];
    if (filters.department && filters.department !== "N/A") {
      result = result.filter(p => (p.professor?.department?.name || "N/A") === filters.department);
    }
    if (filters.mode && filters.mode !== "N/A") {
      result = result.filter(p => (p.mode || "N/A") === filters.mode);
    }
    if (filters.duration && filters.duration !== "N/A") {
      result = result.filter(p => (p.duration || "N/A") === filters.duration);
    }
    if (filters.professor && filters.professor !== "N/A") {
      result = result.filter(p => (p.professor?.name || "N/A") === filters.professor);
    }
    if (filters.search) {
      const searchTerm = (filters.search || "").toString().toLowerCase();
      result = result.filter(p => {
        const title = (p.title || "").toString().toLowerCase();
        const description = (p.description || "").toString().toLowerCase();
        const profName = (p.professor?.name || "").toString().toLowerCase();
        return (
          title.includes(searchTerm) ||
          description.includes(searchTerm) ||
          profName.includes(searchTerm)
        );
      });
    }
    setFilteredProjects(result);
  }, [projects, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchChange = (e) => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value
    }));
  };

  const toggleProjectSelection = (project) => {
    setSelectedProjects(prev => {
      const isSelected = prev.some(p => p.id === project.id);
      if (isSelected) {
        return prev.filter(p => p.id !== project.id);
      }
      // Only allow max 3 selections and same department
      if (
        prev.length < 3 &&
        (prev.length === 0 || project.professor?.department?.name === prev[0].professor?.department?.name)
      ) {
        return [...prev, project];
      } else if (prev.length >= 3) {
        setMessage({
          text: "You can select a maximum of 3 projects.",
          type: "error"
        });
        return prev;
      } else {
        setMessage({
          text: "You can only select projects from the same department.",
          type: "error"
        });
        return prev;
      }
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(selectedProjects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSelectedProjects(items);
  };

  const submitPreferences = async () => {
    if (selectedProjects.length !== 3) {
      setMessage({
        text: "Please select exactly 3 projects.",
        type: "error"
      });
      return;
    }
    try {
      const res = await authFetch("/api/students/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pref1_id: selectedProjects[0].id,
          pref2_id: selectedProjects[1].id,
          pref3_id: selectedProjects[2].id
        }),
      });
      if (res.ok) {
        setMessage({
          text: "Preferences submitted successfully!",
          type: "success"
        });
      } else {
        const err = await res.json();
        setMessage({
          text: err.detail || "Failed to submit preferences.",
          type: "error"
        });
      }
    } catch (err) {
      setMessage({
        text: "Network error.",
        type: "error"
      });
    }
  };

  return (
    <div className="preferences-container">
      <h1>Project Preferences</h1>
      <div className="filters-section">
        <div className="filter-row">
          <div className="filter-group">
            <label>Department:</label>
            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
            >
              <option value="">All Departments</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Mode:</label>
            <select
              name="mode"
              value={filters.mode}
              onChange={handleFilterChange}
            >
              <option value="">All Modes</option>
              {modes.map((mode, index) => (
                <option key={index} value={mode}>{mode}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Duration:</label>
            <select
              name="duration"
              value={filters.duration}
              onChange={handleFilterChange}
            >
              <option value="">All Durations</option>
              {durations.map((duration, index) => (
                <option key={index} value={duration}>{duration}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Professor:</label>
            <select
              name="professor"
              value={filters.professor}
              onChange={handleFilterChange}
            >
              <option value="">All Professors</option>
              {professors.map((prof, index) => (
                <option key={index} value={prof}>{prof}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="search-group">
          <input
            type="text"
            placeholder="Search projects..."
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="projects-section">
        <div className="available-projects">
          <h2>Available Projects ({filteredProjects.length})</h2>
          <div className="projects-table-container">
            <table className="projects-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Department</th>
                  <th>Professor</th>
                  <th>Mode</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan="7">No projects found matching your filters.</td>
                  </tr>
                ) : (
                  filteredProjects.map(project => (
                    <tr
                      key={project.id}
                      className={selectedProjects.some(p => p.id === project.id) ? "selected" : ""}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedProjects.some(p => p.id === project.id)}
                          onChange={() => toggleProjectSelection(project)}
                          disabled={
                            // Disable if already 3 selected and this one is not selected
                            (selectedProjects.length >= 3 && !selectedProjects.some(p => p.id === project.id)) ||
                            // Disable if department doesn't match
                            (selectedProjects.length > 0 && project.professor?.department?.name !== selectedProjects[0].professor?.department?.name)
                          }
                        />
                      </td>
                      <td>{project.title || "N/A"}</td>
                      <td>{project.description || "N/A"}</td>
                      <td>{project.professor?.department?.name || "N/A"}</td>
                      <td>{project.professor?.name || "N/A"}</td>
                      <td>{project.mode || "N/A"}</td>
                      <td>{project.duration || "N/A"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="selected-projects">
          <h2>Selected Projects ({selectedProjects.length})</h2>
          {selectedProjects.length === 0 ? (
            <p>No projects selected yet.</p>
          ) : (
            <div className="selected-list">
              <div className="department-warning">
                {selectedProjects.length > 0 &&
                  `All projects from ${selectedProjects[0].professor?.department?.name || "N/A"} department`}
              </div>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="selected-projects-list">
                  {(provided) => (
                    <ol
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="draggable-list"
                    >
                      {selectedProjects.map((project, index) => (
                        <Draggable
                          key={project.id}
                          draggableId={project.id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`selected-item ${snapshot.isDragging ? "dragging" : ""}`}
                            >
                              <div className="drag-handle">☰</div>
                              <div className="selected-content">
                                <div className="selected-rank">Preference {index + 1}</div>
                                <div className="selected-title">{project.title || "N/A"}</div>
                                <div className="selected-prof">
                                  {project.professor?.name || "N/A"}
                                </div>
                              </div>
                              <button
                                onClick={() => toggleProjectSelection(project)}
                                className="remove-btn"
                              >
                                Remove
                              </button>
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ol>
                  )}
                </Droppable>
              </DragDropContext>
              {selectedProjects.length === 3 && (
                <button
                  onClick={submitPreferences}
                  className="submit-btn"
                >
                  Submit Preferences
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}

export default CandidatePreferences;