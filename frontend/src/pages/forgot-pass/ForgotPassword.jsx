import { useRef } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../api/requests/passwordApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const emailval = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = emailval.current.value.trim();
    if (email === "") return toast.warning("email required");
    dispatch(forgotPassword(email));
  };

  return (
    <section>
      <div className="w-[80%] mx-auto">
        <div className="min-h-[80vh] flex justify-center items-center my-10">
          <div className="px-4 py-10 bg-white shadow rounded-3xl w-[400px]">
            <h2 className="leading-relaxed text-center font-semibold">
              Forgot Password
            </h2>
            <form onSubmit={handleLogin}>
              <div className="py-8 text-base space-y-4 sm:text-lg">
                <div className="flex flex-col">
                  <label className="leading-loose">Email</label>
                  <input
                    ref={emailval}
                    type="email"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-primary text-xl font-bold justify-center items-center w-full px-4 py-3 rounded-md"
                >
                  Submit
                </button>
                <Link
                  to="/login"
                  className="text-center block mt-4 text-primary"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
