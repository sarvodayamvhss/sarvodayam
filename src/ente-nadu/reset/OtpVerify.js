import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVerificationContext } from "./VerificationContext";
import "./Verify.css";

function OtpVerify() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { verificationData } = useVerificationContext();

  useEffect(() => {
    if (!verificationData) {
      navigate("/");
    }
  }, [verificationData, navigate]);

  const confirmationResult = verificationData?.confirmationResult;

  const handleVerifyOTP = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      if (confirmationResult) {
        await confirmationResult.confirm(otp);
        navigate("/entenadu/reset-pass/reset");
      } else {
        console.error("No confirmation result available.");
        setError("Error confirming code. Please try again.");
      }
    } catch (error) {
      console.error("Error confirming code:", error.message);
      setError("Incorrect OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="verify-otp-page">
      <div className="verify-otp-container">
        <h2>Verify OTP</h2>
        <form onSubmit={handleVerifyOTP}>
          <div className="form-group">
            <label htmlFor="otp">Enter OTP</label>
            <input
              type="text"
              className="form-control"
              id="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-group">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OtpVerify;
