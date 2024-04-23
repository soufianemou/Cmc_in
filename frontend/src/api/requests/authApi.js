import customAxios from "../axios";

const authApi = {
  registerUser: async (newUser) => {
    return await customAxios.post("/register", newUser);
  },
  loginUser: async (user) => {
    return await customAxios.post("/login", user);
  },
  logoutUser: async () => {
    return await customAxios.post("/logout");
  },
  getUser: async () => {
    return await customAxios.get("/me");
  },
};

export const { loginUser, logoutUser, registerUser, getUser } = authApi;
