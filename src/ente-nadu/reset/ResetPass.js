import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVerificationContext } from "./VerificationContext";
import { dataRef } from "../../Firebase";
import "./Resetpass.css";

function ResetPass() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const { verificationData, storeVerificationData, storeConfirmationResult } =
    useVerificationContext();

    useEffect(() => {
      if (!verificationData || !verificationData.userId) {
        navigate("/");
      }
    }, [verificationData, navigate]);
  
  const userId = verificationData?.userId;
  const handleResetPassword = async (event) => {
    event.preventDefault();

    // Check if userId exists
    const userRef = dataRef.ref(`registrations/${userId}`);
    const userSnapshot = await userRef.once("value");

    if (userSnapshot.exists()) {
      setError("");
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      // Update the password for the user in the database
      const newPassword = password;
      userRef.update({ password: newPassword });
      setLoading(true);

      let timeoutId;
      timeoutId = setTimeout(() => {
        setLoading(false);
        setSuccessMessage("Password reset successfully.");

        storeVerificationData(null);
        storeConfirmationResult(null);

        navigate("/");
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setError("User not found. Please check your credentials.");
      setTimeout(() => {
        navigate("/entenadu/reset-pass");
      }, 2000);
    }
  };

  return (
    <div className="reset-pass-page">
      <div className="reset-pass-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPass;
