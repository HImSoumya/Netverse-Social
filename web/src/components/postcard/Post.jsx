import img1 from "../../assets/persons/my.jpg";
import img2 from "../../assets/posts/p2.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import like from "../../assets/like.png";
import heart from "../../assets/heart.png";

export default function Post() {
  return (
    <div className="w-full h-auto mt-4 border p-2 shadow-md rounded-md">
      <div className="top flex justify-between items-center">
        <div className="flex justify-start items-center gap-2">
          <img
            className="w-[35px] h-[35px] rounded-full object-cover"
            src={img1}
            alt=""
          />
          <span className="text-[14px] font-medium">Soumya Ranjan</span>
          <span className="text-[14px] text-gray-700">5 mins ago</span>
        </div>
        <div>
          <BsThreeDotsVertical className="text-lg" />
        </div>
      </div>
      <div className="bottom mt-4 flex flex-col  justify-center items-start gap-2">
        <span className="text-sm">Hello everyone, welcome to Netverse...</span>
        <div>
          <img
            className="w-full max-h-[500px] object-cover"
            src={img2}
            alt=""
          />
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-start items-center gap-2">
            <img className="w-[24px] h-[24px] cursor-pointer" src={like} alt="" />
            <img className="w-[24px] h-[24px] cursor-pointer" src={heart} alt="" />
            <span className="text-[12px] font-semibold">32 Likes</span>
          </div>
          <span className="text-[12px]  ">10 comments</span>
        </div>
      </div>
    </div>
  );
}
