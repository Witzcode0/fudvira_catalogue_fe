import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API_BASE } from "../services/api";
import { useCategories } from "../store/CategoryContext";
import WhatsAppEnquiry from "../components/WhatsAppEnquiry";
import { truncateText } from "../utils/textUtils";

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

  const [view, setView] = useState("list");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  }, []);

  useEffect(() => {

    setLoading(true);

    let url = `${API_BASE}/api/products/?page=${page}`;

    if (searchQuery) {
      url = `${API_BASE}/api/products/search/?q=${encodeURIComponent(searchQuery)}&page=${page}`;
    }
    else if (activeCategory) {
      url = `${API_BASE}/api/products/?category=${activeCategory}&page=${page}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
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

  const currentView = isMobile ? "grid" : view;

  return (

    <div className="shop-container">

      {/* SIDEBAR */}

      <aside className="shop-sidebar">

        {/* <div className="filter-box">
          <h3>FILTER</h3>

          <div className="filter-section">
            <h4>Filter by Price</h4>

            <input type="range" min="10" max="1000"/>

            <div className="price-row">
              <span>$10 - $1000</span>
              <button className="filter-btn">Filter</button>
            </div>

          </div>
        </div> */}

        <div className="category-box">

          <h3>CATEGORIES</h3>

          <button
            className={`category-item ${!activeCategory ? "active" : ""}`}
            onClick={() => setSearchParams({}, { replace: true })}
          >
            All Products
          </button>

          {categories.map(cat => (

            <button
              key={cat.id}
              className={`category-item ${activeCategory === cat.slug ? "active" : ""
                }`}
              onClick={() =>
                setSearchParams({ category: cat.slug }, { replace: true })
              }
            >
              {cat.name}
            </button>

          ))}

        </div>

      </aside>


      {/* PRODUCTS */}

      <main className="shop-products">

        <div className="product-header">

          <div className="main-product-title">
            <h2>{pageTitle}</h2>
            <span>( {count} ) Products</span>
          </div>

          {!isMobile && (
            <div className="view-toggle">

              <button
                className={view === "grid" ? "active" : ""}
                onClick={() => setView("grid")}
              >
                <span className="material-icons-round">grid_view</span>
              </button>

              <button
                className={view === "list" ? "active" : ""}
                onClick={() => setView("list")}
              >
                <span className="material-icons-round">view_list</span>
              </button>

            </div>
          )}

        </div>

        {loading && <p className="loading-text">Loading products...</p>}

        {!loading && products.length === 0 && (
          <div className="empty-box">
            <p>No products available</p>
          </div>
        )}

        <div className={currentView === "grid" ? "product-grid" : "product-list"}>

          {products.map(product => (

            <div key={product.id} className="product-row">

              <div className="product-img">
                <Link to={`/product/${product.slug}`}>
                  <img
                    src={product.primary_image || "/placeholder.png"}
                    alt={product.name}
                  />
                </Link>
              </div>

              <div className="product-details">

                <Link to={`/product/${product.slug}`} style={{ textDecoration: "none" }}>
                  <h3>{product.name}</h3>
                </Link>

                {product.price && (
                  <div className="product-price">
                    ₹ {product.price}
                  </div>
                )}

                <p className="product-desc" style={{margin:"16px 0"}}>
                  {truncateText(product.description, 100) ||
                    "Premium quality product made with natural ingredients."}
                </p>

                {/* <WhatsAppEnquiry product={product} /> */}

              </div>

              <div className="product-actions">

                <button
                  className="cart-btn"
                  onClick={() => addToCart(product)}
                >
                  <span className="material-icons-round">shopping_cart</span>
                  Add to Cart
                </button>

                <button
                  className="buy-btn"
                  onClick={() => navigate(`/product/${product.slug}`)}
                >
                  Buy Now
                </button>

                

              </div>


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

            <span>{page} / {totalPages}</span>

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