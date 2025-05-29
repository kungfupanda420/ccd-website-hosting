import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ConfirmEmail() {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");
    const password = params.get("password");

    if (!email || !password) {
      setError("Invalid confirmation link.");
      return;
    }

    const confirm = async () => {
      try {
        const res = await fetch(
          `/api/students/confirm_email?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
          { method: "POST" }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || "Confirmation failed");
        }
        setMsg("Email confirmed successfully!");

        // Redirect based on role
        if (data.role === "student") {
          navigate("/candidate_dashboard");
        } else if (data.role === "Verified Email") {
          navigate("/registerform");
        } else {
          // fallback
          navigate("/");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    confirm();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Email Confirmation</h1>
        {msg && <div className="text-green-600">{msg}</div>}
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </div>
  );
}

export default ConfirmEmail;