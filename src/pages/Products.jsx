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
  const page = Number(searchParams.get("page") || 1);

  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

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

  const changePage = (newPage) => {
    const params = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...params, page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categoryName = categories.find(
    (cat) => cat.slug === activeCategory
  )?.name;

  const pageTitle = searchQuery
    ? `Search results for "${searchQuery}"`
    : categoryName || "All Products";

  return (
    <div className="green-shop">
      {/* Sidebar */}
      <aside className="green-sidebar">
        <h3>Categories</h3>

        <button
          className={`green-category ${!activeCategory ? "active" : ""}`}
          onClick={() => setSearchParams({}, { replace: true })}
        >
          All Products
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`green-category ${
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

      {/* Main Content */}
      <main className="green-content">
        <div className="green-header">
          <h1>{pageTitle}</h1>
          <span>{count} Products</span>
        </div>

        {loading && <p className="loading-text">Loading products...</p>}

        {!loading && products.length === 0 && (
          <div className="empty-box">
            <p>No products available</p>
          </div>
        )}

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

        {totalPages > 1 && (
          <div className="green-pagination">
            <button
              disabled={page === 1}
              onClick={() => changePage(page - 1)}
            >
              Prev
            </button>

            <span>
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => changePage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}