import React, { useState } from "react";
import "../css/LogIn.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showpwd, setShowpwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  function handleShow() {
    setShowpwd(prev => !prev);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(async response => {
      if (response.ok) {
        const data = await response.json();
          console.log("Basipckend Response:", data);
        // Store token if your backend returns one
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
        }
        navigate("/admin_sip"); // Use lowercase navigate
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
    }).catch(error => {
      setError(error.message);
    });
  }

  return (
    <div className="loginContainer">
      <div className="AdminLogIn">
        <h1 className="mainHeading">Admin</h1>
        {error && <div className="error-message">{error}</div>}
        <form className="formLogIn" onSubmit={handleSubmit}>
          <div className="fillBoxInput mediumHeading">
            <input 
              type="text" 
              placeholder="Email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>
          <div className="fillBoxInput mediumHeading">
            <input 
              type={showpwd ? "text" : "password"} 
              placeholder="Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
            <span className="eyeIcon" onClick={handleShow}>
              {showpwd ? <AiFillEye /> : <AiFillEyeInvisible/>}
            </span>
          </div>
          <button type="submit" className="loginBtn">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;