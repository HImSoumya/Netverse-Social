/* eslint-disable react/prop-types */
import { BsThreeDotsVertical } from "react-icons/bs";
import like from "../../assets/like.png";
import heart from "../../assets/heart.png";
import { Users } from "../../data/DummyData";
import { useState } from "react";

export default function Post({ post }) {
  const user = Users.find((u) => u.id === post.userId);
  const [postLike, setPostLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    setPostLike(isLiked ? postLike - 1 : postLike + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="w-full h-auto mt-4 border p-2 shadow-md rounded-md">
      <div className="top flex justify-between items-center">
        <div className="flex justify-start items-center gap-2">
          <img
            className="w-[35px] h-[35px] rounded-full object-cover"
            src={user?.profilePicture}
            alt=""
          />
          <span className="text-[14px] font-medium">{user?.username}</span>
          <span className="text-[14px] text-gray-700">{post.date}</span>
        </div>
        <div>
          <BsThreeDotsVertical className="text-lg" />
        </div>
      </div>
      <div className="bottom mt-4 flex flex-col  justify-center items-start gap-2">
        <span className="text-sm">{post?.desc}</span>
        <div>
          <img
            className="w-full max-h-[500px] object-cover"
            src={post.photo}
            alt=""
          />
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-start items-center gap-2">
            <img
              onClick={handleLike}
              className="w-[24px] h-[24px] cursor-pointer"
              src={like}
              alt=""
            />
            <img
              onClick={handleLike}
              className="w-[24px] h-[24px] cursor-pointer"
              src={heart}
              alt=""
            />
            <span className="text-[12px] font-semibold">{postLike} Likes</span>
          </div>
          <span className="text-[12px]  ">{post.comment} comments</span>
        </div>
      </div>
    </div>
  );
}
