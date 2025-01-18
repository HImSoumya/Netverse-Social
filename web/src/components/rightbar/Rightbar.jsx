import img1 from "../../assets/gift.png";
import img2 from "../../assets/ads.jpg";
import p1 from "../../assets/persons/img1.jpg";
import p2 from "../../assets/persons/img2.jpg";
import p3 from "../../assets/persons/img3.jpg";
import p4 from "../../assets/persons/img4.jpg";
import p5 from "../../assets/persons/img5.jpg";
export default function Rightbar() {
  return (
    <div
      style={{ height: "calc(100vh - 60px)" }}
      className="flex-[3.5]"
    >
      <div className="p-6">
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
            <li className="flex justify-start items-center gap-2 relative">
              <img
                className="w-[40px] h-[40px] object-cover rounded-full"
                src={p1}
                alt=""
              />
              <span className="text-[15px]">Amrita Singh</span>
              <div className="w-[15px] h-[15px] bg-green-500 border border-white rounded-full absolute left-6 top-0"></div>
            </li>
            <li className="flex justify-start items-center gap-2 relative">
              <img
                className="w-[40px] h-[40px] object-cover rounded-full"
                src={p4}
                alt=""
              />
              <span className="text-[15px]">Subhalaxmi Naik</span>
              <div className="w-[15px] h-[15px] bg-green-500 border border-white rounded-full absolute left-6 top-0"></div>
            </li>
            <li className="flex justify-start items-center gap-2 relative">
              <img
                className="w-[40px] h-[40px] object-cover rounded-full"
                src={p2}
                alt=""
              />
              <span className="text-[15px]">Nityasha Mohanty</span>
              <div className="w-[15px] h-[15px] bg-green-500 border border-white rounded-full absolute left-6 top-0"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
