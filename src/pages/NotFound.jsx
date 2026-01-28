import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notfound-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>

      <p>
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link to="/" className="notfound-link">
        <span className="material-icons-round">home</span>
        Go to Home
      </Link>
    </div>
  );
}
