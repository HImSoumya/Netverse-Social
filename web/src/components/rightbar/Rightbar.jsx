import img1 from "../../assets/gift.png";
import img2 from "../../assets/ads.jpg";
import OnlineFriends from "../onlinefriends/OnlineFriends";
import boyImg from "../../assets/boy.png";
import girlImg from "../../assets/girl.png";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function Rightbar({ user }) {
  const { user: currentUser } = useContext(AuthContext);
  const [friendList, setFriendList] = useState([]);
  const [mainUser, setMainUser] = useState(null); // Set null initially
  const [followed, setFollowed] = useState(false); // Default to false

  useEffect(() => {
    if (!user || !user._id) return;
    const getFriends = async () => {
      try {
        const res = await axios.get(`/api/users/friends/${user._id}`);
        setFriendList(res.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    getFriends();
  }, [user]);

  useEffect(() => {
    const handleGetMainUser = async () => {
      try {
        const res = await axios.get(`/api/users?userId=${currentUser._id}`);
        setMainUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleGetMainUser();
  }, [currentUser._id]);

  useEffect(() => {
    if (mainUser && mainUser.followings) {
      setFollowed(mainUser.followings.includes(user?._id));
    }
  }, [mainUser, user]);

  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.patch(`/api/users/${user._id}/unfollow`, {
          userId: mainUser._id,
        });
        window.location.reload();
      } else {
        await axios.patch(`/api/users/${user._id}/follow`, {
          userId: mainUser._id,
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("Follow/unfollow error:", error);
    }
    setFollowed(!followed);
  };

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
            {friendList.map((friend) => (
              <Link
                to={`/profile/${friend.username}`}
                key={friend._id}
                className=" cursor-pointer mb-4"
              >
                <OnlineFriends friend={friend} />
              </Link>
            ))}
          </ul>
        </div>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        <div className="flex justify-between items-center mb-6 mt-6 text-sm">
          <span>{user?.followers?.length ?? 0} followers</span>
          <span>{user?.followings?.length ?? 0} following</span>
          {user.username === currentUser.username ? null : (
            <button
              onClick={handleFollow}
              className="px-4 py-1 bg-indigo-600 text-sm text-white rounded-md"
            >
              {followed ? "UnFollow" : "Follow"}
            </button>
          )}

          <span></span>
        </div>
        <h4 className="text-lg">{`${user.username}'s Information`}</h4>
        <div className="mt-1 flex flex-col justify-start items-start gap-2  ">
          <div className="flex justify-start items-center gap-4 text-sm text-gray-600">
            <span>City :</span>
            <span>{user?.city || "N/A"}</span>
          </div>
          <div className="flex justify-start items-center gap-4 text-sm text-gray-600">
            <span>From :</span>
            <span>{user?.from || "N/A"}</span>
          </div>
          <div className="flex justify-start items-center gap-4 text-sm text-gray-600">
            <span>Relationship :</span>
            <span>
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-----"}
            </span>
          </div>
        </div>
        <h4 className="text-lg mt-4">{`${user.username}'s Friends`}</h4>
        <div className="mt-1 w-full grid grid-cols-3 gap-4">
          {friendList.map((friend) => (
            <Link
              to={`/profile/${friend.username}`}
              key={friend._id}
              className=" cursor-pointer mb-4"
            >
              <img
                className="w-[100px] h-[100px] rounded-md"
                src={friend.gender === "Male" ? boyImg : girlImg}
                alt=""
              />
              <span className="text-[14px] font-semibold">
                {friend.username.length >= 5
                  ? friend.username.slice(0, 8) + "..."
                  : friend.username}
              </span>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="flex-[3.5]">
      <div className="p-6">{user ? <ProfileRightBar /> : <HomeRightBar />}</div>
    </div>
  );
}
