/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../postcard/Post";
import Share from "../shared/Share";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = username
          ? await axios.get(
              `http://localhost:8800/api/posts/profile/${username}`
            )
          : await axios.get(
              "http://localhost:8800/api/posts/timeline/67975d77ace30e98a218bc9f"
            );
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, [username]);
  return (
    <div className="flex-[5.5]">
      <div className="p-6">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
