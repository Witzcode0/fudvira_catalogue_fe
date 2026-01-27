import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="container py-3">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
