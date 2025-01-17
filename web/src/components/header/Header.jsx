import { IoIosNotifications } from "react-icons/io";
import { IoChatboxEllipses } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { HiUserCircle } from "react-icons/hi2";

import img1 from "../../assets/persons/my.jpg";

export default function Header() {
  return (
    <div className="w-full bg-indigo-700 h-[60px] flex items-center justify-center gap-2 px-6">
      <div className="box1 w-full">
        <h1 className="text-xl text-white font-normal">NetVerse</h1>
      </div>
      <div className="box2 w-full">
        <div className="searchbar w-full h-[30px] bg-white rounded-md flex justify-items-start items-center px-2 gap-1">
          <IoSearchOutline />
          <input
            className="w-full text-[12px] px-1 outline-none"
            placeholder="Search for friend, post or videos"
          />
        </div>
      </div>
      <div className="box3 w-full flex justify-between items-center">
        <div className="flex items-center justify-center gap-2">
          <span className="text-[13px] font-semibold text-white">Homepage</span>
          <span className="text-[13px] font-semibold text-white">Timeline</span>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="relative">
            <HiUserCircle className="text-white text-2xl" />
            <div className="h-[15px] w-[15px] bg-red-500 text-white text-[12px] rounded-full flex justify-center items-center absolute top-[-5px] right-[-5px]">
              2
            </div>
          </div>
          <div className=" relative">
            <IoChatboxEllipses className="text-white text-2xl" />
            <div className="h-[15px] w-[15px] bg-red-500 text-white text-[12px] rounded-full flex justify-center items-center absolute top-[-5px] right-[-5px]">
              8
            </div>
          </div>
          <div className="relative">
            <IoIosNotifications className="text-white text-2xl" />
            <div className="h-[15px] w-[15px] bg-red-500 text-white text-[12px] rounded-full flex justify-center items-center absolute top-[-5px] right-[-5px]">
              5
            </div>
          </div>
        </div>
        <div>
          <img
            src={img1}
            className="w-[32px] h-[32px] rounded-full object-cover"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
