import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { API_BASE } from "../services/api";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// PDF worker (Vite safe)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();

export default function Certificates() {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    // store page info per certificate
    const [pdfState, setPdfState] = useState({});

    useEffect(() => {
        fetch(`${API_BASE}/api/certificates/`)
            .then(res => res.json())
            .then(data => {
                setCertificates(data || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const onPdfLoadSuccess = (certId, numPages) => {
        setPdfState(prev => ({
            ...prev,
            [certId]: { total: numPages, current: 1 }
        }));
    };

    const changePage = (certId, offset) => {
        setPdfState(prev => ({
            ...prev,
            [certId]: {
                ...prev[certId],
                current: prev[certId].current + offset
            }
        }));
    };

    if (loading) return <p className="cert-loading">Loading certificates...</p>;

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
                            <iframe
                                src={`${cert.document_url}#toolbar=0&navpanes=0&scrollbar=0`}
                                title={cert.title}
                                width="100%"
                                height="800"
                                style={{
                                    border: "none",
                                    borderRadius: "14px",
                                    background: "#fff"
                                }}
                            />
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}
