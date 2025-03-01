import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import defaultCoverImg from "../../assets/posts/p5.jpg";
import defaultProfileImg from "../../assets/DefaultProfileImg.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/users?username=${username}`
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [username]);

  console.log(username);
  return (
    <>
      <Header />
      <div className="profilecontainer w-full  flex">
        <Sidebar />
        <div className="profileright flex-[9]">
          <div className="profileroghttop p-6">
            <div className="h-[320px] relative">
              <img
                src={user.coverPicture ? user.coverPicture : defaultCoverImg}
                className="w-full h-[250px] object-cover rounded-sm"
                alt=""
              />
              <img
                src={
                  user.profilePicture ? user.profilePicture : defaultProfileImg
                }
                className="w-[150px] h-[150px] object-cover rounded-full absolute left-0 right-0 m-auto top-[160px] border-2 border-white"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="text-[20px] font-semibold">{user.username}</span>
              <span className="text-sm text-gray-700">{user.desc}</span>
            </div>
          </div>
          <div className="profilerightbottom flex">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
