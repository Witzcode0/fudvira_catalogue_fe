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

    const fetchData = async () => {
      try {
        setLoading(true);

        // 1️⃣ Fetch single product
        const productRes = await fetch(`${API_BASE}/api/products/${slug}/`);
        const productData = await productRes.json();

        if (!isMounted) return;

        if (productData?.variations) {
          productData.variations.sort(
            (a, b) => parseFloat(a.quantity) - parseFloat(b.quantity)
          );
        }

        setProduct(productData);
        setActiveImage(productData?.primary_image || "");
        setSelectedVariation(productData?.variations?.[0] || null);

        // 2️⃣ Fetch all products for related
        const allRes = await fetch(`${API_BASE}/api/products/`);
        const allData = await allRes.json();

        if (!isMounted) return;

        const list = normalizeProducts(allData);

        const filtered = list.filter(
          (p) =>
            p.category?.slug === productData.category?.slug &&
            p.slug !== productData.slug
        );

        setRelatedProducts(filtered.slice(0, 8));
      } catch (error) {
        console.error("Error loading product:", error);
        if (isMounted) {
          setProduct(null);
          setRelatedProducts([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  /* ================= QUANTITY ================= */

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

      

      {/* ================= MAIN SECTION ================= */}
      <div className="pd-wrapper">

        {/* ===== LEFT IMAGES ===== */}
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

        {/* ===== RIGHT INFO ===== */}
        <div className="pd-info">

          <h1>{product.name}</h1>

          {product.category && (
            <Link
              to={`/products?category=${product.category.slug}`}
              className="pd-category"
            >
              {product.category.name}
            </Link>
          )}

          {/* PRICE */}
          {/* {selectedVariation && (
            <>
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

                <div className="pd-size-section">
                  <p className="pd-size-label">
                    Size:{" "}
                    <strong>
                      {Number(selectedVariation.quantity)}
                      {selectedVariation.unit_symbol}
                    </strong>
                  </p>

                  <div className="pd-size-options">
                    {product.variations?.map((variation) => (
                      <button
                        key={variation.id}
                        className={`pd-size-btn ${
                          selectedVariation?.id === variation.id ? "active" : ""
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

                {errorMessage && (
                  <div className="pd-error-message">
                    {errorMessage}
                  </div>
                )}

              </div>
            </>
          )} */}

          {/* WhatsApp */}
          <WhatsAppEnquiry
            product={product}
            variation={selectedVariation}
            quantity={quantity}
          />

          {/* Description */}
          <p className="pd-description">
            {product.description}
          </p>

        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      <div className="pd-related">
        <h2>Related Products</h2>

        {relatedProducts.length > 0 ? (
          <div className="pd-related-grid">
            {relatedProducts.map((item) => (
              <div key={item.id} className="product-card-ui">
                <Link to={`/product/${item.slug}`}>
                  <div className="product-image-ui">
                    <img
                      src={item.primary_image || "/placeholder.png"}
                      alt={item.name}
                    />
                  </div>
                </Link>

                <div className="product-content-ui" >
                  <h3>{item.name}</h3>

                  <div className="product-card-actions" style={{padding:"0px"}}>
                    <Link
                      to={`/product/${item.slug}`}
                      className="view-product-link"
                    >
                      View details →
                    </Link>

                    <WhatsAppEnquiry product={item} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="pd-related-empty">
            <p>No related products found</p>
            <Link to="/products">Browse All Products →</Link>
          </div>
        )}
      </div>
      {/* ================= BACK BUTTON ================= */}
      <div className="pd-back-wrapper">
        <Link to="/products" className="pd-back">
          ← Back to Products
        </Link>
      </div>



    </div>
  );
}
