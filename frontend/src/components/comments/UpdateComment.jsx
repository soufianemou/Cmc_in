/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateCommentApi } from "../../api/requests/commentApi";

const UpdateComment = ({ setUpdateComment , commnetForUpdate}) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(true);
  const [body,setBody]=useState(commnetForUpdate?.body)

  const handleCloseModal = () => {
    setIsOpen(false);
    setUpdateComment(false);
  };

  const handleUpdateComment = (e) => {
    e.preventDefault();
    if (!body.trim()) return toast.error("write somting");

    dispatch(updateCommentApi( commnetForUpdate?.id ,{ body }))

    setIsOpen(false);
    setUpdateComment(false);
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-screen flex z-10 items-center justify-center ${isOpen ? "visible" : "invisible"}`}>
      <div className="fixed inset-0 bg-black opacity-10" onClick={handleCloseModal}></div>
      <div className="bg-white p-6 rounded-md z-10 w-96">
        <div className="flex justify-end">
          <button onClick={handleCloseModal} className="text-gray-500">
            <FaTimes className="text-xl" />
          </button>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Update Comment</h2>
        <form onSubmit={handleUpdateComment} className="divide-gray-200">
          <div className="py-8 text-base space-y-4 sm:text-lg">
            <div className="flex flex-col">
              <label className="leading-loose">Comment text</label>
              <input
                onChange={(e)=>setBody(e.target.value)}
                defaultValue={body}
                type="text"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              />
            </div>   
          </div>
          <div>
            <button type="submit" className="bg-primary text-xl font-bold justify-center items-center w-full px-4 py-3 rounded-md">
              Update Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateComment;
