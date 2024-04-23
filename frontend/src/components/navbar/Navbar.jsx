import { Link, useNavigate } from "react-router-dom";
import {
  IoCreateOutline,
  IoHomeOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import { RiPagesLine } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";
import { logoutUser } from "../../api/requests/authApi";
import { logout } from "../../api/slices/AuthSlice";
import { MdPermContactCalendar } from "react-icons/md";
import { toast } from "react-toastify";
import { SheetClose } from "../ui/sheet";
import Cookies from "js-cookie";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, role} = useSelector((data) => data.auth);
  const currentRole = user?.role || role
  const handleLogout = async () => {
    await logoutUser()
      .then(() => {
        Cookies.remove("ACCESS_TOKEN");
        dispatch(logout());
        toast.success("disconnected");
        navigate("/");
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  const displayLogin = () => {
    if (currentRole === "user") {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex justify-center items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-third">
                <img
                  src={`${import.meta.env.VITE_API_URL}/storage/${user?.image}`}
                  alt="user image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-semibold dark:text-white text-gray-900 text-lg">
                <div className="cursor-pointer">{user?.name}</div>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link
                to={`profile/${user?.id}`}
                className="flex items-center gap-3"
              >
                <FaRegUser className="text-2xl" />
                <span className="font-medium">Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <IoLogOutOutline className="text-3xl" />
                <span className="font-medium">Logout</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else if (currentRole === "admin" || currentRole === "superadmin") {
      return "";
    } else {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>Connection</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to="/login" className="flex items-center gap-2">
                <LuLogIn className="text-2xl" />
                <span className="font-medium">Login</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/register" className="flex items-center gap-2 mt-2">
                <IoMdPersonAdd className="text-2xl" />
                <span className="font-medium">Register</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  };

  return (
    <div className="bg-primary py-3 sticky top-0 left-0 w-full z-50">
      <nav className="w-[90%] mx-auto flex justify-between items-center relative py-2">
        <ul className="flex gap-4 items-center">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <RxHamburgerMenu className="text-5xl " />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full " side={"left"}>
                <ul className="flex gap-20 items-center justify-center flex-col h-full">
                  <SheetClose asChild>
                    <Link
                      to={"/"}
                      className="font-medium hover:text-third flex items-center gap-1 cursor-pointer"
                    >
                      <IoHomeOutline className="text-2xl" />
                      <span>Home</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to={"/posts"}
                      className="font-medium hover:text-third flex items-center gap-1 cursor-pointer"
                    >
                      <RiPagesLine className="text-2xl" />
                      <span>All Posts</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    {user && currentRole === "user" && (
                      <Link
                        to={"/create-post"}
                        className="font-medium hover:text-third flex items-center gap-1 cursor-pointer"
                      >
                        <IoCreateOutline className="text-2xl" />
                        <span>Add Post</span>
                      </Link>
                    )}
                  </SheetClose>
                  <SheetClose asChild>
                    {currentRole === "admin" && (
                      <Link
                        to={"/admin/dashboard"}
                        className="font-medium hover:text-third flex items-center gap-1 cursor-pointer"
                      >
                        <MdPermContactCalendar className="text-2xl" />
                        <span>dashboard</span>
                      </Link>
                    )}
                  </SheetClose>
                  <SheetClose asChild>
                    {currentRole === "superadmin" && (
                      <Link
                        to={"/superadmin/dashboard/admins-table"}
                        className="font-medium hover:text-third flex items-center gap-1 cursor-pointer"
                      >
                        <MdPermContactCalendar className="text-2xl" />
                        <span>dashboard</span>
                      </Link>
                    )}
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to={"/contact"}
                      className="font-medium hover:text-third flex items-center gap-1 cursor-pointer"
                    >
                      <MdPermContactCalendar className="text-2xl" />
                      <span>Contact Us</span>
                    </Link>
                  </SheetClose>
                </ul>
              </SheetContent>
            </Sheet>
          </div>
          <Link to='/' className="text-2xl">Cmc In</Link>
        </ul>
        <ul className="hidden md:flex gap-10 items-center">
          <Link
            to={"/"}
            className="font-medium hover:text-third flex items-center gap-1 cursor-pointer"
          >
            <IoHomeOutline className="text-2xl" />
            <span>Home</span>
          </Link>
          <Link
            to={"/posts"}
            className="font-medium hover:text-third flex items-center gap-1 cursor-pointer"
          >
            <RiPagesLine className="text-2xl" />
            <span>All Posts</span>
          </Link>
          {user && currentRole === "user" && (
            <Link
              to={"/create-post"}
              className="font-medium hover:text-third flex items-center gap-1 cursor-pointer"
            >
              <IoCreateOutline className="text-2xl" />
              <span>Add Post</span>
            </Link>
          )}
          {currentRole === "admin" && (
            <Link
              to={"/admin/dashboard"}
              className="font-medium hover:text-third flex items-center gap-1 cursor-pointer"
            >
              <MdPermContactCalendar className="text-2xl" />
              <span>dashboard</span>
            </Link>
          )}
          {currentRole === "superadmin" && (
            <Link
              to={"/superadmin/dashboard/admins-table"}
              className="font-medium hover:text-third flex items-center gap-1 cursor-pointer"
            >
              <MdPermContactCalendar className="text-2xl" />
              <span>dashboard</span>
            </Link>
          )}
          <Link
            to={"/contact"}
            className="font-medium hover:text-third flex items-center gap-1 cursor-pointer"
          >
            <MdPermContactCalendar className="text-2xl" />
            <span>Contact Us</span>
          </Link>
        </ul>
        <div>{displayLogin()}</div>
      </nav>
    </div>
  );
}
