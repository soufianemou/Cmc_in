import { useEffect } from "react";
import customAxios from "../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login, setToken } from "../../api/slices/AuthSlice";
import Loader from "../../components/loader/Loader";
import Cookies from "js-cookie";

export default function GoogleCallback() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const googleCall = async () => {
      try {
        const data = await customAxios.get(
          `/auth/google/callback/${location.search}`
        );
        if (data.status === 200) {
          dispatch(setToken(data.data.token));
          dispatch(login(data.data.user));
          Cookies.set("ACCESS_TOKEN", data.data.token, {
            expires: new Date(data.session_expiration),
            secure: true,
          });
          const { role } = data.data.user;
          switch (role) {
            case "user":
              navigate("/");
              break;
            case "admin":
              navigate("/admin/dashboard");
              break;
            case "superadmin":
              navigate("/superadmin/dashboard");
              break;
            default:
              navigate("/");
              break;
          }
          toast.success(data.data.message);
        }
      } catch (error) {
        // navigate("/login");
        // toast.error("This account is already registered with a password");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    };
    googleCall();
  }, []);

  return <Loader />;
}
