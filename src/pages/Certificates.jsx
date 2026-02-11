import { useEffect, useState } from "react";
import { API_BASE } from "../services/api";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/certificates/`)
      .then(res => res.json())
      .then(data => {
        setCertificates(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="cert-loading">Loading Certifications...</p>;
  }

  return (
    <section className="cert-section">
      <div className="cert-wrapper">

        {/* Main Heading */}
        <h1 className="cert-main-title">
          Legal & Compliance Certifications
        </h1>

        {/* Subtitle */}
        <p className="cert-subtitle">
          At Fudvira, we operate with complete transparency and adhere to all
          statutory and regulatory requirements. Below are our officially
          issued government-approved certifications.
        </p>

        {/* Certificates List */}
        <div className="cert-list">
          {certificates.map((cert, index) => (
            <div key={cert.id} className="cert-card">
              
              <div className="cert-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="cert-content">
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-description">
                  {cert.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
