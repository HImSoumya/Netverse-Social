import { useContext, useRef, useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { FaTag } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosHappy } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";
import defaultImg from "../../assets/DefaultProfileImg.png";
import axios from "axios";

export default function Share() {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", user._id.$oid);
    formData.append("desc", desc.current.value);
    if (file) {
      formData.append("image", file); // Append the selected image
    }

    try {
      await axios.post("http://localhost:8800/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      window.location.reload;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full h-[200px] border rounded-md shadow-md p-2 flex flex-col justify-around items-start"
      >
        <div className="top w-full flex justify-start items-center">
          <img
            className="w-[40px] h-[40px] rounded-full object-cover"
            src={user.profilePicture ? user.profilePicture : defaultImg}
            alt=""
          />
          <input
            ref={desc}
            className="w-full p-1 outline-none text-sm border-none focus:outline-none"
            type="text"
            placeholder={`What's in your mind ${user.username}?`}
          />
        </div>
        <div className="w-full h-[1px] bg-gray-500"></div>
        <div className="top w-full flex justify-between items-center gap-4">
          <div className="flex justify-between items-center gap-3">
            <label
              htmlFor="file"
              className="flex justify-start items-center gap-1 cursor-pointer"
            >
              <FaPhotoVideo className="text-lg text-red-600" />
              <span className="text-[14px] font-semibold cursor-pointer">
                Photo or Video
              </span>
              <input
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                id="file"
                accept=".png,.jpg,.jpeg"
              />
            </label>
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
          <button
            type="submit"
            className="bg-indigo-700 text-white text-[14px] px-4 py-1 rounded-md"
          >
            Share
          </button>
        </div>
      </form>
    </div>
  );
}
