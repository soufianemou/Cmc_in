import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteCommentAdmin,
  getCommentsAdmin,
} from "../../../api/requests/commentApi";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";

export default function CommentsTable() {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    if (comments.length == 0) {
      dispatch(getCommentsAdmin());
    }
  }, []);

  const hadndlDelete = (idComment) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCommentAdmin(idComment));
      } else {
        swal("the Comment is safe!");
      }
    });
  };

  return (

    <main className="w-full flex-grow px-6">
        <h1 className="text-3xl text-black pb-6 underline font-semibold">Comments</h1>
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
                        Comment body
                      </p>
                    </th>
                    <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                      <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                        User profile
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
                  {comments?.map((elem, index) => (
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
                      <td className="p-4 border-b border-blue-gray-50">{elem.body}</td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Link to={`/profile/${elem.user_id}`}>
                          <IoEyeSharp className="text-3xl text-amber-500" />
                        </Link>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <time className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                          {new Date(elem?.created_at).toLocaleString()}
                        </time>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <button onClick={() => hadndlDelete(elem.id)}>
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
