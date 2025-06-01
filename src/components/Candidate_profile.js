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
      setRegPaymentScreenshot(e.target.files[0]);
    }
    if (e.target.name === "profilePhoto") {
      setProfilePhoto(e.target.files[0]);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
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
      } else {
        const err = await res.json();
        setError(err.detail || "Failed to update profile.");
      }
    } catch (e) {
      setError("Network error.");
    }
    setLoading(false);
  };

  if (loading) return <div className="candidate-profile-container"><h2>Loading...</h2></div>;
  if (error) return <div className="candidate-profile-container"><h2>{error}</h2></div>;
  if (!candidate) return null;

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <aside className="sidebar">
        <img
          className="profile-pic"
          src={candidate.profilePhotoPath ? `/${candidate.profilePhotoPath}` : "/images/default.png"}
          alt="Profile"
        />
        <h2>{candidate.name}</h2>
        <nav>
          <a href="#" onClick={() => navigate("/candidatedashboard")}>Dashboard</a>
          <a href="#" onClick={() => setEditMode(false)}>View Profile</a>
          <a href="#" onClick={() => setEditMode(true)}>Edit Profile</a>
          {/* Add more links here if needed */}
        </nav>
      </aside>

      {/* Main Profile Content */}
      <main className="candidate-profile-container">
        <div className="candidate-profile">
          <h1>Candidate Profile</h1>
          {!editMode ? (
            <>
              <div className="profile-fields">
                <div><strong>Name:</strong> {candidate.name}</div>
                <div><strong>Email:</strong> {candidate.user?.email}</div>
                <div><strong>Phone:</strong> {candidate.phone}</div>
                <div><strong>Date of Birth:</strong> {candidate.dob}</div>
                <div><strong>Address:</strong> {candidate.address}</div>
                <div><strong>State:</strong> {candidate.state}</div>
                <div><strong>Guardian Name:</strong> {candidate.guardianName}</div>
                <div><strong>Guardian Relation:</strong> {candidate.guardianRelation}</div>
                <div><strong>Guardian Phone:</strong> {candidate.guardianPhone}</div>
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
                <div><strong>Registration Payment:</strong> {candidate.regPayment}</div>
                <div><strong>Payment Status:</strong> {candidate.paymentStatus}</div>
                <div><strong>Aadhaar ID:</strong> {candidate.adhaar_id}</div>
              </div>
              <button className="edit-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
            </>
          ) : (
            <form className="edit-profile-form" onSubmit={handleEditSubmit} encType="multipart/form-data">
              <div className="form-row">
                <label>
                  Name
                  <input type="text" name="name" value={form.name} onChange={handleEditChange} required />
                </label>
                <label>
                  Phone
                  <input type="text" name="phone" value={form.phone} onChange={handleEditChange} />
                </label>
                <label>
                  Date of Birth
                  <input type="date" name="dob" value={form.dob} onChange={handleEditChange} />
                </label>
                <label>
                  Address
                  <input type="text" name="address" value={form.address} onChange={handleEditChange} />
                </label>
              </div>

              <div className="form-row">
                <label>
                  State
                  <input type="text" name="state" value={form.state} onChange={handleEditChange} />
                </label>
                <label>
                  Guardian Name
                  <input type="text" name="guardianName" value={form.guardianName} onChange={handleEditChange} />
                </label>
                <label>
                  Guardian Relation
                  <input type="text" name="guardianRelation" value={form.guardianRelation} onChange={handleEditChange} />
                </label>
                <label>
                  Guardian Phone
                  <input type="text" name="guardianPhone" value={form.guardianPhone} onChange={handleEditChange} />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Institution
                  <input type="text" name="institution" value={form.institution} onChange={handleEditChange} />
                </label>
                <label>
                  Program
                  <input type="text" name="program" value={form.program} onChange={handleEditChange} />
                </label>
                <label>
                  Department
                  <input type="text" name="department" value={form.department} onChange={handleEditChange} />
                </label>
                <label>
                  Year
                  <input type="number" name="year" value={form.year} onChange={handleEditChange} />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Institute Location
                  <input type="text" name="instituteLocation" value={form.instituteLocation} onChange={handleEditChange} />
                </label>
                <label>
                  Institute State
                  <input type="text" name="instituteState" value={form.instituteState} onChange={handleEditChange} />
                </label>
                <label>
                  Current Semester CGPA
                  <input type="text" name="currentSemesterCgpa" value={form.currentSemesterCgpa} onChange={handleEditChange} />
                </label>
                <label>
                  UG
                  <input type="text" name="UG" value={form.UG} onChange={handleEditChange} />
                </label>
              </div>

              <div className="form-row">
                <label>
                  12th CGPA
                  <input type="text" name="cgpa12" value={form.cgpa12} onChange={handleEditChange} />
                </label>
                <label>
                  12th Board
                  <input type="text" name="board12" value={form.board12} onChange={handleEditChange} />
                </label>
                <label>
                  10th CGPA
                  <input type="text" name="cgpa10" value={form.cgpa10} onChange={handleEditChange} />
                </label>
                <label>
                  10th Board
                  <input type="text" name="board10" value={form.board10} onChange={handleEditChange} />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Registration Payment
                  <input type="text" name="regPayment" value={form.regPayment} onChange={handleEditChange} />
                </label>
                <label>
                  Payment Status
                  <input type="text" name="paymentStatus" value={form.paymentStatus} onChange={handleEditChange} />
                </label>
                <label>
                  Aadhaar ID
                  <input type="text" name="adhaar_id" value={form.adhaar_id} onChange={handleEditChange} />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Upload Registration Payment Screenshot
                  <input type="file" name="regPaymentScreenshot" onChange={handleFileChange} accept="image/*" />
                </label>
                <label>
                  Upload Profile Photo
                  <input type="file" name="profilePhoto" onChange={handleFileChange} accept="image/*" />
                </label>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </button>
                <button type="button" className="cancel-btn" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

export default CandidateProfile;
