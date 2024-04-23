import { Outlet, useLocation, Navigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import useIsAuthenticated from "../router/useIsAuthenticated";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../api/requests/authApi";
import { login, setRole } from "../api/slices/AuthSlice";

export default function UserLayout() {
  const location = useLocation();
  const isUser = useIsAuthenticated("user");
  const { user, token } = useSelector((data) => data.auth);
  const diaspatch = useDispatch();
  const getInfo = async () => {
    await getUser().then((res) => {
      diaspatch(login(res.data))
      diaspatch(setRole(res.data.role))
    })
  };
  useEffect(() => {
    if (!user && token) {
      getInfo();
    }
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <>
      {isUser ? (
        <div className="font-Ubuntu text-second bg-fourth">
          <Navbar />
          <div className="w-[85%] mx-auto min-h-screen">
            <Outlet />
          </div>
          <Footer />
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
}
