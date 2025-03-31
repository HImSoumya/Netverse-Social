import { FaPhotoVideo } from "react-icons/fa";
import { FaTag } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosHappy } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import boyImg from "../../assets/boy.png";
import girlImg from "../../assets/girl.png";
import { useContext, useRef, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Handle file selection and create preview URL
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // Create preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("desc", desc.current.value);
    if (file) {
      formData.append("image", file);
    }

    try {
      await axios.post("/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full h-auto border rounded-md shadow-md p-2 flex flex-col justify-around items-start"
      >
        {/* Top Section */}
        <div className="top w-full flex justify-start items-center py-6">
          <img
            className="w-[40px] h-[40px] rounded-full object-cover"
            src={user.gender === "Male" ? boyImg : girlImg}
            alt=""
          />
          <input
            ref={desc}
            className="w-full p-1 text-sm border-none outline-none focus:outline-none focus:ring-0"
            type="text"
            placeholder={`What's in your mind ${user.username}?`}
          />
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-500 my-2"></div>

        {/* Image Preview Section */}
        {previewUrl && (
          <div className="relative w-full flex justify-center items-center mb-2">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover rounded-md shadow-md"
            />
            <button
              type="button"
              onClick={() => {
                setFile(null);
                setPreviewUrl(null);
              }}
              className="absolute top-0 right-0 bg-indigo-600 text-white p-1 rounded-full"
            >
              <IoClose className="text-xl" />
            </button>
          </div>
        )}

        {/* Bottom Section */}
        <div className="top w-full flex justify-between items-center gap-4 py-6">
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
                onChange={handleFileChange}
                className="hidden"
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
