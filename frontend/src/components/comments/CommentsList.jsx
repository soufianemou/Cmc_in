/* eslint-disable react/prop-types */
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import swal from "sweetalert";
import { useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentAPi } from "../../api/requests/commentApi";
import UpdateComment from "./UpdateComment";
import { Link } from "react-router-dom";

const CommentsList = ({ comments }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [updateComment, setUpdateComment] = useState(false);
    const [commnetForUpdate, setCommnetForUpdate] = useState(null);

    const handleUpdateComment = (comment) => {
        setCommnetForUpdate(comment);
        setUpdateComment(true);
    };

    const handleDeleteComment = (commentId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Comment!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deleteCommentAPi(commentId));
            } else {
                swal("Your Comment file is alive!");
            }
        });
    };
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">
                All Comments ({comments?.length})
            </h2>
            {comments?.map((comment, index) => (
                <div
                    key={index}
                    className="border border-gray-300 bg-white p-4 mb-4 rounded-lg"
                >
                    <div className="flex justify-between items-center">
                        <div className="text-start">
                            <div className="flex items-center gap-4">
                                <Link to={`/profile/${comment?.user?.id}`}>
                                    <h4 className="text-lg font-semibold">
                                        {comment?.user?.name}{" "}
                                        {comment?.user?.lname}
                                    </h4>
                                </Link>
                                <p className="text-sm text-gray-500">
                                    {moment(comment?.created_at).fromNow()}
                                </p>
                            </div>
                            <p className="mt-2">{comment?.body}</p>
                        </div>
                        {comment?.user.id === user?.id && (
                            <div className="flex gap-2">
                                <button className="text-green-600">
                                    <FaRegEdit
                                        onClick={() =>
                                            handleUpdateComment(comment)
                                        }
                                        className="text-2xl"
                                    />
                                </button>
                                <button
                                    onClick={() =>
                                        handleDeleteComment(comment?.id)
                                    }
                                    className="text-red-600"
                                >
                                    <MdDelete className="text-2xl" />
                                </button>
                            </div>
                        )}
                    </div>
                    {updateComment && (
                        <UpdateComment
                            commnetForUpdate={commnetForUpdate}
                            setUpdateComment={setUpdateComment}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default CommentsList;
