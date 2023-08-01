import React, { useState, useRef } from "react";
import "../css/Form.css";

const Form = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [queriesComments, setQueriesComments] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [queriesCommentsError, setQueriesCommentsError] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const formRef = useRef(null);

  const handleCheckboxChange = (event) => {
    setIsCheckboxChecked(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs before submitting
    const isNameValid = validateName();
    const isPhoneValid = validatePhone();
    const isEmailValid = validateEmail();
    const isQueriesCommentsValid = validateQueriesComments();

    if (!isNameValid || !isPhoneValid || !isEmailValid || !isQueriesCommentsValid) {
      return;
    }

    setIsSubmitting(true);

    const formData = {
      name: name,
      phone: phone,
      email: email,
      queriesComments: queriesComments,
    };

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.text();
      console.log(data); // Log the response from the server
      setName("");
      setPhone("");
      setEmail("");
      setQueriesComments("");
      formRef.current.reset();
      setServerMessage(data); // Update the server message state with the response
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    }
  };

  const validateName = () => {
    const regex = /^[a-zA-Z\s]+$/;
    const isValid = regex.test(name);
    setNameError(!isValid);
    return isValid;
  };

  const validatePhone = () => {
    // Implement your phone number validation logic here
    // Example: using a regular expression for a 10-digit number
    const regex = /^\d{10}$/;
    const isValid = regex.test(phone);
    setPhoneError(!isValid);
    return isValid;
  };

  const validateEmail = () => {
    // Implement your email validation logic here
    // Example: using a regular expression for a simple email format
    const regex = /^\S+@\S+\.\S+$/;
    const isValid = regex.test(email);
    setEmailError(!isValid);
    return isValid;
  };

  const validateQueriesComments = () => {
    const isValid = queriesComments.trim() !== "";
    setQueriesCommentsError(!isValid);
    return isValid;
  };

  return (
    <div className="formContainer">
      <div className="formHolder">
        {/* Title */}
        <div className="whyRecruitTitleContainer">
          <h1 className="pageHeadingForm">#Talent You’re Looking For</h1>
        </div>
        {/* Form */}
        <form className="form" onSubmit={handleSubmit} ref={formRef}>
          <div className={`inputContainer ${nameError ? "error" : ""}`}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              onBlur={validateName}
            />
            {nameError && <span className="errorText">Invalid name</span>}
          </div>
          <div className={`inputContainer ${phoneError ? "error" : ""}`}>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              onBlur={validatePhone}
            />
            {phoneError && <span className="errorText">Invalid phone number</span>}
          </div>
          <div className={`inputContainer ${emailError ? "error" : ""}`}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Your Email ID"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={validateEmail}
            />
            {emailError && <span className="errorText">Invalid email</span>}
          </div>
          <div className={`inputContainer ${queriesCommentsError ? "error" : ""}`}>
            <label htmlFor="queriesComments">Queries/Comments</label>
            <input
              type="text"
              id="queriesComments"
              name="queriesComments"
              placeholder="Your Queries or Comments"
              value={queriesComments}
              onChange={(event) => setQueriesComments(event.target.value)}
              onBlur={validateQueriesComments}
            />
            {queriesCommentsError && <span className="errorText">Cannot be empty</span>}
          </div>
          <div className="formSubmitContainer">
            <div className="checkboxContainer">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="terms">
                By clicking, you acknowledge and accept our terms and conditions.
              </label>
            </div>
            <button
              type="submit"
              className={isCheckboxChecked ? "activeButton" : ""}
              disabled={!isCheckboxChecked || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loadingSpinner" />
                  Submitting
                </>
              ) : (
                " Submit "
              )}
            </button>
          </div>
        </form>
        {serverMessage && (
          <div className="messageContainer">
            <pre>{serverMessage}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
