import { useEffect, useState } from "react";
import { getAllPostServices } from "../services";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getAllPostServices();

        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const addPost = (post) => {
    setPosts([post, ...posts]);
  };

  return { posts, loading, error, addPost };
};

export default usePosts;
