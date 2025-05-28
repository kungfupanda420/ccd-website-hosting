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
  const navigate = useNavigate();

  function handleShow() {
    setShowpwd((prev) => !prev);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setForgotMsg("");

    if (!email || !password) {
      setError("Please fill in all fields");
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
            localStorage.setItem("token", data.access_token);
            const role = data.role;
            if (role === "admin") navigate("/admin_sip");
            else if (role === "student") navigate("/Candidatedashboard");
            else if (role === "professor") navigate("/professor_dashboard");
            else if (role === "department") navigate("/department_dashboard");
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
      setError("Please enter your email to reset password.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/forgotPassword", {
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

  return (
    <div className="loginContainer">
      <div className="AdminLogIn">
        <h1 className="mainHeading">SIP LOGIN</h1>
        {error && <div className="error-message">{error}</div>}
        {forgotMsg && <div className="forgot-message">{forgotMsg}</div>}
        <form className="formLogIn" onSubmit={handleSubmit}>
          <div className="fillBoxInput mediumHeading">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="fillBoxInput mediumHeading">
            <input
              type={showpwd ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eyeIcon" onClick={handleShow}>
              {showpwd ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </div>
          <div className="login-btn-row">
            <button type="submit" className="loginBtn">
              Log In
            </button>
            <button
              type="button"
              className="loginBtn "
              onClick={handleForgot}
              disabled={loading}
            >
              {loading ? "Sending..." : "Forgot Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;