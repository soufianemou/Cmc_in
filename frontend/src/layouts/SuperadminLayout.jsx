import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import SidebarSuperA from "../pages/super-admin/SidebarSuperA";
import HeaderAdmin from "../pages/super-admin/HeaderAdmin";
import useIsAuthenticated from "../router/useIsAuthenticated";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../api/requests/authApi";
import { login } from "../api/slices/AuthSlice";

export default function SuperadminLayout() {
  const location = useLocation();
  const { user,token } = useSelector((data) => data.auth);
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

  const isSperAdmin = useIsAuthenticated("superadmin");
  return (
    <>
      {isSperAdmin ? (
        <div className="flex bg-fourth text-second">
          <SidebarSuperA />
          <div className="relative w-full flex flex-col h-screen overflow-y-scroll">
            <HeaderAdmin />
            <Outlet />
          </div>
        </div>
      ) : 
      <Navigate to={"/"} />
      }
    </>
  );
}
