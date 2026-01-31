import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE } from "../services/api";

export default function ProductDetail() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    // 1️⃣ FETCH PRODUCT DETAIL
    fetch(`${API_BASE}/api/products/${slug}/`)
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;

        setProduct(data);

        setActiveImage(
          data.images?.find(i => i.is_primary)?.image ||
          data.images?.[0]?.image ||
          ""
        );

        // 2️⃣ FETCH SAME CATEGORY PRODUCTS (STRICT)
        return fetch(
          `${API_BASE}/api/products/?category=${data.category.slug}`
        ).then(res => res.json()).then(rel => {
          if (!isMounted) return;

          const results = Array.isArray(rel?.results)
            ? rel.results
            : [];

          // ✅ STRICT FILTERING
          const filtered = results.filter(
            p =>
              p.category?.slug === data.category.slug &&
              p.slug !== data.slug
          );

          // OPTIONAL: limit related products
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

  if (loading) return <p className="pd-loading">Loading product...</p>;
  if (!product) return <p className="pd-loading">Product not found</p>;

  return (
    <div className="pd-page">

      {/* MAIN */}
      <div className="pd-wrapper">

        {/* LEFT IMAGES */}
        <div className="pd-images">
          <div className="pd-main-image">
            <img src={activeImage} alt={product.name} />
          </div>

          <div
            className={`pd-thumbnails ${product.images?.length > 5 ? "scroll" : ""
              }`}
          >
            {product.images?.map(img => (
              <img
                key={img.id}
                src={img.image}
                alt=""
                className={activeImage === img.image ? "active" : ""}
                onClick={() => setActiveImage(img.image)}
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

          {product.description && (
            <p className="pd-description">
              {product.description
                .split(/\r?\n\r?\n/)
                .map((para, i) => (
                  <span key={i}>
                    {para}
                    <br /><br />
                  </span>
                ))}
            </p>
          )}

          {/* VARIATIONS */}
          {product.variations?.length > 0 && (
            <div className="pd-variations">
              <h3>Available Packs</h3>

              <div className="pd-variation-scroll">
                {product.variations.map(v => (
                  <div key={v.id} className="pd-variation-card">
                    <div className="pd-pack-size">
                      {Number(v.quantity)} {v.unit}
                    </div>

                    <div className="pd-pack-type">
                      {v.purchase_type === "retail"
                        ? "Retail Pack"
                        : v.purchase_type}
                    </div>

                    <div className="pd-pack-price">
                      ₹{v.price}
                    </div>

                    <div className={`pd-pack-stock ${v.stock ? "in" : "out"}`}>
                      {v.stock ? "In Stock" : "Out of Stock"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADDITIONAL INFO */}
          {product.additional_values && (
            <div className="pd-specs">
              <h3>Product Information</h3>

              <div className="pd-spec-table-wrapper">
                <table className="pd-spec-table">
                  <tbody>
                    {Object.entries(product.additional_values).map(([k, v]) => (
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
                    ))}
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

      {/* RELATED */}
      <div className="pd-related">
        <h2>Related Products</h2>

        {relatedProducts.length > 0 ? (
          <div className="pd-related-grid">
            {relatedProducts.map(p => (

              <Link
                key={p.id}
                to={`/product/${p.slug}`}
                className="product-card-ui"
                onClick={() => window.scrollTo(0, 0)}
              >
                <div className="product-image-ui">
                  <img
                    src={`${API_BASE}${p.primary_image}`}
                    alt={p.name}
                  />
                </div>

                <div className="product-content-ui">
                  <h3>{p.name}</h3>
                  <span className="view-product-link">
                    View details →
                  </span>
                </div>
              </Link>
            ))}
          </div>

        ) : (
          <div className="pd-related-empty">
            <span className="material-icons-round">inventory_2</span>
            <p>No related products found</p>
          </div>
        )}
      </div>

    </div>
  );
}
