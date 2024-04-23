import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaRegComments, FaRegUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsFileEarmarkPost } from "react-icons/bs";
import { TbCategory } from "react-icons/tb";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { logoutUser } from "../../api/requests/authApi";
import { logout } from "../../api/slices/AuthSlice";
export default function Header() {
    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleLogout = async () => {
        await logoutUser()
          .then(() => {
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
                        alt="user image"
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
                    <button onClick={handleLogout}  className="flex items-center gap-2">
                        <IoLogOutOutline className="text-3xl" />
                        <span className="font-medium">Logout</span>
                    </button>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>            
        </div>
        </header>
        {open && (
            <header className="w-full bg-primary py-2 px-4 md:hidden">
                <nav className="flex flex-col pt-4">
                    <Link to={"/admin/dashboard"} className="flex gap-3 items-center hover:bg-white py-4 px-6 "
                        onClick={()=>setOpen(false)}
                    >
                        <MdOutlineSpaceDashboard className="text-4xl" />
                        Dashboard
                    </Link>
                    <Link to={"/admin/dashboard/users-table"} className="flex gap-3 items-center hover:bg-white py-4 px-6 "
                        onClick={()=>setOpen(false)}
                    >              
                        <FaRegUser className="text-3xl" /> 
                        Users                                                     
                    </Link>
                    <Link to={"/admin/dashboard/posts-table"} className="flex gap-3 items-center hover:bg-white py-4 px-6"
                        onClick={()=>setOpen(false)}
                    >              
                        <BsFileEarmarkPost className="text-3xl" /> 
                        Posts
                    </Link>
                    <Link to={"/admin/dashboard/poles-table"} className="flex gap-3 items-center hover:bg-white py-4 px-6 "
                        onClick={()=>setOpen(false)}
                    >              
                        <TbCategory className="text-3xl" /> 
                        poles
                    </Link>
                    <Link to={"/admin/dashboard/comments-table"} className="flex gap-3 items-center hover:bg-white py-4 px-6 "
                        onClick={()=>setOpen(false)}
                    >              
                        <FaRegComments className="text-3xl" /> 
                        Comments
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
