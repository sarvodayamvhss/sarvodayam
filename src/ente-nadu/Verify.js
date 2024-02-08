import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Verify.css"; // Assuming you have a CSS file for styling

function Verify() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerifyOTP = async (event) => {
    event.preventDefault();


    console.log("OTP entered:", otp);
    setLoading(false);
    
    navigate("/");
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
