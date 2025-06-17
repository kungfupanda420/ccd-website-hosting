import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Candidate_dashboard.css"; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSignOutAlt, faUsers, faList,faFileExport } from "@fortawesome/free-solid-svg-icons";

function DepartmentSIP() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("unallotted"); // State to toggle between views
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [view]); // Refetch data when view changes

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Authorization token is missing.");
        alert("Please log in to access this page.");
        return;
      }

      const endpoint =
        view === "unallotted"
          ? "/api/departments/unalloted_studentwise_data"
          : "/api/departments/alloted_studentwise_data";

      const studentsRes = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!studentsRes.ok) {
        const errorData = await studentsRes.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to fetch data");
      }

      const studentsData = await studentsRes.json();
      setStudents(studentsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(`Error: ${error.message}`);
      setLoading(false);
    }
  };

  const renderPreference = (preference) => {
    if (!preference) return "-";
    return `${preference.title || "No Title"} (${preference.id}) - ${
      preference.professor?.name || "No Professor"
    }`;
  };

  const renderAllottedProject = (student) => {
    if (!student.selected_project) return "Not allotted";
    return `${student.selected_project.title} (${student.selected_project.id})`;
  };

  const handleAllot = async (sip_id, project_id) => {
    if (!project_id) return;

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Authorization token is missing.");
        alert("Please log in to access this page.");
        return;
      }

      const response = await fetch(`/api/departments/allotment/${sip_id}/${project_id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to allot project");
      }

      const result = await response.json();
      alert(result.message);
      fetchData(); // Refresh data
    } catch (error) {
      console.error("Allot error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleUnallot = async (sip_id) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Authorization token is missing.");
        alert("Please log in to access this page.");
        return;
      }

      const response = await fetch(`/api/departments/allotment/${sip_id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to unallot project");
      }

      const result = await response.json();
      alert(result.message);
      fetchData(); // Refresh data
    } catch (error) {
      console.error("Unallot error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleCSVExport = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Authorization token is missing.");
        alert("Please log in to access this page.");
        return;
      }

      const response = await fetch("/api/departments/department_data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to export data");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "department_data.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Export error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="cd-container">
      {/* Sidebar */}
      <aside className="cd-sidebar">
        <nav>
          <button
            className={`cd-btn ${view === "unallotted" ? "active" : ""}`}
            onClick={() => setView("unallotted")}
          >
            <FontAwesomeIcon icon={faUsers} />
            <span>Unallotted Students</span>
          </button>
          <button
            className={`cd-btn ${view === "allotted" ? "active" : ""}`}
            onClick={() => setView("allotted")}
          >
            <FontAwesomeIcon icon={faList} />
            <span>Allotted Students</span>
          </button>
          <button className="cd-btn" onClick={() => navigate("/login")}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="cd-main-content">
        {view === "unallotted" && (
       
             <button 
            onClick={handleCSVExport}
            style={{
              backgroundColor: "#2196F3",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            <FontAwesomeIcon icon={faFileExport} />
            <span>Export as CSV</span>
          </button>
        )}
        
        <table className="cd-table">
          <thead>
            <tr>
              <th>SIP ID</th>
              <th>Name</th>
              <th>Preference 1</th>
              <th>Preference 2</th>
              <th>Preference 3</th>
              <th>Allotted Project</th>
              {view === "unallotted" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={view === "unallotted" ? 7 : 6} className="cd-table-empty">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.sip_id}>
                  <td>{student.sip_id || "-"}</td>
                  <td>{student.name}</td>
                  <td>{renderPreference(student.pref1)}</td>
                  <td>{renderPreference(student.pref2)}</td>
                  <td>{renderPreference(student.pref3)}</td>
                  <td>{renderAllottedProject(student)}</td>
                  {view === "unallotted" && (
                    <td>
                      <select
                        onChange={(e) => handleAllot(student.sip_id, e.target.value)}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select Project
                        </option>
                        {student.pref1 && (
                          <option value={student.pref1.id}>
                            {student.pref1.title || "No Title"} (Pref 1)
                          </option>
                        )}
                        {student.pref2 && (
                          <option value={student.pref2.id}>
                            {student.pref2.title || "No Title"} (Pref 2)
                          </option>
                        )}
                        {student.pref3 && (
                          <option value={student.pref3.id}>
                            {student.pref3.title || "No Title"} (Pref 3)
                          </option>
                        )}
                      </select>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DepartmentSIP;