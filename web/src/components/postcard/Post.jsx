/* eslint-disable react/prop-types */
import { BsThreeDotsVertical } from "react-icons/bs";
import like from "../../assets/like.png";
import heart from "../../assets/heart.png";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import defaultImg from "../../assets/DefaultProfileImg.png"; 
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const [postLike, setPostLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

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

  const handleLikes = async () => {
    try {
      await axios.put(`http://localhost:8800/api/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (error) {
      console.log(error);
    }
    setPostLike(isLiked ? postLike - 1 : postLike + 1);
    setIsLiked(!isLiked);
  };

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
            src={post.img ? post.img : null}
            alt=""
          />
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-start items-center gap-2">
            <img
              onClick={handleLikes}
              className="w-[24px] h-[24px] cursor-pointer"
              src={like}
              alt=""
            />
            <img
              onClick={handleLikes}
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
