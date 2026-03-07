export default function CheckoutSteps({ step }) {

  return (

    <div className="checkout-steps">

      <div className={`step ${step >= 1 ? "active" : ""}`}>
        <span>01</span>
        <p>Shopping Cart</p>
      </div>

      <div className="line"></div>

      <div className={`step ${step >= 2 ? "active" : ""}`}>
        <span>02</span>
        <p>Order Summary</p>
      </div>

      <div className="line"></div>

      <div className={`step ${step >= 3 ? "active" : ""}`}>
        <span>03</span>
        <p>Payment</p>
      </div>

    </div>

  );

}