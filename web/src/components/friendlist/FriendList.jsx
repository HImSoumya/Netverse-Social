/* eslint-disable react/prop-types */

export default function FriendList({ user }) {
  return (
    <li className="flex justify-start items-center gap-2">
      <img
        className="w-[40px] h-[40px] rounded-full object-cover "
        src={user.profilePicture}
        alt=""
      />
      <span className="text-sm mt-1 font-medium">{user.username}</span>
    </li>
  );
}
