import { useSelector } from "react-redux";
import PostItem from "./PostItem";

export default function PostList() {
  const { postsBasedOnPageNum } =useSelector(state=>state.post) 
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
      {postsBasedOnPageNum?.map((post)=><PostItem post={post} key={post.id} />)}
    </div>
  )
}
