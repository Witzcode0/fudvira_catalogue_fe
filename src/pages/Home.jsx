import { Link } from "react-router-dom";
import heroDesktop from "../assets/images/hero-desktop.jpg";
import heroTablet from "../assets/images/hero-tablet.jpg";
import heroMobile from "../assets/images/hero-mobile.jpg";

export default function HeroSection() {
  return (
    <>

      <section className="hero">

        {/* RESPONSIVE IMAGE */}
        <picture className="hero-bg">
          <source srcSet={heroMobile} media="(max-width: 768px)" />
          <source srcSet={heroTablet} media="(max-width: 1024px)" />
          <img src={heroDesktop} alt="Fudvira Natural Foods" />
        </picture>

        {/* OVERLAY */}
        <div className="hero-overlay"></div>

        {/* CONTENT */}
        <div className="hero-content container">
          <h1 className="hero-title">
            Wholesome Nutrition From Nature
            <span>✔ 100% Pure • Ethically Sourced</span>
          </h1>

          <p className="hero-subtitle">
            Premium herbal blends, spices, vegetable powders, fruit powders, and natural honey <br /> —
            crafted with care for everyday health and wellness.

          </p>

          <div className="hero-actions">
            <Link to="/categories" className="btn btn-primary">
              Browse Categories
            </Link>

            <Link to="/products" className="btn btn-outline">
              View All Products
            </Link>
          </div>

        </div>
      </section>

      {/* ================= WHY FUDVIRA ================= */}
      <section className="home-section light">
        <h2 className="center">Why Choose Fudvira?</h2>

        <p className="section-subtitle">
          Naturally sourced, carefully processed, and crafted for everyday wellness
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <span className="material-icons-round">verified</span>
            <h4>100% Pure</h4>
            <p>No chemicals, no additives, only nature.</p>
          </div>

          <div className="feature-card">
            <span className="material-icons-round">spa</span>
            <h4>Health First</h4>
            <p>Nutrient-rich powders for daily wellness.</p>
          </div>

          <div className="feature-card">
            <span className="material-icons-round">eco</span>
            <h4>Ethically Sourced</h4>
            <p>Carefully sourced from trusted farms.</p>
          </div>

          <div className="feature-card">
            <span className="material-icons-round">local_shipping</span>
            <h4>Pan India Delivery</h4>
            <p>Fast & reliable shipping across India.</p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="home-cta">
        <div className="home-cta-content">
          <h2>Bulk & Business Orders with Fudvira</h2>

          <p>
            Looking for premium food powders, herbal products, or natural honey in bulk?
            Partner with Fudvira for consistent quality, competitive pricing, and
            reliable supply tailored to your business needs.
          </p>

          <a
            href="https://wa.me/918980145007?text=Hello%20Fudvira%20Team%20👋%0AI%20am%20interested%20in%20bulk%20or%20business%20orders.%20Please%20share%20pricing,%20MOQ,%20and%20product%20details."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <i className="fab fa-whatsapp"></i>
            Talk to Our Sales Team
          </a>

        </div>
      </section>

    </>

  );
}
