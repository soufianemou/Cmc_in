import { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateAdminProfile } from "../../../api/requests/profileApi";

const UpdateModal = ({ onClose, profile }) => {
    const dispatch = useDispatch();
    const nameInput = useRef();
    const lnameInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();

    const handleUpdateProfile = (e) => {
      e.preventDefault();
      let name = nameInput.current.value.trim();
      let lname = lnameInput.current.value.trim();
      let email = emailInput.current.value.trim();
      let password = passwordInput.current.value.trim(); // Get password value
      if (!name || !lname || !email) {
        return toast.error("All fields are required");
      }
      let updatedProfile = { name, lname, email };
      if (password !== "") {
        updatedProfile = { name, lname, email, password };
      }
      dispatch(updateAdminProfile(profile.id, updatedProfile));
      onClose(); // Close the modal after updating profile
    };

    return (
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>
            <div className="bg-white p-8 rounded-md z-10 w-96">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Update Profile</h2>
                    <button onClick={onClose} className="text-gray-500">
                        <FaTimes className="text-xl" />
                    </button>
                </div>
                <form
                    onSubmit={handleUpdateProfile}
                    className="divide-gray-200"
                >
                    <div className="py-4 text-base space-y-4 sm:text-lg">
                        <div className="flex flex-col">
                            <input
                                ref={nameInput}
                                defaultValue={profile.name}
                                type="text"
                                placeholder="First Name" // Added placeholder for first name
                                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                            />
                        </div>

                        <div className="flex flex-col">
                            <input
                                ref={lnameInput}
                                defaultValue={profile.lname}
                                placeholder="Last Name"
                                type="text"
                                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                            />
                        </div>

                        <div className="flex flex-col">
                            <input
                                defaultValue={profile.email}
                                ref={emailInput}
                                type="email"
                                placeholder="Email"
                                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                            />
                        </div>

                        <div className="flex flex-col">
                            <input
                                ref={passwordInput}
                                type="password"
                                placeholder="Password" // Added placeholder for password
                                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="bg-third text-xl font-bold justify-center items-center w-full px-4 py-3 rounded-md text-white"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateModal;
