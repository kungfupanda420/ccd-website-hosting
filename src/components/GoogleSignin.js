import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // <-- Correct import
import axios from "axios";
import "../css/GoogleAuth.css";

const GoogleSignin = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential); // <-- Use jwtDecode
      const userData = {
        email: decoded.email,
        name: decoded.name,
        google_id: decoded.sub,
        picture: decoded.picture,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        userData
      );

      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("data", JSON.stringify(response.data));

      window.location.href = "/";
    } catch (error) {
      console.error("Google Auth Error:", error);
    }
  };

  const handleError = () => {
    console.log("Google Auth Failed");
  };

  return (
    <div className="google-auth-container">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          text="signin_with"
          shape="pill"
          size="large"
          width="300"
        />
       
      </GoogleOAuthProvider>
       {/* <button onClick={window.location.href = "/register"}>signup</button> */}
    </div>
  );
};

export default GoogleSignin;