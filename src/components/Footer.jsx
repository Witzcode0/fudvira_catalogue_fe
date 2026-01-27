import logo from "../assets/images/logo.png";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">

                <div className="footer-top">

                    <div className="footer-col">
                        <img src={logo} alt="Fudvira Logo" className="footer-logo" />

                        <p className="brand-desc">
                            Fudvira is a quality-driven food brand offering pure fruit powders,
                            vegetable powders, herbal powders, spices, and natural honey.
                        </p>

                        <div className="footer-social">
                            <a href="https://www.facebook.com/profile.php?id=61584767964819"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://www.instagram.com/fudvira"><i className="fab fa-instagram"></i></a>
                            {/* <a href="#"><i className="fab fa-linkedin-in"></i></a> */}
                            <a href="https://wa.me/918980145007?text=Hello%20Fudvira%20Team%20👋%0AI%20visited%20your%20catalogue%20at%20https://catalogue.fudvira.com/%20and%20would%20like%20to%20know%20more%20about%20your%20products,%20pricing,%20and%20availability.%0A%0AKindly%20share%20the%20details%20and%20next%20steps.%0A%0AThank%20you!
"><i className="fab fa-whatsapp"></i></a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>Shipping & Returns</h4>
                        <ul>
                            <li>Shipping Policy</li>
                            <li>Store Policy</li>
                            <li>Payment Methods</li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Contact</h4>
                        <ul>
                            <li>+91 89801 45007</li>
                            <li>info@fudvira.com</li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Available On</h4>
                        <ul>
                            <li>IndiaMART</li>
                            <li>Flipkart</li>
                            <li>Amazon</li>
                        </ul>
                    </div>

                </div>

                <div className="footer-bottom">
                    © 2025 <strong>Bharat Oxen</strong> — All Rights Reserved
                </div>

            </div>
        </footer>
    );
}
