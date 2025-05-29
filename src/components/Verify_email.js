import React, { useEffect, useState } from "react";

function ConfirmEmail() {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

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
        const res = await fetch(`/api/students/confirm_email?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
          method: "POST"
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || "Confirmation failed");
        }
        setMsg("Email confirmed successfully! You can now log in.");
      } catch (err) {
        setError(err.message);
      }
    };

    confirm();
  }, []);

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