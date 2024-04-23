import { useEffect } from "react";
import { FaRegComments, FaRegUser } from "react-icons/fa";
import { TbCategory } from "react-icons/tb";
import { BsGraphUpArrow } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCommentsAdmin } from "../../../api/requests/commentApi";
import { getPosts } from "../../../api/requests/postApi";
import { getAllProfiles } from "../../../api/requests/profileApi";

import BarChart from "../../../components/charts/BarChart";
import LineChart from "../../../components/charts/LineChart";
import TopThreeLikedPosts from "../../../components/charts/topThreeLikedPosts";
import PolarChart from "../../../components/charts/PolarChart";
import { getPoles } from "../../../api/requests/poleApi";

export default function DashboardTable() {
  const dispatch = useDispatch();
  const { poles } = useSelector((state) => state.pole);
  const { comments } = useSelector((state) => state.comment);
  const { posts } = useSelector((state) => state.post);
  const { profiles } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getPoles());
    dispatch(getCommentsAdmin());
    dispatch(getPosts());
    dispatch(getAllProfiles());
  }, []);
  return (
    <main className="p-6 sm:p-10 space-y-6">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <h1 className="text-4xl font-semibold mb-2">
          Welcome To Dashboard {user?.name} {user?.lname}
        </h1>
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="flex items-center justify-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
            <Link to={"/admin/dashboard/users-table"}>
              <FaRegUser className="text-4xl" />
            </Link>
          </div>
          <div>
            <span className="block text-2xl font-bold">{profiles.length}</span>
            <span className="block text-gray-500">Users</span>
          </div>
        </div>
        <div className="flex items-center justify-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
            <Link to={"/admin/dashboard/posts-table"}>
              <BsGraphUpArrow className="text-4xl" />
            </Link>
          </div>
          <div>
            <span className="block text-2xl font-bold">{posts.length}</span>
            <span className="block text-gray-500">Posts</span>
          </div>
        </div>
        <div className="flex items-center justify-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
            <Link to={"/admin/dashboard/poles-table"}>
              <TbCategory className="text-4xl" />
            </Link>
          </div>
          <div>
            <span className="inline-block text-2xl font-bold">
              {poles.length}
            </span>
            <span className="block text-gray-500">poles</span>
          </div>
        </div>
        <div className="flex items-center justify-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <Link to={"/admin/dashboard/comments-table"}>
              <FaRegComments className="text-4xl" />
            </Link>
          </div>
          <div>
            <span className="block text-2xl font-bold">{comments.length}</span>
            <span className="block text-gray-500">Comments</span>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100 text-center">
            Total Posts per Pole.
          </div>
          <div className="p-4">
            <BarChart />
          </div>
        </div>
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100 text-center">
            Total Comments per Pole.
          </div>
          <div className="p-4">
            <LineChart />
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg col-span-2">
          <div className="px-6 py-5 font-semibold border-b border-gray-100 text-center">
            Top Commenters.
          </div>
          <div className="p-4">
            <PolarChart />
          </div>
        </div>
        <div className="bg-white shadow rounded-lg col-span-1">
          <div className="px-6 py-5 font-semibold border-b border-gray-100 text-center">
            Top Liked Posts.
          </div>
          <div className="p-4">
            <TopThreeLikedPosts />
          </div>
        </div>
      </section>
    </main>
  );
}
