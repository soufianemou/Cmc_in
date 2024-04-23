import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../api/requests/passwordApi";
import { toast } from "react-toastify";
export default function ResetPassword() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { token } = useParams();
  let email = searchParams.get("email");

  const passwordVal = useRef();
  const password_confirmationVal = useRef();
  const handleLogin = (e) => {
    e.preventDefault();
    const password = passwordVal.current.value.trim();
    const password_confirmation = password_confirmationVal.current.value.trim();
    if (password == "") return toast.error("password required");
    if (password_confirmation == "") return toast.error("password required");
    if (password !== password_confirmation)
      return toast.error("password not match");
    let newPass = { token, email, password, password_confirmation };
    dispatch(resetPassword(newPass));
  };

  return (
    <section>
      <div className="w-[80%] mx-auto">
        <div className="min-h-[80vh] flex justify-center items-center my-10">
          <div className="px-4 py-10 bg-white shadow rounded-3xl w-[400px]">
            <div className="block pl-2 font-semibold text-xl text-center">
              <h2 className="leading-relaxed">Reset Password </h2>
            </div>
            <form onSubmit={handleLogin}>
              <div className="py-8 text-base space-y-4 sm:text-lg">
                <div className="flex flex-col">
                  <label className="leading-loose">New Password</label>
                  <input
                    ref={passwordVal}
                    type="password"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Repet Password</label>
                  <input
                    ref={password_confirmationVal}
                    type="password"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-primary text-xl font-bold justify-center items-center w-full px-4 py-3 rounded-md"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
