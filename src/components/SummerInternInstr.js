import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/SummerInternInstr.css";

const SummerInternInstr = () => {
  return (
    <div className="instructions-container">
      <h2 className="contact">
        The registrations have been closed on March 26th, 2025, at 5 P.M., as mentioned in the instructions.<br/>
        For any queries, please contact us at{" "}
        <span style={{ fontSize: "1.3em", fontWeight: "bold", textDecoration: "underline" }}>
          sip@nitc.ac.in  
        </span>
      </h2>
    </div>
  );
};

export default SummerInternInstr;
