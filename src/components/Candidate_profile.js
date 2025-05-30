import React, { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";
import "../css/CandidateProfile.css";
import { useNavigate } from "react-router-dom";

function CandidateProfile() {
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [regPaymentScreenshot, setRegPaymentScreenshot] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewProfilePhoto, setPreviewProfilePhoto] = useState(null);
  const [previewPaymentScreenshot, setPreviewPaymentScreenshot] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidate = async () => {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in.");
        setLoading(false);
        return;
      }
      try {
        const res = await authFetch("/api/students/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setCandidate(data);
          setForm({
            name: data.name || "",
            phone: data.phone || "",
            dob: data.dob || "",
            address: data.address || "",
            state: data.state || "",
            guardianName: data.guardianName || "",
            guardianRelation: data.guardianRelation || "",
            guardianPhone: data.guardianPhone || "",
            institution: data.institution || "",
            program: data.program || "",
            department: data.department || "",
            year: data.year || "",
            instituteLocation: data.instituteLocation || "",
            instituteState: data.instituteState || "",
            currentSemesterCgpa: data.currentSemesterCgpa || "",
            UG: data.UG || "",
            cgpa12: data.cgpa12 || "",
            board12: data.board12 || "",
            cgpa10: data.cgpa10 || "",
            board10: data.board10 || "",
            regPayment: data.regPayment || "",
            paymentStatus: data.paymentStatus || "",
            adhaar_id: data.adhaar_id || "",
          });
          
          // Set preview URLs if files exist
          if (data.profilePhotoPath) {
            setPreviewProfilePhoto(`/${data.profilePhotoPath}?${Date.now()}`);
          }
          if (data.regPaymentScreenshotPath) {
            setPreviewPaymentScreenshot(`/${data.regPaymentScreenshotPath}?${Date.now()}`);
          }
        } else {
          const err = await res.json();
          setError(err.detail || "Failed to fetch profile.");
        }
      } catch (e) {
        setError("Network error.");
      }
      setLoading(false);
    };
    fetchCandidate();
  }, []);

  const handleEditChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "regPaymentScreenshot") {
      const file = e.target.files[0];
      setRegPaymentScreenshot(file);
      setPreviewPaymentScreenshot(file ? URL.createObjectURL(file) : null);
    }
    if (e.target.name === "profilePhoto") {
      const file = e.target.files[0];
      setProfilePhoto(file);
      setPreviewProfilePhoto(file ? URL.createObjectURL(file) : null);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      
      // Append all form fields
      for (const key in form) {
        if (form[key] !== undefined && form[key] !== null) {
          formData.append(key, form[key]);
        }
      }
      
      if (regPaymentScreenshot) {
        formData.append("regPaymentScreenshot", regPaymentScreenshot);
      }
      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }
      
      const res = await authFetch("/api/students/me/edit", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (res.ok) {
        const updated = await res.json();
        setCandidate(updated);
        setEditMode(false);
        setRegPaymentScreenshot(null);
        setProfilePhoto(null);
        
        // Update preview URLs with cache-busting query param
        if (updated.profilePhotoPath) {
          setPreviewProfilePhoto(`/${updated.profilePhotoPath}?${Date.now()}`);
        }
        if (updated.regPaymentScreenshotPath) {
          setPreviewPaymentScreenshot(`/${updated.regPaymentScreenshotPath}?${Date.now()}`);
        }
        
        // Force refresh of dashboard data
        localStorage.setItem('profileUpdated', Date.now().toString());
      } else {
        const err = await res.json();
        setError(err.detail || "Failed to update profile.");
      }
    } catch (e) {
      setError("Network error.");
    }
    setLoading(false);
  };

  if (loading) return <div className="candidate-profile"><h2>Loading...</h2></div>;
  if (error) return <div className="candidate-profile"><h2>{error}</h2></div>;
  if (!candidate) return null;

  return (
    <div className="candidate-profile">
      <h1>Candidate Profile</h1>
      {!editMode ? (
        <>
          <div className="profile-header">
            {previewProfilePhoto && (
              <div className="profile-photo-container">
                <img 
                  src={previewProfilePhoto} 
                  alt="Profile" 
                  className="profile-photo"
                />
              </div>
            )}
            <div className="profile-basic-info">
              <h2>{candidate.name}</h2>
              <div><strong>Email:</strong> {candidate.user?.email}</div>
              <div><strong>SIP ID:</strong> {candidate.sip_id}</div>
            </div>
          </div>
          
          <div className="profile-fields">
            <div className="profile-section">
              <h3>Personal Information</h3>
              <div><strong>Phone:</strong> {candidate.phone}</div>
              <div><strong>DOB:</strong> {candidate.dob}</div>
              <div><strong>Address:</strong> {candidate.address}</div>
              <div><strong>State:</strong> {candidate.state}</div>
              <div><strong>Aadhaar ID:</strong> {candidate.adhaar_id}</div>
            </div>
            
            <div className="profile-section">
              <h3>Guardian Information</h3>
              <div><strong>Guardian Name:</strong> {candidate.guardianName}</div>
              <div><strong>Guardian Relation:</strong> {candidate.guardianRelation}</div>
              <div><strong>Guardian Phone:</strong> {candidate.guardianPhone}</div>
            </div>
            
            <div className="profile-section">
              <h3>Academic Information</h3>
              <div><strong>Institution:</strong> {candidate.institution}</div>
              <div><strong>Program:</strong> {candidate.program}</div>
              <div><strong>Department:</strong> {candidate.department}</div>
              <div><strong>Year:</strong> {candidate.year}</div>
              <div><strong>Institute Location:</strong> {candidate.instituteLocation}</div>
              <div><strong>Institute State:</strong> {candidate.instituteState}</div>
              <div><strong>Current Semester CGPA:</strong> {candidate.currentSemesterCgpa}</div>
              <div><strong>UG:</strong> {candidate.UG}</div>
              <div><strong>12th CGPA:</strong> {candidate.cgpa12}</div>
              <div><strong>12th Board:</strong> {candidate.board12}</div>
              <div><strong>10th CGPA:</strong> {candidate.cgpa10}</div>
              <div><strong>10th Board:</strong> {candidate.board10}</div>
            </div>
            
            <div className="profile-section">
              <h3>Payment Information</h3>
              <div><strong>Registration Payment:</strong> {candidate.regPayment}</div>
              <div><strong>Payment Status:</strong> {candidate.paymentStatus}</div>
              <div>
                <strong>Payment Screenshot:</strong>{" "}
                {previewPaymentScreenshot && (
                  <a href={previewPaymentScreenshot} target="_blank" rel="noopener noreferrer">
                    View Screenshot
                  </a>
                )}
              </div>
            </div>
          </div>
          
          <div className="profile-actions">
            <button className="edit-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
            <button className="dashboard-btn" onClick={() => navigate("/candidatedashboard")}>Back to Dashboard</button>
          </div>
        </>
      ) : (
        <form className="edit-profile-form" onSubmit={handleEditSubmit} encType="multipart/form-data">
          <div className="form-grid">
            <div className="form-section">
              <h3>Personal Information</h3>
              <label>Name: <input name="name" value={form.name} onChange={handleEditChange} required /></label>
              <label>Phone: <input name="phone" value={form.phone} onChange={handleEditChange} required /></label>
              <label>DOB: <input type="date" name="dob" value={form.dob} onChange={handleEditChange} required /></label>
              <label>Address: <input name="address" value={form.address} onChange={handleEditChange} required /></label>
              <label>State: <input name="state" value={form.state} onChange={handleEditChange} required /></label>
              <label>Aadhaar ID: <input name="adhaar_id" value={form.adhaar_id} onChange={handleEditChange} required /></label>
            </div>
            
            <div className="form-section">
              <h3>Guardian Information</h3>
              <label>Guardian Name: <input name="guardianName" value={form.guardianName} onChange={handleEditChange} required /></label>
              <label>Guardian Relation: <input name="guardianRelation" value={form.guardianRelation} onChange={handleEditChange} required /></label>
              <label>Guardian Phone: <input name="guardianPhone" value={form.guardianPhone} onChange={handleEditChange} required /></label>
            </div>
            
            <div className="form-section">
              <h3>Academic Information</h3>
              <label>Institution: <input name="institution" value={form.institution} onChange={handleEditChange} required /></label>
              <label>Program: <input name="program" value={form.program} onChange={handleEditChange} required /></label>
              <label>Department: <input name="department" value={form.department} onChange={handleEditChange} required /></label>
              <label>Year: <input name="year" value={form.year} onChange={handleEditChange} required /></label>
              <label>Institute Location: <input name="instituteLocation" value={form.instituteLocation} onChange={handleEditChange} required /></label>
              <label>Institute State: <input name="instituteState" value={form.instituteState} onChange={handleEditChange} required /></label>
              <label>Current Semester CGPA: <input type="number" step="0.01" name="currentSemesterCgpa" value={form.currentSemesterCgpa} onChange={handleEditChange} required /></label>
              <label>UG: <input name="UG" value={form.UG} onChange={handleEditChange} required /></label>
              <label>12th CGPA: <input type="number" step="0.01" name="cgpa12" value={form.cgpa12} onChange={handleEditChange} required /></label>
              <label>12th Board: <input name="board12" value={form.board12} onChange={handleEditChange} required /></label>
              <label>10th CGPA: <input type="number" step="0.01" name="cgpa10" value={form.cgpa10} onChange={handleEditChange} required /></label>
              <label>10th Board: <input name="board10" value={form.board10} onChange={handleEditChange} required /></label>
            </div>
            
            <div className="form-section">
              <h3>Payment Information</h3>
              <label>Registration Payment: <input name="regPayment" value={form.regPayment} onChange={handleEditChange} required /></label>
              
              <div className="file-upload">
                <label>Payment Screenshot:</label>
                <input
                  type="file"
                  name="regPaymentScreenshot"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                />
                {previewPaymentScreenshot && (
                  <div className="file-preview">
                    <a href={previewPaymentScreenshot} target="_blank" rel="noopener noreferrer">
                      <img src={previewPaymentScreenshot} alt="Payment Screenshot Preview" className="preview-image" />
                    </a>
                  </div>
                )}
              </div>
              
              <div className="file-upload">
                <label>Profile Photo:</label>
                <input
                  type="file"
                  name="profilePhoto"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {previewProfilePhoto && (
                  <div className="file-preview">
                    <img src={previewProfilePhoto} alt="Profile Photo Preview" className="preview-image round" />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={() => {
                setEditMode(false);
                setPreviewProfilePhoto(candidate.profilePhotoPath ? `/${candidate.profilePhotoPath}` : null);
                setPreviewPaymentScreenshot(candidate.regPaymentScreenshotPath ? `/${candidate.regPaymentScreenshotPath}` : null);
              }}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </form>
      )}
    </div>
  );
}

export default CandidateProfile;