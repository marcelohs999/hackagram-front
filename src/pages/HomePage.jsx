import { useContext } from "react";
import { ErrorMessage } from "../component/ErrorMessage";
import { PostList } from "../component/PostList";
import usePosts from "../hooks/usePosts";
import { AuthContext } from "../../context/AuthContext";
import { NewPost } from "../component/NewPost";

export const HomePage = () => {
  const { posts, loading, error, addPost } = usePosts();
  const { user } = useContext(AuthContext);

  if (loading) return <p>cargando posts...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <section>
        <h1>Ultimas publicaciones</h1>
        {user ? <NewPost addPost={addPost} /> : null}
        <PostList posts={posts} />
      </section>
    </>
  );
};
