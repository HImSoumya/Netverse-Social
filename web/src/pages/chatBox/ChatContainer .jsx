import { useContext, useEffect, useState, useRef } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversation/Conversation";
import Header from "../../components/header/Header";
import Message from "../../components/message/Message";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

const ChatContainer = () => {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useContext(AuthContext);

  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:8900");
    socket.current.emit("addUser", user._id);
  
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users.map((u) => u.userId));
    });
  
    socket.current.on("getMessage", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          sender: data.senderId,
          text: data.text,
          createdAt: new Date(),
        },
      ]);
    });
  }, [user._id]);
  

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/api/conversations/${user._id}`);
        setConversation(res.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/api/messages/${currentChat?._id}`);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSave = async () => {
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((m) => m !== user._id);

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      <Header />
      <div style={{ height: `calc(100vh - 60px)` }} className="flex">
        {/* Sidebar with Conversations */}
        <div className="flex-[3.5] p-[10px] h-full bg-gray-100 rounded-md shadow-md">
          <input
            type="text"
            className="w-full bg-gray-100 outline-none border-b border-slate-700 text-sm py-2 focus:border-indigo-500"
            placeholder="Search friends..."
          />
          {conversation.map((c) => (
            <div onClick={() => setCurrentChat(c)} key={c._id}>
              <Conversation conversation={c} currentUser={user} />
            </div>
          ))}
        </div>

        {/* Chat Messages Section */}

        <div className="flex-[5.5] p-[10px] h-full flex flex-col">
          {currentChat ? (
            <>
              <div className="flex-grow overflow-y-scroll py-1 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-200">
                {messages.map((m) => (
                  <div key={m._id} ref={scrollRef}>
                    <Message message={m} own={m.sender === user._id} />
                  </div>
                ))}
              </div>
              <div className="w-full h-[120px] flex flex-col">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full border border-indigo-600 rounded-md px-2 py-1 focus:ring-2 focus:ring-indigo-400 outline-none text-sm h-[100px]"
                  placeholder="Write..."
                ></textarea>
                <button
                  onClick={handleSave}
                  className="w-full px-1 py-2 bg-indigo-600 text-white text-sm mt-1 rounded-md hover:bg-indigo-800 transition"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className=" text-wrap text-2xl px-2 py-8 mt-12 text-slate-500 shadow-md rounded-md border-t">
              Greetings, Open a conversation to start chat
            </span>
          )}
        </div>

        {/* Online Friends Section */}
        <div className="flex-[3] p-[10px] h-full bg-gray-100 rounded-md shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">
            Online Friends
          </h2>
          <div className="mt-2">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatContainer;
