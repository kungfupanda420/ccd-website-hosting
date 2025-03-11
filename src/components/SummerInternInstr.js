import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/SummerInternInstr.css'

const SummerInternInstr = () => {
    const navigate = useNavigate();

    const handleDownload = () => {
        // Replace 'instructions.pdf' with your actual PDF file path
        const link = document.createElement("a");
        link.href = "/documents/instructions.pdf";
        link.download = "Instructions.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="instructions-container">
            <h2>Important Instructions</h2>
            <p>
                Please read the instructions carefully before proceeding.
            </p>

            <div className="button-group">
                <button className="download-button" onClick={handleDownload}>
                    📄 Download Instructions
                </button>
                <button className="next-button" onClick={() => navigate("/SummerInternship")}>
                    ➡ Proceed to Next Step
                </button>
            </div>
        </div>
    );
};

export default SummerInternInstr;
