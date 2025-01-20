import { MdRssFeed } from "react-icons/md";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdVideoLibrary } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { IoBookmarkSharp } from "react-icons/io5";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { PiSuitcaseSimple } from "react-icons/pi";
import { MdEvent } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";

import { Users } from "../../data/DummyData";
import FriendList from "../friendlist/FriendList";
 

export default function Sidebar() {
  return (
    <div
      style={{ height: "calc(100vh - 60px)" }}
      className="flex-[3] overflow-y-scroll bg-gray-50 sticky top-[60px]"
    >
      <div className="p-6">
        <ul className="flex flex-col justify-start items-start gap-3 mb-6">
          <li className="flex justify-start items-center gap-2 hover:cursor-pointer">
            <MdRssFeed className="text-2xl text-gray-600" />
            <span className="text-[16px] mt-1 font-medium">Feed</span>
          </li>
          <li className="flex justify-start items-center gap-2 hover:cursor-pointer">
            <IoChatboxEllipses className="text-2xl text-gray-600" />
            <span className="text-[16px] mt-1 font-medium">Chats</span>
          </li>
          <li className="flex justify-start items-center gap-2 hover:cursor-pointer">
            <MdVideoLibrary className="text-2xl text-gray-600" />
            <span className="text-[16px] mt-1 font-medium">Videos</span>
          </li>
          <li className="flex justify-start items-center gap-2 hover:cursor-pointer">
            <TiGroup className="text-2xl text-gray-600" />
            <span className="text-[16px] mt-1 font-medium">Groups</span>
          </li>
          <li className="flex justify-start items-center gap-2 hover:cursor-pointer">
            <IoBookmarkSharp className="text-2xl text-gray-600" />
            <span className="text-[16px] mt-1 font-medium">Bookmarks</span>
          </li>
          <li className="flex justify-start items-center gap-2 hover:cursor-pointer">
            <BsFillQuestionCircleFill className="text-2xl text-gray-600" />
            <span className="text-[16px] mt-1 font-medium">Questions</span>
          </li>
          <li className="flex justify-start items-center gap-2 hover:cursor-pointer">
            <PiSuitcaseSimple className="text-2xl text-gray-600" />
            <span className="text-[16px] mt-1 font-medium">Jobs</span>
          </li>
          <li className="flex justify-start items-center gap-2 hover:cursor-pointer">
            <MdEvent className="text-2xl text-gray-600" />
            <span className="text-[16px] mt-1 font-medium">Events</span>
          </li>
          <li className="flex justify-start items-center gap-2 hover:cursor-pointer">
            <FaGraduationCap className="text-2xl text-gray-600" />
            <span className="text-[16px] mt-1 font-medium">Courses</span>
          </li>
        </ul>
        <hr />
        <ul className="mt-6 flex flex-col  justify-start items-start gap-3">
         {
          Users.map((u)=>(
            <FriendList key={u.id} user={u}/>
          ))
         }
        </ul>
      </div>
    </div>
  );
}
