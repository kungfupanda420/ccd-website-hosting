import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import "../css/SipTable.css"; // Link to the CSS file

const Results = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("All");
  const [searchName, setSearchName] = useState("");

  const rowsPerPage = 10;

  const selectedHeaders = [
    "Name of the Candidate",
    "Email ID",
    "Faculty Allocated",
    "Project Area",
    "Tentative Title",
    "Remarks",
    "Department",
  ];

  useEffect(() => {
    Papa.parse("/documents/sip_selected2.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const cleaned = results.data.filter(
          (row) =>
            row["Name of the Candidate"] &&
            row["Email ID"] &&
            row["Department"]
        );
        setData(cleaned);
        const deptList = [...new Set(cleaned.map((row) => row.Department))];
        setDepartments(deptList);
      },
    });
  }, []);

  const filteredData = data.filter((row) => {
    const deptMatch = selectedDept === "All" || row.Department === selectedDept;
    const nameMatch = row["Name of the Candidate"]
      .toLowerCase()
      .includes(searchName.toLowerCase());
    return deptMatch && nameMatch;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentRows = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="sip-container">
      <h2 className="sip-title">SIP Candidates</h2>
      <p className="sip-description">
        The following candidates have been selected for the Summer Internship. Kindly check your email for further proceedings.
        </p> 
      <div className="filter-section">
        <div className="filter-item">
          <label htmlFor="deptFilter">Department:</label>
          <select
            id="deptFilter"
            value={selectedDept}
            onChange={(e) => {
              setSelectedDept(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All</option>
            {departments.map((dept, idx) => (
              <option key={idx} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="nameSearch">Search by Name:</label>
          <input
            id="nameSearch"
            type="text"
            placeholder="Enter candidate name..."
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="table-wrapper">
        <table className="sip-table">
          <thead>
            <tr>
              {selectedHeaders.map((header, i) => (
                <th key={i}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {selectedHeaders.map((header, colIndex) => (
                  <td key={colIndex}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Results;
