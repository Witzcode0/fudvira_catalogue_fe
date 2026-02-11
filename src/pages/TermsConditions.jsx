import { useState } from "react";

const termsData = [
  {
    title: "About Fudvira",
    content:
      "Fudvira is a quality-driven food brand offering natural food powders, herbal powders, spices, and natural honey. We serve both individual consumers and business customers across India."
  },
  {
    title: "Use of Website",
    content:
      "You must use this website only for lawful purposes. Any misuse, disruption attempt, or unauthorized access is strictly prohibited."
  },
  {
    title: "Product Information",
    content:
      "Natural products may vary slightly in color, texture, or taste due to sourcing and seasonal factors. We ensure quality and authenticity."
  },
  {
    title: "Shipping & Delivery",
    content:
      "Delivery timelines may vary based on logistics and location. We aim for safe and timely dispatch."
  },
  {
    title: "Returns & Refunds",
    content:
      "Returns are accepted only for damaged or incorrect items reported within 48 hours of delivery."
  },
  {
    title: "Intellectual Property",
    content:
      "All content, branding, and designs belong to Fudvira and cannot be reused without written permission."
  },
  {
    title: "Governing Law",
    content:
      "These Terms are governed by the laws of India and subject to Indian jurisdiction."
  }
];

export default function TermsConditions() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main className="policy-page">
      <div className="policy-hero">
        <h1>Terms & Conditions</h1>
        <p>
          Please read these terms carefully before using our website or
          purchasing our products.
        </p>
      </div>

      <div className="policy-container">
        {termsData.map((item, index) => (
          <div key={index} className="accordion-item">
            <button
              className="accordion-title"
              onClick={() => toggle(index)}
            >
              <div className="accordion-left">
                <span className="serial-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="title-text">{item.title}</span>
              </div>

              <span className="toggle-icon">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>

            {activeIndex === index && (
              <div className="accordion-content">
                <p>{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
