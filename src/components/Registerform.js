import React, { useState } from "react";
import '../css/Registerform.css';
import { useEffect } from "react";

function Registerform() {
  const [step, setStep] = useState(1);
  const [registrationOpen, setRegistrationOpen] = useState(false);
const [loadingStatus, setLoadingStatus] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    address: "",
    state: "",
    guardianName: "",
    guardianRelation: "",
    guardianPhone: "",
    profilePhoto: null,
    institution: "",
    program: "",
    department: "",
    year: "",
    instituteLocation: "",
    instituteState: "",
    currentSemesterCgpa: "",
    UG: "",
    cgpa12: "",
    board12: "",
    cgpa10: "",
    board10: "",
    adhaar_id: "",
    apaar_id: "",
    student_college_idcard_path: null,
    documents_path: null,
    role: "student"
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };
useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        const response = await fetch("/api/students/allow_reg_status", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        
        if (!response.ok) {
          throw new Error("Failed to check registration status");
        }
        
        const data = await response.json();
        setRegistrationOpen(data.allow_reg);
      } catch (error) {
        console.error("Error checking registration status:", error);
        // Default to false if there's an error
        setRegistrationOpen(false);
      } finally {
        setLoadingStatus(false);
      }
    };

    checkRegistrationStatus();
  }, []);
  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required.";
      if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = "Valid 10-digit phone number is required.";
      if (!formData.dob) newErrors.dob = "Date of birth is required.";
      if (!formData.address.trim()) newErrors.address = "Address is required.";
      if (!formData.state.trim()) newErrors.state = "State is required.";
      if (!formData.guardianName.trim()) newErrors.guardianName = "Guardian name is required.";
      if (!formData.guardianRelation.trim()) newErrors.guardianRelation = "Guardian relation is required.";
      if (!/^[0-9]{10}$/.test(formData.guardianPhone)) newErrors.guardianPhone = "Valid 10-digit guardian phone number is required.";
    } else if (step === 2) {
      if (!formData.profilePhoto) newErrors.profilePhoto = "Profile photo is required.";
    } else if (step === 3) {
      if (!formData.institution.trim()) newErrors.institution = "Institution is required.";
      if (!formData.program.trim()) newErrors.program = "Program is required.";
      if (!formData.department.trim()) newErrors.department = "Department is required.";
      if (!formData.year.trim()) newErrors.year = "Year is required.";
      if (!formData.instituteLocation.trim()) newErrors.instituteLocation = "Institute location is required.";
      if (!formData.instituteState.trim()) newErrors.instituteState = "Institute state is required.";
      if (!formData.currentSemesterCgpa.trim()) newErrors.currentSemesterCgpa = "Current semester CGPA is required.";
      if (!formData.UG.trim()) newErrors.UG = "UG details are required.";
      if (!formData.cgpa12.trim()) newErrors.cgpa12 = "12th CGPA is required.";
      if(!formData.cgpa12 || isNaN(formData.cgpa12) || formData.cgpa12 < 0 || formData.cgpa12 > 10) newErrors.cgpa12 = "Valid 12th CGPA (0-10) is required."; 
      if (!formData.board12.trim()) newErrors.board12 = "12th board is required.";
      if (!formData.cgpa10.trim()) newErrors.cgpa10 = "10th CGPA is required.";
      if(!formData.cgpa10 || isNaN(formData.cgpa10) || formData.cgpa10 < 0 || formData.cgpa10 > 10) newErrors.cgpa10 = "Valid 10th CGPA (0-10) is required.";
      if (!formData.board10.trim()) newErrors.board10 = "10th board is required.";
    } else if (step === 4) {
      if (!formData.adhaar_id.trim()) newErrors.adhaar_id = "Aadhaar number is required.";
      if (!formData.apaar_id.trim()) newErrors.apaar_id = "APAAR ID is required.";
      if(!/^[0-9]{12}$/.test(formData.adhaar_id)) newErrors.adhaar_id = "Valid 12-digit Aadhaar number is required.";
      if (!/^[0-9]{13}$/.test(formData.apaar_id)) newErrors.apaar_id = "Valid 13-digit APAAR ID is required.";
      if (!formData.student_college_idcard_path) newErrors.student_college_idcard_path = "Student college ID card is required.";
      if (!formData.documents_path) newErrors.documents_path = "Documents are required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step !== 5) return;

    if (!window.confirm("Are you sure you want to submit your registration?")) return;

    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("phone", formData.phone);
      form.append("dob", formData.dob);
      form.append("address", formData.address);
      form.append("state", formData.state);
      form.append("guardianName", formData.guardianName);
      form.append("guardianRelation", formData.guardianRelation);
      form.append("guardianPhone", formData.guardianPhone);
      form.append("institution", formData.institution);
      form.append("program", formData.program);
      form.append("department", formData.department);
      form.append("year", formData.year);
      form.append("instituteLocation", formData.instituteLocation);
      form.append("instituteState", formData.instituteState);
      form.append("currentSemesterCgpa", formData.currentSemesterCgpa);
      form.append("UG", formData.UG);
      form.append("cgpa12", formData.cgpa12);
      form.append("board12", formData.board12);
      form.append("cgpa10", formData.cgpa10);
      form.append("board10", formData.board10);
      form.append("adhaar_id", formData.adhaar_id);
      form.append("apaar_id", formData.apaar_id);
      form.append("reg_payment_conf", true); // Required by backend
      if (formData.profilePhoto) form.append("profilePhoto", formData.profilePhoto);
      if (formData.student_college_idcard_path) form.append("student_college_idcard", formData.student_college_idcard_path);
      if (formData.documents_path) form.append("documents", formData.documents_path);

      const response = await fetch("/api/students/register", {
        method: "POST",
        body: form,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || data.message || "Registration failed");

      // Reset form
      setFormData({
        name: "",
        phone: "",
        dob: "",
        address: "",
        state: "",
        guardianName: "",
        guardianRelation: "",
        guardianPhone: "",
        profilePhoto: null,
        institution: "",
        program: "",
        department: "",
        year: "",
        instituteLocation: "",
        instituteState: "",
        currentSemesterCgpa: "",
        UG: "",
        cgpa12: "",
        board12: "",
        cgpa10: "",
        board10: "",
        adhaar_id: "",
        apaar_id: "",
        student_college_idcard_path: null,
        documents_path: null,
        role: "student"
      });
      
      window.location.href = "/candidatedashboard"; 
      alert("Registration successful!");
    } catch (error) {
      alert("Registration failed: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

    if (!registrationOpen) {
    return (
      <div className="register-container">
        <div className="registration-closed-message">
          <h2>Registrations are currently closed</h2>
          <p>We will notify you via email when registrations open.</p>
         
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="progress-bar">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Personal</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Photo</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Academic</div>
        <div className={`step ${step >= 4 ? 'active' : ''}`}>4. IDs</div>
        <div className={`step ${step >= 5 ? 'active' : ''}`}>5. Review</div>
      </div>
      <form onSubmit={handleSubmit} className="registration-form">
        {/* Step 1: Personal */}
        {step === 1 && (
          <div className="form-step">
            <h2>Personal Information</h2>
            <div className="form-group">
              <label>Full Name*</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className={errors.name ? 'error' : ''} />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label>Phone Number*</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={errors.phone ? 'error' : ''} />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label>Date of Birth*</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={errors.dob ? 'error' : ''} />
              {errors.dob && <span className="error-text">{errors.dob}</span>}
            </div>
            <div className="form-group">
              <label>Address*</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className={errors.address ? 'error' : ''} />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>
            <div className="form-group">
              <label>State*</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} className={errors.state ? 'error' : ''} />
              {errors.state && <span className="error-text">{errors.state}</span>}
            </div>
            <div className="form-group">
              <label>Guardian Name*</label>
              <input type="text" name="guardianName" value={formData.guardianName} onChange={handleChange} className={errors.guardianName ? 'error' : ''} />
              {errors.guardianName && <span className="error-text">{errors.guardianName}</span>}
            </div>
            <div className="form-group">
              <label>Guardian Relation*</label>
              <input type="text" name="guardianRelation" value={formData.guardianRelation} onChange={handleChange} className={errors.guardianRelation ? 'error' : ''} />
              {errors.guardianRelation && <span className="error-text">{errors.guardianRelation}</span>}
            </div>
            <div className="form-group">
              <label>Guardian Phone*</label>
              <input type="tel" name="guardianPhone" value={formData.guardianPhone} onChange={handleChange} className={errors.guardianPhone ? 'error' : ''} />
              {errors.guardianPhone && <span className="error-text">{errors.guardianPhone}</span>}
            </div>
          </div>
        )}

        {/* Step 2: Photo */}
        {step === 2 && (
          <div className="form-step">
            <h2>Profile Photo</h2>
            <div className="form-group">
              <label>Upload Profile Photo*</label>
              <input type="file" name="profilePhoto" onChange={handleChange} accept="image/*" className={errors.profilePhoto ? 'error' : ''} />
              {errors.profilePhoto && <span className="error-text">{errors.profilePhoto}</span>}
            </div>
          </div>
        )}

        {/* Step 3: Academic */}
        {step === 3 && (
          <div className="form-step">
            <h2>Academic Information</h2>
            <div className="form-group">
              <label>Institution*</label>
              <input type="text" name="institution" value={formData.institution} onChange={handleChange} className={errors.institution ? 'error' : ''} />
              {errors.institution && <span className="error-text">{errors.institution}</span>}
            </div>
            <div className="form-group">
              <label>Program*</label>
              <input type="text" name="program" value={formData.program} onChange={handleChange} className={errors.program ? 'error' : ''} />
              {errors.program && <span className="error-text">{errors.program}</span>}
            </div>
            <div className="form-group">
              <label>Department*</label>
              <input type="text" name="department" value={formData.department} onChange={handleChange} className={errors.department ? 'error' : ''} />
              {errors.department && <span className="error-text">{errors.department}</span>}
            </div>
            <div className="form-group">
              <label>Year*</label>
              <input type="text" name="year" value={formData.year} onChange={handleChange} className={errors.year ? 'error' : ''} />
              {errors.year && <span className="error-text">{errors.year}</span>}
            </div>
            <div className="form-group">
              <label>Institute Location*</label>
              <input type="text" name="instituteLocation" value={formData.instituteLocation} onChange={handleChange} className={errors.instituteLocation ? 'error' : ''} />
              {errors.instituteLocation && <span className="error-text">{errors.instituteLocation}</span>}
            </div>
            <div className="form-group">
              <label>Institute State*</label>
              <input type="text" name="instituteState" value={formData.instituteState} onChange={handleChange} className={errors.instituteState ? 'error' : ''} />
              {errors.instituteState && <span className="error-text">{errors.instituteState}</span>}
            </div>
            <div className="form-group">
              <label>Current Semester CGPA*</label>
              <input type="text" name="currentSemesterCgpa" value={formData.currentSemesterCgpa} onChange={handleChange} className={errors.currentSemesterCgpa ? 'error' : ''} />
              {errors.currentSemesterCgpa && <span className="error-text">{errors.currentSemesterCgpa}</span>}
            </div>
            <div className="form-group">
              <label>UG Details*</label>
              <input type="text" name="UG" value={formData.UG} onChange={handleChange} className={errors.UG ? 'error' : ''} />
              {errors.UG && <span className="error-text">{errors.UG}</span>}
            </div>
            <div className="form-group">
              <label>12th CGPA*</label>
              <input type="text" name="cgpa12" value={formData.cgpa12} onChange={handleChange} className={errors.cgpa12 ? 'error' : ''} />
              {errors.cgpa12 && <span className="error-text">{errors.cgpa12}</span>}
            </div>
            <div className="form-group">
              <label>12th Board*</label>
              <input type="text" name="board12" value={formData.board12} onChange={handleChange} className={errors.board12 ? 'error' : ''} />
              {errors.board12 && <span className="error-text">{errors.board12}</span>}
            </div>
            <div className="form-group">
              <label>10th CGPA*</label>
              <input type="text" name="cgpa10" value={formData.cgpa10} onChange={handleChange} className={errors.cgpa10 ? 'error' : ''} />
              {errors.cgpa10 && <span className="error-text">{errors.cgpa10}</span>}
            </div>
            <div className="form-group">
              <label>10th Board*</label>
              <input type="text" name="board10" value={formData.board10} onChange={handleChange} className={errors.board10 ? 'error' : ''} />
              {errors.board10 && <span className="error-text">{errors.board10}</span>}
            </div>
          </div>
        )}

        {/* Step 4: Aadhaar and APAAR ID */}
        {step === 4 && (
          <div className="form-step">
            <h2>Aadhaar and APAAR ID</h2>
            <div className="form-group">
              <label>Aadhaar Number*</label>
              <input type="text" name="adhaar_id" value={formData.adhaar_id} onChange={handleChange} className={errors.adhaar_id ? 'error' : ''} />
              {errors.adhaar_id && <span className="error-text">{errors.adhaar_id}</span>}
            </div>
            <div className="form-group">
              <label>APAAR ID*</label>
              <input type="text" name="apaar_id" value={formData.apaar_id} onChange={handleChange} className={errors.apaar_id ? 'error' : ''} />
              {errors.apaar_id && <span className="error-text">{errors.apaar_id}</span>}
            </div>
            <div className="form-group">
              <label>Student College ID Card*</label>
              <input type="file" name="student_college_idcard_path" onChange={handleChange} accept="image/*,application/pdf" className={errors.student_college_idcard_path ? 'error' : ''} />
              {errors.student_college_idcard_path && <span className="error-text">{errors.student_college_idcard_path}</span>}
            </div>
            <div className="form-group">
              <label>Other Documents (all marksheets in your UG and all the certificates)</label>
              <input type="file" name="documents_path" onChange={handleChange} accept="image/*,application/pdf" />
              {errors.documents_path && <span className="error-text">{errors.documents_path}</span>}

            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div className="form-step">
            <h2>Review Your Information</h2>
            <div className="review-section">
              <h3>Personal Information</h3>
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Date of Birth:</strong> {formData.dob}</p>
              <p><strong>Address:</strong> {formData.address}</p>
              <p><strong>State:</strong> {formData.state}</p>
              <p><strong>Guardian Name:</strong> {formData.guardianName}</p>
              <p><strong>Guardian Relation:</strong> {formData.guardianRelation}</p>
              <p><strong>Guardian Phone:</strong> {formData.guardianPhone}</p>
              <h3>Academic Information</h3>
              <p><strong>Institution:</strong> {formData.institution}</p>
              <p><strong>Program:</strong> {formData.program}</p>
              <p><strong>Department:</strong> {formData.department}</p>
              <p><strong>Year:</strong> {formData.year}</p>
              <p><strong>Institute Location:</strong> {formData.instituteLocation}</p>
              <p><strong>Institute State:</strong> {formData.instituteState}</p>
              <p><strong>Current Semester CGPA:</strong> {formData.currentSemesterCgpa}</p>
              <p><strong>UG Details:</strong> {formData.UG}</p>
              <p><strong>12th CGPA:</strong> {formData.cgpa12}</p>
              <p><strong>12th Board:</strong> {formData.board12}</p>
              <p><strong>10th CGPA:</strong> {formData.cgpa10}</p>
              <p><strong>10th Board:</strong> {formData.board10}</p>
              <h3>IDs</h3>
              <p><strong>Aadhaar Number:</strong> {formData.adhaar_id}</p>
              <p><strong>APAAR ID:</strong> {formData.apaar_id}</p>
              <p><strong>Student College ID Card:</strong> {formData.student_college_idcard_path ? formData.student_college_idcard_path.name : "Not uploaded"}</p>
              <p><strong>Other Documents:</strong> {formData.documents_path ? formData.documents_path.name : "Not uploaded"}</p>
            </div>
          </div>
        )}

        <div className="form-navigation">
          {step > 1 && (
            <button type="button" onClick={handleBack} className="back-button">
              Back
            </button>
          )}
          {step < 5 ? (
            <button type="button" onClick={handleNext} className="next-button">
              Next
            </button>
          ) : (
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Registration'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Registerform;
