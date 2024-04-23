import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { useEffect } from "react";
import { deleteProfileAdmin, getAllProfiles } from "../../../api/requests/profileApi";

export default function UseradminTable() {
    const dispatch = useDispatch();
    const { profiles } = useSelector((state) => state.profile);

    useEffect(() => {
        if(profiles.length == 0){
            dispatch(getAllProfiles());
        }
    }, []);

    const hadndlDelete = (idUser) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this User!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deleteProfileAdmin(idUser));
            } else {
                swal("the user is safe!");
            }
        });
    };

  return (
    <main className="w-full flex-grow px-6">
        <h1 className="text-3xl text-black pb-6 underline font-semibold">Users</h1>
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
                                    User
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
                        {profiles?.map((elem, index) => (
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
                                            src={`${import.meta.env.VITE_API_URL}/storage/${elem?.image}`}                                        
                                            alt="profile image"
                                            className="inline-block relative object-cover object-center rounded-full w-9 h-9 "
                                        />
                                        <div className="flex flex-col">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                                                {elem.name} {elem.lname}
                                            </p>
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                                                {elem.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <time className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                                        {new Date(
                                            elem?.created_at
                                        ).toLocaleString()}
                                    </time>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Link
                                        to={`/profile/${elem.id}`}
                                        className="inline-block"
                                    >
                                        <IoEyeSharp className="text-3xl text-amber-500" />
                                    </Link>
                                    <button
                                        onClick={() => hadndlDelete(elem.id)}
                                    >
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
  )
}
