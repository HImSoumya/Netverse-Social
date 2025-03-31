import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import defaultCoverImg from "../../assets/p5.jpg";
import boyImg from "../../assets/boy.png";
import girlImg from "../../assets/girl.png";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import AuthContext from "../../context/AuthContext";
import FormModal from "../../components/modal/FormModal";

export default function Profile() {
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { username } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  useEffect(() => {
    const getUsersDetails = async () => {
      try {
        const res = await axios.get(`/api/users?username=${username}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsersDetails();
  }, [username]);
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
                  user.gender === "Male" ? boyImg : girlImg
                }
                className="w-[150px] h-[150px] object-cover rounded-full absolute left-0 right-0 m-auto top-[160px] border-2 border-white"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="text-[20px] font-semibold flex items-center gap-4">
                {user.username}
                {currentUser.username === user.username ? (
                  <FiEdit
                    onClick={() => setShowModal(true)}
                    className="text-sm cursor-pointer"
                  />
                ) : null}
              </span>
              <span className="text-sm text-gray-700">
                {user.desc ? user.desc : null}
              </span>
            </div>
          </div>
          <div className="profilerightbottom flex">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
        {showModal && <FormModal setShowModal={setShowModal}/>}
      </div>
    </>
  );
}
