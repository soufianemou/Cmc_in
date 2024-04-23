import { toast } from "react-toastify";
import customAxios from "../axios";
import { logout, setUserPhoto, setUserinfoAfterupdate } from "../slices/AuthSlice";
import {
  setNewPhotoProfile,
  setProfile,
  setProfiles,
  updateProfileSlice,
  deleteFromProfiles,
  setLoading,
  clearLoading
} from "../slices/profileSlice";
import Cookies from "js-cookie";


//get profile
export function getProfile(id) {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const { data } = await customAxios.get(`/profiles/${id}`);
      dispatch(setProfile(data.data));
      dispatch(clearLoading());
    } catch (error) {
      window.location.href = "/*";
      dispatch(clearLoading());
    }
  };
}
//update profile account
export function updateProfile(id, profile) {
  return async (dispatch) => {
    try {
      const { data } = await customAxios.put(`/user/profiles/${id}`, profile);
      dispatch(updateProfileSlice(data.user));
      dispatch(setUserinfoAfterupdate(data.user));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
//update image profile
export function updateImageProfile(id, formData) {
  return async (dispatch) => {
    try {
      const { data } = await customAxios.post(
        `/user/profiles/image/${id}`,
        formData
      );
      dispatch(setNewPhotoProfile(data.user.image));
      dispatch(setUserPhoto(data.user.image));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
//delete profile account
export function deleteProfile(id) {
  return async (dispatch) => {
    try {
      const { data } = await customAxios.delete(`/user/profiles/${id}`);
      Cookies.remove("ACCESS_TOKEN");
      dispatch(logout());
      window.location.href = "/";
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
//get all profiles admin
export function getAllProfiles() {
  return async (dispatch) => {
    try {
      const { data } = await customAxios.get(`/admin/profiles`);
      dispatch(setProfiles(data.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
//delete profile account admin
export function deleteProfileAdmin(id) {
  return async (dispatch) => {
    try {
      const { data } = await customAxios.delete(`/admin/profiles/${id}`);
      dispatch(deleteFromProfiles(id));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
//update Admin account
export function updateAdminProfile(id, profile) {
  return async (dispatch) => {
    try {
      const { data } = await customAxios.put(`/admin/profiles/${id}`, profile);
      toast.success(data.message);
      dispatch(updateProfileSlice(data.admin));
      dispatch(setUserinfoAfterupdate(data.admin));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
//update image Admin
export function updateImageAdmin(id, formData) {
  return async (dispatch) => {
    try {
      const { data } = await customAxios.post(
        `/admin/profiles/image/${id}`,
        formData
      );
      toast.success(data.message);
      dispatch(setUserPhoto(data.admin.image));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
