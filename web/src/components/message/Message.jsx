import defaultImg from "../../assets/DefaultProfileImg.png";

export default function Message({ own }) {
  return (
    <div className={`flex flex-col mt-5 ${own ? "items-end" : ""}`}>
      <div className={`flex gap-1 ${own ? "flex-row-reverse":""}`}>
        <img
          src={defaultImg}
          alt="img"
          className="w-[40px] h-[40px] object-cover rounded-full border-2 border-indigo-600 cursor-pointer"
        />
        <div className={`${own?'bg-slate-300 text-black rounded-l-2xl rounded-b-2xl':'bg-indigo-600 text-white rounded-b-2xl rounded-r-2xl'}   text-sm px-2 py-4  max-w-[350px] mt-5`}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae
          mollitia doloremque  
        </div>
      </div>
      <span className="text-[12px] font-semibold">1 Day ago</span>
    </div>
  );
}
