function CandidateProfile({ candidate }) {
  return (
    <div className="candidate-profile">
      <h2>{candidate.name}</h2>
      <p>Location: {candidate.location}</p>
      <p>Experience: {candidate.experience} years</p>
      <p>Skills: {candidate.skills.join(', ')}</p>
    </div>
  );
}
export default CandidateProfile;