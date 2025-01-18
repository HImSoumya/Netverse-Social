import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Home() {
  return (
    <>
      <Header />
      <div className="homecontainer w-full flex ">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
