import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API_BASE } from "../services/api";
import { useCategories } from "../store/CategoryContext";

const ITEMS_PER_PAGE = 12;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  const { categories } = useCategories();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    setLoading(true);
    setCurrentPage(1);

    const url = activeCategory
      ? `${API_BASE}/api/category/${activeCategory}/products/`
      : `${API_BASE}/api/products/`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        // category API is paginated, products API is array
        const productList = activeCategory
          ? data?.results || []
          : Array.isArray(data)
          ? data
          : [];

        setProducts(productList);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeCategory]);

  /* ================= CATEGORY NAME ================= */
  const categoryName =
    categories.find(cat => cat.slug === activeCategory)?.name || "";

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

        {/* ========== SIDEBAR FILTER ========== */}
        <aside className="product-filter">
          <h4 className="filter-title">Categories</h4>

          <button
            className={`filter-pill ${!activeCategory ? "active" : ""}`}
            onClick={() => setSearchParams({})}
          >
            All Products
          </button>

          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-pill ${
                activeCategory === cat.slug ? "active" : ""
              }`}
              onClick={() => setSearchParams({ category: cat.slug })}
            >
              {cat.name}
            </button>
          ))}
        </aside>

        {/* ========== PRODUCT LIST ========== */}
        <section className="product-list-content">
          <h1 className="product-list-title">
            {categoryName || "All Products"}
          </h1>

          {loading && <p className="text-center">Loading products...</p>}

          {!loading && !products.length && (
            <p className="text-center">No products found.</p>
          )}

          <div className="product-grid">
            {paginatedProducts.map(product => (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                className="product-card"
              >
                <div className="product-image-box">
                  <img
                    src={
                      product.primary_image
                        ? `${API_BASE}${product.primary_image}`
                        : "/placeholder.png"
                    }
                    alt={product.name}
                  />
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>
                </div>

                <div className="product-action">
                  View Product
                  <span className="material-icons-round">
                    chevron_right
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* ========== PAGINATION ========== */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
