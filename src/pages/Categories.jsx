import { useCategories } from "../store/CategoryContext";
import { Link } from "react-router-dom";

export default function Categories() {
  const { categories, loading } = useCategories();

  if (loading) {
    return (
      <section className="cat-section">
        <p className="cat-loading">Loading categories...</p>
      </section>
    );
  }

  return (
    <section className="cat-section">
      <div className="cat-container">

        <h2 className="cat-title">Shop by Category</h2>
        <p className="cat-subtitle">
          Explore our natural food collections crafted for purity,
          nutrition and everyday wellness.
        </p>

        <div className="cat-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className="cat-card"
            >
              <div className="cat-image">
                <img
                  src={cat.image || "/placeholder.png"}
                  alt={cat.name}
                  loading="lazy"
                />
              </div>

              <h3 className="cat-name">{cat.name}</h3>

              <span className="cat-link">
                Explore
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
