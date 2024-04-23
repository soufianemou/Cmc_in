import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom"; // Correct import
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

export default function GuestLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (localStorage.getItem("ACCESS_TOKEN")) {
      navigate("/");
    }
  }, [navigate]);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);
  return (
    <div className="font-Ubuntu text-second bg-fourth">
      <Navbar />
      <div className="w-[85%] mx-auto min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
