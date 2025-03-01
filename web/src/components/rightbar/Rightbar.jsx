/* eslint-disable react/prop-types */
import img1 from "../../assets/gift.png";
import img2 from "../../assets/ads.jpg";
import OnlineFriends from "../onlinefriends/OnlineFriends";
import { Users } from "../../data/DummyData";

export default function Rightbar({user}) {
  const HomeRightBar = () => {
    return (
      <>
        <div className="flex justify-start items-center gap-2">
          <img className="w-[35px] h-[35px]" src={img1} alt="" />
          <span className="text-[14px] font-normal">
            <b>Amrit singh</b> & <b>2 others friends</b> have birthday today.
          </span>
        </div>

        <div className="w-full h-auto mt-4 relative rounded-2xl">
          <img className=" object-cover rounded-2xl" src={img2} alt="" />
          <div className="w-full bg-black/55 absolute inset-0 rounded-2xl"></div>
          <div className="absolute bottom-4 left-1 p-1 flex flex-col gap-2">
            <span className="text-white text-xl font-normal">
              Welcome to <span className="text-indigo-400">Netverse</span>.
            </span>
            <span className="text-white text-sm font-normal">
              NetVerse: Connecting Lives, Inspiring Communities.
            </span>
          </div>
        </div>

        <div className="mt-6">
          <h1 className="text-lg text-gray-600">Online Friends</h1>
          <ul className="mt-2 flex flex-col justify-center items-start gap-4">
            {Users.map((u) => (
              <OnlineFriends key={u.id} user={u} />
            ))}
          </ul>
        </div>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        <h4 className="text-lg">{`${user.username}'s Information`}</h4>
        <div className="mt-1 flex flex-col justify-start items-start gap-2  ">
          <div className="flex justify-start items-center gap-4 text-sm text-gray-600">
            <span>City :</span>
            <span>{user.city}</span>
          </div>
          <div className="flex justify-start items-center gap-4 text-sm text-gray-600">
            <span>From :</span>
            <span>{user.from}</span>
          </div>
          <div className="flex justify-start items-center gap-4 text-sm text-gray-600">
            <span>Relationship :</span>
            <span>{user.relationship === 1? "Single" : user.relationship === 2? "Married":"-----"}</span>
          </div>
        </div>
        <h4 className="text-lg mt-4">{`Soumya's Friends`}</h4>
        <div className="mt-1 w-full grid grid-cols-3 gap-4">
          {Users.filter((u) => u.id != 1).map((u) => (
            <div key={u.id} className=" cursor-pointer mb-4">
              <img
                className="w-[100px] h-[100px] rounded-md"
                src={u.profilePicture}
                alt=""
              />
              <span className="text-[14px] font-semibold">
                {u.username.length >= 5
                  ? u.username.slice(0, 8) + "..."
                  : u.username}
              </span>
            </div>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="flex-[3.5]">
      <div className="p-6">
        {user?<ProfileRightBar />:<HomeRightBar />}
      </div>
    </div>
  );
}