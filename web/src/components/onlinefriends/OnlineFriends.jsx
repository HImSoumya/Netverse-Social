import defaultImg from "../../assets/DefaultProfileImg.png";

export default function OnlineFriends( ) {
  return (
    <li className="flex justify-start items-center gap-2 relative">
      <img
        className="w-[40px] h-[40px] object-cover rounded-full"
        src={defaultImg}
        alt=""
      />
      <span className="text-[15px]">username</span>
      <div className="w-[15px] h-[15px] bg-green-500 border border-white rounded-full absolute left-6 top-0"></div>
    </li>
  );
}
