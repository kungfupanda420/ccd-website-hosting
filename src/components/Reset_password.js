import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../css/reset_password.css"; // Assuming you have a CSS file for styling

function ResetPassword() {
  const location = useLocation();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const t = params.get("token");
    if (t) setToken(t);
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    if (!password) {
      setError("Please enter a new password.");
      return;
    }
    try {
      const res = await fetch("/api/change_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg(data.msg || "Password changed successfully.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500); // Redirect after 1.5 seconds
      } else {
        setError(data.detail || "Failed to change password.");
      }
    } catch {
      setError("Failed to change password.");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      {msg && <div className="success-message">{msg}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;