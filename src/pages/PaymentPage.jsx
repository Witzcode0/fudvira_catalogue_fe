import { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentPage() {

    const [method, setMethod] = useState("card");

    const totalAmount = 522;

    return (

        <div className="payment-page">

            <div className="page-title">

                <h1 className="page-heading">
                    Secure Payment
                </h1>

                <p className="page-subtitle">
                    Choose your preferred payment method and complete your order securely.
                </p>

            </div>

            <CheckoutSteps step={3} />

            <div className="payment-wrapper">


                {/* LEFT SECTION */}

                <div className="payment-left">


                    <div className="payment-header">

                        <h2>Complete Payment</h2>

                        <div className="secure-badge">
                            <span className="material-icons-round">lock</span>
                            100% Secure
                        </div>

                    </div>


                    <div className="payment-layout">


                        {/* PAYMENT METHOD SIDEBAR */}

                        <div className="payment-methods">

                            <button
                                className={`method ${method === "card" ? "active" : ""}`}
                                onClick={() => setMethod("card")}
                            >
                                <span className="material-icons-round">credit_card</span>
                                Credit / Debit Card
                            </button>


                            <button
                                className={`method ${method === "upi" ? "active" : ""}`}
                                onClick={() => setMethod("upi")}
                            >
                                <span className="material-icons-round">account_balance_wallet</span>
                                UPI
                            </button>


                            <button
                                className={`method ${method === "cod" ? "active" : ""}`}
                                onClick={() => setMethod("cod")}
                            >
                                <span className="material-icons-round">payments</span>
                                Cash on Delivery
                            </button>


                            <button
                                className={`method ${method === "netbanking" ? "active" : ""}`}
                                onClick={() => setMethod("netbanking")}
                            >
                                <span className="material-icons-round">account_balance</span>
                                Net Banking
                            </button>

                        </div>


                        {/* PAYMENT FORM */}

                        <div className="payment-form">


                            {/* CARD FORM */}

                            {method === "card" && (

                                <div className="card-box">

                                    <label>Card Number</label>

                                    <input
                                        placeholder="XXXX XXXX XXXX XXXX"
                                    />

                                    <div className="card-row">

                                        <div>

                                            <label>Expiry</label>

                                            <input placeholder="MM / YY" />

                                        </div>

                                        <div>

                                            <label>CVV</label>

                                            <input placeholder="CVV" />

                                        </div>

                                    </div>

                                    <button className="pay-button">
                                        Pay ₹{totalAmount}
                                    </button>

                                </div>

                            )}


                            {/* UPI */}

                            {method === "upi" && (

                                <div className="upi-box">

                                    <label>Enter UPI ID</label>

                                    <input placeholder="example@upi" />

                                    <button className="pay-button">
                                        Pay ₹{totalAmount}
                                    </button>

                                </div>

                            )}


                            {/* COD */}

                            {method === "cod" && (

                                <div className="cod-box">

                                    <p>
                                        Cash on Delivery available for this order.
                                    </p>

                                    <button className="pay-button">
                                        Place Order
                                    </button>

                                </div>

                            )}


                            {/* NET BANKING */}

                            {method === "netbanking" && (

                                <div className="bank-box">

                                    <label>Select Bank</label>

                                    <select>

                                        <option>HDFC Bank</option>
                                        <option>ICICI Bank</option>
                                        <option>SBI</option>
                                        <option>Axis Bank</option>

                                    </select>

                                    <button className="pay-button">
                                        Pay ₹{totalAmount}
                                    </button>

                                </div>

                            )}

                        </div>


                    </div>


                </div>


                {/* RIGHT PRICE SUMMARY */}

                <div className="payment-summary">

                    <h3>Price Details</h3>

                    <div className="summary-row">
                        <span>MRP</span>
                        <span>₹3,598</span>
                    </div>

                    <div className="summary-row">
                        <span>Platform Fee</span>
                        <span>₹7</span>
                    </div>

                    <div className="summary-row">
                        <span>Discount</span>
                        <span className="green">- ₹3,083</span>
                    </div>

                    <hr />

                    <div className="summary-row total">
                        <span>Total Amount</span>
                        <span>₹{totalAmount}</span>
                    </div>


                    <div className="offer-box">

                        <strong>10% instant discount</strong>

                        <p>Claim now with payment offers</p>

                    </div>

                </div>


            </div>

        </div>

    );
}