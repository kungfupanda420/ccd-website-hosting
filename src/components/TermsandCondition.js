const TermsAndConditions = () => {
  return (
    <div className="terms-container" style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: 1.8,
      background: '#ffffff',
      color: '#333',
      padding: '3rem',
      maxWidth: '900px',
      margin: '2rem auto',
      borderRadius: '8px',
      boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
      position: 'relative'
    }}>
      <h1 style={{ 
        color: '#2c3e50', 
        borderBottom: '2px solid #eaeaea', 
        paddingBottom: '1rem',
        marginBottom: '2rem',
        fontSize: '2.2rem',
        fontWeight: '600'
      }}>
        Terms of Service
      </h1>
      
      <p style={{
        fontSize: '0.95rem',
        color: '#666',
        marginBottom: '2rem',
        padding: '0.8rem',
        background: '#f8f9fa',
        borderRadius: '4px'
      }}>
        <strong>Effective Date:</strong> July 1st 2025<br />
      </p>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ 
          color: '#2c3e50',
          fontSize: '1.5rem',
          fontWeight: '500',
          margin: '1.5rem 0 1rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px dashed #eaeaea'
        }}>
          1. Agreement to Terms
        </h2>
        <p style={{ marginLeft: '1rem' }}>
          By using our platform, you agree to our Terms of Service.
        </p>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ 
          color: '#2c3e50',
          fontSize: '1.5rem',
          fontWeight: '500',
          margin: '1.5rem 0 1rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px dashed #eaeaea'
        }}>
          2. Authentication
        </h2>
        <p style={{ marginLeft: '1rem' }}>
          Login is enabled via Google Sign-In to verify <strong style={{ color: '#e74c3c' }}>only your email address</strong>.
        </p>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ 
          color: '#2c3e50',
          fontSize: '1.5rem',
          fontWeight: '500',
          margin: '1.5rem 0 1rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px dashed #eaeaea'
        }}>
          4. User Responsibilities
        </h2>
        <ul style={{ 
          marginLeft: '1rem',
          paddingLeft: '1.5rem',
          listStyleType: 'none'
        }}>
          <li style={{ 
            marginBottom: '0.5rem',
            position: 'relative',
            paddingLeft: '1.5rem'
          }}>
            <span style={{
              position: 'absolute',
              left: 0,
              color: '#3498db'
            }}>•</span> Submit accurate personal, academic, and document data
          </li>
          <li style={{ 
            marginBottom: '0.5rem',
            position: 'relative',
            paddingLeft: '1.5rem'
          }}>
            <span style={{
              position: 'absolute',
              left: 0,
              color: '#3498db'
            }}>•</span> Not impersonate others
          </li>
          <li style={{ 
            marginBottom: '0.5rem',
            position: 'relative',
            paddingLeft: '1.5rem'
          }}>
            <span style={{
              position: 'absolute',
              left: 0,
              color: '#3498db'
            }}>•</span> Not submit forged or altered records
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ 
          color: '#2c3e50',
          fontSize: '1.5rem',
          fontWeight: '500',
          margin: '1.5rem 0 1rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px dashed #eaeaea'
        }}>
          5. Document Handling
        </h2>
        <p style={{ marginLeft: '1rem' }}>
          Uploaded documents are used only for identity and academic verification.
        </p>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ 
          color: '#2c3e50',
          fontSize: '1.5rem',
          fontWeight: '500',
          margin: '1.5rem 0 1rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px dashed #eaeaea'
        }}>
          6. Data Use & Retention
        </h2>
        <p style={{ marginLeft: '1rem' }}>
          Our standard policy is to retain user data for <strong style={{ color: '#e74c3c' }}>up to 3 years</strong> from the date of submission but actual deletion timelines may vary due to operational or legal requirements.
        </p>
        <p style={{ 
          marginLeft: '1rem',
          fontStyle: 'italic',
          color: '#666',
          padding: '0.8rem',
          background: '#f8f9fa',
          borderRadius: '4px',
          marginTop: '1rem'
        }}>
          We are not responsible for retrieving user data after this period ends.
        </p>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ 
          color: '#2c3e50',
          fontSize: '1.5rem',
          fontWeight: '500',
          margin: '1.5rem 0 1rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px dashed #eaeaea'
        }}>
          7. Termination
        </h2>
        <p style={{ marginLeft: '1rem' }}>
          We reserve the right to suspend or terminate accounts that violate our terms, submit false data, or misuse the platform.
        </p>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ 
          color: '#2c3e50',
          fontSize: '1.5rem',
          fontWeight: '500',
          margin: '1.5rem 0 1rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px dashed #eaeaea'
        }}>
          8. Limitation of Liability
        </h2>
        <p style={{ marginLeft: '1rem' }}>We are not liable for:</p>
        <ul style={{ 
          marginLeft: '1rem',
          paddingLeft: '1.5rem',
          listStyleType: 'none'
        }}>
          <li style={{ 
            marginBottom: '0.5rem',
            position: 'relative',
            paddingLeft: '1.5rem'
          }}>
            <span style={{
              position: 'absolute',
              left: 0,
              color: '#3498db'
            }}>•</span> Internship results or rejections
          </li>
          <li style={{ 
            marginBottom: '0.5rem',
            position: 'relative',
            paddingLeft: '1.5rem'
          }}>
            <span style={{
              position: 'absolute',
              left: 0,
              color: '#3498db'
            }}>•</span> Loss of access to data after the 3-year period
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ 
          color: '#2c3e50',
          fontSize: '1.5rem',
          fontWeight: '500',
          margin: '1.5rem 0 1rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px dashed #eaeaea'
        }}>
          9. Changes to Terms
        </h2>
        <p style={{ marginLeft: '1rem' }}>
          We may update these terms from time to time. Continued use of the platform implies acceptance of the changes.
        </p>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ 
          color: '#2c3e50',
          fontSize: '1.5rem',
          fontWeight: '500',
          margin: '1.5rem 0 1rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px dashed #eaeaea'
        }}>
          10. Contact
        </h2>
        <p style={{ marginLeft: '1rem' }}>
          For support, contact us at:<br />
          <span style={{
            display: 'inline-block',
            marginTop: '0.5rem',
            padding: '0.8rem',
            background: '#f0f7ff',
            borderRadius: '4px',
            color: '#2980b9',
            fontWeight: '500'
          }}>
             placement.nitc.ac.in
          </span>
        </p>
      </div>
    </div>
  );
}

export default TermsAndConditions;