import { useContext, useEffect, useState } from "react";
import { getAllPostServices } from "../services";
import { AuthContext } from "../../context/AuthContext";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getAllPostServices(token);

        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [token]);

  const addPost = (post) => {
    setPosts([post, ...posts]);
  };

  const removePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return { posts, loading, error, addPost, removePost };
};

export default usePosts;
