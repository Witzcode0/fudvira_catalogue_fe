import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API_BASE } from "../services/api";
import { useCategories } from "../store/CategoryContext";

const ITEMS_PER_PAGE = 12;

const normalizeProducts = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
};

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const { categories } = useCategories();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    setLoading(true);
    setCurrentPage(1);

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

  /* ================= TITLE ================= */
  const categoryName =
    categories.find(cat => cat.slug === activeCategory)?.name;

  const pageTitle = searchQuery
    ? `Search results for "${searchQuery}"`
    : categoryName || "All Products";

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="product-list-page">
      <div className="product-list-layout">

        {/* SIDEBAR */}
        <aside className="product-filter">
          <h4 className="filter-title">Categories</h4>

          {/* ✅ ALL PRODUCTS */}
          <button
            className={`filter-pill ${
              !activeCategory && !searchQuery ? "active" : ""
            }`}
            onClick={() => setSearchParams({}, { replace: true })}
          >
            All Products
          </button>

          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-pill ${
                activeCategory === cat.slug ? "active" : ""
              }`}
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

          {loading && <p className="text-center">Loading products...</p>}
          {!loading && !products.length && (
            <p className="text-center">No products found.</p>
          )}

          <div className="product-grid">
            {paginatedProducts.map(product => (
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
      </div>
    </div>
  );
}
