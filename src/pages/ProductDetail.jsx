import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE } from "../services/api";
import WhatsAppEnquiry from "../components/WhatsAppEnquiry";
import { textConverter } from "../utils/textConverter";


/* Normalize API */
const normalizeProducts = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
};

export default function ProductDetail() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [categorySlug, setCategorySlug] = useState(null);

  /* ===============================
     FETCH SINGLE PRODUCT
  =============================== */
  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_BASE}/api/products/${slug}/`);
        const data = await res.json();

        if (!isMounted) return;

        setProduct(data);
        setActiveImage(data?.primary_image || "");
        setCategorySlug(data?.category?.slug || null);

      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  /* ===============================
     FETCH RELATED PRODUCTS
  =============================== */
  useEffect(() => {
    if (!categorySlug) return;

    const fetchRelatedProducts = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/products/?category=${categorySlug}`
        );

        const data = await res.json();
        const products = normalizeProducts(data);

        // Remove current product
        const filteredProducts = products.filter(
          (item) => String(item.slug) !== String(slug)
        );

        setRelatedProducts(filteredProducts);

      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchRelatedProducts();
  }, [categorySlug, slug]);

  /* ===============================
     UI STATES
  =============================== */
  if (loading) return <p className="pd-loading">Loading product...</p>;
  if (!product) return <p className="pd-loading">Product not found</p>;

  return (
    <div className="pd-page">

      {/* ================= MAIN WRAPPER ================= */}
      <div className="pd-wrapper">

        {/* LEFT IMAGES */}
        <div className="pd-images">

          <div className="pd-main-image">
            <img
              src={activeImage || "/placeholder.png"}
              alt={product.name}
            />
          </div>

          {product.images?.length > 0 && (
            <div className="pd-thumbnails">
              {product.images.map((img) => (
                <img
                  key={img.id}
                  src={img.image_url}
                  alt=""
                  className={activeImage === img.image_url ? "active" : ""}
                  onClick={() => setActiveImage(img.image_url)}
                />
              ))}
            </div>
          )}

        </div>

        {/* RIGHT INFO */}
        <div className="pd-info">

          <h1>{product.name}</h1>

          {product.category && (
            <Link
              to={`/products?category=${product.category.slug}`}
              className="pd-category"
            >
              {textConverter(product.category.name,"title")}
            </Link>
          )}

          <WhatsAppEnquiry product={product} />

          {product.description && (
            <p className="pd-description">
              {textConverter(product.description,"title")}
            </p>
          )}

          {/* ADDITIONAL DETAILS */}
          {product.additional_values &&
            Object.keys(product.additional_values).length > 0 && (
              <div className="pd-additional">
                <h2>Additional Details</h2>

                {Object.entries(product.additional_values).map(
                  ([key, value]) => (
                    <div key={key} className="pd-additional-row">

                      <div className="pd-additional-key">
                        {key.replace(/_/g, " ")}
                      </div>

                      <div className="pd-additional-content">

                        {/* Object */}
                        {typeof value === "object" &&
                          !Array.isArray(value) &&
                          Object.entries(value).map(([subKey, subVal]) => (
                            <div key={subKey} className="pd-sub-row">
                              <span className="pd-sub-key">
                                {textConverter(subKey.replace(/_/g, " "), "title")}:
                              </span>
                              <span className="pd-sub-value">
                                {textConverter(String(subVal), "title")}
                              </span>
                            </div>
                          ))}

                        {/* Array */}
                        {Array.isArray(value) && (
                          <ul className="pd-additional-list">
                            {value.map((item, index) => (
                              <li key={index}>{String(item)}</li>
                            ))}
                          </ul>
                        )}

                        {/* Primitive */}
                        {typeof value !== "object" && (
                          <div className="pd-additional-value">
                            {String(value)}
                          </div>
                        )}

                      </div>
                    </div>
                  )
                )}
              </div>
            )}

        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      {relatedProducts.length > 0 && (
        <div className="pd-related">
          <h2 className="pd-related-title">Related Products</h2>

          <div className="green-grid">
                    {relatedProducts.map((product) => (
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
        </div>
      )}


      {/* ================= BACK BUTTON ================= */}
      <div className="pd-back-wrapper">
        <Link to="/products" className="pd-back">
          ← Back to Products
        </Link>
      </div>

    </div>
  );
}
