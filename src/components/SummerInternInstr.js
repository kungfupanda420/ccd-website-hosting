import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/SummerInternInstr.css";

const SummerInternInstr = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/documents/INSTRUCTIONS_v2.pdf";
    link.download = "Instructions.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDownload2 = () => {
    const link = document.createElement("a");
    link.href = "/documents/SIP_2025_Mentors_List.xlsx";
    link.download = "SIP_2025_Mentors_List.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDownload3 = () => {
    const link = document.createElement("a");
    link.href = "/documents/Notification_v2.pdf";
    link.download = "SIP_2025_Notification_Document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDownload4 = () => {
    const link = document.createElement("a");
    link.href = "/documents/Bonafide Certificate Format.pdf";
    link.download = "Bonafide Certificate Format.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="instructions-container">
      <h2 className="instructions-head-text">
        Important Instructions for Summer Internship at
        <br />
        NIT CALICUT
      </h2>
      <p className="instructions-subhead-text">
        Please read the instructions carefully before proceeding.
      </p>

      <div className="button-group">
        <button className="download-button" onClick={handleDownload}>
          📄 Download Instructions
        </button>
        <button className="download-button" onClick={handleDownload2}>
          📄 Download Mentorship Details
        </button>
        <button className="download-button" onClick={handleDownload3}>
          📄 Download Notification Document
        </button>
        <button className="download-button" onClick={handleDownload4}>
          📄 Bonafide Certificate Format
        </button>
        <button
          className="next-button"
          onClick={() => navigate("/SummerInternship")}
        >
          ➡ Proceed to Next Step
        </button>
      </div>
      <h2 className="contact">
        If you encounter any issues or for queries, please reach out to us at{' '}
        <span style={{ fontSize: "1.3em", fontWeight: "bold", textDecoration: "underline" }}>
          sip@nitc.ac.in  
        </span>
      </h2>
    </div>
  );
};

export default SummerInternInstr;
