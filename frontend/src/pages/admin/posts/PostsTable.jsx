import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { deletePostAdmin, getPosts } from "../../../api/requests/postApi";
import { MdDelete } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";

export default function PostsTable() {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.post);

  const hadndlDelete = (idPost) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePostAdmin(idPost));
      } else {
        swal("the Post is safe!");
      }
    });
  };

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(getPosts());
    }
  }, []);

  return (

    <main className="w-full flex-grow px-6">
        <h1 className="text-3xl text-black pb-6 underline font-semibold">Posts</h1>
        <div className="w-full mt-6">
            <div className="overflow-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                      <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                        Count
                      </p>
                    </th>
                    <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                      <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                        Post Title
                      </p>
                    </th>
                    <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                      <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                        Post Content
                      </p>
                    </th>
                    <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                      <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                        User Profile
                      </p>
                    </th>
                    <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                      <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                        Created At
                      </p>
                    </th>
                    <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                      <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                        Actions
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts?.map((elem, index) => (
                    <tr key={index}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                              {index + 1}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <img
                            src={`${import.meta.env.VITE_API_URL}/storage/${
                              elem?.image
                            }`}
                            alt="post image"
                            className="inline-block relative object-cover object-center rounded-md w-20 h-20 "
                          />
                          <div className="flex flex-col">
                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                              {elem?.title} {elem?.lname}
                            </p>
                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                              {elem?.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        className=""
                        style={{
                          maxWidth: "300px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {elem?.content}
                      </td>
                      <td className="py-4 px-6 border-b  ">
                        <Link to={`/profile/${elem.user?.id}`}>{elem.user?.name}</Link>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <time className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                          {new Date(elem?.created_at).toLocaleString()}
                        </time>
                      </td>
                      <td className="p-4">
                        <Link to={`/posts/details/${elem.id}`} className="inline-block">
                          <IoEyeSharp className="text-3xl text-amber-500" />
                        </Link>
                        <button onClick={() => hadndlDelete(elem?.id)}>
                          <MdDelete className="text-3xl text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
    </main>

  );
}
