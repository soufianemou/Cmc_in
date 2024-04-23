import customAxios from "../axios";
import { toast } from "react-toastify";
import {
    setPosts,
    setPostsBasedOnPageNum,
    addpost,
    setPostsCount,
    setPost,
    updatePosts,
    setLike,
    deletePost,
    setImagePost,
    setLoading,
    setIsPostCreated,
    clearIsPostCreated,
    clearLoading,
    setIsPostFetched,
    clearIsPostFetched,
    setIsPostsFetched,
    clearIsPostsFetched,
} from "../slices/postSlice";


//create post
export const createPost = (newPost) => {
    return async (dispatch) => {
        dispatch(setLoading())
        try {
            const { data } = await customAxios.post("/user/posts", newPost);
            toast.success(data.message);
            dispatch(addpost(data.post));
            dispatch(setIsPostCreated())
            setTimeout(()=>dispatch(clearIsPostCreated()),2000)
        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(clearLoading())
        }
    };
};
//get all posts
export const getPosts = () => {
    return async (dispatch) => {
        dispatch(setLoading())
        try {
            const { data } = await customAxios.get("/posts");
            dispatch(setPosts(data.data));
            dispatch(setIsPostsFetched())
            setTimeout(()=>dispatch(clearIsPostsFetched()),2000)
        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(clearLoading())
        }
    };
};
//get posts count
export const getPostsCount = () => {
    return async (dispatch) => {
        dispatch(setLoading())
        try {
            const { data } = await customAxios.get("/posts/postCount");
            dispatch(setPostsCount(data.count));
            dispatch(setIsPostsFetched())
            setTimeout(()=>dispatch(clearIsPostsFetched()),2000)
        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(clearLoading())
        }
    };
};
//get posts based on page number
export function getPostsBasedOnPageNum(pageNumber) {
    return async (dispatch) => {
        dispatch(setLoading())
        try {
            const { data } = await customAxios.get(
                `/posts?pageNumber=${pageNumber}`
            );
            dispatch(setPostsBasedOnPageNum(data.data));
            dispatch(setIsPostsFetched())
            setTimeout(()=>dispatch(clearIsPostsFetched()),2000)
        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(clearLoading())
        }
    };
}
//get sinlge post
export function getSinglePost(id) {
    return async (dispatch) => {
        dispatch(setLoading())
        try {
            const { data } = await customAxios.get(`/posts/${id}`);
            dispatch(setPost(data.data));
            dispatch(setIsPostFetched())
            setTimeout(()=>dispatch(clearIsPostFetched()),2000)
        } catch (error) {
            dispatch(clearLoading())
            window.location.href = "/*";
        }
    };
}
//update post
export function updatePost(id, newPost) {
    return async (dispatch) => {
        try {
            const { data } = await customAxios.put(`user/posts/${id}`, newPost);
            dispatch(setPost(data.post));
            dispatch(updatePosts({ id, post: data.post }));
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}
//update post image
export function updateImagePost(id, formData) {
    return async (dispatch) => {
        try {
            const { data } = await customAxios.post(
                `/user/posts/image/${id}`,
                formData
            );
            dispatch(setImagePost(data.post.image));
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}
//togle like
export const toggleLikePost = (PostId) => {
    return async (dispatch) => {
        try {
            const { data } = await customAxios.put(
                `/user/posts/toggleLike/${PostId}`,
                {}
            );
            dispatch(setLike(data.data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
};
//delete post
export function deletePostApi(id) {
    return async (dispatch) => {
        try {
            const { data } = await customAxios.delete(`user/posts/${id}`);
            dispatch(deletePost(id));
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}
//delete post from admin
export function deletePostAdmin(id) {
    return async (dispatch) => {
        try {
            const { data } = await customAxios.delete(`admin/posts/${id}`);
            dispatch(deletePost(id));
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}
