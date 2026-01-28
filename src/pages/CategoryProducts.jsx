import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_BASE } from "../services/api";

export default function CategoryProducts() {
  const { slug } = useParams(); // category slug from URL

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`${API_BASE}/api/category-products/${slug}/`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);                  // category info
        setProducts(data.products || []);   // products list
        setLoading(false);
      })
      .catch((err) => {
        console.error("Category products error:", err);
        setLoading(false);
      });
  }, [slug]);

  /* =========================
     LOADING & EMPTY STATES
  ========================= */
  if (loading) {
    return <p className="text-center">Loading products...</p>;
  }

  if (!products.length) {
    return (
      <div className="category-page">
        <div className="back-link-wrapper">
          <p className="text-center">No products found for "<b>{category?.name}</b>".</p>
          <Link to="/categories" className="back-link">
            <span className="material-icons-round">arrow_back</span>
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">

      {/* BACK TO CATEGORIES */}
      <div className="back-link-wrapper">
        <Link to="/categories" className="back-link">
          <span className="material-icons-round">arrow_back</span>
          Back to Categories
        </Link>
      </div>

      {/* CATEGORY TITLE */}
      <h1 className="category-title">
        {category?.name}
      </h1>

      {/* PRODUCTS GRID */}
      <div className="category-grid">
        {products.map((product) => {
          const variant = product.variants?.[0];
          const primaryImage =
            variant?.images?.find((img) => img.is_primary) ||
            variant?.images?.[0];

          return (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="category-card"
            >
              {/* IMAGE */}
              <div className="category-image-wrapper">
                <img
                  src={`${API_BASE}${primaryImage?.image}`}
                  alt={product.name}
                  className="category-image"
                />
              </div>

              {/* INFO */}
              <div className="category-info">
                <h3 className="category-name">
                  {product.name}
                </h3>
              </div>

              {/* BUTTON */}
              <div className="category-btn-wrapper">
                <span className="category-btn">
                  View Product
                  <span className="material-icons-round">
                    chevron_right
                  </span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
