import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE } from "../services/api";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/products/`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.slug === slug);
        setProduct(found);

        const primary =
          found?.variants?.[0]?.images?.find((i) => i.is_primary) ||
          found?.variants?.[0]?.images?.[0];

        if (primary) {
          setActiveImage(`${API_BASE}${primary.image}`);
        }
      });
  }, [slug]);

  if (!product) return <p className="loading-text">Loading product...</p>;

  const variant = product.variants?.[0];
  const images = variant?.images || [];
  const data = product.additional_data || {};
  const price = data.price || {};

  return (
    <div className="product-page">
      <div className="product-wrapper">

        {/* ================= IMAGE SECTION ================= */}
        <div className="product-images">
          <div className="main-image">
            <img src={activeImage} alt={product.name} />
          </div>

          <div className="thumbnail-row">
            {images.map((img) => (
              <img
                key={img.id}
                src={`${API_BASE}${img.image}`}
                alt=""
                className={activeImage.includes(img.image) ? "active" : ""}
                onClick={() =>
                  setActiveImage(`${API_BASE}${img.image}`)
                }
              />
            ))}
          </div>
        </div>

        {/* ================= PRODUCT INFO ================= */}
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>

          <p className="product-short-desc">
            {product.short_description}
          </p>

          {/* PRICE */}
          <div className="price-box">
            <span className="selling-price">
              ₹{price.sellingPrice}
            </span>

            <span className="mrp">
              ₹{price.mrp}
            </span>

            <span className="discount">
              {price.discountPercent}% OFF
            </span>
          </div>

          {/* STOCK */}
          <div className={`stock ${variant.stock_quantity > 0 ? "in" : "out"}`}>
            {variant.stock_quantity > 0 ? "In Stock" : "Out of Stock"}
          </div>

          {/* FEATURES */}
          <ul className="feature-list">
            {data.features?.map((f, i) => (
              <li key={i}>✔ {f}</li>
            ))}
          </ul>

          <button className="add-to-cart-btn">
            Add to Cart
          </button>
        </div>
      </div>

      {/* ================= EXTRA DETAILS ================= */}
      <div className="product-extra">

        {/* DESCRIPTION */}
        <section>
          <h3>Description</h3>
          <p className="long-desc">{product.description}</p>
        </section>

        {/* INGREDIENTS */}
        <section>
          <h3>Ingredients</h3>
          <ul>
            {data.ingredients?.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </section>

        {/* NUTRITION */}
        <section>
          <h3>Nutrition Facts</h3>
          <table className="nutrition-table">
            <tbody>
              {Object.entries(data.nutritionFacts || {}).map(([k, v]) => (
                <tr key={k}>
                  <td>{k}</td>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* USAGE */}
        <section>
          <h3>Usage Suggestions</h3>
          <ul>
            {data.usageSuggestions?.map((u, i) => (
              <li key={i}>{u}</li>
            ))}
          </ul>
        </section>

        {/* STORAGE */}
        <section>
          <h3>Storage Instructions</h3>
          <p>{data.storageInstructions}</p>
        </section>

        {/* PACKAGING */}
        <section>
          <h3>Packaging Details</h3>
          <p>
            {data.packagingDetails?.weight} ·{" "}
            {data.packagingDetails?.material}
          </p>
        </section>
      </div>
    </div>
  );
}
