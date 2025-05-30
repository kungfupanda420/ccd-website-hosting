import React, { useState, useEffect } from 'react';

function DepartmentSIP() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/departments/deptStudents', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch student data');
      }

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleAllot = async (user_id, project_id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/allotStudent/${user_id}/${project_id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to allot project');
      }

      const result = await response.json();
      alert(result.message);
      fetchStudentData(); // Refresh data
    } catch (error) {
      console.error('Allot error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const downloadCSV = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/departments/departmentData', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to download CSV');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'department_data.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading CSV:', error);
      alert('Failed to download CSV. Please try again.');
    }
  };

  const cellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
  };

  return (
    <div style={{ padding: '20px' }}>
      <button 
        onClick={downloadCSV}
        style={{
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          marginBottom: '20px',
        }}
      >
        Export as CSV
      </button>

      <table 
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '20px'
        }}
      >
        <thead>
          <tr>
            <th style={cellStyle}>SIP ID</th>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Preference 1</th>
            <th style={cellStyle}>Preference 2</th>
            <th style={cellStyle}>Preference 3</th>
            <th style={cellStyle}>Allot</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No students found.</td>
            </tr>
          ) : (
            students.map((student, index) => (
              <tr key={index}>
                <td style={cellStyle}>{student.sip_id}</td>
                <td style={cellStyle}>{student.name}</td>
                <td style={cellStyle}>{student.preference1?.title || '-'}</td>
                <td style={cellStyle}>{student.preference2?.title || '-'}</td>
                <td style={cellStyle}>{student.preference3?.title || '-'}</td>
                <td style={cellStyle}>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        handleAllot(student.user_id, e.target.value);
                      }
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>Select Project</option>
                    {student.preference1 && (
                      <option value={student.preference1.id}>
                        {student.preference1.title}
                      </option>
                    )}
                    {student.preference2 && (
                      <option value={student.preference2.id}>
                        {student.preference2.title}
                      </option>
                    )}
                    {student.preference3 && (
                      <option value={student.preference3.id}>
                        {student.preference3.title}
                      </option>
                    )}
                  </select>
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
