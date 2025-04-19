import { useEffect, useState } from "react";
import defaultImg from "../../assets/DefaultProfileImg.png";
import axios from "axios";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(`/api/users/friends/${currentId}`);
        setFriends(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      // Check if conversation already exists
      const res = await axios.get(`/api/conversations/find/${currentId}/${user._id}`);

      if (res.data) {
        // If conversation found, open it
        setCurrentChat(res.data);
      } else {
        // If no conversation exists, create one
        const newConvRes = await axios.post("/api/conversations", {
          senderId: currentId,
          receiverId: user._id,
        });
        setCurrentChat(newConvRes.data);
      }
    } catch (err) {
      console.log("Error finding or creating conversation:", err);
    }
  };

  return (
    <>
      {onlineFriends.map((user) => (
        <div
          key={user._id}
          className="flex justify-start items-center cursor-pointer mt-5 duration-150 px-1 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-md"
          onClick={() => handleClick(user)}
        >
          <div className="relative">
            <img
              className="w-[40px] h-[40px] rounded-full object-cover mr-2"
              src={user.profilePicture || defaultImg}
              alt={user.username}
            />
            <div className="absolute top-0 right-[8px] w-[15px] h-[15px] rounded-full bg-green-500 border-2 border-white" />
          </div>
          <span className="conversationName">{user.username}</span>
        </div>
      ))}
    </>
  );
}
