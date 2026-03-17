import { useRef, useState, useEffect } from "react";
import { verifyOTP, sendOTP } from "../services/authApi";

function OTPModal({ mobile, closeOTP }) {

    // ✅ 6 DIGITS
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputs = useRef([]);

    const [timer, setTimer] = useState(25);
    const [canResend, setCanResend] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    /* ======================
       OTP INPUT CHANGE
    ====================== */

    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // ✅ move forward
        if (value && index < 5) {
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
       TIMER
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

    const handleResend = async () => {
        setTimer(25);
        setCanResend(false);
        setError("");

        try {
            const res = await sendOTP(mobile);

            if (!res.status) {
                setError(res.message || "Failed to resend OTP");
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };

    /* ======================
       VERIFY OTP
    ====================== */

    const handleVerifyOTP = async () => {
        const otpValue = otp.join("");

        // ✅ 6 DIGIT CHECK
        if (otpValue.length !== 6) return;

        setLoading(true);
        setError("");

        try {
            const res = await verifyOTP(mobile, otpValue);

            if (res.status) {
                localStorage.setItem("access", res.tokens.access);
                localStorage.setItem("refresh", res.tokens.refresh);
                localStorage.setItem("user", JSON.stringify(res.user));

                window.location.reload();

                closeOTP();
                window.location.reload();
            } else {
                setError(res.message || "Invalid OTP");
            }
        } catch (err) {
            setError("Verification failed");
        }

        setLoading(false);
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

                    <h3 className="otp-title">OTP Verification</h3>
                </div>

                {/* CONTENT */}
                <div className="otp-content">

                    <p className="otp-text">
                        We have sent a verification code to
                    </p>

                    <p className="otp-mobile">+91-{mobile}</p>

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

                    {/* ERROR */}
                    {error && <p className="error-text">{error}</p>}

                    {/* VERIFY BUTTON */}
                    <button
                        className={`otp-btn ${otp.join("").length === 6 ? "active" : ""}`}
                        disabled={otp.join("").length !== 6 || loading}
                        onClick={handleVerifyOTP}
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
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