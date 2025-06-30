const PrivacyPolicy = () => {
  return (
    <div className="container" style={{
      fontFamily: 'Arial, sans-serif',
      lineHeight: 1.6,
      background: '#f9f9f9',
      color: '#333',
      padding: '40px',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #ccc', paddingBottom: '5px' }}>Privacy Policy</h1>
      <p><strong>Effective Date:</strong> [Insert Date]<br />
      <strong>Last Updated:</strong> [Insert Date]</p>

      <h2 style={{ color: '#2c3e50' }}>1. Introduction</h2>
      <p>Team CCD, placement.nitc.ac.in is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website.</p>

      <h2 style={{ color: '#2c3e50' }}>2. Information We Collect</h2>
      <p><strong>a. Google Authentication Data</strong><br />
      - Email address only, via Google Sign-In.</p>

      <p><strong>b. Personal and Academic Information</strong><br />
      - Full name<br />
      - Date of birth<br />
      - Aadhaar ID<br />
      - APAAR ID<br />
      - Contact number<br />
      - CGPA and education history<br />
      - Uploaded documents (marksheets, ID proofs, resume, etc.)</p>

      <h2 style={{ color: '#2c3e50' }}>3. Purpose of Data Collection</h2>
      <p>Your data is collected to:</p>
      <ul>
        <li>Verify your identity and eligibility</li>
        <li>Facilitate internship matching</li>
        <li>Prevent fraudulent applications</li>
      </ul>

      <h2 style={{ color: '#2c3e50' }}>4. Data Security</h2>
      <p>Access restricted to authorized personnel<br />
      We do <strong>not sell</strong> your data.<br />
      Your data may be shared with government or legal bodies (if required)</p>

      <h2 style={{ color: '#2c3e50' }}>6. Data Retention & Deletion</h2>
      <p>Our standard policy is to retain user data for <strong>up to 3 years</strong> from the date of submission but actual deletion timelines may vary due to operational or legal requirements.</p>
      <p><em>We are not responsible for recovering any data after this period ends.</em></p>

      <h2 style={{ color: '#2c3e50' }}>7. Consent</h2>
      <p>By using our platform, you consent to this Privacy Policy and our handling of your data.</p>
    </div>
  );
}

export default PrivacyPolicy;