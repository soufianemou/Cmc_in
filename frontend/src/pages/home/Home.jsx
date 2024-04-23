import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Input from "../../components/elements/Input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../api/requests/postApi";
import PostItem from "../../components/Posts/PostItem";
import Feature from "../../components/feature/Feature";
import Loader from "../../components/loader/Loader";
import { fetchPolespublic } from "../../api/requests/poleApi";
export default function Home() {
    const dispatch = useDispatch();
    const { poles } = useSelector((state) => state.pole);
    const { posts ,loading} = useSelector((state) => state.post);
    const [currentPole, setCurrentPole] = useState("Digital");
    const [filtredPosts, setFiltredPosts] = useState([]);

    useEffect(() => {
        if (poles?.length === 0) {
            dispatch(fetchPolespublic());
        }
        if (posts?.length === 0) {
            dispatch(getPosts());
        }
    }, []);

    useEffect(() => {
        setFiltredPosts(
            posts?.filter((post) => post?.pole?.name === currentPole)
        );
    }, [currentPole, posts]);

    if (loading) {
        return <Loader />;
    }

    return (
        <section>
            <div className="flex items-center gap-2 py-10 lg:py-0">
                <div className="text-center lg:text-start">
                    <div className=" lg:w-[80%]">
                        <h2 className="text-4xl font-semibold mb-10">
                            Read the most interesting articles
                        </h2>
                        <p className="">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua
                        </p>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <img src="/Blog_post.png" alt="" />
                </div>
            </div>
            <div className="relative ">
                <div className="h-[150px] bg-third my-6 rounded-3xl flex items-center justify-center">
                    <h2 className="text-white text-3xl font-bold">
                        Welcome To Cmc In
                    </h2>
                </div>
                <div className="absolute -bottom-[30px] left-1/2 transform -translate-x-1/2 z-10">
                    <Input  />
                </div>
            </div>
            <div className="py-10 flex justify-center">
                <ul className="flex flex-wrap gap-5 justify-center">
                    {poles?.map((pole) => (
                        <li
                            key={pole?.id}
                            onClick={() => setCurrentPole(`${pole?.name}`)}
                            className={`${
                                currentPole === `${pole?.name}` && "bg-primary"
                            } rounded-full py-1 px-2 cursor-pointer  border-2 border-transparent hover:border-primary`}
                        >
                            {pole?.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-5">
                    {filtredPosts?.map((post) => (
                        <PostItem post={post} key={post.id} />
                    ))}
                </div>
                <div className="">
                    {filtredPosts?.length === 0 && (
                        <h2 className="text-3xl font-bold text-center my-8">
                            Post of Pole : {currentPole}  not found
                        </h2>
                    )}
                </div>
            </div>
            <div className="text-center">
                <Button>
                    <Link to={"/posts"}>See All Posts</Link>
                </Button>
            </div>
            <Feature />
        </section>
    );
}
