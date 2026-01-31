import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API_BASE } from "../services/api";
import { useCategories } from "../store/CategoryContext";
import WhatsAppEnquiry from "../components/WhatsAppEnquiry";

const normalizeProducts = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
};

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useCategories();

  const activeCategory = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    setLoading(true);

    let url = `${API_BASE}/api/products/`;

    if (searchQuery) {
      url = `${API_BASE}/api/products/search/?q=${searchQuery}`;
    } else if (activeCategory) {
      url = `${API_BASE}/api/category/${activeCategory}/products/`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(normalizeProducts(data));
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, [searchParams.toString()]);

  const categoryName =
    categories.find(cat => cat.slug === activeCategory)?.name;

  const pageTitle = searchQuery
    ? `Search results for "${searchQuery}"`
    : categoryName || "All Products";

  return (
    <div className="product-list-page">
      <div className="product-list-layout">

        {/* SIDEBAR */}
        <aside className="product-filter">
          <h4 className="filter-title">Categories</h4>

          <button
            className={`filter-pill ${!activeCategory ? "active" : ""}`}
            onClick={() => setSearchParams({}, { replace: true })}
          >
            All Products
          </button>

          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-pill ${activeCategory === cat.slug ? "active" : ""}`}
              onClick={() =>
                setSearchParams({ category: cat.slug }, { replace: true })
              }
            >
              {cat.name}
            </button>
          ))}
        </aside>

        {/* PRODUCT LIST */}
        <section className="product-list-content">
          <h1 className="product-list-title">{pageTitle}</h1>

          {loading && <p>Loading products...</p>}

          {!loading && products.length === 0 && (
            <div className="product-empty-state">
              <p className="product-empty-text">
                No products available at the moment.
              </p>

              <p className="product-empty-subtext">
                Please try another category or check back later.
              </p>
            </div>
          )}


          <div className="product-grid">
            {products.map(product => (
              <div key={product.id} className="product-card-ui">

                <Link to={`/product/${product.slug}`}>
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
                </Link>

                <div className="product-content-ui">
                  <h3>{product.name}</h3>

                  <div className="product-card-actions">
                    <Link
                      to={`/product/${product.slug}`}
                      className="view-product-link"
                    >
                      View details →
                    </Link>

                    {/* ✅ THIS HANDLES EVERYTHING */}
                    <WhatsAppEnquiry product={product} />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
