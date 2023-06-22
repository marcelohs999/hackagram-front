import { useContext } from "react";
import { ErrorMessage } from "../component/ErrorMessage";
import { PostList } from "../component/PostList";
import { AuthContext } from "../../context/AuthContext";
import usePosts from "../hooks/usePosts";
// import { NewPost } from "../component/NewPost";

export const HomePage = () => {
  const { posts, loading, error, addPost } = usePosts();
  const { user } = useContext(AuthContext);

  if (loading) return <p>cargando posts...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      {/* {user ? <NewPost addPost={addPost} /> : null} */}
      <h1>Últimas publicaciones</h1>
      <PostList posts={posts} />
    </section>
  );
};
