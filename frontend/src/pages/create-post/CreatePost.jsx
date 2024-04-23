import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createPost, getPosts } from "../../api/requests/postApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/spinner/spinner";
import { fetchPolespublic } from "../../api/requests/poleApi";
export default function CreatePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const { poles } = useSelector((state) => state.pole);

  const title = useRef();
  const description = useRef();
  const pole = useRef();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const handleForm = (e) => {
    e.preventDefault();
    let titleVal = title.current.value.trim();
    let descriptionVal = description.current.value.trim();
    let poleVal = pole.current.value;

    if (!titleVal) return toast.error("Post title is required");
    if (!descriptionVal) return toast.error("Description is required");

    let formData = new FormData();
    formData.append("title", titleVal);
    formData.append("content", descriptionVal);
    formData.append("pole_id", poleVal);
    formData.append("image", file);
    dispatch(createPost(formData));
  };

  useEffect(() => {
    if (isPostCreated) {
      navigate("/posts");
      dispatch(getPosts())
    }
  }, [isPostCreated, navigate]);

  useEffect(() => {
    if (poles?.length === 0) {
      dispatch(fetchPolespublic());
    }
  }, []);

  return (
    <section>
      <div className="flex justify-center my-8">
        <div className="mx-auto">
          <div className="px-4 py-8 bg-white shadow rounded-3xl">
            <h2 className="font-semibold text-xl my-4 text-center">
              Create a Post
            </h2>
            <form onSubmit={handleForm} className="divide-gray-200">
              <div className="text-base space-y-4  sm:text-lg">
                <div className="flex ">
                  <div className="w-full mb-5">
                    <label htmlFor="" className="text-base sm:text-lg">
                      Post Title
                    </label>
                    <div className="flex">
                      <input
                        ref={title}
                        type="text"
                        className="w-full pl-6 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Post Description</label>
                  <textarea
                    ref={description}
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    className="w-full pl-6 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary"
                  ></textarea>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Select Pole</label>
                  <select
                    ref={pole}
                    className="w-full pl-6 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary"
                  >
                    <option value="" disabled>
                      Select a pole
                    </option>
                    {poles?.map((pole) => (
                      <option key={pole.id} value={`${pole.id}`}>
                        {pole.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                    <div className="h-full w-full text-center flex flex-col items-center justify-center">
                      <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                        <img
                          className="has-mask h-36 object-center"
                          src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                          alt="upload image"
                        />
                      </div>
                      <p className="pointer-none text-gray-500 ">
                        Click here to select a file from your computer
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <div>
                  <button
                    disabled={loading}
                    type="submit"
                    className={`bg-primary text-xl font-bold justify-center items-center w-full  px-4 py-3 rounded-md ${
                      loading && "cursor-not-allowed"
                    }`}
                  >
                    {loading ? <Spinner /> : "Create"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
