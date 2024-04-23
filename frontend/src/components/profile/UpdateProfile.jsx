/* eslint-disable react/prop-types */
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { useRef } from "react";
// import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../api/requests/profileApi";
import { DialogClose } from "@radix-ui/react-dialog";
export default function UpdateProfile({profile}) {
    const dispatch = useDispatch();
    const nameInput = useRef();
    const lnameInput = useRef();
    const passwordInput = useRef();

    const handleUpdateProfile = (e) => {
      e.preventDefault();
      let name = nameInput.current.value.trim();
      let lname = lnameInput.current.value.trim();   
      let password = passwordInput.current.value.trim(); 
      if (!name || !lname ) {
        return alert("All fields are required");
      }

      let updatedProfile = { name, lname };
      if (password !== "") {
        updatedProfile = { name, lname, password };
      }
      dispatch(updateProfile(profile.id, updatedProfile));
    };
  return (
    <div>
         <Dialog>
            <DialogTrigger>
            <button
                className="bg-third text-white px-4 py-2 rounded-md mr-4"
            >
                Update Profile
            </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update your Profile</DialogTitle>
                    <DialogDescription>
                        <form
                        onSubmit={handleUpdateProfile}
                        className="divide-gray-200"
                    >
                        <div className="py-4 text-base space-y-4 sm:text-lg">
                            <div className="flex flex-col">
                                <input
                                    ref={nameInput}
                                    defaultValue={profile?.name}
                                    type="text"
                                    placeholder="First Name" // Added placeholder for first name
                                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                />
                            </div>

                            <div className="flex flex-col">
                                <input
                                    ref={lnameInput}
                                    defaultValue={profile?.lname}
                                    placeholder="Last Name"
                                    type="text"
                                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                />
                            </div>

                            <div className="flex flex-col">
                                <input
                                    defaultValue={profile?.email}
                                    // ref={emailInput}
                                    readOnly
                                    disabled
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
                            <DialogClose asChild>
                                <button
                                    type="submit"
                                    className="bg-primary text-xl font-bold justify-center items-center w-full px-4 py-3 rounded-md text-white"
                                >
                                    Save Changes
                                </button>
                            </DialogClose>
                        </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
  )
}
