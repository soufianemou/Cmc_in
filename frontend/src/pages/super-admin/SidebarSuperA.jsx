import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { logoutUser } from "../../api/requests/authApi";
import { logout } from "../../api/slices/AuthSlice";
import { useDispatch, } from "react-redux";
import { toast } from "react-toastify";
import { FaUsersGear } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import Cookies from "js-cookie";

export default function SidebarSuperA() {
    const dispatch = useDispatch();
    const handleLogout = async () => {
        await logoutUser()
        .then(() => {
            Cookies.remove("user");
            Cookies.remove("ACCESS_TOKEN");
            dispatch(logout());
        })
        .catch((error) => toast.error(error.response.data.message));
    };
  return (
    <aside className="relative h-screen w-52 hidden md:block shadow-xl bg-third">
        <div className="bg-primary">
            <h1 className="flex gap-3 items-center py-3 px-6 font-bold text-xl">              
                <MdOutlineSpaceDashboard className="text-5xl" /> 
                Cmc in
            </h1>
        </div>
        <nav className=" text-primary">
            <Link to={"/superadmin/dashboard/admins-table"} className="flex gap-3 items-center hover:bg-fourth  py-4 px-6 ">              
                <FiUsers className="text-3xl" /> 
                Admins
            </Link>
            <Link to={"/superadmin/dashboard/users-table"} className="flex gap-3 items-center hover:bg-fourth py-4 px-6 ">              
                <FaUsersGear className="text-3xl" /> 
                Users
            </Link>
        </nav>
        <div className="absolute w-full upgrade-btn bottom-0 active-nav-link  flex items-center justify-center py-4">    
            <button onClick={handleLogout} className="flex gap-3 items-center bg-fourth py-2 px-6 rounded-lg font-bold">
                <IoLogOutOutline className="text-4xl" />
                Logout
            </button>
        </div>
    </aside>
  )
}
