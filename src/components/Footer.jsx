import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">

        <div className="footer-top">

          {/* BRAND */}
          <div className="footer-col">
            <img
              src={logo}
              alt="Fudvira Logo"
              className="footer-logo"
            />

            <p className="brand-desc">
              Fudvira is a quality-driven food brand offering pure fruit powders,
              vegetable powders, herbal powders, spices, and natural honey.
            </p>

            <div className="footer-social">
              <a
                href="https://www.facebook.com/profile.php?id=61584767964819"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>

              <a
                href="https://www.instagram.com/fudvira"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>

              <a
                href="https://wa.me/918980145007?text=Hello%20Fudvira%20Team%20👋%0AI%20visited%20your%20catalogue%20and%20would%20like%20to%20know%20more%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* POLICIES */}
          <div className="footer-col">
            <h4>Legal & Policies</h4>
            <ul>
              <li>
                <Link to="/terms-and-conditions">
                  Terms & Conditions
                </Link>

              </li>
              <li>
                <Link to="/certificates">
                  Certificates
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>+91 89801 45007</li>
              <li>+91 84908 46001</li>
              <li>
                <a href="mailto:info@fudvira.com">
                  info@fudvira.com
                </a>
              </li>
            </ul>
          </div>

          {/* MARKETPLACES */}
          <div className="footer-col">
            <h4>Available On</h4>
            <ul>
              <li contrast>IndiaMART</li>
              <li>Flipkart</li>
              <li>Amazon</li>
              <li>Meesho</li>
            </ul>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="footer-bottom">
          © 2025 <strong>Bharat Oxen</strong> — All Rights Reserved
        </div>

      </div>
    </footer>
  );
}
