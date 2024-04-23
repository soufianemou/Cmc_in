import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaRegUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { logoutUser } from "../../api/requests/authApi";
import { logout } from "../../api/slices/AuthSlice";
import { FiUsers } from "react-icons/fi";
import { FaUsersGear } from "react-icons/fa6";
import Cookies from "js-cookie";

export default function HeaderAdmin() {
    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
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
    <div>
        <header className="p-4 pr-8">
        <div className="flex  items-center justify-between">
            <button className="md:hidden" onClick={()=>setOpen(prev=>!prev)}>
            {open ? <IoMdClose className="text-4xl" /> :<IoMenu className="text-4xl"/>} 
            </button>
            <button></button>
            <div className="flex gap-3 items-center">
            <Button>
                <Link to="/">Cmc In</Link>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger>
                <div className="flex justify-center items-center space-x-3 cursor-pointer">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-third">
                    <img
                        src={`${import.meta.env.VITE_API_URL}/storage/${
                        user?.image
                        }`}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    </div>
                </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link
                    to={`/admin/dashboard/profile/${user?.id}`}
                    className="flex items-center gap-3"
                    >
                    <FaRegUser className="text-2xl" />
                    <span className="font-medium">Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <span className="flex items-center gap-2">
                    <IoLogOutOutline className="text-3xl" />
                    <button onClick={handleLogout}>logout</button>
                    </span>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>            
        </div>
        </header>
        {open && (
            <header className="w-full bg-primary py-2 px-4 md:hidden">
                <nav className="flex flex-col pt-4">
                <Link onClick={()=>setOpen(false)} to={"/superadmin/dashboard/admins-table"} className="flex gap-3 items-center hover:bg-fourth  py-4 px-6 ">              
                    <FiUsers className="text-3xl" /> 
                    Admins
                </Link>
                <Link onClick={()=>setOpen(false)} to={"/superadmin/dashboard/users-table"} className="flex gap-3 items-center hover:bg-fourth py-4 px-6 ">              
                    <FaUsersGear className="text-3xl" /> 
                    Users
                </Link>
                <button onClick={handleLogout} className="w-full bg-white cta-btn font-semibold py-2 mt-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                    <IoLogOutOutline className="text-3xl" />  Log out
                </button>
                </nav>
            </header>
        )}
    </div>
  )
}
