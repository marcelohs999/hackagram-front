import { ErrorMessage } from "../component/ErrorMessage";
import { PostList } from "../component/PostList";
import usePosts from "../hooks/usePosts";
import loadingGif from "../../logos/loading.gif";
import "./styles/HomePage.css";

export const HomePage = () => {
  const { posts, loading, error, removePost } = usePosts();

  if (loading)
    return <img className="loading-img" src={loadingGif} alt="Cargando..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1>Últimas publicaciones</h1>
      <PostList posts={posts} removePost={removePost} />
    </section>
  );
};
