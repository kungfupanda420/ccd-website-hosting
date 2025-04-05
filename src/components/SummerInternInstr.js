import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/SummerInternInstr.css";

const SummerInternInstr = () => {
  return (
    <div className="instructions-container">
      <h2 className="contact">
        Registered students have been sent an email with a deadline of 5:00 PM,
        April 5, 2025. Please complete the task at the earliest to ensure your
        application is processed smoothly.
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
