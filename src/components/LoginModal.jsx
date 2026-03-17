import { useState } from "react";
import logo from "../assets/images/logo.png";
import { sendOTP } from "../services/authApi";
import OTPModal from "./OTPModal";
import { Link } from "react-router-dom";
function LoginModal({ closeModal }) {

  const [mobile, setMobile] = useState("");
  const [showOTP, setShowOTP] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ======================
     MOBILE INPUT
  ====================== */

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) setMobile(value);
  };

  const isValid = mobile.length === 10;

  /* ======================
     SEND OTP API
  ====================== */

  const handleSendOTP = async () => {

    if (!isValid) return;

    setLoading(true);
    setError("");

    try {
      const res = await sendOTP(mobile);

      if (res.status) {
        setShowOTP(true);
      } else {
        setError(res.message || "Failed to send OTP");
      }

    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (

    <>
      <div className="login-overlay">

        <div className="login-modal">

          {/* HEADER */}
          <div className="login-header">
            <span
              className="material-icons-round back-icon"
              onClick={closeModal}
            >
              arrow_back
            </span>
          </div>

          {/* CONTENT */}
          <div className="login-content">

            <div className="login-logo">
              <img src={logo} alt="Fudvira Logo" />
            </div>

            <h2>Welcome to Fudvira</h2>

            <p className="login-subtitle">
              Fresh groceries & essentials delivered fast

            </p>
            <span className="ls-title">Log in or Sign up</span>

            {/* MOBILE INPUT */}
            <div className="mobile-input">

              <span className="country-code">+91</span>

              <input
                type="tel"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={handleChange}
              />

            </div>

            {/* ERROR */}
            {error && <p className="error-text">{error}</p>}

            {/* BUTTON */}
            <button
              className={`auht-btn ${isValid ? "active" : ""}`}
              disabled={!isValid || loading}
              onClick={handleSendOTP}
            >
              {loading ? "Sending..." : "Continue"}
            </button>

            <p className="terms">
              By continuing you agree to our{" "}

            

              <Link
                to="/terms-and-conditions"
                onClick={() => {
                  closeAll?.();
                  window.scrollTo(0, 0);
                }}
                className="terms-link"
              >
                Terms of Service
              </Link>

              {" "} & {" "}

              <Link
                to="/privacy-policy"
                onClick={() => {
                  closeAll?.();
                  window.scrollTo(0, 0);
                }}
                className="terms-link"
              >
                Privacy Policy
              </Link>
            </p>

          </div>

        </div>

      </div>

      {/* OTP MODAL */}
      {showOTP && (
        <OTPModal
          mobile={mobile}
          closeOTP={() => setShowOTP(false)}
        />
      )}
    </>

  );
}

export default LoginModal;