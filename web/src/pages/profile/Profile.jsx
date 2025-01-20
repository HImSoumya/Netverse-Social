import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import coverImg from "../../assets/posts/p5.jpg";
import profileImg from "../../assets/persons/my.jpg";

export default function Profile() {
  return (
    <>
      <Header />
      <div className="profilecontainer w-full  flex">
        <Sidebar />
        <div className="profileright flex-[9]">
          <div className="profileroghttop p-6">
            <div className="h-[320px] relative">
              <img
                src={coverImg}
                className="w-full h-[250px] object-cover rounded-sm"
                alt=""
              />
              <img
                src={profileImg}
                className="w-[150px] h-[150px] object-cover rounded-full absolute left-0 right-0 m-auto top-[160px] border-2 border-white"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center items-center">
                <span className="text-[20px] font-semibold">Soumya Ranjan Barik</span>
                <span className="text-sm text-gray-700">Hello, Friends welcome to Netverse</span>
            </div>
          </div>
          <div className="profilerightbottom flex">
            <Feed />
            <Rightbar profile/>
          </div>
        </div>
      </div>
    </>
  );
}
