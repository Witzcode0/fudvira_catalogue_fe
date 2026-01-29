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
    setLoading(true);

    fetch(`${API_BASE}/api/products/${slug}/`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setActiveImage(
          data.images?.find(i => i.is_primary)?.image ||
          data.images?.[0]?.image
        );
        setLoading(false);

        fetch(`${API_BASE}/api/products/${slug}/related/`)
          .then(res => res.json())
          .then(rel => {
            setRelatedProducts(rel || []);
          })
          .catch(() => setRelatedProducts([]));

      })
      .catch(() => setLoading(false));
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
            className={`pd-thumbnails ${product.images.length > 5 ? "scroll" : ""
              }`}
          >
            {product.images.map(img => (
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

          {/* VARIATIONS */}
          <div className="pd-variations">
            <h3>Available Packs</h3>

            <div className="pd-variation-scroll">
              {product.variations.map(v => (
                <div key={v.id} className="pd-variation-card">
                  <div className="pd-pack-size">
                    {v.quantity} {v.unit}
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
                        <td>{v}</td>
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
                className="pd-related-card"
              >
                <img src={`${API_BASE}${p.primary_image}`} alt={p.name} />
                <h4>{p.name}</h4>
                <p>₹{p.starting_price}</p>
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
