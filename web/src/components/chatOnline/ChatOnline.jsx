import defaultImg from "../../assets/DefaultProfileImg.png";

export default function ChatOnline() {
  return (
    <div className="flex justify-start items-center cursor-pointer mt-5  duration-150 px-1 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-md">
      <div className=" relative">
        <img
          className="w-[40px] h-[40px] rounded-full object-cover mr-2"
          src={defaultImg}
          alt=""
        />
        <div className=" absolute top-0 right-[8px] w-[15px] h-[15px] rounded-full bg-green-500 border-2 border-white"></div>
      </div>
      <span className="conversationName">Abhilash</span>
    </div>
  );
}
