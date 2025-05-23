import React, { useEffect, useState } from "react";

function CandidateProfile() {
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        const res = await fetch("/api/students/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setCandidate(data);
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

  if (loading) return <div className="candidate-profile"><h2>Loading...</h2></div>;
  if (error) return <div className="candidate-profile"><h2>{error}</h2></div>;
  if (!candidate) return null;

  return (
    <div className="candidate-profile">
      <h1>Candidate Profile</h1>
      <div><strong>Name:</strong> {candidate.name}</div>
      <div><strong>Email:</strong> {candidate.user?.email}</div>
      <div><strong>Phone:</strong> {candidate.phone}</div>
      <div><strong>DOB:</strong> {candidate.dob}</div>
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
      {/* Add more fields as needed */}
    </div>
  );
}

export default CandidateProfile;