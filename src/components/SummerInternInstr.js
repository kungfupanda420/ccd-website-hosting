import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/SummerInternInstr.css";

const SummerInternInstr = () => {
  return (
    <div className="instructions-container">
      <h2 className="contact">
        The SIP application scrutiny process is currently in progress.
        <br />
        For any queries, please contact us at{" "}
        <span
          style={{
            fontSize: "1.3em",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          sip@nitc.ac.in
        </span>
      </h2>
    </div>
  );
};

export default SummerInternInstr;
