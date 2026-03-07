import { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";

export default function CheckoutPage() {

    const [donation, setDonation] = useState(null);

    const items = [
        {
            id: 1,
            name: "Pure Wild Honey 250g",
            size: "250g",
            rating: 4.5,
            reviews: 82,
            price: 250,
            mrp: 399,
            discount: 37,
            qty: 1,
            delivery: "Delivery by Mar 16, Mon",
            image: "https://fudviraapi.pythonanywhere.com/media/live_products/8aaf8896-0871-4f0b-8997-23cd11a4ac92_3060a172-4024-4bb1-a8f1-e17e2453b788.webp"
        }
    ];

    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.qty, 0
    );

    const mrp = items.reduce(
        (sum, item) => sum + item.mrp * item.qty, 0
    );

    const discount = mrp - subtotal;

    return (

        <div className="checkout-page">

            <div className="page-title">

                <h1 className="page-heading">
                    Checkout
                </h1>

                <p className="page-subtitle">
                    Review your order and complete the payment securely.
                </p>

            </div>

            <CheckoutSteps step={2} />

            <div className="checkout-container">

                {/* LEFT SECTION */}

                <div className="checkout-left">

                    {/* ADDRESS */}

                    <div className="checkout-card">

                        <div className="checkout-address-header">

                            <span>Deliver to:</span>

                            <button className="change-btn">
                                Change
                            </button>

                        </div>

                        <h4>
                            Brijesh Gondaliya
                            <span className="home-tag">HOME</span>
                        </h4>

                        <p>
                            155 Marutidham Row House,
                            Balmadir Road, Surat 395013
                        </p>

                        <p>8980145007</p>

                    </div>


                    {/* ORDER ITEMS */}

                    {items.map(item => (

                        <div className="checkout-product-card" key={item.id}>

                            <img src={item.image} alt="" />

                            <div className="checkout-product-info">

                                <h3>{item.name}</h3>

                                <p className="size">
                                    Size: {item.size}
                                </p>

                                <div className="rating">
                                    ⭐ {item.rating}
                                    <span>({item.reviews} Reviews)</span>
                                </div>

                                <div className="price-box">

                                    <span className="price">₹{item.price}</span>

                                    <span className="mrp">₹{item.mrp}</span>

                                    <span className="discount">
                                        {item.discount}% off
                                    </span>

                                </div>

                                <p className="delivery">
                                    {item.delivery}
                                </p>

                            </div>

                        </div>

                    ))}


                    {/* DONATION SECTION */}

                    <div className="donation-box">

                        <div className="donation-text">

                            <h4>
                                Donate to Fudvira Foundation
                            </h4>

                            <p>
                                Support transformative social work in India
                            </p>

                        </div>

                        <div className="donation-options">

                            {[10, 20, 50, 100].map(value => (

                                <button
                                    key={value}
                                    className={donation === value ? "donation active" : "donation"}
                                    onClick={() => setDonation(value)}
                                >
                                    ₹{value}
                                </button>

                            ))}

                        </div>

                    </div>

                </div>


                {/* RIGHT SUMMARY */}

                <div className="checkout-summary">

                    <h3>PRICE DETAILS</h3>

                    <div className="summary-row">
                        <span>MRP</span>
                        <span>₹{mrp}</span>
                    </div>

                    <div className="summary-row">
                        <span>Discount</span>
                        <span className="green">- ₹{discount}</span>
                    </div>

                    <div className="summary-row">
                        <span>Delivery Charges</span>
                        <span className="green">FREE</span>
                    </div>

                    <hr />

                    <div className="summary-row total">
                        <span>Total Amount</span>
                        <span>₹{subtotal}</span>
                    </div>

                    <div className="save-banner">
                        You'll save ₹{discount} on this order!
                    </div>
                    <Link to="/payment">
                        <button className="continue-btn">
                            Continue
                        </button>
                    </Link>

                </div>

            </div>

        </div>

    );

}