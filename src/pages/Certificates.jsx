import { useEffect, useState } from "react";
import { API_BASE } from "../services/api";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  /* Detect screen size */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
    return <p className="cert-loading">Loading certificates...</p>;
  }

  return (
    <div className="cert-page">
      <div className="cert-container">
        <h1>Legal & Compliance Certifications</h1>

        <p className="cert-intro">
          We operate with full transparency and comply with all statutory
          requirements. Below are our officially issued certificates.
        </p>

        {certificates.map((cert, index) => (
          <div key={cert.id} className="cert-block">
            <h2 className="cert-title">
              <span className="cert-serial">
                {String(index + 1).padStart(2, "0")}
              </span>
              {cert.title}
            </h2>

            <p className="cert-desc">{cert.description}</p>

            <div className="cert-pdf">
              {/* DESKTOP VIEW */}
              {!isMobile && (
                <iframe
                  src={`${cert.document_url}#toolbar=0&navpanes=0&scrollbar=1&zoom=page-width`}
                  title={cert.title}
                  className="cert-pdf-frame"
                />
              )}

              {/* MOBILE VIEW */}
              {isMobile && (
                <a
                  href={cert.document_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-download"
                >
                  View Certificate
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
