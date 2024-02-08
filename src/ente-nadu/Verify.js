import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Verify.css";

function Verify() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerifyOTP = async (event) => {
    event.preventDefault();

    // Add validation or other logic as needed

    console.log("OTP entered:", otp);

    // Clear any previous errors
    setError("");

    // Simulate a delay for demonstration purposes (replace with actual logic)
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (otp === "1234") {
        // Correct OTP, navigate to reset password page
        navigate("/Reset");
      } else {
        // Incorrect OTP, display error message
        setError("Incorrect OTP. Please try again.");
      }
    }, 2000);
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

export default Verify;
