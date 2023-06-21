import { useParams } from "react-router-dom";
import usePostName from "../hooks/usePost";
import { ErrorMessage } from "../component/ErrorMessage";
import { PostByName } from "../component/PostByName";

export const SinglePage = () => {
  const { post_image } = useParams();

  const { post, loading, error } = usePostName(post_image);

  if (loading) return <p>Cargando publicación...</p>;
  if (error) return <ErrorMessage />;

  return (
    <section>
      <h1>Publicación...</h1>
      {post.map((post) => (
        <PostByName key={post.id} post={post} />
      ))}
    </section>
  );
};
