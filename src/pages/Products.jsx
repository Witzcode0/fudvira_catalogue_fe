import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API_BASE } from "../services/api";
import { useCategories } from "../store/CategoryContext";
import WhatsAppEnquiry from "../components/WhatsAppEnquiry";

/* Normalize paginated API response */
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
  const page = Number(searchParams.get("page") || 1);

  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(count / 6);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    setLoading(true);

    let url = `${API_BASE}/api/products/?page=${page}`;

    if (searchQuery) {
      url = `${API_BASE}/api/products/search/?q=${encodeURIComponent(
        searchQuery
      )}&page=${page}`;
    } else if (activeCategory) {
      url = `${API_BASE}/api/products/?category=${activeCategory}&page=${page}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(normalizeProducts(data));
        setCount(data.count || 0);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setCount(0);
        setLoading(false);
      });
  }, [searchParams.toString()]);

  /* ================= PAGE TITLE ================= */
  const categoryName = categories.find(
    (cat) => cat.slug === activeCategory
  )?.name;

  const pageTitle = searchQuery
    ? `Search results for "${searchQuery}"`
    : categoryName || "All Products";

  /* ================= PAGE CHANGE ================= */
  const changePage = (newPage) => {
    const params = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...params, page: newPage });
    window.scrollTo(0, 0);
  };

  return (
    <div className="product-list-page">
      <div className="product-list-layout">

        {/* ================= SIDEBAR ================= */}
        <aside className="product-filter">
          <h4 className="filter-title">Categories</h4>

          <button
            className={`filter-pill ${!activeCategory ? "active" : ""}`}
            onClick={() => setSearchParams({}, { replace: true })}
          >
            All Products
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-pill ${activeCategory === cat.slug ? "active" : ""
                }`}
              onClick={() =>
                setSearchParams({ category: cat.slug }, { replace: true })
              }
            >
              {cat.name}
            </button>
          ))}
        </aside>

        {/* ================= PRODUCT LIST ================= */}
        <section className="product-list-content">
          <h1 className="product-list-title">{pageTitle}</h1>

          {loading && <p>Loading products...</p>}

          {!loading && products.length === 0 && (
            <div className="product-empty-state">
              <p className="product-empty-text">
                No products available at the moment.
              </p>
            </div>
          )}

          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card-ui">
                <Link to={`/product/${product.slug}`}>
                  <div className="product-image-ui">
                    <img
                      src={product.primary_image || "/placeholder.png"}
                      alt={product.name}
                      loading="lazy"
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

                    <WhatsAppEnquiry product={product} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ================= PAGINATION ================= */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                disabled={page === 1}
                onClick={() => changePage(page - 1)}
              >
                ← Prev
              </button>

              <span className="page-info">
                Page {page} of {totalPages}
              </span>

              <button
                className="page-btn"
                disabled={page === totalPages}
                onClick={() => changePage(page + 1)}
              >
                Next →
              </button>
            </div>
          )}

        </section>
      </div>
    </div>
  );
}
