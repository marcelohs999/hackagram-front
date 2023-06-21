import { useEffect, useState } from "react";
import { getPostByNameFromUserService } from "../services";

const usePostName = (post_image) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
  return { post, loading, error };
};
export default usePostName;
