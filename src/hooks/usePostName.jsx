import { useContext, useEffect, useState } from "react";
import { getPostByNameFromUserService } from "../services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const usePostName = (post_image) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);

        const data = await getPostByNameFromUserService(post_image, token);
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
