import { useDispatch, useSelector } from "react-redux";
import PostList from "../../components/Posts/PostList";
import { useEffect, useState } from "react";
import {
  getPostsBasedOnPageNum,
  getPostsCount,
} from "../../api/requests/postApi";
import Pagination from "../../components/pagination/Pagination";
import Loader from "../../components/loader/Loader";

const Post_Per_Page = 3;
export default function PostPage() {
  const dispatch = useDispatch();
  const { postsCount, loading } = useSelector((state) => state.post);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(postsCount / Post_Per_Page);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPostsBasedOnPageNum(currentPage));
  }, [currentPage]);

  useEffect(() => {
    if (postsCount === null) {
      dispatch(getPostsCount());
    }
  }, []);

  if (loading) {
    return <Loader />;
}

  return (
    <div>
      <h2 className="text-3xl font-bold text-center my-8">Latest Posts:</h2>
      <section className="my-4">{<PostList />}</section>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
