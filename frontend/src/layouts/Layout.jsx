import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../api/slices/AuthSlice";
import { getUser } from "../api/requests/authApi";

export default function Layout() {
  const location = useLocation();
  const { user, token } = useSelector((data) => data.auth);
  const diaspatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const getInfo = async () => {
    await getUser().then((res) => diaspatch(login(res.data)));
  };
  useEffect(() => {
    if (!user && token) {
      getInfo();
    }
  }, []);

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
