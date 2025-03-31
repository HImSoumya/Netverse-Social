import defaultImg from "../../assets/DefaultProfileImg.png"; 


export default function FriendList() {
    return (
      <li className="flex justify-start items-center gap-2">
        <img
          className="w-[40px] h-[40px] rounded-full object-cover "
          src={defaultImg}
          alt=""
        />
        <span className="text-sm mt-1 font-medium">username</span>
      </li>
    );
  }
  