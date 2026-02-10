import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import logo from "../assets/images/logo.png";
import fudvira_qr from "../assets/images/fudvira-qr.png";
import { useCategories } from "../store/CategoryContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { categories, loading } = useCategories();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const closeAll = () => {
    setCategoryOpen(false);
    setAccountOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", closeAll);
    return () => document.removeEventListener("click", closeAll);
  }, []);

  useEffect(() => {
    closeAll();
  }, [location.pathname]);

  return (
    <>
      {(categoryOpen || accountOpen) && (
        <div className="backdrop-blur show" onClick={closeAll}></div>
      )}

      <nav className="nav">
        <div className="container nav-container">

          {/* LEFT */}
          <div className="nav-left">
            <Link to="/" className="nav-logo">
              <img src={logo} alt="Fudvira Logo" />
            </Link>

            <div className="nav-divider"></div>

            <div className="nav-title" onClick={(e) => e.stopPropagation()}>
              <div
                className="dropdown"
                onClick={() => {
                  setCategoryOpen(!categoryOpen);
                  setAccountOpen(false);
                }}
              >
                <span className="title-main">
                  Pure & Premium Powders Delivered Fast
                </span>

                <span className="dropdown-toggle">
                  Browse Categories
                  <span className="material-icons-round">
                    {categoryOpen ? "expand_less" : "expand_more"}
                  </span>
                </span>

                {categoryOpen && (
                  <div className="dropdown-menu open">
                    {loading && <p>Loading...</p>}
                    {!loading &&
                      categories.map((cat) => (
                        <Link
                          to={`/products?category=${cat.slug}`}
                          className="dropdown-item"
                          onClick={closeAll}
                        >
                          {cat.name}
                        </Link>

                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>

{/* GLOBAL SEARCH */}
<div className="nav-search">
  <div className="search-wrapper">
    <span className="material-icons-round search-icon">
      search
    </span>

    <input
      type="search"
      placeholder="Search products..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          const query = searchText.trim();

          if (!query) return;

          navigate(
            `/products?search=${encodeURIComponent(query)}`
          );

          setSearchText("");
          closeAll();
        }
      }}
    />
  </div>
</div>



          {/* RIGHT */}
          <div className="nav-right" onClick={(e) => e.stopPropagation()}>
            <div className="account-wrapper">
              <button
                className="login-btn"
                onClick={() => {
                  setAccountOpen(!accountOpen);
                  setCategoryOpen(false);
                }}
              >
                <span className="material-icons-round">menu</span>
              </button>

              {accountOpen && (
                <div className="account-dropdown open">
                  <ul className="account-list">
                    <li>
                      <NavLink to="/" onClick={closeAll} className="account-link">
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/categories" onClick={closeAll} className="account-link">
                        Categories
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/products"
                        className="account-link"
                        onClick={() => {
                          closeAll();
                          window.scrollTo(0, 0);
                        }}
                      >
                        Products
                      </NavLink>


                    </li>
                    <li>
                      <NavLink to="/products-excel" className="account-link"  onClick={() => {
                          closeAll();
                          window.scrollTo(0, 0);
                        }}>
                        Products (Excel View)
                      </NavLink>
                    </li>
                    
                    <li>
                      <NavLink to="/certificates" onClick={closeAll} className="account-link">
                        Certificates
                      </NavLink>
                    </li>

                  </ul>

                  {/* QR */}
                  <div className="account-dropdown__qrcode">
                    <a
                      href="https://www.fudvira.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="account-dropdown__qrcode-box"
                    >
                      <img
                        src={fudvira_qr}
                        alt="Fudvira Web Store QR"
                        className="account-dropdown__qrcode-img"
                      />
                    </a>

                    <div>
                      <div className="account-dropdown__qrcode-heading">
                        Explore premium products <br />
                        <a href="https://www.fudvira.com" target="_blank" rel="noopener noreferrer">
                          at fudvira.com
                        </a>
                      </div>
                      <div className="account-dropdown__qrcode-sub">
                        Scan QR to visit our official store
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </nav>
    </>
  );
}
