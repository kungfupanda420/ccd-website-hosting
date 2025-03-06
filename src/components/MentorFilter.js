import React, { useState } from "react";
import axios from "axios";

const departments = [
  "Chemical Engineering", "Chemistry", "Civil Engineering", "Management Studies",
  "Electronics & Communication Engineering", "Electrical Engineering", 
  "Materials Science and Engineering", "Mathematics", "Mechanical Engineering",
  "Architecture and Planning", "Physics", "Humanities, Arts and Social Sciences",
  "Computer Science & Engineering"
];

const durations = ["1", "2", "Any"];
const modes = ["Offline", "Hybrid", "Online"];

const MentorFilter = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedModes, setSelectedModes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (value, list, setList) => {
    setList(list.includes(value) ? list.filter(item => item !== value) : [...list, value]);
  };

  const applyFilter = async () => {
    const response = await axios.post("http://localhost:5000/filter", {
      department: selectedDepartment,
      preferred_duration: selectedDurations,
      internship_mode: selectedModes,
    });

    setFilteredData(response.data);
  };

  const handleRowSelection = (id) => {
    const updatedSelection = selectedRows.includes(id)
      ? selectedRows.filter((rowId) => rowId !== id)
      : [...selectedRows, id];

    if (updatedSelection.length <= 3) {
      setSelectedRows(updatedSelection);
    }
  };

  return (
    <div className="p-4" style={{ paddingTop: "50px" }}>

      <h2 className="text-xl font-bold mb-4">Filter Mentors</h2>

      {/* Department Dropdown */}
      <select
        className="border p-2 mb-2 w-full"
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
      >
        <option value="">Select Department</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>{dept}</option>
        ))}
      </select>

      {/* Preferred Duration Multi Checkbox */}
      <div className="mb-2">
        <label className="font-bold">Preferred Duration:</label>
        {durations.map((duration) => (
          <label key={duration} className="block">
            <input
              type="checkbox"
              value={duration}
              checked={selectedDurations.includes(duration)}
              onChange={() => handleCheckboxChange(duration, selectedDurations, setSelectedDurations)}
            />
            {duration}
          </label>
        ))}
      </div>

      {/* Internship Mode Multi Checkbox */}
      <div className="mb-2">
        <label className="font-bold">Internship Mode:</label>
        {modes.map((mode) => (
          <label key={mode} className="block">
            <input
              type="checkbox"
              value={mode}
              checked={selectedModes.includes(mode)}
              onChange={() => handleCheckboxChange(mode, selectedModes, setSelectedModes)}
            />
            {mode}
          </label>
        ))}
      </div>

      {/* Apply Filter Button */}
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={applyFilter}
      >
        Apply Filter
      </button>

      {/* Display Results */}
      <h3 className="text-lg font-bold mt-4">Results:</h3>
      <table className="border-collapse border border-gray-400 mt-2 w-full">
        <thead>
          <tr>
            <th className="border p-2">Select</th>
            <th className="border p-2">Faculty Name</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Preferred Duration</th>
            <th className="border p-2">Internship Mode</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((mentor) => (
            <tr key={mentor.id} className="border">
              <td className="border p-2">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(mentor.id)}
                  onChange={() => handleRowSelection(mentor.id)}
                  disabled={selectedRows.length >= 3 && !selectedRows.includes(mentor.id)}
                />
              </td>
              <td className="border p-2">{mentor.faculty_name}</td>
              <td className="border p-2">{mentor.department}</td>
              <td className="border p-2">{mentor.preferred_duration}</td>
              <td className="border p-2">{mentor.internship_mode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MentorFilter;
