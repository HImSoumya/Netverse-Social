import Post from "../postcard/Post";
import Share from "../shared/Share";
import { Posts } from "../../data/DummyData";

export default function Feed() {
  return (
    <div className="flex-[5.5]">
      <div className="p-6">
        <Share />
        {Posts.map((p) => (
          <Post key={p.id} post={p}/>
        ))} 
      </div>
    </div>
  );
}
