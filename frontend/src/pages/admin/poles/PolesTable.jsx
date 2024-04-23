import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { LuPencilLine } from "react-icons/lu";
import { IoEyeSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePoleSl, getPoles } from "../../../api/requests/poleApi";
import AddPoleModal from "./AddPoleModal";
import UpdatePoleModal from "./UpdatePoleModel";

export default function PolesTable() {
    const dispatch = useDispatch();
    const { poles } = useSelector((state) => state.pole);
    useEffect(() => {
        if (poles?.length === 0) {
            dispatch(getPoles());
        }
    }, []);

    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [namePole, setNamePole] = useState("");
    const [idPole, setIdPole] = useState(null);

    const hadndlDelete = (idPole) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Pole!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deletePoleSl(idPole));
            } else {
                swal("the Pole is safe!");
            }
        });
    };

    const handleAddModalOpen = () => {
        setAddModalOpen(true);
    };
    const handleAddModalClose = () => {
        setAddModalOpen(false);
    };

    const handleUpdateModalOpen = (idPole, title) => {
        setIdPole(idPole);
        setNamePole(title);
        setUpdateModalOpen(true);
    };
    const handleUpdateModalClose = () => {
        setUpdateModalOpen(false);
    };

    return (
        <div className="">
            {isAddModalOpen && (
                <AddPoleModal onClose={handleAddModalClose} />
            )}
            {isUpdateModalOpen && (
                <UpdatePoleModal
                    onClose={handleUpdateModalClose}
                    idPole={idPole}
                    namePole={namePole}
                />
            )}
            <main className="w-full flex-grow px-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl text-black pb-6 underline font-semibold">Poles</h1>
                    <button
                        onClick={handleAddModalOpen}
                        className="bg-primary rounded-lg py-2 px-3"
                    >
                        Add new pole
                    </button>
                </div>
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
                                            Pole title
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
                                {poles?.map((elem, index) => (
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
                                            {elem?.name}
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
                                                to={`/posts/poles/${elem?.name}`}
                                                className="inline-block"
                                            >
                                                <IoEyeSharp className="text-3xl text-amber-500" />
                                            </Link>
                                            <button
                                                onClick={() => hadndlDelete(elem?.id)}
                                            >
                                                <MdDelete className="text-3xl text-red-500" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleUpdateModalOpen(
                                                        elem?.id,
                                                        elem?.name
                                                    )
                                                }
                                            >
                                                <LuPencilLine className="text-3xl text-green-500" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
