import { useCategories } from "../store/CategoryContext";
import { Link } from "react-router-dom";
import { API_BASE } from "../services/api";

export default function Categories() {
  const { categories, loading } = useCategories();

  const limitWords = (text, wordLimit = 10) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  if (loading) {
    return <p className="text-center">Loading categories...</p>;
  }

  return (
    <div className="category-page">
      <h1 className="category-title">Shop by Category</h1>
      <p className="category-subtitle">
        Explore our range of natural food products, carefully crafted for
        purity, nutrition, and everyday wellness.
      </p>

      <div className="category-grid">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/products?category=${cat.slug}`}
            className="category-card"
          >

            <div className="category-image-wrapper">
              <img
                src={`${API_BASE}${cat.category_image}`}
                alt={cat.name}
                className="category-image"
              />
            </div>

            <div className="category-info">
              <h3 className="category-name">{cat.name}</h3>
              <p className="category-desc">
                {limitWords(cat.description, 10)}
              </p>
            </div>

            <div className="category-btn-wrapper">
              <span className="category-btn">
                Explore
                <span className="material-icons-round">chevron_right</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>

  );
}
