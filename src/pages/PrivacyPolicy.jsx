import React, { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pp-container">
      <div className="pp-box">

        <div className="pp-header">
          <h1>Privacy Policy</h1>
          <span>Effective Date: 01 January 2026</span>
        </div>

        <p className="pp-desc">
          Fudvira respects your privacy and is committed to protecting your
          personal information. This policy outlines how we collect, use, and
          safeguard your data.
        </p>

        <div className="pp-section">
          <h3>1. Information We Collect</h3>

          <p className="pp-sub">Personal Details</p>
          <ul>
            <li>Name, phone number, email</li>
            <li>Billing and shipping address</li>
          </ul>

          <p className="pp-sub">Order Details</p>
          <ul>
            <li>Products purchased</li>
            <li>Transaction history</li>
          </ul>

          <p className="pp-sub">Technical Data</p>
          <ul>
            <li>Device & browser info</li>
            <li>IP address & cookies</li>
          </ul>
        </div>

        <div className="pp-section">
          <h3>2. Usage of Data</h3>
          <ul>
            <li>Order processing & delivery</li>
            <li>Customer support</li>
            <li>Website improvement</li>
            <li>Marketing (with consent)</li>
          </ul>
        </div>

        <div className="pp-section">
          <h3>3. Data Sharing</h3>
          <p>
            We do not sell your data. Information is shared only with trusted
            services like delivery partners and payment gateways.
          </p>
        </div>

        <div className="pp-section">
          <h3>4. Cookies</h3>
          <p>
            Cookies help improve your browsing experience. You can disable them
            anytime from browser settings.
          </p>
        </div>

        <div className="pp-section">
          <h3>5. Security</h3>
          <p>
            We use advanced security practices, but no system is completely
            secure.
          </p>
        </div>

        <div className="pp-section">
          <h3>6. Your Rights</h3>
          <ul>
            <li>Access your data</li>
            <li>Request updates or deletion</li>
            <li>Opt-out of promotions</li>
          </ul>
        </div>

        <div className="pp-section">
          <h3>7. Contact</h3>
          <p>Email: support@fudvira.com</p>
          <p>Phone: +91 8980145007</p>
        </div>

        <div className="pp-bottom">
          By using Fudvira, you agree to our privacy policy.
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;