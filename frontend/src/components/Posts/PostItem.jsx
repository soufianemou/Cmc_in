/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function PostItem({ post }) {
    const truncateContent = (content, maxWords) => {
        const words = content.split(" ");
        const truncatedContent = words.slice(0, maxWords).join(" ");
        return truncatedContent;
    };
    return (
        <div className="py-4 mx-auto">
            <div className="bg-white w-[300px] md:w-[350px] shadow-2xl rounded-xl mb-4 relative">
                <div className="md:flex-shrink-0 p-2">
                    <img
                        src={`${import.meta.env.VITE_API_URL}/storage/${
                            post?.image
                        }`}
                        alt="image of post"
                        className="w-full max-h-[200px] rounded-md"
                    />
                </div>
                <div className="my-2 px-4 absolute top-2 -right-1">
                    <Link
                        className="bg-cyan-300 text-primary font-medium py-1 rounded-full px-2"
                        to={`/posts/poles/${post?.pole?.name}`}
                    >
                        {post?.pole?.name}
                    </Link>
                </div>
                <div className="px-4 py-2">
                    <h2 className="font-bold text-2xl tracking-normal mb-2">
                        {post?.title}
                    </h2>
                    <p className="text-sm">
                        {truncateContent(post?.content, 7)}{" "}
                        <Link
                            to={`/posts/details/${post?.id}`}
                            className="text-primary text-xs font-bold py-1 rounded-full px-1"
                        >
                            Read More...
                        </Link>
                    </p>
                    <div className="my-3 grid grid-cols-5 items-center">
                        <div className="user-logo col-span-1">
                            <img
                                className="w-10 h-10 object-cover rounded-full"
                                src={`${import.meta.env.VITE_API_URL}/storage/${
                                    post?.user?.image
                                }`}
                                alt="profile image"
                            />
                        </div>
                        <div className="text-sm col-span-2">
                            <Link to={`/profile/${post?.user?.id}`}>
                                <h4> {post?.user?.name}</h4>
                                <h4> {post?.user?.lname}</h4>
                            </Link>
                        </div>
                        <h4 className="col-span-2 text-sm text-end">
                            {new Date(post?.created_at).toDateString()}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
