import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/admin/Header";
import SideBar from "../components/admin/SideBar";
import useIsAuthenticated from "../router/useIsAuthenticated";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../api/requests/authApi";
import { login } from "../api/slices/AuthSlice";
export default function AdminLayout() {
  const location = useLocation();
  const { user, token } = useSelector((data) => data.auth);
  const diaspatch = useDispatch()
  const getInfo = async ()=>{
    await getUser().then((res) => diaspatch(login(res.data)))
  }
  useEffect(() => {
    if(!user && token){
      getInfo()
    }
  }, []);
  
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const isAdmin = useIsAuthenticated("admin");
  return (
    <>
      {isAdmin ? (
        <div className="flex bg-fourth text-second">
          <SideBar />
          <div className="relative w-full flex flex-col h-screen overflow-y-scroll">
            <Header />
            <Outlet />
          </div>
        </div>
      ) : 
        <Navigate to={"/"} />
      }
    </>
  );
}
