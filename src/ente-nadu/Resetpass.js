import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Resetpass.css";

function Resetpass() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (event) => {
    event.preventDefault();

    // Add validation or other logic as needed

    console.log("Reset password request sent for phone number:", phone);
    console.log("Email address:", email);

    setLoading(true);

    // Simulate a delay for demonstration purposes (replace with actual logic)
    setTimeout(() => {
      setLoading(false);
      alert("Reset password request sent successfully. Please check your phone.");
      navigate("/Verify"); // Redirect to home page or any other page
    }, 2000);
  };

  return (
    <div className="reset-pass-page">
      <div className="reset-pass-container">
        <h2>Reset Password</h2>
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
