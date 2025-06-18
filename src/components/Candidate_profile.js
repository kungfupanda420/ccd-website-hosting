import React, { useEffect, useState, useRef } from "react";
import { authFetch } from "../utils/authFetch";
import "../css/CandidateProfile.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faSignOutAlt, 
  faHome, 
  faEdit, 
  faSave, 
  faTimes, 
  faList, 
  faDownload 
} from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

function CandidateProfile() {
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [profilePhotoPath, setProfilePhotoPath] = useState("/images/default.png");
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    dob: "",
    address: "",
    state: "",
    guardianName: "",
    guardianRelation: "",
    guardianPhone: "",
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
    student_college_idcard_path: "",
    documents_path: ""
  });

  const [regPaymentScreenshot, setRegPaymentScreenshot] = useState(null);
  const [nitcIdCard, setNitcIdCard] = useState(null);
  const [collegeIdCard, setCollegeIdCard] = useState(null);
  const navigate = useNavigate();
  const smootherRef = useRef();
  const contentRef = useRef();

  const fetchProfilePhoto = async () => {
    setIsPhotoLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const res = await authFetch("/api/students/profile_photo", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        if (data.profile_photo_path) {
          const cleanedPath = data.profile_photo_path.startsWith("/")
            ? data.profile_photo_path.substring(1)
            : data.profile_photo_path;
          const fullUrl = `${window.location.origin}/${cleanedPath}`;
          setProfilePhotoPath(`${fullUrl}?${Date.now()}`);
        }
      } else if (res.status === 404) {
        setProfilePhotoPath("/images/default.png");
      }
    } catch (error) {
      setProfilePhotoPath("/images/default.png");
    } finally {
      setIsPhotoLoading(false);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: true,
      smoothTouch: 0.1,
    });

    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("You must be logged in.");
        setLoading(false);
        return;
      }

      try {
        const candidateRes = await authFetch("/api/students/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (candidateRes.ok) {
          const candidateData = await candidateRes.json();
          setCandidate(candidateData);
          setForm({
            ...candidateData,
            start_date: candidateData.start_date || "",
            end_date: candidateData.end_date || ""
          });
          await fetchProfilePhoto();
        } else {
          const err = await candidateRes.json();
          setError(err.detail || "Failed to fetch data.");
        }
      } catch (e) {
        setError("Network error.");
      }
      setLoading(false);
    };

    fetchData();

    const handleStorageChange = () => {
      if (localStorage.getItem("profileUpdated")) {
        fetchProfilePhoto();
        localStorage.removeItem("profileUpdated");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleDownload = async (type) => {
    try {
      setError("");
      const token = localStorage.getItem("access_token");
      let endpoint;

      if (type === 'college_id') {
        endpoint = "/api/students/me/my_clg_id";
      } else if (type === 'documents') {
        endpoint = "/api/students/me/my_docs";
      } else {
        throw new Error("Invalid download type");
      }

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Failed to download file");
      }

      const contentDisposition = response.headers.get('content-disposition');
      let filename = type === 'college_id' ? 'college_id.pdf' : 'documents.zip';

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1];
        }
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setError(error.message || "Error downloading file");
      console.error("Download error:", error);
    }
  };

  const handleEditChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    switch (e.target.name) {
      case "profilePhoto":
        setProfilePhoto(e.target.files[0]);
        break;
      case "documents":
        setForm({...form, documents: e.target.files[0]});
        break;
      case "student_college_idcard":
        setCollegeIdCard(e.target.files[0]);
        break;
      default:
        break;
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("access_token");
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      if (regPaymentScreenshot) formData.append("regPaymentScreenshot", regPaymentScreenshot);
      if (profilePhoto) formData.append("profilePhoto", profilePhoto);
      if (collegeIdCard) formData.append("student_college_idcard", collegeIdCard);
      if (form.documents) formData.append("documents", form.documents);

      const res = await authFetch("/api/students/me", {
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
        setNitcIdCard(null);
        setCollegeIdCard(null);
        setForm({ ...form, documents: null });
        
        await fetchProfilePhoto();
        localStorage.setItem('profileUpdated', 'true');
      } else {
        const err = await res.json();
        setError(err.detail || "Failed to update profile.");
      }
    } catch (e) {
      setError("Network error.");
    }
    setLoading(false);
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!candidate) return null;

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content" ref={contentRef}>
        <aside className="sidebar">
          <img
            className="profile-pic"
            src={profilePhotoPath}
            alt="Profile"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/default.png";
            }}
          />
          <nav>
            <button onClick={() => navigate("/candidatedashboard")}>
              <FontAwesomeIcon icon={faHome} />
              <span>Dashboard</span>
            </button>
            <button onClick={() => navigate("/candidatepreferences")}>
              <FontAwesomeIcon icon={faList} />
              <span>Preferences</span>
            </button>
            <button onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        <main className="candidate-profile-container">
          <div className="candidate-profile">
            <header className="profile-header">
              <h1>Candidate Profile</h1>
              {!editMode && (
                <button className="edit-btn" onClick={() => setEditMode(true)}>
                  <FontAwesomeIcon icon={faEdit} />
                  <span>Edit Profile</span>
                </button>
              )}
            </header>

            {!editMode ? (
              <div className="profile-view">
                <section className="profile-section">
                  <h2>Personal Information</h2>
                  <div className="profile-grid">
                    <div><strong>Name:</strong> {candidate.name}</div>
                    <div><strong>Email:</strong> {candidate.user?.email}</div>
                    <div><strong>Phone:</strong> {candidate.phone}</div>
                    <div><strong>Date of Birth:</strong> {candidate.dob}</div>
                    <div><strong>Address:</strong> {candidate.address}</div>
                    <div><strong>State:</strong> {candidate.state}</div>
                  </div>
                </section>

                <section className="profile-section">
                  <h2>Guardian Information</h2>
                  <div className="profile-grid">
                    <div><strong>Guardian Name:</strong> {candidate.guardianName}</div>
                    <div><strong>Guardian Relation:</strong> {candidate.guardianRelation}</div>
                    <div><strong>Guardian Phone:</strong> {candidate.guardianPhone}</div>
                  </div>
                </section>

                <section className="profile-section">
                  <h2>Academic Information</h2>
                  <div className="profile-grid">
                    <div><strong>Institution:</strong> {candidate.institution}</div>
                    <div><strong>Program:</strong> {candidate.program}</div>
                    <div><strong>Department:</strong> {candidate.department}</div>
                    <div><strong>Year:</strong> {candidate.year}</div>
                    <div><strong>Institute Location:</strong> {candidate.instituteLocation}</div>
                    <div><strong>Institute State:</strong> {candidate.instituteState}</div>
                    <div><strong>Current Semester CGPA:</strong> {candidate.currentSemesterCgpa}</div>
                    <div><strong>UG:</strong> {candidate.UG}</div>
                  </div>
                </section>

                <section className="profile-section">
                  <h2>Educational Background</h2>
                  <div className="profile-grid">
                    <div><strong>12th CGPA:</strong> {candidate.cgpa12}</div>
                    <div><strong>12th Board:</strong> {candidate.board12}</div>
                    <div><strong>10th CGPA:</strong> {candidate.cgpa10}</div>
                    <div><strong>10th Board:</strong> {candidate.board10}</div>
                  </div>
                </section>

                <section className="profile-section">
                  <h2>Identification</h2>
                  <div className="profile-grid">
                    <div><strong>SIP ID:</strong> {candidate.sip_id || "Not provided"}</div>
                    <div><strong>Aadhaar ID:</strong> {candidate.adhaar_id || "Not provided"}</div>
                    <div><strong>APAAR ID:</strong> {candidate.apaar_id || "Not provided"}</div>
                  </div>
                </section>

                <section className="profile-section">
                  <h2>Internship Dates</h2>
                  <div className="profile-grid">
                    <div><strong>Start Date:</strong> {candidate.start_date || "Not set"}</div>
                    <div><strong>End Date:</strong> {candidate.end_date || "Not set"}</div>
                  </div>
                </section>

                <section className="profile-section">
                  <h2>Documents</h2>
                  <div className="profile-grid">
                    <div>
                      <strong>College ID Card:</strong>
                      <button
                        onClick={() => handleDownload('college_id')}
                        className="download-btn"
                        disabled={!candidate.student_college_idcard_path}
                      >
                        <FontAwesomeIcon icon={faDownload} /> Download
                      </button>
                      {!candidate.student_college_idcard_path && (
                        <span className="file-missing">No file uploaded</span>
                      )}
                    </div>
                    <div>
                      <strong>Documents:</strong>
                      <button
                        onClick={() => handleDownload('documents')}
                        className="download-btn"
                        disabled={!candidate.documents_path}
                      >
                        <FontAwesomeIcon icon={faDownload} /> Download
                      </button>
                      {!candidate.documents_path ? (
                        <span className="file-missing">No file uploaded</span>
                      ) : error && (
                        <span className="error-message">{error}</span>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              <form className="edit-profile-form" onSubmit={handleEditSubmit} encType="multipart/form-data">
                <div className="form-sections">
                  <section className="form-section">
                    <h2>Personal Information</h2>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" value={form.name} onChange={handleEditChange} required />
                      </div>
                      <div className="form-group">
                        <label>Phone</label>
                        <input type="text" name="phone" value={form.phone} onChange={handleEditChange} />
                      </div>
                      <div className="form-group">
                        <label>Date of Birth</label>
                        <input type="date" name="dob" value={form.dob} onChange={handleEditChange} />
                      </div>
                      <div className="form-group">
                        <label>Address</label>
                        <input type="text" name="address" value={form.address} onChange={handleEditChange} />
                      </div>
                      <div className="form-group">
                        <label>State</label>
                        <input type="text" name="state" value={form.state} onChange={handleEditChange} />
                      </div>
                    </div>
                  </section>

                  <section className="form-section">
                    <h2>Guardian Information</h2>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Guardian Name</label>
                        <input type="text" name="guardianName" value={form.guardianName} onChange={handleEditChange} />
                      </div>
                      <div className="form-group">
                        <label>Guardian Relation</label>
                        <input type="text" name="guardianRelation" value={form.guardianRelation} onChange={handleEditChange} />
                      </div>
                      <div className="form-group">
                        <label>Guardian Phone</label>
                        <input type="text" name="guardianPhone" value={form.guardianPhone} onChange={handleEditChange} />
                      </div>
                    </div>
                  </section>

                  <section className="form-section">
                    <h2>Academic Information</h2>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Institution</label>
                        <input type="text" name="institution" value={form.institution} onChange={handleEditChange} />
                      </div>
                      <div className="form-group">
                        <label>Program</label>
                        <input type="text" name="program" value={form.program} onChange={handleEditChange} />
                      </div>
                      <div className="form-group">
                        <label>Department</label>
                        <input type="text" name="department" value={form.department} onChange={handleEditChange} />
                      </div>
                      <div className="form-group">
                        <label>Year</label>
                        <input type="number" name="year" value={form.year} onChange={handleEditChange} />
                      </div>
                      <div className="form-group">
                        <label>Institute Location</label>
                        <input type="text" name="instituteLocation" value={form.instituteLocation} onChange={handleEditChange} />
                      </div>
                      <div className="form-group">
                        <label>Institute State</label>
                        <input type="text" name="instituteState" value={form.instituteState} onChange={handleEditChange} />
                      </div>
                      <div className="form-group">
                        <label>Current Semester CGPA</label>
                        <input type="number" step="0.01" name="currentSemesterCgpa" value={form.currentSemesterCgpa} onChange={handleEditChange} />
                      </div>
                      <div className="form-group">
                        <label>UG</label>
                        <input type="text" name="UG" value={form.UG} onChange={handleEditChange} />
                      </div>
                    </div>
                  </section>

                  <section className="form-section">
                    <h2>Educational Background</h2>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>12th CGPA</label>
                        <input type="number" step="0.01" name="cgpa12" value={form.cgpa12} onChange={handleEditChange} />
                      </div>
                      <div className="form-group">
                        <label>12th Board</label>
                        <input type="text" name="board12" value={form.board12} onChange={handleEditChange} />
                      </div>
                      <div className="form-group">
                        <label>10th CGPA</label>
                        <input type="number" step="0.01" name="cgpa10" value={form.cgpa10} onChange={handleEditChange} />
                      </div>
                      <div className="form-group">
                        <label>10th Board</label>
                        <input type="text" name="board10" value={form.board10} onChange={handleEditChange} />
                      </div>
                    </div>
                  </section>

                  <section className="form-section">
                    <h2>Identification</h2>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Aadhaar ID</label>
                        <input type="text" name="adhaar_id" value={form.adhaar_id} onChange={handleEditChange} />
                      </div>
                      <div className="form-group">
                        <label>APAAR ID</label>
                        <input type="text" name="apaar_id" value={form.apaar_id} onChange={handleEditChange} />
                      </div>
                    </div>
                  </section>

                  <section className="form-section">
                    <h2>Upload Files</h2>
                    <div className="form-grid">
                      <div className="form-group file-input">
                        <label>Profile Photo</label>
                        <input type="file" name="profilePhoto" onChange={handleFileChange} accept="image/*" />
                      </div>
                      <div className="form-group file-input">
                        <label>College ID Card</label>
                        <input type="file" name="student_college_idcard" onChange={handleFileChange} accept="image/*,.pdf" />
                      </div>
                    </div>
                    <div className="form-group file-input">
                      <label>Documents (PDF only)</label>
                      <input type="file" name="documents" onChange={handleFileChange} accept=".pdf" />
                    </div>
                  </section>
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-btn" disabled={loading}>
                    <FontAwesomeIcon icon={faSave} />
                    <span>{loading ? "Saving..." : "Save Changes"}</span>
                  </button>
                  <button type="button" className="cancel-btn" onClick={() => setEditMode(false)} disabled={loading}>
                    <FontAwesomeIcon icon={faTimes} />
                    <span>Cancel</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default CandidateProfile;