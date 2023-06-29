import { ErrorMessage } from "../component/ErrorMessage";
import { PostList } from "../component/PostList";
import usePosts from "../hooks/usePosts";

export const HomePage = () => {
  const { posts, loading, error, removePost } = usePosts();

  if (loading) return <p>cargando posts...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1>Últimas publicaciones</h1>
      <PostList posts={posts} removePost={removePost} />
    </section>
  );
};
