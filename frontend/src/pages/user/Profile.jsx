import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    deleteProfile,
    getProfile,
    updateImageProfile,
} from "../../api/requests/profileApi";
import PostItem from "../../components/Posts/PostItem";
import Loader from "../../components/loader/Loader";
import UpdateProfile from "../../components/profile/UpdateProfile";

const Profile = () => {
    const { id } = useParams();
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const { profile, loading } = useSelector((state) => state.profile);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getProfile(id));
        window.scrollTo(0, 0);
    }, [dispatch,id]);


    const handleUploadClick = () => {
        if (!file) return alert("there is no image");
        const formData = new FormData();
        formData.append("image", file);
        dispatch(updateImageProfile(user.id, formData));
        setFile(null);
        dispatch(getProfile(id));
    };

    const deleteProfileHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, all your Posts and Comments will be deleted",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deleteProfile(user?.id));
            } else {
                swal("Your profile is alive!");
            }
        });
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className=" msx-auto">
            <div className="bg-white  mt-10  p-8 rounded-xl shadow-md">
                <div className="flex items-center space-x-8">
                    <div className="relative w-32 h-32">
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : `${
                                          import.meta.env.VITE_API_URL
                                      }/storage/${profile?.image}`
                            }
                            alt="Profile"
                            className="w-32 h-32 object-cover rounded-full"
                        />
                        {user?.id === profile?.id && (
                            <div>
                                <label
                                    htmlFor="imageInput"
                                    className="absolute bottom-0 right-0 p-2 bg-third rounded-full cursor-pointer"
                                >
                                    <FaCamera className="text-white" />
                                </label>
                                <input
                                    type="file"
                                    name="user_image"
                                    id="imageInput"
                                    className="hidden"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <div className="mt-2">
                            <h2 className="text-2xl font-semibold">
                                {profile?.name} {profile?.lname}
                            </h2>
                            <p className="text-gray-500">{}</p>
                        </div>
                        <div className="mt-4">
                            {user?.id === profile?.id && (
                                <button
                                    disabled={!file}
                                    onClick={handleUploadClick}
                                    className={`bg-third text-white px-4 py-2 rounded-md ${
                                        !file && "cursor-not-allowed"
                                    }`}
                                >
                                    Upload
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-6 ">
                    <p className="">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Quisque tincidunt facilisis mi non suscipit.
                    </p>
                </div>
                {user?.id === profile?.id && (
                    <div className="mt-6 flex justify-end">
                        <UpdateProfile profile={profile} />
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                            onClick={deleteProfileHandler}
                        >
                            Delete Profile
                        </button>
                    </div>
                )}
            </div>
            <h1>Posts of {profile?.name}</h1>
            <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-5">
                {profile?.posts?.map((post) => (
                    <PostItem key={post?.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Profile;
