import { Link } from "react-router-dom";

export default function UnderMaintenance() {
    return (
        <div className="maintenance-page">
            <div className="maintenance-box">

                <span className="material-icons-round maintenance-icon">
                    construction
                </span>

                <h1>We’re Making Things Better</h1>

                <p>
                    Fudvira is currently under maintenance while we enhance our platform.
                    We’ll be back shortly with a better experience for you.
                </p>


                <Link to="/" className="maintenance-btn">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}
