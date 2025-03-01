/* eslint-disable react/prop-types */
import { BsThreeDotsVertical } from "react-icons/bs";
import like from "../../assets/like.png";
import heart from "../../assets/heart.png";
import { useState, useEffect } from "react";
import axios from "axios";
import defaultImg from "../../assets/DefaultProfileImg.png";
import postImg from "../../assets/posts/p1.jpg";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const [user, setUser] = useState({});

  const [postLike, setPostLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    setPostLike(isLiked ? postLike - 1 : postLike + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/users?userId=${post.userId}`
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [post.userId]);

  return (
    <div className="w-full h-auto mt-4 border p-2 shadow-md rounded-md">
      <div className="top flex justify-between items-center">
        <div className="flex justify-start items-center gap-2">
          <Link to={`/profile/${user.username}`}>
            <img
              className="w-[35px] h-[35px] rounded-full object-cover"
              src={user?.profilePicture ? user.profilePicture : defaultImg}
              alt=""
            />
          </Link>
          <span className="text-[14px] font-medium">{user?.username}</span>
          <span className="text-[14px] text-gray-700">
            {format(post.createdAt)}
          </span>
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
            src={post.photo ? post.photo : postImg}
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
            <span className="text-[12px] font-semibold">
              {postLike} People like it
            </span>
          </div>
          <span className="text-[12px]  ">{post.comment} comments</span>
        </div>
      </div>
    </div>
  );
}
