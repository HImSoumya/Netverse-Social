/* eslint-disable react/prop-types */
 

export default function OnlineFriends({user}) {
  return (
    <li className="flex justify-start items-center gap-2 relative">
    <img
      className="w-[40px] h-[40px] object-cover rounded-full"
      src={user.profilePicture}
      alt=""
    />
    <span className="text-[15px]">{user.username}</span>
    <div className="w-[15px] h-[15px] bg-green-500 border border-white rounded-full absolute left-6 top-0"></div>
  </li>
  )
}
