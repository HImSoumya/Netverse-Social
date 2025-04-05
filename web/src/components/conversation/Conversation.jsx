import React, { useEffect, useState } from "react";
import boyImg from "../../assets/boy.png";
import girlImg from "../../assets/girl.png";
import axios from "axios";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/users?userId=${friendId}`);
        setUser(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    getUser();
  }, [conversation.members, currentUser._id]);

  return (
    <div className="flex justify-start items-center cursor-pointer mt-2  duration-150 px-1 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-md">
      <img
        className="w-[40px] h-[40px] rounded-full object-cover mr-2"
        src={user && user.gender === "Male" ? boyImg : girlImg}
        alt=""
      />
      <span className="conversationName">{user && user.username}</span>
    </div>
  );
}
