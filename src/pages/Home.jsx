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

      <section className="home-section">
        <h2 className="center">Who We Serve</h2>
        <p className="section-subtitle"> Fudvira proudly serves individuals and businesses across India. </p>
        <div className="serve-grid">
          <div className="serve-card">Retail Customers</div>
          <div className="serve-card">Wholesalers</div>
          <div className="serve-card">Retail Stores</div>
          <div className="serve-card">Health Partners</div>
          <div className="serve-card">Export Partners</div>
        </div>
      </section>


      {/* PRICE LIST SECTION */}
      <section className="home-price">
        <div className="home-price-container">
          <div className="home-price-content">
            <h2>Product Price List</h2>
            <p>
              Explore our latest product pricing based on pack size, quality, and
              purchase type. Ideal for both retail and bulk buyers.
            </p>

            <Link to="/price-list" className="home-price-btn">
              View Price List
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
            <p>No chemicals, no additives, only natural goodness.</p>
          </div>

          <div className="feature-card">
            <span className="material-icons-round">spa</span>
            <h4>Health First</h4>
            <p>Nutrient-rich powders and honey for everyday wellness.</p>
          </div>

          <div className="feature-card">
            <span className="material-icons-round">eco</span>
            <h4>Ethically Sourced</h4>
            <p>Carefully sourced from trusted farms and producers.</p>
          </div>

          <div className="feature-card">
            <span className="material-icons-round">science</span>
            <h4>Minimal Processing</h4>
            <p>Processed gently to retain natural nutrients and taste.</p>
          </div>

          <div className="feature-card">
            <span className="material-icons-round">fact_check</span>
            <h4>Quality Checked</h4>
            <p>Each batch undergoes strict quality and hygiene checks.</p>
          </div>

          <div className="feature-card">
            <span className="material-icons-round">inventory_2</span>
            <h4>Careful Packaging</h4>
            <p>Hygienic, secure packaging to maintain freshness.</p>
          </div>

          <div className="feature-card">
            <span className="material-icons-round">local_shipping</span>
            <h4>Pan India Delivery</h4>
            <p>Fast and reliable delivery across India.</p>
          </div>

          <div className="feature-card">
            <span className="material-icons-round">handshake</span>
            <h4>Trusted by Businesses</h4>
            <p>Preferred by retailers, wholesalers, and health brands.</p>
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
            href="https://wa.me/918980145007?text=Hello%20Fudvira%20Team%20%0AI%20am%20interested%20in%20bulk%20or%20business%20orders.%20Please%20share%20pricing,%20MOQ,%20and%20product%20details."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <i className="fab fa-whatsapp"></i>
            Talk to Our Sales Team
          </a>

        </div>
      </section>



      

      {/* <section className="home-section light">
        <h2 className="center">How Fudvira Works</h2>
        <p className="section-subtitle">
          From sourcing to delivery, we follow a simple and transparent process
          to ensure quality at every step.
        </p> <div className="steps-grid">
          <div className="step-card">
            <span>01</span>
            <h4>Choose Products</h4>
            <p>Browse our curated range of natural products.</p>
          </div>
          <div className="step-card">
            <span>02</span>
            <h4>Place Order</h4>
            <p>Order online or contact us for bulk requirements.</p>
          </div> <div className="step-card">
            <span>03</span>
            <h4>We Deliver</h4>
            <p>Safe, hygienic, and timely delivery across India.</p>
          </div>
        </div>
      </section> */}

    </>

  );
}
