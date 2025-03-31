import { IoIosNotifications } from "react-icons/io";
import { IoChatboxEllipses, IoSearchOutline } from "react-icons/io5";
import { HiUserCircle } from "react-icons/hi2";
import boyImg from "../../assets/boy.png";
import girlImg from "../../assets/girl.png";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

export default function Header() {
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setFoundUser(null);
        setError(null);
        return;
      }

      try {
        const res = await axios.get(`/api/users?username=${searchQuery}`);
        if (res.data) {
          setFoundUser(res.data);
          setError(null);
        } else {
          setFoundUser(null);
          setError("User not found.");
        }
      } catch (error) {
        setFoundUser(null);
        setError("Something went wrong. Please try again.");
        console.error(error);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <div className="w-full bg-indigo-700 h-[60px] flex items-center justify-center gap-2 px-6 sticky top-0 z-10">
      <div className="box1 w-full">
        <Link to="/" className="text-xl text-white font-normal">
          Netverse
        </Link>
      </div>
      <div className="box2 w-full relative">
        <div className="searchbar w-full h-[30px] bg-white rounded-md flex items-center px-2 gap-1">
          <IoSearchOutline />
          <input
            name="searchQuery"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-[12px] px-1 outline-none"
            placeholder="Search for friend"
          />
        </div>
        {/* Display found user */}
        {foundUser && (
          <div className="absolute top-10 left-0 w-full bg-white shadow-md rounded-md p-2">
            <Link
              onClick={() => {
                setSearchQuery("");
                setFoundUser(null);
              }}
              to={`/profile/${foundUser.username}`}
              className="flex items-center gap-2"
            >
              <img
                src={foundUser.gender === "Male" ? boyImg : girlImg}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-sm font-medium">{foundUser.username}</span>
            </Link>
          </div>
        )}
        {error && (
          <div className="absolute top-10 left-0 w-full bg-red-500 text-white text-center p-2 rounded-md text-sm">
            {error}
          </div>
        )}
      </div>
      <div className="box3 w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-[13px] font-semibold text-white">
            Homepage
          </Link>
          <span className="text-[13px] font-semibold text-white">Timeline</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <HiUserCircle className="text-white text-2xl" />
            <div className="h-[15px] w-[15px] bg-red-500 text-white text-[12px] rounded-full flex justify-center items-center absolute top-[-5px] right-[-5px]">
              2
            </div>
          </div>
          <Link to="/chats" className="relative">
            <IoChatboxEllipses className="text-white text-2xl" />
            <div className="h-[15px] w-[15px] bg-red-500 text-white text-[12px] rounded-full flex justify-center items-center absolute top-[-5px] right-[-5px]">
              8
            </div>
          </Link>
          <div className="relative">
            <IoIosNotifications className="text-white text-2xl" />
            <div className="h-[15px] w-[15px] bg-red-500 text-white text-[12px] rounded-full flex justify-center items-center absolute top-[-5px] right-[-5px]">
              5
            </div>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={user.gender === "Male" ? boyImg : girlImg}
            className="w-[32px] h-[32px] rounded-full object-cover cursor-pointer"
            alt="Profile"
          />
        </Link>
      </div>
    </div>
  );
}
