import React from "react";
import defaultImg from "../../assets/DefaultProfileImg.png";

export default function Conversation() {
  return (
    <div className="flex justify-start items-center cursor-pointer mt-5  duration-150 px-1 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-md">
      <img
        className="w-[40px] h-[40px] rounded-full object-cover mr-2"
        src={defaultImg}
        alt=""
      />
      <span className="conversationName">Abhilash</span>
    </div>
  );
}
