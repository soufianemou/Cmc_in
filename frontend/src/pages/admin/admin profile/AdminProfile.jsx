import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaCamera } from "react-icons/fa";
import UpdateModal from "./UpdateModal";
import {updateImageAdmin} from "../../../api/requests/profileApi";

export default function AdminProfile() {
    const { user } = useSelector((state) => state.auth);
    const [file, setFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const handleUploadClick = () => {
        if (!file) {
            alert("There is no image");
            return;
        }
        const formData = new FormData();
        formData.append("image", file);
        dispatch(updateImageAdmin(user.id, formData));
    };

    return (
        <div className="flex justify-center">
            <div className="flex flex-col items-center justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
                <div className="relative flex flex-col items-center">
                    <div className="w-32 h-32 relative">
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : `${
                                          import.meta.env.VITE_API_URL
                                      }/storage/${user?.image}`
                            }
                            alt="Profile"
                            className="w-32 h-32 object-cover rounded-full"
                        />
                        <label
                            htmlFor="imageInput"
                            className="absolute bottom-0 right-0 p-2 bg-third rounded-full cursor-pointer"
                        >
                            <FaCamera className="text-white" />
                        </label>
                    </div>
                    <input
                        type="file"
                        name="user_image"
                        id="imageInput"
                        className="hidden"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>
                <div className="mt-4">
                    <button
                        disabled={!file}
                        onClick={handleUploadClick}
                        className={`bg-primary text-white px-4 py-2 rounded-md ${
                            !file && "cursor-not-allowed"
                        }`}
                    >
                        Change image
                    </button>
                </div>
                <div className="space-y-4 text-center divide-y dark:divide-gray-700 mt-4">
                    <div className="my-2 space-y-1">
                        <h2 className="text-xl font-semibold sm:text-2xl">
                            {user?.name} {user?.lname}
                        </h2>
                        <p className="px-5 text-xs sm:text-base dark:text-gray-400">
                            {user?.role}
                        </p>
                    </div>
                    <div className="flex justify-center pt-2 space-x-4 align-center">
                        <button
                            onClick={() => setShowModal(true)}
                            className="p-2 rounded-md dark:text-gray-100 hover:dark:text-default-400 bg-primary"
                        >
                            Update
                        </button>
                    </div>
                </div>
                {showModal && (
                    <UpdateModal
                        profile={user}
                        onClose={() => setShowModal(false)}
                    />
                )}
            </div>
        </div>
    );
}
