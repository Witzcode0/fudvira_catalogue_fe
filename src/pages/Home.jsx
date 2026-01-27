import { Link } from "react-router-dom";
import { useCategories } from "../store/CategoryContext";

export default function Home() {
  const { categories, loading } = useCategories();

  return (
    <main className="home-body">

      {/* ================= HERO ================= */}
      <section className="home-hero">
        <div className="hero-content">
          <h1>
            Pure • Natural • Trusted <br />
            <span>Food & Herbal Powders</span>
          </h1>

          <p>
            Discover premium quality fruit powders, herbal powders,
            spices, and natural honey — sourced with care.
          </p>

          <div className="hero-actions">
            <Link to="/categories" className="btn-primary">
              Browse Categories
            </Link>

            <Link to="/products" className="btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="home-section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <Link to="/categories">View all</Link>
        </div>

        <div className="category-preview-grid">
          {loading && <p>Loading categories...</p>}

          {!loading &&
            categories.slice(0, 5).map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="category-preview-card"
              >
                <div className="category-preview-name">
                  {cat.name}
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* ================= WHY FUDVIRA ================= */}
      <section className="home-section light">
        <h2 className="center">Why Choose Fudvira?</h2>

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
        <h2>Looking for Bulk or Business Orders?</h2>
        <p>
          Connect with us for wholesale pricing and custom requirements.
        </p>

        <a
          href="https://wa.me/918980145007"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Contact on WhatsApp
        </a>
      </section>

    </main>
  );
}
