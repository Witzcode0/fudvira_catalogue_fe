import { Link } from "react-router-dom";
import heroDesktop from "../assets/images/hero-desktop.jpg";
import heroTablet from "../assets/images/hero-tablet.jpg";
import heroMobile from "../assets/images/hero-mobile.jpg";

export default function HeroSection() {
  return (
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
  );
}
