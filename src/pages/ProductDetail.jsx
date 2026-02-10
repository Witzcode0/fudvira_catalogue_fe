import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE } from "../services/api";
import WhatsAppEnquiry from "../components/WhatsAppEnquiry";

/* Normalize list API safely */
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    /* ================= FETCH PRODUCT ================= */
    fetch(`${API_BASE}/api/products/${slug}/`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;

        setProduct(data);

        const primary =
          data.images?.find((i) => i.is_primary)?.image_url ||
          data.images?.[0]?.image_url ||
          "";

        setActiveImage(primary);

        /* ================= FETCH RELATED ================= */
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

  /* ================= STATES ================= */
  if (loading) return <p className="pd-loading">Loading product...</p>;
  if (!product) return <p className="pd-loading">Product not found</p>;

  return (
    <div className="pd-page">

      {/* ================= MAIN ================= */}
      <div className="pd-wrapper">

        {/* LEFT IMAGES */}
        <div className="pd-images">
          <div className="pd-main-image">
            <img
              src={activeImage || "/placeholder.png"}
              alt={product.name}
            />
          </div>

          <div
            className={`pd-thumbnails ${
              product.images?.length > 5 ? "scroll" : ""
            }`}
          >
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

        {/* RIGHT DETAILS */}
        <div className="pd-info">
          <h1>{product.name}</h1>

          <Link
            to={`/products?category=${product.category.slug}`}
            className="pd-category"
          >
            {product.category.name}
          </Link>

          {/* WhatsApp CTA */}
          <div className="pd-actions">
            <WhatsAppEnquiry product={product} />
          </div>

          {/* DESCRIPTION */}
          {product.description && (
            <p className="pd-description">
              {product.description
                .split(/\r?\n\r?\n/)
                .map((para, i) => (
                  <span key={i}>
                    {para}
                    <br />
                    <br />
                  </span>
                ))}
            </p>
          )}

          {/* SPECIFICATIONS */}
          {product.additional_values && (
            <div className="pd-specs">
              <h3>Product Information</h3>

              <div className="pd-spec-table-wrapper">
                <table className="pd-spec-table">
                  <tbody>
                    {Object.entries(product.additional_values).map(
                      ([k, v]) => (
                        <tr key={k}>
                          <th>{k}</th>
                          <td>
                            {Array.isArray(v) ? (
                              <ul className="pd-list">
                                {v.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            ) : (
                              v
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BACK */}
      <Link to="/products" className="pd-back">
        ← Back to Products
      </Link>

      {/* ================= RELATED PRODUCTS ================= */}
      <div className="pd-related">
        <h2>Related Products</h2>

        {relatedProducts.length > 0 ? (
          <div className="pd-related-grid">
            {relatedProducts.map((p) => (
              <div key={p.id} className="product-card-ui">
                <Link
                  to={`/product/${p.slug}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="product-image-ui">
                    <img
                      src={p.primary_image || "/placeholder.png"}
                      alt={p.name}
                    />
                  </div>
                </Link>

                <div className="product-content-ui">
                  <h3>{p.name}</h3>

                  <div className="product-card-actions">
                    <Link
                      to={`/product/${p.slug}`}
                      className="view-product-link"
                    >
                      View details →
                    </Link>

                    <WhatsAppEnquiry product={p} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="pd-related-empty">
            <span className="material-icons-round">inventory_2</span>
            <p>No related products available right now.</p>
            <span className="pd-related-subtext">
              Please check back later or explore other products.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
