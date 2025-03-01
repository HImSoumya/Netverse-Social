import { useState, useRef, useContext } from "react";
import { FaBattleNet } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { handleLogin } from "../../apiCall";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/Loader/Loader";

export default function Login() {
  const email = useRef();
  const password = useRef();

  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleLogin(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  console.log(user);
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-sm w-full bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-center mb-4">
            <FaBattleNet className="text-4xl text-indigo-700" />
          </div>
          <div className="mb-4">
            <span className="text-sm text-gray-700">Start your journey.</span>
            <h1 className="text-xl mt-1 font-medium">
              Login to <span className="text-indigo-700">Netverse</span>
            </h1>
          </div>
          <form onSubmit={handleClick} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                ref={email}
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                ref={password}
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                minLength="6"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  onClick={handleShowPassword}
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {showPassword ? "Hide" : "Show"} Password
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
              {isFetching ? <Loader /> : "Login"}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            {`Don't have an account?`}
            <Link
              to="/auth/register"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
