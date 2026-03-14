import { useState } from "react";
import logo from "../assets/images/logo.png";
import OTPModal from "./OTPModal";

function LoginModal({ closeModal }) {

const [mobile, setMobile] = useState("");
const [showOTP, setShowOTP] = useState(false);

const handleChange = (e) => {
  const value = e.target.value.replace(/\D/g, "");
  if (value.length <= 10) setMobile(value);
};

const isValid = mobile.length === 10;

return (

<>
<div className="login-overlay">

<div className="login-modal">

<div className="login-header">
<span
className="material-icons-round back-icon"
onClick={closeModal}
>
arrow_back
</span>
</div>

<div className="login-content">

<div className="login-logo">
<img src={logo} alt="Fudvira Logo" />
</div>

<h2>Welcome to Fudvira</h2>

<p className="login-subtitle">
Fresh groceries & essentials delivered fast
</p>

<div className="mobile-input">

<span className="country-code">+91</span>

<input
type="tel"
placeholder="Enter mobile number"
value={mobile}
onChange={handleChange}
/>

</div>

<button
className={`auht-btn ${isValid ? "active" : ""}`}
disabled={!isValid}
onClick={() => setShowOTP(true)}
>
Continue
</button>

<p className="terms"> By continuing you agree to our <span> Terms of Service</span> & <span> Privacy Policy</span> </p>

</div>

</div>

</div>

{showOTP && (
<OTPModal mobile={mobile} closeOTP={()=>setShowOTP(false)} />
)}

</>

);

}

export default LoginModal;