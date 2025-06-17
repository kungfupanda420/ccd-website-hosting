import React, { useState } from "react";

function GenerateIDCards() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateIDCards = async () => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("Authorization token is missing. Please log in.");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/admin/generate_id_card", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to generate ID cards");
      }

      const data = await response.json();
      setMessage(data.message || "ID cards generated successfully!");
    } catch (error) {
      console.error("Error generating ID cards:", error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <button
        onClick={handleGenerateIDCards}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate ID Cards"}
      </button>
      {message && <p style={{ marginTop: "20px", color: "green" }}>{message}</p>}
    </div>
  );
}

export default GenerateIDCards;