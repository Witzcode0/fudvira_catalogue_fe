import { API_BASE } from "./api";

// SEND OTP
export const sendOTP = async (mobile) => {
  const res = await fetch(`${API_BASE}/api/auth/send-otp/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mobile }),
  });

  return res.json();
};

// VERIFY OTP
export const verifyOTP = async (mobile, otp) => {
  const res = await fetch(`${API_BASE}/api/auth/verify-otp/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mobile, otp }),
  });

  return res.json();
};