/* eslint-disable react/prop-types */
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../api/requests/postApi";
import { FaRegEdit } from "react-icons/fa";
import { DialogClose } from "@radix-ui/react-dialog";
export default function UpdatePost({post, poles}) {
    const dispatch = useDispatch();
    const title = useRef();
    const content = useRef();
    const pole = useRef();

    const handleUpdatePost = (e) => {
        e.preventDefault();
        let titleVal = title.current.value.trim();
        let contentVal = content.current.value.trim();

        if (!titleVal) return alert("Post title should not be empty");
        if (!contentVal) return alert("content  should not be empty");

        const updatedPost = {
            title: titleVal,
            content: contentVal,
            pole_id: pole.current.value,
        };
        dispatch(updatePost(post?.id, updatedPost));
    };
  return (
    <div>
        <Dialog>
            <DialogTrigger>
                <FaRegEdit className="text-3xl text-green-600" /> 
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update your Post</DialogTitle>
                    <DialogDescription>
                    <form onSubmit={handleUpdatePost}>
                        <div className="py-2  space-y-4 sm:text-lg">
                            <div className="flex flex-col">
                                <label className="leading-loose">Post Title</label>
                                <input
                                    ref={title}
                                    defaultValue={post.title}
                                    type="text"
                                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="leading-loose">
                                    Post ContentVal
                                </label>
                                <textarea
                                    ref={content}
                                    defaultValue={post.content}
                                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                    rows="4"
                                ></textarea>
                            </div>

                            <div className="flex flex-col">
                                <label className="leading-loose">
                                    Select pole
                                </label>
                                <select
                                    defaultValue={post.pole.id}
                                    ref={pole}
                                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                >
                                    <option value="" disabled>
                                        Select a pole
                                    </option>
                                    {poles.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <DialogClose asChild>
                                <button
                                    type="submit"
                                    className="bg-primary text-xl font-bold justify-center items-center w-full px-4 py-3 rounded-md text-white"
                                >
                                    Update Post
                                </button>
                            </DialogClose>
                        </div>
                    </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
  )
}
