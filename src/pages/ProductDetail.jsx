import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE } from "../services/api";
import WhatsAppEnquiry from "../components/WhatsAppEnquiry";

const MAX_LIMIT_PER_PRODUCT = 5;

const normalizeProducts = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
};

export default function ProductDetail() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(`${API_BASE}/api/products/${slug}/`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;

        if (data.variations) {
          data.variations.sort(
            (a, b) => parseFloat(a.quantity) - parseFloat(b.quantity)
          );
        }

        setProduct(data);
        setActiveImage(data.primary_image || "");
        setSelectedVariation(data.variations?.[0] || null);

        return fetch(`${API_BASE}/api/products/`)
          .then((res) => res.json())
          .then((rel) => {
            if (!isMounted) return;

            const list = normalizeProducts(rel);
            const filtered = list.filter(
              (p) =>
                p.category?.slug === data.category.slug &&
                p.slug !== data.slug
            );

            setRelatedProducts(filtered.slice(0, 4));
          });
      })
      .catch(() => {
        if (isMounted) {
          setProduct(null);
          setRelatedProducts([]);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  /* ================= QUANTITY HANDLERS ================= */

  const handleIncrease = () => {
    if (!selectedVariation) return;

    if (quantity >= selectedVariation.stock) {
      setErrorMessage(
        `Only ${selectedVariation.stock} items available in stock.`
      );
      return;
    }

    if (quantity >= MAX_LIMIT_PER_PRODUCT) {
      setErrorMessage(
        `Maximum ${MAX_LIMIT_PER_PRODUCT} items allowed for this product.`
      );
      return;
    }

    setErrorMessage("");
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setErrorMessage("");
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  if (loading) return <p className="pd-loading">Loading product...</p>;
  if (!product) return <p className="pd-loading">Product not found</p>;

  return (
    <div className="pd-page">
      <div className="pd-wrapper">

        {/* ================= IMAGES ================= */}
        <div className="pd-images">
          <div className="pd-main-image">
            <img
              src={activeImage || "/placeholder.png"}
              alt={product.name}
            />
          </div>

          <div className="pd-thumbnails">
            {product.images?.map((img) => (
              <img
                key={img.id}
                src={img.image_url}
                alt=""
                className={activeImage === img.image_url ? "active" : ""}
                onClick={() => setActiveImage(img.image_url)}
              />
            ))}
          </div>
        </div>

        {/* ================= INFO ================= */}
        <div className="pd-info">

          <h1>{product.name}</h1>

          <Link
            to={`/products?category=${product.category.slug}`}
            className="pd-category"
          >
            {product.category.name}
          </Link>

          {/* ================= PRICE SECTION ================= */}
          {selectedVariation && (
            <div className="pd-price-wrapper">

              <div className="pd-price-row">
                <span className="pd-final-price">
                  ₹{selectedVariation.final_price}
                </span>

                {selectedVariation.discount_type !== "none" && (
                  <>
                    <span className="pd-mrp">
                      M.R.P.: ₹{selectedVariation.price}
                    </span>

                    <span className="pd-off">
                      {selectedVariation.discount_type === "percent"
                        ? `${selectedVariation.discount_value}% Off`
                        : `₹${selectedVariation.discount_value} Off`}
                    </span>
                  </>
                )}
              </div>

              {/* ================= SIZE SELECTOR ================= */}
              <div className="pd-size-section">
                <p className="pd-size-label">
                  Size:{" "}
                  <strong>
                    {Number(selectedVariation.quantity)}
                    {selectedVariation.unit_symbol}
                  </strong>
                </p>

                <div className="pd-size-options">
                  {product.variations.map((variation) => (
                    <button
                      key={variation.id}
                      className={`pd-size-btn ${
                        selectedVariation?.id === variation.id
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedVariation(variation);
                        setQuantity(1);
                        setErrorMessage("");
                      }}
                      disabled={variation.stock === 0}
                    >
                      {Number(variation.quantity)}
                      {variation.unit_symbol}
                    </button>
                  ))}
                </div>
              </div>

              {/* ================= QUANTITY + CART ================= */}
              <div className="pd-cart-row">

                <div className="pd-qty-box">
                  <button onClick={handleDecrease}>−</button>
                  <span>{quantity}</span>
                  <button onClick={handleIncrease}>+</button>
                </div>

                <button className="pd-view-cart-btn">
                  View Cart
                </button>

              </div>

              {/* ================= ERROR MESSAGE ================= */}
              {errorMessage && (
                <div className="pd-error-message">
                  {errorMessage}
                </div>
              )}

            </div>
          )}

          {/* WhatsApp */}
          <div className="pd-actions">
            <WhatsAppEnquiry
              product={product}
              variation={selectedVariation}
              quantity={quantity}
            />
          </div>

          {/* DESCRIPTION */}
          <p className="pd-description">
            {product.description}
          </p>

          {/* SPECIFICATIONS */}
          {product.additional_values &&
            Object.keys(product.additional_values).length > 0 && (
              <div className="pd-specs">
                <h3>Product Information</h3>
                <table className="pd-spec-table">
                  <tbody>
                    {Object.entries(product.additional_values).map(
                      ([k, v]) => (
                        <tr key={k}>
                          <th>{k}</th>
                          <td>{v}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}

        </div>
      </div>

      {/* ================= RELATED ================= */}
      <div className="pd-related">
        <h2>Related Products</h2>

        <div className="pd-related-grid">
          {relatedProducts.map((p) => (
            <div key={p.id} className="product-card-ui">
              <Link to={`/product/${p.slug}`}>
                <img
                  src={p.primary_image || "/placeholder.png"}
                  alt={p.name}
                />
              </Link>
              <h3>{p.name}</h3>
              <Link to={`/product/${p.slug}`}>
                View details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
