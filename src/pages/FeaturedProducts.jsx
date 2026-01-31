import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../services/api";

/* Normalize API response safely */
const normalizeProducts = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/products/featured/`)
      .then(res => res.json())
      .then(data => {
        const list = normalizeProducts(data);
        setProducts(list.slice(0, 8)); // latest 8 featured
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, []);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <section className="featured-products-section">
        <h2 className="section-title">Featured Products</h2>
        <p className="text-center">Loading products...</p>
      </section>
    );
  }

  /* ================= EMPTY STATE (IMPORTANT FIX) ================= */
  if (products.length === 0) {
    return (
      <section className="featured-products-section">
        <h2 className="section-title">Featured Products</h2>

        <div className="featured-empty">
          <p className="featured-empty-text">
            No featured products available right now.
          </p>

          <Link to="/products" className="featured-empty-link">
            Browse all products →
          </Link>
        </div>
      </section>
    );
  }

  /* ================= FEATURED PRODUCTS ================= */
  return (
    <section className="featured-products-section">
      <div className="featured-header">
        <h2 className="section-title">Featured Products</h2>
        <Link to="/products" className="view-all-link">
          View all
        </Link>
      </div>
      

      <div className="product-grid">
        {products.map(product => (
          <Link
            key={product.id}
            to={`/product/${product.slug}`}
            className="product-card-ui"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="product-image-ui">
              <img
                src={
                  product.primary_image
                    ? `${API_BASE}${product.primary_image}`
                    : "/placeholder.png"
                }
                alt={product.name}
              />
            </div>

            <div className="product-content-ui">
              <h3>{product.name}</h3>
              <span className="view-product-link">
                View details →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
