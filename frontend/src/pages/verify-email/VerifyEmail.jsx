import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import customAxios from "../../api/axios";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
export default function VerifyEmail() {
  const navigate = useNavigate();
  const { id, email } = useParams();
  const verified = async () => {
    try {
      const { data } = await customAxios.get(`/verify-email/${id}/${email}`);
      navigate("/login");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    verified();
  }, []);

  return <Loader />;
}
