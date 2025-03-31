import { useState, useRef } from "react";
import { FaBattleNet } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader/Loader";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const gender = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
      gender: gender.current.value,
    };
    try {
      setIsLoading(true);
      await axios.post("/api/auth/register", formData);
      navigate("/auth/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg px-8 py-1">
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
        <form onSubmit={handleRegister} className="space-y-4">
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
          <div className="flex justify-between items-center gap-2">
            <div className="w-[70%]">
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
            <div className="w-[30%]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                ref={gender}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
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
          {/* Gender Selection */}

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
            {isLoading ? <Loader /> : "Sign up"}
          </button>
          <p className="text-[14px] text-center text-red-500">
            {error ? error || "Something went wrong" : null}
          </p>
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
  );
}
