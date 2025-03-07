import React, { useState } from "react";
import "../css/SummerInternship.css";
import axios from "axios";

const departments = [
  "Chemical Engineering",
  "Chemistry",
  "Civil Engineering",
  "Management Studies",
  "Electronics & Communication Engineering",
  "Electrical Engineering",
  "Materials Science and Engineering",
  "Mathematics",
  "Mechanical Engineering",
  "Architecture and Planning",
  "Physics",
  "Humanities, Arts and Social Sciences",
  "Computer Science & Engineering",
];

const durations = ["1", "2", "Any"];
const modes = ["Offline", "Hybrid", "Online"];
function SummerInternship() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedModes, setSelectedModes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (value, list, setList) => {
    setList(
      list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value]
    );
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    institution: "",
    program: "",
    department: "",
    year: "",
    cgpa: "",
    projectPreference1: "",
    projectPreference2: "",
    projectPreference3: "",
    resume: null,
    statement: "",
    agreeToTerms: false,
    cgpa10: "",
    board10: "",
    cgpa12: "",
    board12: "",
    currentSemesterCgpa: "",
    dateOfBirth: "",
    permanentAddress: "",
    state: "",
    guardianName: "",
    relation: "",
    guardianPhone: "",
    instituteLocation: "",
    instituteState: "",
    bonafide: null,
    tenthMarksheet: null,
    twelfthMarksheet: null,
    idCard: null,
    photo: null,
  });

  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Step 1: Personal Information
    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Email is invalid";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      else if (!/^\d{10}$/.test(formData.phone))
        newErrors.phone = "Phone number must be 10 digits";
      if (!formData.dateOfBirth)
        newErrors.dateOfBirth = "Date of Birth is required";
      if (!formData.permanentAddress.trim())
        newErrors.permanentAddress = "Permanent Address is required";
      if (!formData.state.trim()) newErrors.state = "State is required";
      if (!formData.guardianName.trim())
        newErrors.guardianName = "Guardian Name is required";
      if (!formData.relation.trim())
        newErrors.relation = "Relation is required";
      if (!formData.guardianPhone.trim())
        newErrors.guardianPhone = "Guardian Phone is required";
      else if (!/^\d{10}$/.test(formData.guardianPhone))
        newErrors.guardianPhone = "Guardian Phone must be 10 digits";
    }

    // Step 2: Academic Information
    if (currentStep === 2) {
      if (!formData.institution.trim())
        newErrors.institution = "Institution name is required";
      if (!formData.program.trim()) newErrors.program = "Program is required";
      if (!formData.department.trim())
        newErrors.department = "Department is required";
      if (!formData.year.trim()) newErrors.year = "Year of study is required";
      if (!formData.instituteLocation.trim())
        newErrors.instituteLocation = "Institute Location is required";
      if (!formData.instituteState.trim())
        newErrors.instituteState = "Institute State is required";
      if (!formData.cgpa10.trim()) newErrors.cgpa10 = "10th CGPA is required";
      if (!formData.board10.trim())
        newErrors.board10 = "10th Board is required";
      if (!formData.cgpa12.trim()) newErrors.cgpa12 = "12th CGPA is required";
      if (!formData.board12.trim())
        newErrors.board12 = "12th Board is required";
      if (!formData.currentSemesterCgpa.trim())
        newErrors.currentSemesterCgpa = "Current Semester CGPA is required";
    }

    // Step 3: Project Preferences
    if (currentStep === 3) {
      if (!formData.projectPreference1.trim())
        newErrors.projectPreference1 =
          "At least one project preference is required";
    }

        // Step 4: Documents and Statement
        if (currentStep === 4) {
            if (!formData.resume) newErrors.resume = "Resume is required";
            if (!formData.statement) newErrors.statement = "Statement of Purpose is required";
            if (!formData.bonafide) newErrors.bonafide = "Bonafide Certificate is required";
            if (!formData.tenthMarksheet) newErrors.tenthMarksheet = "10th Marksheet is required";
            if (!formData.twelfthMarksheet) newErrors.twelfthMarksheet = "12th Marksheet is required";
            if (!formData.idCard) newErrors.idCard = "ID Card is required";
            if (!formData.photo) newErrors.photo = "Photo is required";
            if(!formData.payment) newErrors.payment = "Payment is required";
        }

        // Step 5: Review and Submit
        if (currentStep === 5) {
           if(!formData.transactionId) newErrors.transactionId = "Transaction ID is required";
              if(!formData.payment) newErrors.payment = "Payment is required";
        }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Form submitted successfully!");
      console.log(formData);
    } else {
      alert("Please fix the errors in the form");
    }
  };

  const nextStep = () => {
    if (validateForm()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const departments = [
    "Computer Science & Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Physics",
    "Chemistry",
    "Mathematics",
    "Other",
  ];

    const projects = [
        "Machine Learning for Image Recognition",
        "Renewable Energy Systems",
        "Structural Analysis of Materials",
        "Quantum Computing Algorithms",
        "Natural Language Processing",
        "Robotics and Automation",
        "Environmental Engineering",
        "Data Science and Analytics",
        "Blockchain Technology",
        "Internet of Things (IoT)",
    ];
    const handlehange = (event) => {
        const file = event.target.files[0];
        const errors = {};
    
        if (file) {
            // Check file size (less than 50KB)
            if (file.size > 50 * 1024) { // 50KB in bytes
                errors.photo = "File size must be less than 50KB.";
            }
    
            // Check image dimensions (2x2 inches)
            const img = new Image();
            img.src = URL.createObjectURL(file);
    
            img.onload = () => {
                const width = img.width;
                const height = img.height;
    
                // Assuming 96 DPI (standard screen resolution)
                const expectedWidth = 2 * 96; // 2 inches * 96 DPI
                const expectedHeight = 2 * 96; // 2 inches * 96 DPI
    
                if (width !== expectedWidth || height !== expectedHeight) {
                    errors.photo = "Photo must be exactly 2x2 inches (192x192 pixels at 96 DPI).";
                }
    
                // Update errors state
                setErrors(errors);
    
                // If no errors, proceed with file upload
                if (Object.keys(errors).length === 0) {
                    // Handle valid file upload
                    console.log("File is valid:", file);
                }
            };
    
            img.onerror = () => {
                errors.photo = "Invalid image file.";
                setErrors(errors);
            };
        } else {
            errors.photo = "Please select a file.";
            setErrors(errors);
        }
    };
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="form-section">
                        <h2>Personal Information</h2>
                        <div className="form-group">
                            <label htmlFor="name">Full Name <span className="required">*</span></label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={errors.name ? "error" : ""} />
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email <span className="required">*</span></label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? "error" : ""} />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={errors.phone ? "error" : ""} />
                            {errors.phone && <span className="error-message">{errors.phone}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateOfBirth">Date of Birth <span className="required">*</span></label>
                            <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className={errors.dateOfBirth ? "error" : ""} />
                            {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="permanentAddress">Permanent Address <span className="required">*</span></label>
                            <input type="text" id="permanentAddress" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} className={errors.permanentAddress ? "error" : ""} />
                            {errors.permanentAddress && <span className="error-message">{errors.permanentAddress}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">State <span className="required">*</span></label>
                            <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className={errors.state ? "error" : ""} />
                            {errors.state && <span className="error-message">{errors.state}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="guardianName">Guardian Name <span className="required">*</span></label>
                            <input type="text" id="guardianName" name="guardianName" value={formData.guardianName} onChange={handleChange} className={errors.guardianName ? "error" : ""} />
                            {errors.guardianName && <span className="error-message">{errors.guardianName}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="relation">Relation <span className="required">*</span></label>
                            <input type="text" id="relation" name="relation" value={formData.relation} onChange={handleChange} className={errors.relation ? "error" : ""} />
                            {errors.relation && <span className="error-message">{errors.relation}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="guardianPhone">Guardian Phone Number <span className="required">*</span></label>
                            <input type="tel" id="guardianPhone" name="guardianPhone" value={formData.guardianPhone} onChange={handleChange} className={errors.guardianPhone ? "error" : ""} />
                            {errors.guardianPhone && <span className="error-message">{errors.guardianPhone}</span>}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="form-section">
                        <h2>Academic Information</h2>
                        <div className="form-group">
                            <label htmlFor="institution">Institution Name <span className="required">*</span></label>
                            <input type="text" id="institution" name="institution" value={formData.institution} onChange={handleChange} className={errors.institution ? "error" : ""} />
                            {errors.institution && <span className="error-message">{errors.institution}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="program">Program <span className="required">*</span></label>
                            <select id="program" name="program" value={formData.program} onChange={handleChange} className={errors.program ? "error" : ""}>
                                <option value="">Select Program</option>
                                <option value="B.Tech">B.Tech</option>
                                <option value="M.Tech">M.Tech</option>
                                <option value="MSc">MSc</option>
                                <option value="PhD">PhD</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.program && <span className="error-message">{errors.program}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="department">Department <span className="required">*</span></label>
                            <select id="department" name="department" value={formData.department} onChange={handleChange} className={errors.department ? "error" : ""}>
                                <option value="">Select Department</option>
                                {departments.map((dept, index) => (
                                    <option key={index} value={dept}>{dept}</option>
                                ))}
                            </select>
                            {errors.department && <span className="error-message">{errors.department}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="year">Year of Study <span className="required">*</span></label>
                            <select id="year" name="year" value={formData.year} onChange={handleChange} className={errors.year ? "error" : ""}>
                                <option value="">Select Year</option>
                                <option value="1">1st Year</option>
                                <option value="2">2nd Year</option>
                                <option value="3">3rd Year</option>
                                <option value="4">4th Year</option>
                                <option value="5">5th Year</option>
                            </select>
                            {errors.year && <span className="error-message">{errors.year}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="instituteLocation">Institute Location <span className="required">*</span></label>
                            <input type="text" id="instituteLocation" name="instituteLocation" value={formData.instituteLocation} onChange={handleChange} className={errors.instituteLocation ? "error" : ""} />
                            {errors.instituteLocation && <span className="error-message">{errors.instituteLocation}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="instituteState">Institute State <span className="required">*</span></label>
                            <input type="text" id="instituteState" name="instituteState" value={formData.instituteState} onChange={handleChange} className={errors.instituteState ? "error" : ""} />
                            {errors.instituteState && <span className="error-message">{errors.instituteState}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="cgpa10">10th CGPA <span className="required">*</span></label>
                            <input type="text" id="cgpa10" name="cgpa10" value={formData.cgpa10} onChange={handleChange} className={errors.cgpa10 ? "error" : ""} />
                            {errors.cgpa10 && <span className="error-message">{errors.cgpa10}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="board10">10th Board <span className="required">*</span></label>
                            <input type="text" id="board10" name="board10" value={formData.board10} onChange={handleChange} className={errors.board10 ? "error" : ""} />
                            {errors.board10 && <span className="error-message">{errors.board10}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="cgpa12">12th CGPA <span className="required">*</span></label>
                            <input type="text" id="cgpa12" name="cgpa12" value={formData.cgpa12} onChange={handleChange} className={errors.cgpa12 ? "error" : ""} />
                            {errors.cgpa12 && <span className="error-message">{errors.cgpa12}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="board12">12th Board <span className="required">*</span></label>
                            <input type="text" id="board12" name="board12" value={formData.board12} onChange={handleChange} className={errors.board12 ? "error" : ""} />
                            {errors.board12 && <span className="error-message">{errors.board12}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="currentSemesterCgpa">Current Semester CGPA <span className="required">*</span></label>
                            <input type="text" id="currentSemesterCgpa" name="currentSemesterCgpa" value={formData.currentSemesterCgpa} onChange={handleChange} className={errors.currentSemesterCgpa ? "error" : ""} />
                            {errors.currentSemesterCgpa && <span className="error-message">{errors.currentSemesterCgpa}</span>}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="p-4" style={{ paddingTop: "50px" }}>
<div className='form-group'>
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
      </select></div>

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
      <div className="form-group">
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
            case 4:
                return (
                    <div className="form-section">
                        <h2>Documents and Statement</h2>
                        <div className="form-group">
                            <label htmlFor="resume">Resume (PDF only) <span className="required">*</span></label>
                            <input type="file" id="resume" name="resume" accept=".pdf" onChange={handleChange} className={errors.resume ? "error" : ""} />
                            {errors.resume && <span className="error-message">{errors.resume}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="statement">Statement of Purpose (PDF only) <span className="required">*</span></label>
                            <input type="file" id="statement" name="statement" accept=".pdf" onChange={handleChange} className={errors.statement ? "error" : ""} />
                            {errors.statement && <span className="error-message">{errors.statement}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="bonafide">Bonafide Certificate (PDF only) <span className="required">*</span></label>
                            <input type="file" id="bonafide" name="bonafide" accept=".pdf" onChange={handleChange} className={errors.bonafide ? "error" : ""} />
                            {errors.bonafide && <span className="error-message">{errors.bonafide}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="tenthMarksheet">10th Marksheet (PDF only) <span className="required">*</span></label>
                            <input type="file" id="tenthMarksheet" name="tenthMarksheet" accept=".pdf" onChange={handleChange} className={errors.tenthMarksheet ? "error" : ""} />
                            {errors.tenthMarksheet && <span className="error-message">{errors.tenthMarksheet}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="twelthMarksheet">12th Marksheet (PDF only) <span className="required">*</span></label>
                            <input type="file" id="twelfthMarksheet" name="twelthMarksheet" accept=".pdf" onChange={handleChange} className={errors.twelfthMarksheet ? "error" : ""} />
                            {errors.twelthMarksheet && <span className="error-message">{errors.twelthMarksheet}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="idCard">ID Card (PDF only) <span className="required">*</span></label>
                            <input type="file" id="idCard" name="idCard" accept=".pdf" onChange={handleChange} className={errors.idCard ? "error" : ""} />
                            {errors.idCard && <span className="error-message">{errors.idCard}</span>}
                        </div>
                        <div className="form-group">
    <label htmlFor="photo">Photo (Passport Size: 2x2 inches, less than 50KB) <span className="required">*</span></label>
    <input
        type="file"
        id="photo"
        name="photo"
        accept=".jpg,.jpeg,.png"
        onChange={handlehange}
        className={errors.photo ? "error" : ""}
    />
    {errors.photo && <span className="error-message">{errors.photo}</span>}
</div>
                    </div>
                );
            case 5:
                return (
                    <div className="form-section">
                        <h2>Payment</h2>
                        <div className='form-group'>
                            <img src="/images/payment.jpg"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor='transaction-id' >Transaction ID <span className="required">*</span></label>
                            <input type="text" id="transaction-id" name="transaction-id" value={formData.transactionId} onChange={handleChange} className={errors.transactionId ? "error" : ""} />
                            {errors.transactionId && <span className="error-message">{errors.transactionId}</span>}
                          
                        </div>
                        <div className='form-group'>
                        <label htmlFor='payment-screenshot' id='payment-screenshot'></label>
                           <input type="file" id="payment-screenshot" name="payment-screenshot" accept=".jpg,.jpeg,.png" onChange={handleChange} className={errors.payment ? "error" : ""} />
                            {errors.payment && <span className="error-message">{errors.payment}</span>}
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="form-section">
                        <h2>Review and Submit</h2>
                        <div className="form-group">
                            <label>Full Name: {formData.name}</label>
                        </div>
                        <div className="form-group">
                            <label>Email: {formData.email}</label>
                        </div>
                        <div className="form-group">
                            <label>Phone Number: {formData.phone}</label>
                        </div>
                        <div className="form-group">
                            <label>Institution: {formData.institution}</label>
                        </div>
                        <div className="form-group">
                            <label>Program: {formData.program}</label>
                        </div>
                        <div className="form-group">
                            <label>Department: {formData.department}</label>
                        </div>
                        <div className="form-group">
                            <label>Year of Study: { formData.year}</label>
                        </div>
                        <div className="form-group">
                            <label>CGPA: {formData.cgpa}</label>
                        </div>
                        <div className="form-group">
                            <label>Project Preference 1: {formData.projectPreference1}</label>
                        </div>
                        <div className="form-group">
                            <label>Project Preference 2: {formData.projectPreference2}</label>
                        </div>
                        <div className="form-group">
                            <label>Project Preference 3: {formData.projectPreference3}</label>
                        </div>
                        <div className="form-group">
                            <label>Resume: {formData.resume ? formData.resume.name : "No file selected"}</label>
                        </div>
                        <div className="form-group">
                            <label>Statement of Purpose: {formData.statement ? formData.statement.name : "No file selected"}</label>
                        </div>
                        <div className="form-group">
                            <label>Bonafide Certificate: {formData.bonafide ? formData.bonafide.name : "No file selected"}</label>
                        </div>
                        <div className="form-group">
                            <label>10th Marksheet: {formData.tenthMarksheet ? formData.tenthMarksheet.name : "No file selected"}</label>
                        </div>
                        <div className="form-group">
                            <label>12th Marksheet: {formData.twelfthMarksheet ? formData.twelfthMarksheet.name : "No file selected"}</label>
                        </div>
                        <div className="form-group">
                            <label>ID Card: {formData.idCard ? formData.idCard.name : "No file selected"}</label>
                        </div>
                        <div className="form-group">
                            <label>Photo: {formData.photo ? formData.photo.name : "No file selected"}</label>
                        </div>
                        <div className="form-group checkbox-group">
                            <input type="checkbox" id="agreeToTerms" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} className={errors.agreeToTerms ? "error" : ""} />
                            <label htmlFor="agreeToTerms">I certify that the information provided is accurate and complete. I understand that any false information may result in the rejection of my application. <span className="required">*</span></label>
                            {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderProgress = () => {
        const steps = [
            { id: 1, label: "Personal Information" },
            { id: 2, label: "Academic Information" },
            { id: 3, label: "Project Preferences" },
            { id: 4, label: "Documents and Statement" },
            { id: 5, label: "payment" },
            { id: 6,label: "Review and Submit"},
        ];

    return (
      <div className="progress-bar">
        {steps.map((step) => (
          <button
            key={step.id}
            className={`progress-step ${
              currentStep === step.id ? "active" : ""
            } ${currentStep > step.id ? "completed" : ""}`}
            onClick={() => goToStep(step.id)}
          >
            {step.label}
          </button>
        ))}
      </div>
    );
  };

    return (
        <>
            <div className="form-container">
                {renderProgress()}
                <form onSubmit={handleSubmit} className="summer-form">
                    {renderStep()}
                    <div className="form-actions">
                        {currentStep > 1 && (
                            <button type="button" className="prev-button" onClick={prevStep}>Previous</button>
                        )}
                        {currentStep < 6 && (
                            <button type="button" className="next-button" onClick={nextStep}>Next</button>
                        )}
                        
                        {currentStep === 6 && (
                            <button type="submit" className="submit-button">Submit Application</button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}

export default SummerInternship;
