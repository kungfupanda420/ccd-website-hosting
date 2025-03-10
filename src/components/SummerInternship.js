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
        const [projectPreference1, setprojectPreference1] = useState("");
        const [projectPreference2, setprojectPreference2] = useState("");
        const [projectPreference3, setprojectPreference3] = useState("");

        const handleCheckboxChange = (value, list, setList) => {
            setList(
                list.includes(value)
                    ? list.filter((item) => item !== value)
                    : [...list, value]
            );
        };
        const handleCg = (e) => {
            const { name, value } = e.target;
            if (value > 10 || value < 0) {
            errors.cgpa10 = "CGPA is invalid";
            }
            setFormData({ ...formData, [name]: value });
        };
        const applyFilter = async (e) => {
            e.preventDefault();
            console.log("Selected Department:", selectedDepartment);
            console.log("Selected Durations:", selectedDurations);
            console.log("Selected Modes:", selectedModes);

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
            projectPreference1: "",
            projectPreference2: "",
            projectPreference3: "",
            statement: "",
            agreeToTerms: false,
            cgpa10: "",
            board10: "",
            cgpa12: "",
            board12: "",
            UG: "",
            currentSemesterCgpa: "",
            dateOfBirth: "",
            permanentAddress: "",
            state: "",
            guardianName: "",
            relation: "",
            guardianPhone: "",
            instituteLocation: "",
            instituteState: "",
            docs: null,
            transactionId: "",
            payment: null,
        });

        const [errors, setErrors] = useState({});
        const [currentStep, setCurrentStep] = useState(1);

        const handleChange = (e) => {
            const { name, value, type, checked, files } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]:
                    type === "checkbox"
                        ? checked
                        : type === "file"
                            ? files[0]
                            : value,
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
            if (!formData.docs) newErrors.docs = "Document file is required";
            //    newErrors.docs = "Document file is required";
            }

            // Step 5: Payment
            if (currentStep === 5) {
                if (!formData.transactionId.trim()) newErrors.transactionId = "Transaction ID is required";
                if (!formData.payment) newErrors.payment = "Payment screenshot is required";
            }

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            setprojectPreference1(selectedRows[0]);
            setprojectPreference2(selectedRows[1]);
            setprojectPreference3(selectedRows[2]);
            formData.projectPreference1 = projectPreference1;
            formData.projectPreference2 = projectPreference2;
            formData.projectPreference3 = projectPreference3;
            console.log("Initial Form Data:", formData);

            // if (validateForm()) {
            if (true) {
                const formDataToSend = new FormData();

                // Append files (ensure field names match backend Multer config)
                if (formData.resume) formDataToSend.append("resume", formData.resume);
                if (formData.statement) formDataToSend.append("statement", formData.statement);
                if (formData.bonafide) formDataToSend.append("bonafide", formData.bonafide);
                if (formData.tenthMarksheet) formDataToSend.append("tenthMarksheet", formData.tenthMarksheet);
                if (formData.twelfthMarksheet) formDataToSend.append("twelfthMarksheet", formData.twelfthMarksheet);
                if (formData.idCard) formDataToSend.append("idCard", formData.idCard);
                if (formData.photo) formDataToSend.append("photo", formData.photo);

                // Append text fields
                for (const key in formData) {
                    if (!(formData[key] instanceof File)) {  // Prevent re-adding files
                        console.log("Key:", key, "Value:", formData[key]);
                        formDataToSend.append(key, formData[key] ?? "");
                    }
                }

                console.log("Form data to send:", formDataToSend.get("photo"));
                try {
                    const response = await axios.post(
                        "http://localhost:5000/submit-application",
                        formDataToSend,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data", // Required for file uploads
                            },
                        }
                    );
                    alert("Form submitted successfully!");
                    console.log(response.data);
                } catch (error) {
                    console.error("Error submitting form:", error);
                    alert("Error submitting form. Please try again.");
                }
            }
            else {
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
            let newErrors = {}; // Use a new object
        
            if (file) {
                // Check file size (less than 50KB)
                if (file.size > 50 * 1024) {
                    newErrors.photo = "File size must be less than 50KB.";
                }
        
                // Check image dimensions (2x2 inches)
                const img = new Image();
                img.src = URL.createObjectURL(file);
        
                img.onload = () => {
                    const width = img.width;
                    const height = img.height;
        
                    const expectedWidth = 2 * 96;
                    const expectedHeight = 2 * 96;
        
                    // Uncomment this if you want strict image size validation
                    // if (width !== expectedWidth || height !== expectedHeight) {
                    //     newErrors.photo = "Photo must be exactly 2x2 inches (192x192 pixels at 96 DPI).";
                    // }
        
                    setErrors({ ...newErrors }); // Ensure new reference
        
                    if (Object.keys(newErrors).length === 0) {
                        console.log("File is valid:", file);
                        const { name, value, type, checked, files } = event.target;
                        setFormData((prev) => ({
                            ...prev,
                            [name]:
                                type === "checkbox"
                                    ? checked
                                    : type === "file"
                                        ? files[0]
                                        : value,
                        }));
                    }
                };
        
                img.onerror = () => {
                    newErrors.photo = "Invalid image file.";
                    setErrors({ ...newErrors });
                };
            } else {
                newErrors.photo = "Please select a file.";
                setErrors({ ...newErrors });
            }


        };
        

        const renderStep = () => {

            switch (currentStep) {
                case 1:
                    return (
                        // <div className="wrapper">
                        <div className="form-section">
                            <h2>Personal Information</h2>
                            <div className="form-group">
                                <label htmlFor="name">Full Name ( As per 10th Certificate)<span className="required">*</span></label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={errors.name ? "error" : ""} />
                                {errors.name && <span className="error-message">{errors.name}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email (personal)<span className="required">*</span></label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? "error" : ""} />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={errors.phone ? "error" : ""} />
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="dateOfBirth">Date of Birth( As per 10th Certificate) <span className="required">*</span></label>
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
                                <label htmlFor="institution">Current Institution Name <span className="required">*</span></label>
                                <input type="text" id="institution" name="institution" value={formData.institution} onChange={handleChange} className={errors.institution ? "error" : ""} />
                                {errors.institution && <span className="error-message">{errors.institution}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="program">Current institution Program <span className="required">*</span></label>
                                <select id="program" name="program" value={formData.program} onChange={handleChange} className={errors.program ? "error" : ""}>
                                    <option value="">Select Program</option>
                                    <option value="B.Tech">B E/B.Tech/B Arch</option>
                                    <option value="M.Tech">M.Tech/M.Plan/M.Arch</option>
                                    <option value="MSc">MSc</option>
                                    <option value="PhD">PhD</option>
                                    {/* <option value="Other">Other</option> */}
                                </select>
                                {errors.program && <span className="error-message">{errors.program}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="department">Department <span className="required">*</span></label>
                                {/* <select id="department" name="department" value={formData.department} onChange={handleChange} className={errors.department ? "error" : ""}> */}
                                <input type="text" id="department" name="department" />
                                {/* </select> */}
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
                                <label htmlFor="currentSemesterCgpa">Current Semester CGPA <span className="required">*</span></label>
                                <input type="text" id="currentSemesterCgpa" name="currentSemesterCgpa" value={formData.currentSemesterCgpa} onChange={handleChange} className={errors.currentSemesterCgpa ? "error" : ""} />
                                {errors.currentSemesterCgpa && <span className="error-message">{errors.currentSemesterCgpa}</span>}
                            </div>
                            <div className="form-group">
                                
                            </div>
                            <div className="form-group">
                                <label htmlFor="UG">(if you are a Mtech/ME/M.Arch student enter your UG CGPA)<br></br> Undergraduate CGPA<span className="required">*</span></label>
                                <input type="text" id="UG" name="UG" value={formData.UG} onChange={handleCg} className={errors.UG ? "error" : ""} />
                                {/* {errors.board12 && <span className="error-message">{errors.board12}</span>} */}
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="cgpa12">12th CGPA(convert the score to a 10 point scale) <span className="required">*</span></label>
                                <input type="text" id="cgpa12" name="cgpa12" value={formData.cgpa12} onChange={handleCg} className={errors.cgpa12 ? "error" : ""} />
                                {errors.cgpa12 && <span className="error-message">{errors.cgpa12}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="board12">12th Board <span className="required">*</span></label>
                                <input type="text" id="board12" name="board12" value={formData.board12} onChange={handleChange} className={errors.board12 ? "error" : ""} />
                                {errors.board12 && <span className="error-message">{errors.board12}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="cgpa10">10th CGPA(convert the score to a 10 point scale) <span className="required">*</span></label>
                                <input type="text" id="cgpa10" name="cgpa10" value={formData.cgpa10} onChange={handleCg} className={errors.cgpa10 ? "error" : ""} />
                                {errors.cgpa10 && <span className="error-message">{errors.cgpa10}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="board10">10th Board <span className="required">*</span></label>
                                <input type="text" id="board10" name="board10" value={formData.board10} onChange={handleChange} className={errors.board10 ? "error" : ""} />
                                {errors.board10 && <span className="error-message">{errors.board10}</span>}
                            </div>  
                        
                        </div>
                    );
                case 3:
                    return (
                        <div className="mentor-filter-container">
                            <h2 className="title">Filter Mentors</h2>

                            {/* Department Selection */}
                            <div className="form-group">
                                <label>Department in which you wish to do the internship:</label>
                                <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                                    <option value="">Select Department</option>
                                    {departments.map((dept) => (
                                        <option key={dept} value={dept}>
                                            {dept}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Preferred Duration Selection */}
                            <div className="form-group">
                                <label>Preferred Duration of Internship:</label>
                                <div className="checkbox-grid">
                                    {durations.map((duration) => (
                                        <label key={duration} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                value={duration}
                                                checked={selectedDurations.includes(duration)}
                                                onChange={() =>
                                                    handleCheckboxChange(duration, selectedDurations, setSelectedDurations)
                                                }
                                            />
                                            <span>{duration}</span>
                                        </label>
                                    ))}
                                </div>
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
        <button type="button" className="apply-button" onClick={applyFilter} disabled={!selectedDepartment || selectedDurations.length === 0 || selectedModes.length === 0}>
            Apply Filter
        </button>

                            {/* Display Results */}
                            {filteredData.length > 0 && (
                                <div className="results-container">
                                    <h3 className="subtitle">Results:</h3>
                                    <div className="table-container">
                                        <table className="mentor-table">
                                            <thead>
                                                <tr>
                                                    <th>Select</th>
                                                    <th>Faculty Name</th>
                                                    <th>Department</th>
                                                    <th>Preferred Duration</th>
                                                    <th>Internship Mode</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredData.map((mentor, index) => (
                                                    <tr key={mentor.id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedRows.includes(mentor.id)}
                                                                onChange={() => handleRowSelection(mentor.id)}
                                                                disabled={selectedRows.length >= 3 && !selectedRows.includes(mentor.id)}
                                                            />
                                                        </td>
                                                        <td>{mentor.faculty_name}</td>
                                                        <td>{mentor.department}</td>
                                                        <td>{mentor.preferred_duration}</td>
                                                        <td>{mentor.internship_mode}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>

                    );
                case 4:
                    return (
                        <div className="form-section">
                            
                            <div className="form-group">
                                <h2>Instructions</h2>
                                <h3>Read the following instructions carefully while uploading the required documents:</h3>
                                <h4>make a file with all the documents below and upload it:</h4>
                                <p>1. Resume</p>
                                <p>2. Statement of Purpose</p>
                                <p>3. Bonafide Certificate</p>
                                <p>4. 12th Marksheet</p>
                                <p>5. 10th Marksheet</p>
                                <p>6.Institute ID Card</p>
                                <p>7. Passport size photo</p>
                                <p>8. UG CGPA</p>
                                <p>9. Current Semester CGPA Grade card/Consolidated grade card</p>

                            
                            </div>
                            <div className="form-group">
                                <label htmlFor="docs">Upload all the documents in a single file <span className="required">*</span></label>
                                <input type="file" id="docs" name="docs" accept=".pdf"  onChange={handleChange} className={errors.docs ? "error" : ""} />
                                {errors.docs && <span className="error-message">{errors.docs}</span>}

                            </div>
                        </div>
                    );
                case 5:
                    return (
                        <div className="form-section">
                            <h2>Payment</h2>
                            <div className='form-group'>
                                <img src="/images/payment.jpg" />
                            </div>
                            <div className="form-group">
                                <label htmlFor='transactionId' >Transaction ID <span className="required">*</span></label>
                                <input type="text" id="transactionId" name="transactionId" value={formData.transactionId} onChange={handleChange} className={errors.transactionId ? "error" : ""} />
                                {errors.transactionId && <span className="error-message">{errors.transactionId}</span>}

                            </div>
                            <div className='form-group'>
                                <label htmlFor='payment' id='payment' >Upload Payment Proof <span className="required">*</span></label>
                                <input type="file" id="payment" name="payment" accept=".jpg,.jpeg,.png" onChange={handleChange} className={errors.payment ? "error" : ""} />
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
                                <label>Year of Study: {formData.year}</label>
                            </div>
                            <div className="form-group">
                                <label>CGPA: {formData.currentSemesterCgpa}</label>
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
                        // </div>
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
                { id: 5, label: "Payment" },
                { id: 6, label: "Review and Submit" },
            ];

            return (
                <div className="progress-bar">
                    {steps.map((step) => (
                        <button
                            key={step.id}
                            className={`progress-step ${currentStep === step.id ? "active" : ""
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
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="summer-form">
                        {renderStep()}
                        <div className="form-actions">
                            <div className="wrap">
                                {currentStep > 1 && (
                                    <button type="button" className="prev-button" onClick={prevStep}>Previous</button>
                                )}
                                {currentStep < 6 && (
                                    <button type="button" className="next-button" onClick={nextStep}>
                                        Next
                                    </button>
                                )}
                            </div>


                            {currentStep === 6 && (
                                <button type="submit" className="submit-button">
                                    Submit Application
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </>
        );
    }

    export default SummerInternship;
