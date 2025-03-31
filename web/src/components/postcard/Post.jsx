import { BsThreeDotsVertical } from "react-icons/bs";
import like from "../../assets/like.png";
import heart from "../../assets/heart.png";
import boyImg from "../../assets/boy.png";
import girlImg from "../../assets/girl.png";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { format } from "timeago.js";

import axios from "axios";

export default function Post({ post }) {
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const [postLike, setPostLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [showPostOption, setShowPostOption] = useState(false);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/users?userId=${post.userId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [post.userId]);

  const handleLikes = async () => {
    try {
      await axios.put(`/api/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (error) {
      console.log(error);
    }
    setPostLike(isLiked ? postLike - 1 : postLike + 1);
    setIsLiked(!isLiked);
  };

  const handleDelete = async (postId) => {
    try {
      const res = await axios.delete(
        `/api/posts/${postId}?userId=${currentUser._id}`
      );
      alert(res.data.message);
      setShowPostOption(!showPostOption);
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full h-auto mt-4 border p-2 shadow-md rounded-md">
      <div className="top flex justify-between items-center">
        <div className="flex justify-start items-center gap-2">
          <Link to={`/profile/${user.username}`}>
            <img
              className="w-[35px] h-[35px] rounded-full object-cover"
              src={user.gender === "Male" ? boyImg : girlImg}
              alt="userImg"
            />
          </Link>
          <span className="text-[14px] font-medium">{user?.username}</span>
          <span className="text-[14px] text-gray-700">
            {format(post.createdAt)}
          </span>
        </div>
        <div className="relative inline-block">
          <BsThreeDotsVertical
            onClick={() => setShowPostOption(!showPostOption)}
            className="text-xl cursor-pointer hover:text-gray-600 transition-colors duration-200"
          />
          {showPostOption && (
            <div className="absolute top-0 right-5 w-[120px] bg-white shadow-lg rounded-lg border border-gray-300 py-2 z-10">
              <ul className="text-sm text-gray-700">
                {currentUser._id === post.userId ? (
                  <li
                    className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer transition-all duration-150"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </li>
                ) : (
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all duration-150"
                    onClick={() => console.log("Report clicked")}
                  >
                    Report
                  </li>
                )}
              </ul>
            </div>
          )}
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
          {/* <span className="text-[12px]  ">5 comments</span> */}
        </div>
      </div>
    </div>
  );
}
