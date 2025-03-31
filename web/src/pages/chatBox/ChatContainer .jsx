import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversation/Conversation";
import Header from "../../components/header/Header";
import Message from "../../components/message/Message";

const ChatContainer = () => {
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
          <Conversation />
        </div>

        {/* Chat Messages Section */}
        <div className="flex-[5.5] p-[10px] h-full flex flex-col">
          <div className="flex-grow overflow-y-scroll py-1 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-200">
            <Message />
            <Message own />
            <Message />
            <Message own />
            <Message />
          </div>
          <div className="w-full h-[120px] flex flex-col">
            <textarea 
              className="w-full border border-indigo-600 rounded-md px-2 py-1 focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
              placeholder="Write..."
            ></textarea>
            <button className="w-full px-1 py-2 bg-indigo-600 text-white text-sm mt-1 rounded-md hover:bg-indigo-800 transition">
              Send
            </button>
          </div>
        </div>

        {/* Online Friends Section */}
        <div className="flex-[3] p-[10px] h-full bg-gray-100 rounded-md shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Online Friends</h2>
          <div className="mt-2">
            <ChatOnline/>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatContainer;