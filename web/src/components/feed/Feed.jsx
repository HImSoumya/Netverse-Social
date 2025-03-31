import { useContext, useEffect, useState } from "react";
import Post from "../postcard/Post";
import Share from "../shared/Share";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = username
          ? await axios.get(`/api/posts/profile/${username}`)
          : await axios.get(`/api/posts/timeline/${user._id}`);
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
  }, [user._id, username]);

  return (
    <div className="flex-[5.5]">
      <div className="p-6">
        {!username || user.username === username ? <Share /> : null}
        {posts && posts.map((post) => <Post key={post._id} post={post} />)}
      </div>
    </div>
  );
}
