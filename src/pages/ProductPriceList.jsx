import { useEffect, useMemo, useState } from "react";
import { API_BASE } from "../services/api";
export default function ProductPriceList() {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);

    // filters
    const [purchaseType, setPurchaseType] = useState("");
    const [qualityType, setQualityType] = useState("");
    const [search, setSearch] = useState("");

    /* =========================
       FETCH PRICE LIST
    ========================== */
    useEffect(() => {
        let url = `${API_BASE}/api/products/price-list/`;

        const params = [];
        if (purchaseType) params.push(`purchase_type=${purchaseType}`);
        if (qualityType) params.push(`quality_type=${qualityType}`);

        if (params.length) {
            url += `?${params.join("&")}`;
        }

        setLoading(true);

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setPrices(data);
                } else if (Array.isArray(data?.results)) {
                    setPrices(data.results);
                } else {
                    setPrices([]);
                }
                setLoading(false);
            })
            .catch(() => {
                setPrices([]);
                setLoading(false);
            });
    }, [purchaseType, qualityType]);

    /* =========================
       LIVE SEARCH FILTER
    ========================== */
    const filteredPrices = useMemo(() => {
        if (!search.trim()) return prices;

        return prices.filter(item =>
            item.product_name
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [prices, search]);

    /* =========================
       GROUP BY PRODUCT NAME
    ========================== */
    const groupedPrices = useMemo(() => {
        return filteredPrices.reduce((acc, item) => {
            if (!acc[item.product_name]) {
                acc[item.product_name] = [];
            }
            acc[item.product_name].push(item);
            return acc;
        }, {});
    }, [filteredPrices]);

    if (loading) {
        return <p className="price-loading">Loading price list…</p>;
    }

    return (
        <div className="price-page">
            <div className="price-container">
                <h1>Product Price List</h1>
                <p className="price-intro">
                    Latest product pricing based on pack size, quality, and
                    retail / bulk purchase type.
                </p>

                {/* =========================
            FILTERS + SEARCH
        ========================== */}
                <div className="price-filters">
                    <input
                        type="text"
                        placeholder="Search product..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />

                    <select
                        value={purchaseType}
                        onChange={e => setPurchaseType(e.target.value)}
                    >
                        <option value="">All Purchase Types</option>
                        <option value="retail">Retail</option>
                        <option value="bulk">Bulk</option>
                    </select>

                    <select
                        value={qualityType}
                        onChange={e => setQualityType(e.target.value)}
                    >
                        <option value="">All Qualities</option>
                        <option value="premium">Premium</option>
                        <option value="a_grade">A Grade</option>
                        <option value="b_grade">B Grade</option>
                        <option value="standard">Standard</option>
                    </select>
                </div>

                <p className="price-disclaimer">
                    ⚠️ <strong>Pricing Notice:</strong> Prices may fluctuate due to seasonal demand,
                    raw material availability, and order volume.
                </p>


                {/* =========================
            TABLE
        ========================== */}
                <div className="price-table-wrapper">
                    <table className="price-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Pack Details</th>
                                <th>Purchase Type</th>
                                <th>Price (₹)</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Object.keys(groupedPrices).length === 0 && (
                                <tr>
                                    <td colSpan="6" className="price-empty">
                                        No products found
                                    </td>
                                </tr>
                            )}

                            {Object.entries(groupedPrices).map(
                                ([productName, variations], productIndex) =>
                                    variations.map((item, index) => (
                                        <tr key={item.id}>
                                            {/* SERIAL */}
                                            {index === 0 && (
                                                <td rowSpan={variations.length}>
                                                    {productIndex + 1}
                                                </td>
                                            )}

                                            {/* PRODUCT NAME */}
                                            {index === 0 && (
                                                <td
                                                    rowSpan={variations.length}
                                                    className="price-product"
                                                >
                                                    {productName}
                                                </td>
                                            )}

                                            {/* PACK DETAILS */}
                                            <td className="price-pack">
                                                {Number(item.quantity)}{item.unit_symbol}
                                                <br />
                                                <span className="price-quality">
                                                    {item.quality_label}
                                                </span>
                                            </td>


                                            {/* PURCHASE TYPE */}
                                            <td>
                                                <span
                                                    className={`price-purchase ${item.purchase_type}`}
                                                >
                                                    {item.purchase_label}
                                                </span>
                                            </td>

                                            {/* PRICE */}
                                            <td className="price-amount">
                                                ₹{item.price}
                                            </td>

                                            {/* STATUS */}
                                           <td>
  <span
    className="price-status-emoji"
    role="img"
    aria-label={item.in_stock ? "In stock" : "Out of stock"}
    title={item.in_stock ? "In Stock" : "Out of Stock"}
  >
    {item.in_stock ? "🟢" : "🔴"}
  </span>
</td>



                                        </tr>
                                    ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
