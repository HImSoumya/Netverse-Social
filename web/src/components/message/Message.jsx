import defaultImg from "../../assets/DefaultProfileImg.png";
import { format } from "timeago.js";
export default function Message({ message, own }) {
  return (
    <div className={`flex flex-col mt-5 ${own ? "items-end" : ""}`}>
      <div className={`flex gap-1 ${own ? "flex-row-reverse" : ""}`}>
        <img
          src={defaultImg}
          alt="img"
          className="w-[40px] h-[40px] object-cover rounded-full  cursor-pointer"
        />
        <div
          className={`${
            own
              ? "bg-gray-100 text-black rounded-l-2xl rounded-b-2xl"
              : "bg-indigo-600 text-white rounded-b-2xl rounded-r-2xl"
          }   text-sm px-2 py-4  max-w-[350px] mt-5`}
        >
          {message.text}
        </div>
      </div>
      <span className="text-[12px] font-semibold">
        {format(message.createdAt)}
      </span>
    </div>
  );
}
