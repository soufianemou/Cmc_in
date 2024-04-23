import { toast } from "react-toastify";
import customAxios from "../axios";

//forgot password
export const forgotPassword = (email) => {
    return async () => {
        try {
            const { data } = await customAxios.post("/forgot-password", {
                email,
            });
            toast.success(data.status);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
};

//reset password
export function resetPassword(values) {
    return async () => {
        try {
            const { data } = await customAxios.post(`/reset-password`, values);
            toast.success(data.status);
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}
