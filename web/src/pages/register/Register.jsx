import { useState, useRef } from "react";
import { FaBattleNet } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const username = useRef();
  const email = useRef();
  const password = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/register",
        user
      );
      console.log(res.data);
      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 ">
        <div className="max-w-sm w-full bg-white rounded-xl shadow-lg px-8 py-1">
          <div className="flex justify-center mb-4 p-2">
            <FaBattleNet className="text-4xl text-indigo-700" />
          </div>
          <div className="mb-4">
            <span className="text-sm text-gray-700">Start your journey.</span>
            <h1 className="text-xl mt-1 font-medium">
              Create your <span className="text-indigo-700">Netverse</span>{" "}
              account
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                ref={username}
                required
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="username..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                ref={email}
                required
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                ref={password}
                required
                minLength={6}
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
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
              Sign up
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600 mb-1">
            {`Have an account?`}
            <Link
              to="/auth/login"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
