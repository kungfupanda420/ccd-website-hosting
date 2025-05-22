import React, { useState } from "react";
import "../css/LogIn.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

function Login() {
  const [showpwd, setShowpwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleShow() {
    setShowpwd(prev => !prev)
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Log the credentials being sent
    console.log("Sending to /api/login:", { email, password });

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(response => {
      if (response.status === 200) {
        window.location.href = "/admin@CCD_nitc123";
      } else if (response.status === 401) {
        throw new Error('Invalid credentials');
      } else {
        throw new Error('An error occurred while logging in');
      }
    }).catch(error => {
      alert(error.message);
    });
  }

  return (
    <div className="loginContainer">
      <div className="AdminLogIn">
        <h1 className="mainHeading">Admin</h1>
        <form className="formLogIn" onSubmit={handleSubmit}>
          <div className="fillBoxInput mediumHeading">
            <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <p className="tinyTexts">Enter Correct Details</p>
          </div>
          <div className="fillBoxInput mediumHeading">
            <input type={showpwd ? "text" :"password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <span className="eyeIcon" onClick={handleShow}>
              {showpwd ? <AiFillEye /> : <AiFillEyeInvisible/>}
            </span>
            <p className="tinyTexts">Enter Correct Details</p>
          </div>
          <button type="submit" className="loginBtn">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;