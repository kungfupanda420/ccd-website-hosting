import React, { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import "../css/CandidatePreferences.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt, faHome, faEdit, faSave, faTimes, faList } from "@fortawesome/free-solid-svg-icons";

function CandidatePreferences() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [modes, setModes] = useState([]);
  const [durations, setDurations] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [profilePhotoPath, setProfilePhotoPath] = useState("");
  const [appliedCounts, setAppliedCounts] = useState([]);
const [vacancyRemaining, setVacancyRemaining] = useState([]);
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [filters, setFilters] = useState({
    department: "",
    mode: "",
    duration: "",
    professor: "",
    search: "",
  });
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [candidate, setCandidate] = useState(null);
  const [adminConf, setAdminConf] = useState(false);
  const [allottedProject, setAllottedProject] = useState(null);
  const navigate = useNavigate();
useEffect(() => {
  const applyFilters = () => {
    let filtered = projects;

    if (filters.department) {
      filtered = filtered.filter(
        (project) => project.professor?.department?.name === filters.department
      );
    }

    if (filters.mode) {
      filtered = filtered.filter((project) => project.mode === filters.mode);
    }

    if (filters.duration) {
      filtered = filtered.filter((project) => project.duration === filters.duration);
    }

    if (filters.professor) {
      filtered = filtered.filter((project) => project.professor?.name === filters.professor);
    }

    if (filters.search) {
      filtered = filtered.filter((project) =>
        project.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  };

  applyFilters();
}, [filters, projects]);

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      setIsPhotoLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const res = await authFetch("/api/students/profile_photo", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          if (data.profile_photo_path) {
            const cleanedPath = data.profile_photo_path.startsWith("/")
              ? data.profile_photo_path.substring(1)
              : data.profile_photo_path;
            const fullUrl = `${window.location.origin}/${cleanedPath}`;
            setProfilePhotoPath(`${fullUrl}?${Date.now()}`);
          }
        } else if (res.status === 404) {
          setProfilePhotoPath("/images/default.png");
        }
      } catch (error) {
        setProfilePhotoPath("/images/default.png");
      } finally {
        setIsPhotoLoading(false);
      }
    };

    fetchProfilePhoto();
  }, []);
  // GSAP animations
  useEffect(() => {
    if (selectedProjects.length > 0) {
      gsap.from('.selected-item', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [selectedProjects.length]);

  // Fetch candidate data and projects
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Check admin confirmation status first
        const adminConfRes = await authFetch("/api/students/admin_conf");
        if (adminConfRes.ok) {
          const adminConfData = await adminConfRes.json();
          setAdminConf(adminConfData.admin_conf);

          if (adminConfData.admin_conf) {
            // If admin confirmed, fetch allotted project
            const allottedRes = await authFetch("/api/students/me/allotted_project");
            if (allottedRes.ok) {
              const allottedData = await allottedRes.json();
              setAllottedProject(allottedData);
            }
            setIsLoading(false);
            return;
          }
        }

        // If not admin confirmed, proceed with normal flow
        const candidateRes = await authFetch("/api/students/me");
        if (candidateRes.ok) {
          const candidateData = await candidateRes.json();
          setCandidate(candidateData);
        }

        const projectsRes = await authFetch("/api/students/all_projects");
        if (!projectsRes.ok) {
          throw new Error("Failed to load projects");
        }
        const projectsData = await projectsRes.json();
        setProjects(projectsData);
        setFilteredProjects(projectsData);

        setDepartments([...new Set(projectsData.map((p) => p.professor?.department?.name || "N/A"))]);
        setModes([...new Set(projectsData.map((p) => p.mode || "N/A"))]);
        setDurations([...new Set(projectsData.map((p) => p.duration || "N/A"))]);
        setProfessors([...new Set(projectsData.map((p) => p.professor?.name || "N/A"))]);
        // setVacancies([...new Set(projectsData.map((p) => p.vacancies || 0))]);
        // setpeople_applied([...new Set(projectsData.map((p) => p.people_applied || 0))]);
        setVacancyRemaining([...new Set(projectsData.map((p) => p.vacancy_remaining || 0))]);
setAppliedCounts([...new Set(projectsData.map((p) => p.applied_count || 0))]);

        const appliedRes = await authFetch("/api/students/preferences");
        if (appliedRes.ok) {
          const appliedData = await appliedRes.json();
          if (appliedData.length > 0) {
            setSelectedProjects(appliedData);
            setFilters((prev) => ({
              ...prev,
              department: appliedData[0].professor?.department?.name || "",
            }));
          }
        }
      } catch (err) {
        setMessage({
          text: err.message || "Failed to load data",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      search: e.target.value,
    }));
  };

  const toggleProjectSelection = (project) => {
    setSelectedProjects((prev) => {
      const isSelected = prev.some((p) => p.id === project.id);
      if (isSelected) {
        return prev.filter((p) => p.id !== project.id);
      }

      if (prev.length >= 3) {
        setMessage({
          text: "You can select a maximum of 3 projects.",
          type: "error",
        });
        return prev;
      }

      if (prev.length > 0 && project.professor?.department?.name !== prev[0].professor?.department?.name) {
        setMessage({
          text: "You can only select projects from the same department.",
          type: "error",
        });
        return prev;
      }

      return [...prev, project];
    });
  };
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    // Get the current list
    const items = Array.from(selectedProjects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update state immediately
    setSelectedProjects(items);

    // Animate the movement
    const listItems = Array.from(document.querySelectorAll('.selected-item'));

    // Calculate direction of movement
    const movingUp = result.destination.index < result.source.index;

    listItems.forEach((item, index) => {
      const itemId = item.dataset.id;
      const itemNode = item;

      if (itemId === reorderedItem.id.toString()) {
        // Animation for the moved item
        gsap.fromTo(itemNode,
          {
            y: movingUp ? -30 : 30,
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            scale: 1.02
          },
          {
            y: 0,
            backgroundColor: 'white',
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          }
        );
      } else if (
        (movingUp && index >= result.destination.index && index < result.source.index) ||
        (!movingUp && index > result.source.index && index <= result.destination.index)
      ) {
        // Animation for items that need to move down/up to make space
        gsap.fromTo(itemNode,
          { y: movingUp ? 30 : -30 },
          {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          }
        );
      }
    });
  };

  const submitPreferences = async () => {
    if (selectedProjects.length === 0) {
      setMessage({
        text: "Please select at least one project.",
        type: "error",
      });
      return;
    }

    try {
      setIsLoading(true);
      setMessage({ text: "", type: "" });

      const body = {
        pref1_id: selectedProjects[0]?.id || null,
        pref2_id: selectedProjects[1]?.id || null,
        pref3_id: selectedProjects[2]?.id || null,
      };

      const res = await authFetch("/api/students/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setMessage({
          text: "Preferences submitted successfully!",
          type: "success",
        });
      } else {
        const err = await res.json();
        throw new Error(err.detail || "Failed to submit preferences");
      }
    } catch (err) {
      setMessage({
        text: err.message || "Network error",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // If admin has confirmed, show allotted project
  if (adminConf) {
    return (
      <div style={{ display: "flex" }}>
        <aside className="sidebar">
          <img
            className="profile-pic"
            src={profilePhotoPath}
            alt="Profile"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/default.png";
            }}
          />
          <nav>
            <button onClick={() => navigate("/candidatedashboard")}>
              <FontAwesomeIcon icon={faHome} />
              <span>Dashboard</span>
            </button>
            <button onClick={() => navigate("/candidate_profile")}>
              <FontAwesomeIcon icon={faUser} />
              <span>Profile</span>
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                navigate("/login");
              }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        <div className="preferences-container">
          <h1>Your Allotted Project</h1>

          {isLoading ? (
            <div>Loading...</div>
          ) : allottedProject ? (
            <div className="allotted-project-card">
              <h2>{allottedProject.title || "N/A"}</h2>
              <div className="project-details">
                <p><strong>Description:</strong> {allottedProject.description || "N/A"}</p>
                <p><strong>Department:</strong> {allottedProject.professor?.department?.name || "N/A"}</p>
                <p><strong>Professor:</strong> {allottedProject.professor?.name || "N/A"}</p>
                <p><strong>Mode:</strong> {allottedProject.mode || "N/A"}</p>
                <p><strong>Duration:</strong> {allottedProject.duration || "N/A"}</p>
              </div>
              <div className="confirmation-message">
                Your project has been confirmed by the admin. Please contact your professor for further instructions.
              </div>
            </div>
          ) : (
            <div className="no-project-message">
              No project has been allotted to you yet. Please check back later.
            </div>
          )}
        </div>
      </div>
    );
  }

  // Normal preferences selection flow
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <aside className="sidebar">
        <img
  className="profile-pic"
  src={profilePhotoPath}
  alt="Profile"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "/images/default.png";
  }}
/>

        <nav>
          <button onClick={() => navigate("/candidatedashboard")}>
            <FontAwesomeIcon icon={faHome} />
            <span>Dashboard</span>
          </button>
          <button onClick={() => navigate("/candidate_profile")}>
            <FontAwesomeIcon icon={faUser} />
            <span>Profile</span>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              navigate("/login");
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
      {/* Main Content */}
      <div className="preferences-container">
        <h1>Project Preferences</h1>

        {selectedProjects.length > 0 && (
          <div className="info-message">
            You have {selectedProjects.length} project(s) selected. Drag to reorder your preferences.
          </div>
        )}

        <div className="filters-section">
          <div className="filter-row">
            <div className="filter-group">
              <label>Department:</label>
              <select
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                disabled={selectedProjects.length > 0}
              >
                <option value="">All Departments</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Mode:</label>
              <select name="mode" value={filters.mode} onChange={handleFilterChange}>
                <option value="">All Modes</option>
                {modes.map((mode, index) => (
                  <option key={index} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Duration:</label>
              <select name="duration" value={filters.duration} onChange={handleFilterChange}>
                <option value="">All Durations</option>
                {durations.map((duration, index) => (
                  <option key={index} value={duration}>
                    {duration}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Professor:</label>
              <select name="professor" value={filters.professor} onChange={handleFilterChange}>
                <option value="">All Professors</option>
                {professors.map((prof, index) => (
                  <option key={index} value={prof}>
                    {prof}
                  </option>
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
                    <th>people_applied</th>
                    <th>vacancies</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan="7">No projects found matching your filters.</td>
                    </tr>
                  ) : (
                    filteredProjects.map((project) => (
                      <tr
                        key={project.id}
                        className={selectedProjects.some((p) => p.id === project.id) ? "selected" : ""}
                      >
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedProjects.some((p) => p.id === project.id)}
                            onChange={() => toggleProjectSelection(project)}
                            disabled={
                              (selectedProjects.length >= 3 &&
                                !selectedProjects.some((p) => p.id === project.id)) ||
                              (selectedProjects.length > 0 &&
                                project.professor?.department?.name !==
                                selectedProjects[0].professor?.department?.name)
                            }
                          />
                        </td>
                        <td>{project.title || "N/A"}</td>
                        <td>{project.description || "N/A"}</td>
                        <td>{project.professor?.department?.name || "N/A"}</td>
                        <td>{project.professor?.name || "N/A"}</td>
                        <td>{project.mode || "N/A"}</td>
                        <td>{project.duration || "N/A"}</td>
                        <td>{project.applied_count || 0}</td>
                        <td>{project.vacancy_remaining || 0}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="selected-projects">
            <h2>Selected Projects ({selectedProjects.length}/3)</h2>
            {selectedProjects.length === 0 ? (
              <div className="empty-selection">
                <p>No projects selected yet.</p>
                <p>Select projects from the same department (max 3).</p>
              </div>
            ) : (
              <div className="selected-list">
                <div className="department-warning">
                  All projects from {selectedProjects[0].professor?.department?.name || "N/A"} department
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
                                data-id={project.id.toString()}
                              >
                                <div className="drag-handle">
                                  <FontAwesomeIcon icon={faList} />
                                </div>
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

                <button
                  onClick={submitPreferences}
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit Preferences"}
                </button>
              </div>
            )}
          </div>
        </div>

        {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
      </div>
    </div>
  );
}

export default CandidatePreferences;