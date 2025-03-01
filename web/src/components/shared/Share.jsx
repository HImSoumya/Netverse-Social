import img1 from "../../assets/persons/my.jpg";
import { FaPhotoVideo } from "react-icons/fa";
import { FaTag } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosHappy } from "react-icons/io";

export default function Share() {
  return (
    <div>
      <div className="w-full h-[200px] border rounded-md shadow-md p-2 flex flex-col justify-around items-start">
        <div className="top w-full flex justify-start items-center">
          <img
            className="w-[40px] h-[40px] rounded-full object-cover"
            src={img1}
            alt=""
          />
          <input
            className="w-full p-1 outline-none text-sm border-none focus:outline-none"
            type="text"
            placeholder="What's in your mind?"
          />
        </div>
        <div className="w-full h-[1px] bg-gray-500"></div>
        <div className="top w-full flex justify-between items-center gap-4">
          <div className="flex justify-between items-center gap-3">
            <div className="flex justify-start items-center gap-1">
              <FaPhotoVideo className="text-lg text-red-600" />
              <span className="text-[14px] font-semibold">Photo or Video</span>
            </div>
            <div className="flex justify-start items-center gap-1">
              <FaTag className="text-lg text-blue-700" />
              <span className="text-[14px] font-semibold">Tag</span>
            </div>
            <div className="flex justify-start items-center gap-1">
              <FaLocationDot className="text-lg text-green-700" />
              <span className="text-[14px] font-semibold">Location</span>
            </div>
            <div className="flex justify-start items-center gap-1">
              <IoIosHappy className="text-lg text-yellow-500" />
              <span className="text-[14px] font-semibold">Feelings</span>
            </div>
          </div>
          <button className="bg-indigo-700 text-white text-[14px] px-4 py-1 rounded-md">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
