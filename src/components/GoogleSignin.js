import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GOOGLE_LOGIN_URL = "http://localhost:8000/api/auth/google/login"; // Replace with your backend URL

const GoogleSignin = () => {
  const handleSuccess = async (credentialResponse) => {
    const res = await fetch(GOOGLE_LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: credentialResponse.credential }),
    });
    if (res.ok) {
      const data = await res.json();
      const { access_token, refresh_token, email, role } = data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);

      // Redirect based on role
      if (role === "admin") {
        window.location.href = "/admin_sip";
      } else if (role === "student") {
        window.location.href = "/candidatedashboard";
      } else if (role === "professor") {
        window.location.href = "/professor_dashboard";
      } else if (role === "department") {
        window.location.href = "/department_sip";
      } else {
        window.location.href = "/";
      }
    } else {
      alert("Login failed!");
    }
  };

  const handleError = () => {
    alert("Google Sign-In was unsuccessful. Try again later.");
  };

  return (
    <div className="google-signin-container">
      <h1>Google Sign In</h1>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default GoogleSignin;