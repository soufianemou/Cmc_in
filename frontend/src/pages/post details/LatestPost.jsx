/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
export default function LatestPost({postName,posts}) {
  return (
    <div className="xl:sticky top-32 shadow-sm rounded-md">
        <h4 className="my-4 text-center font-semibold">
            Latest Articles in {postName}
        </h4>
        <div className="flex flex-col items-center">
            {posts
                .filter(
                    (item) =>
                        item?.category?.name ===
                        postName
                )
                .map((filteredPost) => (
                    <div
                        key={filteredPost.id}
                        className="mb-4 flex flex-col w-full ml-4"
                    >
                        <Link
                            to={`/posts/details/${filteredPost?.id}`}
                        >
                            <div className="flex items-center mb-2">
                                <img
                                    src={`${
                                        import.meta.env.VITE_API_URL
                                    }/storage/${
                                        filteredPost?.image
                                    }`}
                                    alt=""
                                    className="h-16 w-16 object-cover rounded-md"
                                />
                                <div className="ml-3">
                                    <h3 className="font-bold">
                                        {(filteredPost?.title?.slice(0,25) + ' ...')}
                                    </h3>
                                    <p className="">
                                        {new Date(
                                            filteredPost?.created_at
                                        ).toLocaleDateString(
                                            undefined,
                                            {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }
                                        )}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
        </div>
    </div>
  )
}
