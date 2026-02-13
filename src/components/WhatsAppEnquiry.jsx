import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { createPortal } from "react-dom";

export default function WhatsAppEnquiry({ product, variation, quantity }) {
  const [open, setOpen] = useState(false);
  const [requirement, setRequirement] = useState("");

  const sendWhatsApp = () => {
    if (!product) return;

    const phone = "918980145007";

    const msg = [
      "Hello Fudvira Team,",
      "",
      `Product Name: ${product.name}`,
      variation
        ? `Size: ${variation.quantity}${variation.unit_symbol}`
        : "",
      quantity ? `Quantity: ${quantity}` : "",
      "",
      requirement || "Please share more details.",
      "",
      `${window.location.origin}/product/${product.slug}`
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );

    setOpen(false);
  };

  return (
    <>
      {/* WhatsApp Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          console.log("Button clicked");
          setOpen(true);
        }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "10px 16px",
          borderRadius: "30px",
          border: "none",
          background: "#25D366",
          color: "#fff",
          fontWeight: "600",
          cursor: "pointer"
        }}
      >
        <FaWhatsapp size={16} />
        Enquiry
      </button>

      {/* Modal */}
      {open &&
        createPortal(
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999999
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "12px",
                width: "90%",
                maxWidth: "420px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>
                Quick WhatsApp Enquiry
              </h3>

              <p style={{ marginBottom: "15px", fontWeight: "600" }}>
                {product?.name}
              </p>

              <textarea
                placeholder="Your requirement"
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  resize: "none",
                  minHeight: "80px"
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px"
                }}
              >
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "6px",
                    border: "none",
                    background: "#eee",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>

                <button
                  onClick={sendWhatsApp}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "none",
                    background: "#25D366",
                    color: "#fff",
                    cursor: "pointer"
                  }}
                >
                  <FaWhatsapp size={16} /> Send
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
