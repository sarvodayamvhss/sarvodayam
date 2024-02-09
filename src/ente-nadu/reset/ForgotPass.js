import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { dataRef, auth } from "../../Firebase";
import { useVerificationContext } from "./VerificationContext";
import "./Resetpass.css";

function ForgotPass() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { storeVerificationData, storeConfirmationResult } = useVerificationContext();

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (phone.length !== 10 || isNaN(phone)) {
      setError("Phone number must be 10 digits.");
      return;
    }

    if (!email || !email.includes("@")) {
      setError("Invalid email address.");
      return;
    }

    const userId = email.split("@")[0] + phone;
    const userRef = dataRef.ref(`registrations/${userId}`);

    // Check if userId exists in the database
    userRef.once("value", async (snapshot) => {
      if (snapshot.exists()) {
        setError("");
        setLoading(true);

        try {
          const appVerifier = new RecaptchaVerifier(auth, "recaptcha", {
            size: "normal",
          });

          const formatedPhone = phone.replace(/^0+|^\+91/g, "");

          const confirmationResult = await signInWithPhoneNumber(
            auth,
            `+91${formatedPhone}`,
            appVerifier
          );
          setLoading(false);

          const otpSent = confirmationResult.verificationId;

          storeVerificationData({
            userId,
            otpSent,
          });

          storeConfirmationResult(confirmationResult);

          navigate(`/entenadu/reset-pass/verify`);
        } catch (error) {
          setLoading(false);
          setError(`Error sending verification code: ${error.message}`);
        }
      } else {
        setError("User not found. Please check your credentials.");
      }
    });
  };

  return (
    <div className="reset-pass-page">
      <div className="reset-pass-container">
        <h2>Enter Credentials</h2>
        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <label htmlFor="phone">Phone number</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Enter your Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              minLength={10}
              maxLength={10}
              pattern="[0-9]+"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send Reset OTP"}
            </button>
          </div>
          <div id="recaptcha"></div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPass;
