import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/products/`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Products API error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => {
          const variant = product.variants?.[0];
          const primaryImage = variant?.images?.find(img => img.is_primary);

          return (
            <div
              key={product.id}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              <Link to={`/product/${product.slug}`}>
                <img
                  src={
                    primaryImage
                      ? `${API_BASE}${primaryImage.image}`
                      : "/placeholder.png"
                  }
                  alt={product.name}
                  className="w-full h-48 object-contain mb-4"
                />

                <h3 className="text-lg font-semibold">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600 mb-2">
                  {product.short_description}
                </p>

                <p className="text-green-700 font-bold">
                  ₹{product.additional_data?.price?.sellingPrice}
                  <span className="text-gray-400 line-through ml-2 text-sm">
                    ₹{product.additional_data?.price?.mrp}
                  </span>
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
