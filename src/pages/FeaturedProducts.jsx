import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../services/api";
import WhatsAppEnquiry from "../components/WhatsAppEnquiry";

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
      .then((res) => res.json())
      .then((data) => {
        const list = normalizeProducts(data);
        setProducts(list.slice(0, 8)); // show latest 8 featured
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

  /* ================= EMPTY STATE ================= */
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

      <div className="green-grid">
                {products.map((product) => (
                  <div key={product.id} className="green-card">
                    <Link to={`/product/${product.slug}`}>
                      <div className="green-image">
                        <img
                          src={product.primary_image || "/placeholder.png"}
                          alt={product.name}
                        />
                      </div>
                   
      
                    <div className="green-info">
                      <h4 style={{textDecoration:"none"}}>{product.name}</h4>
                      <div className="green-actions">
                        <WhatsAppEnquiry product={product} />
                      </div>
                    </div>
                     </Link>
                  </div>
                ))}
              </div>
    </section>
  );
}
