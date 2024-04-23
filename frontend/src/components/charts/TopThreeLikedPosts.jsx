import { useEffect, useState } from "react";
import customAxios from "../../api/axios";

export default function TopThreeLikedPosts() {
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    customAxios
      .get("/admin/topThreeLikedPosts")
      .then((res) => setFetchedData(res.data));
  }, []);

  return (
    <div className="space-y-4">
      {fetchedData?.map((elem, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <img
              src={`${import.meta.env.VITE_API_URL}/storage/${elem?.image}`}
              alt="Post Image"
              className="h-12 w-12 rounded-md object-cover"
            />
          </div>
          <div className="flex-grow">
            <p className="text-sm font-medium text-gray-800">{elem?.title}</p>
            <p className="text-xs text-gray-500">{elem?.likes_count} Likes</p>
          </div>
        </div>
      ))}
    </div>
  );
}
