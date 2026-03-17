import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
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
                href="https://www.facebook.com/profile.php?id=61588065655380"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>

              <a
                href="https://www.instagram.com/thefudviraofficial/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>


              <a
                href="https://wa.me/919408501190?text=Hello%20Fudvira%20Team%20👋%0AI%20visited%20your%20catalogue%20and%20would%20like%20to%20know%20more%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp"></i>
              </a>

              <a
                href="https://www.linkedin.com/company/110510031/admin/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </a>

            </div>
          </div>

          {/* Pages */}
          <div className="footer-col">
            <h4>Pages</h4>
            <ul>
              <li>
                <Link to="/" onClick={() => {
                  closeAll();
                  window.scrollTo(0, 0);
                }}>
                  Home
                </Link>

              </li>
              <li>
                <Link to="/categories">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/products">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* POLICIES */}
          <div className="footer-col">
            <h4>Legal & Policies</h4>
            <ul>
              <li>
                <Link to="/terms-and-conditions" onClick={() => {
                  closeAll();
                  window.scrollTo(0, 0);
                }}>
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

          {/* MARKETPLACES */}
          <div className="footer-col">
            <h4>Available On</h4>
            <ul className="external-links">
              <li>
                <a href="https://www.indiamart.com/bharatoxen-surat/" target="_blank" rel="noopener noreferrer">
                  IndiaMART
                </a>
              </li>
              <li>
                <a href="https://www.flipkart.com/search?q=fudvira" target="_blank" rel="noopener noreferrer">
                  Flipkart
                </a>
              </li>
              <li>
                <a href="https://www.amazon.in/s?k=fudvira" target="_blank" rel="noopener noreferrer">
                  Amazon
                </a>
              </li>
              <li>
                <a href="https://www.meesho.com/search?q=fudvira" target="_blank" rel="noopener noreferrer">
                  Meesho
                </a>
              </li>
            </ul>

          </div>

         {/* CONTACT */}
<div className="footer-col">
  <h4>Contact</h4>

  <ul>

    <li>
      <i className="fa-solid fa-phone footer-icon"></i>
      +91 940-8501-190
    </li>

    <li>
      <i className="fa-solid fa-envelope footer-icon"></i>
      <a href="mailto:info@fudvira.com">
        info@fudvira.com
      </a>
    </li>

    <li>
      <i className="fa-solid fa-location-dot footer-icon"></i>
      Shayona Plaza, 306, Vesu Canal Rd, nr. BRTS, Punagam,
      Yoginagar Society, Surat, Gujarat 395010
    </li>

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
