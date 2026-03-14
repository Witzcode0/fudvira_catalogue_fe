import { useRef, useState, useEffect } from "react";

function OTPModal({ mobile, closeOTP }) {

const [otp, setOtp] = useState(["", "", "", ""]);
const inputs = useRef([]);

const [timer, setTimer] = useState(25);
const [canResend, setCanResend] = useState(false);

/* ======================
OTP INPUT CHANGE
====================== */

const handleChange = (value, index) => {

if (!/^[0-9]?$/.test(value)) return;

const newOtp = [...otp];
newOtp[index] = value;
setOtp(newOtp);

if (value && index < 3) {
inputs.current[index + 1].focus();
}

};

/* ======================
BACKSPACE SUPPORT
====================== */

const handleBackspace = (e, index) => {

if (e.key === "Backspace" && !otp[index] && index > 0) {
inputs.current[index - 1].focus();
}

};

/* ======================
OTP TIMER
====================== */

useEffect(() => {

if (timer === 0) {
setCanResend(true);
return;
}

const interval = setInterval(() => {
setTimer((prev) => prev - 1);
}, 1000);

return () => clearInterval(interval);

}, [timer]);

/* ======================
RESEND OTP
====================== */

const handleResend = () => {

setTimer(25);
setCanResend(false);

/* API CALL EXAMPLE

fetch("/api/auth/send-otp/",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body: JSON.stringify({mobile})
})

*/

};

/* ======================
VERIFY OTP
====================== */

const verifyOTP = () => {

const otpValue = otp.join("");

if (otpValue.length !== 4) return;

console.log("Verify OTP:", otpValue);

/* API CALL EXAMPLE

fetch("/api/auth/verify-otp/",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body: JSON.stringify({
mobile:mobile,
otp:otpValue
})
})

*/

};

return (

<div className="login-overlay">

<div className="login-modal otp-modal">

{/* HEADER */}

<div className="otp-header">

<span
className="material-icons-round otp-back"
onClick={closeOTP}
>
arrow_back
</span>

<h3 className="otp-title">
OTP Verification
</h3>

</div>

{/* CONTENT */}

<div className="otp-content">

<p className="otp-text">
We have sent a verification code to
</p>

<p className="otp-mobile">
+91-{mobile}
</p>

{/* OTP INPUTS */}

<div className="otp-inputs">

{otp.map((digit, index) => (

<input
key={index}
type="text"
maxLength="1"
value={digit}
ref={(el) => (inputs.current[index] = el)}
onChange={(e) => handleChange(e.target.value, index)}
onKeyDown={(e) => handleBackspace(e, index)}
/>

))}

</div>

{/* VERIFY BUTTON */}

<button
className={`otp-btn ${otp.join("").length === 4 ? "active" : ""}`}
disabled={otp.join("").length !== 4}
onClick={verifyOTP}
>
Verify OTP
</button>

{/* RESEND */}

{canResend ? (

<p className="resend active" onClick={handleResend}>
Resend Code
</p>

) : (

<p className="resend">
Resend Code (in {timer} secs)
</p>

)}

</div>

</div>

</div>

);

}

export default OTPModal;