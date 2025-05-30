import React from 'react';

function DepartmentSIP({ department, sip }) {
  const downloadCSV = async () => {
    try {
      // Get the authentication token from wherever it's stored in your app
      const token = localStorage.getItem('token'); // or your auth context
      
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

      // Create a blob from the response
      const blob = await response.blob();
      
      // Create a download link and trigger the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'department_data.csv';
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading CSV:', error);
      alert('Failed to download CSV. Please try again.');
    }
  };

  // Safely access department.name or sip.name (if needed)
  const departmentName = department?.name || 'Department';
  const sipName = sip?.name || 'SIP';

  return (
    <div>
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
        }}
      >
        Export as CSV
      </button>
    </div>
  );
}

// Default props (optional)
DepartmentSIP.defaultProps = {
  department: {},
  sip: {},
};

export default DepartmentSIP;