import { toast } from "react-toastify";
import customAxios from "../axios";
import { deleteFromAdmins, setAdmins, setUsers, addAdmins, deletFromUsers } from "../slices/adminSlice";


//get all users
export function getUsers() {
  return async (dispatch) => {
    try {
      const { data } = await customAxios.get("/superadmin/users");
      dispatch(setUsers(data.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//get all admins
export function getAdmins() {
  return async (dispatch) => {
    try {
      const { data } = await customAxios.get(`/superadmin/admins`);
      dispatch(setAdmins(data.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// transformUserToAdmin
export function transformUserToAdmin(id) {
  return async (dispatch) => {
    try {
      const { data } = await customAxios.post(`/superadmin/transform/${id}`);
      toast.success(data.message);
      dispatch(addAdmins(data.admin));
      dispatch(deletFromUsers(id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//delete admin
export function deleteAdmin(id) {
  return async (dispatch) => {
    try {
      const { data } = await customAxios.delete(`/superadmin/admins/${id}`);
      dispatch(deleteFromAdmins(id));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
