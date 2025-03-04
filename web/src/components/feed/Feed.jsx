/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Post from "../postcard/Post";
import Share from "../shared/Share";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = username
          ? await axios.get(
              `http://localhost:8800/api/posts/profile/${username}`
            )
          : await axios.get(
              `http://localhost:8800/api/posts/timeline/${user._id.$oid}`
            );
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, [user._id.$oid, username]);
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
