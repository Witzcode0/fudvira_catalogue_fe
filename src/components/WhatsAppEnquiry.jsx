import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { createPortal } from "react-dom";

export default function WhatsAppEnquiry({ product }) {
  const [open, setOpen] = useState(false);
  const [requirement, setRequirement] = useState("");
  const [quantity, setQuantity] = useState("");
const sendWhatsApp = () => {
  const phone = "919876543210"; // Replace with your WhatsApp number

  const msg = [
    "Hello Fudvira Team,",
    "",
    "I am interested in the following product:",
    "",
    `Product Name: ${product.name}`,
    "",
    "Requirement:",
    requirement || "Please share more details about this product.",
    "",
    "Quantity Required:",
    quantity || "Not specified",
    "",
    "Product Link:",
    `${window.location.origin}/product/${product.slug}`,
    "",
    "Thank you."
  ].join("\n");

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
    "_blank"
  );

  setOpen(false);
  setRequirement("");
  setQuantity("");
};



  return (
    <>
      {/* BUTTON */}
      <button
        className="whatsapp-enquiry-btn"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <FaWhatsapp size={16} />
        Enquiry
      </button>

      {/* 🔥 MODAL RENDERED AT BODY LEVEL */}
      {open &&
        createPortal(
          <div
            className="enquiry-modal-overlay"
            onClick={() => setOpen(false)}
          >
            <div
              className="enquiry-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Quick WhatsApp Enquiry</h3>

              <p>📦 {product.name}</p>

              <textarea
                placeholder="Your requirement"
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
              />

              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />

              <div className="enquiry-actions">
                <button
                  className="btn-cancel"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn-whatsapp"
                  onClick={sendWhatsApp}
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
