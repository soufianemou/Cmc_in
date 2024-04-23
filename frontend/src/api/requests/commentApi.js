import customAxios from "../axios";
import { deleteComment, setComments, updateComment } from "../slices/postSlice";
import { setCommentsAdmin,deleteCommentAdminSL } from "../slices/commentSlice";
import { toast } from "react-toastify";

//create comment
export const createComment = (postId, comment) => {
    return async (dispatch) => {
        try {
            const { data } = await customAxios.post(
                `/user/comments/${postId}`,
                comment
            );
            dispatch(setComments(data.data.comments));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
};
//update comment
export const updateCommentApi = (id, newComment) => {
    return async (dispatch) => {
        try {
            const { data } = await customAxios.put(
                `/user/comments/${id}`,
                newComment
            );
            dispatch(updateComment({ id, newComment }));
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
};
//delete comment
export const deleteCommentAPi = (commentId) => {
    return async (dispatch) => {
        try {
            const { data } = await customAxios.delete(
                `/user/comments/${commentId}`
            );
            dispatch(deleteComment(commentId));
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
};
//get all comment admin
export const getCommentsAdmin = () => {
    return async (dispatch) => {
        try {
            const { data } = await customAxios.get(
                `/admin/comments`
            );
            dispatch(setCommentsAdmin(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
};
//delete comment admin
export const deleteCommentAdmin = (commentId) => {
    return async (dispatch) => {
        try {
            const { data } = await customAxios.delete(
                `/admin/comments/${commentId}`
            );
            dispatch(deleteCommentAdminSL(commentId));
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
};
