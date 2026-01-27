import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE } from "../services/api";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/products/`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find(p => p.slug === slug);
        setProduct(found);
      });
  }, [slug]);

  if (!product) return <p>Loading product...</p>;

  const variant = product.variants?.[0];
  const images = variant?.images || [];
  const price = product.additional_data?.price;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">

        {/* Images */}
        <div>
          <img
            src={`${API_BASE}${images[0]?.image}`}
            alt={product.name}
            className="w-full rounded-lg"
          />

          <div className="flex gap-3 mt-4">
            {images.map((img) => (
              <img
                key={img.id}
                src={`${API_BASE}${img.image}`}
                alt=""
                className="w-20 h-20 object-cover border rounded"
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-2xl font-bold mb-3">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-4">
            {product.short_description}
          </p>

          <p className="text-2xl font-bold text-green-700 mb-4">
            ₹{price?.sellingPrice}
            <span className="text-gray-400 line-through ml-3 text-lg">
              ₹{price?.mrp}
            </span>
            <span className="text-sm text-red-600 ml-2">
              ({price?.discountPercent}% OFF)
            </span>
          </p>

          <p className="mb-6 whitespace-pre-line">
            {product.description}
          </p>

          <button className="bg-green-700 text-white px-6 py-3 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
