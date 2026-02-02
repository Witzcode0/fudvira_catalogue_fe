import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE = "https://fudviraapi.pythonanywhere.com";

export default function ProductDetailExcel() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/products/${slug}/`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [slug]);

  if (!product) return <p style={{ padding: 40 }}>Loading product…</p>;

  return (
    <div className="excel-page">
      <div className="product-header">
        <h1 className="excel-title">{product.name}</h1>
        <p className="product-description">{product.description}</p>
      </div>

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
              {Object.entries(product.additional_values || {}).map(([k, v]) => (
                <tr key={k}>
                  <td>{k}</td>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* VARIATIONS */}
      <div className="excel-section">
        <h3>Price Variations</h3>

        <div className="excel-table-wrapper">
          <table className="excel-table">
            <thead>
              <tr>
                <th>Qty</th>
                <th>Unit</th>
                <th>Quality</th>
                <th>Type</th>
                <th>Price ₹</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {product.variations.map(v => (
                <tr key={v.id}>
                  <td>{v.quantity}</td>
                  <td>{v.unit}</td>
                  <td>{v.quality_type}</td>
                  <td>{v.purchase_type}</td>
                  <td>{v.price}</td>
                  <td>{v.stock}</td>
                  <td className={v.is_active ? "status-active" : "status-inactive"}>
                    {v.is_active ? "Active" : "Inactive"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
