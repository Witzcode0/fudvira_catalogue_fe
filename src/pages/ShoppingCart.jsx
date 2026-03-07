import { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";

export default function CartPage() {

    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Pure Wild Honey 250g",
            size: "250g",
            price: 250,
            mrp: 399,
            discount: 37,
            rating: 4.5,
            reviews: 82,
            qty: 1,
            delivery: "Delivery by Mar 16, Mon",
            image: "https://fudviraapi.pythonanywhere.com/media/live_products/8aaf8896-0871-4f0b-8997-23cd11a4ac92_3060a172-4024-4bb1-a8f1-e17e2453b788.webp"
        },
        {
            id: 2,
            name: "Pure Wild Honey 500g",
            size: "500g",
            price: 500,
            mrp: 799,
            discount: 38,
            rating: 4.6,
            reviews: 122,
            qty: 1,
            delivery: "Delivery by Mar 18, Wed",
            image: "https://fudviraapi.pythonanywhere.com/media/live_products/8aaf8896-0871-4f0b-8997-23cd11a4ac92_3060a172-4024-4bb1-a8f1-e17e2453b788.webp"
        }
    ]);

    const changeQty = (id, type) => {

        setCartItems(prev =>
            prev.map(item => {

                if (item.id !== id) return item;

                if (type === "inc") return { ...item, qty: item.qty + 1 };
                if (type === "dec" && item.qty > 1) return { ...item, qty: item.qty - 1 };

                return item;

            })
        );

    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.qty, 0
    );

    const totalMRP = cartItems.reduce(
        (sum, item) => sum + item.mrp * item.qty, 0
    );

    const savings = totalMRP - subtotal;

    return (

        <div className="cart-page">

            {/* TOP TITLE */}

            <div className="page-title">

  <h1 className="page-heading">
    Shopping Cart
  </h1>

  <p className="page-subtitle">
    Review the items in your cart before proceeding to checkout.
  </p>

</div>

            <CheckoutSteps step={1} />


            {/* DELIVERY ADDRESS */}

            <div className="delivery-box">

                <div className="delivery-left">
                    <strong>Deliver to:</strong> Brijesh Gondaliya, 395013
                    <span className="tag">HOME</span>

                    <p>
                        155 Marutidham Row House,
                        Balmadir Road, Surat
                    </p>
                </div>

                <button className="change-btn">
                    Change
                </button>

            </div>


            <div className="cart-container">

                {/* LEFT CART */}

                <div className="cart-items">

                    {cartItems.map(item => (

                        <div className="cart-card" key={item.id}>

                            <div className="cart-card-body">

                                <img
                                    src={item.image}
                                    className="cart-img"
                                    alt=""
                                />

                                <div className="cart-details">

                                    <h3>{item.name}</h3>

                                    <p className="size">
                                        Size: {item.size}
                                    </p>

                                    <div className="rating">
                                        ⭐ {item.rating}
                                        <span>
                                            ({item.reviews} Reviews)
                                        </span>
                                    </div>

                                    <div className="price-box">

                                        <span className="price">
                                            ₹{item.price}
                                        </span>

                                        <span className="mrp">
                                            ₹{item.mrp}
                                        </span>

                                        <span className="discount">
                                            {item.discount}% off
                                        </span>

                                    </div>

                                    <p className="delivery">
                                        {item.delivery}
                                    </p>

                                    <div className="qty">

                                        <button onClick={() => changeQty(item.id, "dec")}>-</button>
                                        <span>{item.qty}</span>
                                        <button onClick={() => changeQty(item.id, "inc")}>+</button>

                                    </div>

                                </div>

                            </div>

                            {/* ACTION BAR */}

                            <div className="cart-bottom-actions">

                                <button className="cart-action-save">
                                    <span className="material-icons-round">bookmark_border</span>
                                    Save for later
                                </button>

                                <button
                                    className="cart-action-remove"
                                    onClick={() => removeItem(item.id)}
                                >
                                    <span className="material-icons-round">delete_outline</span>
                                    Remove
                                </button>

                                <button className="cart-action-buy">
                                    <span className="material-icons-round">bolt</span>
                                    Buy this now
                                </button>

                            </div>

                        </div>

                    ))}

                </div>


                {/* RIGHT SUMMARY */}

                <div className="cart-summary">

                    <h3>PRICE DETAILS</h3>

                    <div className="summary-row">
                        <span>Price ({cartItems.length} items)</span>
                        <span>₹{totalMRP}</span>
                    </div>

                    <div className="summary-row">
                        <span>Discount</span>
                        <span className="green">
                            - ₹{savings}
                        </span>
                    </div>

                    <div className="summary-row">
                        <span>Delivery Charges</span>
                        <span className="green">
                            FREE
                        </span>
                    </div>

                    <hr />

                    <div className="summary-row total">
                        <span>Total Amount</span>
                        <span>₹{subtotal}</span>
                    </div>

                    <div className="save-banner">
                        You will save ₹{savings} on this order
                    </div>

                    <Link to="/checkout" >
                        <button className="place-order">
                            Place Order
                        </button>
                    </Link>

                </div>

            </div>

        </div>

    );
}