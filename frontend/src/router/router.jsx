import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Register from "../pages/forms/Register";
import Login from "../pages/forms/Login";
import UserLayout from "../layouts/UserLayout";
import GuestLayout from "../layouts/GuestLayout";
import ForgotPassword from "../pages/forgot-pass/ForgotPassword";
import ResetPassword from "../pages/reset-password/ResetPassword";
import SuperadminLayout from "../layouts/SuperadminLayout";
import PolesTable from "../pages/admin/poles/PolesTable";
import PostPage from "../pages/posts-pages/PostPage";
import CreatePost from "../pages/create-post/CreatePost";
import Layout from "../layouts/Layout";
import Profile from "../pages/user/Profile";
import Poles from "../pages/poles/Poles";
import PostDetails from "../pages/post details/PostDetails";
import CommentsTable from "../pages/admin/comments/CommentsTable";
import PostsTable from "../pages/admin/posts/PostsTable";
import GoogleCallback from "../pages/google-auth/GoogleCallback";
import NotFound from "../pages/not found/NotFound";
import AdminsTable from "../pages/super-admin/admins/AdminsTable";
import AddAdmin from "../pages/super-admin/admins/UsersTable";
import VerifyEmail from "../pages/verify-email/VerifyEmail";
import UseradminTable from "../pages/admin/users/UseradminTable";
import AdminLayout from "../layouts/AdminLayout";
import DashboardTable from "../pages/admin/dashboard/DashboardTable";
import ContactUs from "../pages/contact/ContactUs";
import AdminProfile from "../pages/admin/admin profile/AdminProfile";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/posts", element: <PostPage /> },
      { path: "/posts/details/:id", element: <PostDetails /> },
      { path: "/posts/poles/:pole", element: <Poles /> },
      { path: "/profile/:id", element: <Profile /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/auth/google/callback", element: <GoogleCallback /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    element: <GuestLayout />,
    children: [
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/password-reset/:token", element: <ResetPassword /> },
      { path: "/verify-email/:id/:email", element: <VerifyEmail /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    element: <UserLayout />,
    children: [
      { path: "/profile/:id", element: <Profile /> },
      { path: "/create-post", element: <CreatePost /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      { path: "/admin/dashboard", element: <DashboardTable /> },
      { path: "/admin/dashboard/profile/:id", element: <AdminProfile   /> },
      { path: "/admin/dashboard/users-table", element: <UseradminTable /> },
      { path: "/admin/dashboard/comments-table", element: <CommentsTable /> },
      { path: "/admin/dashboard/posts-table", element: <PostsTable /> },
      { path: "/admin/dashboard/poles-table", element: <PolesTable /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    element: <SuperadminLayout />,
    children: [
      { path: "/superadmin/dashboard/admins-table", element: <AdminsTable /> },
      { path: "/superadmin/dashboard/users-table", element: <AddAdmin /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
