import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE = "https://fudviraapi.pythonanywhere.com";

export default function ProductDetailExcel() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/products/${slug}/`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [slug]);

  if (!product) return <p style={{ padding: 40 }}>Loading product…</p>;

  return (
    <div className="excel-page">


      {/* PRIMARY IMAGE */}
      <div className="excel-product-image-wrapper">
        <img
          src={product.primary_image || "/placeholder.png"}
          alt={product.name}
          className="excel-product-image-large"
        />
      </div>
      
      {/* HEADER */}
      <div className="product-header">
        <h1 className="excel-title">{product.name}</h1>
      </div>

      {/* DESCRIPTION */}
      {product.description && (
        <p className="product-description">
          {product.description}
        </p>
      )}

      {/* ADDITIONAL DETAILS */}
      <div className="excel-section">
        <h3>Additional Details</h3>

        <div className="excel-table-wrapper">
          <table className="excel-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(product.additional_values || {}).map(
                ([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>
                      {Array.isArray(value) ? (
                        <ul className="excel-ul">
                          {value.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        value
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* BACK */}
      <Link to="/products-excel" className="excel-back-link">
        ← Back to Products (Excel View)
      </Link>
    </div>
  );
}
