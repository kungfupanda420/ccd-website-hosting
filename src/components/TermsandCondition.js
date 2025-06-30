const TermsAndConditions = () => {
  return (
    <div className="container" style={{
      fontFamily: 'Arial, sans-serif',
      lineHeight: 1.6,
      background: '#f9f9f9',
      color: '#333',
      padding: '40px',
      maxWidth: '900px',
      margin: 'auto'
    }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #ccc', paddingBottom: '5px' }}>Terms of Service</h1>
      <p><strong>Effective Date:</strong> [Insert Date]</p>

      <h2 style={{ color: '#2c3e50' }}>1. Agreement to Terms</h2>
      <p>By using our platform, you agree to our Terms of Service.</p>

      <h2 style={{ color: '#2c3e50' }}>2. Authentication</h2>
      <p>Login is enabled via Google Sign-In to verify <strong>only your email address</strong>.</p>

      <h2 style={{ color: '#2c3e50' }}>4. User Responsibilities</h2>
      <ul>
        <li>Submit accurate personal, academic, and document data</li>
        <li>Not impersonate others</li>
        <li>Not submit forged or altered records</li>
      </ul>

      <h2 style={{ color: '#2c3e50' }}>5. Document Handling</h2>
      <p>Uploaded documents are used only for identity and academic verification.</p>

      <h2 style={{ color: '#2c3e50' }}>6. Data Use & Retention</h2>
      <p>Our standard policy is to retain user data for <strong>up to 3 years</strong> from the date of submission but actual deletion timelines may vary due to operational or legal requirements.</p>
      <p><em>We are not responsible for retrieving user data after this period ends.</em></p>

      <h2 style={{ color: '#2c3e50' }}>7. Termination</h2>
      <p>We reserve the right to suspend or terminate accounts that violate our terms, submit false data, or misuse the platform.</p>

      <h2 style={{ color: '#2c3e50' }}>8. Limitation of Liability</h2>
      <p>We are not liable for:</p>
      <ul>
        <li>Internship results or rejections</li>
        <li>Loss of access to data after the 3-year period</li>
      </ul>

      <h2 style={{ color: '#2c3e50' }}>9. Changes to Terms</h2>
      <p>We may update these terms from time to time. Continued use of the platform implies acceptance of the changes.</p>

      <h2 style={{ color: '#2c3e50' }}>10. Contact</h2>
      <p>For support, contact us at:<br />
      📧 placement.nitc.ac.in</p>
    </div>
  );
}

export default TermsAndConditions;