import React, { useState, useEffect } from 'react';

function DepartmentSIP() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Authorization token is missing.');
        alert('Please log in to access this page.');
        return;
      }

      const studentsRes = await fetch('/api/departments/studentwise-data', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!studentsRes.ok) {
        const errorData = await studentsRes.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to fetch data');
      }

      const studentsData = await studentsRes.json();
      setStudents(studentsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert(`Error: ${error.message}`);
      setLoading(false);
    }
  };

  const renderPreference = (preference) => {
    if (!preference) return '-';
    return `${preference.title || 'No Title'} (${preference.id}) - ${preference.professor?.name || 'No Professor'}`;
  };

  const renderAllottedProject = (student) => {
    if (!student.selected_project) return 'Not allotted';
    return `${student.selected_project.title} (${student.selected_project.id})`;
  };

  const handleAllot = async (sip_id, project_id) => {
    if (!project_id) return;
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Authorization token is missing.');
        alert('Please log in to access this page.');
        return;
      }

      const response = await fetch(`/api/departments/allotment/${sip_id}/${project_id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to allot project');
      }

      const result = await response.json();
      alert(result.message);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Allot error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleUnallot = async (sip_id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Authorization token is missing.');
        alert('Please log in to access this page.');
        return;
      }

      const response = await fetch(`/api/departments/allotment/${sip_id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to unallot project');
      }

      const result = await response.json();
      alert(result.message);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Unallot error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleCSVExport = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Authorization token is missing.');
        alert('Please log in to access this page.');
        return;
      }

      const response = await fetch('/api/departments/department_data', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to export data');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'department_data.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Export error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const cellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <button
        onClick={handleCSVExport}
        style={{
          padding: '10px 20px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Export as CSV
      </button>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th style={cellStyle}>SIP ID</th>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Preference 1</th>
            <th style={cellStyle}>Preference 2</th>
            <th style={cellStyle}>Preference 3</th>
            <th style={cellStyle}>Allotted Project</th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>No students found.</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.sip_id}>
                <td style={cellStyle}>{student.sip_id || '-'}</td>
                <td style={cellStyle}>{student.name}</td>
                <td style={cellStyle}>{renderPreference(student.pref1)}</td>
                <td style={cellStyle}>{renderPreference(student.pref2)}</td>
                <td style={cellStyle}>{renderPreference(student.pref3)}</td>
                <td style={cellStyle}>{renderAllottedProject(student)}</td>
                <td style={cellStyle}>
                  {student.selected_project ? (
                    <button
                      onClick={() => handleUnallot(student.sip_id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Unallot
                    </button>
                  ) : (
                    <select
                      onChange={(e) => handleAllot(student.sip_id, e.target.value)}
                      defaultValue=""
                      style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                    >
                      <option value="" disabled>Select Project</option>
                      {student.pref1 && (
                        <option value={student.pref1.id}>
                          {student.pref1.title || 'No Title'} (Pref 1)
                        </option>
                      )}
                      {student.pref2 && (
                        <option value={student.pref2.id}>
                          {student.pref2.title || 'No Title'} (Pref 2)
                        </option>
                      )}
                      {student.pref3 && (
                        <option value={student.pref3.id}>
                          {student.pref3.title || 'No Title'} (Pref 3)
                        </option>
                      )}
                    </select>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentSIP;