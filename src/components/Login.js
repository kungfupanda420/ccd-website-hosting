import React, { useState } from "react";
import "../css/LogIn.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [showpwd, setShowpwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false
  });
  const navigate = useNavigate();

  function handleShow() {
    setShowpwd((prev) => !prev);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setForgotMsg("");
    
    // Validate fields
    const errors = {
      email: !email,
      password: !forgotMode && !password
    };
    
    setFieldErrors(errors);
    
    if (errors.email || errors.password) {
      setError("Please fill in all fields");
      return;
    }

    if (forgotMode) {
      handleForgot(e);
      return;
    }

    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          if (data.access_token) {
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            const role = data.role;
            console.log("Login successful, role:", role);
            console.log(data.access_token)
            if (role === "admin") navigate("/admin_sip");
            else if (role === "student") navigate("/Candidatedashboard");
            else if (role === "professor") navigate("/professor_dashboard");
            else if (role === "department") navigate("/department_sip");
            else if (role === "Verified Email") navigate("/registerform");
            else setError("Unknown role");
          }
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Login failed");
        }
      })
      .catch((error) => setError(error.message));
  }

  async function handleForgot(e) {
    e.preventDefault();
    setError("");
    setForgotMsg("");
    if (!email) {
      setFieldErrors({...fieldErrors, email: true});
      setError("Please enter your email to reset password.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/forgot_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setForgotMsg(data.msg || "If this email exists, a reset link will be sent.");
    } catch (err) {
      setError("Failed to send reset link.");
    }
    setLoading(false);
  }

  function toggleForgotMode() {
    setForgotMode(!forgotMode);
    setError("");
    setForgotMsg("");
    setFieldErrors({ email: false, password: false });
  }

  return (
    <div className="loginContainer">
      <div className={`AdminLogIn ${forgotMode ? "forgot-mode" : ""}`}>
        <h1 className="mainHeading">{forgotMode ? "RESET PASSWORD" : "SIP LOGIN"}</h1>
        {error && <div className="error-message">{error}</div>}
        {forgotMsg && <div className="forgot-message">{forgotMsg}</div>}
        <form className="formLogIn" onSubmit={handleSubmit}>
          <div className={`fillBoxInput ${fieldErrors.email ? "error" : ""}`}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldErrors({...fieldErrors, email: false});
              }}
            />
            {fieldErrors.email && <span className="error-text">Email is required</span>}
          </div>
          {!forgotMode && (
            <div className={`fillBoxInput ${fieldErrors.password ? "error" : ""}`}>
              <input
                type={showpwd ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldErrors({...fieldErrors, password: false});
                }}
              />
              <span className="eyeIcon" onClick={handleShow}>
                {showpwd ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
              {fieldErrors.password && <span className="error-text">Password is required</span>}
            </div>
          )}
          <div className="login-btn-row">
            <button type="submit" className="loginBtn" disabled={loading}>
              {loading ? "Processing..." : forgotMode ? "Send Reset Link" : "Log In"}
            </button>
            <button
              type="button"
              className="forgotBtn"
              onClick={toggleForgotMode}
              disabled={loading}
            >
              {forgotMode ? "Back to Login" : "Forgot Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;