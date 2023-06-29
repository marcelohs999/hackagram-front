import { useParams } from "react-router-dom";
import usePostName from "../hooks/usePostName";
import { ErrorMessage } from "../component/ErrorMessage";
import { Post } from "../component/Post";

export const SinglePage = () => {
  const { post_image } = useParams();

  const { post, loading, error, removePost } = usePostName(post_image);

  if (loading) return <p>Cargando publicación...</p>;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <section>
      <h1>Publicación...</h1>
      {post && <Post post={post} removePost={removePost} />}
    </section>
  );
};
