import { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import { useCategories } from "../store/CategoryContext";
import { Link, NavLink } from "react-router-dom";



export default function Navbar() {
  const { categories, loading } = useCategories();

  console.log(categories);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  // Equivalent of "closeAll"
  const closeAll = () => {
    setCategoryOpen(false);
    setAccountOpen(false);
  };

  // Handle outside click (document click)
  useEffect(() => {
    const handleOutsideClick = () => {
      closeAll();
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      {/* BACKDROP */}
      {(categoryOpen || accountOpen) && (
        <div
          className="backdrop-blur show"
          onClick={closeAll}
        ></div>
      )}

      <nav className="nav">
        <div className="container nav-container">

          {/* LEFT */}
          <div className="nav-left">
            <div className="nav-logo">
              <img src={logo} alt="Fudvira Logo" />
            </div>

            <div className="nav-divider"></div>

            {/* CATEGORY */}
            <div
              className="nav-title"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="dropdown"
                onClick={() => {
                  setCategoryOpen(!categoryOpen);
                  setAccountOpen(false);
                }}
              >
                {/* MAIN TITLE */}
                <span className="title-main">
                  Pure & Premium Powders Delivered Fast
                </span>

                {/* DROPDOWN TOGGLE */}
                <span className="title-sub dropdown-toggle">
                  Browse Categories
                  <span className="material-icons-round dropdown-arrow">
                    {categoryOpen ? "expand_less" : "expand_more"}
                  </span>
                </span>

                {/* DROPDOWN MENU */}
                {categoryOpen && (
                  <div className="dropdown-menu open">
                    {loading && <p>Loading...</p>}

                    {!loading && categories.length === 0 && (
                      <p>No categories found</p>
                    )}

                    {!loading &&
                      categories.map((cat) => (
                        <p key={cat.id}>
                          {cat.name}
                        </p>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div className="nav-search">
            <div className="search-wrapper">
              <span className="material-icons-round search-icon">search</span>
              <input type="search" placeholder="Search for products..." />
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="nav-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ACCOUNT */}
            <div className="account-wrapper">
              <button
                className="login-btn mobile-user-btn"
                onClick={() => {
                  setAccountOpen(!accountOpen);
                  setCategoryOpen(false);
                }}
              >
                <span className="material-icons-round">menu</span>
              </button>

              {accountOpen && (
                <div className="account-dropdown open">
                  {/* <div className="account-info">
                    <div className="account-heading">My Account</div>
                    <div className="account-number">(+XXX) XXXXXXXXXX</div>
                  </div> */}

                  <ul className="account-list">
                    <li>
                      <NavLink to="/categories" className="account-link">
                        <span className="material-icons-round">category</span>
                        <span>Categories</span>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/products" className="account-link">
                        <span className="material-icons-round">inventory_2</span>
                        <span>Products</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* CART */}
            {/* <button className="cart-btn">
              <i className="fas fa-shopping-cart"></i>
              My Cart
            </button> */}
          </div>
        </div>
      </nav>
    </>
  );
}
