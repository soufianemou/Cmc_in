/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createPole } from "../../../api/requests/poleApi";

const AddPoleModal = ({ onClose }) => {
    const dispatch = useDispatch();
    const [poleName, setPoleName] = useState("");
    const handleAddPole = (e) => {
        e.preventDefault();
        if (!poleName.trim()) {
            return toast.error("Pole title is required");
        }
        dispatch(createPole({ name: poleName.trim() }));
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>
            <div className="bg-white p-8 rounded-md z-10 w-96">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Add New Pole</h2>
                    <button onClick={onClose} className="text-gray-500">
                        <FaTimes className="text-xl" />
                    </button>
                </div>
                <form onSubmit={handleAddPole}>
                    <div className="py-4 text-base space-y-4 sm:text-lg">
                        <div className="flex flex-col">
                            <input
                                type="text"
                                placeholder="pole Title"
                                value={poleName}
                                onChange={(e) =>
                                    setPoleName(e.target.value)
                                }
                                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="bg-primary text-xl font-bold justify-center items-center w-full px-4 py-3 rounded-md"
                        >
                            Add Pole
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPoleModal;
