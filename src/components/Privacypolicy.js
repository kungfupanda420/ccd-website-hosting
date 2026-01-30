const PrivacyPolicy = () => {
  return (
    <div className="container" style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: 1.8,
      background: '#ffffff',
      color: '#333',
      padding: '50px',
      maxWidth: '900px',
      margin: '40px auto',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      textAlign: 'left'
    }}>
      <h1 style={{ 
        color: '#2c3e50', 
        borderBottom: '2px solid #3498db', 
        paddingBottom: '10px',
        marginBottom: '25px',https://github.com/CCD-NITC-Website/ccd-website-hosting/pull/73/conflict?name=src%252Fcomponents%252FTermsandCondition.js&base_oid=fc5e926a0956289bc5202eaf35c29c0f13db8697&head_oid=56d0a11e4d15b17efe132a307da5b5b087658f51
        fontSize: '2.2rem',
        fontWeight: '600'
      }}>Privacy Policy</h1>
      
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '25px',
        borderLeft: '4px solid #3498db'
      }}>
        <p style={{ margin: '0' }}>
          <strong>Effective Date:</strong> July 1st 2025<br />
          <strong>Last Updated:</strong>  July 1st 2025
        </p>
      </div>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ 
          color: '#2c3e50',
          fontSize: '1.6rem',
          fontWeight: '500',
          marginBottom: '15px',
          borderBottom: '1px solid #eee',
          paddingBottom: '5px'
        }}>1. Introduction</h2>
        <p>Team CCD, placement.nitc.ac.in is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ 
          color: '#2c3e50',
          fontSize: '1.6rem',
          fontWeight: '500',
          marginBottom: '15px',
          borderBottom: '1px solid #eee',
          paddingBottom: '5px'
        }}>2. Information We Collect</h2>
        <p><strong style={{ color: '#2980b9' }}>a. Google Authentication Data</strong><br />
        - Email address only, via Google Sign-In.</p>

        <p><strong style={{ color: '#2980b9' }}>b. Personal and Academic Information</strong><br />
        - Full name<br />
        - Date of birth<br />
        - Aadhaar ID<br />
        - APAAR ID<br />
        - Contact number<br />
        - CGPA and education history<br />
        - Uploaded documents (marksheets, ID proofs, resume, etc.)</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ 
          color: '#2c3e50',
          fontSize: '1.6rem',
          fontWeight: '500',
          marginBottom: '15px',
          borderBottom: '1px solid #eee',
          paddingBottom: '5px'
        }}>3. Purpose of Data Collection</h2>
        <p>Your data is collected to:</p>
        <ul style={{ paddingLeft: '25px' }}>
          <li style={{ marginBottom: '8px' }}>Verify your identity and eligibility</li>
          <li style={{ marginBottom: '8px' }}>Facilitate internship matching</li>
          <li style={{ marginBottom: '8px' }}>Prevent fraudulent applications</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ 
          color: '#2c3e50',
          fontSize: '1.6rem',
          fontWeight: '500',
          marginBottom: '15px',
          borderBottom: '1px solid #eee',
          paddingBottom: '5px'
        }}>4. Data Security</h2>
        <p>Access restricted to authorized personnel<br />
        We do <strong>not sell</strong> your data.<br />
        Your data may be shared with government or legal bodies (if required)</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ 
          color: '#2c3e50',
          fontSize: '1.6rem',
          fontWeight: '500',
          marginBottom: '15px',
          borderBottom: '1px solid #eee',
          paddingBottom: '5px'
        }}>6. Data Retention & Deletion</h2>
        <p>Our standard policy is to retain user data for <strong>up to 3 years</strong> from the date of submission but actual deletion timelines may vary due to operational or legal requirements.</p>
        <p style={{ fontStyle: 'italic', color: '#7f8c8d' }}>We are not responsible for recovering any data after this period ends.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ 
          color: '#2c3e50',
          fontSize: '1.6rem',
          fontWeight: '500',
          marginBottom: '15px',
          borderBottom: '1px solid #eee',
          paddingBottom: '5px'
        }}>7. Consent</h2>
        <p>By using our platform, you consent to this Privacy Policy and our handling of your data.</p>
      </section>

      <div style={{
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '1px solid #eee',
        textAlign: 'center',
        color: '#7f8c8d',
        fontSize: '0.9rem'
      }}>
        <p>© {new Date().getFullYear()} Team CCD, placement.nitc.ac.in. All rights reserved.</p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;