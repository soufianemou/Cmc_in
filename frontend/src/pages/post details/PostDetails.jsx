import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import {
    deletePostApi,
    getPosts,
    getSinglePost,
    toggleLikePost,
    updateImagePost,
} from "../../api/requests/postApi";
import AddComent from "../../components/comments/AddComent";
import CommentsList from "../../components/comments/CommentsList";
import Loader from "../../components/loader/Loader";
import LatestPost from "./latestPost";
import UpdatePost from "../../components/Posts/UpdatePost";
import { fetchPolespublic } from "../../api/requests/poleApi";

export default function PostDetails() {
    const dispatch = useDispatch();
    const { user, role} = useSelector((data) => data.auth);
    const currentRole = user?.role || role
    const { posts, post, loading } = useSelector((state) => state.post);
    const { poles } = useSelector((state) => state.pole);
    const { id } = useParams();
    const [file, setFile] = useState(null);

    useEffect(()=>{
        if(posts.length === 0){
            dispatch(getPosts())
        }
    },[])
    useEffect(() => {
        if(poles?.length === 0){
            dispatch(fetchPolespublic());
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getSinglePost(id));
    }, [id]);

    const handleImageUpdate = (e) => {
        e.preventDefault();
        if (!file) return toast.warning("there is no file");
        const formData = new FormData();
        formData.append("image", file);
        dispatch(updateImagePost(post?.id, formData));
    };
    const navigate = useNavigate();
    const deletePostHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deletePostApi(post?.id));
                navigate(`/profile/${user?.id}`);
            } else {
                swal("Your Post is still alive!");
            }
        });
    };

    if (loading ) {
        return <Loader />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 my-20 ">
            <article className="col-span-4 py-10 mx-auto space-y-6 text-center">
                <Link
                    className="bg-primary font-medium py-1 rounded-full px-4 text-lg "
                    to={`/posts/poles/${post?.pole?.name}`}
                >
                    pole :{post?.pole?.name}
                </Link>
                <h1 className="text-4xl font-bold md:text-5xl">
                    {post?.title}
                </h1>
                <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row justify-center">
                    <img
                        src={`${import.meta.env.VITE_API_URL}/storage/${
                            post?.user?.image
                        }`}
                        alt=""
                        className="self-center flex-shrink-0 w-14 h-14 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-700"
                    />
                    <div className="flex flex-col">
                        <Link to={`/profile/${post?.user?.id}`}>
                            <h4 className="text-lg font-semibold">
                                {post?.user?.name}
                            </h4>
                        </Link>
                        <time>
                            {new Date(post?.created_at).toLocaleString()}
                        </time>
                    </div>
                </div>

                <div>
                    <img
                        src={
                            file
                                ? URL.createObjectURL(file)
                                : `${import.meta.env.VITE_API_URL}/storage/${
                                      post?.image
                                  }`
                        }
                        width={"100%"}
                        alt=""
                    />
                    {post?.user?.id === user?.id && user && (
                        <div className="flex justify-between items-center">
                            <form
                                onSubmit={handleImageUpdate}
                                className="mt-4 flex items-center space-x-4"
                            >
                                <label
                                    htmlFor="imageInput"
                                    className="cursor-pointer bg-third px-4 py-2 rounded-md text-white"
                                >
                                    Select New Image
                                </label>
                                <input
                                    type="file"
                                    id="imageInput"
                                    className="hidden"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <button
                                    disabled={!file}
                                    type="submit"
                                    className={`px-4 py-2 rounded-md bg-black text-white ${
                                        !file && "cursor-not-allowed"
                                    }`}
                                >
                                    Upload
                                </button>
                            </form>
                            <div className="flex gap-2">
                                <button >
                                    <UpdatePost post={post} poles={poles}/>  
                                </button>
                                <button onClick={deletePostHandler}>
                                    <MdDelete className="text-3xl text-red-600" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <p className="tracking-wide leading-loose">
                    {post?.content} 
                </p>
                {user && currentRole ==='user'  && (
                    <div className="flex gap-1 items-center">
                        <button
                            onClick={() => dispatch(toggleLikePost(post?.id))}
                            className={` px-3 py-1 flex gap-2 items-center`}
                        >
                            <FaHeart
                                className={`text-4xl ${
                                    post?.likers?.some(
                                        (item) => item.id === user?.id
                                    )
                                        ? "text-red-600"
                                        : "text-white"
                                }`}
                            />
                            <span>{post?.likers?.length}</span>
                        </button>
                        <span>likes</span>
                    </div>
                )}
                <div className="">
                    {user && currentRole ==='user'  ? (
                        <AddComent postId={post?.id} />
                    ) : (
                        <p>to comment you should login first</p>
                    )}
                    <CommentsList comments={post?.comments} />
                </div>
            </article>
            <div className=" col-span-2 rounded-md">
                <LatestPost postName={post?.pole?.name} posts={posts} />
            </div>
            <div>
                    

            </div>
        </div>
    );
}
