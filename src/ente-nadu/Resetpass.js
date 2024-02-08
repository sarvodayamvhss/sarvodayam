import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Resetpass.css";
import "./Verify"


function Resetpass() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (event) => {
    event.preventDefault();
    
    if (phone.length !== 10 || isNaN(phone)) {
      setError("Phone number must be 10 digits.");
      return;
    }


    console.log("Reset password OTP sent to:", phone);
    setLoading(false);
    navigate("/Verify"); // Redirect to home page (or any other page) after sending the OTP
  };

  return (
    <div className="reset-pass-page">
      <div className="reset-pass-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <label htmlFor="phone">Phone number</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="Enter your Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-group">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Sending OTP..." : "Send Reset OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Resetpass;
