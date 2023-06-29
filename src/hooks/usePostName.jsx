import { useEffect, useState } from "react";
import { getPostByNameFromUserService } from "../services";
import { useNavigate } from "react-router-dom";

const usePostName = (post_image) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);

        const data = await getPostByNameFromUserService(post_image);
        setPost(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [post_image]);

  const removePost = (id) => {
    setPost(post.id !== id);
    navigate("/");
  };

  return { post, loading, error, removePost };
};
export default usePostName;
