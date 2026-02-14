
export default function Contact() {
  return (
    <section className="contact-section">

      <div className="container">

        {/* PAGE TITLE */}
        <div className="contact-header text-center">
          <h1>Contact Us</h1>
          <p>
            We'd love to hear from you. Reach out for bulk orders,
            product inquiries or support.
          </p>
        </div>

      </div>

      {/* FULL WIDTH MAP SECTION */}
      <div className="map-full-wrapper">

        <iframe
          title="Fudvira Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1153.9515622662882!2d72.88150186282246!3d21.201360965357974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f51008f3f95%3A0x2c249955cd386981!2sFudvira!5e1!3m2!1sen!2sin!4v1771071455642!5m2!1sen!2sin"
          loading="lazy"
          style={{ border: "0" }}
        ></iframe>

        {/* OVERLAY CONTACT CARD */}
        <div className="contact-overlay-card">

  <div className="info-grid">

    <div className="info-item">
      <h4>Address</h4>
      <p>Surat, Gujarat, India</p>
    </div>

    <div className="info-item">
      <h4>Email</h4>
      <p>info@fudvira.com</p>
    </div>

    <div className="info-item">
      <h4>Phone</h4>
      <p>+91 89801 45007</p>
    </div>

    <div className="info-item">
      <h4>GST Number</h4>
      <p className="gst-highlight">24ABFFB2905F1ZY</p>
    </div>

  </div>

</div>


      </div>

    </section>
  );
}
