import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "../../components/Posts/PostItem";
import { Button } from "@/components/ui/button";
import { getPosts } from "../../api/requests/postApi";

export default function Poles() {
    const { posts } = useSelector((state) => state.post);
    const { pole } = useParams();
    const [filtredPosts, setFiltredPosts] = useState([]);
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPosts())
    },[])
    
    useEffect(() => {
        setFiltredPosts(
            posts.filter((post) => post.pole.name === pole)
        );
    }, [pole, posts]);
    return (
        <div>
            <div className="">
                {filtredPosts?.length === 0 ? (
                    <>
                        <h2 className="text-3xl font-bold text-center my-8">
                            Post of pole : {pole} not found
                        </h2>
                        <div className="text-center">
                            <Button>
                                <Link to={"/posts"}>Go to Posts page</Link>
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-3xl font-bold text-center my-8">
                            Posts of {pole}
                        </h2>
                        <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-5">
                            {filtredPosts?.map((post) => (
                                <PostItem post={post} key={post.id} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
